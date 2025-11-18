import {
    Card,
    Typography,
    Box,
    useTheme,
} from '@mui/material';
import Inventory2Icon from '@mui/icons-material/Inventory2';

function EmptyStorage() {
    const theme = useTheme();

    return (
        <Card
            className="mb-5 w-full md:w-1/2"
            variant="outlined"
            sx={{
                textAlign: 'center',
                padding: 4,
                bgcolor: theme.palette.background.default
            }}
        >
            <Box className="select-none" sx={{ pt: 2, pr: 2, pl: 2 }}>
                <Box sx={{ color: 'text.secondary', mb: 2 }}>
                    <Inventory2Icon sx={{ fontSize: 60 }} />
                </Box>
                <Typography variant="h5" component="div" gutterBottom>
                    No items in storage
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Get started by uploading your first file to your cloud storage.
                </Typography>
            </Box>
        </Card>
    );
}

export default EmptyStorage;
