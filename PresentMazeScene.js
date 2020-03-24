class PresentMazeScene extends Phaser.Scene {
	constructor(){
		super({ key: 'PresentMazeScene' })
	}

	preload() {
		this.load.image('v', 'Images/present_tall.jpg');
		this.load.image('h', 'Images/present_wide.png');
		this.load.image('codey', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/physics/codey.png');
	}


	create() {
		gameState.player = this.physics.add.sprite(450, 0, 'codey').setScale(.3);
		gameState.instructionText = this.add.text(20, 5, 'Find your way through the maze of presents!', { fontSize: '15px', fill: '#000000' });



		gameState.player.setCollideWorldBounds(true);


		gameState.cursors = this.input.keyboard.createCursorKeys();

		gameState.presents = this.physics.add.group();

		gameState.positions = [
			
		//left line
		{x:1, y:2, type:'v'},{x:1, y:4, type:'v'},{x:1, y:6, type:'v'},
		{x:1, y:8, type:'v'},{x:1, y:10, type:'v'},{x:1, y:12, type:'v'},
		{x:1, y:14, type:'v'},{x:1, y:16, type:'v'},

		//bottom line
		{x:1, y:18, type:'h'},{x:3, y:18, type:'h'},{x:5, y:18, type:'h'},
		{x:7, y:18, type:'h'},{x:9, y:18, type:'h'},{x:11, y:18, type:'h'},
		{x:13, y:18, type:'h'},{x:15, y:18, type:'h'},{x:17, y:18, type:'h'},

		//top line
		{x:2, y:0, type:'h'},{x:4, y:0, type:'h'},{x:6, y:0, type:'h'},
		{x:8, y:0, type:'h'},{x:10, y:0, type:'h'},{x:12, y:0, type:'h'},
		{x:14, y:0, type:'h'},{x:16, y:0, type:'h'},{x:18, y:0, type:'h'},{x:20, y:0, type:'h'},
		//right line
		{x:21, y:1, type:'v'},{x:21, y:3, type:'v'},{x:21, y:5, type:'v'},
		{x:21, y:7, type:'v'},{x:21, y:9, type:'v'},{x:21, y:11, type:'v'},
		{x:21, y:13, type:'v'},{x:21, y:15, type:'v'}, {x:21, y:17, type:'v'},

		//inside contents sorted by column ( x position)
		{x:2, y:4, type:'h'}, {x:2, y:6, type:'h'},{x:2, y:10, type:'h'},{x:2, y:16, type:'h'},

		{x:3, y:1, type:'v'},{x:3, y:8, type:'h'},{x:3, y:11, type:'v'},{x:3, y:14, type:'h'},

		{x:5, y:1, type:'v'},{x:5, y:4, type:'h'},{x:5, y:6, type:'h'},{x:5, y:7, type:'v'},{x:5, y:9, type:'v'},
		{x:5, y:12, type:'v'},{x:5, y:14, type:'v'},{x:5, y:16, type:'h'},

		{x:6, y:8, type:'h'},{x:6, y:12, type:'h'},
		
		{x:7, y:2, type:'v'}, {x:7, y:4, type:'h'},{x:7, y:6, type:'h'},{x:7, y:10, type:'h'},{x:7, y:14, type:'h'},

		{x:9, y:1, type:'v'},{x:9, y:3, type:'v'},{x:9, y:6, type:'v'},{x:9, y:8, type:'h'},{x:9, y:9, type:'v'},
		{x:9, y:11, type:'v'},{x:9, y:13, type:'v'},{x:9, y:16, type:'v'},

		{x:10, y:12, type:'h'},
		
		{x:11, y:2, type:'v'},{x:11, y:4, type:'v'},{x:11, y:6, type:'h'},{x:11, y:8, type:'v'},
		{x:11, y:10, type:'h'},{x:11, y:14, type:'v'},{x:11, y:16, type:'h'},

		{x:12, y:12, type:'h'},
		
		{x:13, y:1, type:'v'},{x:13, y:3, type:'v'},{x:13, y:6, type:'h'},{x:13, y:7, type:'v'},
		{x:13, y:10, type:'h'},{x:13, y:13, type:'v'},{x:13, y:15, type:'v'},

		{x:14, y:4, type:'h'},
		
		{x:15, y:2, type:'h'},{x:15, y:6, type:'h'},{x:15, y:8, type:'v'},
		{x:15, y:10, type:'v'},{x:15, y:12, type:'h'},{x:15, y:14, type:'h'},	{x:15, y:16, type:'v'},

		{x:17, y:2, type:'v'},{x:17, y:4, type:'v'},{x:17, y:6, type:'v'},
		{x:17, y:8, type:'h'},{x:17, y:9, type:'v'},{x:17, y:12, type:'h'},	{x:17, y:14, type:'v'},{x:17, y:16, type:'h'},

		{x:19, y:1, type:'v'},{x:19, y:3, type:'v'},{x:19, y:5, type:'v'},
		{x:19, y:8, type:'h'},{x:19, y:10, type:'v'},{x:19, y:12, type:'v'},	{x:19, y:14, type:'v'},{x:19, y:16, type:'h'}

	];

		gameState.positions.forEach(position=> {
				let present = gameState.presents.create(position.x*25 - 37, position.y*25+25, position.type).setOrigin(0,0).setScale(0.5,0.5);
				present.setImmovable(true);
		}
		)

	this.physics.add.collider(gameState.player, gameState.presents);

	}


	update() {
		


		if (gameState.cursors.left.isDown) {
			gameState.player.setVelocityX(-160);
		} else if (gameState.cursors.right.isDown) {
			gameState.player.setVelocityX(160);
		} else {
			gameState.player.setVelocityX(0);
		}

		if (gameState.cursors.up.isDown) {
			gameState.player.setVelocityY(-160);
		} else if (gameState.cursors.down.isDown) {
			gameState.player.setVelocityY(160);
		} else {
			gameState.player.setVelocityY(0);
		}

		if (gameState.player.y >= 480){
			gameState.score = 0; 
			this.scene.stop('PresentMazeScene')
			this.scene.start('StartScene');
		}

	}
}
