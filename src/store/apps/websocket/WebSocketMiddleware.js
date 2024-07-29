// websocketMiddleware.js
export const websocketMiddleware = (store) => {
    let socket = null;

    return (next) => (action) => {
        switch (action.type) {
            case 'websocket/connect':
                if (socket !== null) {
                    socket.close();
                }
                socket = new WebSocket(action.payload);
                socket.onmessage = (event) => {
                    const message = JSON.parse(event.data);
                    store.dispatch({ type: 'websocket/receiveMessage', payload: message });
                };
                break;

            case 'websocket/disconnect':
                if (socket !== null) {
                    socket.close();
                }
                socket = null;
                break;

            case 'websocket/sendMessage':
                if (socket !== null) {
                    socket.send(JSON.stringify(action.payload));
                }
                break;

            default:
                break;
        }

        return next(action);
    };
};
