gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true,
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".main").style.transform
    ? "transform"
    : "fixed",
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

const scroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true,
});

function firstPageAnime() {
  var tl = gsap.timeline();

  tl.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  })
    .to(".boundingText", {
      y: 0,
      ease: Expo.easeInOut,
      duration: 2,
      stagger: 0.35,
      delay: -1.3,
    })
    .from("#herofooter", {
      y: "-10",
      opacity: 0,
      duration: 1.7,
      ease: Expo.easeInOut,
      delay: -1.5,
    });
}

var mouseTimeout;

function circleMouseFix() {
  //define default acale value
  var xscale = 1;
  var yscale = 1;

  var xprev = 0;
  var yprev = 0;

  window.addEventListener("mousemove", function (details) {
    this.clearTimeout(mouseTimeout);
    xscale = gsap.utils.clamp(0.8, 1.2, details.clientX - xprev);
    yscale = gsap.utils.clamp(0.8, 1.2, details.clientY - yprev);

    xprev = details.clientX;
    yprev = details.clientY;

    // console.log(xdiff, ydiff);
    circleMouseFollower(xscale, yscale);

    mouseTimeout = this.setTimeout(function () {
      document.querySelector(".mousefollow").style.transform = `translate(${
        details.clientX
      }px, ${details.clientY}px) scale(${1}, ${1} )`;
    }, 100);
  });
}
function circleMouseFollower(xscale, yscale) {
  window.addEventListener("mousemove", function (details) {
    // console.log(details);
    document.querySelector(
      ".mousefollow"
    ).style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(${xscale}, ${yscale} )`;
  });
}

circleMouseFollower();
circleMouseFix();
firstPageAnime();

document.querySelectorAll(".element").forEach(function (element) {
  var rotate = 0;
  var rotateDiff = 0;

  element.addEventListener("mouseleave", function (details) {
    gsap.to(element.querySelector("img"), {
      opacity: 0,
      ease: Power3,
    });
  });

  element.addEventListener("mousemove", function (details) {
    // console.log(element.getBoundingClientRect());

    // console.log(details.clientY - element.getBoundingClientRect().top);
    var diff = details.clientY - element.getBoundingClientRect().top;
    rotateDiff = details.clientX - rotate;
    rotate = details.clientX;

    gsap.to(element.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: details.clientX,
      rotate: gsap.utils.clamp(-20, 20, rotateDiff * 0.7), //this is for img rotate part
    });
  });
});

// -------------- second-part revealing text ------------
let sd = gsap.timeline({
  scrollTrigger: {
    trigger: ".new_mywork",
    scroller: ".main",
    start: "21% 50%",
    end: "78% 50%",
    // markers: true,
    scrub: 3,
  },
});
sd.to(".text-area-effect", {
  width: "100%",
});

// ----------myself -------------
Shery.makeMagnet(".magnet");

Shery.imageEffect(".myself", {
  style: 4, //Select Style
  // debug: true, // Debug Panel
  config: {
    uColor: { value: true },
    uSpeed: { value: 1.07, range: [0.1, 1], rangep: [1, 10] },
    uAmplitude: { value: 0.61, range: [0, 5] },
    uFrequency: { value: 1.15, range: [0, 10] },
    geoVertex: { range: [1, 64], value: 32 },
    zindex: { value: "9996999", range: [-9999999, 9999999] },
    aspect: { value: 0.7989154993221871 },
    ignoreShapeAspect: { value: true },
    shapePosition: { value: { x: 0, y: 0 } },
    shapeScale: { value: { x: 0.5, y: 0.5 } },
    shapeEdgeSoftness: { value: 0.03, range: [0, 0.5] },
    shapeRadius: { value: 0.03, range: [0, 2] },
    currentScroll: { value: 0 },
    scrollLerp: { value: 0.07 },
    gooey: { value: false },
    infiniteGooey: { value: false },
    growSize: { value: 4, range: [1, 15] },
    durationOut: { value: 1, range: [0.1, 5] },
    durationIn: { value: 1.5, range: [0.1, 5] },
    displaceAmount: { value: 0.5 },
    masker: { value: true },
    maskVal: { value: 1.18, range: [1, 5] },
    scrollType: { value: 0 },
    noEffectGooey: { value: true },
    onMouse: { value: 1 },
    noise_speed: { value: 0.2, range: [0, 10] },
    metaball: { value: 0.2, range: [0, 2] },
    discard_threshold: { value: 0.5, range: [0, 1] },
    antialias_threshold: { value: 0.002, range: [0, 0.1] },
    noise_height: { value: 0.5, range: [0, 2] },
    noise_scale: { value: 10, range: [0, 100] },
  },
});
