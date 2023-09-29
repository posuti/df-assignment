import { useItemsContext } from "../contexts/ItemsProvider";
import { Item } from "../shared/types";
import { useAddItemMutation, useDeleteItemMutation } from "./useReactQuery";

export const useAddItem = () => {
    const { dispatch } = useItemsContext();
    const mutation = useAddItemMutation(dispatch);
    return (newItem: Item) => {
        return mutation.mutateAsync(newItem);
    }
}

export const useDeleteItem = () => {
    const { dispatch } = useItemsContext();
    const mutation = useDeleteItemMutation(dispatch);
    return (item: Item) => {
        return mutation.mutateAsync(item);
    }
}