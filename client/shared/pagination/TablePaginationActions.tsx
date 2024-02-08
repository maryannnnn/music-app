import React, {FC, ReactNode} from 'react';
import {useTheme} from "@mui/material/styles";
import {Box, IconButton} from "@mui/material";
import { BiFirstPage } from "react-icons/bi";
import { BiLastPage } from "react-icons/bi";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { TablePaginationActionsProps } from '@mui/material/TablePagination/TablePaginationActions';

const TablePaginationActions: FC<TablePaginationActionsProps> = ({count, page, rowsPerPage, onPageChange}): React.ReactElement => {
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
        <Box sx={{flexShrink: 0, ml: 2.5}}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <BiLastPage /> : <BiFirstPage />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <IoIosArrowForward /> : <IoIosArrowBack />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <IoIosArrowBack /> : <IoIosArrowForward />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <BiFirstPage size="25px" /> : <BiLastPage size="25px" />}
            </IconButton>
        </Box>
    );
}

export default TablePaginationActions