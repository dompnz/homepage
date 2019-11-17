/**/

document.addEventListener('DOMContentLoaded', (event) => {

  // calculate dates
  let currentYear = new Date().getFullYear();
  let currentAge = currentYear - new Date('August 31, 1993').getFullYear();
  document.querySelector('#current-year').textContent = currentYear;
  document.querySelector('#current-age').textContent = currentAge;

  //special text
  if (window.location.hash === "#hire-me-redox") {
    document.querySelector(".hash-text").innerText = " Redox";
  }

  // typewriter
  var typewriterElement = document.querySelector('.typewriter');

  var typewriter = new Typewriter(typewriterElement, {
    loop: true
  });

  typewriter.typeString('Web Developer.')
    .pauseFor(2500)
    .deleteChars(10)
    .typeString('<span>Enthusiast.</span>')
    .pauseFor(2500)
    .deleteAll()
    .typeString('Gamer.')
    .pauseFor(2500)
    .deleteAll()
    .typeString('Cat Lover.')
    .pauseFor(2500)
    .start();

  // add scroll jumps
  function scrollToTargetAdjusted(x) {
    const element = document.querySelector(x);
    const offset = document.querySelector("header").offsetHeight; //height of header in px
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }

  document.querySelector('.scroll-down').addEventListener("click", function() {
    scrollToTargetAdjusted('main');
  });
  document.querySelector('.hero button').addEventListener("click", function() {
    scrollToTargetAdjusted('main');
  });

  document.querySelectorAll('.header .header__menu li').forEach(li => {
    li.addEventListener("click", function() {
      scrollToTargetAdjusted(li.getAttribute("data-jump-to"));
    });
  });

  // scroll spy for header menu
  let last_known_scroll_position = 0;
  let ticking = false;
  let scrolledDown = false;

  function doSomething(scroll_pos) { // Do something with the scroll position
    let elementHeight = document.querySelector(".hero").offsetHeight - document.querySelector("header").offsetHeight;
    if (scroll_pos > elementHeight && !scrolledDown) {
      scrolledDown = true;
      document.querySelector("header").classList.add("header--scrolled-down");
    }
    if (scroll_pos <= elementHeight && scrolledDown) {
      scrolledDown = false;
      document.querySelector("header").classList.remove("header--scrolled-down");
    }
  }

  window.addEventListener('scroll', function(e) {
    last_known_scroll_position = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(function() {
        doSomething(last_known_scroll_position);
        ticking = false;
      });

      ticking = true;
    }
  });

});