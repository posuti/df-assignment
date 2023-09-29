import { useEffect, useState } from "react";
import ItemsSocket from "../services/ItemsSocket";

const itemsSocket = new ItemsSocket();

export function useItemsSocket(dispatch: any) {

    const [socketStatus, setSocketStatus] = useState(itemsSocket.status);

    useEffect(() => {
        setSocketStatus(itemsSocket.status);
        itemsSocket.onStatusChangeCallback = (newStatus: string) => { setSocketStatus(newStatus) };
        itemsSocket.onUpdate = (update: any) => { dispatch({ type: "updated", payload: update }); }
    }, [dispatch, setSocketStatus]);

    return socketStatus;

}