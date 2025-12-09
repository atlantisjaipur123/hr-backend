// src/server.ts
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

const PORT = process.env.PORT || 4000;

// -------------------------------
// ✅ TEST ROUTE ONLY
// -------------------------------
app.get('/api/v1/test', (req, res) => {
  res.json({
    success: true,
    message: 'Test route working successfully!',
    timestamp: new Date().toISOString(),
  });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`\nSERVER RUNNING → http://localhost:${PORT}\n`);
});
