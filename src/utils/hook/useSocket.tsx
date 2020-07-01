import io from "socket.io-client";
import { useEffect, useRef } from "react";

/**
 * socket对象
 */
interface SocketClient {
    url: string;
}

function useSocket(props: SocketClient) {
    const { url } = props;
    const socketsRef: React.RefObject<SocketIOClient.Socket> = useRef<SocketIOClient.Socket>(null);
    let sockets = socketsRef.current;
    useEffect(() => {
        sockets = io(url);
        // sockets.on('connect', (data: any) => {
        //     console.log('socket connect success')
        //     sockets.emit('s')
        // })
    });

    return [sockets];
}

export default useSocket;
