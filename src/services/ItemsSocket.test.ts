import ItemsSocket from "./ItemsSocket";

class WebSocketMock {
    listeners: any = {};

    constructor() {
        const _this = this;
        setTimeout(()=> { _this.onOpen(); }, 10);
        setTimeout(()=> { _this.onMessage({}); }, 25);
    }

    addEventListener(event: string, callback: Function) {
        this.listeners[event] = callback;
    }

    onOpen() {
        this.listeners.open && this.listeners.open();
    }

    onMessage(data: any) {
        this.listeners.message && this.listeners.message({ data: JSON.stringify(data) });
    }
}

(global as any).WebSocket = WebSocketMock;

describe('ItemSocket Test', () => {

    jest.useFakeTimers();

    it('calls onStatusChange when connected', () => {

        const itemsSocket = new ItemsSocket();

        const onStatusChange = jest.fn();
        itemsSocket.onStatusChangeCallback = onStatusChange;

        jest.runAllTimers();

        expect(onStatusChange).toHaveBeenCalledWith("connected");

    });

    it('calls onUpdate when recieves a message', () => {

        const itemsSocket = new ItemsSocket();
        const onUpdate = jest.fn();

        itemsSocket.onUpdate = onUpdate;

        jest.runAllTimers();

        expect(onUpdate).toHaveBeenCalled();

    });

});