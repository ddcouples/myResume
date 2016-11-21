/**
 * Created by Administrator on 16-11-15.
 */
var MoveWater=function(ele,vx,vy,g){
    this.ele=ele;
    this.vx=vx;
    this.vy=vy;
    this.g=g;
    this.timer=null;
}
MoveWater.prototype.move=function(){
    var that=this;
    //if(this.timer){
    //    clearInterval(this.timer)
    //}else{
       that.timer = setInterval(function(){
            var top=that.ele.style.top;

           var left=that.ele.style.left;
           if(top==''||left==''){top='00px';left='00px';}

            top= parseInt(top.substr(0,top.length-2));
            left=parseInt(left.slice(0,left.length-2));

           if(top>config.height-100){
               that.vy=-that.vy;
           }
           else if(left>config.width-100||left<0){
               that.vx=-that.vx;
           }
           that.vy+=that.g*0.005;
            that.ele.style.top=top+that.vy+'px';
            that.ele.style.left=left+that.vx+'px';

        },30);
};
MoveWater.prototype.stop=function(){
    var that=this;
    if(this.timer)
        clearInterval(this.timer);
    if(this.ele) {
        //$(this.ele).animate({
        //    opacity: 0
        //}, 1000, function () {
        $(that.ele).animate({
            top:0,
            right:'20px'
        },3000);
        //    that=null;
        //});
    }
};