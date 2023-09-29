import { useEffect, useState } from "react";
import { useItemsContext } from "../contexts/ItemsProvider";
import ItemsApi from "../services/ItemsApi";
import { ApiStatus, Item, ItemStatus } from "../shared/types";

export const useGetAllItems = (dispatch:Function) => {
    const [status, setStatus] = useState(ApiStatus.connecting);

    useEffect(() => {
        setStatus(ApiStatus.connecting);
        let abort = false;
        ItemsApi.GetAllItems().then((newItems: any) => {
            if (abort) return;
            setStatus(ApiStatus.ready);
            dispatch({ type: "inited", payload: newItems });
        }, (err) => setStatus(ApiStatus.error))
        return (() => { abort = true })
    }, []);

    return status;
}

export const useAddItem = () => {
    const { dispatch } = useItemsContext();
    return (newItem: Item) => {
        const promise = ItemsApi.AddItem(newItem);
        promise.then((item: any) => {
            dispatch({ type: "updated", payload: { ...newItem, ...item } });
        }).catch(e => {
            console.log(e);
        });
        return promise;
    }
}

export const useDeleteItem = () => {
    const { dispatch } = useItemsContext();
    return (item: Item) => {
        const promise = ItemsApi.DeleteItem(item);
        promise.then((updatedItem: any) => {
            dispatch({ type: "updated", payload: { ...item, status: ItemStatus.pending } });
        }).catch(e => {
            dispatch({ type: "updated", payload: { ...item, status: ItemStatus.pending } });
        });
        return promise;
    }
}