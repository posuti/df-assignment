import useWebSocket, { ReadyState } from "react-use-websocket";
import { SocketStatus } from "../shared/types";

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL as string;

export default function useReactWebsocket(onMessage:(event: WebSocketEventMap['message']) => void) {

    const { readyState } = useWebSocket(SOCKET_URL, {
        onMessage: onMessage
    });

    const connectionStatus = {
        [ReadyState.CONNECTING]: SocketStatus.connecting,
        [ReadyState.OPEN]: SocketStatus.ready,
        [ReadyState.CLOSING]: SocketStatus.connecting,
        [ReadyState.CLOSED]: SocketStatus.connecting,
        [ReadyState.UNINSTANTIATED]: SocketStatus.connecting,
    }[readyState];

    return connectionStatus;

}