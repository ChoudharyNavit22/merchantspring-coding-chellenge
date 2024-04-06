export interface Store {
    storeId: number;
    marketplace: string;
    country: string;
    shopName: string;
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
}

export interface Shipments extends Store, Order{
    days_overdue: number;
}