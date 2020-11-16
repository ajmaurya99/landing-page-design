/**
 * Debounce added to scroll animation to improve browser performance.
 * @param {String} func
 * @param {Number} delay
 */
const debounce = (func, delay) => {
	let debounceTimer;
	return function () {
		const context = this;
		const args = arguments;
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => func.apply(context, args), delay);
	};
};

/**
 * Get IE Version Number
 * @return {number} Retruns the IE version if IE Browser else returns False
 */
function msieversion() {
	const ua = window.navigator.userAgent,
		msie = ua.indexOf('MSIE ');
	if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
		// If Internet Explorer, return version number
		return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)));
	} // If another browser, return 0
	return false;
}

/**
 * Main Js
 */
let mainJs = function () {
	// Global Variable Decleration
	let primaryHeader = document.getElementById('header__nav--js'); // Primary Header
	let primaryHeaderHeight = primaryHeader.offsetHeight - 90; // subtract the top height for better user experience.
	let menuToggle = document.getElementById('header__toggle-btn--js'); // Menu Toggle Icon
	let menuItems = document.getElementById('header__menu--js'); // Menu Items
	let scrollClick = document.querySelectorAll('[data-scrollto]'); // Items contained data-scrollto property
	let headerMenuItems = document.querySelectorAll('.header__menu-items'); // Items contained data-scrollto property
	let startTime, startPosition, distance, duration;

	/**
	 * Initialize the main function
	 */
	function init() {
		// Check if header exists.
		if (primaryHeader) {
			uiBindings();
		}
	}

	/**
	 * Contains all the UI related scripts
	 */
	function uiBindings() {
		// Add fixed class to header on scroll.
		window.addEventListener(
			'scroll',
			debounce(function () {
				let primaryHeaderClassList = primaryHeader.classList;
				if (
					document.body.scrollTop >= primaryHeaderHeight ||
					document.documentElement.scrollTop >= primaryHeaderHeight
				) {
					primaryHeaderClassList.add('header__nav--fixed');
				} else {
					primaryHeaderClassList.remove('header__nav--fixed');
				}
			}, 10)
		);

		// Toggle Menu on click.
		menuToggle.addEventListener('click', function () {
			this.classList.toggle('open');
			menuItems.classList.toggle('show');
			updateAriaValue(this, 'aria-expanded'); // Toggle the aria-expanded value for the Menu Toggle button.
			updateAriaValue(menuItems, 'aria-hidden'); // Toggle the aria-hidden value for the Menu Items.
		});

		// If elememt with data-scrollto property is clicked.
		if (scrollClick) {
			for (let i = 0; i < scrollClick.length; i++) {
				scrollClick[i].addEventListener('click', function (e) {
					let ieVersion = msieversion();
					// Check if ie version less than 11 then dont add  e.preventDefault().
					if (!ieVersion || ieVersion >= 11) {
						e.preventDefault();
					}
					let scrollTarget = this.getAttribute('data-scrollto'); // get the scoll target.
					smoothScroll(scrollTarget, 1000); // 1000ms added by default.
				});
			}
		}

		//  Add the active class to the current/clicked menu item
		if (headerMenuItems) {
			for (let i = 0; i < headerMenuItems.length; i++) {
				headerMenuItems[i].addEventListener('click', function () {
					let current = menuItems.getElementsByClassName('active');

					// If there's no active class
					if (current.length > 0) {
						current[0].className = current[0].className.replace(
							' active',
							''
						);
					}

					// Add the active class to the current/clicked menu item
					this.parentElement.className += ' active';

					if (window.innerWidth <= 768) {
						// Close the open menu if mobile
						menuToggle.classList.toggle('open');
						menuItems.classList.toggle('show');
						updateAriaValue(this, 'aria-expanded'); // Toggle the aria-expanded value for the Menu Toggle button.
						updateAriaValue(menuItems, 'aria-hidden'); // Toggle the aria-hidden value for the Menu Items.
					}
				});
			}
		}
	}

	/**
	 *
	 * Smooth Scroll to anchor on Click
	 * https://www.youtube.com/watch?v=oUSvlrDTLi4
	 *  @param {string, Number}
	 */
	function smoothScroll(targetParam, durationTime) {
		let target = document.querySelector(targetParam);
		let targetPosition =
			target.getBoundingClientRect().top + window.pageYOffset;
		startPosition = window.pageYOffset;
		startTime = null;
		distance = targetPosition - startPosition;
		duration = durationTime;
		requestAnimationFrame(scrollAnimation);
	}

	/**
	 * Start scroll amimation based on the currentTime
	 * @param {Number} currentTime
	 */
	function scrollAnimation(currentTime) {
		if (startTime === null) {
			startTime = currentTime;
		}
		let timeElapsed = currentTime - startTime;
		let run = ease(timeElapsed, startPosition, distance, duration);

		window.scrollTo(0, run);
		if (timeElapsed < duration) {
			requestAnimationFrame(scrollAnimation);
		}
	}

	/**
	 * Easing Functions
	 * http://www.gizma.com/easing/
	 * @param {Number, Number, Number, Number}
	 */
	function ease(t, b, c, d) {
		t /= d / 2;
		if (t < 1) return (c / 2) * t * t + b;
		t--;
		return (-c / 2) * (t * (t - 2) - 1) + b;
	}

	/**
	 * Update Aria Value
	 * @param {String} element
	 * @param {String} key
	 */
	function updateAriaValue(element, key) {
		let toggleAria = element.getAttribute(key);
		if (toggleAria == 'true') {
			toggleAria = 'false';
		} else {
			toggleAria = 'true';
		}
		element.setAttribute(key, toggleAria);
	}

	return {
		init: init,
	};
};
mainJs().init();
