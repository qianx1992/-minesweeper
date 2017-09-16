var con=document.getElementById("con");
var maskBox=document.getElementById("maskBox");
var csps=con.getElementsByTagName("span");
var lei=0;
var num=0;
function init(){
	var conih="";
	var mbih="";
	for(var i=0;i<9;i++){
		for(var j=0;j<9;j++){
			conih+="<span></span>";
			mbih+="<em></em>";
		}
	}
	con.innerHTML=conih;
	maskBox.innerHTML=mbih;
	//埋雷
	for(var i=0;i<10;i++){
		lei=Math.floor(Math.random()*csps.length);
		if(csps[lei].className==""){
			csps[lei].className="cLei";
		}else{
			i--;
		}	
	}
	//计算雷数
	for(var i=0;i<csps.length;i++){
		csps[i].onOff=true;
		if(csps[i].className=="cLei"){
			continue;
		}
		num=0; 
		if(i%9!=8){
			if(i+10<csps.length && csps[i+10].className == "cLei"){
				num+=1;
			}
			if(i+1<csps.length && csps[i+1].className=="cLei"){
				num+=1;
			}
			if(i-8>=0 && csps[i-8].className=="cLei"){
				num+=1;
			}
		}
		if(i%9!=0){
			if(i-1>=0 && csps[i-1].className=="cLei"){
				num+=1;
			}
			if(i-10>=0 && csps[i-10].className=="cLei"){
				num+=1;
			}
			if(i+8<csps.length && csps[i+8].className=="cLei"){
				num+=1;
			}
		}
		if(i-9>=0 && csps[i-9].className=="cLei"){
			num+=1;
		}	
		if(i+9<csps.length && csps[i+9].className=="cLei"){
			num+=1;
		}	
		if(num!=0){
			csps[i].innerHTML=num;
		}
	}
}
var mbems=maskBox.getElementsByTagName("em");
var failBox=document.getElementById("failBox");
init();
triggerEv();
var ftime=document.getElementById("ftime");
var gtime=document.getElementById("gtime");
var gDate=document.getElementById("gDate");
var bestTime=document.getElementById("bestTime");
var total=document.getElementById("total");
var winSum=document.getElementById("winSum");
localStorage.bestTime=0;
localStorage.total=0;
localStorage.winSum=0;
function triggerEv(){
	var areadTime=0;
	var timer=0;
	timer=setInterval(function(){
		areadTime++;
		ftime.innerHTML=areadTime;
	},1000);
	for(var i=0;i<mbems.length;i++){
		mbems[i].index=i;
		mbems[i].onclick=function(){	
			this.style.opacity=0;
			if(csps[this.index].className=="cLei"){
				clearInterval(timer);
				localStorage.total=parseInt(localStorage.total)+1;
				gtime.innerHTML="时间："+areadTime+"秒";
				bestTime.innerHTML="最佳时间："+localStorage.bestTime+"秒";
				total.innerHTML="已玩游戏："+localStorage.total;
				winSum.innerHTML="已胜游戏："+localStorage.winSum;
				var current=new Date();
				gDate.innerHTML="日期："+current.getFullYear()+"-"+(current.getMonth()+1)+"-"+current.getDate();
				fbTitle.innerHTML="不好意思，您输了。下次走运！";
				failBox.style.display="block";
				return;
			}
			fn(this.index);
			num=0;
			for(var j=0;j<mbems.length;j++){			
				if(!mbems[j].style.opacity){
					num+=1;
				}
			}
			if(num==10){
				clearInterval(timer);
				if(localStorage.bestTime==0 || areadTime<localStorage.bestTime){
					localStorage.bestTime=areadTime;
				}
				localStorage.total=parseInt(localStorage.total)+1;
				localStorage.winSum=parseInt(localStorage.winSum)+1;
				gtime.innerHTML="时间："+areadTime+"秒";
				bestTime.innerHTML="最佳时间："+localStorage.bestTime+"秒";
				total.innerHTML="已玩游戏："+localStorage.total;
				winSum.innerHTML="已胜游戏："+localStorage.winSum;
				var current=new Date();
				gDate.innerHTML="日期："+current.getFullYear()+"-"+(current.getMonth()+1)+"-"+current.getDate();
				fbTitle.innerHTML="恭喜！您嬴了！";
				failBox.style.display="block";
			}
		}
	}
}
var playAgain=document.getElementById("playAgain");
var fbTitle=document.getElementById("fbTitle");
var fbClose=document.getElementById("fbClose");
fbClose.onclick=playAgain.onclick=function(){
	failBox.style.display="";
	init();
	triggerEv();
}
function fn(n){
	if(csps[n].className=="cLei"){
		return;
	}
	mbems[n].style.opacity=0;
	if(csps[n].innerHTML=="" && csps[n].onOff){
		csps[n].onOff=false;
		if(n+9<csps.length && csps[n+9].className=="" &&csps[n+9].onOff){
			mbems[n+9].style.opacity=0;		
			if(csps[n+9].innerHTML==""){
				fn(n+9);
			}		
		}
		if(n%9!=0){
			if(n-1>=0 && csps[n-1].className=="" && csps[n-1].onOff){
				mbems[n-1].style.opacity=0;
				if(csps[n-1].innerHTML==""){
					fn(n-1);
				}
			}
			if(n-10>=0 && csps[n-10].className=="" && csps[n-10].onOff){
				mbems[n-10].style.opacity=0;
				if(csps[n-10].innerHTML==""){
					fn(n-10);
				}
			}
			if(n+8<csps.length && csps[n+8].className=="" && csps[n+8].onOff){
				mbems[n+8].style.opacity=0;
				if(csps[n+8].innerHTML==""){
					fn(n+8);
				}
			}
		}
		if(n%9!=8){
			if(n+10<csps.length && csps[n+10].className=="" && csps[n+10].onOff){
				mbems[n+10].style.opacity=0;
				if(csps[n+10].innerHTML==""){
					fn(n+10);
				}
			}
			if(n+1<csps.length && csps[n+1].className=="" && csps[n+1].onOff){
				mbems[n+1].style.opacity=0;
				if(csps[n+1].innerHTML==""){
					fn(n+1);
				}
			}
			if(n-8>=0 && csps[n-8].className=="" && csps[n-8].onOff){
				mbems[n-8].style.opacity=0;
				if(csps[n-8].innerHTML==""){
					fn(n-8);
				}
			}			
		}	
		if(n-9>=0 && csps[n-9].className=="" && csps[n-9].onOff){
			mbems[n-9].style.opacity=0;
			if(csps[n-9].innerHTML==""){
				fn(n-9);
			}
		}
	}
}
