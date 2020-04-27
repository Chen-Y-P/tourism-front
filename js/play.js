$(document).ready(function() {
	var goodId;
	var title=$('title')[0].innerText;
	$.ajax({
		url:  "http://www.hcmis.cn/jj/api/order/isBug?good_id=" + getGoodId(title) + "&openid=" + localStorage.getItem('openid'),
		type: "get",
		success: _hasBought,
		error: function(){
			window.location.href = 'www.hcmis.cn/wechatService';
		}
	});
	var audio=$('.play');
	console.log(audio);
	var currentPlay=-1;
	var noPlay=true;
	var watchMore=$('.watch-more span')[0];
	var wrap=$('.wrap')[0];
	var intro= $('.intro')[0];
	var flag=1;
	function getGoodId(title){
		if(title ==='中山陵讲解'){
			return 446;
		}else if(title ==='明孝陵讲解'){
			return 445;
		}else if(title ==='灵谷寺讲解'){
			return 447;
		}
	}
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
function _hasBought(data) {
	if (data) { //已购买
	} else {
		window.location.href = 'http://www.hcmis.cn/wechatService';
	}
}