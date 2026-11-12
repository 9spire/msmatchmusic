(function () {
  var toggle = document.getElementById('menu-toggler');
  var panel = document.getElementById('primary-nav');
  if (!toggle || !panel) return;

  function setOpen(open) {
    panel.classList.toggle('closed', !open);
    panel.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  toggle.addEventListener('click', function (e) {
    e.preventDefault();
    setOpen(!panel.classList.contains('is-open'));
  });

  panel.addEventListener('click', function (e) {
    var link = e.target.closest('a');
    if (!link) return;
    if (window.matchMedia('(max-width: 900px)').matches) {
      setOpen(false);
    }
  });
})();
