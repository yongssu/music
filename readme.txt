������Ŀ
����nodejs

��������
npm install -g express-generator

������ĿĿ¼
express -e music //������Ŀ
npm install //��װ��Ŀ
npm install -g supervisor 

������Ŀ
supervisor bin/www

//�漰����һЩAudio��һЩ�ʼ�
AudioContext
��������AudioNode�����Լ����ǵ���ϵ�Ķ��󣬿������Ϊaudio�����Ķ��󡣾�����������£�һ��document��ֻ��һ��AUdioContext
var ac = new window.AutioContext();
����
destination, AudioDestinationNode����������Ƶ����ۼ��أ��൱����ƵӲ�������е�AudioNode��ֱ�ӻ������ӵ�����
currentTime, AudioContext�Ӵ�����ʼ����ǰ��ʱ�䣨�룩
����
decodeAudioData(arrayBuffer, succ(buffer), err),�첽���������arrayBuffer�е���Ƶ����
createBufferSource(), ����audioBufferSourceNode����
createAnalyser(), ����AnalyserNode����
createGain()/createVainNode(), ����GainNode����

AudioBufferSourceNode����
��ʾ�ڴ��е�һ����Ƶ��Դ������Ƶ���ݴ�����AudioBuffer��(��buffer����)
������var buffersource = ac.createBufferSource();

���ԣ�
buffer, AudioBuffer���󣬱�ʾҪ���ŵ���Ƶ��Դ����
--�����ԣ�duration,����Ƶ��Դ��ʱ��(��)
loop,�Ƿ�ѭ�����ţ�Ĭ��false
onended���ɰ���Ƶ�������ʱ���õ��¼��������
������
start/nodeOn(when=ac.currentTime, offset=0,duration=buffer,duration-offset),��ʼ������Ƶ��
when:��ʱ��ʼ����;
offset:����Ƶ�ĵڼ��뿪ʼ����
duration:���ż���

stop/noteOff(when=ac.currentTime),����������Ƶ

GainNode
�ı������Ķ��󣬻�ı�ͨ��������Ƶ�������е�sample frame���ź�ǿ��
������var gainNode = ac.createGain()/ac.createGainNode()
gain��AudioParam����ͨ���ı���valueֵ���Ըı���Ƶ�źŵ�ǿ�ȣ�Ĭ�ϵ�value����ֵΪ1��ͨ����СֵΪ0�����ֵΪ1����valueֵҲ���Դ���1��С��0


AnalyserNode����
��Ƶ������������ʵʱ������Ƶ��Դ��Ƶ���ʱ����Ϣ�����������Ƶ�����κδ���
������var analyser = ac.createAnalyser();
fftSize,����FFT(FFT����ɢ����Ҷ�任�Ŀ����㷨�����ڽ�һ���źű任��Ƶ��ֵ�Ĵ�С���ڷ����õ�Ƶ��Ϊ32-2048֮��2�������α���Ĭ��Ϊ2048��ʵʱ�õ�����ƵƵƵ������ݸ���ΪfftSize��һ��
frequencyBinCount,FFTֵ��һ�룬��ʵʱ�õ�����ƵƵ������ݸ���
getByteFrequencyData(Uint8Array),������Ƶ��ǰ��Ƶ�����ݣ�������frequencyBinCount)��Uint8Array(8λ�޷������ͻ�����)��
