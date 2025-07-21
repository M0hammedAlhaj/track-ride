import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  loading?: boolean;
}

export function VehiclesPagination({
  currentPage,
  totalPages,
  totalElements,
  pageSize,
  onPageChange,
  onPageSizeChange,
  loading = false
}: PaginationProps) {
  const startItem = totalElements === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalElements);

  const getVisiblePages = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const start = Math.max(1, currentPage - 2);
      const end = Math.min(totalPages, start + maxVisible - 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  // Always show pagination controls with beautiful design
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mt-8 p-6 bg-gradient-to-r from-gray-800/60 to-gray-700/40 rounded-xl border border-gray-600/50 backdrop-blur-sm shadow-2xl">
      {/* Results Info */}
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
        <span className="text-sm font-medium text-gray-300">
          عرض <span className="text-emerald-400 font-bold">{startItem}</span> إلى{" "}
          <span className="text-emerald-400 font-bold">{endItem}</span> من أصل{" "}
          <span className="text-emerald-400 font-bold">{totalElements}</span> مركبة
        </span>
      </div>

      {/* Main Pagination Controls */}
      <div className="flex items-center gap-3">
        {/* Previous Page */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || loading}
          className="border-gray-600 text-gray-300 hover:bg-emerald-600/20 hover:border-emerald-500 hover:text-emerald-400 transition-all duration-300 disabled:opacity-30"
        >
          <ChevronRight className="w-4 h-4" />
          <span className="hidden sm:inline mr-1">السابق</span>
        </Button>

        {/* Page Numbers - Always show current page */}
        <div className="flex items-center gap-1 px-3 py-1 bg-gray-700/50 rounded-lg border border-gray-600/50">
          <span className="text-xs text-gray-400 ml-2">الصفحة</span>
          <div className="flex gap-1">
            {getVisiblePages().map((page) => (
              <Button
                key={page}
                variant={page === currentPage ? "default" : "ghost"}
                size="sm"
                onClick={() => onPageChange(page)}
                disabled={loading}
                className={
                  page === currentPage
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg shadow-emerald-500/25 min-w-[36px] h-8"
                    : "border-gray-600 text-gray-300 hover:bg-emerald-600/10 hover:text-emerald-400 transition-all duration-200 min-w-[36px] h-8"
                }
              >
                {page}
              </Button>
            ))}
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <>
                <span className="text-gray-500 px-1">...</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onPageChange(totalPages)}
                  disabled={loading}
                  className="border-gray-600 text-gray-300 hover:bg-emerald-600/10 hover:text-emerald-400 transition-all duration-200 min-w-[36px] h-8"
                >
                  {totalPages}
                </Button>
              </>
            )}
          </div>
          <span className="text-xs text-gray-400 mr-2">من {totalPages}</span>
        </div>

        {/* Next Page */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || loading}
          className="border-gray-600 text-gray-300 hover:bg-emerald-600/20 hover:border-emerald-500 hover:text-emerald-400 transition-all duration-300 disabled:opacity-30"
        >
          <span className="hidden sm:inline ml-1">التالي</span>
          <ChevronLeft className="w-4 h-4" />
        </Button>
      </div>

      {/* Page Size Selector */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-400">عدد العناصر:</span>
        <div className="relative">
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(parseInt(e.target.value))}
            disabled={loading}
            className="appearance-none bg-gradient-to-r from-gray-700 to-gray-600 border border-gray-500 text-gray-200 rounded-lg px-4 py-2 pr-8 text-sm font-medium focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/50 focus:outline-none transition-all duration-300 shadow-lg hover:shadow-emerald-500/10"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <ChevronLeft className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
