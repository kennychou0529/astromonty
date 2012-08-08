﻿
var CoordX = 84.053;
var CoordY = -1.201;
var Scale = 25; // увеличить в 10 раз
var Magnitude = 9; // величина звезд
var WSizeX = 0;
var WSizeY = 0;
var PI2 = Math.PI*2;
// текущие координаты телескопа(зелёный крестик)
var CurrentPosition = {
	X : 84.053,
	Y : -1.201,
};
var MousePosition = {
	X : 0,
	Y : 0,
};
// текущее положение просмотра
var ViewPosition = {
	X : 84.053,
	Y : -1.201,
};
// целевые координаты телескопа(желтый крестик)
var TargetPosition = {
	X : 87.053,
	Y : 4.201,
};
var StarView;

function onMouseDown(e){	
	this.Drag = true;
	this.Select = true;
	e = e || window.event;	
	var canvas = document.getElementById('my_canvas');			
	var pos = getPosition(canvas);
	if (e.pageX == null && e.clientX != null ) { 
		var html = document.documentElement;
		var body = document.body;
		var canvas = document.getElementById('my_canvas');
		
		e.pageX = e.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0);
		e.pageY = e.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0);
	}	
	MousePosition.X = e.pageX - pos.x-1;
	MousePosition.Y = e.pageY - pos.y-1;
}
function onMouseUp(e){	
	this.Drag = false;	
}

function onMouseWheel(e) {
	e = e || event;

	if (!e.wheelDelta) {
		e.wheelDelta = -40*e.detail; // Firefox
	}
	var info = document.getElementById('delta');
	if(Scale<40){
		Scale = +Scale + e.wheelDelta/120;
	} else if(Scale<300){
		Scale = +Scale + e.wheelDelta/30;
	} else {
		Scale = +Scale + e.wheelDelta/10;		
	}
	if(Scale < 4) {Scale = 4;};
	if(Scale > 1000) {Scale = 1000;};
	e.preventDefault ? e.preventDefault() : (e.returnValue = false);
	updateScale(3);
	//StarView.updateStars();
}


// функция возвращает координату X на экране по координате на небе(градусы) 
function RAToX(X){			
	return (ViewPosition.X - X)*Scale + WSizeX/2;
};
function DEToY(Y){
	return (ViewPosition.Y - Y)*Scale + WSizeY/2;
};
function XToRA(RA){
	return (WSizeX/2 - RA)/Scale + ViewPosition.X
};
function YToDE(DE){
	return (WSizeY/2 - DE)/Scale + ViewPosition.Y
};
/* use a function for the exact format desired... */
function ISODateString(d,UTC){
	function pad(n){return n<10 ? '0'+n : n}
	if(UTC){
		return d.getUTCFullYear()+'-'
			  + pad(d.getUTCMonth()+1)+'-'
			  + pad(d.getUTCDate())+' '
			  + pad(d.getUTCHours())+':'
			  + pad(d.getUTCMinutes())+':'
			  + pad(d.getUTCSeconds());
	} else {
		return d.getFullYear()+'-'
			  + pad(d.getMonth()+1)+'-'
			  + pad(d.getDate())+' '
			  + pad(d.getHours())+':'
			  + pad(d.getMinutes())+':'
			  + pad(d.getSeconds());
	}
}
function UpdateTime(){
	var now = new Date();
	document.getElementById('UTCTime').value = ISODateString(now,true);
	document.getElementById('LocalTime').value = ISODateString(now,false);
}
function loadCanvas() {
	StarView = document.getElementById('my_canvas');
	StarView.onmousedown = onMouseDown;
	StarView.updateStars = updateStars;
	StarView.drawStars = drawStars;
	StarView.DrawCross = DrawCross;
	StarView.onmousemove = mousemoveCanv;
	StarView.onclick = targetSelect;
	StarView.onmouseup = onMouseUp;
	StarView.updateCross = updateCross;
	var elem = document.getElementById('CanvasBox');
	elem.ondragstart = function() {
		return false;
	};
	if (elem.addEventListener) {
	  // IE9+, Opera, Chrome/Safari
		elem.addEventListener ("mousewheel", onMouseWheel, false);
	  // Firefox
		elem.addEventListener ("DOMMouseScroll", onMouseWheel, false);
	} else { // IE<9
	  elem.attachEvent ("onmousewheel", onMouseWheel);
	}
	var timer = setInterval(UpdateTime, 1000);
	StarView.updateStars();
	UpdateSelPos();
	updateTargetForm();
	//загрузка и коррекция координат каталога
	correctCoordinate(Tycho2);
	setTimeout(LoadData,1000);
};

