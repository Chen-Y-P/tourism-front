$(document).ready(function() {

			var appId, timeStamp, nonceStr, package, paySign;
			var goodId;
			var buy = $(".goumai_a");
			buy.click(function() {
				goodId = $(this).attr("good-id");
				order();
			});

			function randomNumber() {
				var outTradeNo = ""; //订单号
				for (var i = 0; i < 2; i++) //6位随机数，用以加在时间戳后面。
				{
					outTradeNo += Math.floor(Math.random() * 10);
				}
				return outTradeNo = "mp" + (new Date().getTime() + "").substring(0, 12) + outTradeNo;
			}

			function getTitle(id) {
				if (id === '1') {
					return '中山陵语音讲解';
				} else if (id === '2') {
					return '明孝陵语音讲解';
				} else if (id === '3') {
					return '灵谷景区语音讲解';
				}
			}


			function getId(id) {
				if (id === '1') {
					return 446;
				} else if (id === '2') {
					return 445;
				} else if (id === '3') {
					return 447;
				}
			}


			function order() { //下单
			
				//alert('hhhh');
				//ajax order TODO   if sucess:=>
				var trade_no = randomNumber();
				//var url_order = api + '/wxPay/getJSSDKPayInfo'
				var url_order = api+'/jj/wxPay/getJSSDKPayInfo';

				$.ajax({
						type: "post",
						url: url_order,
						dataType: 'json',
						cache: false,
						data: {
							openid: localStorage.getItem('openid'),
							out_trade_no: trade_no,
							total_fee: 1000,
							body: getTitle(goodId),
							trade_type: 'JSAPI',
							spbill_create_ip: '127.0.0.1',
							goodId:getId(goodId),
							unionId:localStorage.getItem('unionId'),
							nickname:localStorage.getItem('nickname')
						},
						success: function(res) {
							if(res.code ==-1){
								alert('获取授权失败，请重新登录微信！');
								return;
							}
							appId = res.datum.appId;
							timeStamp = res.datum.timeStamp;
							nonceStr = res.datum.nonceStr;
							package = res.datum.package;
							paySign = res.datum.paySign;

							// 开始支付
							
									//wxOrder(trade_no);
									if (typeof WeixinJSBridge == "undefined") {
										if (document.addEventListener) {
											document.addEventListener('WeixinJSBridgeReady',
												onBridgeReady, false);
										} else if (document.attachEvent) {
											document.attachEvent('WeixinJSBridgeReady',
												onBridgeReady);
											document.attachEvent('onWeixinJSBridgeReady',
												onBridgeReady);
										}
									} else {
										localStorage.setItem('trade_no', trade_no);
										onBridgeReady();
									}
								},
								error: function(res) {

									
								}
						});
				}

				function onBridgeReady() {
					WeixinJSBridge.invoke('getBrandWCPayRequest', {
							"appId": appId, //公众号名称,由商户传入     
							"timeStamp": timeStamp, //时间戳,自1970年以来的秒数     
							"nonceStr": nonceStr, //随机串     
							"package": package,
							"signType":"MD5",
							"paySign": paySign //微信签名 
						},
						function(res) {
							if (res.err_msg == "get_brand_wcpay_request:ok") {
								//alert("购买成功")
								//	url = "success.html" //此处拼接内容
								window.location.href = "jiangjie_xq" + goodId + '-content.html';
								//支付成功后跳转的页面
							} //使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok,但并不保证它绝对可靠。
						});
				}
			});
