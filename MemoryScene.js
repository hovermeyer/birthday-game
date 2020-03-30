class MemoryScene extends Phaser.Scene {
	constructor(){
		super({ key: 'MemoryScene' })
	}

	preload() {
		this.load.image('balloon', 'Images/balloons.png');//Image by <a href="https://pixabay.com/users/maciej326-1771256/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1902845">Maciej Szewczyk</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1902845">Pixabay</a>
		this.load.image('codey', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/physics/codey.png');
	}


	create() {
		gameState.player = this.physics.add.sprite(250, 250, 'codey').setScale(.5);
		gameState.instructionText = this.add.text(30, 20, 'Remember the pattern! Get a 10 item streak!', { fontSize: '15px', fill: '#000000' });

		gameState.order = Array.from({length: 10}, () => Math.floor(Math.random() * 4));


		gameState.highlight = new Array(4);
		gameState.highlight[0] = this.add.rectangle(125, 125, 175, 175, 0xaaaa00).setVisible(false);
		gameState.highlight[1] = this.add.rectangle(375, 125, 175, 175, 0xaa0000).setVisible(false);
		gameState.highlight[2] = this.add.rectangle(125, 375, 175, 175, 0x00aa00).setVisible(false);
		gameState.highlight[3] = this.add.rectangle(375, 375, 175, 175, 0x0000aa).setVisible(false);


		gameState.rectangles = new Array(4);

		gameState.rectangles[0] = this.add.rectangle(125, 125, 150, 150, 0xffff00);
		gameState.rectangles[1] = this.add.rectangle(375, 125, 150, 150, 0xff0000);
		gameState.rectangles[2] = this.add.rectangle(125, 375, 150, 150, 0x00ff00);
		gameState.rectangles[3] = this.add.rectangle(375, 375, 150, 150, 0x0000ff);


		for (let i = 0; i<4; i ++){

		gameState.rectangles[i].setInteractive();
		gameState.rectangles[i].on('pointerup',()=>{
			if (gameState.condition === 'active'){
				gameState.highlight[i].setVisible(true);
				setTimeout(()=>{gameState.highlight[i].setVisible(false)},250)
				if (gameState.order[gameState.currentRectangle] === i) {
					gameState.currentRectangle ++;
					if (gameState.currentRectangle > gameState.currentStreak){
						gameState.condition = "example";
						gameState.currentRectangle = 0; 
						gameState.currentStreak ++; 
					}
				}else{
					//failed
					gameState.condition = "example";
					gameState.currentRectangle = 0; 
					this.cameras.main.shake(240,.01, false);
				}
				gameState.scoreText.setText('Current Streak: ' + gameState.currentStreak)
			}
		})
	}




		gameState.currentStreak = 0; 
		gameState.currentRectangle = 0; 
		gameState.hide = false;



		gameState.scoreText = this.add.text(175, 485, 'Current Streak: ' + gameState.currentStreak, { fontSize: '15px', fill: '#000000' });

		gameState.condition = "example";

		gameState.moves0 = this.tweens.add(
      {targets:[gameState.highlight[0],gameState.highlight[1],gameState.highlight[2],gameState.highlight[3]],
			width:200,
			height:200,
      ease:'Linear',
      duration:200,
      repeat:0,
			yoyo:true, 
			onComplete:this.nextRectangle }
		);


	}


	highlightRectangles(){
		gameState.timer = setInterval(this.highlightRectangle,500)
	}

	highlightRectangle() {

		if (gameState.hide){
			gameState.highlight[0].setVisible(false);
			gameState.highlight[1].setVisible(false);
			gameState.highlight[2].setVisible(false);
			gameState.highlight[3].setVisible(false);
			gameState.hide = false; 
		}else if (gameState.currentRectangle <= gameState.currentStreak){
			gameState.hide = true;
			gameState.highlight[gameState.order[gameState.currentRectangle]].setVisible(true);
			gameState.currentRectangle += 1;
		}else{
			gameState.currentRectangle = 0;
			gameState.condition = "active";
			clearTimeout(gameState.timer)
			gameState.hide = false;
		}

	}

	update() {

		if (gameState.currentStreak === 10){
			gameState.instructionText.setText("Congratulations! Click for next quest.");
			this.input.on('pointerdown', () => {
				gameState.score = 0; 
				this.scene.stop('MemoryScene')
				this.scene.start('PartyPushScene');
			})

		}else if (gameState.condition === "example"){
			gameState.condition = "showing example";
			this.highlightRectangles()
		}


	}
}
