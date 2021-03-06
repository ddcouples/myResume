/**
 * Created by Administrator on 16-11-14.
 */
var config= {};
var move;
config.isStart=false;

function init(){
    var $article=$('#message').find('article');
    function random(range){
        var max=Math.max(range[0],range[1]);
        var min=Math.min(range[0],range[1]);
        var diff=max-min;
        var number=Math.ceil(Math.random()*diff+min);
        return number;
    }
    return{
        reload:function(){
            var _w=$(document).width()<$('body').width()?$(document).width():$('body').width();
            var _h=$(document).height()<$('body').height()?$(document).height():$('body').height();
            config={
                width:_w,
                height: _h,
                rain:new Rain()
            }
            config.index=0;
        },
        preload:function(){
            var $load=$('.load');
            var $h1= $load.find('h1');
            function up(){
                var defer= $.Deferred();
                setTimeout(function(){
                    $load.find('.up').animate({
                        top:'-100%'
                    },3000,'swing',function(){
                        this.remove();
                        defer.resolve('ok');
                    });
                },3000)
                return defer.promise();
            }
            function down(){
                var defer= $.Deferred();
                setTimeout(function(){
                    $load.find('.down').animate({
                        top:'100%'
                    },3000,'swing',function(){
                        this.remove();
                        defer.resolve('ok');
                    });
                },3000)
                return defer.promise();
            }
            $.when(up(),down()).then(function(){

                var defer= $.Deferred();
                $h1.removeClass().addClass('lightSpeedIn').one('webkitAnimationEnd',function(){
                    $h1.removeClass('lightSpeedIn').addClass('shake_own');
                    setTimeout(function(){
                                $h1.removeClass();
                                defer.resolve('ok');
                            },1500)
                });
                return defer.promise();
            }).then(function(){
              $load.addClass('leaveScreen');
                setTimeout(function(){
                    $load.remove();
                    config.rain.create();//开始下雨
                    var div=$('.middle-header')[0];
                    move=new MoveWater(div,3,3,10);
                    move.move();//头像开始运动
                },3000)
            })
        },
        //头像边框运动
        headerAnimtion:function(){
            var $img=$('.middle-header').find('img');
            function animate(){
                var left=Math.random()*80+20;
                var right=Math.random()*80+20;
                var bleft=Math.random()*80+20;
                var bright=Math.random()*80+20;
                $img.animate({
                    'border-top-left-radius': left,
                    'border-top-right-radius': right,
                   'border-bottom-left-radius': bleft,
                    'border-bottom-right-radius':bright
                },600,function(){
                    animate();
                });
            }
            animate();
        },
        //项目信息反面
        turn:function(ele){
            var classname=ele.className;
            if(/photo_front/.test(classname)){
                ele.className=classname.replace(/photo_front/,'photo_back');
            }else{
                ele.className=classname.replace(/photo_back/,'photo_front');
            };
            var id=ele.id.replace('photo_','');
            var $nav_list=$('#nav_list_'+id);
            var nav_class= $nav_list[0].className;
            if(!/nav_current/.test(nav_class)){
                if(/nav_back/.test(nav_class)){
                    $nav_list[0].className = nav_class.replace(/nav_back/, ' ');
                }else{
                  $nav_list.addClass('nav_back');
                }
            }else{
                if(/nav_current_back/.test(nav_class)){
                    $nav_list[0].className = nav_class.replace(/nav_current_back/, 'nav_current');
                }else{
                    $nav_list[0].className = nav_class.replace(/nav_current/, 'nav_current_back ');
                }
            };
        },
        progressLoad:function(){
            var $ul=$('<ul class="photo_ul"><li><canvas id="can_{{index}}"></canvas></li></ul>')
            if(config.width>config.height) {
                var proCard = $article.html();
                var proCards = [];
                for (i in projects) {
                    var proCardN = proCard.replace(/\{\{index\}\}/g, i)
                        .replace('{{name}}', projects[i].name).replace(/\{\{url\}\}/g, projects[i].url);
                    proCards.push(proCardN);
                }
                $article.html(proCards.join(' '));
                var $nav = $('<div class="nav_list">\
                <span id="nav_list_{{index}}" onclick="init().clickRender(this)"><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\
                 width="35.622px" height="34.346px" viewBox="0 0 17.811 17.173" enable-background="new 0 0 17.811 17.173" xml:space="preserve">\
                <path d="M17.466,9.793L10.022,7.65C9.704,7.559,9.546,7.736,9.67,8.042l0.85,2.099c0.125,0.306-0.025,0.659-0.333,0.782\
                 c0,0-1.962,0.783-3.447,0.783c-1.124,0-2.555-0.422-2.555-0.422c-0.317-0.094-0.384,0.02-0.146,0.251c0,0,1.855,3.394,6.137,3.124\
                  c0.719-0.046,1.481-0.141,1.481-0.141c0.325-0.061,0.693,0.141,0.817,0.449l0.795,1.963c0.125,0.308,0.366,0.326,0.539,0.043\
                  l3.925-6.498C17.904,10.191,17.784,9.884,17.466,9.793z M8.142,9.13l-0.85-2.098C7.168,6.726,7.317,6.375,7.625,6.251\
                   c0,0,1.963-0.785,3.447-0.785c1.123,0,2.555,0.424,2.555,0.424c0.316,0.092,0.384-0.02,0.146-0.253c0,0-1.855-3.394-6.137-3.122\
                c-0.72,0.044-1.48,0.141-1.48,0.141C5.83,2.717,5.462,2.515,5.337,2.208L4.542,0.245C4.417-0.064,4.175-0.083,4.004,0.199\
                   L0.078,6.698C-0.093,6.982,0.026,7.29,0.346,7.381l7.443,2.143C8.107,9.614,8.267,9.438,8.142,9.13z"/>\
                  </svg>\
                 </span>\
            </div>');
                $article.append($nav);
                addNav();//对应每个图片添加nav
                drawCan(150,200,150,200);
            }
            else{
                $('.pro_card').remove();
                var _$art=$('#message').find('article');
                _$art.append($ul);
                mobileAddPhoto();
                var $showPhoto=$('<figure style="display: none;" class="screen_full"><canvas id="fullPhoto"></canvas><figcaption><a href="{{url}}" style="color:#fff;">{{name}}</a></figcaption></figure>');
                for(i in projects) {
                    $('#can_'+i).tap(function(e){
                        e.stopPropagation();
                        var _id = $(this).attr('id').replace('can_', '');
                        drawFullPhoto($ul, $showPhoto, _id);
                        var $screen_full= $('.screen_full');
                        //为canvas添加动画
                        $('#fullPhoto').addClass('animated zoomIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(e){
                            $(this).removeClass('animated zoomIn');
                            $('#fullPhoto').unbind(e);
                        }).tap(function(e){
                            e.stopPropagation();////为canvas添加动画
                            $(this).parent('.screen_full').addClass('animated zoomOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                                   $(this).removeClass('animated zoomOut').remove();
                                   e.stopPropagation();
                                   $(this).unbind(e);
                                });
                            $('#fullPhoto').unbind(e);
                        }).bind('swipeleft',function(){
                           // alert('swipeleft');
                            config.index++;
                            config.index%=projects.length;
                            drawFullPhoto($ul, $showPhoto,config.index);
                            $screen_full.addClass('animated bounceInRight').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                                $(this).removeClass('animated bounceInRight');
                                e.stopPropagation();
                                $(this).unbind(e);
                            });
                        }).bind('swiperight',function(){
                            //alert('swiperight');
                            config.index--;
                            if( config.index<0) config.index=projects.length-1;
                            drawFullPhoto($ul, $showPhoto,config.index);
                            $screen_full.addClass('animated bounceInLeft').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                                $(this).removeClass('animated bounceInLeft');
                                e.stopPropagation();
                                $(this).unbind(e);
                            });
                        });
                        return false;
                    });
                }
            }
            function drawFullPhoto($ul,$showPhoto,_id){
                    var _project=projects[parseInt(_id)];
                    $('body').append($showPhoto);
                    $showPhoto.find('a').attr('href',_project.url).text(_project.name);
                    $showPhoto.css({
                        display:'block',
                        width:config.width,
                        height:config.height,
                        'z-index':998
                    })
                    var img=new Image();
                    img.onload=function(){
                        var can=document.getElementById('fullPhoto');
                        can.width=config.width;
                        can.height=config.height;
                        var _w=0.8*config.width;
                        var _h=_w/this.width*this.height;
                        var content=can.getContext('2d');
                        content.drawImage(this,config.width*0.1,(config.height-_h)/2,_w,_h);

                    }
                    img.src=_project.img;
            }
            function mobileAddPhoto (){
                var liHtml=$ul.html();
                var _li=[];
                for(i in projects){
                    var _liHtml=liHtml.replace('{{index}}',i);
                    _li.push(_liHtml);
                }
                $ul.html(_li.join(' '));
                var _w=$ul.find('li').width();
                //console.log(_w);
                var _h= _w*200/150;
                drawCan(_w*0.8,_h*0.8,_w,_h);
            }
            function addNav() {
                var $nav_list = $article.find('.nav_list');
                var nav_list_html = $nav_list.html();
                var nav_lists = [];
                for (i in projects) {
                    var _nav_list = nav_list_html.replace('{{index}}', i);
                    nav_lists.push(_nav_list);
                }
                $nav_list.html(nav_lists.join(' '));
            }
            function drawCan(width,height,contW,contH){
                for(var i=0;i<projects.length;i++){
                    var img=new Image();
                    img.index=i;
                    img.onload=function(){
                        var can=document.getElementById('can_'+this.index);
                        can.width=contW;
                        can.height=contH;
                        var content=can.getContext('2d');
                        content.drawImage(this,(contW-width)/2,(contH-height)/2,width,height);
                    }
                    img.src=projects[img.index].img;
                }
            }
        },
        renderPro:function(n){//设置项目图片位置

            render(n);
            function render(n){
                var $photos=$article.find('.pro_card');
                if($photos) {
                    var project_n = $photos.splice(n, 1);
                    $('#photo_' + n)[0].style = ' ';
                    $('.pro_center').each(function (index, item) {

                        $(item).removeClass('pro_center');
                    });
                    $('#photo_' + n).addClass('pro_center');

                    var len = Math.floor($photos.length / 2);
                    var width = $article.width();
                    var height = $article.height();
                    for (var i = 0; i < len; i++) {
                        var left = random([75, width / 2 - 75]);
                        var top = random([200, height - 200]);
                        var rotate = random([30, 330]);
                        var zindex = random([10, 90]);
                        $($photos[i]).css({
                            top: top,
                            left: left,
                            transform: 'rotateZ(' + rotate + 'deg)',
                            '-webkit-transform': 'rotateZ(' + rotate + 'deg)',
                            '-moz-transform': 'rotateZ(' + rotate + 'deg)',
                            'z-index': zindex
                        })
                    }
                    for (var i = len; i < $photos.length; i++) {
                        var left = random([width / 2 + 150, width - 150]);
                        var top = random([200, height - 200]);
                        var rotate = random([30, 330]);
                        var zindex = random([10, 90]);
                        $($photos[i]).css({
                            top: top,
                            left: left,
                            transform: 'rotateZ(' + rotate + 'deg)',
                            '-webkit-transform': 'rotateZ(' + rotate + 'deg)',
                            '-moz-transform': 'rotateZ(' + rotate + 'deg)',
                            'z-index': zindex
                        })
                    }
                    $('#nav_list_' + n).siblings().each(function (index, item) {
                        $(item).removeClass('nav_current nav_current_back nav_back');
                    })
                    $('#nav_list_' + n).addClass('nav_current');
                }
            }
        },
        clickRender:function(ele){
            var _id = ele.id.replace('nav_list_', '');
            init().renderPro(_id);
        }
    }
}

