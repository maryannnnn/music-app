import React, {FC} from 'react';
import TableRow from "@mui/material/TableRow";
import {TableFooter, TablePagination} from "@mui/material";
import {IMenu} from "../../entities/menu/types/menuTypes";
import TablePaginationActions from "./TablePaginationActions";

interface PaginationProps {
    data: [{}] ;
    page: number;
    rowsPerPage: number;
    handleChangePage: (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => void;
    handleChangeRowsPerPage: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
}

const Pagination: FC<PaginationProps> = (
    {
        data,
        page,
        rowsPerPage,
        handleChangePage,
        handleChangeRowsPerPage
    }) => {

    return (
        <TableFooter>
            <TableRow>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, {label: 'All', value: -1}]}
                    colSpan={3}
                    count={data.length}
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
    );
};

export default Pagination