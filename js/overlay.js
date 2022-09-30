// some repositioning or resizing of elements
// associated with overlays might be
// necessary when resizing
/** ==============================
 * post-load overlay positioning 
================================ **/function positionOverlay(){for(var a,b=Math.max(document.documentElement.clientWidth,window.innerWidth||0),c=document.querySelectorAll(".text-overlay.positioned"),d=0;d<c.length;d++){if(a=c[d],a.hasAttribute("data-width")){var e=a.getAttribute("data-width").split(",")[600>b?0:1];a.style.width=e}if(a.hasAttribute("data-size")){var f=a.getAttribute("data-size").split(",")[600>b?0:1];a.querySelector(".overlayTitle").style.fontSize=f}if(a.hasAttribute("data-left")){var g=a.getAttribute("data-left").split(",")[600>b?0:1];a.style.left=g}if(a.hasAttribute("data-right")){var g=a.getAttribute("data-right").split(",")[600>b?0:1];a.style.right=g}if(a.hasAttribute("data-top")){var g=a.getAttribute("data-top").split(",")[600>b?0:1];a.style.top=g}if(a.hasAttribute("data-bottom")){var g=a.getAttribute("data-bottom").split(",")[600>b?0:1];a.style.bottom=g}a.classList.contains("initially-hide")&&a.classList.add("fadein")}}function positionImage(){for(var a,b=Math.max(document.documentElement.clientWidth,window.innerWidth||0),c=document.querySelectorAll(".hero-cover img"),d=0;d<c.length;d++)a=c[d],a.hasAttribute("data-position")&&(a.style.objectPosition=a.getAttribute("data-position").split(",")[600>b?0:1])}// function setGradient() {
// 	var gradientEls = document.querySelectorAll(".gradient");
// 	for (var i = 0; i < gradientEls.length; i++) {
// 		var el = gradientEls[i];
// 		// get el's sibling with .gradient-target class
// 		var target;
// 		var sibling = el.parentNode.firstChild;
// 		while (sibling) {
// 			if (sibling.nodeType === 1 && sibling.classList.contains("gradient-target")) {
// 				target = sibling;
// 			}
// 			sibling = sibling.nextSibling;
// 		}
// 		if (target) {
// 			el.style.height = target.offsetHeight + "px";
// 			el.style.width = target.offsetWidth + "px";
// 		}
// 	}
// }
window.onresize=function(){positionOverlay(),positionImage()};