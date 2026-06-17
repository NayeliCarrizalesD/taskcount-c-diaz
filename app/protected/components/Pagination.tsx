"use client";

import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages - 2, totalPages - 1, totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, 2, 3, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="border-t border-zinc-800 px-4 flex items-center justify-between sm:px-0 mt-4 pb-2 select-none">
      <div className="-mt-px flex w-0 flex-1">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-gray-400 hover:text-white hover:border-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-gray-400 disabled:hover:border-transparent transition-all"
        >
          <span className="mr-2">←</span> Anterior
        </button>
      </div>

      <div className="hidden md:-mt-px md:flex gap-1">
        {pages.map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`dots-${index}`}
                className="border-transparent text-gray-500 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
              >
                ...
              </span>
            );
          }

          const isCurrent = page === currentPage;
          return (
            <button
              key={`page-${page}`}
              onClick={() => onPageChange(page as number)}
              className={`border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium transition-all ${
                isCurrent
                  ? "border-purple-500 text-purple-400 font-semibold"
                  : "border-transparent text-gray-400 hover:text-white hover:border-zinc-600"
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      <div className="-mt-px flex w-0 flex-1 justify-end">
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="inline-flex items-center border-t-2 border-transparent pt-4 pl-1 text-sm font-medium text-gray-400 hover:text-white hover:border-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-gray-400 disabled:hover:border-transparent transition-all"
        >
          Próximo <span className="ml-2">→</span>
        </button>
      </div>
    </div>
  );
}