function LoadData(){
	loadScript("stars/Tycho2_5.js", function(){correctCoordinate(Tycho2_5);Tycho2 = Tycho2.concat(Tycho2_5);StarView.updateStars();}, 0 );
	loadScript("stars/Tycho2_6.js", function(){correctCoordinate(Tycho2_6);Tycho2 = Tycho2.concat(Tycho2_6);StarView.updateStars();}, 0 );
	loadScript("stars/Tycho2_71.js", function(){correctCoordinate(Tycho2_71);Tycho2 = Tycho2.concat(Tycho2_71);StarView.updateStars();}, 0 );
	loadScript("stars/Tycho2_72.js", function(){correctCoordinate(Tycho2_72);Tycho2 = Tycho2.concat(Tycho2_72);StarView.updateStars();}, 0 );
	loadScript("stars/Tycho2_73.js", function(){correctCoordinate(Tycho2_73);Tycho2 = Tycho2.concat(Tycho2_73);StarView.updateStars();}, 0 );
	loadScript("stars/Tycho2_81.js", function(){correctCoordinate(Tycho2_81);Tycho2 = Tycho2.concat(Tycho2_81);StarView.updateStars();}, 0 );
	loadScript("stars/Tycho2_82.js", function(){correctCoordinate(Tycho2_82);Tycho2 = Tycho2.concat(Tycho2_82);StarView.updateStars();}, 0 );
	loadScript("stars/Tycho2_83.js", function(){correctCoordinate(Tycho2_83);Tycho2 = Tycho2.concat(Tycho2_83);StarView.updateStars();}, 0 );
	loadScript("stars/Tycho2_84.js", function(){correctCoordinate(Tycho2_84);Tycho2 = Tycho2.concat(Tycho2_84);StarView.updateStars();}, 0 );
	loadScript("stars/Tycho2_85.js", function(){correctCoordinate(Tycho2_85);Tycho2 = Tycho2.concat(Tycho2_85);StarView.updateStars();}, 0 );
	loadScript("stars/Tycho2_86.js", function(){correctCoordinate(Tycho2_86);Tycho2 = Tycho2.concat(Tycho2_86);StarView.updateStars();}, 0 );
	loadScript("stars/Tycho2_87.js", function(){correctCoordinate(Tycho2_87);Tycho2 = Tycho2.concat(Tycho2_87);StarView.updateStars();}, 0 );
	loadScript("stars/Tycho2_88.js", function(){correctCoordinate(Tycho2_88);Tycho2 = Tycho2.concat(Tycho2_88);StarView.updateStars();}, 0 );
}

