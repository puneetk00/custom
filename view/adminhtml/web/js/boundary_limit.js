var left1 = 0;
var top1 = 0;
var scale1x = 0;
var scale1y = 0;
var width1 = 0;
var height1 = 0;
var padding = 30;
var paddingRound = 40;


function _objectScaleBoundary(e) { 
	var obj = e.target;
	obj.setCoords();
	var brNew = obj.getBoundingRect();

	if (((brNew.width + brNew.left) >= obj.canvas.width) || ((brNew.height + brNew.top) >= obj.canvas.height) || ((brNew.left < 0) || (brNew.top < 0))) {
		obj.left = left1;
		obj.top = top1;
		obj.scaleX = scale1x;
		obj.scaleY = scale1y;
		obj.width = width1;
		obj.height = height1;
	}
	else {
		left1 = obj.left;
		top1 = obj.top;
		scale1x = obj.scaleX;
		scale1y = obj.scaleY;
		width1 = obj.width;
		height1 = obj.height;
	}
}


function _objectScaleBoundaryRound(e) {
	
	var obj = e.target;
	obj.setCoords();
	var brNew = obj.getBoundingRect();

	if (((brNew.width + brNew.left) >= obj.canvas.width) || ((brNew.height + brNew.top) >= obj.canvas.height) || ((brNew.left < 0) || (brNew.top < 0))) {
		obj.left = left1;
		obj.top = top1;
		obj.scaleX = scale1x;
		obj.scaleY = scale1y;
		obj.width = width1;
		obj.height = height1;
	}
	else {
		left1 = obj.left;
		top1 = obj.top;
		scale1x = obj.scaleX;
		scale1y = obj.scaleY;
		width1 = obj.width;
		height1 = obj.height;
	}
	
}

function objectBoundaryLimit(e) { 
	var obj = e.target;
    
	// if object is too big ignore
	if (obj.currentHeight > obj.canvas.height - padding * 2 ||
		obj.currentWidth > obj.canvas.width - padding * 2) {
		return;
	}
	obj.setCoords();

	// top-left corner
	if (obj.getBoundingRect().top < padding ||
		obj.getBoundingRect().left < padding) {
		obj.top = Math.max(obj.top, obj.top - obj.getBoundingRect().top + padding);
		obj.left = Math.max(obj.left, obj.left - obj.getBoundingRect().left + padding);
	}
	
	// bot-right corner
	if (obj.getBoundingRect().top + obj.getBoundingRect().height > obj.canvas.height - padding || 
		obj.getBoundingRect().left + obj.getBoundingRect().width > obj.canvas.width - padding) {
		obj.top = Math.min(
			obj.top,
			obj.canvas.height - obj.getBoundingRect().height + obj.top - obj.getBoundingRect().top - padding);
		obj.left = Math.min(
			obj.left,
			obj.canvas.width - obj.getBoundingRect().width + obj.left - obj.getBoundingRect().left - padding);
	}
}

function objectBoundaryLimitRound(e) {
	 var obj = e.target;
	 if (obj.currentHeight > obj.canvas.height - paddingRound * 3 ||
		obj.currentWidth > obj.canvas.width - paddingRound * 3) {
		return;
	}
	obj.setCoords();

	// top-left corner
	if (obj.getBoundingRect().top < paddingRound ||
		obj.getBoundingRect().left < paddingRound) {
		obj.top = Math.max(obj.top, obj.top - obj.getBoundingRect().top + paddingRound);
		obj.left = Math.max(obj.left, obj.left - obj.getBoundingRect().left + paddingRound);
	}
	
	// bot-right corner
	if (obj.getBoundingRect().top + obj.getBoundingRect().height > obj.canvas.height - paddingRound || 
		obj.getBoundingRect().left + obj.getBoundingRect().width > obj.canvas.width - paddingRound) {
		obj.top = Math.min(
			obj.top,
			obj.canvas.height - obj.getBoundingRect().height + obj.top - obj.getBoundingRect().top - paddingRound);
		obj.left = Math.min(
			obj.left,
			obj.canvas.width - obj.getBoundingRect().width + obj.left - obj.getBoundingRect().left - paddingRound);
	}
}