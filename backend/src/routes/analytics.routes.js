const express = require('express');
const router = express.Router();

// Mock analytics data generator
function generateDailyData(days) {
  const data = [];
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toISOString().split('T')[0],
      visitors: Math.floor(Math.random() * 3000) + 500,
      pageViews: Math.floor(Math.random() * 8000) + 1000,
      bounceRate: (Math.random() * 30 + 30).toFixed(1),
      avgSessionDuration: Math.floor(Math.random() * 180) + 60,
    });
  }
  return data;
}

// GET /api/analytics/overview?websiteId=xxx&range=7d
router.get('/overview', (req, res) => {
  const { range = '7d' } = req.query;
  const days = range === '30d' ? 30 : range === '90d' ? 90 : 7;

  const dailyData = generateDailyData(days);
  const totalVisitors = dailyData.reduce((sum, d) => sum + d.visitors, 0);
  const totalPageViews = dailyData.reduce((sum, d) => sum + d.pageViews, 0);
  const avgBounceRate = (dailyData.reduce((sum, d) => sum + parseFloat(d.bounceRate), 0) / dailyData.length).toFixed(1);

  res.json({
    success: true,
    data: {
      summary: {
        totalVisitors,
        totalPageViews,
        avgBounceRate: `${avgBounceRate}%`,
        avgSessionDuration: '2m 14s',
        changeVsLastPeriod: {
          visitors: '+12.5%',
          pageViews: '+8.2%',
          bounceRate: '-3.1%',
          sessionDuration: '+15.4%',
        },
      },
      dailyData,
      trafficSources: [
        { name: 'Direct', value: 4000 },
        { name: 'Social', value: 3000 },
        { name: 'Organic Search', value: 2000 },
        { name: 'Referral', value: 2780 },
      ],
      devices: [
        { name: 'Mobile', value: 55 },
        { name: 'Desktop', value: 35 },
        { name: 'Tablet', value: 10 },
      ],
      topPages: [
        { path: '/', views: 45291, uniqueVisitors: 32100, avgTime: '2m 14s', bounceRate: '42%' },
        { path: '/about', views: 12402, uniqueVisitors: 9800, avgTime: '1m 45s', bounceRate: '55%' },
        { path: '/services', views: 8920, uniqueVisitors: 6500, avgTime: '3m 10s', bounceRate: '35%' },
        { path: '/contact', views: 4105, uniqueVisitors: 3800, avgTime: '0m 45s', bounceRate: '65%' },
      ],
    },
  });
});

// GET /api/analytics/realtime?websiteId=xxx
router.get('/realtime', (req, res) => {
  res.json({
    success: true,
    data: {
      activeVisitors: Math.floor(Math.random() * 50) + 5,
      currentPageViews: [
        { page: '/', visitors: Math.floor(Math.random() * 20) + 1 },
        { page: '/about', visitors: Math.floor(Math.random() * 10) + 1 },
        { page: '/contact', visitors: Math.floor(Math.random() * 5) + 1 },
      ],
    },
  });
});

module.exports = router;
