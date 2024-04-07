import React from "react";
import { styled } from '@mui/material/styles';
import { Box, TableSortLabel, tableCellClasses, TableCell } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import {Data, EnhancedTableProps} from '../interfaces';

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

const EnhancedTableHead = (props: EnhancedTableProps) => {
    const { order, orderBy, onRequestSort, id, label } =
      props;
    const createSortHandler =
      (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
      };
  
    return (
          <StyledTableCell
              align={"center"}
              sortDirection={orderBy === id ? order : false}
            >
              <TableSortLabel
                active={false}
                direction={orderBy === id ? order : 'asc'}
                onClick={createSortHandler(id)}
              >
                {label}
                {orderBy === id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </StyledTableCell>
    );
  }
  
  export default EnhancedTableHead;