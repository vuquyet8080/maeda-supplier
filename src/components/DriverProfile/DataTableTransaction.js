import { getTransactionHistory } from 'actions/driver';
import TableData from 'components/TableData';
import { columnsTableTransactionDriver } from 'constants/columsTable/columnsTransaction';
import useDataTable from 'hooks/useDataTable';
import React, { useEffect } from 'react';

export default function DataTableTransaction({ idDriver }) {
  const {
    handlePageChange,
    handlePerRowsChange,
    isLoading,
    limit,
    totalRows,
    currentPage,
    setIsLoading,
    data,
    setData,
    setTotalRows,
  } = useDataTable();

  const onGetTransactionHistory = async (page = 1) => {
    try {
      if (isLoading) return;
      setIsLoading(true);
      const response = await getTransactionHistory({
        page,
        limit,
        id: idDriver,
      });
      setData(response?.data?.data?.results);
      setTotalRows(Math.ceil(response.data.data.total / limit));
    } catch (error) {
      console.log('error', error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    onGetTransactionHistory(currentPage);
  }, [currentPage, limit]);
  return (
    <TableData
      columns={columnsTableTransactionDriver}
      data={data}
      isLoading={isLoading}
      expandableRows={false}
      selectableRows
      pagination
      paginationRowsPerPageOptions={[10, 20, 30, 50]}
      paginationServer
      paginationTotalRows={totalRows}
      onChangeRowsPerPage={handlePerRowsChange}
      onChangePage={handlePageChange}
    />
  );
}
