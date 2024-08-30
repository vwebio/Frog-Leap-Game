export class Fly {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.width = 10;
        this.height = 10;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * (canvas.height - 200); // Летают в верхней части экрана
        this.speedX = (Math.random() - 0.5) * 5; // Случайное горизонтальное движение
        this.speedY = (Math.random() - 0.5) * 5; // Случайное вертикальное движение
    }

    // Мошка
    draw() {
        // Тело
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(this.x, this.y, this.width, this.height);

        // Крылья
        this.ctx.fillStyle = "white";
        const wingOffset = Math.sin(Date.now() / 100) * 2; // Анимация взмахов крыльев
        this.ctx.fillRect(this.x - wingOffset, this.y - 5, 5, 10);
        this.ctx.fillRect(this.x + this.width + wingOffset, this.y - 5, 5, 10);
    }

    // Обновление позиции мошки
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Проверка границ экрана
        if (this.x < 0 || this.x + this.width > this.canvas.width) {
            this.speedX *= -1; // Отражение от стены
        }
        if (this.y < 0 || this.y + this.height > this.canvas.height * 0.7) { // Летают только в верхней части экрана
            this.speedY *= -1; // Отражение от стены
        }
    }
}
