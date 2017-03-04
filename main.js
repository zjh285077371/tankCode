/**
 * Created by 张家豪 on 2017/1/18 0018.
 */
(function(window,undefined){
    var TankJs = function(){}
    TankJs.prototype = {
        //通用参数
        COMMON : function(){
            this.width = 40; /*水平方向方格数*/
            this.height = 40; /*垂直方向方格数*/
        },
        //初始化战场
        initBattleground : function(){
            var html = [];
            html.push("<table>");
            for(var x = 1 ; x <= this.height ;x++){
                html.push("<tr>");
                for(var y = 1 ; y <= this.width ;y++){
                    html.push('<td id="box_' + y + "_" + x + '"> </td>');
                }
                html.push("</tr>");
            }
            html.push("</table>");
            var battleground = document.getElementById("battleground");
            battleground.innerHTML = html.join("");
        },
        //开始
        init : function(){
            tankJs.COMMON();          //通用参数
            tankJs.initBattleground();//初始化战场
        }
    }
    tankJs = new TankJs();
    tankJs.init();
    console.log(tankJs);
    window.tankJs = tankJs;
})(window);