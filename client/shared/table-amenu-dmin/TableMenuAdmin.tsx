import React, {FC, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {IMenu} from "../../entities/menu/types/menuTypes";
import {CircularProgress, IconButton} from "@mui/material";
import Pagination from "../pagination/Pagination";
import {StyledTableCell, StyledTableRow} from "./Styles";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalForm from "../modal/Modal";
import FormMenuEdit from "../../features/form-menu-edit/FormMenuEdit";
import SnackBar from "../snack-bar/SnackBar";

interface PropsMenuTable {
    menuCommon: IMenu[];
    isLoadingCommonMenu: boolean;
    errorCommonMenu: string;
}

const TableMenuAdmin: FC<PropsMenuTable> = ({menuCommon, isLoadingCommonMenu, errorCommonMenu}) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [modalOpenEdit, setModalOpenEdit] = useState(false);
    const [linkEdit, setLinkEdit] = useState({} as IMenu)
    const [openSnackbarEdit, setOpenSnackbarEdit] = useState(false);
    const [severityEdit, setSeverityEdit] = useState('');
    const [alertMessageEdit, setAlertMessageEdit] = useState('')

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

    const handleEdit = (link: IMenu) => {
        setLinkEdit(link)
        setModalOpenEdit(true)
    }

    const handleDelete = () => {
        console.log('handleDelete')
    }

    return (
        <>
            {isLoadingCommonMenu ? (
                <CircularProgress/>
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
                                    <StyledTableCell
                                        align="left">{(link.updatedAt).toLocaleString('en-US')}</StyledTableCell>
                                    <StyledTableCell align="left">
                                        <IconButton aria-label="edit" onClick={() => handleEdit(link)}>
                                            <EditIcon />
                                        </IconButton>
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        <IconButton aria-label="delete" onClick={handleDelete}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                        <Pagination data={menuCommon} page={page} rowsPerPage={rowsPerPage}
                                    handleChangePage={handleChangePage}
                                    handleChangeRowsPerPage={handleChangeRowsPerPage}/>
                    </Table>
                </TableContainer>

            ) : (
                <div className="m-10">There are no links in this menu.</div>
            )
            }
            <ModalForm modalOpen={modalOpenEdit} setModalOpen={setModalOpenEdit}>
                <FormMenuEdit
                    setModalOpen={setModalOpenEdit}
                    link={linkEdit}
                    setOpenSnackbar={setOpenSnackbarEdit}
                    setSeverity={setSeverityEdit}
                    setAlertMessage={setAlertMessageEdit}
                    menuCommon={menuCommon}
                />
            </ModalForm>
            <SnackBar openSnackbar={openSnackbarEdit} setOpenSnackbar={setOpenSnackbarEdit} severity={severityEdit}
                      alertMessage={alertMessageEdit}/>
        </>
    );
}

export default TableMenuAdmin;