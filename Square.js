class Square{
    constructor(x,y){
        var options = {
        friction : 1.8,
        restitution: 1,
        }
        this.body = Bodies.rectangle(x,y,20,20,options);
        this.width = 20;
        this.height = 20;
        this.image = loadImage("Square.jpg");
        World.add(world,this.body);
        
    }
    display(){
       push();
       translate(this.body.position.x,this.body.position.y);
       rotate(this.body.angle)
       rectMode(CENTER);
       rect(0,0,this.width,this.height);
       imageMode(CENTER);
        image(this.image, 0, 0, this.width, this.height);
       pop();
    }
}