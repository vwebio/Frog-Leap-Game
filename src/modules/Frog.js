export class Frog {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.width = 40;
        this.height = 50;
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
        this.jumpPower = -15;
        this.gravity = 0.5;
        this.speed = 5;
        this.isJumping = false;
        this.isDrowned = false;
        this.resetPosition();
    }

    resetPosition() {
        this.x = this.canvas.width / 2 - this.width / 2;
        this.y = this.canvas.height * 0.68 - this.height;
    }

    // Логика рисования лягушки
    draw() {        
        if (this.isDrowned) return; // Не рисовать лягушку, если она утонула

          // Цвет тела, положение на кувшинке и размер
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
              this.x < lilyPad.x + lilyPad.width
            ) {
              // Если все условия выполнены, лягушка находится на кувшинке
              onLilyPad = true;              
              this.y = lilyPad.y - this.height;              
              this.vy = 0;
              // лягушка больше не прыгает
              this.isJumping = false;
            }
          }

          // Если лягушка не на кувшинке и касается болота - она утонет
          if (!onLilyPad && this.y + this.height > canvas.height * 0.7) {
            this.drown();
          }

          // Лягушка не должна выходить за границы экрана
          if (this.x < 0) this.x = 0;
          if (this.x + this.width > canvas.width)
            this.x = canvas.width - this.width;
    }

    // Метод для прыжка
    jump() {        
        // Лягушка может прыгнуть только если она на кувшинке
        if (!this.isJumping) {
            this.vy = this.jumpPower;
            this.isJumping = true;
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
        // Сначала создаем всплеск воды, а затем скрываем лягушку
        createSplash(this.x + this.width / 2, this.y + this.height);

        this.isDrowned = true;
        
        setTimeout(() => {
          
          gameRunning = false; // Стоп игра с задержкой

          // Показать текст - Game Over
          document.getElementById("gameOverText").style.display = "block";

          // Обновляем текст на кнопке c Pause на Play
          document.getElementById("playButton").innerText = `${playText}`;
        }, 1000);
    }
}