function AngleToObj(A,h){
	var tA = A;
	if(h){
		tA = A/15;
	}
	var grad = Math.floor(tA);
	tA = (tA - grad)*60;
	var min = Math.floor(tA);
	var sec = ((tA - min)*60);
	return {H:grad,M:min,S:sec};
};
function objToAngle(O,h){
	var tA = 0;
	tA = O.M + O.S/60;
	if(O.H>=0){
		tA = O.H + tA/60;
	} else {
		tA = O.H - tA/60;
	}
	if(h) return tA*15;
	return tA;
};
function AngleToString(A,h){
	var tA = A;
	var s = "° ";
	if(h){
		tA = A/15;
		s = "h "
	}		
	var grad = Math.floor(tA);
	tA = (tA - grad)*60;
	var min = Math.floor(tA);
	var sec = ((tA - min)*60);
	return "" + grad + s + min + "' " + sec.toFixed(2) + '"';
	
};
function updateScale(id){
	var range = document.getElementById('starScale');
	var rangeN = document.getElementById('starScaleN');
	if((range.value == rangeN.value) && (range.value == Scale)) return;
	switch (id){
	case 1:
		Scale = +range.value;
		rangeN.value = +range.value;
		break;
	case 2:
		Scale = +rangeN.value;
		range.value = +rangeN.value;
		break;
	case 3:
		rangeN.value = +Scale;
		range.value = +Scale;
		break;
	}
	StarView.updateStars();
}
function updateMagn(id){
	var Magn = document.getElementById('starMagn');
	var MagnN = document.getElementById('starMagnN');
	if(Magn.value == MagnN.value) return;
	if(id==1){
		Magnitude = Magn.value;
		MagnN.value = Magn.value;
	} else {
		Magnitude = MagnN.value;
		Magn.value = MagnN.value;
	}
	StarView.updateStars();
}
function drawStars(Catalog){
	var canvas = this;
	if(canvas.getContext) {
		var ctx = canvas.getContext('2d');
		WSizeX = canvas.width;
		WSizeY = canvas.height;
		var ImgLeft  = ViewPosition.X + WSizeX/(2*Scale);
		var ImgRight = ViewPosition.X - WSizeX/(2*Scale);
		var ImgTop   = ViewPosition.Y + WSizeY/(2*Scale);
		var ImgBottom = ViewPosition.Y - WSizeY/(2*Scale);
		var i = 0;
		
		var maxMag = -5;
		var ArrsLength = Catalog.length;
		var elem = {RA:0,DE:0,mag:0};
		var Starsize;
		
		for ( i = 0;i < ArrsLength; i++) {
			elem.RA = Catalog[i][0];
			elem.DE = Catalog[i][1];
			elem.mag = Catalog[i][2];
			if(elem.mag > Magnitude) break;
			if(elem.mag < maxMag) continue;
			if(elem.RA < ImgRight) continue;
			if(elem.RA > ImgLeft) continue;
			if(elem.DE < ImgBottom) continue;
			if(elem.DE > ImgTop) continue;
			ctx.beginPath();
			switch (elem.mag){
				case -1.088: ctx.fillStyle = "blue"; // сириус
							 ctx.strokeStyle = "blue";
				break;
				case 0.283 : ctx.fillStyle = "cyan"; //Ригель
							 ctx.strokeStyle = "cyan"; 
				break;
				case 0.769 : ctx.fillStyle = "red"; // бетельгейзе
					ctx.strokeStyle = "red";
				break;
				default :    ctx.fillStyle = "white";
					ctx.strokeStyle = "white";
				break;
			}
			Starsize = (9 - elem.mag)*Scale/100+0.5;			
			ctx.arc((ImgLeft-elem.RA)*Scale,(ImgTop - elem.DE)*Scale, Starsize,0,PI2,true);
			//if(Starsize>0.5) {
				ctx.fill();
			//} else {
				//ctx.stroke();
			//}
		};
	} else {
		document.getElementById('my_canvas').style.display = 'none';
		document.getElementById('no-canvas').style.display = 'block';
	}
}
function updateStars() {
	var canvas = document.getElementById('my_canvas');
	if(canvas.getContext) {
		var ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, WSizeX, WSizeY);
		if(Tycho2) StarView.drawStars(Tycho2);
		StarView.updateCross();
	}
};
function updateCross(){
	var canvas = this;
	if(canvas.getContext) {
		this.DrawCross(RAToX(CurrentPosition.X),DEToY(CurrentPosition.Y),"green",true);
		this.DrawCross(RAToX(TargetPosition.X),DEToY(TargetPosition.Y),"yellow",false);
	}
}

