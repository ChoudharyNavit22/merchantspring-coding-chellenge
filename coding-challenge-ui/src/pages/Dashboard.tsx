import React, { useCallback, useState, useEffect, useMemo } from "react";
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableFooter, tableCellClasses, Typography, TablePagination } from '@mui/material';
import TablePaginationActions from '../components/TablePagination';
import EnhancedTableHead from '../components/EnhancedTableHead';
import {stableSort,getComparator} from '../helpers/universalHelper';
import {SortOrder, Data, Order} from '../interfaces';
import Flag from 'react-world-flags';

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#F5F6FA",
    color: "#A4A6B5",
    fontWeight: 600,
    minWidth: "100px",
    maxWidth: "150px"
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontWeight: 600
  },
}));

const Dashboard = () => {
    const [sortOrder, setSortOrder] = React.useState<SortOrder>('desc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('days_overdue');
    const [orders, setOrders] = useState<Order[]>([]);
    const [page, setPage] = useState<number>(0);
    const [count, setCount] = useState<number>(5);

    const handleRequestSort = (
      event: React.MouseEvent<unknown>,
      property: keyof Data,
    ) => {
      const isAsc = orderBy === property && sortOrder === 'asc';
      setSortOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };

    const handleChangePage = (
      event: React.MouseEvent<HTMLButtonElement> | null,
      newPage: number,
    ) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setCount(parseInt(event.target.value, 10));
      setPage(0);
    };

    const getOrders = useCallback(async () => {
        try {
            fetch(`http://localhost:8080/sales?page=${page}&count=${count}`)
            .then((results) => results.json())
            .then((data) => {
                setOrders(data.data.shipments);
            });
        } catch (err) {
          setOrders([]);
          console.log('Failed to Fetch Orders');
        }
      }, [page,count]);

    useEffect(() => {
        getOrders()
      }, [getOrders]);

    let visibleOrders = useMemo(
        () =>
          stableSort(orders, getComparator(sortOrder, orderBy)).slice(
            0,
            count,
          ),
        [sortOrder, orderBy, count, orders],
      );

  return (
    <>
    <Container>
        <TableContainer sx={{ mt: '75px' }} component={Paper}>
        <Typography
          sx={{ flex: '1 1 100%', padding: "20px 0 20px 20px", fontWeight: "600"}}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Overdue Orders
        </Typography>
        <Table sx={{ minWidth: 650 }} aria-label="order table">
            <TableHead>
            <TableRow>
                <StyledTableCell>MARKETPLACE</StyledTableCell>
                <StyledTableCell>STORE</StyledTableCell>
                <StyledTableCell>ORDERID</StyledTableCell>
                <StyledTableCell align="right">ORDER VALUE</StyledTableCell>
                <StyledTableCell align="center">ITEMS</StyledTableCell>
                <StyledTableCell>DESTINATION</StyledTableCell>
                <EnhancedTableHead
                    id="days_overdue"
                    label="DAYS OVERDUE" 
                    order={sortOrder}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                />
            </TableRow>
            </TableHead>
            <TableBody>
            {visibleOrders.map((item) => (
                <TableRow
                key={item.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <StyledTableCell><span style={{ marginRight: '5px' }}><Flag code={item.country} height="14" fallback={ <span>Unknown</span> }/></span>{item.marketplace}</StyledTableCell>
                <StyledTableCell>{item.shopName}</StyledTableCell>
                <StyledTableCell>{item.orderId}</StyledTableCell>
                <StyledTableCell align="right">${item.orderValue}</StyledTableCell>
                <StyledTableCell align="center">{item.items}</StyledTableCell>
                <StyledTableCell>{item.destination}</StyledTableCell>
                <StyledTableCell sx={{color: item.days_overdue>0? "red": null}} align="center">{item.days_overdue}</StyledTableCell>
                </TableRow>
            ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    count={-1}
                    rowsPerPage={count}
                    page={page}
                    slotProps={{
                      select: {
                        inputProps: {
                          'aria-label': 'rows per page',
                        },
                        native: true,
                      },
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                    labelDisplayedRows={({ from, to }) => `${from}-${to}`}
                  />
              </TableRow>
            </TableFooter>
        </Table>
        </TableContainer> 
    </Container>
    </>
  );
};

export default Dashboard;
