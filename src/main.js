import "./styles/main.css";
import { Frog } from "./modules/Frog.js";
import { Fly } from "./modules/Fly.js";
import {
  drawBackground,
  lilyPads,
  drawLilyPads,
  drawScore,
  detectCollision,
} from "./modules/gameDraw.js";

// Основная логика запуска игры
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;

// Фоновая музыка
const backgroundMusic = new Audio("./assets/game-music.mp3");
backgroundMusic.loop = true; // Устанавливаем цикл для музыки
backgroundMusic.volume = 0.5; // Устанавливаем начальную громкость (от 0 до 1)

let gameRunning = false;

// Функция для изменения состояния игры
function setGameRunning(state) {
  gameRunning = state;
}

const splashes = []; // массив всплесков
const frog = new Frog(canvas, ctx, splashes, setGameRunning, resetScore); // передаем splashes в Frog
const flies = Array.from({ length: 5 }, () => new Fly(canvas, ctx)); // кол-во мошек

let score = 0;

// Функция для удаления текста приветствия
function removeInfoText() {
  const infoDiv = document.querySelector(".info");
  if (infoDiv) {
    infoDiv.remove();
  }
}

// Функция для сброса счёта
export function resetScore() {
  score = 0;
}

// Старт игры
document.getElementById("playButton").addEventListener("click", () => {

  if (!gameRunning) {
    
    document.getElementById("gameOverText").style.display = "none";

    removeInfoText(); // Удаляем текст описания при старте игры
  }
  gameRunning = !gameRunning;  

  // Смена текста на кнопке 
  document.getElementById("playButton").innerText = gameRunning
    ? "Pause"
    : "Play";
  document.getElementById("playButton").blur();
});

// Управление персонажем
document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowLeft") frog.moveLeft();
  if (e.code === "ArrowRight") frog.moveRight();
  if (e.code === "ArrowUp") {
    e.preventDefault();
    frog.jump();
  }
});

document.addEventListener("keyup", (e) => {
  if (e.code === "ArrowLeft" || e.code === "ArrowRight") frog.stop();
});

// Запуск игрового цикла
function gameLoop() {
  if (gameRunning) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground(ctx, canvas);
    drawLilyPads(ctx);
    frog.update();
    frog.draw(ctx);

    flies.forEach((fly) => {
      fly.update();
      fly.draw(ctx);
      if (detectCollision(frog, fly)) {
        score++;
        fly.x = Math.random() * canvas.width;
        fly.y = Math.random() * (canvas.height - 200);
      }
    });

    drawScore(ctx, score);

    // Обновляем и рисуем всплески
    splashes.forEach((splash, index) => {
      splash.update();
      splash.draw(ctx);
      if (splash.alpha <= 0) {
        splashes.splice(index, 1); // Удаляем всплеск, если он исчезает
      }
    });

    backgroundMusic.play(); // воспроизведение музыки при старте игры
  } else {
    backgroundMusic.pause(); // пауза музыки при остановке игры
    backgroundMusic.currentTime = 0; // сброс музыки к началу
  }

  requestAnimationFrame(gameLoop);
  
}

gameLoop(); // Запуск игрового цикла
