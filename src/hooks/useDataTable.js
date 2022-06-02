import { useState } from 'react';

const useDataTable = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);

  const [limit, setLimit] = useState(20);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setLimit(newPerPage);
  };
  return {
    isLoading,
    totalRows,
    limit,
    currentPage,
    handlePageChange,
    handlePerRowsChange,
    setIsLoading,
    data,
    setData,
    setTotalRows,
  };
};

export default useDataTable;
