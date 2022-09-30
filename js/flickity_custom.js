function _typeof(a){"@babel/helpers - typeof";return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},_typeof(a)}// loads or destroys Flickity slider, as needed
function toggleExploreCarousel(){w<lg?("object"===("undefined"==typeof exploreSlider?"undefined":_typeof(exploreSlider))&&w!==getSize("width")&&exploreSlider.destroy(),exploreSlider=new Flickity(".explore",{wrapAround:!0,pageDots:!1})):"object"===("undefined"==typeof exploreSlider?"undefined":_typeof(exploreSlider))&&exploreSlider.destroy()}// onload: place plus buttons in w/w/w section
// onload: toggle the explore slider
// viewport resize listener
null!==document.querySelector(".explore")&&toggleExploreCarousel(),window.addEventListener("resize",function(){null!==document.querySelector(".explore")&&toggleExploreCarousel()}),$("document").ready(function(){// taken from jquery-common.js
var a=document.documentElement.style;// var transformProp = typeof docStyle.transform == "string" ? "transform" : "WebkitTransform";
$(".carousel").each(function(a,b){var c=$(b);c.flickity({imagesLoaded:!0,percentPosition:!1,wrapAround:!1,prevNextButtons:!0,pageDots:!1,arrowShape:"M 20,50 L 36,34 L 38,36 L 26,48 L 85,48 L 85,51 L 26,51 L 38,64 L 36,66 L 20,50 Z",on:{change:function change(a){window.gtag("event","select_carousel",{element:$(this.cells[a].element).attr("ga_id"),carousel:$(this.element).attr("id")})}}})}),$(".icon-carousel").each(function(a,b){var c=$(b);c.flickity({imagesLoaded:!0,percentPosition:!1,wrapAround:!1,pageDots:!1,arrowShape:"M 20,50 L 36,34 L 38,36 L 26,48 L 85,48 L 85,51 L 26,51 L 38,64 L 36,66 L 20,50 Z",selectedAttraction:.2,friction:.8// on: {
// 	change: function (i) {
// 		$carousel.find(".carousel-cell.invisible").removeClass("invisible");
// 		// allow hidden third cell to show;
// 		// it is hidden to prevent visibility
// 		// before the first cell when wrapAround is true
// 		window.gtag("event", "select_carousel", {
// 			element: $(this.cells[i].element).attr("ga_id"),
// 			carousel: $(this.element).attr("id")
// 		});
// 	}
// }
})});// was already in this file
var a=document.documentElement.style;// var transformProp = typeof docStyle.transform == "string" ? "transform" : "WebkitTransform";
//cabinConfig event change for index.
0<$(".carousel--parallax").length&&$(".carousel--parallax").each(function(a,b){var c=$(b);c.flickity({imagesLoaded:!0,percentPosition:!1,wrapAround:!1,pageDots:!1,initialIndex:2,arrowShape:"M 20,50 L 36,34 L 38,36 L 26,48 L 85,48 L 85,51 L 26,51 L 38,64 L 36,66 L 20,50 Z"})}),$(".main-carousel").flickity({pageDots:!0,contain:!0,cellAlign:"left"}),$(".cabinConfig-slider-mobile").flickity({pageDots:!0})});