$(document).ready(function () {
  const gameArea = $("#game-area");
  const playerCar = $("#player-car");
  let score = 0;
  let speed = 5;
  let gameInterval;
  let obstacleInterval;

  // Function to move player car
  $(document).on("keydown", function (e) {
    const carPos = playerCar.position();
    switch (e.key) {
      case "ArrowLeft": // Move left
        if (carPos.left > 0) playerCar.css("left", carPos.left - 20);
        break;
      case "ArrowRight": // Move right
        if (carPos.left < gameArea.width() - playerCar.width())
          playerCar.css("left", carPos.left + 20);
        break;
    }
  });

  // Function to create obstacles
  function createObstacle() {
    const obstacle = $('<div class="obstacle"></div>');
    const obstacleLeft = Math.random() * (gameArea.width() - 50); // Random position
    obstacle.css({ top: "-100px", left: obstacleLeft });
    gameArea.append(obstacle);
  }

  // Function to move obstacles
  function moveObstacles() {
    $(".obstacle").each(function () {
      const obstacle = $(this);
      const obstaclePos = obstacle.position();

      // Move obstacle
      obstacle.css("top", obstaclePos.top + speed);

      // Check if off-screen
      if (obstaclePos.top > gameArea.height()) {
        obstacle.remove();
        score += 10; // Increase score
        $("#score").text(score);
      }

      // Collision detection
      if (checkCollision(playerCar, obstacle)) {
        endGame();
      }
    });
  }

  // Collision detection
  function checkCollision(player, obstacle) {
    const p = player.position();
    const o = obstacle.position();
    return !(
      p.top + player.height() < o.top ||
      p.top > o.top + obstacle.height() ||
      p.left + player.width() < o.left ||
      p.left > o.left + obstacle.width()
    );
  }

  // Start Game
  function startGame() {
    score = 0;
    speed = 5;
    $("#score").text(score);
    playerCar.css({ left: "175px", bottom: "20px" }); // Reset position
    $("#game-menu").addClass("hidden"); // Hide menu

    gameInterval = setInterval(() => {
      moveObstacles();
      speed += 0.01; // Gradually increase speed
    }, 30);

    obstacleInterval = setInterval(createObstacle, 1000);
  }

  // End Game
  function endGame() {
    clearInterval(gameInterval);
    clearInterval(obstacleInterval);
    $(".obstacle").remove(); // Clear all obstacles
    $("#play-btn").text("Try Again"); // Show Try Again button
    $("#game-menu").removeClass("hidden"); // Show menu
  }

  // Button Listeners
  $("#play-btn").on("click", function () {
    startGame();
  });
});