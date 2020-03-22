class PartyHatPushScene extends Phaser.Scene {
	constructor(){
		super({ key: 'PartyHatPushScene' })
	}

	preload() {
		this.load.image('party_hat', 'Images/green_party_hat.png');

		this.load.image('table', 'Images/table.jpg');
		this.load.image('codey', 'https://s3.amazonsaws.com/codecademy-content/courses/learn-phaser/physics/codey.png');
	}


	create() {

		const platforms = this.physics.add.staticGroup();

		platforms.create(250,250,'table').setScale(0.1).refreshBody();
		gameState.player = this.physics.add.sprite(10, 10, 'codey').setScale(.5);
		gameState.instructionText = this.add.text(30, 20, 'Get All 10 party hats onto the table.', { fontSize: '15px', fill: '#000000' });


		gameState.scoreText = this.add.text(175, 485, 'Party Hats Gathered', { fontSize: '15px', fill: '#000000' });




		gameState.cursors = this.input.keyboard.createCursorKeys();

		const partyHatOptions = ['party_hat_1','party_hat_2','party_hat_3'];
		gameState.partyHats = this.physics.add.group();

		const partyHatGen = () => {
			const xCoord = Math.random() * 100 + Math.round(Math.random())*360 + 20
			const yCoord = Math.random() * 100 + Math.round(Math.random())*360 + 20
			
			gameState.partyHats.create(xCoord, yCoord, 'party_hat').setScale(0.03).setDrag(0.8);
		}

		const partyHatGenLoop = this.time.addEvent({
			delay: 10,
			callback: partyHatGen,
			callbackScope: this,
			repeat:9
		});



		this.physics.add.collider(platforms, gameState.partyHats, (platform, partyHat) => {
			partyHat.setImmovable();
			partyHat.setVelocityX(0);
			partyHat.setVelocityY(0);


			partyHat.x = (gameState.score % 5) * 50 + 150
			partyHat.y = Math.floor(gameState.score /5) * 140 + 180;

			gameState.score += 1; 



			gameState.scoreText.setText(`Party Hats Gathered: ${gameState.score}`);

			if (gameState.score ===10){
				this.physics.pause();
				gameState.instructionText.setText("Congratulations - click to begin the next quest")

				this.input.on('pointerdown', () => {
					gameState.score = 0; 
					this.scene.stop('PartyHatPushScene')
					this.scene.start('StartScene');
				})


			}
		});

		this.physics.add.collider(gameState.player, gameState.partyHats);
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

		
		gameState.partyHats.getChildren().forEach(hat => {
			if (hat.x <0){
				hat.x =500;
			}
			if (hat.x >500){
				hat.x = 0; 
			}

			if (hat.y <0){
				hat.y = 500;
			}
			if (hat.y > 500){
				hat.y = 0; 
			}
		})

		if (gameState.player.x < 0){
			gameState.player.x =500;
		}
		if (gameState.player.x >500){
			gameState.player.x = 0; 
		}

		if (gameState.player.y <0){
			gameState.player.y = 500;
		}
		if (gameState.player.y > 500){
			gameState.player.y = 0; 
		}
		

	}
}
