class EndScene extends Phaser.Scene {
	constructor() {
		super({ key: 'EndScene' })
	}

	preload(){
		this.load.image('balloon', 'Images/balloons.png');//Image by <a href="https://pixabay.com/users/maciej326-1771256/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1902845">Maciej Szewczyk</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1902845">Pixabay</a>
		this.load.image('present', 'Images/present_square_other.png');
		this.load.image('party_hat', 'Images/green_party_hat.png');
		this.load.image('present_tall', 'Images/present_tall.jpg');
	}

	create() {
    this.add.text( 10, 100, 
			"You did it!\n  You completed all of the games.\n  If you want to try any of them again \nclick on the image of them below.", {fill: '#000000', fontSize: '20px', align:'center'})

			const balloon = this.add.sprite(50, 250, 'balloon').setScale(0.05);
			balloon.setInteractive();
			balloon.on('pointerup', ()=>{
				this.scene.stop('EndScene')
				this.scene.start('BalloonCatchScene',{firstRound:false});
			})


			const memory = this.add.rectangle(150, 250, 50,50, 0xffff00);
			memory.setInteractive();
			memory.on('pointerup', ()=>{
				this.scene.stop('EndScene')
				this.scene.start('MemoryScene',{firstRound:false});
			})
			
			const partyHat = this.add.sprite(250, 250, 'party_hat').setScale(0.05);
			partyHat.setInteractive();
			partyHat.on('pointerup', ()=>{
				this.scene.stop('EndScene')
				this.scene.start('PartyHatPushScene',{firstRound:false});
			})

			const maze = this.add.sprite(350, 250, 'present_tall');
			maze.setInteractive();
			maze.on('pointerup', ()=>{
				this.scene.stop('EndScene')
				this.scene.start('PresentMazeScene', {firstRound:false});
			})
			
			const laser = this.add.sprite(450, 250, 'present');
			laser.setInteractive();
			laser.on('pointerup', ()=>{
				this.scene.stop('EndScene')
				this.scene.start('LaserTagScene',{firstRound:false});
			})

			


	}
}
