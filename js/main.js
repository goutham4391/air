// ==============================================
// SET VARIABLES
// ==============================================
// element positioning on page
var bounding="function"==typeof Element.prototype.getBoundingClientRect,xs=0,sm=600,md=900,lg=1200,hg=1800,w=getSize("width"),h=getSize("height"),breakpoint=setBreakpoint(),scrollToThreshold=breakpoint[1],initialYOffset=window.pageYOffset,lastYOffset=initialYOffset,currentYOffset=initialYOffset,scrollPos=0;// breakpoints values must match sass variables
window.initialScrollEvent=!0;// used for the menu animations
var submenu__link=document.getElementsByClassName("submenu__link");// ==============================================
// DEFINE FUNCTIONS
// ==============================================
// swap between the Gulfstream (r) and G (tm) logos
function swapLogo(a){var b=document.getElementById("header-g-logo"),c="svg__g--hidden",d=document.getElementById("header-gulfstream-logo"),e="svg__gulfstream--hidden",f=350;// var gLogoClassList = document.getElementById("header-g-logo").classList;
if(!!d.classList){var g=d.classList,h=b.classList;a<f&&g.contains(e)?(h.add(c),g.remove(e)):a>f&&h.contains(c)&&(h.remove(c),g.add(e))}else// IE11 doesn't support classList on SVGs
if("svg"===d.nodeName){var g=d.getAttribute("class").split(" "),h=b.getAttribute("class").split(" ");a<f&&-1<g.indexOf(e)?(h.push(c),b.setAttribute("class",h.join(" ")),g.splice(g.indexOf(e),1),d.setAttribute("class",g.join(" "))):a>f&&-1<h.indexOf(c)&&(h.splice(h.indexOf(c),1),b.setAttribute("class",h.join(" ")),g.push(e),d.setAttribute("class",g.join(" ")))}}// return the value of the specified viewport dimension
function getSize(a){return"width"===a?Math.max(document.documentElement.clientWidth,window.innerWidth||0):"height"===a?Math.max(document.documentElement.clientHeight,window.innerHeight||0):void 0}// compare current viewport width to breakpoint values and return corresponding values
function setBreakpoint(){return w<sm?["xs",xs]:w<md?["sm",sm]:w<lg?["md",md]:w<hg?["lg",lg]:["hg",hg]}// toggles the main menu, triggers the submenu
function toggleMenu(){var a=document.getElementById("menu-toggle");a.checked=!a.checked,toggleSubMenu()}// toggles the submenu, triggers the shield and non-scrolling body
function toggleSubMenu(a){var b=document.getElementById("submenu-toggle");// display the background images only when the submenu is opened
b.checked=!b.checked,showShield(b.checked),noScroll(b.checked),a&&window.innerHeight<window.innerWidth&&w<md&&"true"==document.getElementById("menu-aircraft").dataset.notviewed&&(toggleMenuItem("menu-aircraft"),document.getElementById("menu-aircraft").dataset.notviewed="false"),Array.prototype.forEach.call(document.getElementsByClassName("aircraftBgs"),function(a){a.style.backgroundImage="url('"+a.dataset.bg+"')"})}function toggleLangs(a){a.stopPropagation(),$("#langswitcher").toggleClass("langswitcher--hidden"),window.pageYOffset>h&&$("#langswitcher li a").each(function(){$(this).attr("href",$(this).data("href")+"?y="+window.pageYOffset)})}// toggles the shield
function showShield(a){var b=document.getElementById("shield");a?b.classList.add("shield--show"):b.classList.remove("shield--show")}// toggles the non-scrolling body
function noScroll(a){var b=document.getElementById("body");a?b.classList.add("body--noscroll"):b.classList.remove("body--noscroll")}// return the collection of elements with the given class
function getSections(a){return document.getElementsByClassName(a)}// toggle the clicked navigation item
function toggleMenuItem(a){var b=document.getElementById(a),c=document.getElementById(a+"-toggle"),d=c.childNodes[1];"block"===b.style.display?(b.style.display="none",d.classList.remove("menu__caret--down")):(b.style.display="block",d.classList.add("menu__caret--down"))}// ==============================================
// FIRE FUNCTIONS ON PAGE LOAD
// ==============================================
// onload: swap the Gulfstream (r) logo for the G (tm) logo
swapLogo(currentYOffset),$.fn.viewport=function(){var a=$(this).offset().top,b=a+$(this).outerHeight(),c=$(window).scrollTop(),d=c+$(window).height();return b>c&&a<d},window.addEventListener("resize",function(){// reset these values when the viewport changes
w=getSize("width"),h=getSize("height"),breakpoint=setBreakpoint()}),window.addEventListener("scroll",function(){// only fire these events if the page hasn't just reloaded
if(!window.initialScrollEvent){lastYOffset=currentYOffset,currentYOffset=window.pageYOffset,swapLogo(currentYOffset),document.getElementById("langswitcher")&&(document.getElementById("langswitcher").dataset.offset=window.pageYOffset);// scroll events for Google Analytics
// https://growthrocks.com/blog/scroll-tracking-google-analytics/
var a=document.documentElement,c=document.body,b=parseInt(100*((a.scrollTop||c.scrollTop)/((a.scrollHeight||c.scrollHeight)-a.clientHeight)));25!=b||window.scroll25?50!=b||window.scroll50?75!=b||window.scroll75?90==b&&!window.scroll90&&(window.scroll25=window.scrollPos["false"],window.scroll50=!1,window.scroll75=!1,window.scroll90=!0,window.gtag("event","scrolling",{percent_scrolled:90})):(window.scroll25=!1,window.scroll50=!1,window.scroll75=!0,window.scroll90=!1,window.gtag("event","scrolling",{percent_scrolled:75})):(window.scroll25=!1,window.scroll50=!0,window.scroll75=!1,window.scroll90=!1,window.gtag("event","scrolling",{percent_scrolled:50})):(window.scroll25=!0,window.scroll50=!1,window.scroll75=!1,window.scroll90=!1,window.gtag("event","scrolling",{percent_scrolled:25}))}else window.initialScrollEvent=!1}),$(".to-slide-in").removeClass("to-slide-in").addClass("slide-in"),$(".to-fade-in").removeClass("to-fade-in").addClass("fade-in"),$("#hero_loader").remove();// use below instead if you need the class swaps above to
// occur only after page is more fully loaded
// document.addEventListener("DOMContentLoaded", function () {
// 	$(".to-slide-in").removeClass("to-slide-in").addClass("slide-in");
// 	$(".to-fade-in").removeClass("to-fade-in").addClass("fade-in");
// 	$("#hero_loader").remove();
// });
// window.addEventListener("load", function () {
// 	$("#hero_loader").remove();
// });
// // fallback for iOS
//This will check what you are passing in and either use fadeMenuIn() or fadeMenuOut()
function handleMenuUpdate(a){"fadeMenuIn"==a&&fadeMenuIn(),"fadeMenuOut"==a&&fadeMenuOut(),"video-shield"==a&&$("#shield").hasClass("shield--show")&&(toggleMenu(),fadeMenuOut()),"header--closeMenu"==a&&(toggleMenu(),fadeMenuOut())}/*
    FadeMenuOut function only handles the timeout and removal of the header--closeMenu
    ToggleMenu() takes care of closing and opening the menu
*/function fadeMenuOut(){waitUntilMenuReady(500),$("#header").removeClass("header--closeMenu")}/*
    FadeMenuIn function only handles the timeout and adding of the header--closeMenu with a dealy of .2 seconds
    ToggleMenu() takes care of closing and opening the menu
*/function fadeMenuIn(){//had to add a timeout funciton so it will add it .5seconds after the menu appears
waitUntilMenuReady(800),window.setTimeout(function(){$("#header").addClass("header--closeMenu")},200)}/* 
    waitUntilMenuReady function is going to be fired only with elements that close and open the menu
    speed variable will set the timeout on when you want the user to click 
 */function waitUntilMenuReady(a){$("html").css("pointer-events","none"),setTimeout(function(){$("html").css("pointer-events","auto")},a)}$("document").ready(function(){//once changed set the span class if index == certain index (0 - 3)
//handle callout-video section
function a(){var a,b,c,d;//natural sizing so content doesn't get cut off
c=$(".callout__image > img").width(),d=$(".callout__image > img").height(),a=$(".callout-video").width(1.7778*d),b=$(".callout-video").height(d)}var b=new URLSearchParams(location.href.replace(/^.*\?/,"")).get("y");if(b){b=parseInt(b);var c=document.height===void 0?document.body.offsetHeight:document.height;b>h&&b<=c&&window.scrollTo({top:b,left:0,behavior:"auto"})}// set the hidden checkbox to false if user hits the back button
$(".nav__toggle").prop("checked",!1),$("#scrollTop").click(function(){$("html,body").animate({scrollTop:0},1500)}),0<$("#callout-video").length&&(a(),$(window).on("resize",function(){a()})),/MSIE|Trident/.test(window.navigator.userAgent)||($(".svg__menu").on("click",function(){handleMenuUpdate("fadeMenuIn")}),$("#x-close").on("click",function(){handleMenuUpdate("fadeMenuOut")}),$(".submenu__link").on("click",function(){$(this).is("#menu-aircraft-toggle")||handleMenuUpdate("fadeMenuOut")}),$(".subsubmenu__link").on("click",function(){handleMenuUpdate("fadeMenuOut")}),$("#shield").on("click",function(){handleMenuUpdate("fadeMenuOut")}),$(".video-shield").on("click",function(){handleMenuUpdate("video-shield")}),$("#header").on("click",function(){$("#header").hasClass("header--closeMenu")&&handleMenuUpdate("header--closeMenu")}))});