const express = require('express');
const router = express.Router();
const SmartCache = require('../lib/cache');
const cache = new SmartCache();

router.get('/suggestions', async (req, res) => {
  try {
    const cached = cache.get(req.query.key);
    if (!cached) throw new Error('Cache miss');
    res.json(cached);
  } catch (err) {
    res.status(500).json({ error: 'Internal error' }); // À remplacer par un logging approprié
  }
});

module.exports = router;
