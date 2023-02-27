"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const axios_1 = __importDefault(require("axios"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
/** Logging */
app.use((0, morgan_1.default)('dev'));
/** Parse the request */
app.use(express_1.default.urlencoded({ extended: false }));
/** Takes care of JSON data */
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.get('/posts', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // get some posts
    try {
        let result = yield axios_1.default.get(`https://jsonplaceholder.typicode.com/posts`);
        let posts = result.data;
        return res.status(200).json({
            message: posts
        });
    }
    catch (error) {
        next(error);
    }
}));
/** Error handling: this fires when a route does not exist */
app.use((req, res, next) => {
    const error = new Error('route not found');
    return res.status(404).json({
        message: error.message
    });
});
/** Error handling: it contains the error parameter so it handles server errors */
app.use((error, req, res, next) => {
    console.log(error);
    return res.status(500).json({
        message: error.message
    });
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
