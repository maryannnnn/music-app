import React, {FC} from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface SnackBarProps {
    openSnackbar: boolean;
    setOpenSnackbar: React.Dispatch<React.SetStateAction<boolean>>;
    severity: string;
    alertMessage: string;
}

const SnackBar: FC<SnackBarProps> = ({openSnackbar, setOpenSnackbar, severity, alertMessage}) => {

    return (
        <Snackbar
            open={openSnackbar}
            autoHideDuration={4000} // Time open window
            onClose={() => setOpenSnackbar(false)}
        >
            <Alert
                onClose={() => setOpenSnackbar(false)}
                severity={severity}
                sx={{width: '100%'}}
            >
                {alertMessage}
            </Alert>
        </Snackbar>
    );
};

export default SnackBar;