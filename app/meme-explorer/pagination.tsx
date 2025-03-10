interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }
  
  export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    return (
      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-400 transition"
        >
          Previous
        </button>
  
        <span className="px-4 py-2 text-lg font-semibold">
          {currentPage} / {totalPages}
        </span>
  
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-400 transition"
        >
          Next
        </button>
      </div>
    );
  }
  

