// JavaScript Document
window.onload = function(){
	"use strict";
	//获取imgList
	var imgList = document.getElementById("imgList");
	//获取页面中所有的img标签
	var imgArr = document.getElementById("imgList").getElementsByTagName("img");
	//设置imgList的宽度
	imgList.style.width = 1280*imgArr.length+"px";
	
	
	
	/*设置导航按钮居中*/
	var navDiv = document.getElementById("navDiv");
	//获取
	var picture = document.getElementById("picture");
	//设置navDiv的left值
	navDiv.style.left = (picture.offsetWidth - navDiv.offsetWidth)/2 + "px";
	
	
	
    //默认显示图片的索引,让当前显示的图片对应的导航标签变为红色
	var index = 0;
	var allA =  document.getElementById("navDiv").getElementsByTagName("a");
	allA[index].style.backgroundColor = "red";
	
	//创建一个方法用来设置选中的a
	function setA(){
		//判断是否为最后一张图片
		if(index>=imgArr.length-1){
			index=0;
			/*将最后一张变为第一张*/
			imgList.style.left=0;
		}
		for(var i=0 ; i<allA.length ; i++){
			allA[i].style.backgroundColor = "";
			/*不写red，css内生效*/
		}
		allA[index].style.backgroundColor = "red";
	}
	
	var time;
	//自动切换
	function autochange(){
		//设置定时器。6s切换一张图片
		time=setInterval(function(){
			//自增索引index
			index ++;
			index=index%imgArr.length;
				
			move(imgList , "left" , -1280*index , 50 , function(){
				//修改导航标签
				setA();
			} );
			
		},4000);
	}
	
	
	
	/*点击超链接切换到指定的图片*/
	for(var i=0; i<allA.length ; i++){

		//为每一个超链接都添加一个num属性
		allA[i].num = i;

		//为超链接绑定单击响应函数
		allA[i].onclick = function(){
			//关闭自动切换
			clearInterval(time);

			//获取点击超链接的索引,并将其设置为index
			index = this.num;
			setA();
			move(imgList , "left" , -1280*index , 50 ,function(){
				autochange();
			} );
		};
	}
	
	//开启自动切换图片
	autochange();	
};



/*obj——变换对象
atter——变换方向
target——变换步幅
speed——切换速度
callback——回调函数，动画运行后运行
*/
function move(obj, attr, target, speed,callback) {
	"use strict";
	//关闭上一个定时器
	clearInterval(obj.timer);
	//获取元素目前的位置
	var current = parseInt(getStyle(obj, attr));

	//判断速度的正负值
	if(current > target) {
		speed = -speed;
	}

	//开启一个定时器，用来执行动画效果
	//向执行动画的对象中添加一个timer属性，用来保存它自己的定时器的标识
	obj.timer = setInterval(function() {

		//获取box1的原来的left值
		var oldValue = parseInt(getStyle(obj, attr));

		//在旧值的基础上增加
		var newValue = oldValue + speed;

		//判断newValue
		//向左移动时，需要判断newValue是否小于target
		//向右移动时，需要判断newValue是否大于target
		if((speed < 0 && newValue < target) || (speed > 0 && newValue > target)) {
			newValue = target;
		}

		//将新值设置给box1
		obj.style[attr] = newValue + "px";

		//当元素移动到0px时，使其停止执行动画
		if(newValue === target) {
			//达到目标，关闭定时器
			clearInterval(obj.timer);
			//动画执行完毕，调用回调函数
			callback();
		}

	}, 30);
}

/*
 * 获取指定元素的当前的样式
 * 	obj 要获取样式的元素
 * 	name 要获取的样式名
 */
function getStyle(obj, name) {
	"use strict";
	if(window.getComputedStyle) {
		//正常浏览器的方式，具有getComputedStyle()方法
		return getComputedStyle(obj, null)[name];
	} else {
		//IE8的方式，没有getComputedStyle()方法
		return obj.currentStyle[name];
	}

}

