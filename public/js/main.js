var game = new Phaser.Game(1179, 600, Phaser.AUTO, 'gameDiv', { preload: preload, create: create, update: update });
var platforms;
var lines;
var score = 0;
var scoreText;
var spaceKey;
var movingMoto = false;


function preload() {
	
	game.load.image('grid', 'img/grid1.png');
    game.load.image('topBorder', 'img/topBorder.png')
	game.load.image('rightBorder', 'img/rightBorder.png')
	game.load.image('bottomBorder', 'img/bottomBorder.png')
	game.load.image('leftBorder', 'img/leftBorder.png')
	game.load.image('greenLine', 'img/greenLine.png');
	game.load.image('motoVerte', 'img/motoJaune.png');
}

function create() {
	
	//  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.P2JS);
	

    //  A simple background for our game
    game.add.sprite(0, 0, 'grid');

//    //  The platforms group contains the ground and the 2 ledges we can jump on
	platforms = game.add.group();
	lines = game.add.group();	

    // Here we create the ground.
    var borderTop = platforms.create(590, 6, 'topBorder');    
	
	var borderBottom = platforms.create(590, 593, 'bottomBorder');
	
	var borderLeft = platforms.create(6, 290, 'leftBorder');
	
	var borderRight = platforms.create(1172, 290, 'rightBorder');
	
	game.physics.p2.enable([platforms]);
//	
	borderBottom.body.static= true;
	borderLeft.body.static= true;
	borderRight.body.static= true;
	borderTop.body.static= true;
	 
	player = game.add.sprite(game.world.centerX, game.world.centerY, 'motoVerte');	

    //  We need to enable physics on the player
    game.physics.p2.enable(player);
	
//	player.body.drag.set(100);
//    player.body.maxVelocity.set(100);

    //  Player physics properties. Give the little guy a slight bounce.
    /*player.body.bounce.y = 0.3;
    player.body.gravity.y = 400;*/
//    player.body.collideWorldBounds = true;
//	
	cursors = game.input.keyboard.createCursorKeys();
	spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);
	game.input.onDown.add(startMoto, this);

}

function update() {
	
//	game.physics.p2.enable([lines]);	
	
	if(spaceKey.isDown & movingMoto){		
		var line = lines.create(player.x,player.y,'greenLine');
		//line.body.static = true;				
	}
	//var hitLine = game.physics.arcade.collide(player, lines);
	
	moveMoto(player);
	
//	if(hitPlatform){
//		player.animations.stop();
//		player.body.velocity.x = 0;
//		player.body.velocity.y=0;
//		
//		console.log("coucou");
//	}
    	
}


function moveMoto(player){   
	if(movingMoto)player.body.moveForward(90);
	else {
		player.body.velocity.x = 0;
		player.body.velocity.y = 0; 
	}
	if (cursors.left.isDown)player.body.rotateLeft(60);
	
	
	else if (cursors.right.isDown)player.body.rotateRight(60);
	
	else player.body.setZeroRotation();
}

function startMoto(){
	if (!movingMoto){
		movingMoto= true;
		player.body.moveForward(100);
		console.log("nique ta mere");
	}
}