function DrawCross(X,Y,color,wCircle){
	var canvas = this;
	if(canvas.getContext) {
		var ctx = canvas.getContext('2d');
		ctx.beginPath();
		ctx.strokeStyle  = color;
		if(wCircle){
			ctx.arc(X, Y,30,0,Math.PI*2,true);
			ctx.stroke();
		}
		ctx.moveTo(X + 30, Y);
		ctx.lineTo(X + 5, Y);
		ctx.stroke();
		ctx.moveTo(X - 5, Y);
		ctx.lineTo(X - 30, Y);
		ctx.stroke();
		ctx.moveTo(X, Y - 30);
		ctx.lineTo(X, Y - 5);
		ctx.stroke();
		ctx.moveTo(X, Y + 5);
		ctx.lineTo(X, Y + 30);
		ctx.stroke();
	}
}
function mousemoveCanv(e){
	e = e || window.event;	
	var canvas = document.getElementById('my_canvas');			
	var pos = getPosition(canvas);
	if (e.pageX == null && e.clientX != null ) { 
		var html = document.documentElement;
		var body = document.body;
		var canvas = document.getElementById('my_canvas');
		
		e.pageX = e.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0);
		e.pageY = e.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0);
	}
	if(this.Drag) this.Select = false;
	if(!this.Drag){
		//document.getElementById('outX').value = AngleToString(XToRA(e.pageX - pos.x -1),true);
		//document.getElementById('outY').value = AngleToString(YToDE(e.pageY - pos.y -1),false);
		document.getElementById('outXt').value = AngleToString(XToRA(e.pageX - pos.x -1),true);
		document.getElementById('outYt').value = AngleToString(YToDE(e.pageY - pos.y -1),false);
	} else {
		var dX = (e.pageX - pos.x -1) - MousePosition.X;
		var dY = (e.pageY - pos.y -1) - MousePosition.Y; 
		ViewPosition.X += dX/Scale;
		ViewPosition.Y += dY/Scale;
		this.updateStars();
		MousePosition.X = e.pageX - pos.x -1;
		MousePosition.Y = e.pageY - pos.y -1;
	}
}
function getPosition(e){
	var left = 0;
	var top  = 0;

	while (e.offsetParent){
		left += e.offsetLeft;
		top  += e.offsetTop;
		e	 = e.offsetParent;
	};

	left += e.offsetLeft;
	top  += e.offsetTop;

	return {x:left, y:top};
}
function targetSelect(e){
	if(!this.Select) return;	
	e = e || window.event;	
	var canvas = document.getElementById('my_canvas');
	var pos = getPosition(canvas);
	if (e.pageX == null && e.clientX != null ) { 
		var html = document.documentElement;
		var body = document.body;
		var canvas = document.getElementById('my_canvas');
		
		e.pageX = e.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0);
		e.pageY = e.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0);
	}
	TargetPosition.X = XToRA(e.pageX - pos.x-1);
	TargetPosition.Y = YToDE(e.pageY - pos.y-1);
	updateTargetForm();
	StarView.updateStars();
}
function updateTargetForm(){
	var RAobj = AngleToObj(TargetPosition.X,true);
	var DEobj = AngleToObj(TargetPosition.Y,false);
	document.getElementById('RAh').value = RAobj.H;
	document.getElementById('RAm').value = RAobj.M;
	document.getElementById('RAs').value = RAobj.S.toFixed(2);
	
	document.getElementById('DEh').value = DEobj.H;
	document.getElementById('DEm').value = DEobj.M;
	document.getElementById('DEs').value = DEobj.S.toFixed(2);
}
function GoTo(){
	CurrentPosition.X = TargetPosition.X;
	CurrentPosition.Y = TargetPosition.Y;
	StarView.updateStars();
	UpdateSelPos();
}
function GoToView(){
	ViewPosition.X = CurrentPosition.X;
	ViewPosition.Y = CurrentPosition.Y;
	StarView.updateStars();	
}
function UpdateSelPos(){
	document.getElementById('TelX').value = AngleToString(CurrentPosition.X,true);
	document.getElementById('TelY').value = AngleToString(CurrentPosition.Y,false);
}
//var ElementUpgraded = 0;
function updateTarget(id){
	var Aobj = {
		H : 0,
		M : 0,
		S : 0,
	};
	Aobj.S = +document.getElementById('RAs').value;			
	Aobj.M = +document.getElementById('RAm').value;
	Aobj.H = +document.getElementById('RAh').value;
	if(Aobj.S >= 60) {
		Aobj.S -= 60;
		Aobj.M += 1;
		document.getElementById('RAm').value = Aobj.M;
		document.getElementById('RAs').value = Aobj.S.toFixed(2);
	}
	if(Aobj.M >= 60) {
		Aobj.M = Aobj.M - 60;
		Aobj.H += 1;
		document.getElementById('RAm').value = Aobj.M;
		document.getElementById('RAh').value = Aobj.H;
	}
	if(Aobj.S <= -1) {
		Aobj.S += 60;
		Aobj.M -= 1;
		document.getElementById('RAm').value = Aobj.M;
		document.getElementById('RAs').value = Aobj.S.toFixed(2);
	}
	if(Aobj.M <= -1) {
		Aobj.M += 60;
		Aobj.H -= 1;
		document.getElementById('RAm').value = Aobj.M;
		document.getElementById('RAh').value = Aobj.H;
	}
	
	TargetPosition.X = +objToAngle(Aobj, true);

	Aobj.H = +document.getElementById('DEh').value;
	Aobj.M = +document.getElementById('DEm').value;
	Aobj.S = +document.getElementById('DEs').value;
	if(Aobj.S >= 60) {
		Aobj.S = Aobj.S - 60;
		Aobj.M += 1;
		document.getElementById('DEm').value = Aobj.M;
		document.getElementById('DEs').value = Aobj.S.toFixed(2);
	}
	if(Aobj.M >= 60) {
		Aobj.M = Aobj.M - 60;
		Aobj.H += 1;
		document.getElementById('DEm').value = Aobj.M;
		document.getElementById('DEh').value = Aobj.H;
	}
	if(Aobj.S <= -1) {
		Aobj.S += 60;
		Aobj.M -= 1;
		document.getElementById('DEm').value = Aobj.M;
		document.getElementById('DEs').value = Aobj.S.toFixed(2);
	}
	if(Aobj.M <= -1) {
		Aobj.M += 60;
		Aobj.H -= 1;
		document.getElementById('DEm').value = Aobj.M;
		document.getElementById('DEh').value = Aobj.H;
	}
	TargetPosition.Y = +objToAngle(Aobj, false);
	
	StarView.updateStars();
}

