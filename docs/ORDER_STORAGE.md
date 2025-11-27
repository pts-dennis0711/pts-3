# Order Storage Guide

## Where Orders Are Stored

All orders are stored in the browser's **localStorage** for the current session. Since this is a demo application, orders persist across page refreshes within the same browser.

## Storage Structure

### 1. Orders Array (`orders`)
**Key:** `orders`  
**Location:** Browser localStorage  
**Format:** JSON array of all orders

**Example:**
```javascript
[
  {
    "id": "order_1234567890_abc123",
    "userId": "1234567890",
    "sessionId": "session_1234567890_xyz789",
    "items": [
      {
        "id": "autocad-3d-pdf-exporter",
        "name": "3D PDF Exporter for AutoCAD",
        "price": "$79",
        "pricingType": "Locked-License Single Machine",
        "quantity": 1
      }
    ],
    "shipping": {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phone": "+1 (555) 000-0000",
      "address": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001",
      "country": "United States"
    },
    "payment": {
      "cardNumber": "****3456",
      "cardName": "John Doe"
    },
    "total": 86.9,
    "status": "pending",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
]
```

### 2. Individual Order (`order_{orderId}`)
**Key:** `order_{orderId}` (e.g., `order_1234567890_abc123`)  
**Location:** Browser localStorage  
**Format:** JSON object of a single order

Each order is stored individually for quick access by order ID.

## How Orders Are Created

Orders are created in `src/pages/CheckoutPage.js` when a user completes checkout:

```javascript
// Save order to localStorage
const orders = JSON.parse(localStorage.getItem('orders') || '[]');
orders.push(order);
localStorage.setItem('orders', JSON.stringify(orders));
localStorage.setItem(`order_${order.id}`, JSON.stringify(order));
```

## Accessing Orders

### For Users
- Users can view their orders at `/account` (Orders tab)
- Individual order details at `/order/:orderId`

### For Developers
To access orders programmatically:

```javascript
// Get all orders
const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');

// Get specific order by ID
const orderId = 'order_1234567890_abc123';
const order = JSON.parse(localStorage.getItem(`order_${orderId}`));

// Get orders by user ID
const userId = '1234567890';
const userOrders = allOrders.filter(order => order.userId === userId);

// Get orders by session ID
const sessionId = 'session_1234567890_xyz789';
const sessionOrders = allOrders.filter(order => order.sessionId === sessionId);
```

## Order Data Structure

Each order contains:

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique order identifier (format: `order_{timestamp}_{random}`) |
| `userId` | string | User ID who placed the order |
| `sessionId` | string | Session ID when order was placed |
| `items` | array | Array of cart items with product details |
| `shipping` | object | Shipping/billing information |
| `payment` | object | Payment method details (masked card info) |
| `total` | number | Total order amount (including tax) |
| `status` | string | Order status (`pending`, `completed`, `cancelled`) |
| `createdAt` | string | ISO timestamp of when order was created |

## Limitations & Notes

⚠️ **Important:** Since orders are stored in localStorage:
1. Orders are **browser-specific** - different browsers/computers won't see the same orders
2. Orders are **lost if localStorage is cleared**
3. Orders are **not synced** between devices
4. This is suitable for **demo/testing** purposes only

## Production Recommendations

For a production application, you should:
1. Store orders in a backend database (e.g., MongoDB, PostgreSQL)
2. Implement API endpoints for order CRUD operations
3. Add authentication/authorization for order access
4. Implement payment gateway integration (e.g., Stripe, PayPal)
5. Send order confirmation emails
6. Add order tracking and status updates
7. Implement admin dashboard to view/manage all orders



