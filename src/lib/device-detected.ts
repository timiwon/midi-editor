import { useMediaQuery, useTheme } from '@mui/material';

export enum SupportedDevice {
    Mobile = 'mobile',
    Tablet = 'tablet'
}

export function detectDevice (deviceType: SupportedDevice) {
    const theme = useTheme();
    let isMatching = false;

    switch(deviceType) {
        case SupportedDevice.Mobile:
            isMatching = useMediaQuery(theme.breakpoints.down('sm'));
            break;
        case SupportedDevice.Tablet:
            isMatching = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    }
    return isMatching;
}