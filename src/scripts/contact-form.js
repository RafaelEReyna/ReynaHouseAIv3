// Shared behaviour for every lead form on the site (homepage contact form,
// /free-listing-check/). Markup lives in the components; this file is the
// only client-side copy of the submit logic.
//
// A form opts in with:
//   data-rh-contact            marks it for wiring
//   data-success="<id>"        element shown after a submission
//   data-method="<name>"       GA `method` param, so each form reports separately
// and must contain inputs named _t, _k, email and phone.

// Anti-spam token. Mirrors tokenFor() in netlify/functions/contact-submit.mjs
// byte for byte — change one, change both, or every real submission starts
// failing as 'bad_token'.
function tokenFor(t) {
  const s = `${t}rh`;
  let h = 2166136261;
  for (let i = 0; i < s.length; i += 1) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(36);
}

const FAIL_MSG = 'Something went wrong. Please try again or email edward@reynahouse.ai directly.';

function showSuccess(form, success) {
  form.style.display = 'none';
  if (success) success.style.display = 'block';
}

export function wireContactForm(form) {
  const success = document.getElementById(form.dataset.success || '');
  const method = form.dataset.method || 'contact_form';

  // Page reload with ?submitted=true (no-JS fallback redirect).
  if (window.location.search.includes('submitted=true')) showSuccess(form, success);

  const t = Date.now();
  form.elements._t.value = String(t);
  form.elements._k.value = tokenFor(t);

  // Neither email nor phone is individually required, but one of them has to
  // be there or the lead is unreachable. Enforced here rather than with
  // `required` on both, which is what made people abandon the form.
  const { email, phone } = form.elements;
  function syncReachValidity() {
    const ok = email.value.trim() !== '' || phone.value.trim() !== '';
    const msg = ok ? '' : 'Add an email or a phone number so I can reply.';
    email.setCustomValidity(msg);
    phone.setCustomValidity(msg);
  }
  email.addEventListener('input', syncReachValidity);
  phone.addEventListener('input', syncReachValidity);
  syncReachValidity();

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    syncReachValidity();
    if (!form.reportValidity()) return;
    try {
      const response = await fetch('/.netlify/functions/contact-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString(),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) {
        // The gate returns a human-readable message for the cases a real
        // person can actually hit (rate limit, upstream failure).
        alert(body.message || FAIL_MSG);
        return;
      }
      showSuccess(form, success);
      // The gate answers a rejected payload with the same 200 ok:true it gives
      // a real one, so that a bot cannot tell the two apart. That means
      // response.ok is NOT evidence of a lead. Only a `ref` receipt means the
      // submission actually reached the inbox.
      if (!window.rhTrack) return;
      window.rhTrack('form_submit_attempt', { method });
      if (body && body.ref) window.rhTrack('generate_lead', { method });
    } catch {
      alert(FAIL_MSG);
    }
  });
}

document.querySelectorAll('form[data-rh-contact]').forEach(wireContactForm);
