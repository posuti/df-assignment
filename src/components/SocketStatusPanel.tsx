import { Alert, Box } from "@mui/material";


export default function SoccetStatusPanel({ status }: { status: string }) {

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