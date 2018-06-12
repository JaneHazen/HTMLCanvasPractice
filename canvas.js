const fakeCanvas = document.getElementById('fakeCanvas');

var ctx = fakeCanvas.getContext('2d');
ctx.beginPath();
ctx.moveTo(75, 25);
ctx.quadraticCurveTo(20, 50, 120, 100);
ctx.lineWidth = 10;
ctx.strokeStyle = 'blue';
ctx.stroke();

ctx.beginPath();
ctx.moveTo(75, 25);
ctx.quadraticCurveTo(3, 40, 10, 100);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(115, 55);
ctx.quadraticCurveTo(33, 60, 180, 130);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(115, 55);
ctx.quadraticCurveTo(50, 30, 70, 70);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(120, 100);
ctx.quadraticCurveTo(50, 50, 190, 75);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(150, 115);
ctx.quadraticCurveTo(85, 35, 200, 90);
ctx.stroke();
var dataURL = fakeCanvas.toDataURL();
console.log(dataURL, "DATAURL");

var waveImage = new Image();
waveImage.src = dataURL;


const canvas = document.getElementById('realCanvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c  = canvas.getContext('2d');

let mouse = {
    x: undefined,
    y: undefined
};

window.addEventListener('mousemove',
    function(event){
        mouse.x = event.x;
        mouse.y = event.y;
    });

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
});

function Wave() {

    this.update = function() {

        // interactivity
        if(mouse.x && mouse.y) {
            c.clearRect(0,0,innerWidth, innerHeight);
            c.drawImage(waveImage, mouse.x - waveImage.width/2, mouse.y - waveImage.height/2);
        }


        this.draw();
    }

}
let theWave = new Wave();
function init() {
    theWave = new Wave();
}


function animate(){
    requestAnimationFrame(animate);
    theWave.update()
}
animate();


init();