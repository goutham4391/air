$("document").ready(function(){function a(){// do nothing
}// instantiate some variables
var b=document.getElementById("heroVid"),c=document.getElementById("contact-video"),d=0,e=document.getElementById("no-video-controls");// set height for banner video to about half window height
if(null!=c){// recalculate the banner video's size when shown on phone resolutions
var f,g=$(".video-banner-wrapper").find("script").eq(0).attr("src").split("/");window._wq=window._wq||[],_wq.push({id:g[g.length-1].split(".")[0],onReady:function onReady(b){f=b,a(b,"contact-video")}})}// configure the hero video's behavior when present on the page
if(null!=b&&null==e){// update the circle's circumference as the video progresses
var h=function(a){var b=document.querySelector(".progress-ring__circle"),c=b.r.baseVal.value,d=2*c*Math.PI;b.style.strokeDasharray=d+" "+d,b.style.strokeDashoffset=d,b.style.strokeDashoffset=d-a/100*d},i=window.innerHeight+50;// update the numerical readout of the timer as the video progresses
0==window.pageYOffset&&(b.style.opacity=1),window.pageYOffset>=i&&(b.style.position="relative",b.style.opacity=0),h(0);// configure the Wistia player
var j,k=$(".video-wrapper").find("script").eq(0).attr("src").split("/");window._wq=window._wq||[],_wq.push({id:k[k.length-1].split(".")[0],onReady:function onReady(b){j=b,a(b,"heroVid"),b.mute(),b.play();// autoplay
var c=b.duration();//document.querySelector('#duration').innerHTML = setCounter(videoDuration, videoDuration);
// update the numerical and circular display of the video's timestamp
b.bind("timechange",function(a){h(Math.round(100*a/c))}),b.bind("play",function(){$("#playButton").attr("src","/buttons/video-pause.svg"),$("#playButton").removeClass("controls__button--play")}),b.bind("pause",function(){$("#playButton").attr("src","/buttons/video-play.svg"),$("#playButton").addClass("controls__button--play")}),b.bind("end",function(){$("#playButton").attr("src","/buttons/video-play.svg")}),b.bind("mutechange",function(a){a?$("#muteButton").attr("src","/buttons/video-sound-off.svg"):$("#muteButton").attr("src","/buttons/video-sound-on.svg")});// toggle the video's play state when the play button is pressed
var d=$("[data-button='play button']");d.on("click",function(){"playing"===b.state()?b.pause():b.play()});// toggle the video's audio state when the mute button is pressed
var e=$("[data-button='mute button']");e.on("click",function(){j.isMuted()?j.unmute():j.mute()})}})}// on resize and reorientation, fire the resize function
// on scroll, update the video's opacity
$(window).on("resize",function(){null!=j&&a(j,"heroVid"),null!=f&&a(f,"contact-video")}),$(document).on("scroll",function(){var a=window.pageYOffset,c=a;null!=b&&(c>=i?(b.style.position="relative",b.style.opacity=0):b.style.opacity=1-c/(window.innerHeight-50))})});