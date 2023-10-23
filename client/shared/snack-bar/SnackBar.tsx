import React, {FC} from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface SnackBarProps {
    snackbar: {
      openSnackbar: boolean;
      severity: string;
      alertMessage: string;
    }
    setSnackbar: React.Dispatch<React.SetStateAction<{}>>;
}

const SnackBar: FC<SnackBarProps> = ({snackbar, setSnackbar}) => {

    return (
        <Snackbar
            open={snackbar.openSnackbar}
            autoHideDuration={4000} // Time open window
            onClose={() => setSnackbar({openSnackbar: false})}
        >
            <Alert
                onClose={() => setSnackbar({openSnackbar: false})}
                severity={snackbar.severity}
                sx={{width: '100%'}}
            >
                {snackbar.alertMessage}
            </Alert>
        </Snackbar>
    );
};

export default SnackBar;