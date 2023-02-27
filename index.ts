import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import axios, { AxiosResponse } from 'axios';

interface Post {
    userId: Number;
    id: Number;
    title: String;
    body: String;
}

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

/** Logging */
app.use(morgan('dev'));
/** Parse the request */
app.use(express.urlencoded({ extended: false }));
/** Takes care of JSON data */
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.get('/posts', async (req: Request, res: Response, next: NextFunction) => {
    // get some posts
    try {
        let result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
        let posts: [Post] = result.data;
        return res.status(200).json({
            message: posts
        });
    } catch (error) {
        next(error);
    }
})

/** Error handling: this fires when a route does not exist */
app.use((req, res, next) => {
    const error = new Error('route not found');
    return res.status(404).json({
        message: error.message
    });
});

/** Error handling: it contains the error parameter so it handles server errors */
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    return res.status(500).json({
        message: error.message
    });
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});