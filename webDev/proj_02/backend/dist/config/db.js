"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testConnection = exports.db = exports.disconnectDB = exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// MONGOOSE DATABASE CONNECTIONS
const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/proj_02";
        await mongoose_1.default.connect(mongoUri);
        console.log("✅ MongoDB connected successfully");
    }
    catch (error) {
        console.error("❌ MongoDB connection failed:", error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
const disconnectDB = async () => {
    try {
        await mongoose_1.default.disconnect();
        console.log("✅ MongoDB disconnected");
    }
    catch (error) {
        console.error("❌ MongoDB disconnection failed:", error);
    }
};
exports.disconnectDB = disconnectDB;
// MYSQL2 DATABASE CONNECTIONS
exports.db = promise_1.default.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD, // change this
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10, // max concurrent connections
    queueLimit: 0,
});
const testConnection = async () => {
    try {
        const [rows] = await exports.db.query('SELECT 1 + 1 AS result');
        console.log('✅ MySQL connected! Test query result:', rows[0].result);
    }
    catch (error) {
        console.error('❌ MySQL connection failed:', error.message);
    }
};
exports.testConnection = testConnection;
//# sourceMappingURL=db.js.map