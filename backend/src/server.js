
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRoutes from './routes.js';
import { fileURLToPath } from 'url';
import path from 'path';
dotenv.config();
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'OK' : 'MISSING');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
   // origin: 'http://localhost:5173',
    origin: 'https://bitsatoms.github.io',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials : true,
}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Private-Network', 'true');
    next();
});

app.use(express.json());

app.use('/api',contactRoutes);
app.use("/uploads", express.static(path.join(__dirname, '../uploads')));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});