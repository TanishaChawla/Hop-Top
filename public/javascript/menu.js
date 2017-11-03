var Play = {preload:preload,create:create,update:update};
var game = new Phaser.Game(372 , 620, Phaser.AUTO, '');
game.state.add( 'Play', Play );
game.state.start('Play');
function preload(){

game.load.spritesheet('hero','images/boy-final.png',640,960);
game.load.spritesheet('balloon','images/balloon.png',640,960);
game.load.image('icon','images/icon.png');

}
function create(){
  game.physics.startSystem(Phaser.Physics.ARCADE);
  this.stage.backgroundColor = '#2a2929';
  //game.add.sprite(0,0,'sky');
  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  game.scale.maxWidth = this.game.width;
  game.scale.maxHeight = this.game.height;
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;
  //game.scale.setScreenSize( true );

  game.cameraYMin = 99999;
  game.platformYMin = 99999;

  var i = game.add.sprite(61,80,'icon');
  i.width = 250;
  i.height = 250;
  game.add.text(90,350 ,'Please select your player!',{ fontSize: '16px', fill: '#fff' });
  var b = game.add.button(100, 380,'hero',playHero,game);
  b.width = 64;
  b.frame=4;
  b.height = 96;
  var ballo = game.add.button(208,380,'balloon',playBalloon,game);
  ballo.width = 64;
  ballo.frame = 4;
  ballo.height = 96;
}
function update(){


  }
function playHero(){
  window.open("/hero","_self");
}
function playBalloon(){
  window.open('/balloon','_self');
}
