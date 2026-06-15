// Reyna House AI — chat widget logic. Talks to /.netlify/functions/chat.
(function () {
  var root = document.getElementById('rh-chat');
  if (!root) return;

  var endpoint = root.getAttribute('data-endpoint');
  var launch = document.getElementById('rh-chat-launch');
  var panel = document.getElementById('rh-chat-panel');
  var closeBtn = document.getElementById('rh-chat-close');
  var log = document.getElementById('rh-chat-log');
  var form = document.getElementById('rh-chat-form');
  var input = document.getElementById('rh-chat-input');

  var history = [];      // mirrors what we send to the API (user/assistant turns)
  var busy = false;
  var greeted = false;
  // One id per page session, so the server can group a conversation's turns.
  var convoId = (window.crypto && crypto.randomUUID)
    ? crypto.randomUUID()
    : 'c-' + Date.now() + '-' + Math.floor(Math.random() * 1e9);

  var GREETING =
    "Hi, I'm Alyssa 👋 I help out here at Reyna House AI. What's bringing you " +
    "in today — a new website, some automation, or just looking around?";
  var FALLBACK =
    "Sorry — I'm having trouble right now. You can reach Edward directly at " +
    "909-341-0243, or book a call: https://calendly.com/reynahouseai-pm/30min";

  function scrollDown() { log.scrollTop = log.scrollHeight; }

  // Build a message bubble. Text is added as text nodes (no innerHTML) so
  // visitor and model text can never inject markup. URLs become links;
  // a Calendly URL becomes a styled "Book a call" button.
  function addBubble(role, text) {
    var msg = document.createElement('div');
    msg.className = 'rhc__msg rhc__msg--' + role;
    var parts = String(text).split(/(https?:\/\/[^\s]+)/g);
    parts.forEach(function (part) {
      if (/^https?:\/\//.test(part)) {
        var a = document.createElement('a');
        a.href = part;
        a.target = '_blank';
        a.rel = 'noopener';
        if (part.indexOf('calendly.com') !== -1) {
          a.className = 'rhc__cta';
          a.textContent = 'Book a free 15-min call →';
        } else {
          a.textContent = part;
        }
        msg.appendChild(a);
      } else if (part) {
        msg.appendChild(document.createTextNode(part));
      }
    });
    log.appendChild(msg);
    scrollDown();
    return msg;
  }

  function addTyping() {
    var t = document.createElement('div');
    t.className = 'rhc__msg rhc__msg--assistant rhc__typing';
    for (var i = 0; i < 3; i++) t.appendChild(document.createElement('span'));
    log.appendChild(t);
    scrollDown();
    return t;
  }

  function openPanel() {
    root.classList.add('is-chatting'); // stop the launcher attention pulse
    panel.classList.add('is-open');
    panel.setAttribute('aria-hidden', 'false');
    launch.setAttribute('aria-expanded', 'true');
    if (!greeted) { greeted = true; addBubble('assistant', GREETING); }
    input.focus();
  }

  function closePanel() {
    panel.classList.remove('is-open');
    panel.setAttribute('aria-hidden', 'true');
    launch.setAttribute('aria-expanded', 'false');
  }

  launch.addEventListener('click', function () {
    panel.classList.contains('is-open') ? closePanel() : openPanel();
  });
  closeBtn.addEventListener('click', closePanel);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && panel.classList.contains('is-open')) closePanel();
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var text = input.value.trim();
    if (!text || busy) return;
    input.value = '';
    addBubble('user', text);
    history.push({ role: 'user', content: text });
    if (history.length > 20) {
      history = history.slice(-20);
      // Keep the window starting on a user turn (the API requires it).
      while (history.length && history[0].role !== 'user') history.shift();
    }

    busy = true;
    var typing = addTyping();

    fetch(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ conversationId: convoId, messages: history }),
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        typing.remove();
        if (data && data.reply) {
          addBubble('assistant', data.reply);
          history.push({ role: 'assistant', content: data.reply });
        } else {
          addBubble('assistant', FALLBACK);
        }
      })
      .catch(function () {
        typing.remove();
        addBubble('assistant', FALLBACK);
      })
      .then(function () {
        busy = false;
        input.focus();
      });
  });
})();
