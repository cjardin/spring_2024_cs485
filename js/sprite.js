//Parent Sprit Class
class Sprite {
    constructor(sprite_json, x, y){
        this.sprite_json = sprite_json;
        this.x = x;
        this.y = y;
    }

    draw(){
        console.log("draw 1");
    }
}
