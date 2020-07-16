"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todos_1 = __importDefault(require("./routes/todos"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = require("body-parser");
const connect_history_api_fallback_1 = __importDefault(require("connect-history-api-fallback"));
const path_1 = __importDefault(require("path"));
const app = express_1.default();
const PORT = process.env.PORT || 8080;
app.use(cors_1.default({
    origin: ['http://localhost:3000'],
}));
app.use(body_parser_1.json()); // Must defined above routes defenition!
app.use(express_1.default.static('build'));
app.use('/todos', todos_1.default);
app.use(connect_history_api_fallback_1.default());
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
if (process.env.NODE_ENV === 'production') {
    // Exprees will serve up production assets
    app.use(express_1.default.static('./build'));
    // Express serve up index.html file if it doesn't recognize route
    app.get('*', (req, res) => {
        res.sendFile(path_1.default.resolve(__dirname, 'build', 'index.html'));
    });
}
;
app.listen(PORT, () => console.log(`App is listing to port ${PORT}`));
