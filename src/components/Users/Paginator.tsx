import React from 'react';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import styles from './Paginator.module.css';

type PaginatorPropsType = {
    totalItemsCount: number;
    pageSize: number;
    currentPage: number;
    onPageChanged: (pageNumber: number) => void;
};

const Paginator: React.FC<PaginatorPropsType> = ({
                                                     totalItemsCount,
                                                     pageSize,
                                                     currentPage,
                                                     onPageChanged
                                                 }) => {
    const pageCount = Math.ceil(totalItemsCount / pageSize);

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        onPageChanged(page);
    };

    return (
        <div className={styles.pagination}>
            <Pagination
                count={pageCount}
                page={currentPage}
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded"
                /*size="large"*/
                renderItem={(item) => (
                    <PaginationItem
                        {...item}
                        className={styles.paginationItem}
                    />
                )}
            />
        </div>
    );
};

export default Paginator;
