var Play = {preload:preload,create:create,update:update};
var game = new Phaser.Game(372 , 620, Phaser.AUTO, '');
game.state.add( 'Play', Play );
game.state.start('Play');
function preload(){

game.load.spritesheet('hero','images/dude.png',32,48);
game.load.image('sky','images/sky.png');
game.load.image('pixel','images/pixel.png');
game.load.image('ground','images/pixel.png');
game.load.image('star','images/star.png',24,24);
game.load.image('play','images/play.png',32,32);
game.load.image('cloud','images/cloud.png',45,45);
game.load.image('nextarrow','images/next.png',24,24);
}
function create(){
  game.physics.startSystem(Phaser.Physics.ARCADE);
  this.stage.backgroundColor = '#FFFACD';
  //game.add.sprite(0,0,'sky');
  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  game.scale.maxWidth = this.game.width;
  game.scale.maxHeight = this.game.height;
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;
  //game.scale.setScreenSize( true );

  game.cameraYMin = 99999;
  game.platformYMin = 99999;
  platforms = platformsCreate();


  game.add.text(100, 100,'Hop-Top',{ fontSize: '40px', fill: '#000000' });
  var b = game.add.button(90, 380,'play',playbtn,game);
}
function update(){


  }
function playbtn(){
  window.open("/level1","_self");
}
function platformsCreate(){
  clouds = game.add.group();
  platforms = game.add.group();
  stars = game.add.group();

  platforms.enableBody = true;
  stars.enableBody = true;
  clouds.enableBody = true;
  platforms.createMultiple( 4, 'pixel' );
  var ground = platformsCreateOne( -16,game.world.height - 6,6, game.world.width + 16 );
  ground.body.immovable = true;
  var left = platformsCreateOne(0,0, game.world.height + 16,6 );
  left.body.immovable = true;
  var right = platformsCreateOne( game.world.width-6,0, game.world.height + 16,6 );
  right.body.immovable = true;
  var top = platformsCreateOne( -16,0,6, game.world.width + 16 );
  top.body.immovable = true;
  return platforms;
}
function platformsCreateOne(x,y,height,width){
  var platform = platforms.getFirstDead();
  platform.reset( x, y );
  platform.scale.x = width;
  platform.scale.y = height;
  platform.body.immovable = true;
  //var v = Math.random();
  //if(v>=0.1){
    var cloud = clouds.create(0+Math.random()*200,0+Math.random()*300,'cloud');
    cloud.body.immovable = true;
//  }
  //var v=Math.random();
//  if(v>=0.1){
    var cloud = clouds.create(372-Math.random()*200,620-Math.random()*300,'cloud');
    cloud.body.immovable=true;
//  }

  return platform;
}
