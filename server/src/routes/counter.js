import express from 'express';

const router = express.Router();

let count = 0;

router.get('/', (req, res) => {
  res.json({ count });
});

router.post('/increment', (req, res) => {
  count += 1;
  res.json({ count });
});

export default router; 