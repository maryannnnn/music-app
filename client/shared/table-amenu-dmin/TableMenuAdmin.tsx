import React, {FC, useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {IMenu} from "../../entities/menu/types/menuTypes";
import {Checkbox, CircularProgress, IconButton, Select} from "@mui/material";
import Pagination from "../pagination/Pagination";
import {StyledTableCell, StyledTableRow} from "./Styles";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import ModalForm from "../modal/Modal";
import FormMenuEdit from "../../features/form-menu-edit/FormMenuEdit";
import SnackBar from "../snack-bar/SnackBar";
import AlertMenuDelete from "../../features/alert-menu-delete/AlertMenuDelete";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FormMenuCreate from "@/features/form-menu-create/FormMenuCreate";
import {useActions} from "@/app/story/hooks/useActions";
import {useTypedSelector} from "@/app/story/hooks/useTypedSelector";
import {validateNumberField, validateStringField} from "@/app/utils/validation";
import {validationSchemaMenu} from "@/features/form-menu-edit/validation-menu";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import {selectOptionsNumber} from "@/shared/select-options/select-options";
import MenuItem from "@mui/material/MenuItem";

interface PropsMenuTable {
    menuId: number;
}

const TableMenuAdmin: FC<PropsMenuTable> = ({menuId}) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [snackbar, setSnackbar] = useState({openSnackbar: false, severity: '', alertMessage: ''}) 
    const [modalOpenCreate, setModalOpenCreate] = useState(false);
    const [modalOpenEdit, setModalOpenEdit] = useState(false);
    const [modalOpenDelete, setModalOpenDelete] = useState(false);
    const [linkEdit, setLinkEdit] = useState({} as IMenu)
    const [linkDelete, setLinkDelete] = useState({} as IMenu)
    const [isDisableAdd, setIsDisableAdd] = useState(true)
    const [isDisableSave, setIsDisableSave] = useState(true)
    const [errors, setErrors] = useState({nameLink: '', urlLink: ''});

    const {editMenuAction, getMenuCommonAction, getMenuTopAction} = useActions();
    const {errorMenuEdit, successMenuEdit} = useTypedSelector(state => state.menuEditReducer);
    const {isLoadingCommonMenu, errorCommonMenu, menuCommon} = useTypedSelector(state => state.menuCommonReducer);
    const [formLinks, setFormLinks] = useState(menuCommon);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - menuCommon.length) : 0;

    useEffect(() => {
        if (menuId > 0) {
            setIsDisableAdd(false)
            getMenuCommonAction(menuId);
        } else {
          setIsDisableAdd(true)
          getMenuCommonAction(menuId);
        }
    }, [menuId])

    useEffect(() => {
        setFormLinks(menuCommon)
    }, [menuCommon])

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

    const handleModalCreateOpen = () => {
        setModalOpenCreate(true)
    }

    const handleEdit = (link: IMenu) => {
        setLinkEdit(link)
        setModalOpenEdit(true)
    }

    const handleDelete = (link: IMenu) => {
        setLinkDelete(link)
        setModalOpenDelete(true)
    }

    const changeHandlerLinks = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        const { name, value, checked, type } = e.target;

        if (type === 'text') {
            validateStringField({
                fieldName: name,
                value: value,
                validationSchema: validationSchemaMenu,
                setErrors: setErrors,
                form: formLinks.find(link => link.id === id) // Находим объект по id
            });
        } else if (type === 'number') {
            validateNumberField({
                fieldName: name,
                value: Number(value),
                validationSchema: validationSchemaMenu,
                setErrors: setErrors,
                form: formLinks.find(link => link.id === id) // Находим объект по id
            });
        }

        setErrors({ ...errors, [name]: '' });

        setFormLinks((prevFormLinks) => {
            const updatedFormLinks = [...prevFormLinks];
            const linkToUpdate = updatedFormLinks.find(link => link.id === id);
            if (linkToUpdate) {
                if (type === 'checkbox') {
                    linkToUpdate[name] = checked;
                } else {
                    linkToUpdate[name] = value;
                }
            }
            return updatedFormLinks;
        });
        setIsDisableSave(false);
    };

    const handleSaveTable = async () => {
        await editMenuAction(formLinks)
        if(successMenuEdit) {
            setSnackbar({openSnackbar: true, severity: 'success', alertMessage: 'Successfully edited!'})
            await getMenuCommonAction(menuId);
            if (menuId === 1) {
              await getMenuTopAction(menuId);
            }
        } else if(errorMenuEdit !== '') {
            setSnackbar({openSnackbar: true, severity: 'error', alertMessage: `Error: ${errorMenuEdit}`})
        }
        setIsDisableSave(true)
    }

    return (
        <>
            <div className="p-4 flex flex-row gap-x-4">
                <Button variant="text" onClick={handleModalCreateOpen} startIcon={<AddCircleIcon/>}
                        disabled={isDisableAdd}>Add link</Button>
                <Button variant="text" onClick={handleSaveTable} startIcon={<SaveIcon/>}
                        disabled={isDisableSave}>Save Table</Button>
            </div>
            {isLoadingCommonMenu ? (
                <CircularProgress/>
            ) : errorCommonMenu !=='' ? (
                <h3 className="p-4 bg-red-200">{errorCommonMenu}</h3>
            ) : menuCommon.length > 0 ? (
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 700}} aria-label="custom pagination table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="left">Id</StyledTableCell>
                                <StyledTableCell align="left">Name</StyledTableCell>
                                <StyledTableCell align="left">Url</StyledTableCell>
                                <StyledTableCell align="left">Order</StyledTableCell>
                                <StyledTableCell align="left">Parent</StyledTableCell>
                                <StyledTableCell align="left">Visible</StyledTableCell>
                                <StyledTableCell align="left">Menu</StyledTableCell>
                                <StyledTableCell align="left">Updated</StyledTableCell>
                                <StyledTableCell align="left">Edit</StyledTableCell>
                                <StyledTableCell align="left">Delete</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                    ? formLinks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : formLinks
                            ).sort((a, b) => a.orderLink - b.orderLink).map((link) => (
                                <StyledTableRow key={link.id}>
                                    <StyledTableCell component="th" scope="row">
                                        {link.id}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{link.nameLink}</StyledTableCell>
                                    <StyledTableCell align="left">{link.urlLink}</StyledTableCell>
                                    <FormControl sx={{m: 1, minWidth: 100}}>
                                        <InputLabel id="orderLink">Order Link</InputLabel>
                                        <Select
                                            required
                                            name="orderLink"
                                            type="number"
                                            fullWidth
                                            value={link.orderLink}
                                            label="Order Link"
                                            onChange={(e) => changeHandlerLinks(e, link.id)}
                                        >
                                            {selectOptionsNumber.map((item, index) => (
                                                <MenuItem key={index} value={item.value}>{item.value}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <StyledTableCell align="left">{link.parentId}</StyledTableCell>
                                    <StyledTableCell align="left">
                                        <div>{link.isVisible}</div>
                                        <Checkbox
                                            checked={link.isVisible}
                                            name="isVisible"
                                            onChange={(e) => changeHandlerLinks(e, link.id)}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{link.menuId}</StyledTableCell>
                                    <StyledTableCell
                                        align="left">{(link.updatedAt).toLocaleString('en-US')}</StyledTableCell>
                                    <StyledTableCell align="left">
                                        <IconButton aria-label="edit" onClick={() => handleEdit(link)}>
                                            <EditIcon/>
                                        </IconButton>
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        <IconButton aria-label="delete" onClick={() => handleDelete(link)}>
                                            <DeleteIcon/>
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
            <ModalForm modalOpen={modalOpenCreate} setModalOpen={setModalOpenCreate}>
                <FormMenuCreate
                    menuId={menuId}
                    setModalOpen={setModalOpenCreate}
                    menuCommon={menuCommon}
                    setSnackbar={setSnackbar}
                    setFormLinks={setFormLinks}
                />
            </ModalForm>
            <ModalForm modalOpen={modalOpenEdit} setModalOpen={setModalOpenEdit}>
                <FormMenuEdit
                    setModalOpen={setModalOpenEdit}
                    link={linkEdit}
                    setSnackbar={setSnackbar}
                    menuCommon={menuCommon}
                    setFormLinks={setFormLinks}
                />
            </ModalForm>
            <ModalForm modalOpen={modalOpenDelete} setModalOpen={setModalOpenDelete}>
                <AlertMenuDelete
                    setModalOpen={setModalOpenDelete}
                    link={linkDelete}
                    setSnackbar={setSnackbar}
                    menuCommon={menuCommon}
                    setFormLinks={setFormLinks}
                />
            </ModalForm>
            <SnackBar snackbar={snackbar} setSnackbar={setSnackbar}/>
        </>
    );
}

export default TableMenuAdmin;