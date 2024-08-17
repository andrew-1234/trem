interface PaginationProps {
  pageCount: number;
  onPageChange: (page: number) => void;
  currentPage: number;
}

export const HomePagination = (props: PaginationProps) => {
  const pageNumbers = [];
  for (let i = 1; i <= props.pageCount; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination-container justify-content-end ">
      <button
        className="btn btn-pagination btn-first-last"
        onClick={() => props.onPageChange(1)}
        disabled={props.currentPage === 1}
      >
        First
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => props.onPageChange(number)}
          className={`btn btn-pagination ${props.currentPage === number ? "active" : ""
            }`}
        >
          {number}
        </button>
      ))}
      <button
        onClick={() => props.onPageChange(props.pageCount)}
        disabled={props.currentPage === props.pageCount}
        className="btn btn-pagination btn-first-last"
      >
        Last
      </button>
    </nav>
  );
};