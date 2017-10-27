var game = new Phaser.Game(300, 500, Phaser.AUTO, '', { preload: preload, create: create, update: update });
//game.state.add( 'Play', Jumper.Play );
//game.state.start( 'Play' );
function preload(){

game.load.spritesheet('hero','images/dude.png',32,48);
game.load.image('sky','images/sky.png');
game.load.image('pixel','images/pixel.png');

}

function create(){
  game.physics.startSystem(Phaser.Physics.ARCADE);
  this.stage.backgroundColor = '#6bf';
  //game.add.sprite(0,0,'sky');
  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  game.scale.maxWidth = this.game.width;
  game.scale.maxHeight = this.game.height;
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;
  //game.scale.setScreenSize( true );

  game.cameraYMin = 99999;
  game.platformYMin = 99999;

  // create platforms
  platformsCreate();

  // create hero
  heroCreate();

  cursor = game.input.keyboard.createCursorKeys();

}
function update(){
  game.world.setBounds( 0, -game.hero.yChange, game.world.width, game.height + game.hero.yChange );

  // the built in camera follow methods won't work for our needs
  // this is a custom follow style that will not ever move down, it only moves up
  game.cameraYMin = Math.min( game.cameraYMin, game.hero.y - game.height + 130 );
  game.camera.y = game.cameraYMin;

  // hero collisions and movement
  game.physics.arcade.collide( game.hero, game.platforms );
  heroMove();

  // for each plat form, find out which is the highest
  // if one goes below the camera view, then create a new one at a distance from the highest one
  // these are pooled so they are very performant
  platforms.forEachAlive( function( elem ) {
    game.platformYMin = Math.min( game.platformYMin, elem.y );
    if( elem.y > game.camera.y + game.height ) {
      elem.kill();
      platformsCreateOne( game.rnd.integerInRange( 0, this.world.width - 50 ), this.platformYMin - 100, 50 );
    }
  }, game );


}
function platformsCreate(){
  platforms = game.add.group();
  platforms.enableBody = true;
  platforms.createMultiple( 10, 'pixel' );

  // create the base platform, with buffer on either side so that the hero doesn't fall through
  platformsCreateOne( -16,game.world.height - 16, game.world.width + 16 );
  // create a batch of platforms that start to move up the level
  for( var i = 0; i < 9; i++ ) {
    platformsCreateOne( game.rnd.integerInRange( 0, game.world.width - 50 ), game.world.height - 100 - 100 * i, 50 );
  }
}
function platformsCreateOne(x,y,width){
  var platform = platforms.getFirstDead();
  platform.reset( x, y );
  platform.scale.x = width;
  platform.scale.y = 16;
  platform.body.immovable = true;
  return platform;
}
function heroCreate(){
  game.hero = game.add.sprite( game.world.centerX, game.world.height - 36, 'hero' );
//  game.hero.anchor.set( 0.5 );
  game.hero.frame=4;
  // track where the hero started and how much the distance has changed from that point
  game.hero.yOrig = game.hero.y;
  game.hero.yChange = 0;

  // hero collision setup
  // disable all collisions except for down
  game.physics.arcade.enable( game.hero );
  game.hero.body.gravity.y = 100;
  game.hero.body.checkCollision.up = false;
  game.hero.body.checkCollision.left = false;
  game.hero.body.checkCollision.right = false;
  game.hero.animations.add('left', [0, 1, 2, 3], 10, true);
  game.hero.animations.add('right', [5, 6, 7, 8], 10, true);
}
function heroMove(){
  if( cursor.left.isDown ) {
    game.hero.body.velocity.x = -200;
    game.hero.animations.play('left');
  } else if( cursor.right.isDown ) {
    game.hero.body.velocity.x = 200;
    game.hero.animations.play('right');
  } else {
    game.hero.body.velocity.x = 0;
    game.hero.frame=4;
  }

  // handle hero jumping
  if( cursor.up.isDown ) {
    game.hero.body.velocity.y = -35;
  }

  // wrap world coordinated so that you can warp from left to right and right to left
  game.world.wrap( game.hero, game.hero.width / 2, false );

  // track the maximum amount that the hero has travelled
  game.hero.yChange = Math.max( game.hero.yChange, Math.abs( game.hero.y - game.hero.yOrig ) );

  // if the hero falls below the camera view, gameover
  //if( game.hero.y > game.cameraYMin + game.height && game.hero.alive ) {
  //  game.state.start( 'Play' );
  //}
}
function shutdown() {
  // reset everything, or the world will be messed up
  game.world.setBounds( 0, 0, this.game.width, this.game.height );
  cursor = null;
  this.hero.destroy();
  this.hero = null;
  this.platforms.destroy();
  this.platforms = null;
}
