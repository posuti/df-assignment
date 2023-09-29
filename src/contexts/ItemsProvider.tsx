import { useContext } from 'react';
import { ReactNode, createContext } from "react";
import { Item } from '../shared/types';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { update as updateItem } from '../features/items/itemsSlice';
import { useAddItemMutation, useDeleteItemMutation, useQueryAllItems } from '../hooks/useReactQuery';
import useReactWebsocket from '../hooks/useReactWebsocket';

interface Props {
    children: ReactNode;
}

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

const ItemsContext = createContext({} as any);
export const useItemsContext = () => useContext(ItemsContext);

export const ItemsProvider = (props: Props) => {

    const items = useAppSelector(state => state.items);
    const dispatch = useAppDispatch();

    const status = useQueryAllItems(dispatch);
    const socketStatus = useReactWebsocket( (event: WebSocketEventMap['message']) => {
        dispatch(updateItem(JSON.parse(event.data)));
    });

    const contextValue = { items, status, socketStatus, dispatch };
    return (
        <ItemsContext.Provider value={contextValue}>
            {props.children}
        </ItemsContext.Provider>
    );

}