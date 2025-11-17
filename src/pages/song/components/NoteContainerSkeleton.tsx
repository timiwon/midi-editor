import { Skeleton } from "@mui/material";

import { useUtils } from "@/hooks";

const NoteContainerSkeleton = () => {
    const {isMobile} = useUtils();
    const width = isMobile ? 400 : 1020;
    const height = isMobile ? 200 : 300;

    return (<>
        <Skeleton className="mb-0.5" width={width} height={height} variant="rectangular"/>
    </>)
};

export default NoteContainerSkeleton;
