/*
 @ Name：移动webapp JS类库 (原生js实现)
 @ Author：前端老徐
 @ Date：2016/09/25
 @ E-mail：442413729@qq.com
 @ Weibo:http://weibo.com/qdlaoxu
 @ GitHub:https://github.com/waihaolaoxu
 @ blog:http://www.loveqiao.com/
 */

(function(a) {
	function App(){}
	App.prototype={
		//检测是否是PC设备
		isPc: function() {
			var userAgentInfo = navigator.userAgent;
			var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
			var flag = true;
			for (var v = 0; v < Agents.length; v++) {
				if (userAgentInfo.indexOf(Agents[v]) > 0) {
					flag = false;
					break;
				}
			}
			return flag;
		},
		//设置REM
		setRem: function(num) {
			var _self=this,
				design_width = num?num:640,
				oHtml=document.getElementsByTagName('html')[0],
				action_flag=true;
			(function(){
				if (_self.isPc()) {
					view_width = document.documentElement.clientWidth > design_width ? design_width : document.documentElement.clientWidth;
					oHtml.className = 'pc';
				} else {
					view_width = document.documentElement.clientWidth < 320 ? design_width/2 : document.documentElement.clientWidth;
					console.log(document.documentElement.clientWidth)
				}
				oHtml.style.opacity = 1;
				oHtml.style.fontSize = view_width * 100 / design_width + 'px';
				if (action_flag) {
					action_flag = false;
					window.addEventListener('resize',arguments.callee, false);
				}				
			})()
		},
		each:function(opt,callback){
			for(x in opt){
				callback(x,opt[x]);
			}
		},
		$:function(opt){
			var obj;
			if(opt[0]==='#'){
				obj=document.getElementById(opt.replace('#',''));
			}else if(opt[0]==='.'){
				obj=document.querySelectorAll('opt');
			}
			return obj;
		},
		//touch方法
		touch: function(opt) {
			var _self=this,
				def={
					id:'', //触摸容器的id
					threshold:50,//阀值（滑动的有效距离）
					move:function(left,top){ //方向，移动的位置（Number）
						// 滑动中
					},
					end:function(a){ //方向
						//滑动结束
					}
				}
			//合并参数
			_self.each(opt,function(key,val){
				def[key]=val;
			});
			//参数校验
			def.id===""&&console.error('id不能为空！');
			var obj = document.getElementById(def.id),
				startX, startY, direction = null;

			obj.ontouchstart = function(e) {
				//e.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等  
				var touch = e.touches[0]; //获取第一个触点  
				startX = Number(touch.pageX); //页面触点X坐标  
				startY = Number(touch.pageY); //页面触点Y坐标  
			}
			obj.ontouchmove = function(e) {
				e.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
				var touch = e.touches[0]; //获取第一个触点
				var x = Number(touch.pageX);
				var y = Number(touch.pageY);
				var Left = x - startX;
				var Top = y - startY;
				//判断滑动方向
				if (Math.abs(Left) > Math.abs(Top)) { //左右滑动
					if (Left > def.threshold) {
						//向右滑动
						direction = 'right';
					} else if (Left < -def.threshold) {
						//向左滑动
						direction = 'left'
					}
				} else {
					if (Top > def.threshold) { //上下滑动
						//向下滑动
						direction = 'down';
					} else if (Top < -def.threshold) {
						//向上滑动
						direction = 'top'
					}
				}
				//滑动回调
				if (typeof def.move == 'function') {
					// alert(def.move)
					def.move(Left, Top);
				}
			}
			obj.ontouchend = function() {
				if (direction) {
					def.end(direction);
					direction = false;
				}
			}
		}
	}
	a.$app=new App();
}(window));