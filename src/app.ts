import express, { Request, Response, NextFunction } from 'express';
import todoRoutes from './routes/todos';
import cors from 'cors';
import { json } from 'body-parser';
import history from 'connect-history-api-fallback';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({
    origin: ['http://localhost:3000'],
}));

app.use(json()); // Must defined above routes defenition!
app.use(express.static('build'));
app.use('/todos', todoRoutes);
app.use(history());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: err.message });
});

if (process.env.NODE_ENV === 'production') {
    // Exprees will serve up production assets
    app.use(express.static('./build'));

    // Express serve up index.html file if it doesn't recognize route
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    });
};

app.listen(PORT, () => console.log(`App is listing to port ${PORT}`));
