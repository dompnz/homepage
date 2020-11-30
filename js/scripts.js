// imports
import Typewriter from "typewriter-effect/dist/core"; // https://www.npmjs.com/package/typewriter-effect
import { annotate, annotationGroup } from "rough-notation"; // https://roughnotation.com/ https://github.com/rough-stuff/rough-notation

document.addEventListener("DOMContentLoaded", (event) => {
	// calculate dates
	let currentDate = new Date();
	let birthdayDate = new Date("August 31, 1993");
	let diffTimeMiliseconds = Math.abs(currentDate - birthdayDate);
	let diffTimeYears = diffTimeMiliseconds / (1000 * 60 * 60 * 24 * 365);
	let currentAge = Math.floor(diffTimeYears);
	let currentYear = currentDate.getFullYear();
	document.querySelector("#current-age").textContent = currentAge;
	document.querySelector("#current-year").textContent = currentYear;

	//special text
	if (window.location.hash === "#loop") {
		document.querySelector(".hash-text").innerText = ` ${window.location.hash.substring(1)}`;
	}

	// typewriter
	var typewriterElement = document.querySelector(".typewriter");

	var typewriter = new Typewriter(typewriterElement, {
		loop: true,
	});

	typewriter
		.typeString("Web Developer.")
		.pauseFor(2500)
		.deleteChars(10)
		.typeString("<span>Enthusiast.</span>")
		.pauseFor(2500)
		.deleteAll()
		.typeString("Cat Lover. 🐱")
		.pauseFor(2500)
		.pauseFor(2500)
		.start();

	// return a generated annotation group
	function generateAg() {
		let highlights = [];
		const annotateColor = "lightgrey";
		// use a random config each time
		const annotateConfigs = [
			{ type: "underline", color: annotateColor, strokeWidth: 10 },
			{ type: "box", color: annotateColor },
			{ type: "circle", color: annotateColor },
			{ type: "highlight", color: annotateColor },
		];

		document.querySelectorAll(".tech li span").forEach((element) => {
			const randomAnnotateConfig = annotateConfigs[Math.floor(Math.random() * annotateConfigs.length)];
			highlights.push(annotate(element, randomAnnotateConfig));
		});
		return annotationGroup(highlights);
	}
	let ag = generateAg();

	// annotate on button press
	document.querySelector(".tech button").addEventListener("click", (e) => {
		ag.hide();
		ag = generateAg();
		ag.show();
	});

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
			behavior: "smooth",
		});
	}

	document.querySelector(".scroll-down").addEventListener("click", function () {
		scrollToTargetAdjusted("main");
	});
	document.querySelector(".hero button").addEventListener("click", function () {
		scrollToTargetAdjusted("main");
	});

	document.querySelectorAll(".header .header__menu li").forEach((li) => {
		li.addEventListener("click", function () {
			scrollToTargetAdjusted(li.getAttribute("data-jump-to"));
		});
	});

	// scroll spy for header menu
	let last_known_scroll_position = 0;
	let ticking = false;
	let scrolledDown = false;

	function doSomething(scroll_pos) {
		// Do something with the scroll position
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

	window.addEventListener("scroll", function (e) {
		last_known_scroll_position = window.scrollY;

		if (!ticking) {
			window.requestAnimationFrame(function () {
				doSomething(last_known_scroll_position);
				ticking = false;
			});

			ticking = true;
		}
	});
});
