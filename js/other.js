// JavaScript Document
/*点击按钮，搜索输入框内容*/
function searchclick(){
	"use strict";
	/*获取内容*/
	var element=document.getElementById("Input");
	var content=element.value;
	/*设置网址*/
	var url='http://www.baidu.com/s?wd='+content;
	/*跳转搜索页面*/
	window.location.href=url;
}
/*点击输入框，清空*/
function textfocus(element,elementvalue){
	"use strict";
	if(element.value===elementvalue){
		element.value="";
		element.style.color="#000";
	}
}
/*离开搜索框，若没有文字或只有空格时，变回默认文字
若有文字，保留*/
function textblur(element,elementvalue){
	"use strict";
	if(element.value===""||element.value.replace(/\s+/,"")===""){
		element.value=elementvalue;
	}
	else{
		element.value="  "+element.value;
	}
	element.style.color="#b8b8b8";
}

