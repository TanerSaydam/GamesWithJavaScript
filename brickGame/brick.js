const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
document.addEventListener("keydown", keydown, false);
document.addEventListener("keyup", keyup, false);
document.addEventListener("mousemove",mousemove,false);

let x = canvas.width / 2;
let y = canvas.height - 30;
let topRadius = 10;
let dx = 2;
let dy = -2;
let cubukGenislik = 150;
let cubukYukseklik = 10;
let cubukX = (canvas.width - cubukGenislik) / 2
let cubukY = canvas.height - cubukYukseklik;
let sagTusaBasildi = false;
let solTusaBasildi = false;
let interval;
let tuglaSatirSayisi = 3;
let tuglaSutunSayisi = 5;
let tuglaGenislik = 75;
let tuglaYukseklik = 20;
let tuglaPadding = 10;
let tuglaOffSetTop = 30;
let tuglaOffSetLeft = 30;
let tuglalar = [];
for (let k = 0; k < tuglaSutunSayisi; k++) {
    tuglalar[k] = [];
    for (let s = 0; s < tuglaSatirSayisi; s++) {
        tuglalar[k][s] = { x: 0, y: 0, status: 1 };
    }
}
let skor = 0;
let can = 3;

function oyunuCiz() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    topuCiz();
    topKonumunuDegistir();
    cubuguCiz();
    cubukKonumunuDegistir();
    tuglaCiz();
    tuglayaCarptiMi();
    skorCiz();
    canCiz();
}

function topuCiz() {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function topKonumunuDegistir() {
    if (x + dx > canvas.width - topRadius || x + dx < topRadius) {
        dx = -dx;
    }
    if (y + dy < topRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - topRadius) {
        if (x > cubukX && x < cubukX + cubukGenislik) {
            dy = -dy
        } else {
            can--;           
            if(!can){
                alert("Oyunu kaybettin!");
                document.location.reload();
                clearInterval(interval);
            } else{
                x = canvas.width /2;
                y = canvas.height -30;
                dx = 2;
                dy = -2;
                cubukX = (canvas.width - cubukGenislik) / 2;
            }       
        }
    }

    x += dx;
    y += dy;
}

function cubuguCiz() {
    ctx.beginPath();
    ctx.rect(cubukX, cubukY, cubukGenislik, cubukYukseklik);
    ctx.fill();
    ctx.closePath();
}

function cubukKonumunuDegistir() {
    if (sagTusaBasildi) {
        cubukX += 5;
        if (cubukX + cubukGenislik > canvas.width) {
            cubukX = canvas.width - cubukGenislik
        }
    } else if (solTusaBasildi) {
        cubukX -= 5;
        if (cubukX < 0) {
            cubukX = 0;
        }
    }
}

function tuglaCiz() {
    for (let sutun = 0; sutun < tuglaSutunSayisi; sutun++) {
        for (let satir = 0; satir < tuglaSatirSayisi; satir++) {
            if (tuglalar[sutun][satir].status === 1) {
                const tuglaX = sutun * (tuglaGenislik + tuglaPadding) + tuglaOffSetLeft;
                const tuglaY = satir * (tuglaYukseklik + tuglaPadding) + tuglaOffSetTop;
                tuglalar[sutun][satir].x = tuglaX;
                tuglalar[sutun][satir].y = tuglaY;
                ctx.beginPath();
                ctx.rect(tuglaX, tuglaY, tuglaGenislik, tuglaYukseklik);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function tuglayaCarptiMi() {
    for (let sutun = 0; sutun < tuglaSutunSayisi; sutun++) {
        for (let satir = 0; satir < tuglaSatirSayisi; satir++) {
            const tugla = tuglalar[sutun][satir];
            if (tugla.status === 1) {
                if (x > tugla.x && x < tugla.x + tuglaGenislik && y > tugla.y && y < tugla.y + tuglaYukseklik) {
                    dy = -dy;
                    tugla.status = 0;
                    skor++;
                    if(skor === tuglaSatirSayisi * tuglaSutunSayisi){
                        alert("Oyunu Kazandın, Tebrikler!!");
                        document.location.reload();
                        clearInterval(interval);
                    }
                }
            }
        }
    }
}

function skorCiz(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD"
    ctx.fillText(`Skor: ${skor}`,8,20);
}

function canCiz(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "red";
    ctx.fillText(`Can: ${can}`,canvas.width-65,20);
}

function keydown(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        sagTusaBasildi = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        solTusaBasildi = true;
    }
}

function keyup(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        sagTusaBasildi = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        solTusaBasildi = false;
    }
}

function mousemove(e){
    const mouseX = e.clientX - canvas.offsetLeft;
    if(mouseX > 0 && mouseX < canvas.width){
        cubukX = mouseX - cubukGenislik / 2;
    }
}

interval = setInterval(oyunuCiz, 10);




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