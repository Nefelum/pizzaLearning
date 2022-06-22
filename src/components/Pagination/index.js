import React from 'react';
import ReactPaginate from "react-paginate";
import styles from './Pagination.module.scss'

export default function Pagination({onClickPage}) {
    return(
        <ReactPaginate
            className={styles.root}
            // onClick={() => setCurrentPage()}
            breakLabel="..."
            nextLabel=">"
            onPageChange={event => onClickPage(event.selected + 1)}
            pageRangeDisplayed={8}
            pageCount={3}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    )
}




