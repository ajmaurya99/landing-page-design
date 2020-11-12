var mainJs = function () {
	var primaryHeader = document.getElementById("header__nav--js"),
		primaryHeaderHeight = document.getElementById("header__nav--js").offsetHeight - 90; // subtract the top height for better user experience.

	function init() {
		//check header habitat Menu html exists
		if (primaryHeader) {
			uiBindings();
		}
	}

	function uiBindings() {
		window.addEventListener("scroll", function (e) {
			if (
				document.body.scrollTop >= primaryHeaderHeight ||
				document.documentElement.scrollTop >= primaryHeaderHeight
			) {
				primaryHeader.classList.add("header__nav--fixed");
			} else {
				primaryHeader.classList.remove("header__nav--fixed");
			}
		});
	}

	return {
		init: init,
	};
};
var app = mainJs();
app.init();

