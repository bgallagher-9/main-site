
// animation for landing page
var Canvas = document.querySelector('canvas');
var Canvas2 = document.querySelector('canvas2');
var circle = Canvas.getContext('2d');

var angleS1 = (2 * Math.PI);
var angleE1 = (1.6 * Math.PI);
var angleC1 = 0;

var angleS2 = (2 * Math.PI);
var angleE2 = (Math.PI * 1.7);
var angleC2 = 0;

var angleS3 = (2 * Math.PI);
var angleE3 = (Math.PI * 1.8);
var angleC3 = 0;

var angleS4 = (2 * Math.PI);
var angleE4 = (Math.PI * 1.7);
var angleC4 = 0;

var oldTimer = timing();

function timing() {
  return (new Date()).getTime();
}

function Animate() {
  Canvas.width  = Canvas.scrollWidth;
  Canvas.height = Canvas.scrollHeight;
  var newTimer = timing(), diff = newTimer - oldTimer;
  oldTimer = newTimer;
  circle.clearRect(0, 0, Canvas.width, Canvas.height);

  // circle1 draw********************
  circle.beginPath();
  circle.arc(100, 100, 65, angleS1 + angleC1, angleE1 + angleC1, false);
  circle.strokeStyle = 'white';
  circle.lineWidth = 5;
  circle.padding = 5;
  circle.stroke();
  angleC1 += diff * 0.0004;
  angleC1 %= 2*Math.PI;

// circle2 draw********************
  circle.beginPath();
  circle.arc(100, 100, 45, angleS2 + angleC2, angleE2 + angleC2, false);
  circle.strokeStyle = 'white';
  circle.lineWidth = 4;
  circle.stroke();
  angleC2 += diff * -0.0003;
  angleC2 %= 2*Math.PI;

  //circle3 draw*********************
  circle.beginPath();
  circle.arc(100, 100, 25, angleS3 + angleC3, angleE3 + angleC3, false);
  circle.strokeStyle = 'white';
  circle.lineWidth = 3;
  circle.stroke();
  angleC3 += diff * 0.0003;
  angleC3 %= 2* Math.PI;

  //circle4 draw*********************
  circle.beginPath();
  circle.arc(100, 100, 10, angleS4 + angleC4, angleE4 + angleC4, false);
  circle.strokeStyle = 'white';
  circle.lineWidth = 2;
  circle.stroke();
  angleC4 += diff * -0.0004;
  angleC4 %= 2* Math.PI;

  window.requestAnimationFrame(Animate);
}
window.requestAnimationFrame(Animate);


// // applying class for scrolling
 var width1 = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
//
var height1 = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
//
// console.log('width1', width1, 'height1', height1);
// var aboutPin = document.querySelector('.about-pin');
//   function scrollPin(evt) {
//     console.log(window.scrollY);
//     var image = height1 + 250;
//     console.log(image);
//     if (window.scrollY >= image) {
//       aboutPin.classList.add('about-pin');
//     }
//     else {
//       aboutPin.classList.remove('about-pin');
//     }
//   }
// window.addEventListener('scroll', scrollPin);

var homeSlide = document.querySelector('.container-home');
var addFace = document.querySelector('.image');
function intro() {
  homeSlide.classList.add('home-slide');
  homeSlide.classList.remove('centered');
  addFace.classList.add('face');

};
setTimeout(intro, 2500);
