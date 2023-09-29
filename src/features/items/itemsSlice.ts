import { createSlice } from "@reduxjs/toolkit"
import { Item } from "../../shared/types"

export const itemsSlice = createSlice({
    name: 'items',
    initialState: [],
    reducers: {
        addAll: (state:Item[], action) => {
            state.length = 0
            action.payload.forEach((item:any) => {
                state.push(item);
            });
        },
        add: (state:Item[], action) => {
            state.push(action.payload);
        },
        update: (state:Item[], action) => {
            const updatedItem = action.payload;
            const index = state.findIndex((d: Item) => d.id === updatedItem.id);
            if (index > -1) {
                state[index] = { ...state[index], status: updatedItem.status };
            } else {
                state.push(updatedItem);
            }
        }
    }
})

export const { addAll, add, update } = itemsSlice.actions

const itemsReducer = itemsSlice.reducer

export default itemsReducer