"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dotenv_1 = require("dotenv");
var db_1 = require("./config/db");
// Initialize dotenv to use .env file variables
dotenv_1.default.config();
// Connect to MongoDB
(0, db_1.default)();
var app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
// Define a simple route for testing
app.get('/', function (req, res) { return res.send('API is running...'); });
var PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("Server running in ".concat(process.env.NODE_ENV, " mode on port ").concat(PORT)));
