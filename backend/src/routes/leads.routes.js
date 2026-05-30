const express = require('express');
const router = express.Router();

// In-memory mock leads store
let leads = [
  {
    id: 'l1',
    name: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    phone: '+91 98765 43210',
    source: 'Contact Form',
    websiteId: '123',
    websiteName: 'My Awesome Bakery',
    status: 'new',
    createdAt: '2026-05-29T10:30:00Z',
    lastActivity: '2026-05-29T13:15:00Z',
    notes: 'Interested in bulk orders for a wedding event.',
    estimatedValue: 25000,
  },
  {
    id: 'l2',
    name: 'Priya Sharma',
    email: 'priya.s@gmail.com',
    phone: '+91 87654 32109',
    source: 'WhatsApp',
    websiteId: '123',
    websiteName: 'My Awesome Bakery',
    status: 'contacted',
    createdAt: '2026-05-28T14:00:00Z',
    lastActivity: '2026-05-29T11:00:00Z',
    notes: 'Follow-up call scheduled for tomorrow.',
    estimatedValue: 12000,
  },
  {
    id: 'l3',
    name: 'Amit Patel',
    email: 'amit.patel@company.co',
    phone: '+91 76543 21098',
    source: 'Google Search',
    websiteId: '124',
    websiteName: 'Tech Startup Landing',
    status: 'qualified',
    createdAt: '2026-05-27T09:00:00Z',
    lastActivity: '2026-05-28T16:30:00Z',
    notes: 'Wants monthly catering service for office.',
    estimatedValue: 150000,
  },
  {
    id: 'l4',
    name: 'Sneha Reddy',
    email: 'sneha.r@outlook.com',
    phone: '+91 65432 10987',
    source: 'Instagram',
    websiteId: '123',
    websiteName: 'My Awesome Bakery',
    status: 'converted',
    createdAt: '2026-05-25T12:00:00Z',
    lastActivity: '2026-05-26T10:00:00Z',
    notes: 'Placed first order. Repeat customer potential.',
    estimatedValue: 8500,
  },
];

// GET /api/leads - List all leads with optional filters
router.get('/', (req, res) => {
  const { status, websiteId, search, page = 1, limit = 20 } = req.query;

  let filtered = [...leads];

  if (status && status !== 'all') {
    filtered = filtered.filter((l) => l.status === status);
  }
  if (websiteId) {
    filtered = filtered.filter((l) => l.websiteId === websiteId);
  }
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.phone.includes(q)
    );
  }

  const total = filtered.length;
  const start = (parseInt(page) - 1) * parseInt(limit);
  const paged = filtered.slice(start, start + parseInt(limit));

  res.json({
    success: true,
    data: {
      leads: paged,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / parseInt(limit)),
      },
      summary: {
        total: leads.length,
        new: leads.filter((l) => l.status === 'new').length,
        contacted: leads.filter((l) => l.status === 'contacted').length,
        qualified: leads.filter((l) => l.status === 'qualified').length,
        converted: leads.filter((l) => l.status === 'converted').length,
        lost: leads.filter((l) => l.status === 'lost').length,
        totalValue: leads.reduce((sum, l) => sum + l.estimatedValue, 0),
      },
    },
  });
});

// GET /api/leads/:id - Get single lead
router.get('/:id', (req, res) => {
  const lead = leads.find((l) => l.id === req.params.id);
  if (!lead) {
    return res.status(404).json({ success: false, error: 'Lead not found' });
  }
  res.json({ success: true, data: lead });
});

// POST /api/leads - Create a new lead (from contact form submission)
router.post('/', (req, res) => {
  const { name, email, phone, source, websiteId, websiteName, notes } = req.body;

  if (!name || !email) {
    return res.status(400).json({ success: false, error: 'Name and email are required' });
  }

  const newLead = {
    id: `l${Date.now()}`,
    name,
    email,
    phone: phone || '',
    source: source || 'Contact Form',
    websiteId: websiteId || '',
    websiteName: websiteName || '',
    status: 'new',
    createdAt: new Date().toISOString(),
    lastActivity: new Date().toISOString(),
    notes: notes || '',
    estimatedValue: 0,
  };

  leads.unshift(newLead);

  res.status(201).json({ success: true, data: newLead });
});

// PATCH /api/leads/:id - Update lead status or notes
router.patch('/:id', (req, res) => {
  const index = leads.findIndex((l) => l.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, error: 'Lead not found' });
  }

  const { status, notes, estimatedValue } = req.body;
  if (status) leads[index].status = status;
  if (notes !== undefined) leads[index].notes = notes;
  if (estimatedValue !== undefined) leads[index].estimatedValue = estimatedValue;
  leads[index].lastActivity = new Date().toISOString();

  res.json({ success: true, data: leads[index] });
});

// DELETE /api/leads/:id - Delete a lead
router.delete('/:id', (req, res) => {
  const index = leads.findIndex((l) => l.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, error: 'Lead not found' });
  }

  leads.splice(index, 1);
  res.json({ success: true, message: 'Lead deleted' });
});

// GET /api/leads/export/csv - Export leads as CSV
router.get('/export/csv', (req, res) => {
  const headers = 'Name,Email,Phone,Source,Website,Status,Created,Value\n';
  const rows = leads
    .map(
      (l) =>
        `"${l.name}","${l.email}","${l.phone}","${l.source}","${l.websiteName}","${l.status}","${l.createdAt}","${l.estimatedValue}"`
    )
    .join('\n');

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=leads.csv');
  res.send(headers + rows);
});

module.exports = router;
