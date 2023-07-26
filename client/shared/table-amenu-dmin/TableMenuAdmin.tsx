import React, {FC} from 'react';
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {IMenu} from "../../entities/menu/types/menuTypes";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert/Alert";

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

// function createData(
//     name: string,
//     calories: number,
//     fat: number,
//     carbs: number,
//     protein: number,
// ) {
//     return { name, calories, fat, carbs, protein };
// }
//
// const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

interface PropsMenuTable {
    menuCommon: IMenu[];
    isLoadingCommonMenu: boolean;
    errorCommonMenu: string;
}

const TableMenuAdmin: FC<PropsMenuTable> = ({menuCommon, isLoadingCommonMenu, errorCommonMenu}) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 700}} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="left">Id</StyledTableCell>
                        <StyledTableCell align="left">Name</StyledTableCell>
                        <StyledTableCell align="left">Url</StyledTableCell>
                        <StyledTableCell align="left">Order)</StyledTableCell>
                        <StyledTableCell align="left">Parent</StyledTableCell>
                        <StyledTableCell align="left">Menu</StyledTableCell>
                        <StyledTableCell align="left">Updated</StyledTableCell>
                        <StyledTableCell align="left">Edit</StyledTableCell>
                        <StyledTableCell align="left">Delete</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                    //     isLoadingCommonMenu ? (
                    //     <Box sx={{display: 'flex'}}>
                    //         <CircularProgress/>
                    //     </Box>
                    // ) : errorCommonMenu ? (
                    //     <Stack sx={{width: '100%'}} spacing={2}>
                    //         <Alert severity="error">{errorCommonMenu}</Alert>
                    //     </Stack>
                    // ) : (
                        menuCommon.sort((a, b) => a.orderLink - b.orderLink).map(link => (
                            <StyledTableRow key={link.id}>
                                <StyledTableCell component="th" scope="row">
                                    {link.id}
                                </StyledTableCell>
                                <StyledTableCell align="left">{link.nameLink}</StyledTableCell>
                                <StyledTableCell align="left">{link.urlLink}</StyledTableCell>
                                <StyledTableCell align="left">{link.orderLink}</StyledTableCell>
                                <StyledTableCell align="left">{link.parentId}</StyledTableCell>
                                <StyledTableCell align="left">{link.menuId}</StyledTableCell>
                                <StyledTableCell align="left">{link.updatedAt}</StyledTableCell>
                                <StyledTableCell align="left">
                                    Edit
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    Delete
                                </StyledTableCell>
                            </StyledTableRow>
                        ))
                    // )
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TableMenuAdmin;
