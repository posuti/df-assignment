
import { Box, Button, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import { useAddItem } from '../hooks/useItemsApi';

function NewItemForm() {

    const [name, setName] = useState('');
    const [creationTime, setCreationTime] = useState(5);
    const addItem = useAddItem();
    const [loading, setLoading] = useState(false);

    function onCreate() {
        setName('');
        setLoading(true);
        addItem({
            name: name,
            creationTimeSec: creationTime
        }).then(() => {
            setLoading(false);
        })
    }

    return (
        <>
            <Grid container spacing={2} alignItems="center" >
                <Grid item xs={3}>
                    <TextField
                        size="small"
                        label="Item Name"
                        variant="filled"
                        InputLabelProps={{ shrink: true }}
                        disabled={loading}
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        size="small"
                        label="Creation Time"
                        variant="filled"
                        InputLabelProps={{ shrink: true }}
                        disabled={loading}
                        placeholder='Time Sec'
                        fullWidth value={creationTime}
                        onChange={(e) => setCreationTime(parseInt(e.target.value))}
                    />
                </Grid>
                <Grid item xs={7}>
                    <Box display="flex" justifyContent="flex-end">
                        <Button disabled={loading} variant='contained' onClick={onCreate}>Create Item</Button>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}

export default NewItemForm;
