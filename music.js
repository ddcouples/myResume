/**
 * Created by Administrator on 16-11-20.
 */
var music_data=[{
 src:'NeedYouNow.mp3'
},{
    src:'zlx.mp3'
},{
    src:'heniyiyang.mp3'
},{
    src:'xinyuan.mp3'
},{
    src:'xinyueshenhua.mp3'
},{
    src:'yanyuan.mp3'
},{
    src:'chuanyuesikong.mp3'
}];
var Music=function(){
    this.current=0;
    this.audio=new Audio();
}
Music.prototype.play=function(){
    var that=this;
    this.audio.src=music_data[this.current].src;
    this.audio.oncanplay = function() {
        that.audio.play();
    }
    this.audio.addEventListener('ended',function(){
        that.sum();
    })
    this.audio.load();
};
Music.prototype.pause=function(){
    this.audio.pause();
}
Music.prototype.playFromP=function(){
    this.audio.play();
}
Music.prototype.sum=function(){
    this.current++;
    if(this.current>music_data.length-1){
        this.current=0;
    }
    this.play();
}
Music.prototype.sub=function(){
    this.current--;
    if(this.current<0){
        this.current=music_data.length-1;
    }
    this.play();
}
