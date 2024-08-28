export class Fly {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.width = 10;
        this.height = 10;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * (canvas.height - 200);
        this.vx = (Math.random() - 0.5) * 5;
        this.vy = (Math.random() - 0.5) * 5;
    }

    // Рисования мошки
    draw() {        
        // Тело
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Крылья
        ctx.fillStyle = "white";
        const wingOffset = Math.sin(Date.now() / 100) * 2; // Анимация взмахов крыльев
        ctx.fillRect(this.x - wingOffset, this.y - 5, 5, 10);
        ctx.fillRect(this.x + this.width + wingOffset, this.y - 5, 5, 10);
    }

    // Обновления позиции мошки
    update() {        
        this.x += this.vx;
          this.y += this.vy;

          // Если мошка касается краев экрана, меняем направление
          if (this.x < 0 || this.x + this.width > canvas.width) this.vx *= -1;
          if (this.y < 0 || this.y + this.height > canvas.height - 100)
            this.vy *= -1;
    }
}
