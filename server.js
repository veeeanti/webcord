const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const API_BASE = 'https://discord.com/api/v10';

app.use(express.json());

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// Proxy all Discord API requests
app.all('/api/*', async (req, res) => {
  const endpoint = req.path.replace('/api', '');
  const token = req.headers['authorization'];
  
  if (!token) {
    return res.status(401).json({ error: 'Missing authorization header' });
  }

  try {
    const options = {
      method: req.method,
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
      },
    };

    if (req.method !== 'GET' && req.body) {
      options.body = JSON.stringify(req.body);
    }

    const response = await fetch(API_BASE + endpoint, options);
    const data = response.status === 204 ? null : await response.json();

    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
