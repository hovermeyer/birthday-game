class StartScene extends Phaser.Scene {
	constructor() {
		super({ key: 'StartScene' })
	}

	create() {
		gameState.firstRound = true; 
    this.add.text( 30, 100, 
			"We are trying to have a party. \n We need your help! \n Complete quests to get what we need. \n Click to start!", {fill: '#000000', fontSize: '20px', align:'center'})
		this.input.on('pointerup', () => {
			this.scene.stop('StartScene')
			this.scene.start('BalloonCatchScene',{firstRound:true});
		})
	}
}
