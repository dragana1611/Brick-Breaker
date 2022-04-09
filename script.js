const Platno = document.getElementById("Platno");
const btnStart = document.getElementById("start");
const btnRestart = document.getElementById("restart");

const crtaj = Platno.getContext("2d");
let poluprecnikLopte = 10;
let x = Platno.width / 2;
let y = Platno.height - 30;
let dx = 2;
let dy = -2;
let visinaPrecage = 20;
let sirinaPrecage = 100;
let precagaXpozicija = (Platno.width - sirinaPrecage) / 2;
let idiDesno = false;
let idiLevo = false;
let cigleBruRedu = 10; // broj kolona
let cigleBruKoloni = 6; // broj redova
let sirinaCigle = 75;
let visinaCigle = 20;
let luftCigle = 10;
let luftCigliGore = 30;
let luftCigliLevo = 30;
let bodovi = 0;
let zivoti = 3;
let interval = null;

let cigle = [];
for (let c = 0; c < cigleBruKoloni; c++) {
  cigle[c] = [];
  for (let r = 0; r < cigleBruRedu; r++) {
    cigle[c][r] = { x: 0, y: 0, status: 1 };
  }
}

window.addEventListener("load", iscrtaj);
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
btnStart.addEventListener("click", startGame);
btnRestart.addEventListener("click", restartGame);

function startGame() {
  if (!interval)
    //prevents acceleration of setInterval
    interval = setInterval(iscrtaj, 10);
}

function restartGame() {
  location.reload(true);
}

function keyDownHandler(e) {
  if (e.code == "ArrowRight") {
    idiDesno = true;
  } else if (e.code == "ArrowLeft") {
    idiLevo = true;
  }
}
function keyUpHandler(e) {
  if (e.code == "ArrowRight") {
    idiDesno = false;
  } else if (e.code == "ArrowLeft") {
    idiLevo = false;
  }
}
function proveraSudara() {
  for (let c = 0; c < cigleBruKoloni; c++) {
    for (let r = 0; r < cigleBruRedu; r++) {
      let b = cigle[c][r];
      if (b.status == 1) {
        if (
          x < b.x + sirinaCigle &&
          x + 2 * poluprecnikLopte > b.x &&
          y < b.y + visinaCigle &&
          y + 2 * poluprecnikLopte > b.y
        ) {
          dy = -dy;
          b.status = 0;

          bodovi++;
          if (bodovi == cigleBruRedu * cigleBruKoloni) {
            alert("Pobeda!");
            location.reload(true);
          }
        }
      }
    }
  }
}

console.log(precagaXpozicija);

function iscrtajLoptu() {
  crtaj.beginPath();
  crtaj.arc(x, y, poluprecnikLopte, 0, Math.PI * 2);
  crtaj.fillStyle = "#7BFD60";
  crtaj.fill();
  crtaj.closePath();
}
function iscrtajPrecagu() {
  const grad = crtaj.createLinearGradient(400, 620, 500, 640);
  grad.addColorStop(0, "#003297");
  grad.addColorStop(1, "#0070bb");
  crtaj.beginPath();
  crtaj.fillStyle = grad;
  crtaj.fillRect(
    precagaXpozicija,
    Platno.height - visinaPrecage,
    sirinaPrecage,
    visinaPrecage
  );
  crtaj.closePath();
}

function iscrtajCigle() {
  for (let c = 0; c < cigleBruKoloni; c++) {
    for (let r = 0; r < cigleBruRedu; r++) {
      if (cigle[c][r].status == 1) {
        let ciglaXpoz = r * (sirinaCigle + luftCigle) + luftCigliLevo;
        let ciglaYpoz = c * (visinaCigle + luftCigle) + luftCigliGore;

        cigle[c][r].x = ciglaXpoz;
        cigle[c][r].y = ciglaYpoz;

        const grad = crtaj.createLinearGradient(0, 0, 900, 300);
        grad.addColorStop(0, "rgba(112, 234, 234, 0.8)");
        grad.addColorStop(1, "rgba(218, 253, 253, 0.8)");
        crtaj.beginPath();
        crtaj.fillStyle = grad;
        crtaj.fillRect(ciglaXpoz, ciglaYpoz, sirinaCigle, visinaCigle);
        crtaj.closePath();
      }
    }
  }
}

function iscrtajBodove() {
  crtaj.font = "25px Georgia";
  crtaj.fillStyle = "#F5EDB3";
  crtaj.fillText("Score: " + bodovi, 30, 20);
}

function iscrtajZivote() {
  crtaj.font = "25px Georgia";
  crtaj.fillStyle = "#E84130";
  crtaj.fillText("Lives: " + zivoti + " " + "❤️", Platno.width - 150, 20);
}

function iscrtaj() {
  crtaj.clearRect(0, 0, Platno.width, Platno.height);
  iscrtajCigle();
  iscrtajLoptu();
  iscrtajPrecagu();
  iscrtajBodove();
  iscrtajZivote();
  proveraSudara();

  if (x + dx > Platno.width - poluprecnikLopte || x + dx < poluprecnikLopte) {
    dx = -dx;
  }
  if (y + dy < 2 * poluprecnikLopte) {
    dy = -dy;
  } else if (y + dy > Platno.height - 2 * poluprecnikLopte) {
    if (
      x + 2 * poluprecnikLopte > precagaXpozicija &&
      x < precagaXpozicija + sirinaPrecage
    ) {
      dy = -dy;
    } else {
      zivoti--;
      if (!zivoti) {
        ///
        alert("Kraj Igre");
        location.reload(true);
      } else {
        x = Platno.width / 2;
        y = Platno.height - 30;
        dx = 2;
        dy = -2;
        precagaXpozicija = (Platno.width - sirinaPrecage) / 2;
      }
    }
  }

  if (idiDesno && precagaXpozicija < Platno.width - sirinaPrecage) {
    precagaXpozicija += 5;
  } else if (idiLevo && precagaXpozicija > 0) {
    precagaXpozicija -= 5;
  }

  x += dx;
  y += dy;
}
