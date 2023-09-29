
import { useItemsContext } from '../contexts/ItemsProvider';
import ItemsTable from './ItemsTable';
import { Item } from '../shared/types';
import SoccetStatusPanel from './SocketStatusPanel';
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
            <SoccetStatusPanel status={socketStatus} />
            <ItemsTable status={status} items={items as Item[]} onDelete={(itemId: string) => onDelete(itemId)} />
        </>
    );

}

export default ItemsPanel;

