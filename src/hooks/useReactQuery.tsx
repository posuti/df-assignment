import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { addAll, update as updateItem, add as addItem } from '../features/items/itemsSlice';
import { ApiStatus, Item } from "../shared/types";

const API_URL = process.env.REACT_APP_API_URL as string;

export function useQueryAllItems(dispatch: any) {

    const [status, setStatus] = useState(ApiStatus.connecting);

    useQuery({
        queryKey: ['items'],
        queryFn: () =>
            axios
                .get(`${API_URL}/getAll`)
                .then((res) => {
                    setStatus(ApiStatus.ready);
                    dispatch(addAll(res.data || []));
                    return res.data;
                }),
    })

    return status;
}

export function useAddItemMutation(dispatch: any) {

    return useMutation({
        mutationFn: (newItem:Item) => {
            return axios.post(`${API_URL}/create`, newItem);
        },
        onSuccess: (data, variables, context) => {
            dispatch(addItem({ ...variables, ...data.data }));
        },
    })

}

export function useDeleteItemMutation(dispatch: any) {

    return useMutation({
        mutationFn: (newItem:Item) => {
            return axios.post(`${API_URL}/delete`, newItem);
        },
        onSuccess: (data, variables, context) => {
            dispatch(updateItem({ ...variables, ...data.data }));
        },
    })

}