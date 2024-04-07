import { Place } from "../../../api/placesApi";

//General 
export type Order = 'asc' | 'desc';

//head interfaces and types
export interface HeadCell {
    disablePadding: boolean;
    id: keyof Place;
    label: string;
    numeric: boolean;
}

export interface SortTableHeadProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Place) => void;
    order: Order;
    orderBy: string;
}

// body interfaces and types
export interface SortTableBodyProps {
    rows: Place[];
    emptyRows: number
  }

