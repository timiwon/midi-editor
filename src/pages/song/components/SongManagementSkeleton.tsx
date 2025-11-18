import { Box, Skeleton } from "@mui/material";

import { useUtils } from "@/hooks";

const SongManagementSkeleton = () => {
    const { isMobile } = useUtils();
    const gridTemplateAreas = !isMobile ?
        `
            "main main main action"
            "contain contain contain contain"
        ` :
        `
            "main main main main"
            "contain contain contain contain"
            ". . . action"
        `;
    return (<>
        <Box sx={{ mb: 3 }}>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: 1,
                    gridTemplateRows: 'auto',
                    gridTemplateAreas,
                }}
            >
                <Box sx={{ gridArea: 'main' }}>
                    <Skeleton className="mb-0.5" width={300} height={32} variant="rectangular" />
                </Box>
                <Box sx={{ gridArea: 'action', display: 'flex', justifyContent: 'flex-end' }}>
                    <Skeleton width={isMobile ? 60 : 120} height={32} variant="rectangular" sx={{ mr: 1 }} />
                    <Skeleton width={isMobile? 60 : 120} height={32} variant="rectangular" />
                </Box>
                <Box sx={{ gridArea: 'contain' }}>
                    <Skeleton width={80} height={18} variant="rectangular" sx={{ mb: '2px' }} />
                    <Skeleton width={80} height={25} variant="rectangular"  sx={{ mb: '8px' }}/>
                    <Skeleton width={150} height={18} variant="rectangular" sx={{ mb: '8px' }} />
                </Box>

            </Box>
        </Box>

        <Box sx={{ mb: 5 }}>
            <Skeleton width={400} height={25} variant="rectangular" />
        </Box>
    </>)
};

export default SongManagementSkeleton;
