import '../src/styles/main.css'
import viteLogo from '/vite.svg'

import { Frog } from './modules/Frog.js';
import { Fly } from './modules/Fly.js';
import { Splash, createSplash } from './modules/Splash.js';
import { drawBackground, drawLilyPads, drawScore, detectCollision, update } from './modules/game.js';

// Основная логика запуска игры
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;

const frog = new Frog(canvas, ctx);
const flies = Array.from({ length: 5 }, () => new Fly(canvas, ctx));

let score = 0;
let gameRunning = false;

document.getElementById("playButton").addEventListener("click", () => {
    // Логика старта и паузы игры
    if (!gameRunning) {
        frog.x = lilyPads[1].x + lilyPads[1].width / 2 - frog.width / 2; // Восстановить позицию лягушки
        frog.y = lilyPads[1].y - frog.height;
        frog.isDrowned = false; // Сбросить состояние утопления
        score = 0;
        document.getElementById("gameOverText").style.display = "none";
      }
      gameRunning = !gameRunning;
      document.getElementById("playButton").innerText = gameRunning
        ? `${pauseText}`
        : `${playText}`;

      // Снимаем фокус с кнопки, чтобы пробел больше не влиял на её состояние
      document.getElementById("playButton").blur();
});

document.addEventListener("keydown", (e) => {
    // Обработчики клавиш
    if (e.code === "ArrowLeft") frog.moveLeft();
        if (e.code === "ArrowRight") frog.moveRight();

        // Если игра запущена, предотвратить действие по умолчанию
        if (e.code === "ArrowUp") {
          e.preventDefault();
          frog.jump();
        }

        if (e.code === "ArrowUp") frog.jump(); // Прыжок 
});

document.addEventListener("keyup", (e) => {
    // Обработчики клавиш
    if (e.code === "ArrowLeft" || e.code === "ArrowRight") frog.stop();
});

// Инициализация игры
drawBackground(ctx, canvas);
drawLilyPads(ctx);
update(ctx, frog, flies, score, gameRunning);
