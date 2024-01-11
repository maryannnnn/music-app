import React, {FC, useEffect, useState, ChangeEvent, MouseEvent} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {IMenu} from "../../entities/menu/types/menuTypes";
import {AlertColor, Checkbox, CircularProgress, IconButton, Select, SelectChangeEvent} from "@mui/material";
import Pagination from "../pagination/Pagination";
import {StyledTableCell, StyledTableRow} from "./Styles";
import ModalForm from "../modal/Modal";
import FormMenuEdit from "../../features/form-menu-edit/FormMenuEdit";
import SnackBar from "../snack-bar/SnackBar";
import AlertMenuDelete from "../../features/alert-menu-delete/AlertMenuDelete";
import Button from "@mui/material/Button";
import FormMenuCreate from "@/features/form-menu-create/FormMenuCreate";
import {useActions} from "@/app/story/hooks/useActions";
import {useTypedSelector} from "@/app/story/hooks/useTypedSelector";
import {validateNumberField, validateStringField} from "@/app/utils/validation";
import {validationSchemaMenu} from "@/features/form-menu-edit/validation-menu";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import {selectNumber, selectIcons} from "../select-options/select-options";
import {RiEdit2Fill} from "react-icons/ri";
import {IoMdAddCircle} from "react-icons/io";
import {FaTrashAlt} from "react-icons/fa";
import {RiSave2Fill} from "react-icons/ri";

interface PropsMenuTable {
    menuId: number;
}

const TableMenuAdmin: FC<PropsMenuTable> = ({menuId}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [snackbar, setSnackbar] = useState<{openSnackbar: boolean, severity: AlertColor, alertMessage: string}>({openSnackbar: false, severity: 'success', alertMessage: 'Successfully!'})
    const [modalOpenCreate, setModalOpenCreate] = useState(false);
    const [modalOpenEdit, setModalOpenEdit] = useState(false);
    const [modalOpenDelete, setModalOpenDelete] = useState(false);
    const [linkEdit, setLinkEdit] = useState({} as IMenu)
    const [linkDelete, setLinkDelete] = useState({} as IMenu)
    const [isDisableAdd, setIsDisableAdd] = useState(true)
    const [isDisableSave, setIsDisableSave] = useState(true)
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const {editMenuAction, getMenuCommonAction, getMenuTopAction, getMenuSocAction} = useActions();

    const {errorMenuEdit, successMenuEdit} = useTypedSelector(state => state.menuEditReducer);
    const {isLoadingCommonMenu, errorCommonMenu, menuCommon} = useTypedSelector(state => state.menuCommonReducer);


    const [formLinks, setFormLinks] = useState(menuCommon as IMenu[]);
    const [parentList, setParentList] = useState([...menuCommon, {
        id: 0, nameLink: 'None', urlLink: '', orderLink: 0, iconLink: 0,
        parentId: 0, isVisible: true, menuId: 0
    }])

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - menuCommon.length) : 0;

    useEffect(() => {
        if (typeof menuId === "number") {
            if (menuId > 0) {
                setIsDisableAdd(false)
                getMenuCommonAction(menuId);
            } else {
                setIsDisableAdd(true)
                getMenuCommonAction(menuId);
            }
        }
    }, [menuId])

    useEffect(() => {
        setFormLinks(menuCommon)
        setParentList([...menuCommon, {
            id: 0, nameLink: 'None', urlLink: '', orderLink: 0, iconLink: 0,
            parentId: 0, isVisible: false, menuId: 0
        }])
    }, [menuCommon])

    const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null,
                              newPage: number,) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,) => {
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

    const changeHandlerLinks = (e: ChangeEvent<HTMLInputElement | { value: unknown; name: string }> | SelectChangeEvent<number>, id: number) => {
        const {name, value} = e.target as HTMLInputElement;

        let checkedValue: boolean | undefined;
        if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
            checkedValue = e.target.checked;
        }

        setErrors({...errors, [name]: ''});

        setFormLinks((prevFormLinks: IMenu[]) => {
            const updatedFormLinks = [...prevFormLinks];
            const linkToUpdate = updatedFormLinks.find((link: IMenu) => link.id === id);
            if (linkToUpdate) {
                if (checkedValue !== undefined && 'isVisible' in linkToUpdate) {
                    linkToUpdate.isVisible = checkedValue;
                } else if (name === 'orderLink' && 'orderLink' in linkToUpdate) {
                    linkToUpdate.orderLink = parseInt(value, 10);
                } else if (name === 'parentId' && 'parentId' in linkToUpdate) {
                    linkToUpdate.parentId = parseInt(value, 10);
                } else if (name === 'iconLink' && 'iconLink' in linkToUpdate) {
                    linkToUpdate.iconLink = parseInt(value, 10);
                }
            }

            return updatedFormLinks;
        });
        setIsDisableSave(false);
    };

    const handleSaveTable = async () => {
        await editMenuAction(formLinks)
        if (successMenuEdit) {
            setSnackbar({openSnackbar: true, severity: 'success', alertMessage: 'Successfully edited!'})
            await getMenuCommonAction(menuId);
            if (menuId === 1) {
                await getMenuTopAction(menuId);
            }
            if (menuId === 3) {
                await getMenuSocAction(menuId);
            }
        } else if (errorMenuEdit !== '') {
            setSnackbar({openSnackbar: true, severity: 'error', alertMessage: `Error: ${errorMenuEdit}`})
        }
        setIsDisableSave(true)
    }

    return (
        <>
        <div className="p-4 flex flex-row gap-x-2">
            <Button variant="text" onClick={handleModalCreateOpen}
                    disabled={isDisableAdd}>
                <IoMdAddCircle size="25px"/>
            </Button>
            <Button variant="text" onClick={handleSaveTable}
                    disabled={isDisableSave}>
                <RiSave2Fill size="25px"/>
            </Button>
        </div>
        {isLoadingCommonMenu ? (
            <CircularProgress/>
        ) : errorCommonMenu !== '' ? (
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
                            <StyledTableCell align="left">Icon</StyledTableCell>
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
                                <StyledTableCell align="left">
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
                                            {selectNumber.map((item, index) => (
                                                <MenuItem key={index} value={item.value}>{item.value}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    <FormControl sx={{m: 1, minWidth: 100}}>
                                        <InputLabel id="iconLink">Icon Link</InputLabel>
                                        <Select
                                            required
                                            name="iconLink"
                                            type="number"
                                            fullWidth
                                            value={link.iconLink}
                                            label="Icon Link"
                                            onChange={(e) => changeHandlerLinks(e, link.id)}
                                        >
                                            {selectIcons.map((item, index) => (
                                                <MenuItem key={index} value={item.label}>{item.value}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    <FormControl sx={{m: 1, minWidth: 100}}>
                                        <InputLabel id="order-link">Parent</InputLabel>
                                        <Select
                                            required
                                            name="parentId"
                                            type="number"
                                            value={link.parentId}
                                            label="Parent"
                                            onChange={(e) => changeHandlerLinks(e, link.id)}
                                        >
                                            {parentList.sort((a, b) => a.id - b.id).map((item) => (
                                                <MenuItem key={item.id} value={item.id}>{item.nameLink}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </StyledTableCell>
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
                                        <RiEdit2Fill/>
                                    </IconButton>
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    <IconButton aria-label="delete" onClick={() => handleDelete(link)}>
                                        <FaTrashAlt/>
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