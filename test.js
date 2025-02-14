// --- test.js ---
window.addEventListener('load', () => {
    console.log("test.js cargado");

    // Esperar hasta que la escena esté completamente cargada
    const scene = game.scene.scenes[0]; // Suponemos que el jugador está en la primera escena

    // Escuchar el evento playerDataUpdate
    scene.events.on('playerDataUpdate', (data) => {
        // Mostrar los valores del jugador con números enteros
        console.log(`X: ${Math.floor(data.x)}, Rot: ${Math.floor(data.rotation)}, Score: ${gameState.score}`);
    });
});