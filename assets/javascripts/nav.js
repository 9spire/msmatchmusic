(function () {
  var toggle = document.getElementById('menu-toggler');
  var panel = document.getElementById('primary-nav');

  function setOpen(open) {
    if (!toggle || !panel) return;
    panel.classList.toggle('closed', !open);
    panel.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  if (toggle && panel) {
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
  }

  // Highlight the nav item for the section currently in view
  var links = document.querySelectorAll('.site-nav__links a[href^="#"]');
  if (!links.length) return;

  var items = [];
  links.forEach(function (link) {
    var href = link.getAttribute('href') || '';
    var id = href.charAt(0) === '#' ? href.slice(1) : '';
    if (!id) return;
    var target = document.getElementById(id);
    if (!target) return;
    items.push({
      id: id,
      link: link,
      li: link.closest('li'),
      target: target
    });
  });

  if (!items.length) return;

  function navOffset() {
    var bar = document.querySelector('.contain-to-grid');
    return bar ? bar.offsetHeight : 56;
  }

  function setCurrent(id) {
    items.forEach(function (item) {
      var on = item.id === id;
      if (item.li) {
        item.li.classList.toggle('is-current', on);
        item.li.classList.toggle('active', on);
      }
      if (on) item.link.setAttribute('aria-current', 'location');
      else item.link.removeAttribute('aria-current');
    });
  }

  function update() {
    var fromTop = window.scrollY + navOffset() + 12;
    var current = items[0].id;
    for (var i = 0; i < items.length; i++) {
      var top = items[i].target.getBoundingClientRect().top + window.scrollY;
      if (fromTop >= top) current = items[i].id;
    }
    setCurrent(current);
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
