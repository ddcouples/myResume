/**
 * Created by Administrator on 16-11-14.
 */
var Rain=function(){
    this.rains=[];
    this.left=[];
    this.top=[];
    this.v=[];
};
Rain.prototype.num=10;
Rain.prototype.create=function(){
    $('.raindrop-solid').remove();

    if(config.width<480) this.num=this.num/2;

    for (var i=0;i<this.num;i++){
        var rain=$('<span class=\"raindrop-solid icon\"></span>')
        this.rains[i]=rain;
        this.left[i]=Math.random()*config.width;
        this.top[i]=Math.random()*config.height;
        this.v[i]=Math.random()*10;
        this.rains[i].css({
            left:this.left[i],
            top:0
        })
        $('body').append($(this.rains[i]));
    }
    this.drain();
}
Rain.prototype.drain=function(){
    var rains= $('.raindrop-solid');
        for (var i = 0; i < this.num; i++) {
            var time = Math.random() * 3000 + 1000;
            (function (i) {
                $(rains[i]).animate({
                    top: config.height
                }, time, function () {
                    var that = this;
                    function drop() {
                        $(that).css({
                            left:Math.random()*config.width-10,
                            top: 0
                        });
                        var timeS=Math.random()*3000+1000;
                        $(that).animate({
                            top: config.height
                        }, timeS,drop);
                    }

                    drop();
                })
            })(i)
        }
}
