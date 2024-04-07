export type SortOrder = 'asc' | 'desc';

export interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
      event: React.MouseEvent<HTMLButtonElement>,
      newPage: number,
    ) => void;
  }

export interface Data {
    days_overdue: number;
  }
  
export interface Order {
      id: number;
      storeId: number;
      orderId: string;
      latest_ship_date: string;
      shipment_status: string;
      destination: string;
      items: string;
      orderValue: string;
      marketplace: string;
      country: string;
      shopName: string;
      days_overdue: number;
    }
  
export interface EnhancedTableProps {
      id: keyof Data;
      onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
      order: SortOrder;
      orderBy: string;
      label: string;
    }

