import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import React from "react";
import "./Pagination.scss";
interface PaginationProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({
  totalPages,
  currentPage,
  setCurrentPage,
}: PaginationProps) => {
  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="pagination">
      <button
        className="pagination-button previous-button"
        data-testid="previous-button"
        onClick={handlePreviousClick}
        disabled={currentPage === 1}
      >
        <LeftOutlined />
      </button>
      <div className="current-page" data-testid="current-page">
        Page {currentPage} / {totalPages}
      </div>
      <button
        className="pagination-button next-button"
        data-testid="next-button"
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
      >
        <RightOutlined />
      </button>
    </div>
  );
};

export default Pagination;
