// check if cookie exists
function getCookie(a){for(var b,d=a+"=",e=document.cookie.split(";"),f=0;f<e.length;f++){for(b=e[f];" "==b.charAt(0);)b=b.substring(1);if(0==b.indexOf(d))return b.substring(d.length,b.length)}return""}// set cookie
function setCookie(a,b,c){var e=new Date;"undefined"==typeof c&&(c=45),e.setTime(e.getTime()+1e3*(60*(60*(24*c))));// days in milliseconds
var d="expires="+e.toUTCString()+";";document.cookie=a+"="+b+";"+d+"SameSite=Strict;"+"path=/"}// display notice
function displayNotice(a){document.getElementById(a).classList.remove("notice--hidden")}// closes notice
function closeNotice(a){document.getElementById(a).classList.add("notice--hidden")}// set a cookie with the language currently being viewed
function setLastLang(){var a=document.documentElement.lang;getCookie("gac_lastlang")!=a&&("zh-Hans"===a?setCookie("gac_lastlang","cn"):-1===["en","ru","cn"].indexOf(a)?setCookie("gac_lastlang","en"):setCookie("gac_lastlang",a),!getCookie("gac_units")&&("en"==a?setCookie("gac_units","imperial"):setCookie("gac_units","metric")))}