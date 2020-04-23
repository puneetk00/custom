!(function($){
var fonts = ["Cadillac", "Open Sans", "Roboto", "Indie Flower", "Calibri Bold", "MinionPro Bold", "MinionPro Regular", "MyriadPro Regular","MazdaType-Medium","MazdaType-MediumItalic","MazdaType-Regular","MazdaType-Italic","MazdaType-BoldItalic"];

fonts.unshift('Arial');
// Populate the fontFamily select
var select = document.getElementById("font-family-list");
fonts.forEach(function (font) {
    var option = document.createElement('option');
    option.innerHTML = font;
    option.value = font;
    option.style.fontFamily = font;
    select.appendChild(option);
});



// Apply selected font on change

$('#font-family-list option').on('click', function () {
    let front = $('#front-view').css('display');
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
    let front = $('#front-view').css('display');
    var myfont = new FontFaceObserver(font)
    myfont.load()
        .then(function () {
            if (front === 'block') {
                canvas.getActiveObject().set("fontFamily", font);
                canvas.renderAll();
            }
            else {
                canvasBack.getActiveObject().set("fontFamily", font);
                canvasBack.renderAll();
            }
        }).catch(function (e) {
            console.log(e)
            alert('font loading failed ' + font);
        });
}
})(jQuery);