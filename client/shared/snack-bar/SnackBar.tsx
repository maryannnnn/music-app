import React, {FC, useState} from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const SnackBar: FC = () => {
    const [openSnackbar, setOpenSnackbar] = useState(true);

    return (
        <Snackbar
            open={openSnackbar}
            autoHideDuration={4000} // Time open window
            onClose={() => setOpenSnackbar(false)}
        >
            <Alert
                onClose={() => setOpenSnackbar(false)}
                severity="success"
                sx={{width: '100%'}}
            >
                Successfully added!
            </Alert>
        </Snackbar>
    );
};

export default SnackBar;