// 1、设计蛇：属性有宽、高、方向、状态（有多少节），方法：显示，跑

// 2、设计食物：属性宽、高

// 3、显示蛇：根据状态向地图里加元素

// 4、蛇跑起来：下一节到前一节的位置，蛇头根据方向变，删除原来的蛇，新建蛇；当出界时，死亡，初始化；当蛇头吃到自己的时候，死亡，初始化

// 5、食物被吃掉，蛇加一节，去掉原来的食物，生成新的食物

// 6、添加定时器，绑定按键
var map=document.getElementById('map');
var count=document.getElementById('snakeCount');
var timer=null;
var stop=document.getElementById('stop');
document.getElementById('SnakeBody').style.height = window.innerHeight + 'px';
//创建蛇 
function snake(){
    this.width="20";
    this.height="20";
    this.align="right";
    this.body=[
        {x:3,y:0},
        {x:2,y:0},
        {x:1,y:0}
    ];
    len=this.body.length;
    
    this.show=function(){
         snakeTou=document.createElement('img');
        snakeTou.src="image/head.png";
        this.body[0].Body=snakeTou;
            snakeTou.width=this.width;
            snakeTou.height=this.height;
            snakeTou.style.position='relative';
            snakeTou.style.left=this.body[0].x*this.width+'px';
            snakeTou.style.top=this.body[0].y*this.height+'px';
            map.appendChild(this.body[0].Body);
            this.body[0].ys=snakeTou;


            for(var i=len-1;i>0;i--){
                 var snakeBody=document.createElement('img');
                   snakeBody.src="image/body.png";
                   snakeBody.width=this.width
                   snakeBody.height=this.height
                   this.body[i].Body=snakeBody;
                   map.appendChild(this.body[i].Body);
                   snakeBody.style.position='absolute';
                   snakeBody.style.left=this.body[i].x*this.width+'px';
                   snakeBody.style.top=this.body[i].y*this.height+'px';
                   this.body[i].ys=snakeBody;
               }
            
    }



   



    this.runAlign=function(){
        document.body.onkeydown=function(e){
            // console.log(e.keyCode);
            switch(e.keyCode){
                case 38 :
                    if(Snake.align!="bottom")
                    {
                        Snake.align="top";
                        // console.log(this.align)
                    }
                    break;
                case 87 :
                    if(Snake.align!="bottom")
                    {
                        Snake.align="top";
                        // console.log(this.align)
                    }
                    break;
                case 40:
                        if(Snake.align!="top")
                        {
                            Snake.align="bottom";
                        }
                    break;
                case 83:
                        if(Snake.align!="top")
                        {
                            Snake.align="bottom";
                        }
                    break;
                case  37:
                        if(Snake.align!="right")
                        {
                            Snake.align="left";
                        }
                    break;
                case  65:
                        if(Snake.align!="right")
                        {
                            Snake.align="left";
                        }
                    break;
                case 39:
                        if(Snake.align!="left")
                        {
                            Snake.align="right";
                            
                        }
                    break;
                case 68:
                        if(Snake.align!="left")
                        {
                            Snake.align="right";
                            
                        }
                    break;
                case 32:
                        stopButton();
                        break;
            }
        }
    }

    this.runDong=function(){
        switch(this.align){
            case "top":
                this.body[0].y-=1;
                break;
            case "bottom":
                this.body[0].y+=1;
                break;
            case "left":
                this.body[0].x-=1;
                break;
            case "right":
                this.body[0].x+=1;
                break;
        }
    }




    this.run=function(){
        var len=this.body.length;
        for(var i=len-1;i>0;i--){
            this.body[i].x=this.body[i-1].x;
            this.body[i].y=this.body[i-1].y;
           
        }
           
    }

    this.xy=function(){
        snakeTou.style.left=this.body[0].x*this.width+'px';
        snakeTou.style.top=this.body[0].y*this.height+'px';
        var len=this.body.length;
        for(var i=len-1;i>0;i--){
            this.body[i].ys.style.left=this.body[i].x*this.width+'px';
            this.body[i].ys.style.top=this.body[i].y*this.height+'px';
        }
        
    }


    this.child=function(){
        var leng=Snake.body.length;
        this.body[leng]={x:this.body[leng-1].x,y:this.body[leng-1].y};
        
        var snakeBody=document.createElement('img');
                   snakeBody.src="image/body.png";
                   snakeBody.width=this.width
                   snakeBody.height=this.height
                //    Snake.body[0].Body=snakeBody;
                   map.appendChild(snakeBody);
                   snakeBody.style.position='absolute';
                   snakeBody.style.left=this.body[leng].x*this.width+'px';
                   snakeBody.style.top=this.body[leng].y*this.height+'px';
                   
                   this.body[leng].ys=snakeBody;
    }


    this.eat=function(){
        if(Snake.body[0].x==Food.x && Snake.body[0].y==Food.y){
            Food.eat();
         count.innerHTML++;
            Snake.child();
        }
    }

    this.siWang=function(){
        var len=Snake.body.length;
       if( parseInt(Snake.body[0].ys.style.left)>=600 || parseInt(Snake.body[0].ys.style.left)<0 || parseInt(Snake.body[0].ys.style.top)>=240 
       || parseInt(Snake.body[0].ys.style.top)<0){
        //    alert(1)
        clearInterval(timer);
        for(var i=len-1;i>=0;i--){
            map.removeChild(this.body[i].ys);
        }
        map.removeChild(Food.chi);

        alert("游戏结束，撞墙了，您的得分是："+count.innerHTML);
        count.innerHTML=0;
        //网页刷新
        window.location.reload(true);

       }
    }
    this.chongHe=function(){
        for(var i=1;i<Snake.body.length;i++){
            if(Snake.body[0].x == Snake.body[i].x && Snake.body[0].y== Snake.body[i].y){
                clearInterval(timer);
                for(var i=len-1;i>=0;i--){
                    map.removeChild(this.body[i].ys);
                }
                map.removeChild(Food.chi);
        
                alert("游戏结束，咬到自己了，您的得分是："+count.innerHTML);
                count.innerHTML=0;
                //网页刷新
                window.location.reload(true);
            }
        }
    }
    
    this.init=function(){
        
        this.runAlign();
        this.show();
        
    }
    this.start=function(){
        // console.log(1)
         this.run();
         this.runDong();
         this.xy();
        this.eat();
        this.siWang();
        this.chongHe();
    }

}
//食物
function food(){
    this.width="20";
    this.height="20";
    this.show=function(){
        var fd=document.createElement('img');
        fd.src="image/apple.png";
        fd.width=this.width;
        fd.height=this.height;
        fd.style.position="absolute";
        this.x=Math.floor(Math.random()*30);
        this.y=Math.floor(Math.random()*12);
        fd.style.left=(this.x*this.width)+'px';
        fd.style.top=(this.y*this.height)+'px';
        map.appendChild(fd);
        this.chi=fd;
    }
    this.eat=function(){
        map.removeChild(this.chi);
        this.show();
    }


    
}

var Food=new food();
// Food.show();
var Snake=new snake();
var start=document.getElementById('start');
var map1=document.getElementById('SnakeBody');

start.onclick=function(){
    map1.style.opacity="1";
    start.style.display="none";
    Food.show();
     timer=setInterval('Snake.start()',500);
}
function stopButton(){
    // console.log(1)
    if(stop.src=="file:///C:/Users/yjq/Desktop/%E8%B4%AA%E5%90%83%E8%9B%87/image/pause.png"){
    clearInterval(timer);
    stop.src="image/start.png";
    }
    else{

        stop.src="file:///C:/Users/yjq/Desktop/%E8%B4%AA%E5%90%83%E8%9B%87/image/pause.png";
        timer=setInterval('Snake.start()',500);
    }
}
