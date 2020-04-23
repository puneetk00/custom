var fonts = [
  "Cadillac",
  "Open Sans",
  "Roboto",
  "Indie Flower",
  "Calibri Bold",
  "MinionPro Bold",
  "MinionPro Regular",
  "MyriadPro Regular",
  "MazdaType-Medium",
  "MazdaType-MediumItalic",
  "MazdaType-Regular",
  "MazdaType-Italic",
  "MazdaType-BoldItalic",
  "Helvetica-Normal",
  "Helvetica Neue LT Std",
  "Helvetica Inserat LT Std",
  "BrushScriptMT",
  "EnglishScript",
  "CopperplateGothicLTPro-32AB",
  "AvantGardeGothicITCW01Md",
  "dearJoeTwo",
  "HelveticaLTWXX-Roman",
  "HelveticaLTWXX-Bold",
  "BrushScriptBTWXX-Regular",
  "ITCGaramondStd-Bk",
  "TimesLTPro-Roman",
  "TimesLTPro-Bold",
  "OptimaLTStd-Medium",
  "RockwellStd-Bold",
  "Georgia",
  "Humanist521BT-Roman",
  "FFTransitWebProRegular",
  "FFTransitWebProBold",
  "Tahoma"
];

fonts.unshift('Arial');
/*
*Populate the fontFamily select
*/
function truncateWithEllipses(text, max) {
  return text.substr(0, max - 1) + (text.length > max ? "&hellip;" : "");
}
var select = document.getElementById("font-family-list");

fonts.forEach(function (font) {
    var limit = truncateWithEllipses(font, 15);        
    var option = document.createElement('option');
    option.innerHTML = font;
    option.value = font;
    option.style.fontFamily = font;
    select.appendChild(option);
});



/*
* Apply selected font on change
*/

jQuery('#font-family-list option').on('click', function () {
    let front = jQuery('#front-view').css('display');
    let fontValue = this.value;
    jQuery('.font-family').text(this.value);
    if (this.value !== 'Arial') {
        loadAndUse(this.value);
    } else if (front === 'block') {
        canvas.getActiveObject().set("fontFamily", this.value);
        canvas.renderAll();
    }
    else {
        console.log(this.value)
        canvasBack.getActiveObject().set("fontFamily", this.value);
        canvasBack.renderAll();
    }
});

function loadAndUse(font) {
    let front = jQuery('#front-view').css('display');
    var myfont = new FontFaceObserver(font);
    let activeObj = canvas.getActiveObject();
    let activeObjBack = canvasBack.getActiveObject();
    if (front === 'block') {
        if (activeObj._objects) {
            jQuery('#textEditOptions').css({ display: 'block' });
            jQuery('#imageEditOptions').css({ display: 'none' });

            for (let i = 0; i < activeObj._objects.length; i++) {
                activeObj._objects[i].set("fontFamily", font);
            }
        } else {
            canvas.getActiveObject().set("fontFamily", font);
        }
    } else {
        if (activeObjBack._objects) {
            jQuery('#textEditOptions').css({ display: 'block' });
            jQuery('#imageEditOptions').css({ display: 'none' });

            for (let i = 0; i < activeObjBack._objects.length; i++) {
                activeObjBack._objects[i].set("fontFamily", font);
            }
        } else {
            canvasBack.getActiveObject().set("fontFamily", font);
        }
    }


    myfont.load()
        .then(function () {
            if (front === 'block') {
                canvas.getActiveObject().set("fontFamily", font);
                activeObj.set("fontFamily", font);
                canvas.renderAll();
                canvas.requestRenderAll();
            }
            else {
                canvasBack.getActiveObject().set("fontFamily", font);
                activeObjBack.set("fontFamily", font);
                canvasBack.renderAll();
                canvasBack.requestRenderAll();
            }
        }).catch(function (e) {
            console.log(e)
            console.log('font loading failed ' + font);
        });
}
