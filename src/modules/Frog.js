import { lilyPads } from './game.js';
import { createSplash } from './Splash.js';

export class Frog {
    constructor(canvas, ctx, splashes, setGameRunning, resetScore) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.width = 40;
        this.height = 50;
        this.vx = 0;
        this.vy = 0;
        this.jumpPower = -15;
        this.gravity = 0.5;
        this.speed = 5;
        this.isJumping = false;
        this.jumpSound = new Audio('./assets/8-bit-jump.mp3'); // звук прыжка
        this.jumpSoundPlayed = false; // флаг звука прыжка
        this.isDrowned = false;
        this.splashes = splashes;
        this.drownSound = new Audio('./assets/8-bit-water-drop.wav'); // звук утопления
        this.drownSoundPlayed = false; // флаг звука утопления
        this.setGameRunning = setGameRunning; 
        this.resetScore = resetScore;
        this.resetPosition();            
    }

    resetPosition() {
        // Лягушка начинает с центральной кувшинки
        this.x = this.canvas.width / 2 - this.width / 2;
        this.y = this.canvas.height * 0.68 - this.height;
        this.isDrowned = false;
        this.vx = 0;
        this.vy = 0;
    }

    // Логика рисования лягушки
    draw() {        
        if (this.isDrowned) return; // Не рисовать лягушку, если она утонула

        const { ctx } = this;

        // Цвет, форма
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Глаза
        ctx.fillStyle = "white";
        ctx.fillRect(this.x + 5, this.y + 5, 10, 10);
        ctx.fillRect(this.x + 25, this.y + 5, 10, 10);

        // Рот
        ctx.fillStyle = "red";
        ctx.fillRect(this.x + 10, this.y + 25, 20, 5);

        // Ноги
        ctx.fillStyle = "darkgreen";
        ctx.fillRect(this.x - 10, this.y + 30, 10, 20);
        ctx.fillRect(this.x + 40, this.y + 30, 10, 20); 
    }

    // Логика обновления позиции лягушки
    update() {        
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;

        // Проверка на столкновение с кувшинками
        let onLilyPad = false;

        for (const lilyPad of lilyPads) {
            if (
                this.y + this.height > lilyPad.y &&              
                this.x + this.width > lilyPad.x &&              
                this.x < lilyPad.x + lilyPad.width &&
                this.y + this.height <= lilyPad.y + lilyPad.height
            ) {
                // Если все условия выполнены, лягушка находится на кувшинке
                onLilyPad = true;
                this.y = lilyPad.y - this.height;              
                this.vy = 0;
                this.isJumping = false; // Лягушка больше не прыгает
                // Сбрасываем флаг, чтобы звук можно было проиграть снова
                this.jumpSoundPlayed = false;  
                this.drownSoundPlayed = false;
            }
        }

        // Если лягушка не на кувшинке и касается болота, то лягушка утонула
        if (!onLilyPad && this.y + this.height > this.canvas.height * 0.7) {
            this.drown();
        }

        // Лягушка не должна выходить за границы экрана
        if (this.x < 0) this.x = 0;
        if (this.x + this.width > this.canvas.width) {
            this.x = this.canvas.width - this.width;
        }
    }

    // Прыжок
    jump() {        
        if (!this.isJumping) {
            this.vy = this.jumpPower;
            this.isJumping = true;

            if (!this.jumpSoundPlayed) {  // Проверяем, был ли уже проигран звук
                this.jumpSound.currentTime = 0; // сбрасываем время воспроизведения звука
                this.jumpSound.play();
                this.jumpSoundPlayed = true;  // звук проигран
            }
        }
    }

    // Движения влево, вправо, стоп
    moveLeft() {
        this.vx = -this.speed;
    }

    moveRight() {
        this.vx = this.speed;
    }

    stop() {
        this.vx = 0;
    }

    // Логика утопления
    drown() {
        // Создаем всплеск воды
        createSplash(this.x + this.width / 2, this.y + this.height, this.splashes);

        this.isDrowned = true; // Лягушка утонула

        // Воспроизводим звук утопления
        if (!this.drownSoundPlayed) {  // проверяем, был ли уже проигран звук
            this.drownSound.currentTime = 0; // сбрасываем время воспроизведения звука
            this.drownSound.play();
            this.drownSoundPlayed = true;  // звук проигран
        }

        
        // Остановка игры с задержкой
        setTimeout(() => {            

            this.setGameRunning(false);

            // Сбрасываем счёт после утопления
            this.resetScore();
            

            // Показать текст "Game Over"
            document.getElementById("gameOverText").style.display = "block";

            // Обновить текст кнопки на "Play"
            document.getElementById("playButton").innerText = "Play";
            this.resetPosition();
        }, 1000);
    }
}
