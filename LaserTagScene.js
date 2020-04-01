class LaserTagScene extends Phaser.Scene {

    constructor(){
      super({ key: 'LaserTagScene' })
    }

    init(data){
      gameState.firstRound = data.firstRound;
  
    }
  

    preload() {
      this.load.image('present1', 'Images/present_square_other.png');
      this.load.image('codey', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/Bug+Invaders/codey.png');
      this.load.image('presentRepellent', 'Images/laser.png');
      this.load.image('platform', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/physics/platform.png');

    }
    

    // Helper Methods below:
    // sortedEnemies() returns an array of enemy sprites sorted by their x coordinate
    sortedEnemies(){
      const orderedByXCoord = gameState.enemies.getChildren().sort((a, b) => a.x - b.x);
      return orderedByXCoord;
    }

    // numOfTotalEnemies() returns the number of total enemies 
    numOfTotalEnemies() {
      const totalEnemies = gameState.enemies.getChildren().length;
      return totalEnemies;
    }

      
  create() {

    this.physics.world.setBoundsCollision(true, true, true, false);


    gameState.instructionText = this.add.text(30, 20, 'Click to shoot lasers at the presents.', { fontSize: '15px', fill: '#000000' });
    gameState.complete = false;
    
    const platforms = this.physics.add.staticGroup();
    platforms.create(250, 490, 'platform').setScale(1.3, .3).refreshBody();

    


    // Uses the physics plugin to create Codey
    gameState.player = this.physics.add.sprite(250, 470, 'codey').setScale(.5);

    // Create Collider objects
    gameState.player.setCollideWorldBounds(true);
    
    // Creates cursor objects to be used in update()
    gameState.cursors = this.input.keyboard.createCursorKeys();

    // Add new code below:
    gameState.enemies = this.physics.add.staticGroup();

    gameState.message = "HAVE A GREAT 10TH BIRTHDAY DARREN!".split(" ")
    //gameState.message = "s".split(" ")
    const availableTints = [0xff0000, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff]
    let currentCharacter = ""
    for (let word =0; word < gameState.message.length; word++){
      const wordLength = gameState.message[word].length;
      for (let letter =0; letter < wordLength; letter++){
      currentCharacter = gameState.message[word][letter];

      let xCoord = letter*50 +(550 - (50*wordLength))/2;
      let yCoord = word*50+100;

      const currentPresent = this.add.sprite(xCoord, yCoord, 'present1')
      currentPresent.setTint(availableTints[Math.floor(Math.random()*availableTints.length)])
      currentPresent.character = currentCharacter
      currentPresent.text = this.add.text(xCoord -15, yCoord -15, 10, {fontFamily: 'Candara',fontSize:30, align:"center",color:'#888888', fixedWidth:50, fixedHeight: 50});
      currentPresent.hits = 10; 
      gameState.enemies.add(currentPresent);

      
        
      }
    }




    gameState.shootingX = 0;
    gameState.shootingY = -100; 


    gameState.presentRepellent = this.physics.add.group();
    gameState.shooting = false;
    gameState.shot = 0; 
    gameState.active = 0; 

    const genPresentRepellent= ()=>{
      if (gameState.shooting) {
        gameState.shot ++;
        gameState.active ++;
        const repellent  = gameState.presentRepellent.create(gameState.player.x, gameState.player.y, 'presentRepellent')
        repellent.setVelocityY(gameState.shootingY).setVelocityX(gameState.shootingX).setScale(0.1,0.1)
        repellent.setCollideWorldBounds(true).setBounce(1);
      }
      if (gameState.shot === 10){
        gameState.shooting = false; 
        gameState.shot = 0; 
      }
    }

    gameState.presentRepellentLoop = this.time.addEvent(
          {
        delay: 100,
        callback: genPresentRepellent,
        callbackScope: this,
        loop:true
      }
    )

    this.physics.add.collider(gameState.enemies, gameState.presentRepellent, (present, repellent)=>{
      present.hits --; 
      if (present.hits == 0){
        present.text.setText(present.character);
        present.text.setSize(50);

        present.destroy();
      }else{
        present.text.setText(present.hits)
      }

    });

    this.physics.add.collider(gameState.presentRepellent, platforms, (repellent,platform)=>{
      gameState.active --;

      repellent.destroy();
    })

    this.input.on('pointerup',(pointer)=>{
      if (gameState.complete){

        this.scene.stop('LaserTagScene');
        this.scene.start('EndScene')


      }else if (gameState.active == 0){
        let deltaY = pointer.y -  gameState.player.y;
        let deltaX = pointer.x - gameState.player.x;
        let speedAdjustment = 400/Math.pow(Math.pow(deltaX,2)+Math.pow(deltaY,2),0.5)


 

        gameState.shootingX = deltaX *speedAdjustment;
        gameState.shootingY = deltaY *speedAdjustment; 
        gameState.shooting = true;
      }
    })


  }

  update() {





  
      // Add logic for winning condition and enemy movements below:

      if (this.numOfTotalEnemies() === 0 && gameState.active === 0){
        gameState.complete = true; 
        this.physics.pause();

  
        gameState.instructionText.setText("Congratulations! Click to continue")      
      }
        
    
  }
  

}
