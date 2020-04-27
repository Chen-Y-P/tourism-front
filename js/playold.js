$(document).ready(function() {
	var audio=$('.play');
	console.log(audio);
	var currentPlay=-1;
	var noPlay=true;
	var watchMore=$('.watch-more span')[0];
	var wrap=$('.wrap')[0];
	var more = $('.more')[0];
	var intro= $('.intro')[0];
	var shadow =$('.shadow')[0];
	var flag=1;
	watchMore.onclick=function(){
		if(flag===1){
			wrap.style='height:auto!important;';
			watchMore.innerText="收起";
		}else{
			wrap.style='height:450px;overflow: hidden;';
			watchMore.innerText="查看全部";
		}
		flag*=-1;
		
	}
	more.onclick=function(){
		intro.style='height:auto!important;'
		shadow.style="display:none";
	}
	
	for(let i = 0 ;i< audio.length;i++)
	{
		audio[i].onplay=function(){
			if(noPlay){
				console.log(i);
				currentPlay=i;
				noPlay=false;
			}else{
				console.log(currentPlay);
				audio[currentPlay].pause();
				currentPlay=i;
				
			}
	}
	}
	
	for(let i = 0 ;i< audio.length;i++)
	{
		audio[i].onpause=function(){
			if(i===currentPlay){
				noPlay=true;
			}
			}
	}
});