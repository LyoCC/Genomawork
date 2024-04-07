import { TableHead, TableRow, TableCell, TableSortLabel, Box } from "@mui/material";
import { visuallyHidden } from '@mui/utils';

import { Place } from "../../../api/placesApi";
import { HeadCell, SortTableHeadProps } from "./types";

const headCells: readonly HeadCell[] = [
    {
      id: 'visited',
      numeric: true,
      disablePadding: false,
      label: 'Visitado',
    },
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Nombre',
    },
    {
        id: 'foodType',
        numeric: false,
        disablePadding: true,
        label: 'Tipo de comida',
    },
    {
        id: 'location',
        numeric: false,
        disablePadding: true,
        label: 'Ubicación',
    },
    {
        id: 'rating',
        numeric: true,
        disablePadding: false,
        label: 'Calificación',
    },
  ];

export const SortTableHead = (props: SortTableHeadProps) => {

    const { order, orderBy, onRequestSort } = props;

    const createSortHandler = (property: keyof Place) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
      };
  
    return (
      <TableHead>
        <TableRow sx={{backgroundColor:"#f175a5"}}>
            {headCells.map((headCell) => (
              <TableCell
                  key={headCell.id}
                  align={'center'}
                  padding={headCell.disablePadding ? 'none' : 'normal'}
                  sortDirection={orderBy === headCell.id ? order : false}
              >
                  <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={createSortHandler(headCell.id)}
                  sx={{color:"white", ":focus":{color:"black"},  fontWeight:'bold'}}
                  >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                      <Box component="span" sx={visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                  ) : null}
                  </TableSortLabel>
              </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }