import React from "react";
import { ArrowIcon } from "../../assets/icons/ArrowIcon";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevClick = () => {
    onPageChange(currentPage - 1);
  };

  const handleNextClick = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <div className="flex justify-center items-center mt-4">
      {totalPages > 0 && (
        <>
          <button
            className="flex justify-center items-center p-2 group"
            onClick={handlePrevClick}
            disabled={currentPage === 0}
          >
            <ArrowIcon
              width="20px"
              height="20px"
              className="rotate-180 group-hover:fill-green-afpa"
            />
          </button>
          <span className="mr-2 text-gray-700">
            Page {currentPage + 1} sur {totalPages}
          </span>
          <button
            className="flex justify-center items-center p-2 group"
            onClick={handleNextClick}
            disabled={currentPage === totalPages - 1}
          >
            <ArrowIcon
              width="20px"
              height="20px"
              className="group-hover:fill-green-afpa"
            />
          </button>
        </>
      )}
    </div>
  );
};

export default Pagination;
