import { useItemsContext } from "../contexts/ItemsProvider";
import ItemsApi from "../services/ItemsApi";
import { Item, ItemStatus } from "../shared/types";

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