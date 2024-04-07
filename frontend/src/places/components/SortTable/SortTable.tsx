import { useState, useMemo } from "react";
import { Box, Table, TableContainer, TablePagination, Paper } from "@mui/material";

import { Place } from "../../../api/placesApi";
import { SortTableHead, SortTableBody, Order} from "./";
import { usePlacesStore } from "../../../stores/placesStore";

export const SortTable = ({rows}:{rows: Place[]}) => {
    const {page, setPage} = usePlacesStore()
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof Place>('name');
    const [rowsPerPage, setRowsPerPage] = useState(5);
  
    const handleRequestSort = ( event: unknown, property: keyof Place,) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
  
     
    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = Math.max(0, (1 + page) * rowsPerPage - rows.length);

    function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
        if (a[orderBy] == undefined && b[orderBy] == undefined) {
            return 0;
        }
        if (a[orderBy] == undefined) {
          return 1;
        }
        if (b[orderBy] == undefined) {
          return -1;
        }
        if (b[orderBy] < a[orderBy]) {
          return -1;
        }
        if (b[orderBy] > a[orderBy]) {
          return 1;
        }
        return 0;
      }
      
    function getComparator<Key extends keyof Place>( order: Order, orderBy: Key): (
        a: { [key in Key]: number | string | boolean | null},
        b: { [key in Key]: number | string | boolean | null},
      ) => number {
        return order === 'desc'
          ? (a, b) => descendingComparator(a, b, orderBy)
          : (a, b) => -descendingComparator(a, b, orderBy);
      }
  
    const visibleRows = useMemo( () =>
    rows.slice().sort( getComparator(order, orderBy)).slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage,
        ),
      [order, orderBy, page, rowsPerPage, rows],
    );
    
    return (
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2,}}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={'small'}
            >
              <SortTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <SortTableBody
                rows={visibleRows}
                emptyRows={emptyRows}
              />
            </Table>
          </TableContainer>
          <TablePagination
            sx={{
              ".MuiTablePagination-toolbar": {
                backgroundColor: "#f175a5",
                color:"white"
              }
            }}
            rowsPerPageOptions={[5]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    );
  }