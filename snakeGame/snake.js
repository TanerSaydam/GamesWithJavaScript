const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

document.addEventListener("keydown",tusHareketleri);

let x = 10;
let y = 10;
let boyut = 18;
let konum = 20;
let hiz = 10;
let hareketX = 0;
let hareketY = 0;
let timeOut;
let elmaX = 5;
let elmaY = 5;
let yilanUzunlugu = 3;
let yilanParcalari = [];
let skor = 0;

class YilanParcasi{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

function oyunuCiz(){
    ekraniTemizle();
    yilaniCiz();
    yilaninKonumunuGuncelle();
    elmayiCiz();
    elmaninKonumunuDegistir();
    skoruCiz();
    hiziCiz();

    let sonuc = oyunBittiMi();
    if(sonuc){
        return;
    }

    timeOut = setTimeout(oyunuCiz,1000/hiz);
}

function ekraniTemizle(){
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.clientWidth,canvas.clientHeight);
}

function yilaniCiz(){
    ctx.fillStyle = "green";
    for(let i = 0; i < yilanParcalari.length; i++){
        let part = yilanParcalari[i];
        ctx.fillRect(part.x * konum, part.y*konum, boyut, boyut);
        //ctx.drawImage("https://www.w3schools.com/graphics/smiley.gif",part.x * konum, part.y*konum, boyut, boyut);
    }

    yilanParcalari.push(new YilanParcasi(x,y));

    if(yilanParcalari.length > yilanUzunlugu){
        yilanParcalari.shift();
    }

    ctx.fillStyle = "white";
    ctx.fillRect(x*konum,y*konum,boyut,boyut);
}

function yilaninKonumunuGuncelle(){
    let sonucX = x + hareketX;
    let sonucY = y + hareketY;
    if(sonucX > 19){
        x = 0;
    }else if(sonucX < 0){
        x = 19;
    }else{
        x = sonucX;
    }

    if(sonucY > 19){
        y = 0;
    }else if(sonucY < 0){
        y = 19;
    }else{
        y = sonucY;
    }
}

function elmayiCiz(){
    ctx.fillStyle = "red";
    ctx.fillRect(elmaX*konum,elmaY*konum,boyut,boyut);
}

function elmaninKonumunuDegistir(){
    if(x == elmaX && y == elmaY){
        elmaX = Math.floor(Math.random() * konum);
        elmaY = Math.floor(Math.random() * konum);

        let elmaKonumuMusaitMi = false;

        while(!elmaKonumuMusaitMi){
            elmaKonumuMusaitMi = true;
            yilanParcalari.forEach(element =>{
                if(element.x === elmaX && element.y === elmaY){
                    elmaX = Math.floor(Math.random() * konum);
                    elmaY = Math.floor(Math.random() * konum);
                    elmaKonumuMusaitMi = false;
                }
            });
        }

        yilanUzunlugu++;
        skor +=10;

        if(yilanUzunlugu %3 ==0){
            hiz++;
        }
    } 
}

function oyunBittiMi(){
    let oyunBitti = false;

    if(hareketX === 0 && hareketY ===0){
        return;
    }

    // if(x >= 19){
    //     oyunBittiyiCiz();
    //     oyunBitti = true;        
    // }else if(x == 0){
    //     oyunBittiyiCiz();
    //     oyunBitti = true;        
    // }else if(y >=19){
    //     oyunBittiyiCiz();
    //     oyunBitti = true;        
    // }else if(y == 0){
    //     oyunBittiyiCiz();
    //     oyunBitti = true;        
    // }

    // if(oyunBitti) return oyunBitti;


    for(let i =0; i<yilanParcalari.length; i++){
        let part = yilanParcalari[i];
        if(part.x === x && part.y === y){
            oyunBitti = true;
            break;
        }        
    }

    if(oyunBitti){
        oyunBittiyiCiz();
    }
    return oyunBitti;
}

function oyunBittiyiCiz(){
    ctx.fillStyle = "white";
    ctx.font = "50px verdena";
    ctx.fillText("Oyun Bitti!",canvas.clientWidth/4.5,canvas.clientHeight / 2);       
}

function skoruCiz(){
    ctx.fillStyle = "white";
    ctx.font = "20px verdena";
    ctx.fillText(`Skor: ${skor}`,canvas.clientWidth-80,30);
}

function hiziCiz(){
    ctx.fillStyle = "white";
    ctx.font = "20px verdena";
    ctx.fillText(`Hız: ${hiz}`, canvas.clientWidth-80,60)
}

function tusHareketleri(e){
    switch (e.keyCode) {
        case 37: //sol
            if(hareketX == 1) return;
            hareketX = -1;
            hareketY = 0;
            break;
        case 38: //üst
            if(hareketY == 1) return;
            hareketX = 0;  
            hareketY = -1;
            break;
        case 39: //sağ  
            if(hareketX == -1) return;
            hareketX = 1;
            hareketY = 0;
            break;
        case 40: //aşağı
            if(hareketY == -1) return;
            hareketX =0;
            hareketY = 1;
            break;       
    }
}

function yeniOyun(){
    document.location.reload();
}

oyunuCiz();