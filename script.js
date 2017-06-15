var Canvas = document.querySelector('canvas');
var Canvas2 = document.querySelector('canvas2');
var circle = Canvas.getContext('2d');

var angleS1 = (2*Math.PI);
var angleE1 = (1.8*Math.PI);
var angleC1 = 2;

var angleS2 = (2*Math.PI);
var angleE2 = (Math.PI*1.6);
var angleC2 = 0;

var frameNumber = 1;

var oldTimer = timing();
var oldTimer2 = timing2();

function timing() {
  return (new Date()).getTime() * .25;
};
function timing2() {
  return (new Date()).getTime() * -.25;
};

function Animate() {
  // circle1 draw********************
  Canvas.width  = Canvas.scrollWidth;
  Canvas.height = Canvas.scrollHeight;
  var newTimer = timing(), diff = newTimer - oldTimer;
  var newTimer2 = timing2(), diff2 = newTimer2 - oldTimer2;

  oldTimer = newTimer;
  oldTimer2 = newTimer2;

  circle.clearRect(0, 0, Canvas.width, Canvas.height);
  circle.beginPath();
  circle.arc(100, 100, 100, angleS1 + angleC1, angleE1 + angleC1, false);
  circle.strokeStyle = 'white';
  circle.lineWidth = 5;
  circle.padding = 5;
  circle.stroke();
  angleC1 += diff * .001;
  angleC1 %= 2*Math.PI;

// circle2 draw********************
  circle.beginPath();
  circle.arc(100, 100, 75, angleS2 + angleC2, angleE2 + angleC2, false);
  circle.strokeStyle = 'white';
  circle.lineWidth = 4;
  circle.stroke();
  angleC2 += diff2 * .004;
  angleC2 %= 2*Math.PI;

  window.requestAnimationFrame(Animate);
}
window.requestAnimationFrame(Animate);
