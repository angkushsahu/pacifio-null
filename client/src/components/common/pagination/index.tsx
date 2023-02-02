import Paginate from "react-js-pagination";

interface PaginationProps {
    currentPage: number;
    resultPerPage: number;
    totalResults: number;
    onPageChange: (pageNumber: number) => void;
}

const Pagination = (props: PaginationProps) => {
    const { currentPage, resultPerPage, totalResults, onPageChange } = props;

    return (
        <div className="pagination_container">
            <Paginate
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={totalResults}
                onChange={onPageChange}
                pageRangeDisplayed={3}
                nextPageText="Next"
                prevPageText="Previous"
                firstPageText="First"
                lastPageText="Last"
                activeClass="active_page"
                activeLinkClass="active_link__page"
                hideDisabled={true}
            />
        </div>
    );
};

export default Pagination;
