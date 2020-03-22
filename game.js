const gameState = {
	score: 0
};

const config = {
	type: Phaser.AUTO,
	width: 500,
	height: 500,
	backgroundColor: "b9eaff",
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { },
			enableBody: true,
		}
	},
	scene: [StartScene, BalloonCatchScene, MemoryMatchScene]
};

const game = new Phaser.Game(config);

		