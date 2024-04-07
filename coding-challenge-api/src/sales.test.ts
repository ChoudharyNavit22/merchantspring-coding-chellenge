import httpMocks from 'node-mocks-http';
import { getSales } from "./sales";

describe('getSales API', () => {
  it('Check Default Returns', async () => {
    const request = httpMocks.createRequest({
        method: 'GET',
        url: '/sales'
    });
    const response = httpMocks.createResponse();
  
    await getSales(request, response);
  
    const responseJson = response._getJSONData();
    const statusCode  = response._getStatusCode();
  
    expect(statusCode).toBe(200);
    expect(responseJson).toHaveProperty('data');
    expect(responseJson).toHaveProperty('message');
  });

  it('Check Response Json data', async () => {
    const request = httpMocks.createRequest({
        method: 'GET',
        url: '/sales'
    });
    const response = httpMocks.createResponse();
  
    await getSales(request, response);
  
    const responseJson = response._getJSONData();

    expect(responseJson.data.page).toBe(0);
    expect(responseJson.data.count).toBe(5);
    expect(responseJson.data.shipments[0]).toMatchObject({
      "id": 1,
      "storeId": 2,
      "orderId": "RBGSESWLOZ",
      "latest_ship_date": "02/02/2024",
      "shipment_status": "Pending",
      "destination": "Great Falls MM, 59963-4198",
      "items": 7,
      "orderValue": 160.76,
      "marketplace": "Ebay",
      "country": "GBR",
      "shopName": "Snack Co.",
      "days_overdue": 65
      });
  });
});


