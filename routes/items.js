const express = require('express');
const router = express.Router();

// Import Firebase database
const db = require('../firebase');

/*
  TEST ROUTE
  URL: GET /items
*/
router.get('/', async (req, res) => {
  try {
    res.json({ message: 'Items route working successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/*
  ADD ITEM
  URL: POST /items
  BODY: { name, email }
*/
router.post('/', async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and Email required' });
    }

    await db.collection('items').add({
      name,
      email,
      createdAt: new Date()
    });

    res.status(201).json({ message: 'Item saved successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/*
  GET ALL ITEMS
  URL: GET /items/all
*/
router.get('/all', async (req, res) => {
  try {
    const snapshot = await db.collection('items').get();
    const items = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;


