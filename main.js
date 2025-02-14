// --- main.js ---

// Configuración del juego Phaser
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 0 },
          debug: true // Habilitar recuadros de colisiones y flechas de dirección
      }
  },
  scene: {
      preload: preload,
      create: create,
      update: update
  }
};

// Crear el juego Phaser
const game = new Phaser.Game(config);

// Variable global para el estado del juego
var gameState = {
  score: 0
};

function preload() {
  this.load.image('ship', 'assets/ship.png');        // Asegúrate de que la ruta sea correcta
  this.load.image('obstacle', 'assets/obstacle.png'); // Asegúrate de que la ruta sea correcta
}

function create() {
  // Crear el jugador
  player = this.physics.add.sprite(400, 300, 'ship');
  player.setCollideWorldBounds(true);
  player.setDamping(true);
  player.setDrag(0.99);
  player.setAngularDrag(400); // Aumentar la resistencia angular para reducir el giro descontrolado
  player.setScale(0.5);
  player.setMass(5);

  // Inicializar la rotación del jugador
  player.setRotation(-Math.PI / 2);

  // Agregar controles
  cursors = this.input.keyboard.addKeys({
      'left': Phaser.Input.Keyboard.KeyCodes.A,
      'right': Phaser.Input.Keyboard.KeyCodes.D,
      'up': Phaser.Input.Keyboard.KeyCodes.W,
      'down': Phaser.Input.Keyboard.KeyCodes.S
  });

  // Obstáculos
  obstacles = this.physics.add.group({
      angularVelocity: 0 // Inicialmente sin rotación
  });
  obstacles.create(200, 400, 'obstacle').setScale(0.8).setCollideWorldBounds(true).setBounce(0.5).setMass(1);
  obstacles.create(500, 250, 'obstacle').setScale(0.5).setCollideWorldBounds(true).setBounce(0.5).setMass(1);
  obstacles.create(650, 500, 'obstacle').setCollideWorldBounds(true).setBounce(0.5).setMass(1);

  this.physics.add.collider(player, obstacles, handleCollision, null, this);

  // Emitir evento cuando el jugador esté listo
  this.events.emit('playerDataUpdate', { x: player.x, rotation: player.rotation });

  // Actualizar el estado del juego cada segundo
  setInterval(() => {
      gameState.score += 1;
      console.log(`Score: ${gameState.score}`);
      this.events.emit('playerDataUpdate', { x: player.x, rotation: player.rotation });
  }, 1000);
}

function update() {
  // Movimiento del jugador
  player.setAngularVelocity(0); // Detener la rotación si no se presionan las teclas
  player.setAcceleration(0); // Detener la aceleración si no se presionan las teclas

  if (cursors.left.isDown) {
      player.setAngularVelocity(-150);
  } else if (cursors.right.isDown) {
      player.setAngularVelocity(150);
  }

  if (cursors.up.isDown) {
      this.physics.velocityFromRotation(player.rotation, 200, player.body.acceleration);
  }

  // Emitir evento de actualización del jugador
  this.events.emit('playerDataUpdate', { x: player.x, rotation: player.rotation });
}

function handleCollision(player, obstacle) {
  // Rotar el obstáculo cuando colisione con el jugador
  obstacle.setAngularVelocity(100);
}