import express from 'express';
import axios from 'axios';
import Redis from 'ioredis';

const app = express();
const PORT = 5000;

const redis = new Redis();

app.get('/api/users', async (req, res) => {
  const cacheKey = 'user-all';

  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      console.log("Returning users from Redis cache");
      return res
        .type('text/plain')
        .send(JSON.stringify(JSON.parse(cached), null, 2));
    }

    const { data } = await axios.get('https://jsonplaceholder.typicode.com/users');
    console.log('Fetched users from JSONPlaceholder');
    await redis.set(cacheKey, JSON.stringify(data), 'EX', 60);
    console.log('Users cached in Redis for 60 seconds');

    res.json(data);
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.get('/api/users/:id', async (req, res) => {
  const userId = req.params.id;
  const cacheKey = `user:${userId}`;

  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      console.log(`Returning user ${userId} from Redis cache`);
      return res
        .type('text/plain')
        .send(JSON.stringify(JSON.parse(cached), null, 2));
    }

    const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
    console.log(`Fetched user ${userId} from JSONPlaceholder`);
    await redis.set(cacheKey, JSON.stringify(data), 'EX', 60);
    console.log(`User ${userId} cached in Redis for 60 seconds`);

    res.json(data);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.error(`User ${userId} not found`);
      return res.status(404).json({ error: 'User not found' });
    }
    console.error('Error fetching user:', error.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});