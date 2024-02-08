import React, {FC} from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {AlertColor} from '@mui/material/Alert';

interface SnackBarProps {
    snackbar: {
        openSnackbar: boolean;
        severity: AlertColor;
        alertMessage: string;
    }
    setSnackbar: React.Dispatch<React.SetStateAction<{openSnackbar: boolean, severity: AlertColor, alertMessage: string}>>;
}

const SnackBar: FC<SnackBarProps> = ({snackbar, setSnackbar}) => {

    return (
        <Snackbar
            open={snackbar.openSnackbar}
            autoHideDuration={4000}
            onClose={() => setSnackbar({openSnackbar: false, severity: 'success', alertMessage: 'Successfully!'})}
        >
            <Alert
                onClose={() => setSnackbar({openSnackbar: false, severity: 'success', alertMessage: 'Successfully!'})}
                severity={snackbar.severity}
                sx={{width: '100%'}}
            >
                {snackbar.alertMessage}
            </Alert>
        </Snackbar>
    );
};

export default SnackBar;