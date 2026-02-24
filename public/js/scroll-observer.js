document.addEventListener('DOMContentLoaded', function () {
  var elements = document.querySelectorAll('[data-animate]');
  if (!elements.length) return;

  // Fallback: if IntersectionObserver is not supported, show all elements immediately
  if (typeof IntersectionObserver === 'undefined') {
    elements.forEach(function (el) {
      el.classList.add('is-visible');
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  elements.forEach(function (el) {
    observer.observe(el);
  });
});