$(function(){
    $('.load')[0].addEventListener('touchmove', function (event) {
        event.preventDefault();
    }, false);
    init().reload();
    $('.load').css({
        width:config.width,
        height:config.height
    });
    if(!config.isStart) {
        setTimeout(function () {
            init().preload();
        }, 2000)
    }
    addConnection();//添加联系方式
    init().headerAnimtion();
    init().progressLoad();
    $(window).resize(function(){
        init().reload();
    })
    eleEvents();
});
//显示页面
function pageShow(ele){
    if(move) {
        move.stop();
    }
    var $page=$('.page');
    $page.each(function(index,item){
        $(item).removeClass('active');
    });
    var $a=$(ele).find('a');
    $(ele).parent().find('.activeli').removeClass('activeli');
    $(ele).addClass('activeli');
    var id=$a.attr('href');
    if(id=='#skill'){
        skillsAnimate();
    }
    if(id=='#learning')
    {
       $(id).find('article').css('display','none').slideDown(3000);
    }
    if(id=='#message'){

         if(config.width>config.height) {
             var n = Math.floor(Math.random() * projects.length);
             setTimeout(function () {
                 init().renderPro(n);
             }, 600);
         }else{
             $('.photo_ul').find('li').removeClass().addClass('animated rubberBand').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                 $(this).removeClass();
             });
         }
    }
    $(id).addClass('active');
}
function showCurrent(){
    init().preload();
}
//事件触发
function eleEvents(){
    $searchWork= $('#searchWork');
    $searchWork.click(function(){
        showCurrent();
        config.isStart=true;
    });
    $searchWork.on('tap',function(){
        showCurrent();
        config.isStart=true;
    });
    //简易音乐播放器
    var music=new Music();
    music.play();
    var $svgs=$('.header-fixed').find('svg');
    $($svgs[0]).click(function(){
       music.sub();
        $($svgs[1]).attr('class','rotate');
    });
    $($svgs[1]).click(function(){
        if(music.audio.paused){
            music.playFromP();
            $(this).attr('class','rotate');
        }else{
            music.pause();
            $(this).attr('class','');
        }
    });
    $($svgs[2]).click(function(){
        music.sum();
        $($svgs[1]).attr('class','rotate');
    });
    var $con=$('.con');
    $con.each(function(index,item){
        item.addEventListener('touchstart',function(e){
            e.preventDefault();
            console.log(this);
            $(this).siblings('.con_content').css('display','none');
            $(this).next('div').css('display','block');
        },false);
    })
}
