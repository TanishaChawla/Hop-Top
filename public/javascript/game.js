var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
function preload(){
  game.load.image('cloud','images/cloud-hi.png');
  game.load.image('balloon','images/balloon.png',40,40);

}
function create(){
  game.add.sprite(0,0,'cloud');
  game.add.sprite(5,5, 'balloon');
}
function update(){

}
