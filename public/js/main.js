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
    game.physics.startSystem(Phaser.Physics.ARCADE);
	

    //  A simple background for our game
    game.add.sprite(0, 0, 'grid');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();
	lines = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;
	lines.enableBody = true;
	

    // Here we create the ground.
    var borderTop = platforms.create(0, -3, 'topBorder');
    borderTop.body.immovable = true;
	
	var borderBottom = platforms.create(0, 584, 'bottomBorder');
    borderBottom.body.immovable = true;
	
	var borderLeft = platforms.create(-3, 0, 'leftBorder');
    borderLeft.body.immovable = true;
	
	var borderRight = platforms.create(1164, 0, 'rightBorder');
    borderRight.body.immovable = true;	
	
	
	player = game.add.sprite(game.world.centerX, game.world.centerY, 'motoVerte');
	player.anchor.setTo(0.5, 0.5);	

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);
	
	player.body.drag.set(100);
    player.body.maxVelocity.set(100);

    //  Player physics properties. Give the little guy a slight bounce.
    /*player.body.bounce.y = 0.3;
    player.body.gravity.y = 400;*/
    player.body.collideWorldBounds = true;
	
	cursors = game.input.keyboard.createCursorKeys();
	spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);
	game.input.onDown.add(startMoto, this);

}

function update() {
	
	var hitPlatform = game.physics.arcade.collide(player, platforms);	
	
	if(spaceKey.isDown){		
		var line = lines.create(player.body.x+23,player.body.y+7,'greenLine');
		line.body.immovable = true;				
	}
	//var hitLine = game.physics.arcade.collide(player, lines);
	
	moveMoto(player);
	
	if(hitPlatform){
		player.animations.stop();
		player.body.velocity.x = 0;
		player.body.velocity.y=0;
		
		console.log("coucou");
	}
    	
}


function moveMoto(player){   
	if(movingMoto)game.physics.arcade.velocityFromAngle(player.angle, -100, player.body.velocity);
	if (cursors.left.isDown)
	{
		player.body.angularVelocity = -150;
	}
	else if (cursors.right.isDown)
	{
		player.body.angularVelocity = 150;
	}
	
	else {
		player.body.angularVelocity = 0;
	}
}

function startMoto(){
	if (!movingMoto){
		movingMoto= true;
		game.physics.arcade.velocityFromAngle(player.angle, -100, player.body.velocity);
		console.log("nique ta mere");
	}
}

