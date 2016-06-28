// 'use strict';
const socket = io();
const bodyElement = document.querySelector('body');
const h6Element = document.querySelector('h6');

let room = document.cookie.slice(5);

socket.on('connect', () => {
  h6Element.innerHTML = `Socket connection, in ${room}`;
  socket.emit('createRoom', room);
});
socket.on('tap', changeBody);

function changeBody () {
	if (bodyElement.classList.contains('class1')) {
		bodyElement.classList.remove('class1');
		bodyElement.classList.add('class2');
		bodyElement.innerHTML = "Project-start Works!"
	} else {
		bodyElement.classList.remove('class2');
		bodyElement.classList.add('class1');
		bodyElement.innerHTML = "Hello, EchoLoJS"
	}
}

//use browser event to change class
// document.addEventListener('click', changeBody, false);
