import { TableBody, TableRow, TableCell, Checkbox } from "@mui/material";

import {SortTableBodyProps} from "./types"
import { usePlacesStore } from "../../../stores/placesStore";

export const SortTableBody = (props: SortTableBodyProps) => {
    const {setModalStatus} = usePlacesStore()

    return(
            <TableBody>
                {props.rows.map((row) => {
                  return (
                    <TableRow
                      hover
                      onClick={() => setModalStatus(true, true, row.id)}
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id}
                      sx={{ "&:hover":{backgroundColor:"#fbdce8 !important" } }}
                    >                  
                      <TableCell align="center" padding="checkbox">
                        <Checkbox
                            color="primary"
                            checked={row.visited}
                        />
                      </TableCell>
                      <TableCell align="right" >{row.name}</TableCell>
                      <TableCell align="right">{row.foodType}</TableCell>
                      <TableCell align="right">{row.location}</TableCell>
                      <TableCell align="center">{row.rating?row.rating:"-"}</TableCell>
                      
                    </TableRow>
                  );
                })}
                {props.emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: ( 33 ) * props.emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
)}
