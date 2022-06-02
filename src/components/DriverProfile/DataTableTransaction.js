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
  console.log('data', data);

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
      setTotalRows(response.data.data.total / limit);
    } catch (error) {
      console.log('error', error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    // console.log('currentPage', currentPage);
    onGetTransactionHistory();
  }, [currentPage]);
  return (
    <TableData
      columns={columnsTableTransactionDriver}
      data={data}
      isLoading={isLoading}
      expandableRows={false}
      selectableRows
      // expandableRowsComponent={() => (
      //   <ExpandableRowsComponent onEdit={onEdit} data={(row) => row} />
      // )}
      // eslint-disable-next-line react/no-unstable-nested-components
      // selectableRows

      // pagination
      paginationPerPage={limit}
      paginationRowsPerPageOptions={[10, 20, 30, 50]}
      pagination
      paginationServer
      paginationTotalRows={totalRows}
      onChangeRowsPerPage={handlePerRowsChange}
      onChangePage={handlePageChange}
      // pagination
    />
  );
}
