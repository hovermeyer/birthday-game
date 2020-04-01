class BalloonCatchScene extends Phaser.Scene {
	constructor(){
		super({ key: 'BalloonCatchScene' })
	}

	init(data){
		gameState.firstRound = data.firstRound;

	}

	preload() {
		this.load.image('balloon', 'Images/balloons.png');//Image by <a href="https://pixabay.com/users/maciej326-1771256/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1902845">Maciej Szewczyk</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1902845">Pixabay</a>
		this.load.image('platform', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/physics/platform.png');
		this.load.image('codey', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/physics/codey.png');
	}


	create() {
		gameState.player = this.physics.add.sprite(250, 250, 'codey').setScale(.5);
		gameState.instructionText = this.add.text(30, 20, 'Collect 10 bunches of balloons for every year!', { fontSize: '15px', fill: '#000000' });


		gameState.scoreText = this.add.text(175, 485, 'Balloons Gathered', { fontSize: '15px', fill: '#000000' });

		gameState.player.setCollideWorldBounds(true);


		gameState.cursors = this.input.keyboard.createCursorKeys();

		const balloons = this.physics.add.group();

		const balloonGen = () => {
			const xCoord = Math.random() * 640
			const yCoord = Math.random() * 640
			const xVelocity = Math.random() * 100 -50;
			const yVelocity = Math.random() * 100 -50;
			balloons.create(xCoord, yCoord, 'balloon').setScale(0.03).setCollideWorldBounds(true).setBounce(1.2).setVelocityX(xVelocity).setVelocityY(yVelocity);
		}

		const balloonGenLoop = this.time.addEvent({
			delay: 150,
			callback: balloonGen,
			callbackScope: this,
			repeat:99
		});



		this.physics.add.collider(gameState.player, balloons, (player, balloon) => {
			balloon.destroy();
			gameState.score += 1; 
			gameState.scoreText.setText(`Balloons Gathered: ${gameState.score}`);

			if (gameState.score ===100){ 
				this.physics.pause();
				gameState.instructionText.setText("Congratulations - click to begin the next quest")

				this.input.on('pointerup', () => {
					gameState.score = 0; 
					this.scene.stop('BalloonCatchScene')
					if (gameState.firstRound){
						this.scene.start('MemoryScene',{firstRound:true});
					}else{
						this.scene.start('EndScene')
					}
				})


			}
		});
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
