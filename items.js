const express = require('express');
const router = express.Router();
const db = require('../firebase');

// GET all items
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.ref('items').once('value');
    const items = snapshot.val() || {};
    const itemList = Object.keys(items).map(key => ({ id: key, ...items[key] }));
    res.json(itemList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new item
router.post('/', async (req, res) => {
  try {
    const newItemRef = db.ref('items').push();
    await newItemRef.set(req.body);
    const savedItem = { id: newItemRef.key, ...req.body };
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
