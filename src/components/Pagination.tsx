import React from "react";
import { Link } from "gatsby";
import DoubleArrowLeft from "../icons/DoubleArrowLeft";
import DoubleArrowRight from "../icons/DoubleArrowRight";

export interface PaginationProps {
  page: number;
  pageCount: number;
  createLink: (p: number) => string;
}

export function Pagination(props: PaginationProps) {
  const { page, pageCount, createLink } = props;

  const currentList = React.useMemo(() => {
    if (page === 1 && pageCount < 4) {
      return [...Array(pageCount)].map((s, i) => i + 1);
    }
    const list: number[] = [];

    for (let i = page - 1; i <= Math.min(pageCount, page + 3); i++) {
      if (i !== 0) {
        list.push(i);
      }
    }

    return list;
  }, [page, pageCount]);

  return (
    <nav className="pagination" aria-label="Pagination">
      <Link
        aria-label="Go to first page"
        className="pagination__button"
        to={createLink(1)}
        aria-current={page === 1 ? "page" : undefined}
      >
        <DoubleArrowLeft />
      </Link>
      {currentList.map((n) => {
        return (
          <Link
            aria-current={page === n ? "page" : undefined}
            aria-label={`Go to page ${n}`}
            className="pagination__button"
            key={n}
            to={createLink(n)}
          >
            {n}
          </Link>
        );
      })}
      {!(pageCount === page) && page > 4 && (
        <>
          <div aria-hidden={true} className="pagination__dot">
            ...
          </div>
          <Link
            aria-current={page === pageCount ? "page" : undefined}
            aria-label="Go to last page"
            className="pagination__button"
            to={createLink(pageCount)}
          >
            <DoubleArrowRight />
          </Link>
        </>
      )}
    </nav>
  );
}
