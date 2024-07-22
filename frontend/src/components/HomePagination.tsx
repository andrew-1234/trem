
interface PaginationProps {
  pageCount: number;
  onPageChange: any;
  currentPage: number;
};

export const HomePagination = (props: PaginationProps) => {
  const pageNumbers = [];
  for (let i = 1; i <= props.pageCount; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination-container">
      <button
        onClick={() => props.onPageChange(1)}
        disabled={props.currentPage === 0}
      >
        First
      </button>
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => props.onPageChange(number)}
          className={`page-item ${props.currentPage === number ? 'active' : ''}`}
        >
          {number}
        </button>
      ))}
      <button
        onClick={() => props.onPageChange(props.pageCount)}
        disabled={props.currentPage === props.pageCount}
      >
        Last
      </button>
    </nav>
  );
};