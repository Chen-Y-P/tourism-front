var url = '';
var goodId;
$(document).ready(function() {
	var flag = $('.zsl_pic .flag-left');
	const code = $.getUrlParam('code');
	const local = window.location.href;
	if (code != undefined && code.length > 0) {
		$.ajax({
			url: api + "/jj/getOAuth2UserInfo2?code=" + code,
			type: "get",
			success:function(res){
				var openId = res.datum.openid;
				var unionId = res.datum.unionid;
				var nickname = res.datum.nickname;
				
				localStorage.setItem('unionId', unionId);
				localStorage.setItem('openid', openId);
				localStorage.setItem('nickname', nickname);

				
			},
			error: _ajaxError
		});

	} else {

	}
	
							$.ajax({
			url: api + "/jj/api/order/isBug?good_id=446&openid=" + localStorage.getItem('openid'),
			type: "get",
			success:function(data){
				if(data){
					_showFlag(0);
				}
				
			},
			error: _ajaxError
		});
		$.ajax({
			url: api + "/jj/api/order/isBug?good_id=445&openid=" + localStorage.getItem('openid'),
			type: "get",
			success:function(data){
				if(data){
					_showFlag(1);
				}
			},
			error: _ajaxError
		});
		$.ajax({
			url: api + "/jj/api/order/isBug?good_id=447&openid=" + localStorage.getItem('openid'),
			type: "get",
		 success:function(data){
				if(data){
					_showFlag(2);
				}
			},
			error: _ajaxError
		});
	
			function getId(id) {
				if (id === '1') {
					return 446;
				} else if (id === '2') {
					return 445;
				} else if (id === '3') {
					return 447;
				}
			}

	$(".zsl_pic").click(function() {
		url = $(this).attr("good-url");
		goodId = $(this).attr("good-id");
		$.ajax({
			url: api + "/jj/api/order/isBug?good_id=" + getId(goodId)+ "&openid=" + localStorage.getItem('openid'),
			type: "get",
			success: _hasBought,
			error: _ajaxError
		});
	});
	function _getOpenidSuccess(data) {
		if (data.result) {
		console.log(data);
		localStorage.setItem('openid', data.datum);
			$.ajax({
				url: api + "/jj/getUserInfo?lang=zh-CN&openid=" + localStorage.getItem('openid'),
				type: "get",
				success: _getUserInfoSuccess,
				error: _ajaxError
			});
		} else {
	
		}

	
		

	}
	function _showFlag(num){
		flag[num].style='';
	}
});

function _hasBought(data) {
	if (data) { //已购买
		window.location.href = 'jiangjie_xq'+goodId+'-content.html';
	} else {
		window.location.href = url;
	}
}



function _getUserInfoSuccess(data) {
	if (data.result) {
		localStorage.setItem('userInfo', data.datum);
		localStorage.setItem('unionId', data.datum.unionId);
	}
}

function _ajaxError(error) {
	console.log(error.statusText);
	console.log('异常');
}
