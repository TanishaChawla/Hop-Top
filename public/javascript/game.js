var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
function preload(){
  game.load.image('cloud','images/cloud-hi.png');
  game.load.spritesheet('balloon','images/balloon.png',40,40);

}
function create(){
  game.add.sprite(10,10,'cloud');
}
function update(){

}
