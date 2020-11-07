export const socket = new WebSocket('wss://fep-app.herokuapp.com/');

export const API = {

    sendMessage: (name, message) => {
        socket.send(JSON.stringify({
            type: 'message',
            payload: {
                username: name,
                message: message,
            }
        }));
    },
}

socket.onopen = () => {
    console.log('socket opened');
}

socket.onclose = () => {
    console.log('socket closed');
}

socket.onerror = () => {
    console.log('smth wrong');
}