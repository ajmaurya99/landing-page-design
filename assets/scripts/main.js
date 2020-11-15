var mainJs = function () {

	// Global Variable Decleration
	var primaryHeader = document.getElementById("header__nav--js"), // Primary Header
		primaryHeaderHeight = primaryHeader.offsetHeight - 90, // subtract the top height for better user experience.
		menuToggle = document.getElementById("header__toggle-btn--js"), // Menu Toggle Icon
		menuItems = document.getElementById("header__menu--js"), // Menu Items
		scrollClick = document.querySelectorAll("[data-scrollto]"); // Items contained data-scrollto property

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
		window.addEventListener("scroll", function () {
			if (
				document.body.scrollTop >= primaryHeaderHeight ||
				document.documentElement.scrollTop >= primaryHeaderHeight
			) {
				primaryHeader.classList.add("header__nav--fixed");
			} else {
				primaryHeader.classList.remove("header__nav--fixed");
			}
		});

		// Toggle Menu on click.
		menuToggle.addEventListener("click", function () {
			this.classList.toggle("open");
			menuItems.classList.toggle("show");

			var toggleAriaExpand = this.getAttribute("aria-expanded"); // Toggle the aria-expanded value for the Menu Toggle button.
			if (toggleAriaExpand == "true") {
				toggleAriaExpand = "false";
			} else {
				toggleAriaExpand = "true";
			}
			this.setAttribute("aria-expanded", toggleAriaExpand);

			var menuAriaHidden = menuItems.getAttribute("aria-hidden"); // Toggle the aria-hidden value for the Menu Items.
			if (menuAriaHidden == "true") {
				menuAriaHidden = "false";
			} else {
				menuAriaHidden = "true";
			}
			menuItems.setAttribute("aria-hidden", menuAriaHidden);


		});

		/**
		 * Get IE Version Number
		 * @return {number} Retruns the IE version if IE Browser else returns False
		 */
		function msieversion() {
			var ua = window.navigator.userAgent,
				msie = ua.indexOf("MSIE ");

			if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
				// If Internet Explorer, return version number
				return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)));
			} // If another browser, return 0
			return false;
		}

		/**
		 *
		 * Smooth Scroll to anchor on Click
		 * https://www.youtube.com/watch?v=oUSvlrDTLi4
		 *  @param {string, Number}
		 */
		function smoothScroll(target, duration) {
			var target = document.querySelector(target),
				targetPosition =
					target.getBoundingClientRect().top + window.pageYOffset,
				startPosition = window.pageYOffset,
				distance = targetPosition - startPosition,
				startTime = null;

			function scrollAnimation(currentTime) {
				if (startTime === null) {
					startTime = currentTime;
				}
				var timeElapsed = currentTime - startTime;
				var run = ease(timeElapsed, startPosition, distance, duration);
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
			requestAnimationFrame(scrollAnimation);
		}

		// If elememt with data-scrollto property is clicked.
		if (scrollClick) {
			for (i = 0; i < scrollClick.length; i++) {
				scrollClick[i].addEventListener("click", function (e) {
					var ieVersion = msieversion();

					// Check if ie version less than 11 then dont add  e.preventDefault().
					if (!ieVersion || ieVersion >= 11) {
						e.preventDefault();
					}
					var scrollTarget = this.getAttribute("data-scrollto"); // get the scoll target.
					smoothScroll(scrollTarget, 1000); // 1000ms added by default.
				});
			}
		}
	}

	return {
		init: init,
	};
};
var app = mainJs();
app.init();

