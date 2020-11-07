import '../../src/css/style.css';

import {socket} from './api';
import {API} from './api';

$(() => {
    const $sendMsgBtn = $('#send-btn');
    const $userName = $('#user-name');
    const $userMessage = $('#user-message');
    const $chatWindow = $('#chat-window');

    $sendMsgBtn.on('click', onSendMsgBtnClick)

    function onSendMsgBtnClick() {
        API.sendMessage($userName.val(), $userMessage.val());
        clearMessage();
    }

    socket.onmessage = (msg) => {
        const newMsg = JSON.parse(msg.data);
        $chatWindow.append(getMsgTemplate(newMsg));
    }

    function getMsgTemplate(msg) {
        return `<div class="new-msg"> <b>${msg.payload.username}</b> : ${msg.payload.message} </div>`
    }

    function clearMessage() {
        $userMessage.val('');
    }

})