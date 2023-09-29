
import { Alert, Box } from '@mui/material';
import { useItemsContext } from '../contexts/ItemsProvider';
import ItemsTable from './ItemsTable';
import { Item } from '../shared/types';
import { useDeleteItem } from '../hooks/useItemsApi';

function ItemsPanel() {

    const { items, status, socketStatus } = useItemsContext();
    const deleteItem = useDeleteItem();

    function onDelete(itemId: string) {
        deleteItem({
            id: itemId,
            deletionTimeSec: 3
        })
    }

    return (
        <>
            <SoccetStatus status={socketStatus} />
            <ItemsTable status={status} items={items as Item[]} onDelete={(itemId: string) => onDelete(itemId)} />
        </>
    );

}

export default ItemsPanel;

function SoccetStatus({ status }: { status: string }) {

    if (status === "connected") return (
        <Box sx={{ width: '100%' }}>
            <Alert sx={{ mb: 2 }} > Soccet status: connected </Alert>
        </Box>
    );

    return (
        <Box sx={{ width: '100%' }}>
            <Alert sx={{ mb: 2 }} severity="warning">Soccet status: {status}</Alert>
        </Box>
    )
}