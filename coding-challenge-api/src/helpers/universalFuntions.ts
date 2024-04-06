import * as fs from "fs";
import * as path from "path";
import { parse } from 'csv-parse/sync';

export const parseStoreCsv = () => {
    const csvFilePath = path.resolve(__dirname, '../../data/stores.csv');
  
    const headers = ['storeId', 'marketplace', 'country', 'shopName', null, null, null];
    
    const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });
    
    return parse(fileContent, {
        delimiter: ',',
        columns: headers,
        trim: true,
        skip_empty_lines: true,
        fromLine: 2,
        cast: function(value, context){
            if(context.index === 0){
              return parseInt(value);
            }else{
              return value;
            }
          }
    });
}

export const parseOrderCsv = (page: number,count: number) => {
    const csvFilePath = path.resolve(__dirname, '../../data/orders.csv');

    const headers = ["Id","storeId","orderId","latest_ship_date","shipment_status","destination","items","orderValue"];
      
    const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });
    
    return parse(fileContent, {
        delimiter: ',',
        columns: headers,
        trim: true,
        skip_empty_lines: true,
        from: (page * count) + 2 ,
        to: ((page+1) * count) + 1,
        cast: function(value, context){
            if(context.index === 0 || context.index === 1 || context.index === headers.length - 1 || context.index === headers.length - 2){
              return parseFloat(value);
            }else{
              return value;
            }
          }
    });
}