var pi180 = 180/Math.PI,
  transl = -3, rTouch, fiTouch, idTouch0,
  xRot = yRot = zRot =  xOffs = yOffs =  drag = 0;
function startTouch(evt) {
  var evList = evt.touches;
  if(evList.length == 1){
    xOffs = evList[0].pageX;  yOffs = evList[0].pageY;
    drag = 1;}
  else if(evList.length == 2){
    idTouch0 = evList[0].identifier;
    var dx = evList[1].pageX - evList[0].pageX;
    var dy = evList[1].pageY - evList[0].pageY;
    rTouch = Math.sqrt(dx*dx + dy*dy);
    fiTouch = Math.atan2(dy, dx);
    drag = 2;}
  evt.preventDefault();
}
function continueTouch(evt) {
  if(drag == 1){
    var x = evt.touches[0].pageX,  y = evt.touches[0].pageY;
    yRot += x - xOffs;  xRot += y - yOffs;
    xOffs = x;  yOffs = y;
    //drawScene();
  }
  else if(drag == 2){
    var dx = evt.touches[1].pageX - evt.touches[0].pageX;
    var dy = evt.touches[1].pageY - evt.touches[0].pageY;
    var r = Math.sqrt(dx*dx + dy*dy);
    var fi;
    if( idTouch0 == evt.touches[0].identifier ) fi = Math.atan2(dy, dx);
    else fi = Math.atan2(-dy, -dx);
    transl *= rTouch / r;
    zRot += pi180*(fiTouch - fi);
    rTouch = r;  fiTouch = fi;
    //drawScene();
  }
}
function stopTouch() {
  drag = 0;
}
function mymousedown( ev ){
  drag  = 1;
  xOffs = ev.clientX;  yOffs = ev.clientY;
}
function mymouseup( ev ){
  drag  = 0;
}
function mymousemove( ev ){
  if ( drag == 0 ) return;
  if ( ev.shiftKey ) {
    transl *= 1 + (ev.clientY - yOffs)/1000;
    zRot += (xOffs - ev.clientX)*.3; }
  else {
    yRot += - xOffs + ev.clientX;  xRot += - yOffs + ev.clientY; }
  xOffs = ev.clientX;   yOffs = ev.clientY;
  //drawScene();
}
function wheelHandler(ev) {
  var del = 1.1;
  if (ev.shiftKey) del = 1.01;
  var ds = ((ev.detail || ev.wheelDelta) > 0) ? del : (1 / del);
  transl *= ds;
  //drawScene();
  ev.preventDefault();
}

function initControl(canvas){
   //canvas = document.getElementById("canvas");
   canvas.addEventListener('DOMMouseScroll', wheelHandler, false);
   canvas.addEventListener('mousewheel', wheelHandler, false);
   canvas.addEventListener('mousedown', mymousedown, false);
   canvas.addEventListener('mouseup', mymouseup, false);
   canvas.addEventListener('mousemove', mymousemove, false);
   canvas.addEventListener('touchstart', startTouch, false);
   canvas.addEventListener('touchmove', continueTouch, false);
   canvas.addEventListener('touchend', stopTouch, false);
}
