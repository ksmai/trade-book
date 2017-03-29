import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';

import webpackDevConfig from '../../webpack.config';

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/trade-book';

const app = express();
app.use(webpackDevMiddleware(webpack(webpackDevConfig)));
app.listen(PORT, () => console.log(`Development Server running on port ${PORT}`));

export default app;

