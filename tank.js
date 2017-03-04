/**
 * Created by 张家豪 on 2017/1/18 0018.
 */
(function(tankJs,undefined){
    var Tank = function(){}
    Tank.prototype = {
        //控制器描述
        DECRIPTION : function(){
            this.UP = 38;
            this.RIGHT = 39;
            this.DOWN = 40;
            this.LEFT = 37;
            this.SHOT = 32; //空格键发射
        },
        //通用参数
        COMMON : function(){
            this.bulletSpeed = 5; /*速度 （像素格/秒）*/
            this.workThread = null;/*线程数*/
            this.bullets = [];/*地图上的炮弹*/
        },
        //出生点
        birthplace : function(){
            this.birthplace_x = (tankJs.width/2).toFixed(0);
            this.birthplace_y = (tankJs.height).toFixed(0);
        },
        //初始化构造坦克
        init : function(){
            var x = parseInt(this.birthplace_x);
            var y = parseInt(this.birthplace_y);
            var point_core = document.getElementById("box_"+x+"_"+y);
            var point_gun = document.getElementById("box_"+x+"_"+(y-1));
            var point_left = document.getElementById("box_"+(x-1)+"_"+y);
            var point_right = document.getElementById("box_"+(x+1)+"_"+y);
            point_core.className = "tank";
            point_gun.className = "tank";
            point_left.className = "tank";
            point_right.className = "tank";
        },
        //控制台
        controll : function(dir){
            switch (dir) {
                case this.UP:
                    this.birthplace_y--;
                    this.move(this.birthplace_x,this.birthplace_y);
                    break;
                case this.RIGHT:
                    this.birthplace_x++;
                    this.move(this.birthplace_x,this.birthplace_y);
                    break;
                case this.DOWN:
                    this.birthplace_y++;
                    this.move(this.birthplace_x,this.birthplace_y);
                    break;
                case this.LEFT:
                    this.birthplace_x--;
                    this.move(this.birthplace_x,this.birthplace_y);
                    break;
                case this.SHOT:
                    this.gun();
                    break;
            }
        },
        //移动按键监听
        moveListen : function(ev){
            var evt = window.event || ev;
            tank.controll(evt.keyCode);
        },
        //移动
        move : function(x,y){
            var x = parseInt(x);
            var y = parseInt(y);
            $(".tank").removeClass("tank");//清除
            var point_core = document.getElementById("box_"+x+"_"+y);
            var point_gun = document.getElementById("box_"+x+"_"+(y-1));
            var point_left = document.getElementById("box_"+(x-1)+"_"+y);
            var point_right = document.getElementById("box_"+(x+1)+"_"+y);
            point_core.className = "tank";
            point_gun.className = "tank";
            point_left.className = "tank";
            point_right.className = "tank";
        },
        //开始
        start : function () {
            var tank = this;//获取坦克
            //手柄连接
            try {
                document.attachEvent("onkeydown", this.moveListen);
            } catch (e) {
                document.addEventListener("keydown", this.moveListen, false);
            }
            //火控系统
            window.setInterval("bulletGONE()",1000);
        },
             //子弹
            bullet : function(tank){
                //生成子弹 初始位置
                var bullet_x =  parseInt(this.birthplace_x);
                var bullet_y =  parseInt(this.birthplace_y-2);
                var bullet_core = document.getElementById("box_" + bullet_x + "_" + bullet_y);
                bullet_core.className = "bullet";
                //装载进地图中
                this.bullets.push(bullet_core);
                return bullet_core;
            },
            //发射炮弹
            gun : function(){
                //生成炮弹
                this.bullet(this);
            }

    }
    tank = new Tank();
    tank.DECRIPTION();      //载入控制器描述参数
    tank.COMMON();          //载入通用参数
    tank.birthplace();      //初始化出生点
    tank.init();            //初始化构造坦克
    console.log(tank);
    tankJs.tank = tank;
})(tankJs)

/**
 * 炮弹运行线程
 */
function bulletGONE(){
    var bullets = tankJs.tank.bullets;
    var bulletSpeed = tankJs.tank.bulletSpeed;
    var bulletNumber = tankJs.tank.bullets.length;
    //堆栈
    if(bulletNumber != 0){
        for(var i = 0 ; i < bulletNumber ; i++){
            var bullet_now = bullets.shift();
            bullet_now.className = "";
            var id = bullet_now.id;
            var coordinate = id.split("_");
            var x_new = parseInt(coordinate[1]);
            var y_new = parseInt(coordinate[2]);
            if(y_new-1 >= 0){
                var bullet_GONE = document.getElementById("box_" + x_new + "_" + (y_new-1));
                bullet_GONE.className = "bullet";
                bullets.push(bullet_GONE);
            }
        }
    }
    tankJs.tank.bullets = bullets;
}