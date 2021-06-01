var Platno = document.getElementById("Platno");
var crtaj = Platno.getContext("2d");
var poluprecnikLopte = 10;
var x = Platno.width / 2;
var y = Platno.height - 30;
var dx = 2;
var dy = -2;
var visinaPrecage = 10;
var sirinaPrecage = 80;
var precagaXpozicija = (Platno.width - sirinaPrecage) / 2;
var idiDesno = false;
var idiLevo = false;
var cigleBruRedu = 10;
var cigleBruKoloni = 6;
var sirinaCigle = 75;
var visinaCigle = 20;
var luftCigle = 10;
var luftCigliGore = 30;
var luftCigliLevo = 30;
var bodovi = 0; //*novo
var zivoti = 2; //*novo	 

var cigle = [];
for (var c = 0; c < cigleBruKoloni; c++) {
    cigle[c] = [];
    for (var r = 0; r < cigleBruRedu; r++) {
        cigle[c][r] = { x: 0, y: 0, status: 1 };
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.code == "ArrowRight") {
        idiDesno = true;
    }
    else if (e.code == 'ArrowLeft') {
        idiLevo = true;
    }
}
function keyUpHandler(e) {
    if (e.code == "ArrowRight") {
        idiDesno = false;
    }
    else if (e.code == 'ArrowLeft') {
        idiLevo = false;
    }
}
function proveraSudara() {
    for (var c = 0; c < cigleBruKoloni; c++) {
        for (var r = 0; r < cigleBruRedu; r++) {
            var b = cigle[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + sirinaCigle && y > b.y && y < b.y + visinaCigle) {
                    dy = -dy;
                    b.status = 0;
                    //*novo
                    bodovi++;
                    if (bodovi == cigleBruRedu * cigleBruKoloni) {
                        alert("Pobeda!");
                        document.location.reload();
                    }
                    //*novo						
                }
            }
        }
    }
}

function iscrtajLoptu() {
    crtaj.beginPath();
    crtaj.arc(x, y, poluprecnikLopte, 0, Math.PI * 2);
    crtaj.fillStyle = "#28c953";
    crtaj.fill();
    crtaj.closePath();
}
function iscrtajPrecagu() {
    crtaj.beginPath();
    crtaj.rect(precagaXpozicija, Platno.height - visinaPrecage, sirinaPrecage, visinaPrecage);
    crtaj.fillStyle = "#0ab8f2";
    crtaj.fill();
    crtaj.closePath();
}
function iscrtajCigle() {
    for (var c = 0; c < cigleBruKoloni; c++) {
        for (var r = 0; r < cigleBruRedu; r++) {
            if (cigle[c][r].status == 1) {
                var ciglaXpoz = (r * (sirinaCigle + luftCigle)) + luftCigliLevo;
                var ciglaYpoz = (c * (visinaCigle + luftCigle)) + luftCigliGore;
                cigle[c][r].x = ciglaXpoz;
                cigle[c][r].y = ciglaYpoz;
                crtaj.beginPath();
                crtaj.rect(ciglaXpoz, ciglaYpoz, sirinaCigle, visinaCigle);
                crtaj.fillStyle = "#de430b";
                crtaj.fill();
                crtaj.closePath();
            }
        }
    }
}
//*novo
function iscrtajBodove() {
    crtaj.font = "16px Georgia";
    crtaj.fillStyle = "#f8ff36";
    crtaj.fillText("Bodovi: " + bodovi, 8, 20);
}

function iscrtajZivote() {
    crtaj.font = "16px Georgia";
    crtaj.fillStyle = "#ff0000";
    crtaj.fillText("Zivoti: " + zivoti, Platno.width - 65, 20);
}
//*novo
function iscrtaj() {
    crtaj.clearRect(0, 0, Platno.width, Platno.height);
    iscrtajCigle();
    iscrtajLoptu();
    iscrtajPrecagu();
    iscrtajBodove(); //*novo
    iscrtajZivote(); //*novo
    proveraSudara();

    if (x + dx > Platno.width - poluprecnikLopte || x + dx < poluprecnikLopte) {
        dx = -dx;
    }
    if (y + dy < poluprecnikLopte) {
        dy = -dy;
    }
    else if (y + dy > Platno.height - poluprecnikLopte) {
        if (x > precagaXpozicija && x < precagaXpozicija + sirinaPrecage) {
            dy = -dy;
        }
        else {
            //*novo
            zivoti--;
            if (!zivoti) {
                alert("Kraj Igre");
                document.location.reload();
            }
            else {
                x = Platno.width / 2;
                y = Platno.height - 30;
                dx = 2;
                dy = -2;
                precagaXpozicija = (Platno.width - sirinaPrecage) / 2;
            }
            //*novo
        }
    }

    if (idiDesno && precagaXpozicija < Platno.width - sirinaPrecage) {
        precagaXpozicija += 5;
    }
    else if (idiLevo && precagaXpozicija > 0) {
        precagaXpozicija -= 5;
    }

    x += dx;
    y += dy;
}

setInterval(iscrtaj, 10);