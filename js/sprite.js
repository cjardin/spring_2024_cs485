class BackgroundSprite{

    constructor(sprite_json){
        this.sprite_json = sprite_json;
        this.state = 'idle';

        this.root_e = "acid_bk";
        this.cur_frame = 0;
        this.x = 0;
        this.y = 0;

    }
    draw(state){
        var ctx = canvas.getContext('2d');
        if(this.sprite_json[this.root_e][this.state][this.cur_frame]['img'] == null){
            console.log("loading Bk");
            this.sprite_json[this.root_e][this.state][this.cur_frame]['img'] = new Image();
            this.sprite_json[this.root_e][this.state][this.cur_frame]['img'].src = 'acid_bk/' + this.root_e + '/' + this.state + '/' + this.cur_frame + '.png';
        }

        ctx.drawImage(this.sprite_json[this.root_e][this.state][this.cur_frame]['img'], 
                this.x, this.y, window.innerWidth, window.innerHeight );

        this.cur_frame = this.cur_frame + 1;
        if(this.cur_frame >= this.sprite_json[this.root_e][this.state].length){
            this.cur_frame = 0;
        }

        return true;
    }
}

//Parent Sprit Classa
class Sprite {
    constructor(sprite_json, x, y, start_state){
        this.sprite_json = sprite_json;
        this.x = x;
        this.y = y;
        this.state = start_state;
        this.root_e = "Sonic";

        this.cur_frame = 0;

        this.cur_bk_data = null;

        this.x_v = 10;
        this.y_v = 0;
    }

    draw(state){
        var ctx = canvas.getContext('2d');
        //console.log(this.sprite_json[this.root_e][this.state][this.cur_frame]['w']);
        console.log(state['key_change']);

        if(this.sprite_json[this.root_e][this.state][this.cur_frame]['img'] == null){
            console.log("loading");
            this.sprite_json[this.root_e][this.state][this.cur_frame]['img'] = new Image();
            this.sprite_json[this.root_e][this.state][this.cur_frame]['img'].src = 'Sonic/' + this.root_e + '/' + this.state + '/' + this.cur_frame + '.png';
        }

        if( this.cur_bk_data != null && state['has_background_changed'] == false){
            ctx.putImageData(this.cur_bk_data , (this.x - this.x_v) , (this.y - this.y_v));
        }

        this.cur_bk_data = ctx.getImageData(this.x, this.y, 
                        this.sprite_json[this.root_e][this.state][this.cur_frame]['w'], 
                        this.sprite_json[this.root_e][this.state][this.cur_frame]['h']);


        ctx.drawImage(this.sprite_json[this.root_e][this.state][this.cur_frame]['img'], this.x, this.y );

        this.cur_frame = this.cur_frame + 1;
        if(this.cur_frame >= this.sprite_json[this.root_e][this.state].length){
            console.log(this.cur_frame);
            this.cur_frame = 0;
        }

        var map_context = offscreen.getContext('2d');
        var data = map_context.getImageData(this.x + this.sprite_json[this.root_e][this.state][this.cur_frame]['w'] , 
            this.y, 1, 1).data;
        var rgb = [ data[0], data[1], data[2] ];

        console.log(rgb);
        if(data[0] == 255 && data[1] == 0 && data[2] ==0){
            this.bound_hit('F'); 
        }else if(this.x >= (window.innerWidth - this.sprite_json[this.root_e][this.state][this.cur_frame]['w']) ){
            this.bound_hit('E');
        }else if(this.x <= 0){
            this.bound_hit('W');
        }else if(this.y >= (window.innerHeight - this.sprite_json[this.root_e][this.state][this.cur_frame]['h']) ){
            this.bound_hit('S');
        }else if(this.y <= 0){
            this.bound_hit('N');
        }else{
            this.x = this.x + this.x_v;
            this.y = this.y + this.y_v;
        }

        return false;
        
    }

    set_idle_state(){
        this.x_v = 0;
        this.y_v = 0;
        const idle_state = ["idle","idleBackAndForth","idleBreathing","idleFall","idleLayDown","idleLookAround","idleLookDown","idleLookLeft","idleLookRight","idleLookUp","idleSit","idleSpin","idleWave"];

        //const random = Math.floor(Math.random() * idle_state.length);
        //console.log(idle_state[random]);
        this.state = 'idle'; // idle_state[random];
    }

    bound_hit(side){
            console.log(side);
            this.set_idle_state();
   } 


}
