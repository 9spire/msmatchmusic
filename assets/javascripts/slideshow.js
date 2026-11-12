(function () {
  var root = document.querySelector('.hero-slideshow');
  if (!root) return;

  var slides = Array.prototype.slice.call(root.querySelectorAll('.hero-slideshow__slide'));
  if (slides.length < 2) return;

  var dotsWrap = root.querySelector('[data-hero-dots]');
  var pauseBtn = root.querySelector('[data-hero-pause]');
  var intervalMs = 5500;
  var index = 0;
  var timer = null;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function setActive(next) {
    slides[index].classList.remove('is-active');
    slides[index].setAttribute('aria-hidden', 'true');
    if (dotsWrap) {
      var prevDot = dotsWrap.children[index];
      if (prevDot) {
        prevDot.classList.remove('is-active');
        prevDot.setAttribute('aria-selected', 'false');
      }
    }

    index = (next + slides.length) % slides.length;

    slides[index].classList.add('is-active');
    slides[index].removeAttribute('aria-hidden');
    if (dotsWrap) {
      var nextDot = dotsWrap.children[index];
      if (nextDot) {
        nextDot.classList.add('is-active');
        nextDot.setAttribute('aria-selected', 'true');
      }
    }
  }

  function stop() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    if (pauseBtn) {
      pauseBtn.setAttribute('aria-pressed', 'true');
      pauseBtn.textContent = 'Play';
      pauseBtn.setAttribute('aria-label', 'Play slideshow');
    }
  }

  function start() {
    if (reduced || slides.length < 2) return;
    stop();
    timer = setInterval(function () {
      setActive(index + 1);
    }, intervalMs);
    if (pauseBtn) {
      pauseBtn.setAttribute('aria-pressed', 'false');
      pauseBtn.textContent = 'Pause';
      pauseBtn.setAttribute('aria-label', 'Pause slideshow');
    }
  }

  // Dots get noisy with many slides — keep pause + keyboard only
  if (dotsWrap) {
    dotsWrap.hidden = true;
  }

  if (pauseBtn) {
    pauseBtn.addEventListener('click', function () {
      if (timer) stop();
      else start();
    });
  }

  root.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') {
      setActive(index + 1);
      if (timer) start();
    } else if (e.key === 'ArrowLeft') {
      setActive(index - 1);
      if (timer) start();
    }
  });

  if (!reduced) start();
  else if (pauseBtn) {
    pauseBtn.setAttribute('aria-pressed', 'true');
    pauseBtn.textContent = 'Play';
  }
})();
