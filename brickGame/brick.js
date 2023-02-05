const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
document.addEventListener("keydown",keydown,false);
document.addEventListener("keyup",keyup,false);


let x = canvas.width/2;
let y = canvas.height -30;
let topRadius = 10;
let dx = 2;
let dy = -2;
let cubukGenislik = 150;
let cubukYukseklik = 10;
let cubukX = (canvas.width -cubukGenislik) / 2
let cubukY = canvas.height - cubukYukseklik;
let sagTusaBasildi = false;
let solTusaBasildi = false;
let interval;

function oyunuCiz(){
    ctx.clearRect(0,0,canvas.width,canvas.height);    
    topuCiz();
    topKonumunuDegistir();
    cubuguCiz();  
    cubukKonumunuDegistir();  
}

function topuCiz(){
    ctx.beginPath();
    ctx.arc(x,y,10,0,Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function topKonumunuDegistir(){
    if(x+dx > canvas.width - topRadius || x +dx < topRadius){
        dx = -dx;
    }
    if(y + dy < topRadius){
        dy = -dy;
    }else if(y + dy > canvas.height - topRadius){
        if(x > cubukX && x < cubukX + cubukGenislik){
            dy = -dy
        }else{
            alert("Oyunu kaybettin!");
            document.location.reload();
            clearInterval(interval);
        }
    }

    x += dx;
    y += dy;
}

function cubuguCiz(){
    ctx.beginPath();
    ctx.rect(cubukX,cubukY,cubukGenislik,cubukYukseklik);
    ctx.fill();
    ctx.closePath();
}  

function cubukKonumunuDegistir(){
    if(sagTusaBasildi){
        cubukX += 5;
        if(cubukX + cubukGenislik > canvas.width){
            cubukX = canvas.width - cubukGenislik
        }
    }else if(solTusaBasildi){
        cubukX -= 5;
        if(cubukX < 0){
            cubukX = 0;
        }
    }
}

function keydown(e){
    if(e.key === "Right" || e.key === "ArrowRight"){
        sagTusaBasildi = true;
        solTusaBasildi = false;
    }else if(e.key === "Left" || e.key === "ArrowLeft"){
        solTusaBasildi = true;
        sagTusaBasildi = false;
    }
}

function keyup(e){
    if(e.key === "Right" || e.key === "ArrowRight"){
        sagTusaBasildi = true;
        solTusaBasildi = false;
    }else if(e.key === "Left" || e.key === "ArrowLeft"){
        debugger
        solTusaBasildi = true;
        sagTusaBasildi = false;
    }
}

interval = setInterval(oyunuCiz,10);




// ctx.beginPath();
// ctx.fillStyle = "#FF0000";
// ctx.rect(20,40,50,50);
// ctx.fill();
// ctx.closePath();

// ctx.beginPath();
// ctx.fillStyle = "green";
// ctx.arc(240,160,20,0,Math.PI *2,false);
// ctx.fill();
// ctx.closePath();

// ctx.beginPath();
// ctx.rect(160,10,100,40);
// ctx.fillStyle = "rgba(0,0,255,0.5)";
// ctx.stroke();
// ctx.closePath();