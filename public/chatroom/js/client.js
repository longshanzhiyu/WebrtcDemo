'use strict'

//
var userName = document.querySelector('input#username');
var inputRoom = document.querySelector('input#room');
var btnConnect = document.querySelector('button#connect');
var btnLeave = document.querySelector('button#leave');
var outputArea = document.querySelector('textarea#output');
var inputArea = document.querySelector('textarea#input');
var btnSend = document.querySelector('button#send');

var socket;
var room;

btnConnect.onclick = ()=>{
	const socket = io.connect();

	// 监听消息
	socket.on('message', (msg) => {
		console.log('client on message:' + msg);
	})

	// 发送消息
	var sendMessage = () => {
		console.log('发送消息');
		socket.emit('message', 'test msg');
	}
}

btnSend.onclick = ()=>{
	var data = inputArea.value;
	data = userName.value + ':' + data;
	socket.emit('message', room, data);
	inputArea.value = '';
}

btnLeave.onclick = ()=>{
	room = inputRoom.value;
	socket.emit('leave', room);
}

inputArea.onkeypress = (event)=> {
    //event = event || window.event;
    if (event.keyCode == 13) { //回车发送消息
	var data = inputArea.value;
	data = userName.value + ':' + data;
	socket.emit('message', room, data);
	inputArea.value = '';
	event.preventDefault();//阻止默认行为
    }
}