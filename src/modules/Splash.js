export class Splash {
    // Конструктор класса Splash
    constructor(x, y) {
        this.x = x;
        this.y = y;
        // размер всплеска (случайное значение от 2 до 7)
        this.size = Math.random() * 5 + 2;
        // направление падения       
        this.vx = (Math.random() - 0.5) * 4;
        this.vy = Math.random() * -2 - 2;
        this.gravity = 0.1;
        this.alpha = 1;
    }

    // Метод обновления всплеска
    update() {
        // обновляем координаты
        this.x += this.vx;
        this.y += this.vy;
        // увеличиваем скорость под действием гравитации
        this.vy += this.gravity;
        this.alpha -= 0.05; 
    }

    draw(ctx) {
        ctx.fillStyle = `rgba(173, 216, 230, ${this.alpha})`;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}

// создаем 4 всплеска
export function createSplash(x, y, splashes) {    
    for (let i = 0; i < 4; i++) {
        splashes.push(new Splash(x, y));
    }
}
