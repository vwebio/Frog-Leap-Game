// Фон
export function drawBackground(ctx, canvas) {    
    // Небо
    ctx.fillStyle = "#87ceeb";
    ctx.fillRect(0, 0, canvas.width, canvas.height * 0.7);

    // Болото с градиентом
    const gradient = ctx.createLinearGradient(
      0,
      canvas.height * 0.7,
      0,
      canvas.height
    );
    gradient.addColorStop(0, "darkgreen");
    gradient.addColorStop(1, "black");
  
    ctx.fillStyle = gradient;
    ctx.fillRect(0, canvas.height * 0.7, canvas.width, canvas.height * 0.3);

    // Камыши
    for (let i = 0; i < canvas.width; i += 85) {
      ctx.fillStyle = "#556B2F";
      ctx.fillRect(i, canvas.height * 0.7 - 60, 6, 60); // Стебель
      ctx.fillStyle = "#8B4513";
      ctx.fillRect(i, canvas.height * 0.7 - 76, 6, 25); // Верхушка
    }

    // Солнце
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(canvas.width - 100, 100, 50, 0, Math.PI * 2);
    ctx.fill();

    // Облако слева
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(150, 100, 40, 0, Math.PI * 2);
    ctx.arc(200, 100, 50, 0, Math.PI * 2);
    ctx.arc(250, 100, 40, 0, Math.PI * 2);
    ctx.fill();

    // Облако справа
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(450, 150, 40, 0, Math.PI * 2);
    ctx.arc(500, 150, 50, 0, Math.PI * 2);
    ctx.arc(550, 150, 40, 0, Math.PI * 2);
    ctx.fill();
}

// Кувшинки
export const lilyPads = [
    { x: 150, y: 400, width: 100, height: 20 },
    { x: 350, y: 400, width: 100, height: 20 },
    { x: 550, y: 400, width: 100, height: 20 },
  ];
  export function drawLilyPads(ctx) {
    ctx.fillStyle = "#00ca33";
        lilyPads.forEach((lilyPad) => {
          ctx.fillRect(lilyPad.x, lilyPad.y, lilyPad.width, lilyPad.height);
        });
}

// Счёт - Score
export function drawScore(ctx, score) {
    ctx.fillStyle = "white";
        ctx.font = "20px sans-serif";
        // Заголовок Score, число 0, расположение на экране
        ctx.fillText(`Score: ${score}`, 10, 30); 
}

// Проверка на столкновение лягушки и мошки
export function detectCollision(frog, fly) {
    return (
        frog.x < fly.x + fly.width &&
        frog.x + frog.width > fly.x &&
        frog.y < fly.y + fly.height &&
        frog.height + frog.y > fly.y
      );
}

// Обновление игры
export function update(ctx, frog, flies, score, gameRunning) {
    if (gameRunning) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBackground();
        drawLilyPads();
        frog.update();
        frog.draw();
        flies.forEach((fly) => {
          fly.update();
          fly.draw();
          if (detectCollision(frog, fly)) {
            score++;
            fly.x = Math.random() * canvas.width;
            fly.y = Math.random() * (canvas.height - 200);
          }
        });
        drawScore();

        // Обновляем и рисуем всплески
        splashes = splashes.filter((splash) => splash.alpha > 0);
        splashes.forEach((splash) => {
          splash.update();
          splash.draw();
        });
      }
      requestAnimationFrame(update);
}
