import {
    Card,
    CardContent,
    Typography,
    Box,
    useTheme,
} from '@mui/material';
import Inventory2Icon from '@mui/icons-material/Inventory2';

function EmptyStorage() {
    const theme = useTheme();

    return (
        <Card
            variant="outlined"
            sx={{
                maxWidth: 400,
                textAlign: 'center',
                padding: 4,
                bgcolor: theme.palette.background.default
            }}
        >
            <CardContent>
                <Box sx={{ color: 'text.secondary', mb: 2 }}>
                    <Inventory2Icon sx={{ fontSize: 60 }} />
                </Box>
                <Typography variant="h5" component="div" gutterBottom>
                    No items in storage
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Get started by uploading your first file to your cloud storage.
                </Typography>
            </CardContent>
        </Card>
    );
}

export default EmptyStorage;
