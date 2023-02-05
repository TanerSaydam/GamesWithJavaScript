const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

document.addEventListener("keydown",keydown)

let x = 10;
let y =120;
let width = canvas.width;
let height = canvas.height;
let boyut = 30;

let engelX = 300;

let interval;
start();

function start(){

    ctx.clearRect(0,0,canvas.clientWidth, canvas.clientHeight);

    ctx.fillStyle="red";
    ctx.fillRect(x,y,30,30);   

    ctx.fillStyle = "green"
    ctx.fillRect(engelX,170,10,100);

    interval = setInterval(start,15);  
}

function keydown(e){
    if(e.keyCode == 37){ //sol
        x -= 5;
        if(x < -10){
            x = width + boyut;
        }
    }

    if(e.keyCode == 38){ //yukarı
        y -= 5;
        if(y < -10){
            y = height + boyut;
        }
    }

    if(e.keyCode == 39){ //sağ
        x +=5;
        if(x >= width - boyut){
            x = width - boyut;
        }

        if(x >= 270){
            alert("çarptın");
            clearInterval(interval);
            document.location.reload();
        }
    }

    if(e.keyCode == 40){ //aşağı
        y += 5;
        if(y > 260){
            y = -10;
        }
    }
}
