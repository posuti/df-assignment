import { SocketStatus } from "../shared/types";

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL as string;
const SOCKET_RECONNECTION_TIMEOUT = 1000;

export default class ItemsSocket {

    private socket: WebSocket;
    status: string;
    onStatusChangeCallback: any;
    onUpdate: any;

    constructor() {
        this.status = SocketStatus.connecting;
        this.socket = new WebSocket(SOCKET_URL);
        this.addEventListeners();
    }

    private addEventListeners() {
        this.socket.addEventListener("open", () => this.onStatusChange(SocketStatus.ready));
        this.socket.addEventListener("error", () => this.onError() );
        this.socket.addEventListener("message", (message) => this.onMessage(JSON.parse(message.data)) );
        this.socket.addEventListener("close", () => this.onClose() );
    }

    private onStatusChange(status: string) {
        this.status = status;
        if (this.onStatusChangeCallback) this.onStatusChangeCallback(status);
    }

    private onMessage(update: any) {
        if (this.onUpdate) this.onUpdate(update);
    }

    private onError() {
        if (this.onStatusChange) this.onStatusChange(SocketStatus.error);
    }

    private onClose() {
        this.onStatusChange(SocketStatus.connecting);
        setTimeout(() => {
            this.socket = new WebSocket(SOCKET_URL);
            this.addEventListeners();
        }, SOCKET_RECONNECTION_TIMEOUT);
    }

}