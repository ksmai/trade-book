import express from 'express';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/trade-book';

const app = express();
app.get('/', (req, res) => res.send('LETZ GO'));
app.listen(PORT, () => console.log(`Development Server running on port ${PORT}`));

export default app;

