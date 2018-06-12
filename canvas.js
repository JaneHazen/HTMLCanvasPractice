const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c  = canvas.getContext('2d');

// rectangle
// c.fillStyle = "rgba(0,255,0,0.5)";
// c.fillRect(0,0,100,100);
// c.fillRect(100,100,100,100);
// c.fillRect(500,300,100,100);
// console.log(canvas);
//
// //line
// c.beginPath();
// c.moveTo(50,300);
// c.lineTo(300,100);
// c.lineTo(400, 300);
// c.strokeStyle = "blue";
// c.stroke();
//
// //arc
// c.beginPath();
// c.arc(300, 300, 40,0,Math.PI * 2, false);
// c.strokeStyle = "red";
// c.stroke();
//
// for (let i = 0; i < 3; i ++) {
//     let x = Math.random() * window.innerWidth;
//     let y = Math.random() * window.innerHeight;
//     c.beginPath();
//     c.arc(x, y, 30, 0, Math.PI * 2, false);
//     c.strokeStyle = 'blue';
//     c.stroke();
// }
let mouse = {
    x: undefined,
    y: undefined
};

const maxRadius = 40;
const distanceFromMouse = 50;

const colorArray = [
    '#CCD7C5',
    '#65655E',
    '#7D80DA',
    '#D65780',
    '#EE9480'
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
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)]

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
        if (mouse.x - this.x < distanceFromMouse && mouse.x - this.x > - distanceFromMouse && mouse.y - this.y < distanceFromMouse
            && mouse.y - this.y > - distanceFromMouse) {
            if(this.radius < maxRadius ) {
                this.radius += 1;
            }
        } else if(this.radius > this.minRadius){
            this.radius -= 1;
        }

        this.draw();
    }

}

let circleArray = [];
function init() {
    circleArray = [];
    for (let i = 0; i < 900; i++) {
        const radius = Math.random() * 3 + 1;
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
