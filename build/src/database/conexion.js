"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
function db() {
    return new pg_1.Pool({
        host: process.env.DB_HOST || "localhost",
        user: "postgres",
        password: "1234nix",
        database: "db_sensors",
        max: 10,
        min: 0,
        idleTimeoutMillis: 10000,
    });
}
exports.default = db();
