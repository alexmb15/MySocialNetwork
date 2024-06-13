import styles from "./Users.module.css"
import {useEffect, useState} from "react";

let Paginator = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10}) => {
    /*let [portionNumber, setPortionNumber] = useState(1);*/

    let pageCount = Math.ceil(totalItemsCount / pageSize);
    let createPages = numElements => [...Array(numElements)].map((_, index) => index + 1);
    let pages = createPages(pageCount);

    /*let portionCount = Math.ceil( pageCount / portionSize );*/
    /*useEffect(()=>setPortionNumber(Math.ceil(currentPage/portionSize)), [currentPage]);*/


    let slicedPages;
    let curPage = currentPage;
    if (curPage - portionSize/2 < 0) {
        slicedPages = pages.slice(0, portionSize);
    } else {
        slicedPages = pages.slice(curPage - portionSize/2, curPage + (portionSize/2-1));
    }

    return <div className={styles.pagination}>
        {
            slicedPages.map(p => {
                return <span key={p} onClick={() => {
                    onPageChanged(p)
                }}
                             className={currentPage === p && styles.selectedPage}> {p}
                    </span>
            })
        }
    </div>
}

export default Paginator;