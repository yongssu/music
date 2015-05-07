构建项目
环境nodejs

构建命令
npm install -g express-generator

进入项目目录
express -e music //创建项目
npm install //安装项目
npm install -g supervisor 

运行项目
supervisor bin/www

//涉及到的一些Audio的一些笔记
AudioContext
包含各个AudioNode对象以及它们的联系的对象，可以理解为audio上下文对象。绝大所属情况下，一个document中只有一个AUdioContext
var ac = new window.AutioContext();
属性
destination, AudioDestinationNode对象，所有音频输出聚集地，相当于音频硬件，所有的AudioNode都直接或间接连接到这里
currentTime, AudioContext从创建开始到当前的时间（秒）
方法
decodeAudioData(arrayBuffer, succ(buffer), err),异步解码包含在arrayBuffer中的音频数据
createBufferSource(), 创建audioBufferSourceNode对象
createAnalyser(), 创建AnalyserNode对象
createGain()/createVainNode(), 创建GainNode对象

AudioBufferSourceNode对象
表示内存中的一段音频资源，其音频数据存在于AudioBuffer中(其buffer属性)
创建：var buffersource = ac.createBufferSource();

属性：
buffer, AudioBuffer对象，表示要播放的音频资源数据
--子属性：duration,该音频资源的时长(秒)
loop,是否循环播放，默认false
onended，可绑定音频播放完毕时调用的事件处理程序
方法：
start/nodeOn(when=ac.currentTime, offset=0,duration=buffer,duration-offset),开始播放音频。
when:何时开始播放;
offset:从音频的第几秒开始播放
duration:播放几秒

stop/noteOff(when=ac.currentTime),结束播放音频

GainNode
改变音量的对象，会改变通过它的音频数据所有的sample frame的信号强度
创建：var gainNode = ac.createGain()/ac.createGainNode()
gain，AudioParam对象，通过改变其value值可以改变音频信号的强度，默认的value属性值为1，通常最小值为0，最大值为1，器value值也可以大于1，小于0


AnalyserNode对象
音频分析对象，它能实时分析音频资源的频域和时域信息，但不会对音频流做任何处理
创建：var analyser = ac.createAnalyser();
fftSize,设置FFT(FFT是离散傅里叶变换的快速算法，用于将一个信号变换到频域）值的大小用于分析得到频域，为32-2048之间2的整数次被，默认为2048。实时得到的音频频频域的数据个数为fftSize的一半
frequencyBinCount,FFT值的一半，即实时得到的音频频域的数据个数
getByteFrequencyData(Uint8Array),复制音频当前的频域数据（数量是frequencyBinCount)到Uint8Array(8位无符号整型化数组)中