function correctCoordinate(Catalog){
	var ArrsLength = Catalog.length;
	var now = new Date();
	var j2000 = new Date(Date.UTC(2000, 0, 1, 11, 58, 55, 816));// 11:58:55,816 1 января 2000 года по UTC	
	var ddd = now - j2000;
	var YearsFromJ2000 = ddd/(3600000*24*365);
	for (var i = 0;i < ArrsLength; i++) {
		Catalog[i][0] += Catalog[i][6]/3600;
		Catalog[i][1] += Catalog[i][7]/3600;
		//Catalog[i][2] = (9 - Catalog[i][2])/4+0.5;
	}
}



function Tooltip(options) {

  var offsetFromCursor = (options.offset === undefined) ? 10 : options.offset;
  var tooltipElem;
  var isEnabled = true;

  var elem = options.elem;
  var html = options.html;

  elem.on({
    mouseenter: onMouseEnter,
    mouseleave: onMouseLeave,
    mousemove: onMouseMove
  });

  function onMouseEnter(e) {
    show(e.pageX, e.pageY);
  }

  function onMouseLeave() {
    hide();    
  }

  function onMouseMove(e) {
    show(e.pageX, e.pageY);    
  }


  function hide() {
    getTooltipElem().remove();
  };

  function getTooltipElem() {
    if (!tooltipElem) {
      tooltipElem = $('<div/>', {
        "class" : 'tooltip',
        html: html
      });
    }
    return tooltipElem;
  }

  function show(pageX, pageY) {
    var tooltipElem = getTooltipElem();

    if (!tooltipElem.is(':visible')) {
      // первым делом - отобразить подсказку, чтобы можно было получить её размеры
      tooltipElem.appendTo('body');
    }

    var scrollY = $(window).scrollTop();
    var winBottom = scrollY + $(window).height();

    var scrollX = $(window).scrollLeft();
    var winRight  = scrollX + $(window).width();

    var newLeft = pageX + offsetFromCursor;
    var newTop = pageY + offsetFromCursor;

    if (newLeft + tooltipElem.outerWidth() > winRight) { // если за правой границей окна
      newLeft -= tooltipElem.outerWidth();
      newLeft -= offsetFromCursor + 2; // немного левее, чтобы курсор был не над подсказкой
    }

    if (newTop + tooltipElem.outerHeight() > winBottom) { // если за нижней границей окна
      newTop -= tooltipElem.outerHeight();
      newTop -= offsetFromCursor + 2;  // немного выше
    }

    tooltipElem.css({
      left: newLeft,
      top: newTop
    });
  };
}


var loadScript = function(src, callback, appendTo) {
    var script = document.createElement('script');

    if (!appendTo) {
        appendTo = document.getElementsByTagName('head')[0];
    }

    if (script.readyState && !script.onload) {
        // IE, Opera
        script.onreadystatechange = function() {
            if (script.readyState == "loaded" || script.readyState == "complete") {
                script.onreadystatechange = null;
                callback();
            }
        }
    }
    else {
        // Rest
        script.onload = callback;
    }

    script.src = src;
    appendTo.appendChild(script);
}

//AJAX***********************************
function ajaxSelect(id) {
    var element = document.getElementById(id)

    var onLoaded = function(data) {
        var i=0
        for(var key in data) {
            var label = data[key]
            element.options[i++] = new Option(label, key)
        }
    }
    
    var onLoadError = function(error) {
        var msg = "Ошибка "+error.errcode
        if (error.message) msg = msg + ' :'+error.message
        alert(msg)
    }
    
    var showLoading = function(on) {
        element.disabled = on
    }

    var onSuccess = function(data) {
        if (!data.errcode) {
            onLoaded(data)
            showLoading(false)        
        } else {
            showLoading(false)
            onLoadError(data)            
        }
    }
    
    
    var onAjaxError = function(xhr, status){
        showLoading(false)
        var errinfo = { errcode: status }
        if (xhr.status != 200) {
            // может быть статус 200, а ошибка
            // из-за некорректного JSON
            errinfo.message = xhr.statusText
        } else {
            errinfo.message = 'Некорректные данные с сервера'
        }
        onLoadError(errinfo)
    }

    
    return {
        load: function(url) {
            showLoading(true)

            while (element.firstChild) {
                element.removeChild(element.firstChild)
            }

            $.ajax({ // для краткости - jQuery
                url: url,
                dataType: "json",
                success: onSuccess,
                error: onAjaxError,
                cache: false
            })
        }
    }
}
