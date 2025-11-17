import { Box, Skeleton, Stack } from "@mui/material";

const SongManagementSkeleton = () => {
    return (<>
        <Box sx={{ mb: 3 }}>
            <Stack
                direction="row"
                sx={{ justifyContent: 'space-between', alignItems: 'center' }}
            >
                <Skeleton className="mb-0.5" width={300} height={32} variant="rectangular" />
                <Skeleton width={120} height={32} variant="rectangular" />
            </Stack>
            <Skeleton width={80} height={18} variant="rectangular" sx={{ mb: '2px' }} />
            <Skeleton width={150} height={18} variant="rectangular" sx={{ mb: '8px' }} />
            <Skeleton width={80} height={25} variant="rectangular" />
        </Box>
        <Box sx={{ mb: 5 }}>
            <Skeleton width={400} height={25} variant="rectangular"/>
        </Box>
    </>)
};

export default SongManagementSkeleton;
