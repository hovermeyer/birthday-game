class StartScene extends Phaser.Scene {
	constructor() {
		super({ key: 'StartScene' })
	}

	create() {
    this.add.text( 30, 100, 
      "Happy 10th Birthday Darren :) \n Help us make today a great birthday. \n Click to start!", {fill: '#000000', fontSize: '20px', align:'center'})
		this.input.on('pointerdown', () => {
			this.scene.stop('StartScene')
			this.scene.start('BalloonCatchScene');//Replace with Balloon Catch Scene
		})
	}
}
