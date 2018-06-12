const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c  = canvas.getContext('2d');

let mouse = {
    x: undefined,
    y: undefined
};

const maxRadius = 80;
const distanceFromMouse = 50;

var person = new Image();
person.src = "https://static1.squarespace.com/static/55947ac3e4b0fa882882cd65/58ab7d7229687f223f18a4d4/58ab9a90f7e0ab024bc506f5/1487641285336/NS_0036.png";

const redColorArray = [
    '#420010',
    '#ED90A7',
    '#D81E4C',
    '#931635',
];

const blueColorArray = [
    '#87F1FF',
    '#119DAF',
    '#0A3238',
    '#54B2BF',
];

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

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.colorArrayIndex = Math.floor(Math.random() * blueColorArray.length);
    this.color = blueColorArray[this.colorArrayIndex];


    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    };

    this.update = function() {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        // interactivity
        if(mouse.x && mouse.y) {
            c.drawImage(person, mouse.x - person.width/2, mouse.y - person.height/8);
        }
        if(mouse.x - this.x < distanceFromMouse  ) {
            this.x += 4;
            if(this.radius < maxRadius) {
                this.radius += 1;
            }
            this.color = redColorArray[this.colorArrayIndex]

        } else if (mouse.x - this.x > - distanceFromMouse) {
            this.x -= 4;
            if(this.radius < maxRadius) {
                this.radius += 1;
            }
            this.color = redColorArray[this.colorArrayIndex]

        }

        this.draw();
    }

}

let circleArray = [];
function init() {
    circleArray = [];
    for (let i = 0; i < 500; i++) {
        const radius = Math.random() * 10 + 1;
        const x = Math.random() * (innerWidth - radius * 2) + radius;
        const y = Math.random() * (innerHeight - radius * 2) + radius;
        const dx = (Math.random() - 0.5) * 3;
        const dy = (Math.random() - 0.5) * 3;
        circleArray.push(new Circle(x, y, dx, dy, radius));
    }
}


function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < circleArray.length; i ++) {
        circleArray[i].update();
    }
}
animate();


init();