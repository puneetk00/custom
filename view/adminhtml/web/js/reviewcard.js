define(['jquery','fabric','customiseControls','aligning_guidelines','fontfaceobserver','font','boundary_limit','colorpicker','jquery-mask'],function($,colorpicker){
	!(function($){
		var backCards = [];
		var filters = ['grayscale', 'invert', 'remove-color', 'sepia', 'brownie',
                'brightness', 'contrast', 'saturation', 'noise', 'vintage',
                'pixelate', 'blur', 'sharpen', 'emboss', 'technicolor',
                'polaroid', 'blend-color', 'gamma', 'kodachrome',
                'blackwhite', 'blend-image', 'hue', 'resize'];
  
		var mxWidth = 696;
		var mxHeight = 408;
		var cw = mxWidth;
		var ch = mxHeight;
		var lastDownTarget;
		var maxwidthcanvas = 696;
	 	var maxheightcanvas = 408;
		var maxwidthcanvascorner = 734;
		var maxheightcanvascorner = 446;
		var inputVal, inputBox, topVal = 50, newInputVal, newPhoneTopVal = 50, newTopVal = 50, backTopVal = 50, rotateVal = 90;	
		var state;
        var undo = [];
        var redo = [];
		canvas = new fabric.Canvas('front', {
			selection: true,
			perPixelTargetFind: false
		});
		
		canvasBack = new fabric.Canvas('backcanvas', {
			selection: true
		});
		
		var ul = document.getElementsByClassName('backView');
		var button = document.getElementById('saveBackMore');
		var items = document.getElementsByClassName('backViewItem');	
		const BackCardRecords = backCards;		
		var siteUrl = jQuery("#baseurl").val();
		var counter = 0;
		const liMaker = text => {
			counter++
			var stringBackCard = '<div class="backViewItem" id="back_id' + counter + '" back-card="back-card'+counter+'"><div class="item-content">' +'<p>BackCard' + counter + '</p></div></div>';      
			jQuery('.backView').append(stringBackCard);      

		}		
		$(function () {		
			/*help tool tip*/
			setTimeout(() => {
				jQuery('.tooltip-info').css('display', 'none');
			}, 5000);
			
			jQuery('.noButton').on('click', function () {
			   jQuery('.tooltip-info').css('display', 'none');
			});
			
			jQuery('#showTips').on('click', function () {
				jQuery('.tooltip-info').css('display', 'block');
			});
			/*help tool tip end*/
			
			$('.to-links a').on('click', function () {
				var tipsId = $(this).attr('id');
				if (tipsId == 'showTips') {
					$("a#tooltip-info").find('img').attr("src", "/pub/media/images/on.png");
					//$('.tipsContent').append(previewTipsContent);
					$('.tipsContent').children("div.previewTipsContent").hide();
					$('.tipsContent').children("div.designTipsContents").show();
				} else if (tipsId == 'previewTips') {
					$("a#tooltip-info").find('img').attr("src", "/pub/media/images/on.png");
					$('.tipsContent').children("div.designTipsContents").hide();
					$('.tipsContent').children("div.previewTipsContent").show();
					//$('.tipsContent').append(designTipsContents);
				} else {
					$("a#tooltip-info").find('img').attr("src", "/pub/media/images/off.png");
				}
			});
			$(document).on('click', '.card-design-wrapper .tooltip-info .close-preview-tips', function () {
				$('.tooltip-info').css('display', 'none')
			});
			

			
            jQuery(".canvas-editing-options").draggable();
            let front = jQuery('#front-view').css('display');
			/* Back Card Variables */		
			if(jQuery('#saveBackMore').length) {
				button.addEventListener('click', function (e) {
					backTopVal = 50;
					newTopVal = 50;
					e.preventDefault();
					var currentDesignData = canvasBack.toJSON();
					backCards.push(JSON.stringify(currentDesignData));
					liMaker(JSON.stringify(currentDesignData));
					canvasBack.clear();
					jQuery("div#back-view-text.add-new-fields").find('.form_group').remove();
					jQuery("div#export_back.canvas-edit-back").find('.form_cntrl').remove();
					
					while (ul.firstChild) {
						ul.removeChild(ul.firstChild)
					}
				});
			}
			BackCardRecords.forEach(item => {
				liMaker(item)
			});
			
			jQuery(document).on('click', '.backViewItem', function () {		
				var self = jQuery(this);
				var ida = jQuery(this).attr('id');
				ida = ida.slice(-1);
				
				var viewCardData = backCards[ida - 1];
				backViewItem(viewCardData, self, ida,'front');
			});
			
			var addExtraBtnBack = `<div class="addExtraField"><a href="javascript: void(0)" class="add-more-field" id="user-back-add-field"><i class="fas fa-plus"></i>Add new text field</a></div>`;  
			
			
			if(jQuery('#export_back').length) {			
				jQuery('.back-inputs-ctrl').append(addExtraBtnBack);
			}
			
			function backViewItem(jsonData,currentObj,ida,itemClass) {
				jQuery("div#back-view-text.add-new-fields").find('.form_group').remove();
				canvasBack.loadFromJSON(jsonData, canvasBack.renderAll.bind(canvasBack));
				var currentData = JSON.stringify(canvasBack);
				let data = JSON.parse(currentData);
				
				if(jQuery('#export_back').length) {			
					jQuery('.back-inputs-ctrl').empty();
					jQuery('.back-inputs-ctrl').append(addExtraBtnBack);
				}
				
				for (let i = 1; i <= data.objects.length; i++) {	
					if(jQuery('#export_back').length) {
						 var userBackInput = '<div class="form_cntrl"><textarea  required="required" class="require_field inputs-ctrl-user user-back-ctrl">Tap and Type</textarea><div class="checkbox_wrapper"><a href="javascript: void(0)" class="remove"><img src="/pub/media/images/cross-disable.png" style="width:30px;height:30px;background-position: center center" /></a></div></div>';
						jQuery('.back-inputs-ctrl').append(userBackInput);
					}
					if(jQuery('#back-view-text').length) {
						var userBackInput = '<div class="form_group"><div class="text_field"><textarea  required="required" class="inputs-ctrl">Tap and Type</textarea></div><div class="checkbox_wrapper"><a href="javascript: void(0)" class="remove"><img src="/pub/media/images/cross-disable.png" style="width:30px;height:30px;background-position: center center" /></a></div></div>';
						jQuery('#back-view-text').append(userBackInput);
					}
					
				}			
				jQuery('#saveBackMore').hide();
				jQuery('#updateBackMore').show();	
				jQuery('#editUpdateBackMore').show();				
				jQuery('#updateBackMore').attr('data-back-card',ida);
				jQuery('#editUpdateBackMore').attr('data-back-card',ida);
				
			}
			

			jQuery(document).on('click', '.card-back-output',function(){
				var currentData = JSON.stringify(canvasBack);
				let data = JSON.parse(currentData);
				jQuery("div#back-view-text.add-new-fields").find('.form_group').remove();		  
				for (let i = 1; i <= data.objects.length; i++) {
					var input = '<div class="form_group"><div class="text_field"> <textarea id="fname_id" class="inputs-ctrl" name="comment" required="required" placeholder="Tap and Type"></textarea></div> <div class="checkbox_wrapper"><a href="javascript: void(0)" class="remove"><img src="/pub/media/images/cross-disable.png" style="width:30px;height:30px;background-position: center center" /></a></div></div>';
					jQuery('#back-add-field').parent('.add-new-fields').append(input);
				}
			});
	
			jQuery("#editUpdateBackMore").click(function(e) {
				var editedBackCard = jQuery(this).attr('data-back-card');
				editedBackCard = editedBackCard.slice(-1);	
				var currentDesignData = canvasBack.toJSON();	
				currentDesignData =  JSON.stringify(currentDesignData);					
				backCards[editedBackCard - 1] = currentDesignData;		
				canvasBack.clear();	
				jQuery("div.back-inputs-ctrl").find('.form_cntrl').remove();
				jQuery("div#export_back.canvas-edit-back").find('.form_cntrl').remove();
				jQuery('#saveBackMore').show();
				jQuery('#editUpdateBackMore').hide();	 
				jQuery('#editUpdateBackMore').attr('data-back-card','');
			});
	
			jQuery("#updateBackMore").click(function(e) {
				var editedBackCard = jQuery(this).attr('data-back-card');
				editedBackCard = editedBackCard.slice(-1);
				var currentDesignData = JSON.stringify(canvasBack.toJSON());
				backCards[editedBackCard - 1] = currentDesignData;							
				canvasBack.clear();
				jQuery("div#back-view-text.add-new-fields").find('.form_group').remove();
				jQuery("div#export_back.canvas-edit-back").find('.form_cntrl').remove();
				jQuery('#saveBackMore').show();
				jQuery('#updateBackMore').hide();	 
				jQuery('#updateBackMore').attr('data-back-card','');
				newTopVal = 50;
			});
			
			/*End Back Card Variables*/

			fabric.StaticCanvas.prototype._toObjectMethod = (function(toObjectMethod) {
			  return function(propertiesToInclude) {
				return fabric.util.object.extend(toObjectMethod.call(this, "toDatalessObject", propertiesToInclude), {
				  cardtype: this.cardtype
				});
			  };
			})(fabric.StaticCanvas.prototype._toObjectMethod);
			
			
			fabric.isWebglSupported(fabric.textureSize);
			canvas.setWidth(mxWidth);
			canvas.setHeight(mxHeight);
			canvasBack.setWidth(mxWidth);
			canvasBack.setHeight(mxHeight);
		
			canvas.backgroundColor = "#fff";
			canvasBack.backgroundColor = "#fff";
			fabric.Object.prototype.transparentCorners = false;
			let frontActiveObj = canvas.getActiveObject();
			let backActiveObj = canvasBack.getActiveObject();		
			fabric.Object.prototype.setControlsVisibility({
				'tl': false,
				'tr': false,
				'bl': false,
				'br': false,
				'ml': true,
				'mt': false,
				'mr': true,
				'mb': false,
				'mtr': true
			});
			fabric.Object.prototype.set({
				hasRotatingPoint: true,
				cornerSize: 15,
				padding: 15
			});		
			canvas.observe('object:moving', function (e) {
				jQuery('.canvas-editing-options').css({
					display: 'none'
				});
				jQuery('#admin-view .bg-img').css({display: 'block'});	
				jQuery('#admin-view .safe-zone').css({ display: 'block' });				
				objectBoundaryLimit(e);
			});
			canvas.observe('object:scaling', function (e) {
				_objectScaleBoundary(e);
				jQuery('#admin-view .bg-img').css({display: 'block'});
				jQuery('#admin-view .safe-zone').css({ display: 'block' });	

			});
			canvas.observe('object:moved', function () {
				jQuery('#admin-view .bg-img').css({display: 'none'});
				jQuery('#admin-view .safe-zone').css({ display: 'none' });	
			});
			canvas.observe('object:scaled', function () {
				jQuery('#admin-view .bg-img').css({display: 'none'});
				jQuery('#admin-view .safe-zone').css({ display: 'none' });	
			});
			canvas.observe('object:modified', function (e) {
				canvas.renderAll();
			});
			canvas.observe('object:selected', function (e) {
				let targetLeftVal = e.target.oCoords.tr.x;
				if (e.target.isType('image')) {
					fabric.Object.prototype.setControlsVisibility({
						'tl': true,
						'tr': true,
						'bl': true,
						'br': true,
						'ml': true,
						'mt': true,
						'mr': true,
						'mb': true,
						'mtr': true
					});
		
				} else {
					fabric.Object.prototype.setControlsVisibility({
						'tl': false,
						'tr': false,
						'bl': false,
						'br': false,
						'ml': true,
						'mt': false,
						'mr': true,
						'mb': false,
						'mtr': true
					});
		
				}
				if (canvas.getActiveObject().shapeCanvas === 'texts' || canvas.getActiveObject().type === 'textbox') {
				    var fontsObj = canvas.getActiveObject().__dimensionAffectingProps;
					jQuery('.font-family').text(fontsObj.fontFamily);
					jQuery('.font-size').text(fontsObj.fontSize);
					jQuery('.line-height').text(fontsObj.lineHeight);
					jQuery('.fontSizeInputVal').val(fontsObj.fontSize);
					if (targetLeftVal < 315) {
						jQuery('#textEditOptions').css({
							display: 'block',
							top: e.target.oCoords.tr.y - 115,
							left: e.target.oCoords.tr.x
						});
					} else {
						jQuery('#textEditOptions').css({
							display: 'block',
							top: e.target.oCoords.tr.y - 115,
							left: 315
						});
					}
				} else {
					if (targetLeftVal < 315) {
						jQuery('#imageEditOptions').css({
							display: 'block',
							top: e.target.oCoords.tr.y - 75,
							left: e.target.oCoords.tr.x
						});
					} else {
						jQuery('#imageEditOptions').css({
							display: 'block',
							top: e.target.oCoords.tr.y - 75,
							left: 315
						});
					}
				}
				switchFunction();
			});

			canvas.on('before:selection:cleared', function(e) {
				jQuery('#admin-view .bg-img').css({display: 'none'});
				jQuery('#admin-view .safe-zone').css({ display: 'none' });	
				fabric.Object.prototype.setControlsVisibility({
					'tl': false,
					'tr': false,
					'bl': false,
					'br': false,
					'ml': true,
					'mt': false,
					'mr': true,
					'mb': false,
					'mtr': true
				});
			   
			 });
			canvas.observe('selection:cleared', function (e) {
				jQuery('.more-slide ul').animate({ right: '0' });
				jQuery('.canvas-editing-options').hide();
				jQuery('.top-slide-container').hide();
			});
    
			canvas.observe('selection:updated', function (e) {
				jQuery('#admin-view .bg-img').css({display: 'none'});
				jQuery('#admin-view .safe-zone').css({ display: 'none' });	
				if (e.target.isType('image')) {
					fabric.Object.prototype.setControlsVisibility({
						'tl': true,
						'tr': true,
						'bl': true,
						'br': true,
						'ml': true,
						'mt': true,
						'mr': true,
						'mb': true,
						'mtr': true
					});		
				} else {
					fabric.Object.prototype.setControlsVisibility({
						'tl': false,
						'tr': false,
						'bl': false,
						'br': false,
						'ml': true,
						'mt': false,
						'mr': true,
						'mb': false,
						'mtr': true
					});	
				}
				jQuery('.more-slide ul').animate({ right: '0' });
				let targetLeftVal = e.target.oCoords.tr.x;
				let activeObj = canvas.getActiveObject();
				let activeObjBack = canvasBack.getActiveObject();
				if (activeObj._objects) {
					jQuery('#textEditOptions').css({ display: 'block' });
					jQuery('#imageEditOptions').css({ display: 'none' });   				 
				} else if (
                 canvas.getActiveObject().shapeCanvas === "texts" ||
                 canvas.getActiveObject().type === "textbox"
               ) {
                 if (targetLeftVal < 315) {
                   jQuery("#textEditOptions").css({
                     display: "block",
                     top: e.target.oCoords.tr.y - 115,
                     left: e.target.oCoords.tr.x
                   });
                 } else {
                   jQuery("#textEditOptions").css({
                     display: "block",
                     top: e.target.oCoords.tr.y - 115,
                     left: 315
                   });
                 }
               } else {
                 if (targetLeftVal < 315) {
                   jQuery("#imageEditOptions").css({
                     display: "block",
                     top: e.target.oCoords.tr.y - 115,
                     left: e.target.oCoords.tr.x
                   });
                 } else {
                   jQuery("#imageEditOptions").css({
                     display: "block",
                     top: e.target.oCoords.tr.y - 115,
                     left: 315
                   });
                 }
               }
				switchFunction();
			});
			
			canvasBack.observe('object:moving', function (e) {
				jQuery('#admin-view .bg-img').css({display: 'block'});
				jQuery('#admin-view .safe-zone').css({ display: 'block' });	
				objectBoundaryLimit(e);
				jQuery('.canvas-editing-options').css({
					display: 'none'
				});
			});
			
			canvasBack.observe('object:scaling', function (e) {
				jQuery('#admin-view .bg-img').css({display: 'block'});
				jQuery('#admin-view .safe-zone').css({ display: 'block' });	
				_objectScaleBoundary(e);
			});
	
			canvasBack.observe('object:moved', function () {
				jQuery('#admin-view .bg-img').css({display: 'none'});
				jQuery('#admin-view .safe-zone').css({ display: 'none' });	
			});
			
			canvasBack.observe('object:scaled', function (e) {
				_objectScaleBoundary(e);
				jQuery('#admin-view .bg-img').css({display: 'none'});
				jQuery('#admin-view .safe-zone').css({ display: 'none' });	
			});
			
			canvasBack.observe('object:modified', function (e) {
				_objectScaleBoundary(e);
			});
			
			
			
			canvasBack.observe('object:selected', function (e) {
				_objectScaleBoundary(e);
				let targetLeftVal = e.target.oCoords.tr.x;
				if (canvasBack.getActiveObject().shapeCanvas === 'texts') {
					if (targetLeftVal < 315) {
						jQuery('#textEditOptions').css({
							display: 'block',
							top: e.target.oCoords.tr.y - 115,
							left: e.target.oCoords.tr.x
						});
					} else {
						jQuery('#textEditOptions').css({
							display: 'block',
							top: e.target.oCoords.tr.y - 115,
							left: 315
						});
					}
				} else {
					if (targetLeftVal < 315) {
						jQuery('#imageEditOptions').css({
							display: 'block',
							top: e.target.oCoords.tr.y - 75,
							left: e.target.oCoords.tr.x
						});
					} else {
						jQuery('#imageEditOptions').css({
							display: 'block',
							top: e.target.oCoords.tr.y - 75,
							left: 315
						});
					}
				}
				switchBackCanvasFunction();
			});

			canvasBack.observe('selection:cleared', function () {
				jQuery('#admin-view .bg-img').css({display: 'none'});
				jQuery('#admin-view .safe-zone').css({ display: 'none' });	
				jQuery('.more-slide ul').animate({ right: '0' });
				jQuery('.canvas-editing-options').hide();
				jQuery('.top-slide-container').hide();
			});
	
			canvasBack.observe('selection:updated', function (e) {
				jQuery('.more-slide ul').animate({ right: '0' });
				let targetLeftVal = e.target.oCoords.tr.x;
				if (canvasBack.getActiveObject().shapeCanvas === 'texts') {
					if (targetLeftVal < 315) {
						jQuery('#textEditOptions').css({
							display: 'block',
							top: e.target.oCoords.tr.y - 115,
							left: e.target.oCoords.tr.x
						});
					} else {
						jQuery('#textEditOptions').css({
							display: 'block',
							top: e.target.oCoords.tr.y - 115,
							left: 315
						});
					}
				} else {
					if (targetLeftVal < 315) {
						jQuery('#imageEditOptions').css({
							display: 'block',
							top: e.target.oCoords.tr.y - 115,
							left: e.target.oCoords.tr.x
						});
					} else {
						jQuery('#imageEditOptions').css({
							display: 'block',
							top: e.target.oCoords.tr.y - 115,
							left: 315
						});
					}
				}
				switchBackCanvasFunction();
			});
			
			/** Default Load Function **/
			initCenteringGuidelines(canvas);
			initAligningGuidelines(canvas);
			initCenteringGuidelines(canvasBack);
			initAligningGuidelines(canvasBack);
			
			jQuery('.inputs-ctrl,.inputs-ctrl-user').bind('blur', function () {
			  console.log("out of focus..........")
			  jQuery(this).parent().children("a.remove").find("img").attr("src", "/pub/media/images/cross-disable.png");
			});

			jQuery('.inputs-ctrl,.inputs-ctrl-user').bind('focus', function () {
			  console.log("focus.............")
			  jQuery(this).parent().children("a.remove").find("img").attr("src", "/pub/media/images/cross-enable.png");
			});
			
			


			
			/* Default load function end */
	
			jQuery('.slide-for-more').on('click', function () {
				jQuery('.more-slide ul').animate({
					right: '525px'
				});
			});

			jQuery('.slide-for-less').on('click', function () {
				jQuery('.more-slide ul').animate({
					right: '0'
				});
			});
			
			
			document.addEventListener('keydown', function (event) {
				const key = event.key; 
				if (event.keyCode == 46) {
					if (front === 'block') {
						let activeObjIndex = canvas.getObjects().indexOf(canvas.getActiveObject());
						jQuery('.form_group').eq(activeObjIndex).remove();
						canvas.remove(canvas.getActiveObject());
					} else {
						let activeObjIndex = canvasBack.getObjects().indexOf(canvasBack.getActiveObject());
						jQuery('.form_group').eq(activeObjIndex).remove();
						canvasBack.remove(canvasBack.getActiveObject());
					}
				}
			});

			jQuery(".trigger_box .fa-times").hide();
			
			jQuery(".trigger_box .fa-bars").click(function () {
				jQuery(this).hide();
				jQuery(".trigger_box .fa-times").show();
				jQuery(".card-main-control").addClass('active');;
			});
			jQuery(".trigger_box .fa-times").click(function () {
				jQuery(this).hide();
				jQuery(".trigger_box .fa-bars").show();
				jQuery(".card-main-control").removeClass('active');
			});

			function switchFunction() {
				let frontActiveObj = canvas.getActiveObject();
				var activeCanvasObject = null;
				if (!!canvas.getActiveObject()) {
					var activeObjectfind = canvas.getActiveObject().shapeCanvas;
					switch (activeObjectfind) {
						case 'texts': {
							jQuery('.inputVal').val(frontActiveObj.text);
							jQuery('#imageEditOptions').css('display', 'none');
							break;
						}
						case 'image': {
							jQuery('#textEditOptions').css('display', 'none');
							break;
						}
					}
				}
			};
			
			function switchBackCanvasFunction() {
				let activeObjBack = canvasBack.getActiveObject();
				var activeCanvasObject = null;
				if (!!canvasBack.getActiveObject()) {
					var activeObjectfind = canvasBack.getActiveObject().shapeCanvas;
					switch (activeObjectfind) {
						case 'texts': {
							jQuery('.inputVal').val(activeObjBack.text);
							jQuery('#imageEditOptions').css('display', 'none');
							break;
						}
						case 'image': {
							jQuery('#textEditOptions').css('display', 'none');
							break;
						}
					}
				}
			};
			
			
			/*load html event on canvas*/
			jQuery('.inputs-ctrl').each(function () {
				inputVal = jQuery(this).attr('placeholder');
				var inputBox = new fabric.Textbox(inputVal, {
					left: 40,
					top: topVal,
					width: 120,
					fontSize: 15,
					fontFamily: 'Helvetica-Normal',
					fontWeight: 'normal',
					fill: 'black',
					hasControl: false,
					transparentCorners: false,
					cornerSize: 15,
					cornerRadius: 15,
					cornerColor: '#e68035'
				});
				inputBox.cornerStyle = 'circle';
				topVal = topVal + 30;
				inputBox.set({
					shapeCanvas: 'texts',
					hasRotatingPoint: true
				});
				if (front === 'block') {
					canvas.add(inputBox);
				} else {
					canvasBack.add(inputBox);
				}
			});

			jQuery(document).on('click', '.card-editing-area-wrapper .form_group a', function (event) {
				var activeObj = canvasBack.getActiveObject();
				let backNew = jQuery('#front-view').css('display');
				let controlAttrNew = jQuery(this).attr('class');
				let back = jQuery('#front-view').css('display');
				let inputCtrlIndex = jQuery(this).parents().parents().index();
				inputCtrlIndex = inputCtrlIndex - 1;
				if (back === 'block') {
				canvas.setActiveObject(canvas._objects[inputCtrlIndex]);
				canvas.renderAll();
				if (controlAttrNew === 'remove') {
					if (backNew === 'block') {
					let activeObjIndex = canvasBack.getObjects().indexOf(canvasBack.getActiveObject());
					jQuery(this).parent().parent().eq(activeObjIndex).remove();
					canvasBack.remove(canvasBack.getActiveObject());
					canvas.remove(canvas.getActiveObject());
					} else {
					let activeObjIndex = canvasBack.getObjects().indexOf(canvasBack.getActiveObject());
					jQuery(this).parents('.add-new-fields').eq(activeObjIndex).remove();
					canvasBack.remove(canvasBack.getActiveObject());
					canvas.remove(canvas.getActiveObject());
					}
				}
				} else {
				canvasBack.setActiveObject(canvasBack._objects[inputCtrlIndex]);
				canvasBack.renderAll();
				}
				canvasBack.setActiveObject(activeObj);
				canvasBack.renderAll();

			});
			/* end html load event on canvas*/
						
			jQuery(document).on('focus', '.inputs-ctrl', function () {
				let front = jQuery('#front-view').css('display');
				let inputCtrlIndex = jQuery(this).parents().parents().index();
				inputCtrlIndex = inputCtrlIndex - 1;
				if (front === 'block') {
					canvas.setActiveObject(canvas._objects[inputCtrlIndex]);
					canvas.renderAll();
				} else {
					canvasBack.setActiveObject(canvasBack._objects[inputCtrlIndex]);
					canvasBack.renderAll();
				}
			});
		
			jQuery(document).on('keyup', '.add-new-fields .inputs-ctrl,.inputVal', function () {
				let front = jQuery('#front-view').css('display');
				let updatedTextVal = jQuery(this).val();
				if (front === 'block') {
					canvas.getActiveObject().set('text', updatedTextVal);
					canvas.renderAll();
				} else {
					canvasBack.getActiveObject().set('text', updatedTextVal);
					canvasBack.renderAll();
				}
			});
			
			/*Render element on selector end */
			
			/*add new text box script*/
			jQuery('#front-add-field').on('click', function () {
				jQuery(this).parent('.add-new-fields').append('<div class="form_group"><div class="text_field"><input type="text" id="" class="inputs-ctrl" value="Tap and Type" name="details" required="required" placeholder="Tap and Type"></div><div class="checkbox_wrapper"><a href="javascript: void(0)" class="remove"><img src="/pub/media/images/cross-disable.png"style="width:30px;height:30px;background-position: center center" /></a></div>');
				
				

				newInputVal = jQuery('#updateValue').val();
				custAttr = jQuery(this).attr('id');
				var newInputCtrl = new fabric.Textbox(newInputVal, {
					left: 380,
					top: newTopVal,
					width: 100,
					fontSize: 15,
					fontFamily: 'Helvetica-Normal',
					fontWeight: 'normal',
					fill: 'black',
					hasControl: false,
					transparentCorners: false,
					cornerSize: 15,
					cornerRadius: 15,
					cornerColor: '#e68035'
				});
				newInputCtrl.cornerStyle = 'circle';
				newTopVal = newTopVal + 30;
				newInputCtrl.set({
					shapeCanvas: 'texts',
					hasRotatingPoint: true
				});
				canvas.add(newInputCtrl);
				canvas.setActiveObject(newInputCtrl);
				canvas.renderAll();
				jQuery('.card-editing-area-wrapper .form_group a').on('click', function (event) {
					var activeObj = canvas.getActiveObject();
					let frontNew = jQuery('#front-view').css('display');
					let controlAttrNew = jQuery(this).attr('class');
					let front = jQuery('#front-view').css('display');
					let inputCtrlIndex = jQuery(this).parents().parents().index();
					inputCtrlIndex = inputCtrlIndex - 1;
					if (front === 'block') {
						canvas.setActiveObject(canvas._objects[inputCtrlIndex]);
						canvasBack.setActiveObject(canvasBack._objects[inputCtrlIndex]);
						canvas.renderAll();
						if (controlAttrNew === 'remove') {
							if (frontNew === 'block') {
								let activeObjIndex = canvas.getObjects().indexOf(canvas.getActiveObject());
								jQuery('.form_group').eq(activeObjIndex).remove();
								canvas.remove(canvas.getActiveObject());
							} else {
								let activeObjIndex = canvasBack.getObjects().indexOf(canvasBack.getActiveObject());
								jQuery('.form_group').eq(activeObjIndex).remove();
								canvasBack.remove(canvasBack.getActiveObject());
							}
						}
					} else {
						canvasBack.setActiveObject(canvasBack._objects[inputCtrlIndex]);
						canvasBack.renderAll();
					}
					canvas.setActiveObject(activeObj);
					canvas.renderAll();
					canvasBack.renderAll();
				});
			});
		
			/*end new text box script*/
			
			/*Add Back Field*/
			
			let backCounter = 0;
			jQuery('#back-add-field').on('click', function () {
				backCounter++;
				jQuery(this).parent('.add-new-fields').append('<div class="form_group"><div class="text_field"> <textarea id="fname_id' + backCounter + '" class="inputs-ctrl" name="comment" required="required">Tap and Type</textarea></div> <div class="checkbox_wrapper"><a href="javascript: void(0)" class="remove"><img src="/pub/media/images/cross-disable.png" style="width:30px;height:30px;background-position: center center" /></a></div></div>');
				newInputVal = jQuery('#updateValue').val();
				newInputCtrl = new fabric.Textbox(newInputVal, {
					left: 50,
					top: backTopVal,
					width: 120,
					fontSize: 15,
					fontFamily: 'Helvetica-Normal',
					fontWeight: 'normal',
					fill: 'black',
					hasControl: false,
					transparentCorners: false,
					cornerSize: 15,
					cornerRadius: 15,
					cornerColor: '#e68035',
					evented: true,
					noScaleCache: false,
					hasControl: false,
					transparentCorners: false
				});
				newInputCtrl.cornerStyle = 'circle';
				backTopVal = backTopVal + 30;
				newInputCtrl.set({
					shapeCanvas: 'texts',
					hasRotatingPoint: true
				});
				canvasBack.add(newInputCtrl);
				canvasBack.setActiveObject(newInputCtrl);
				canvasBack.renderAll();

				jQuery('.card-editing-area-wrapper .form_group a').on('click', function (event) {
					var activeObj = canvasBack.getActiveObject();
					let backNew = jQuery('#back-view').css('display');
					let controlAttrNew = jQuery(this).attr('class');
					let back = jQuery('#back-view').css('display');
					let inputCtrlIndex = jQuery(this).parents().parents().index();

					inputCtrlIndex = inputCtrlIndex - 1;
					if (back === 'block') {
						canvasBack.setActiveObject(canvasBack._objects[inputCtrlIndex]);
						canvasBack.renderAll();
						if (controlAttrNew === 'remove') {
							if (backNew === 'block') {
								let activeObjIndex = canvasBack.getObjects().indexOf(canvasBack.getActiveObject());
								jQuery(this).parents('.add-new-fields').find('.form_group').eq(activeObjIndex).remove();
								canvasBack.remove(canvasBack.getActiveObject());
								canvas.remove(canvas.getActiveObject());
							} else {
								let activeObjIndex = canvasBack.getObjects().indexOf(canvasBack.getActiveObject());
								jQuery(this).parents('.add-new-fields').find('.form_group').eq(activeObjIndex).remove();
								canvasBack.remove(canvasBack.getActiveObject());
								canvas.remove(canvas.getActiveObject());
							}
						}
					} else {
						canvasBack.setActiveObject(canvasBack._objects[inputCtrlIndex]);
						canvasBack.renderAll();
					}
					canvasBack.setActiveObject(activeObj);
					canvasBack.renderAll();
				});
			});
			
			
			/*End back add field*/					
			jQuery('.close,.btns').on('click', function () {
				jQuery(".overlayPrefix").css({
					'visibility': 'hidden',
					'opacity': '0'
				});
			});	
			
			jQuery('#left-control li a').on('click', function () {
				jQuery('#left-control li').removeClass('active');
				jQuery(this).parents('li').addClass('active');
				let thisClass = jQuery(this).attr('class');
				jQuery('.card-editing-tabs').css('display', 'none');
				jQuery('#' + thisClass).css('display', 'block');
			});

			jQuery('#left-control-user li a').on('click', function () {
				jQuery('#left-control-user li').removeClass('active');
				jQuery(this).parents('li').addClass('active');
				let thisClassCust = jQuery(this).attr('class');
				jQuery('.card-editing-tabs-exprt').css('display', 'none');
				var backPannel = jQuery('#export_front').css('display');
				if (backPannel === 'block') {
					jQuery('#' + thisClassCust).css('display', 'block');

				} else {
					jQuery('#export_back').find('#' + thisClassCust).css('display', 'block');
				}
			});
			
			jQuery('#right-control li a').on('click', function () {
				jQuery('#right-control li').removeClass('active');
				jQuery(this).parents('li').addClass('active');
			});

			jQuery('.instant-preview').on('click', function () {
				jQuery("div#back-view-text.add-new-fields").find('.form_group').empty();
				jQuery('.instant-preview').removeClass('active');
				jQuery(this).addClass('active');
			});

			jQuery('.card-front').on('click', function () {
				jQuery('#front-view, #front-view-text,#export_front').css('display', 'block');
				jQuery('#back-view,#back-view-one, #back-view-text,#export_back').css('display', 'none');
			});

			jQuery('.card-back').on('click', function () {
				jQuery('#back-view, #back-view-text,#export_back').css('display', 'block');
				jQuery('#front-view,#back-view-one, #front-view-text,#export_front').css('display', 'none');
			});

			jQuery('.edit-front-canvas').on('click', function () {
				jQuery('.close-card-preview, .card-front').click();
				jQuery('#front-view, #front-view-text').css('display', 'block');
				jQuery('#back-view, #back-view-text').css('display', 'none');
			});
			
			jQuery('.edit-back-canvas').on('click', function () {
				jQuery('.close-card-preview, .card-back').click();
				jQuery('#back-view, #back-view-text').css('display', 'block');
				jQuery('#front-view, #front-view-text').css('display', 'none');
			});
		});

		jQuery('.card-back-output').on('click', function () {
			autoRezisedCanvas();
			var json = canvasBack.toJSON();
			var currentBackData = JSON.stringify(canvasBack);
			var dataBack = JSON.parse(currentBackData);
			canvasBack.loadFromJSON(json, canvas.renderAll.bind(canvasBack));
			jQuery('.card-back-output').removeClass('activeClass');
			jQuery('.card-front-output').removeClass('activeClass');
			jQuery(this).addClass('activeClass');
			jQuery('#enableBack').css('display', 'inline-block');
			jQuery('.backCardContent').css('display', 'block');
			

		});
		jQuery('.card-front-output').on('click', function () {
			autoRezisedCanvas();
			jQuery('.card-front-output').removeClass('activeClass');
			jQuery('.card-back-output').removeClass('activeClass');
			jQuery('#enableBack').css('display', 'none');
			jQuery('.backCardContent').css('display', 'none');
			jQuery(this).addClass('activeClass');
		});
		
		jQuery('.card-front-exprt').on('click', function () {
			jQuery('#export_front,.front-view-text,#left-control-user .user-img-exprt').css('display', 'block');
			jQuery('#export_back,.back-view-text').css('display', 'none');
			jQuery('#enableCustBack').css('display', 'none');
			jQuery('.backCardCust').css('display', 'none');

		});
		jQuery('ul.select-ul li').on('click', function () {
			let self = jQuery(this);
			jQuery('ul.select-ul li').removeClass('active');
			jQuery(this).addClass('active');
		});

		autoRezisedCanvas();
		jQuery('.canvas-container').addClass('addTransform');
		function autoRezisedCanvas() {
			jQuery('.canvas-container').css({
				'margin': '0px auto',
				'width': '600px',
				'height': '402px'
			})
			jQuery('.canvas-container').addClass('addTransform');
		}
		var color = function () {
				return '#' + Math.floor(Math.random() * 16777215).toString(16);
			},
			jQueryels = jQuery('.backCardContent .backView .backViewItem'),
			colorify = function (jQueryels) {
				jQueryels.each(function () {
					jQuery(this).delay(3000).css('background-color', color());
				})
			}

		jQuery('#saveBackMore').on('click', function () {
			colorify(jQueryels);
		});
		
		jQuery(document).on('click', function () {
			colorify(jQueryels)
			jQuery('.backCardContent .backView .backViewItem').each(function () {
				jQuery(this).delay(3000).css('background-color', color());
			});
			jQuery('.backCardCust .backView .backViewItem').each(function () {
				jQuery(this).delay(3000).css('background-color', color());
			});

		});
		jQuery('.edit-front-canvas').on('click', function () {
			jQuery('.close-card-preview, .card-front').click();
			jQuery('#front-view, #front-view-text').css('display', 'block');
			jQuery('#back-view, #back-view-text').css('display', 'none');
			jQuery('.backCardContent').css('display', 'none');
		});
		jQuery('.edit-back-canvas').on('click', function () {
			jQuery('.close-card-preview, .card-back').click();
			jQuery('#back-view, #back-view-text').css('display', 'block');
			jQuery('#front-view, #front-view-text').css('display', 'inline-block');
			jQuery('.backCardContent').css('display', 'block');
		   
		});
		
		/* Group, Ungrop,MultiSelect,Zoom In, Zoom Out, Reset Zoom */
		jQuery('#sel-box-multple #multiselect').click(function () {
			canvas.discardActiveObject();
			var sel = new fabric.ActiveSelection(canvas.getObjects(), {
				canvas: canvas,
			});
			canvas.setActiveObject(sel);
			canvas.requestRenderAll();
		});

		jQuery('#sel-box-multple #discard').click(function () {
			canvas.discardActiveObject();
			canvas.requestRenderAll();
		});
		
		jQuery('#sel-box-multple #group').click(function () {
			if (!canvas.getActiveObject()) {
				return;
			}
			if (canvas.getActiveObject().type !== 'activeSelection') {
				return;
			}
			canvas.getActiveObject().toGroup();
			canvas.requestRenderAll();
		});
		
		jQuery('#sel-box-multple #ungroup').click(function () {
			if (!canvas.getActiveObject()) {
				return;
			}
			if (canvas.getActiveObject().type !== 'group') {
				return;
			}
			canvas.getActiveObject().toActiveSelection();
			canvas.requestRenderAll();
		});
		
		function resetZoom() {
			canvas.setZoom(1);
			canvas.renderAll();
		}

		jQuery('#zoomIn').click(function () {
			canvas.setZoom(canvas.getZoom() * 1.1);
			canvasBack.setZoom(canvasBack.getZoom() * 1.1);
		});

		jQuery('#zoomOut').click(function () {
			canvas.setZoom(canvas.getZoom() / 1.1);
			canvasBack.setZoom(canvasBack.getZoom() * 1.1);
		});
		jQuery('#resetZoom').click(function () {
			resetZoom();
		});
		/* Group, Ungrop,MultiSelect,Zoom In, Zoom Out, Reset Zoom */
		jQuery('.st-cls').click(function () {
			if (jQuery(this).next().hasClass('activeSelect')) {
				jQuery(this).next().removeClass('activeSelect');
			} else {
				jQuery('#selector.activeSelect').removeClass('activeSelect');
				jQuery(this).next().addClass('activeSelect');
			}
		});


		jQuery('input').on('blur', function () {
			jQuery(this).next('div').removeClass('input-desc-hover').addClass('input-desc');
		}).on('focus', function () {
			jQuery(this).next('div').removeClass('input-desc').addClass('input-desc-hover');
		});
		
		/*Canvas Card Size*/
		function _normalSizedCard() {
			canvas.setWidth(maxwidthcanvas);
			canvas.setHeight(maxheightcanvas);
			canvasBack.setWidth(maxwidthcanvas);
			canvasBack.setHeight(maxheightcanvas);
		}

		function _cornerSizedCard() {
			canvas.setWidth(maxwidthcanvascorner);
			canvas.setHeight(maxheightcanvascorner);
			canvasBack.setWidth(maxwidthcanvascorner);
			canvasBack.setHeight(maxheightcanvascorner);
		}
	
		var checked = false;
		jQuery('#normal-size').prop('checked');
		jQuery('.checkbox_wrappe-size input:radio').click(function () {
			if (jQuery(this).val() === '1') {
				checked = true;
				_normalSizedCard();
				canvas.observe('object:moving', function (e) {
					objectBoundaryLimit(e);
				});
				canvas.observe('object:scaling', function (e) {
					_objectScaleBoundary(e);
				});
			} else if (jQuery(this).val() === '2') {
				_cornerSizedCard();
				canvas.observe('object:moving', function (e) {
					objectBoundaryLimitRound(e);
				});
				canvas.observe('object:scaling', function (e) {
					_objectScaleBoundaryRound(e);
				});
			}
		});
	
		if(jQuery('#card-type').val() == 2 ) {
			_cornerSizedCard();
			canvas.observe('object:moving', function (e) {
				objectBoundaryLimitRound(e);
			});
			canvas.observe('object:scaling', function (e) {
				_objectScaleBoundaryRound(e);
			});
			
		} else {
			_normalSizedCard();
			canvas.observe('object:moving', function (e) {
					objectBoundaryLimit(e);
			});
			canvas.observe('object:scaling', function (e) {
				_objectScaleBoundary(e);
			});
		}

		/*Canvas Card size*/
		/* undo-redo code start*/
		cardSave();
		function cardSave() {
			  redo = [];
			  jQuery('#redo').prop('disabled', true);
			  if (state) {
				undo.push(state);
				jQuery('#undo').prop('disabled', false);
			  }
			  state = JSON.stringify(canvas);
		  
        }
		
		
		/**
         * Save the current state in the redo stack, reset to a state in the undo stack, and enable the buttons accordingly.
         * Or, do the opposite (redo vs. undo)
         * @param playStack which stack to get the last state from and to then render the canvas as
         * @param saveStack which stack to push current state into
         * @param buttonsOn jQuery selector. Enable these buttons.
         * @param buttonsOff jQuery selector. Disable these buttons.
         */
        function replay(playStack, saveStack, buttonsOn, buttonsOff) {
			saveStack.push(state);
			state = playStack.pop();
			var on = jQuery(buttonsOn);
			var off = jQuery(buttonsOff);
			on.prop('disabled', true);
			off.prop('disabled', true);
			canvas.clear();
			canvas.loadFromJSON(state, function() {
				canvas.renderAll();
				on.prop('disabled', false);
				if (playStack.length) {
					off.prop('disabled', false);
				}
			});
        }
		
		canvas.on('object:modified', function() {
			cardSave();
		});
		
		jQuery('#right-control li #undo').click(function() {
				replay(undo, redo, '#redo', this);
		});
		
		jQuery('#right-control li #redo').click(function() {
				replay(redo, undo, '#undo', this);
		});
		/*undo-redo code end */
		
		/*Card Preview*/
		jQuery('.preview-card').on('click', function () {
				jQuery('html, body').animate({ scrollTop: jQuery('.card-preview-display').offset().top }, 'slow');
				jQuery('.card-preview-display').css('display', 'block');
				jQuery('.container').addClass('overlay');
				PreviewImg();
		});
		jQuery('a.close-card-preview').on('click', function () {
			jQuery('.card-preview-display').css('display', 'none');
			jQuery('.container').removeClass('overlay');
		});

		function PreviewImg() {
			document.getElementById('front-preview-img').src = canvas.toDataURL({ multiplier: .5 });
			document.getElementById('back-preview-img').src = canvasBack.toDataURL({ multiplier: .5 });
		}
		/* Card Preview End*/
		/* image with url*/
		$("#file").change(function(e) { 
			var file_data = $(this).prop("files")[0];  
			var form_data = new FormData(); 
			form_data.append("img", file_data);
				$.ajax({
					url: $('#ajaxformurl').val(),
					cache: false,
					contentType: false,
					processData: false,
					data: form_data,
					showLoader: true,
					type: 'post',
					success: function(data) {
						if(data.image) {
							var imgURL = data.image;
							fabric.Image.fromURL(imgURL, function(img) {
								var oImg = img.set({
									scaleX: cw / img.width,
									scaleY: ch / img.height,
									width: img.width,
									height: img.height,
									left: 70,
									top: 20,
									angle: 0,
									shapeCanvas: 'image',
									crossOrigin: "anonymous",
									hasRotatingPoint: false,
									lockUniScaling: true,
									lockScalingFlip: true,
									lockAspectRatio: true
								});
								img.scaleToHeight(100);
								img.scaleToWidth(200);
								let front = $('#front-view').css('display');
								if (front === 'block') {
									canvas.add(oImg);
									canvas.renderAll();
									$('#file').val('');
									canvas.setActiveObject(oImg);
								} else {
									canvasBack.add(oImg);
									canvasBack.renderAll();
									$('#file').val('');
									canvasBack.setActiveObject(oImg);
								}
							});	
						}
					}
				});

		});
		/*background image upload*/
		$("#file2").change(function(e) {
			let frontImage = $('#front-view').css('display');
			let backImage = $('#back-view').css('display');
			var file_data = $(this).prop("files")[0];  
			var form_data = new FormData(); 
			form_data.append("img", file_data);
			$.ajax({
				url: $('#ajaxformurl').val(),
				cache: false,
				contentType: false,
				processData: false,
				data: form_data,
				showLoader: true,
				type: 'post',
				success: function(data) {
					if(data.image) {
						var imgURL = data.image;
						fabric.Image.fromURL(imgURL, function(img) {
							var oImg = img.set({
								angle: 0,
								shapeCanvas: 'image',
								selection: true,
								hasRotatingPoint: false
							});

							if (frontImage === 'block') {
								canvas.setBackgroundImage(oImg, canvas.renderAll.bind(canvas), {
									scaleX: canvas.width / img.width,
									scaleY: canvas.height / img.height
								});
							} else if (backImage === 'block') {
								canvasBack.setBackgroundImage(oImg, canvasBack.renderAll.bind(canvasBack), {
									scaleX: canvasBack.width / img.width,
									scaleY: canvasBack.height / img.height
								});
							} else {
								canvas.clear();
							}
						});	
					}
				}
			});
		});
		
		/**Replace File */
		$('#fileReplace').change(function(e) { 
			var file_data = $(this).prop("files")[0];  
			var form_data = new FormData(); 
			form_data.append("img", file_data);
			let front = $('#export_front').css('display');
			let back = $('#back-view').css('display');
			$.ajax({
				url: $('#ajaxformurl').val(),
				cache: false,
				contentType: false,
				processData: false,
				data: form_data,
				showLoader: true,
				type: 'post',
				success: function(data) {
					if(data.image) {
						var imgURL = data.image;
						fabric.Image.fromURL(imgURL, function(img) {
							if (front === 'block') {
									var objs = canvas.getObjects();
								} else {
									var objs = canvasBack.getObjects();
							}
							var objs = canvas.getObjects();
							if (objs.length) {
								objs.forEach(function (e) {
									if (e && e.type === 'image') {
										e._element.src = imgURL;
										if (front === 'block') {
											canvas.renderAll();
										} else {
											canvasBack.renderAll();
										}
									}
								});
							} else {
								if (front === 'block') {
									canvas.add(img);
									canvas.renderAll();
								} else {
									canvasBack.add(img);
									canvasBack.renderAll();
								}
							}
							
						});	
					}
				}
			});	
		});

		/*direct canvas Image Upload Section*/
		$("#base64file").change(function(e) {
			var file = e.target.files[0];
			var reader = new FileReader();
			reader.onload = function (f) {
				var data = f.target.result;
				fabric.Image.fromURL(data, function (img) {
					var oImg = img.set({
						scaleX: cw / img.width,
						scaleY: ch / img.height,
						width: img.width,
						height: img.height,
						left: 70,
						top: 20,
						angle: 0,
						shapeCanvas: 'image',
						crossOrigin: "anonymous",
						hasRotatingPoint: false,
						lockUniScaling: true,
						lockScalingFlip: true,
						lockAspectRatio: true
					});
					img.scaleToHeight(100);
					img.scaleToWidth(200);
					let front = $('#front-view').css('display');
					if (front === 'block') {
						canvas.add(oImg);
						canvas.renderAll();
						$('#file').val('');
						canvas.setActiveObject(oImg);
					} else {
						canvasBack.add(oImg);
						canvasBack.renderAll();
						$('#file').val('');
						canvasBack.setActiveObject(oImg);
					}
					/**Uploaded img data src */
					var dataURL = canvas.toDataURL({
						format: 'png',
						quality: 2,
						crossOrigin: "anonymous"
					});
					var linkUrl = window.customUrl;
					var dataURLBack = canvasBack.toDataURL({
						format: 'png',
						quality: 2,
						crossOrigin: "anonymous"
					});
				});
			};

			reader.readAsDataURL(file);
		});
				
		$('#base64fileReplace').change(function(e) { 
			var file = e.target.files[0];
			var reader = new FileReader();
			reader.onload = function (file) {
				addImage(file.target.result);
			}
			reader.readAsDataURL(file);
		});
		
		function addImageUser(imgLink) {
			let front = jQuery('#export_front').css('display');
			let back = jQuery('#back-view').css('display');
			fabric.Image.fromURL(imgLink, function (img) {
				var objs = canvasUser.getObjects();
				if (objs.length) {
					objs.forEach(function (e) {
						if (e && e.type === 'image') {
							e._element.src = imgLink;
							if (front === 'block') {
								canvasUser.renderAll();
							} else {
								canvasUserBack.renderAll();
							}
						}
					});
				} else {
					if (front === 'block') {
						canvasUser.add(img);
					} else {
						canvasUserBack.add(img);
					}
				}
			});
		}

		function addImage(imgLink) {
			let front = jQuery('#front-view').css('display');
			let back = jQuery('#back-view').css('display');
			fabric.Image.fromURL(imgLink, function (img) {
				var objs = canvas.getObjects();
				if (objs.length) {
					objs.forEach(function (e) {
						if (e && e.type === 'image') {
							e._element.src = imgLink;
							if (front === 'block') {
								canvas.renderAll();
							} else {
								canvasBack.renderAll();
							}
						}
					});
				} else {
					if (front === 'block') {
						canvas.add(img);
					} else {
						canvasBack.add(img);
					}
				}
			});
			jQuery('.top-slide-container').css('display', 'none');
		}
		
		function _backBackgroundImgaeAdd() {
			let backElem = jQuery('#back-view').css('display');
			let frontElem = jQuery('#front-view').css('display');
			febric.Image.fromURL(imgFrontLink, function (img) {
				obj = [{ front: canvasBack.getObjects() }, { back: canvas.getObjects() }];
				if (obj[0].length) {
					obj[0].forEach(function (ev) {
						if (ev && ev.type === 'image') {
							ev._element.src = imgFrontLink;
							if (backElem == 'none' && frontElem == 'block') {
								canvasBack.clear();
								canvas.renderAll();
								canvas.add(img);
							} else if (frontElem == 'none' && backElem == 'block') {
								canvas.clear();
								canvasBack.renderAll();
								canvasBack.add(img)
							} else if(frontElem == 'none' && backElem == 'none') {
								canvas.clear();
								canvasBack.clear();
								prompt('There is no data to show on canvas');

							} else{
								canvas.renderAll();
								canvasBack.renderAll();
								canvas.add(img);
								canvasBack.add(img);
							}
						}
					})
				} else if (obj[1].length) {
					obj.back.forEach(function (ev) {
						if (ev && ev.type == 'image') {
							ev._element.src = imgFrontLink;
							if (backElem == 'block' && frontElem == 'none') {
								canvas.clear();
								canvasBack.renderAll();
								canvasBack.add(imgBackLink);
							} else if (backElem == 'none' && frontElem == 'block') {
								canvasBack.clear();
								canvas.renderAll();
								canvas, add(frontElem);
								canvasBack.clone();
							}
						}
					})
				} else {
					canvas.clear();
					canvasBack.clear();
				}
			})
			jQuery('.top-slide-container').css('display', 'none');
		}
	
		$("#base64file2").change(function(e) {
			let frontImage = $('#front-view').css('display');
			let backImage = $('#back-view').css('display');
			var file = e.target.files[0];
			var reader = new FileReader();
			reader.onload = function (f) {
				var data = f.target.result;
				fabric.Image.fromURL(data, function (img) {
					img.set({
						angle: 0,
						shapeCanvas: 'image',
						selection: true,
						hasRotatingPoint: false
					});
					if (frontImage === 'block') {
						canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
							scaleX: canvas.width / img.width,
							scaleY: canvas.height / img.height
						});
					} else if (backImage === 'block') {
						canvasBack.setBackgroundImage(img, canvasBack.renderAll.bind(canvasBack), {
							scaleX: canvasBack.width / img.width,
							scaleY: canvasBack.height / img.height
						});
					} else {
						canvas.clear();
					}
				});
			};
			reader.readAsDataURL(file);
		});
        /**For Background Image**/
		jQuery('.love-move-object.lock').on('click', function () {
            let front = jQuery('#front-view').css('display');
            jQuery(this).css('display', 'none');
            jQuery('a.love-move-object.unlock').css('display', 'block');
            if (front === 'block') {
                canvas.getActiveObject().set({
                    lockMovementX: true,
                    lockMovementY: true,
                    lockRotation: true,
                    lockScalingFlip: true,
                    lockScalingX: true,
                    lockScalingY: true,
                    lockSkewingX: true,
                    lockSkewingY: true,
                    lockUniScaling: true
                });
                canvas.renderAll();
            } else {
                canvasBack.getActiveObject().set({
                    lockMovementX: true,
                    lockMovementY: true,
                    lockRotation: true,
                    lockScalingFlip: true,
                    lockScalingX: true,
                    lockScalingY: true,
                    lockSkewingX: true,
                    lockSkewingY: true,
                    lockUniScaling: true
                });
                canvasBack.renderAll();
            }
		});

		jQuery('.love-move-object.unlock').on('click', function () {
			let front = jQuery('#front-view').css('display');
			jQuery(this).css('display', 'none');
			jQuery('a.love-move-object.lock').css('display', 'block');
			if (front === 'block') {
				canvas.getActiveObject().set({
					lockMovementX: false,
					lockMovementY: false,
					lockRotation: false,
					lockScalingFlip: false,
					lockScalingX: false,
					lockScalingY: false,
					lockSkewingX: false,
					lockSkewingY: false,
					lockUniScaling: false
				});
				canvas.renderAll();
			} else {
				canvasBack.getActiveObject().set({
					lockMovementX: false,
					lockMovementY: false,
					lockRotation: false,
					lockScalingFlip: false,
					lockScalingX: false,
					lockScalingY: false,
					lockSkewingX: false,
					lockSkewingY: false,
					lockUniScaling: false
				});
				canvasBack.renderAll();
			}
		});

		jQuery('.image-filter-color').on('input', function () {
			let thisVal = jQuery(this).val();
		});
		
		jQuery('.image-filter-lightness').on('change', 'input', function () {
			let thisVal = jQuery(this).val();
			var object = canvas.getActiveObject();
			var filter = new fabric.Image.filters.Brightness({
				brightness: parseFloat(thisVal)
			});
			object.filters.push(filter);
			object.applyFilters();
			canvas.renderAll();
		});

		jQuery('.image-filter-saturation').on('input', function () {
			let thisVal = jQuery(this).val();
			var object = canvas.getActiveObject();
			var filter = new fabric.Image.filters.Saturation({
				saturation: parseFloat(thisVal)
			});
			object.filters.push(filter);
			object.applyFilters(canvas.renderAll.bind(canvas));
		});

		jQuery('.dublicate-copy-image').on('click', function () {
			let front = jQuery('#front-view').css('display');
			var activeObject = canvas.getActiveObject();
			var activeObjectBack = canvasBack.getActiveObject();
			if (front === 'block') {
				activeObject.clone(function (cloned) {
					canvas.discardActiveObject();
					cloned.set({
						top: cloned.top + 50,
						evented: true,
						hasRotatingPoint: false
					});
					if (cloned.type === 'activeSelection') {
						cloned.canvas = canvas;
						cloned.forEachObject(function (obj) {
							canvas.add(obj);
						});
						cloned.setCoords();
					} else {
						canvas.add(cloned);
					}
					canvas.setActiveObject(cloned);
					canvas.requestRenderAll();
				});
			} else {
				activeObjectBack.clone(function (cloned) {
					canvasBack.discardActiveObject();
					canvasBack.set({
						top: cloned.top + 100,
						evented: true,
						hasRotatingPoint: false
					});
					if (cloned.type === 'activeSelection') {
						canvasBack.canvasBack = canvasBack;
						canvasBack.forEachObject(function (obj) {
							canvasBack.add(obj);
						});
						cloned.setCoords();
					} else {
						canvasBack.add(cloned);
					}
					canvasBack.setActiveObject(cloned);
					canvasBack.requestRenderAll();
				});
			}
		});
		
		jQuery('.col-arrange a').on('click', function () {
			let thisClass = jQuery(this).attr('class');
			let activeObj = canvas.getActiveObject();
			if (thisClass === 'b2f') {
				activeObj.bringToFront();
			} else if (thisClass === 'bf') {
				activeObj.bringForward();
			} else if (thisClass === 's2b') {
				activeObj.sendToBack();
			} else if (thisClass === 'sb') {
				activeObj.sendBackwards();
			}
			canvas.renderAll();
		});
		
		
		jQuery.fn.Copy = function () {
			canvas.getActiveObject().clone(function (cloned) {
				_clipboard = cloned;
			});
		}

		jQuery.fn.Paste = function () {
			_clipboard.clone(function (clonedObj) {
				canvas.discardActiveObject();
				clonedObj.set({
					left: clonedObj.left,
					top: clonedObj.top + 50,
					evented: true,
					shapeCanvas: 'texts',
					hasRotatingPoint: false
				});
				if (clonedObj.type === 'activeSelection') {
					clonedObj.canvas = canvas;
					clonedObj.forEachObject(function (obj) {
						canvas.add(obj);
					});
					clonedObj.setCoords();
				} else {
					canvas.add(clonedObj);
				}
				canvas.setActiveObject(clonedObj);
				canvas.requestRenderAll();
			});
		}

		jQuery.fn.CopyBack = function () {
			canvasBack.getActiveObject().clone(function (cloned) {
				_clipboard = cloned;
			});
		}

		jQuery.fn.PasteBack = function () {
			_clipboard.clone(function (clonedObj) {
				canvasBack.discardActiveObject();
				clonedObj.set({
					left: clonedObj.left,
					top: clonedObj.top + 50,
					evented: true,
					shapeCanvas: 'texts',
					hasRotatingPoint: false
				});
				if (clonedObj.type === 'activeSelection') {
					clonedObj.canvasBack = canvasBack;
					clonedObj.forEachObject(function (obj) {
						canvasBack.add(obj);
					});
					clonedObj.setCoords();
				} else {
					canvasBack.add(clonedObj);
				}
				canvasBack.setActiveObject(clonedObj);
				canvasBack.requestRenderAll();
			});
		}

		jQuery('.more-slide ul li a').on('click', function () {
			let front = jQuery('#front-view').css('display');
			let activeObj = canvas.getActiveObject();
			let activeObjBack = canvasBack.getActiveObject();
			let controlAttr = jQuery(this).attr('class');
			if (controlAttr === 'bold-font') {
				if (front === 'block') {
					if (activeObj.fontWeight === 'normal') {
						activeObj.set({ fontWeight: 'bold' });
					} else {
						activeObj.set({ fontWeight: 'normal' });
					}
				} else {
					if (activeObjBack.fontWeight === 'normal') {
						activeObjBack.set({ fontWeight: 'bold' });
					} else {
						activeObjBack.set({ fontWeight: 'normal' });
					}
				}

			} else if (controlAttr === 'italic-font') {
				if (front === 'block') {
					if (activeObj.fontStyle === 'normal') {
						activeObj.set({ fontStyle: 'italic' });
					} else {
						activeObj.set({ fontStyle: 'normal' });
					}
				} else {
					if (activeObjBack.fontStyle === 'normal') {
						activeObjBack.set({ fontStyle: 'italic' });
					} else {
						activeObjBack.set({ fontStyle: 'normal' });
					}
				}
			} else if (controlAttr === 'underline-font') {
				if (front === 'block') {
					if (activeObj.underline) {
						activeObj.set({ underline: false });
					} else {
						activeObj.set({ underline: true });
					}
				} else {
					if (activeObjBack.underline) {
						activeObjBack.set({ underline: false });
					} else {
						activeObjBack.set({ underline: true });
					}
				}
			} else if (controlAttr === 'delete-object') {
				if (front === 'block') {
					let activeObjIndex = canvas.getObjects().indexOf(canvas.getActiveObject());
					jQuery('.form_group').eq(activeObjIndex).remove();
					canvas.remove(canvas.getActiveObject());
				} else {
					let activeObjIndex = canvasBack.getObjects().indexOf(canvasBack.getActiveObject());
					jQuery('.form_group').eq(activeObjIndex).remove();
					canvasBack.remove(canvasBack.getActiveObject());
				}
			} else if (controlAttr === 'align-left') {
				if (front === 'block') {
					activeObj.set({ textAlign: 'left' });
				} else {
					activeObjBack.set({ textAlign: 'left' });
				}
			} else if (controlAttr === 'align-center') {
				if (front === 'block') {
					activeObj.set({ textAlign: 'center' });
				} else {
					activeObjBack.set({ textAlign: 'center' });
				}
			} else if (controlAttr === 'align-right') {
				if (front === 'block') {
					activeObj.set({ textAlign: 'right' });
				} else {
					activeObjBack.set({ textAlign: 'right' });
				}
			} else if (controlAttr === 'dublicate-copy') {
				if (front === 'block') {
					jQuery.fn.Copy();
					jQuery.fn.Paste();
				} else {
					jQuery.fn.CopyBack();
					jQuery.fn.PasteBack();
				}
			} else if (controlAttr === 'rotate-object') {
				if (front === 'block') {
					activeObj.rotate(rotateVal);
					rotateVal = rotateVal + 90;
				} else {
					activeObjBack.rotate(rotateVal);
					rotateVal = rotateVal + 90;
				}
			} else if (controlAttr === 'arrange-object') {
				if (front === 'block') {
					activeObj.bringForward();
				} else {
					activeObjBack.bringForward();
				}
			}
			canvas.renderAll();
			canvasBack.renderAll();
		});

		jQuery('.more-slide ul li a').on('click', function () {
			let front = jQuery('#front-view').css('display');
			let className = jQuery(this).attr('class');
			let displayCheck = jQuery('#' + className).css('display');
			if (displayCheck === 'block') {
				jQuery('#' + className).slideUp();
			} else {
				jQuery('.top-slide-container').slideUp();
				jQuery('#' + className).slideDown();
			}

			if (jQuery(this).attr('class') === 'text-shadow') {
				jQuery('#colorpicker-shadow').change();
			}
			if (jQuery(this).attr('class') === 'text-outline') {
				jQuery('#colorpicker-outline').change();
			}
		});

		jQuery('.fontSizeInputVal').on('change', function () {
			let front = jQuery('#front-view').css('display');
			let fSizeVal = jQuery(this).val();
			jQuery('.font-size').text(fSizeVal);
			jQuery('.fontSizeRangeVal').val(fSizeVal);
			if (front === 'block') {
				canvas.getActiveObject().set({ fontSize: fSizeVal });
				canvas.renderAll();
			} else {
				canvasBack.getActiveObject().set({ fontSize: fSizeVal });
				canvasBack.renderAll();
			}
		});

		jQuery('.fontSizeRangeVal').on('input', function () {
			let front = jQuery('#front-view').css('display');
			let fSizeVal = jQuery(this).val();
			jQuery('.font-size').text(fSizeVal);
			jQuery('.fontSizeInputVal').val(fSizeVal);
			if (front === 'block') {
				canvas.getActiveObject().set({ fontSize: fSizeVal });
				canvas.renderAll();
			} else {
				canvasBack.getActiveObject().set({ fontSize: fSizeVal });
				canvasBack.renderAll();
			}
		});

		jQuery('.lineHeightInputVal').on('change', function () {
			let front = jQuery('#front-view').css('display');
			let lineHeighVal = jQuery(this).val();
			jQuery('.line-height').text(lineHeighVal);
			jQuery('.lineHeightRangeVal').val(lineHeighVal);
			if (front === 'block') {
				canvas.getActiveObject().set({ lineHeight: lineHeighVal });
				canvas.renderAll();
			} else {
				canvasBack.getActiveObject().set({ lineHeight: lineHeighVal });
				canvasBack.renderAll();
			}
		});

		jQuery('.lineHeightRangeVal').on('input', function () {
			let front = jQuery('#front-view').css('display');
			let lineHeighVal = jQuery(this).val();
			jQuery('.line-height').text(lineHeighVal);
			jQuery('.lineHeightInputVal').val(lineHeighVal);
			if (front === 'block') {
				canvas.getActiveObject().set({ lineHeight: lineHeighVal });
				canvas.renderAll();
			} else {
				canvasBack.getActiveObject().set({ lineHeight: lineHeighVal });
				canvasBack.renderAll();
			}
		});

		jQuery('.letterSpacingInputVal').on('input', function () {
			let front = jQuery('#front-view').css('display');
			let letterSpacinghVal = jQuery(this).val();
			jQuery('.letter-spacing').text(letterSpacinghVal);
			jQuery('.letterSpacingRangeVal').val(letterSpacinghVal);
			if (front === 'block') {
				canvas.getActiveObject().set({ charSpacing: letterSpacinghVal });
				canvas.renderAll();
			} else {
				canvasBack.getActiveObject().set({ charSpacing: letterSpacinghVal });
				canvasBack.renderAll();
			}
		});

		jQuery('.letterSpacingRangeVal').on('input', function () {
			let front = jQuery('#front-view').css('display');
			let letterSpacingVal = jQuery(this).val();
			jQuery('.letter-spacing').text(letterSpacingVal);
			jQuery('.letterSpacingInputVal').val(letterSpacingVal);
			if (front === 'block') {
				canvas.getActiveObject().set({ charSpacing: letterSpacingVal });
				canvas.renderAll();
			} else {
				canvasBack.getActiveObject().set({ charSpacing: letterSpacingVal });
				canvasBack.renderAll();
			}
		});

		jQuery('#colorpicker-full').on('change', function () {
			let front = jQuery('#front-view').css('display');
			let textColorVal = jQuery(this).val();
			if (front === 'block') {
				canvas.getActiveObject().set({ fill: '#' + textColorVal });
				canvas.renderAll();
			} else {
				canvasBack.getActiveObject().set({ fill: '#' + textColorVal });
				canvasBack.renderAll();
			}
		});

		jQuery('#colorpicker-outline').on('change', function () {
			let front = jQuery('#front-view').css('display');
			let textColorVal = jQuery(this).val();
			if (front === 'block') {
				canvas.getActiveObject().set({ stroke: '#' + textColorVal });
				canvas.renderAll();
			} else {
				canvasBack.getActiveObject().set({ stroke: '#' + textColorVal });
				canvasBack.renderAll();
			}
		});

		jQuery('.text-outline-slider').on('input', function () {
			let front = jQuery('#front-view').css('display');
			let outlineWidth = jQuery(this).val();
			if (front === 'block') {
				canvas.getActiveObject().set({ strokeWidth: outlineWidth });
				canvas.renderAll();
			} else {
				canvasBack.getActiveObject().set({ strokeWidth: outlineWidth });
				canvasBack.renderAll();
			}
		});

		jQuery('#colorpicker-shadow').on('change', function () {
			let front = jQuery('#front-view').css('display');
			let textShadowVal = jQuery(this).val();
			if (front === 'block') {
				canvas.getActiveObject().set({
					shadow: new fabric.Shadow({
						color: "#" + textShadowVal,
						blur: 1,
						offsetX: -4,
						offsetY: 3
					})
				});
				canvas.renderAll();
			} else {
				canvasBack.getActiveObject().set({
					shadow: new fabric.Shadow({
						color: "#" + textShadowVal,
						blur: 1,
						offsetX: -4,
						offsetY: 3
					})
				});
				canvasBack.renderAll();
			}
		});

		jQuery('.blur-shadow').on('input', function () {
			let front = jQuery('#front-view').css('display');
			if (front === 'block') {
				let activeObj = canvas.getActiveObject();
				let sColor = activeObj.shadow.color;
				let sOffsetX = activeObj.shadow.offsetX;
				let sOffsetY = activeObj.shadow.offsetY;
				let blurShadowVal = jQuery(this).val();
				canvas.getActiveObject().set({
					shadow: new fabric.Shadow({
						color: sColor,
						blur: blurShadowVal,
						offsetX: sOffsetX,
						offsetY: sOffsetY
					})
				});
				canvas.renderAll();
			} else {
				let activeObj = canvasBack.getActiveObject();
				let sColor = activeObj.shadow.color;
				let sOffsetX = activeObj.shadow.offsetX;
				let sOffsetY = activeObj.shadow.offsetY;
				let blurShadowVal = jQuery(this).val();
				canvasBack.getActiveObject().set({
					shadow: new fabric.Shadow({
						color: sColor,
						blur: blurShadowVal,
						offsetX: sOffsetX,
						offsetY: sOffsetY
					})
				});
				canvasBack.renderAll();
			}
		});

		jQuery('.offsetX-shadow').on('input', function () {
			let front = jQuery('#front-view').css('display');
			if (front === 'block') {
				let activeObj = canvas.getActiveObject();
				let sColor = activeObj.shadow.color;
				let sBlur = activeObj.shadow.blur;
				let sOffsetY = activeObj.shadow.offsetY;
				let offsetXShadowVal = jQuery(this).val();
				canvas.getActiveObject().set({
					shadow: new fabric.Shadow({
						color: sColor,
						blur: sBlur,
						offsetX: offsetXShadowVal,
						offsetY: sOffsetY
					})
				});
				canvas.renderAll();
			} else {
				let activeObj = canvasBack.getActiveObject();
				let sColor = activeObj.shadow.color;
				let sBlur = activeObj.shadow.blur;
				let sOffsetY = activeObj.shadow.offsetY;
				let offsetXShadowVal = jQuery(this).val();
				canvasBack.getActiveObject().set({
					shadow: new fabric.Shadow({
						color: sColor,
						blur: sBlur,
						offsetX: offsetXShadowVal,
						offsetY: sOffsetY
					})
				});
				canvasBack.renderAll();
			}
		});


		jQuery('.offsetY-shadow').on('input', function () {
			let front = jQuery('#front-view').css('display');
			if (front === 'block') {
				let activeObj = canvas.getActiveObject();
				let sColor = activeObj.shadow.color;
				let sBlur = activeObj.shadow.blur;
				let sOffsetX = activeObj.shadow.offsetX;
				let offsetYShadowVal = jQuery(this).val();
				canvas.getActiveObject().set({
					shadow: new fabric.Shadow({
						color: sColor,
						blur: sBlur,
						offsetX: sOffsetX,
						offsetY: offsetYShadowVal

					})
				});
				canvas.renderAll();
			} else {
				let activeObj = canvasBack.getActiveObject();
				let sColor = activeObj.shadow.color;
				let sBlur = activeObj.shadow.blur;
				let sOffsetX = activeObj.shadow.offsetX;
				let offsetYShadowVal = jQuery(this).val();
				canvasBack.getActiveObject().set({
					shadow: new fabric.Shadow({
						color: sColor,
						blur: sBlur,
						offsetX: sOffsetX,
						offsetY: offsetYShadowVal
					})
				});
				canvasBack.renderAll();
			}
		});
		
		/*Image upload end section*/
		
		/*Edit Card Functionlity */
		if($('#admin_card_front').length){			
			var jsonMain = new Object();
			var jsonAdminFront = $('#admin_card_front').val();
			var self = this;
			var exportCounter = 0;
			var addExtraBtn = `<div class="addExtraField">
				<a href="javascript: void(0)" class="add-more-field" id="edit-add-field"><i class="fas fa-plus"></i>Add new text field</a>
			 </div>`; 
			 $('.front-inputs-ctrl').append(addExtraBtn);
			canvas.loadFromJSON(jsonAdminFront, canvas.renderAll.bind(canvas), function (o, object) {
				exportCounter++;
				let thisText = object.text;
				if (object.type === 'textbox') {
					$('.front-inputs-ctrl').append(`<div class="form_cntrl"><textarea  required="required" class="require_field inputs-ctrl-user user-front-ctrl">${thisText}</textarea><div class="checkbox_wrapper">
					<a href="javascript: void(0)" class="remove"><img src="/pub/media/images/cross-disable.png" style="width:30px;height:30px;background-position: center center" /></a>
					  </div></div>`);
				}

			});
			
		}
		
		$(document).on('click', '#edit-add-field', function () {
			$(this).parent().parents('#user-text-exprt').append(`<div class="form_cntrl"><textarea  required="required" class="require_field inputs-ctrl-user user-front-ctrl">Tap and Type</textarea><h5 class="required_error" class="user_errors" class="help-block"></h5>
        <div class="checkbox_wrapper">
        <a href="javascript: void(0)" class="remove"><img src="/pub/media/images/cross-disable.png"
        style="width:30px;height:30px;background-position: center center" /></a>
        </div>
        </div>`);

			newInputVal = $('#updateValue').val();
			custAttr = $(this).attr('id');
			var newInputCtrl = new fabric.Textbox(newInputVal, {
				left: 380,
				top: newTopVal,
				width: 100,
				fontSize: 15,
				fontFamily: 'Helvetica-Normal',
				fontWeight: 'normal',
				fill: 'black',
				hasControl: false,
				paintFirst: 'stroke',
				transparentCorners: false,
				cornerSize: 15,
				cornerRadius: 15,
				cornerColor: '#e68035'
			});
			newInputCtrl.cornerStyle = 'circle'
			newTopVal = newTopVal + 30;
			newInputCtrl.set({
				shapeCanvas: 'texts',
				hasRotatingPoint: true

			});
			canvas.add(newInputCtrl);
			canvas.setActiveObject(newInputCtrl);
			canvas.renderAll();

		});
			
			
		$(document).on('click', '#user-back-add-field', function () {
			$(this).parent().parents('.back-inputs-ctrl').append(`<div class="form_cntrl"><textarea  required="required" class="require_field inputs-ctrl-user user-back-ctrl">Tap and Type</textarea><h5 class="required_error" class="user_errors" class="help-block"></h5>
			<div class="checkbox_wrapper">
				<a href="javascript: void(0)" class="remove"><img src="/pub/media/images/cross-disable.png" style="width:30px;height:30px;background-position: center center" /></a>
			</div>
			</div>`);
			newInputVal = $('#updateValue').val();
			custAttr = $(this).attr('id');
			var newInputCtrl = new fabric.Textbox(newInputVal, {
				left: 380,
				top: newTopVal,
				width: 100,
				fontSize: 15,
				fontFamily: 'Helvetica-Normal',
				fontWeight: 'normal',
				fill: 'black',
				hasControl: false,
				paintFirst: 'stroke',
				transparentCorners: false,
				cornerSize: 15,
				cornerRadius: 15,
				cornerColor: '#e68035'
			});
			newInputCtrl.cornerStyle = 'circle';

			newTopVal = newTopVal + 30;
			newInputCtrl.set({
				shapeCanvas: 'texts',
				hasRotatingPoint: true
			});
			canvasBack.add(newInputCtrl);
			canvasBack.setActiveObject(newInputCtrl);
			canvasBack.renderAll();
		});
		
		if($('#admin_card_back').length){		
			let jsonAdminBack = $('#admin_card_back').val();		
			jsonAdminBack = JSON.parse(jsonAdminBack);
			let backCardSide = jsonAdminBack.length;	
			backCardSideData = jsonAdminBack;
			if(backCardSide == 1) {
				canvasBack.loadFromJSON(backCardSideData[0], canvasBack.renderAll.bind(canvasBack), function (o, object) {
					let thisText = object.text;
					if (object.type === 'textbox') {
						jQuery('#back-add-field').parent('.add-new-fields').append('<div class="form_group"><div class="text_field"> <textarea id="fname_id" class="inputs-ctrl" name="comment" required="required" placeholder="Tap and Type"></textarea></div> <div class="checkbox_wrapper"><a href="javascript: void(0)" class="remove"><img src="/pub/media/images/cross-disable.png" style="width:30px;height:30px;background-position: center center" /></a></div></div>');
					}
				});
			} else {
				jQuery("div#back-view-text.add-new-fields").find('.form_group').remove();
				for (let i = 1; i <= backCardSideData.length; i++) {					;
					let parceArray = backCardSideData[i-1];										
					backCards.push(JSON.stringify(parceArray));
					liMaker(backCardSideData[i-1]);
					var input = '<div class="form_group"><div class="text_field"> <textarea id="fname_id" class="inputs-ctrl" name="comment" required="required" placeholder="Tap and Type"></textarea></div> <div class="checkbox_wrapper"><a href="javascript: void(0)" class="remove"><img src="/pub/media/images/cross-disable.png" style="width:30px;height:30px;background-position: center center" /></a></div></div>';
					jQuery('#back-add-field').parent('.add-new-fields').append(input);
				}	
			}
		}
		
		$(document).on('click','.user-front-card-wrapper.canvas-edit .checkbox_wrapper a.remove', function (event) {
            var activeObj = canvas.getActiveObject();
            let frontNew = $('#export_front').css('display');
            let controlAttrNew = $(this).attr('class');
            let front = $('#front-view').css('display');
            let inputCtrlIndex = $(this).parents().parents().index();
            inputCtrlIndex = inputCtrlIndex - 1;
            if (frontNew === 'block') {
                canvas.setActiveObject(canvas._objects[inputCtrlIndex]);
                canvasBack.setActiveObject(canvasBack._objects[inputCtrlIndex]);
                canvas.renderAll();
                if (controlAttrNew === 'remove') {
                    if (frontNew === 'block') {
                        let activeObjIndex = canvas.getObjects().indexOf(canvas.getActiveObject());
                        $('.form_cntrl').eq(activeObjIndex).remove();
                        canvas.remove(canvas.getActiveObject());
                    } else {
                        let activeObjIndex = canvasBack.getObjects().indexOf(canvasBack.getActiveObject());
                        $('.form_cntrl').eq(activeObjIndex).remove();
                        canvasBack.remove(canvasBack.getActiveObject());
                    }
                }
            } else {
                canvasBack.setActiveObject(canvasBack._objects[inputCtrlIndex]);
                canvasBack.renderAll();
            }
            canvas.setActiveObject(activeObj);
            canvas.renderAll();
            canvasBack.renderAll();

        });
		
		$(document).on('click', '.user-back-card-wrapper.canvas-edit-back .checkbox_wrapper a.remove', function (event) {
            var activeObj = canvasBack.getActiveObject();
            let backNew = $('#export_back').css('display');
            let controlAttrNew = $(this).attr('class');
            let back = $('#export_back').css('display');
            let inputCtrlIndex = $(this).parents().parents().index();
            inputCtrlIndex = inputCtrlIndex - 1;
            if (back === 'block') {
                canvasBack.setActiveObject(canvasBack._objects[inputCtrlIndex]);
                canvasBack.renderAll();
                if (controlAttrNew === 'remove') {
                    if (backNew === 'block') {
                        let activeObjIndex = canvasBack.getObjects().indexOf(canvasBack.getActiveObject());
                        $(this).parents('.canvas-edit-back').find('.form_cntrl').eq(activeObjIndex).remove();
                        canvasBack.remove(canvasBack.getActiveObject());
                        canvas.remove(canvas.getActiveObject());

                    } else {
                       let activeObjIndex = canvasBack.getObjects().indexOf(canvasBack.getActiveObject());
                        $(this).parents('.canvas-edit-back').find('.form_cntrl').eq(activeObjIndex).remove();
                        canvasBack.remove(canvasBack.getActiveObject());
                        canvas.remove(canvasBack.getActiveObject());
                    }
                }
            } else {
                canvasBack.setActiveObject(canvasBack._objects[inputCtrlIndex]);
                canvasBack.renderAll();
            }
            canvasBack.setActiveObject(activeObj);
            canvasBack.renderAll();
        });
			
		jQuery(document).on('focus', 'front-inputs-ctrl,.user-front-ctrl', function () {
			let inputCtrlIndex = jQuery(this).parents('.form_cntrl').index();
			inputCtrlIndex = inputCtrlIndex-1;
			canvas.setActiveObject(canvas._objects[inputCtrlIndex]);
			canvas.renderAll();
		});
		

		jQuery(document).on('keyup', '.user-front-ctrl', function () {
			let updatedTextVal = jQuery(this).val();
			canvas.getActiveObject().set('text', updatedTextVal);
			jQuery('.inputVal').val(updatedTextVal);
			canvas.renderAll();
		});
		

		jQuery(document).on('focus', '.user-back-ctrl', function () {
			let inputCtrlIndex = jQuery(this).parents().index();
			inputCtrlIndex = inputCtrlIndex-1;
			canvasBack.setActiveObject(canvasBack._objects[inputCtrlIndex]);
			canvasBack.renderAll();
		});
		

		jQuery(document).on('keyup', '.user-back-ctrl', function () {
			let updatedTextVal = jQuery(this).val();
			canvasBack.getActiveObject().set('text', updatedTextVal);
			jQuery('.inputVal').val(updatedTextVal);
			canvasBack.renderAll();
		});	
		jQuery("#user-front").on('click', function () { 
			inputValState = jQuery(this).children("option:selected").val();
			let front = jQuery('#front-view').css('display');
			let inputCtrlIndex = jQuery(this).parents().index();
			inputCtrlIndex = inputCtrlIndex;
			let updatedTextVal = jQuery(this).children("option:selected").val();
			if (front === 'block') {
				canvas.setActiveObject(canvas._objects[inputCtrlIndex]);
				canvas.getActiveObject().set('text', updatedTextVal);
				let ActiveObjectIndex = canvas.getObjects().indexOf(canvas.getActiveObject());
				jQuery('.inputs-ctrl-select').eq(ActiveObjectIndex).val(updatedTextVal);
				canvas.renderAll();
			} else {
				canvasBack.getActiveObject().set('text', updatedTextVal);
				let ActiveObjectIndex = canvasBack.getObjects().indexOf(canvasBack.getActiveObject());
				jQuery('.back-input').eq(ActiveObjectIndex).val(updatedTextVal);
				canvasBack.renderAll();
			}
		
		});
		/*End Edit Card Functionality*/
		/*Save output*/
		jQuery('.save-btn').on('click', function () {
			let backCardLength = backCards.length;			
			let buttonAction = jQuery(this).data('source');
			var save_card_json = '';		
			let cardsize =  jQuery('input[name="card-size"]:checked').val();		
			if(backCardLength > 0) {
				canvas.cardtype = cardsize;
				if(buttonAction =='add') {
					var backCardArr = '['+backCards+']';
					let backJson =  JSON.parse(backCardArr);
					save_card_json = {"front":canvas, "back":backJson};	
					let cardjsonstringify = JSON.stringify(save_card_json);	
					jQuery("textarea[name=product\\[card_json\\]]").val(cardjsonstringify).change();
				} else if(buttonAction =='update') {
					var backCardArr = '['+backCards+']';
					let backJson =  JSON.parse(backCardArr);
					console.log(backJson);
					//save_card_json = {"front":canvas, "back":JSON.parse(JSON.stringify(backCards))};
					save_card_json = {"front":canvas, "back":backJson};
					var cardjsonstringify = JSON.stringify(save_card_json);
					jQuery("textarea[name=product\\[card_json\\]]").val(cardjsonstringify).change();
				
				}	
				
			} else {
				var backCardArr = [];
				canvas.cardtype = cardsize;
				save_card_json = {"front":canvas, "back":backCardArr};	
				let cardjsonstringify = JSON.stringify(save_card_json);	
				jQuery("textarea[name=product\\[card_json\\]]").val(cardjsonstringify).change();
			}	
		});
	})(jQuery);
});