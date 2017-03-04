/**
 * Created by 张家豪 on 2017/1/20 0020.
 */
(function(tankJs,undefined){
    var Enemy = function(){};
    Enemy.prototype = {
        //通用参数
        COMMON : function(){
            this.createSpeed = 200;  //敌机生成速度
            this.attackSpeed = 100;  //攻击速度
            this.enemys = [];//地图所有敌人
        },
        //开始
        start : function(){
            /**
             * 1.每隔5秒 构造一批敌人
             * 2.根据地图的宽度，获取每次生成敌人数量区间
             * 3.根据数量，生成相应的敌人出生点
             */
            this.getEnemyNum();
            console.trace(this);
            //window.setInterval(enemy,"createEnemy()",1000,5);
        },
        //根据地图的宽度，获取每次生成敌人数量区间
        getEnemyNum : function(){
            this.width = tankJs.width;
            this.enemyNum_max = parseInt(this.width/3);
        },
        //根据敌人数量区间生成，敌人数量和出生点
        createEnemy : function(enemyNum_max){
            var enemyNum = Math.ceil(Math.random()*enemyNum_max);
            var repeatPoint = [];   //不能再生成的点位数组
            var enemyCores = [];        //敌人数组
            for(var m = 1 ; m <= enemyNum ; m++){
                //每一次生产一个随机点（不包括1和最大宽度数）
                var randomPoint = getRandomPoint(this.width);
                //检查进入repeatPoint查找是否已存在会导致重复点
                randomPoint = checkPoint(repeatPoint , randomPoint , this.width);
                enemyCores.push(randomPoint);
                repeatPoint.push(randomPoint);
                if(randomPoint == 2){
                    repeatPoint.push(1);
                    repeatPoint.push(3);
                    repeatPoint.push(4);
                }else if(randomPoint == (this.width-1)){
                    repeatPoint.push(this.width);
                    repeatPoint.push(this.width-2);
                    repeatPoint.push(this.width-3);
                }else{
                    repeatPoint.push(randomPoint-1);
                    repeatPoint.push(randomPoint-2);
                    repeatPoint.push(randomPoint+1);
                    repeatPoint.push(randomPoint+2);
                }
            }
            for(x in enemyCores){
                var enemyOne = [];
                var enemy_x = parseInt(enemyCores[x]);
                var enemy_y = 1;
                var enemy_core_ele = document.getElementById("box_" + enemy_x + "_" + enemy_y);
                var enemy_left_ele = document.getElementById("box_" + (enemy_x-1) + "_" + enemy_y);
                var enemy_right_ele = document.getElementById("box_" + (enemy_x+1) + "_" + enemy_y);
                var enemy_gun_ele = document.getElementById("box_" + enemy_x + "_" + (enemy_y+1));
                if(enemy_core_ele != null && enemy_left_ele != null && enemy_right_ele != null && enemy_gun_ele != null){
                    enemy_core_ele.className = "enemy";
                    enemy_left_ele.className = "enemy";
                    enemy_right_ele.className = "enemy";
                    enemy_gun_ele.className = "enemy";
                    enemyOne.push(enemy_core_ele);
                    enemyOne.push(enemy_left_ele);
                    enemyOne.push(enemy_right_ele);
                    enemyOne.push(enemy_gun_ele);
                    this.enemys.push(enemyOne);
                }
            }
        },
        //初始化
        init : function(){

        }
    }
    var enemy = new Enemy();
    enemy.COMMON();
    enemy.start();
    //enemy.createEnemy(10)
    console.trace(enemy.enemys);
    tankJs.enemy = enemy;
})(tankJs)



/**
 * 获取一个随机数
 * @param num_max 范围(1~num_max)
 * @returns {number} 随机数
 */
function getRandomPoint(num_max){
    var randomPoint = (Math.ceil(Math.random()*num_max)-1);
    if(randomPoint <= 1 || randomPoint == 40 ){
        getRandomPoint(num_max);
    }else{
        return randomPoint;
    }
}
/**
 * 检查是否是重复点
 * @param repeatPoint
 * @param randomPoint
 * @returns {number}
 */
function checkPoint(repeatPoint , randomPoint , width){
    if(repeatPoint.length!=0){
        for(var i=0 ; i<repeatPoint.length ; i++){
            if(randomPoint == repeatPoint[i]){
                randomPoint = checkPoint(repeatPoint, getRandomPoint(width) , width);
            }
        }
        return randomPoint;
    }else{
        return randomPoint;
    }
}
