import {parse, differenceInCalendarDays} from 'date-fns';
import { parseStoreCsv, parseOrderCsv } from "./helpers/universalFuntions"
import { Store, Order, Shipments } from "./interfaces"

export async function getSales(req: any, res: any) {
    try {
        const page = parseInt(req.query.page) || 0;
        const count = parseInt(req.query.count) || 5;
        const stores: Store[] = await parseStoreCsv();
        const orders: Order[] = await parseOrderCsv(page,count);
        let mergedOrders = orders.map(obj => Object.assign(obj, stores.find(item => obj.storeId === item.storeId)));
        let shipments: Shipments[] = [];
        mergedOrders.forEach( item => {
            if(item.shipment_status === "Pending") {
                let shipmentDate = parse(item.latest_ship_date,"dd/MM/yyyy", new Date())
                const days_overdue = Math.abs(differenceInCalendarDays(shipmentDate, new Date()));
                shipments.push({...item, days_overdue})
            }
            else {
                shipments.push({...item, days_overdue: 0})
            }
        })
        res.status(200).json({
        data: {
            page,
            count: count,
            shipments
        },
        message: "success"
        });
    } catch(error: any) {
        res.status(400).json({
            message: error.message
            });
    }
  }