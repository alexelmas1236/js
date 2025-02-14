// --- main.js ---

// Suponiendo que 'ship' es el nombre del sprite del jugador
function create() {
    // Crear el jugador
    player = this.physics.add.sprite(400, 300, 'ship');
    player.setCollideWorldBounds(true);
    player.setDamping(true);
    player.setDrag(0.99);
    player.setAngularDrag(50);
    player.setScale(0.5);
    player.setMass(5);

    // Inicializar la rotación del jugador
    player.rotation = -Math.PI / 2;

    // Agregar controles (cursors) si es necesario
    cursors = this.input.keyboard.addKeys({
        'left': Phaser.Input.Keyboard.KeyCodes.A,
        'right': Phaser.Input.Keyboard.KeyCodes.D,
        'up': Phaser.Input.Keyboard.KeyCodes.W,
        'dodge': Phaser.Input.Keyboard.KeyCodes.SPACE
    });

    // --- Obstáculos ---
    obstacles = this.physics.add.group();
    obstacles.create(200, 400, 'obstacle').setScale(0.8).setCollideWorldBounds(true).setBounce(0.5).setMass(1);
    obstacles.create(500, 250, 'obstacle').setScale(0.5).setCollideWorldBounds(true).setBounce(0.5).setMass(1);
    obstacles.create(650, 500, 'obstacle').setCollideWorldBounds(true).setBounce(0.5).setMass(1);

    this.physics.add.collider(player, obstacles);

    // Emitir evento cuando el jugador esté listo
    this.events.emit('playerDataUpdate', { x: player.x, rotation: player.rotation });
}
