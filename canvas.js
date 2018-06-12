
const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c  = canvas.getContext('2d');

let mouseClick = false;

const redColorArray = [
    '#420010',
    '#ED90A7',
    '#D81E4C',
    '#931635',
];

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
});

window.addEventListener('click',
    function() {
        mouseClick = true;
    });

function Rectangle(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.colorArrayIndex = Math.floor(Math.random() * redColorArray.length);
    this.color = redColorArray[this.colorArrayIndex];


    this.draw = function() {
        c.fillStyle = this.color;
        c.fillRect(this.x, this.y, this.w, this.h);
    };

    this.update = function() {
        // interactivity
        if(mouseClick){
            this.h += 35;
        }
        this.draw();
    }

}

let rectangleArray = [];
function init() {
    rectangleArray = [];
    let numberOfCurtains = 40;
    for (let i = 0; i < numberOfCurtains; i++) {
        const w = innerWidth/numberOfCurtains;
        const h = 10;
        const x = i + (i * w );
        const y = 20;
        rectangleArray.push(new Rectangle(x, y, w, h));
    }
}

function animate(){
    requestAnimationFrame(animate);
    for (let i = 0; i < rectangleArray.length; i ++) {
        rectangleArray[i].update();
    }
}
animate();


init();