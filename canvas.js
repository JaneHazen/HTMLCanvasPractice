const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c  = canvas.getContext('2d');

let clicked = false;


window.addEventListener('click',
    function(event) {
        circleArray.map(circle =>{
            if(event.clientX + circle.radius >= circle.x
                && event.clientX - circle.radius <= circle.x
                && event.clientY + circle.radius >=circle.y
                && event.clientY - circle.radius <= circle.y)
            {circle.clicked = true};
        });
});

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
});

function Circle(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.clicked = false;
    this.color = 'gray';


    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    };

    this.update = function() {

        // interactivity
        if(this.clicked) {
            this.color = 'yellow';
        }

        this.draw();
    }

}

let circleArray = [];
function init() {
    circleArray = [];
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const radius = 10;
            const x = i + radius + (i * radius  * 2);
            const y = j +  radius + (j * radius  * 2);
            circleArray.push(new Circle(x, y, radius));
        }
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