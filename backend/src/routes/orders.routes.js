const express = require('express');
const router = express.Router();

// In-memory mock orders store
const orders = [
  {
    id: 'o1',
    orderId: 'ORD-2026-001',
    customer: { name: 'Neha Gupta', email: 'neha@email.com', phone: '+91 98765 12345' },
    items: [{ name: 'Chocolate Truffle Cake', qty: 1, price: 1250 }, { name: 'Croissant', qty: 6, price: 200 }],
    total: 2450,
    status: 'delivered',
    paymentMethod: 'Razorpay',
    paymentStatus: 'paid',
    websiteId: '123',
    websiteName: 'My Awesome Bakery',
    createdAt: '2026-05-29T08:00:00Z',
    updatedAt: '2026-05-29T14:00:00Z',
    notes: '',
  },
  {
    id: 'o2',
    orderId: 'ORD-2026-002',
    customer: { name: 'Rohit Mehta', email: 'rohit.m@gmail.com', phone: '+91 87654 23456' },
    items: [{ name: 'Custom Wedding Cake', qty: 1, price: 15000 }],
    total: 15000,
    status: 'processing',
    paymentMethod: 'Bank Transfer',
    paymentStatus: 'paid',
    websiteId: '123',
    websiteName: 'My Awesome Bakery',
    createdAt: '2026-05-28T10:00:00Z',
    updatedAt: '2026-05-28T10:00:00Z',
    notes: 'Delivery needed by June 5th',
  },
  {
    id: 'o3',
    orderId: 'ORD-2026-003',
    customer: { name: 'Ananya Joshi', email: 'ananya.j@outlook.com', phone: '+91 76543 34567' },
    items: [{ name: 'Birthday Cupcakes', qty: 24, price: 150 }],
    total: 3600,
    status: 'pending',
    paymentMethod: 'Razorpay',
    paymentStatus: 'pending',
    websiteId: '123',
    websiteName: 'My Awesome Bakery',
    createdAt: '2026-05-28T16:00:00Z',
    updatedAt: '2026-05-28T16:00:00Z',
    notes: '',
  },
];

// GET /api/orders - List all orders
router.get('/', (req, res) => {
  const { status, websiteId, search, page = 1, limit = 20 } = req.query;

  let filtered = [...orders];

  if (status && status !== 'all') {
    filtered = filtered.filter((o) => o.status === status);
  }
  if (websiteId) {
    filtered = filtered.filter((o) => o.websiteId === websiteId);
  }
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (o) =>
        o.customer.name.toLowerCase().includes(q) ||
        o.orderId.toLowerCase().includes(q)
    );
  }

  const total = filtered.length;
  const start = (parseInt(page) - 1) * parseInt(limit);
  const paged = filtered.slice(start, start + parseInt(limit));

  const totalRevenue = orders.filter(o => o.paymentStatus === 'paid').reduce((sum, o) => sum + o.total, 0);

  res.json({
    success: true,
    data: {
      orders: paged,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / parseInt(limit)),
      },
      summary: {
        totalOrders: orders.length,
        totalRevenue,
        pending: orders.filter((o) => o.status === 'pending').length,
        processing: orders.filter((o) => o.status === 'processing').length,
        delivered: orders.filter((o) => o.status === 'delivered').length,
      },
    },
  });
});

// GET /api/orders/:id - Get single order
router.get('/:id', (req, res) => {
  const order = orders.find((o) => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, error: 'Order not found' });
  }
  res.json({ success: true, data: order });
});

// PATCH /api/orders/:id - Update order status
router.patch('/:id', (req, res) => {
  const index = orders.findIndex((o) => o.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, error: 'Order not found' });
  }

  const { status, notes } = req.body;
  if (status) orders[index].status = status;
  if (notes !== undefined) orders[index].notes = notes;
  orders[index].updatedAt = new Date().toISOString();

  res.json({ success: true, data: orders[index] });
});

module.exports = router;
