import express from 'express';
import bodyParser from 'body-parser';
import passport from './services/JWT';
import authRoutes from './routes/authRoutes';
import mongoose from 'mongoose';

const app = express();

app.use(bodyParser.json());
app.use(passport.initialize());

app.use('/api/auth', authRoutes);

mongoose.connect('mongodb://localhost:27017/nfc', {
});

export default app;
