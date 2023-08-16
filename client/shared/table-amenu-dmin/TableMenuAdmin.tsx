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
import {Box, IconButton, TableFooter, TablePagination} from "@mui/material";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@mui/icons-material";
import { useTheme } from '@mui/material/styles';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
        event: React.MouseEvent<HTMLButtonElement>,
        newPage: number,
    ) => void;
}

const TablePaginationActions = ({ count, page, rowsPerPage, onPageChange }: TablePaginationActionsProps) => {
    const theme = useTheme();

    const handleFirstPageButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

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

interface PropsMenuTable {
    menuCommon: IMenu[];
    isLoadingCommonMenu: boolean;
    errorCommonMenu: string;
}

const TableMenuAdmin: FC<PropsMenuTable> = ({menuCommon, isLoadingCommonMenu, errorCommonMenu}) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - menuCommon.length) : 0;

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
            {isLoadingCommonMenu ? (
                <h3 className="m-10">...Loading</h3>
            ) : errorCommonMenu ? (
                <h3 className="p-4 bg-red-200">{errorCommonMenu}</h3>
            ) : menuCommon.length > 0 ? (
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 700}} aria-label="custom pagination table">
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
                            {(rowsPerPage > 0
                                    ? menuCommon.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : menuCommon
                            ).sort((a, b) => a.orderLink - b.orderLink).map(link => (
                                <StyledTableRow key={link.id}>
                                    <StyledTableCell component="th" scope="row">
                                        {link.id}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{link.nameLink}</StyledTableCell>
                                    <StyledTableCell align="left">{link.urlLink}</StyledTableCell>
                                    <StyledTableCell align="left">{link.orderLink}</StyledTableCell>
                                    <StyledTableCell align="left">{link.parentId}</StyledTableCell>
                                    <StyledTableCell align="left">{link.menuId}</StyledTableCell>
                                    <StyledTableCell align="left">{(link.updatedAt).toLocaleString('en-US')}</StyledTableCell>
                                    <StyledTableCell align="left">
                                        Edit
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        Delete
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                    colSpan={3}
                                    count={menuCommon.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        inputProps: {
                                            'aria-label': 'rows per page',
                                        },
                                        native: true,
                                    }}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>

            ) : (
                <div className="m-10">There are no links in this menu.</div>
            )
            }
        </>
    );
}

export default TableMenuAdmin;
