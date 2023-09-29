
import { Box, Button, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { ApiStatus, Item, ItemStatus } from '../shared/types';

function ItemsTable({ status, items, onDelete }: { status: ApiStatus, items: Item[], onDelete: (itemId: string) => void }) {

    if (status === ApiStatus.connecting) return (
        <CenteredBox data-testid="connectingContainer">
            <CircularProgress />
        </CenteredBox>
    );

    if (status === ApiStatus.error) return (
        <CenteredBox data-testid="errorContainer">
            Failed to fetch data...
        </CenteredBox>
    );

    if (!items.length) return (
        <CenteredBox data-testid="placeholderContainer">
            No Items
        </CenteredBox>
    )

    return (
        <TableContainer data-testid="itemsTable" className="app-panel" component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell width={300}>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell width={10}>Time</TableCell>
                        <TableCell width={70}>Status</TableCell>
                        <TableCell width={50}></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((item: any) => (
                        <TableRow
                            key={item.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {item.id}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {item.name ?? `Item ${item.id}`}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {item.creationTimeSec}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                <ItemStatusDisplay status={item.status} />
                            </TableCell>
                            <TableCell component="th" scope="row">
                                <ItemControls status={item.status} onDelete={() => onDelete(item.id)} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export function ItemControls({ status, onDelete }: { status: ItemStatus, onDelete: Function }) {
    return <Button
        disabled={status !== ItemStatus.ready}
        size="small"
        color="warning"
        onClick={() => { onDelete() }}
        variant="outlined">
        Delete
    </Button>
}

export function ItemStatusDisplay({ status }: { status: ItemStatus }) {
    if (status === ItemStatus.ready) return (<>{status}</>);
    else if (status === ItemStatus.deleted) return (<>{status}</>);
    else return (<CircularProgress size={20} />);
}

function CenteredBox(props: any) {
    return (<Box
        {...props}

        width="100%"
        height={props.height ?? "400px"}
        display="flex"
        justifyContent="center"
        alignItems="center"
        border={props.border ?? "1px dashed gray"}
        color="#FFF"
    >
        {props.children}
    </Box>)
}

export default ItemsTable;
