var loadCarouselCount=0,currentActiveCarousel="performance";function loadSkyLeaders(a,b,c){var d=0;$(a+" .previous svg").off("click"),$(a+" .next svg").off("click"),c&&"undefined"!=typeof b&&(b.flickity("destroy"),$("#flickity-bar").empty()),b.flickity({imagesLoaded:!0,percentPosition:!1,wrapAround:!1,pageDots:!1,prevNextButtons:!1,contain:!0,cellAlign:"left",arrowShape:"M 20,50 L 36,34 L 38,36 L 26,48 L 85,48 L 85,51 L 26,51 L 38,64 L 36,66 L 20,50 Z"});var e=b.data("flickity"),f=e.cells.length-1;3e3<w?f=4:w>=hg&&(f=6);var g=100/f;// 25 at the time of this coding
// only build the nav bar for tablets and above
if(w>=sm)for(var h=0;h<f;h++)$("#flickity-bar").append("<div class=\"bar"+(0==h?" bar--active":"")+"\" style=\"width: "+g+"%;\"></div>");// update the active nav bar segment when a new slide has been selected
b.on("select.flickity",function(){var a=b.parents(".flickity-slider").find(".bar");0<a.length&&(e.selectedIndex<f&&(a.each(function(){$(this).removeClass("bar--active")}),"undefined"!=typeof a.eq(e.selectedIndex)&&a.eq(e.selectedIndex).addClass("bar--active")),d++,7<d&&window.gtag("event","select_carousel",{element:b.find(".carousel-cell").eq(e.selectedIndex).attr("ga_id"),carousel:b.attr("id")}))}),$(a+" .previous svg").on("click",function(){e.selectedIndex>=f?b.flickity("select",2):b.flickity("previous")}),$(a+" .next svg").on("click",function(){0<$("#cabinExp .bar").toArray().length?e.selectedIndex<f-1&&b.flickity("next"):b.flickity("next")})}function loadCarousel(a,b){var c=$("#"+a+".fleetspecs__carousel--active");if(b&&"undefined"!=typeof c&&(c.flickity("destroy"),$("#fleetspecs__previous svg").off("click"),$("#fleetspecs__next svg").off("click"),$("#fleetspecs__flickity-bar").empty()),w>xs){$("#"+a).removeClass("flexible"),c=$("#"+a+".fleetspecs__carousel--active"),c.flickity({imagesLoaded:!0,percentPosition:!1,wrapAround:!1,pageDots:!1,prevNextButtons:!1,contain:!0,groupCells:3,cellAlign:"left",arrowShape:"M 20,50 L 36,34 L 38,36 L 26,48 L 85,48 L 85,51 L 26,51 L 38,64 L 36,66 L 20,50 Z"});var d=c.data("flickity");if("undefined"!=typeof d){// add a bar segment for each of the slides
for(var e=100/d.slides.length,f=0;f<d.slides.length;f++)$("#fleetspecs__flickity-bar").append("<div class=\"bar"+(0==f?" bar--active":"")+"\" style=\"width: "+e+"%;\"></div>");// when a slide is selected (arrow or dragged) activate the corresponding part of the bar
c.on("select.flickity",function(){$("#fleetspecs__flickity-bar div").removeClass("bar--active"),"undefined"!=typeof $("#fleetspecs__flickity-bar div").eq(d.selectedIndex)&&$("#fleetspecs__flickity-bar div").eq(d.selectedIndex).addClass("bar--active"),window.gtag("event","select_carousel",{element:"Slide "+(parseInt(d.selectedIndex)+1),carousel:c.attr("id")})}),$("#fleetspecs__previous svg").on("click",function(){c.flickity("previous")}),$("#fleetspecs__next svg").on("click",function(){c.flickity("next")})}else console.error("carousel loading error"),loadCarouselCount+=1,3>loadCarouselCount?loadCarousel(a,!0):(disableAllCarousels(),$(".fleetspecs__error").addClass("fleetspecs__error--active"))}else $("#"+a).addClass("flexible")}function toggleCarousel(a){loadCarousel(a,!0)}function toggleFleetUnits(a){$(".fleetspecs .fleetspecs__button").each(function(){$(this).removeClass("fleetspecs__button--active")}),$(".fleetspecs .fleetspecs__"+a).addClass("fleetspecs__button--active"),$(".fleetspecs__spec p").each(function(){$(this).removeClass("active")}),$("."+a).each(function(){$(this).addClass("active")}),"metric"===a?setCookie("gac_units","metric"):"imperial"==a&&setCookie("gac_units","imperial")}function toggleCruiseType(a){$("#range_map_controls .fleetspecs__button, .fleetspecs__buttons.mobile .fleetspecs__button").each(function(){$(this).removeClass("fleetspecs__button--active")}),$("#range_map_controls .fleetspecs__"+a).addClass("fleetspecs__button--active"),$(".fleetspecs__buttons.mobile .fleetspecs__"+a).addClass("fleetspecs__button--active"),$("#cruise_speed option:selected").removeAttr("selected"),"normal"===a?$("#cruise_speed option[id='y']").attr("selected","selected"):"long"==a&&$("#cruise_speed option[id='z']").attr("selected","selected"),$("#cruise_speed").trigger("change")}function toggleAircraftMenu(a){$("#aircraft_selection_arrow").hasClass("aircraft_selection__arrow--open")?($("#aircraft_selection_arrow").removeClass("aircraft_selection__arrow--open"),$("#menu").removeClass("aircraft_options--open"),a?$(".plane_list.current").each(function(){$(this).trigger("click")}):$(".plane_list.current").each(function(){$(this).removeClass("current")})):($("#aircraft_selection_arrow").addClass("aircraft_selection__arrow--open"),window.setTimeout(function(){$("#menu").addClass("aircraft_options--open")},200))}function disableAllCarousels(){$(".fleetspecs__carousel").each(function(){$(this).removeClass("fleetspecs__carousel--active")})}$(function(){// taken from jquery-common.js
var a=document.documentElement.style,b="string"==typeof a.transform?"transform":"WebkitTransform",c="#cabinExp",d=$(c+" .carousel");// toggle carousel based on dropdown
// toggle carousel based on button
loadSkyLeaders(c,d),loadCarousel(currentActiveCarousel),$(".fleetspecs__select select").on("change",function(){disableAllCarousels(),$("#"+$(this).val()).addClass("fleetspecs__carousel--active"),currentActiveCarousel=$(this).val(),toggleCarousel(currentActiveCarousel)}),$(".fleetspecs__tab button").on("click",function(){// remove the class from the active tab
// remove the class from the active carousel
// add the class to the active tab and carousel
$(".fleetspecs__tab").each(function(){$(this).removeClass("fleetspecs__tab--active")}),disableAllCarousels(),$("#"+$(this).data("carousel")).addClass("fleetspecs__carousel--active"),$(this).parent().addClass("fleetspecs__tab--active"),currentActiveCarousel=$(this).data("carousel"),toggleCarousel(currentActiveCarousel)}),window.addEventListener("resize",function(){loadSkyLeaders(c,!0),loadCarousel(currentActiveCarousel,!0)}),"metric"===getCookie("gac_units")?toggleFleetUnits("metric"):"imperial"===getCookie("gac_units")&&toggleFleetUnits("imperial")});