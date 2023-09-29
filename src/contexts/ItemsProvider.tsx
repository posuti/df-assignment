import { useEffect, useState, useReducer, useContext } from 'react';
import { ReactNode, createContext } from "react";
import { ApiStatus, Item } from '../shared/types';
import { useItemsSocket } from '../hooks/useItemsSocketApi';
import ItemsApi from '../services/ItemsApi';

interface Props {
    children: ReactNode;
}

export const ItemsProvider = (props: Props) => {

    const [items, dispatch] = useReducer(itemsReducer, []);
    const [status, setStatus] = useState(ApiStatus.connecting);

    const socketStatus = useItemsSocket(dispatch);

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

    const contextValue = { items, status, socketStatus, dispatch };
    return <ItemsContext.Provider value={contextValue}>{props.children}</ItemsContext.Provider>
}

const ItemsContext = createContext( {} as any );
export const useItemsContext = () => useContext(ItemsContext);

function itemsReducer(state: any, action: any) {
    switch (action.type) {
        case 'inited':
            const items = action.payload || [];
            return [ ...items ];
        case 'added':
            return [...state, { ...action.payload },
            ];
        case 'updated':
            const updatedItem = action.payload;
            const index = state.findIndex((d: Item) => d.id == updatedItem.id);
            if (index > -1) {
                return state.map((item: Item) => item.id == updatedItem.id ? { ...item, status: updatedItem.status } : { ...item });
            } else {
                return [...state, updatedItem];
            }
        default:
            return state;
    }
}