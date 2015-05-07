function MusicVisualizer(obj)	{
	this.source = null; //当前正在播放的BufferSource节点

	this.count = 0; //控制点击次数

	this.analyser = MusicVisualizer.ac.createAnalyser();
	this.size = obj.size;
	this.analyser.fftSize = this.size * 2;

	this.gainNode = MusicVisualizer.ac[MusicVisualizer.ac.createGain ? "createGain":"createGainNode"]();
	this.gainNode.connect(MusicVisualizer.ac.destination);

	this.analyser.connect(this.gainNode);

	this.xhr = new XMLHttpRequest();
	this.visualizer = obj.visualizer;
	this.visualize();
}

MusicVisualizer.ac = new (window.AudioContext || window.webkitAudioContext)();

MusicVisualizer.prototype.load = function(url, fun) {
	this.xhr.abort();
	this.xhr.open("GET", url);
	this.xhr.responseType = "arraybuffer";
	var self = this;
	this.xhr.onload = function() {
		fun(self.xhr.response);
	}
	this.xhr.send();
}

MusicVisualizer.prototype.decode = function(arraybuffer, fun){
	MusicVisualizer.ac.decodeAudioData(arraybuffer, function(buffer){
		fun(buffer);
	}, function(err){
		console.log(err);
	});
}

MusicVisualizer.prototype.play = function(url) {
	var n = ++this.count;
	var self = this;
	this.source && this.stop();
	this.load(url, function(arraybuffer){
		if(n != self.count) return;
		self.decode(arraybuffer, function(buffer){
			if(n != self.count) return;
			var bs = MusicVisualizer.ac.createBufferSource();
			bs.connect(self.analyser);
			bs.buffer = buffer;
			bs[bs.start?"start":"noteOn"](0);
			self.source = bs;
		});
	})
}

MusicVisualizer.prototype.stop = function(){
	this.source[this.source.stop ? "stop":"noteOff"](0);
}

MusicVisualizer.prototype.changeVolume = function(percent){
	this.gainNode.gain.value = percent*percent;
}

MusicVisualizer.prototype.visualize = function(){
	var arr = new Uint8Array(this.analyser.frequencyBinCount);
	
	requestAnimationFrame = window.requestAnimationFrame || 
				       window.webkitRequestAnimationFrame ||
				       window.mozRequestAnimationFrame;
	var self = this;
	//拿到实时音频数据
	function v(){
		self.analyser.getByteFrequencyData(arr);
		//console.log(arr);
		self.visualizer(arr);
		requestAnimationFrame(v);
	}
	requestAnimationFrame(v);
}

//应用加载完毕，为苹果设备添加用户触发的事件
MusicVisualizer.prototype.addinit = function(fun) {
	this.initCallback = fun;
}