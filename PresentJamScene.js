class PresentJamScene extends Phaser.Scene {
	constructor(){
		super({ key: 'PresentJamScene' })
	}

	preload() {
		this.load.image('vertical', 'Images/present_tall.jpg');
		this.load.image('horizontal', 'Images/present_wide.png');
		this.load.image('codey', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/physics/codey.png');
	}


	create() {
		gameState.player = this.physics.add.sprite(250, 250, 'codey').setScale(.5);
		gameState.instructionText = this.add.text(30, 20, 'Move the presents to get free.', { fontSize: '15px', fill: '#000000' });


		gameState.scoreText = this.add.text(175, 485, 'presents Gathered', { fontSize: '15px', fill: '#000000' });

		gameState.player.setCollideWorldBounds(true);


		gameState.cursors = this.input.keyboard.createCursorKeys();

		gameState.presents = this.physics.add.group();

		gameState.positions = [{x:50,y:50,type:'vertical'},{x:100,y:50,type:'horizontal'},
														{x:200,y:50,type:'horizontal'},{x:50,y:150,type:'vertical'},
														{x:200,y:250,type:'horizontal'},{x:250,y:150,type:'vertical'}];

		gameState.positions.forEach(position=> {
				let present = gameState.presents.create(position.x, position.y, position.type).setOrigin(0,0).setCollideWorldBounds(true).setBounce(0);
				present.setInteractive();
				present.setImmovable(true);
				present.on('pointerup', (pointer, localX, localY)=>{
					gameState.instructionText.setText("up: " + present.body.touching.up + "down: " + present.body.touching.down)
					if (position.type ==='vertical' && localY >= 50){
							present.y += 55; 
							this.physics.collide(present, gameState.presents,(present)=>{
								gameState.instructionText.setText("preventing a move down")
								present.y -=50;
							})
							present.y -=5;
					}else if (position.type ==='vertical' && localY < 50){
						present.y -= 50;
					}else if (position.type ==='horizontal' && localX <= 50){
						present.x -= 50;
					}else if (position.type ==='horizontal' && localX > 50){
						present.x += 50;
					}


				},{present})
		}
			
			)

	this.physics.add.collider(gameState.player, gameState.presents);
	this.physics.add.overlap(gameState.presents)

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

	}
}
