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
exports.io = exports.server = void 0;
const express_1 = __importDefault(require("express"));
const colors_1 = __importDefault(require("colors"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
//ruta
const default_route_1 = __importDefault(require("./routes/default.route"));
//api
const auth_route_1 = __importDefault(require("./routes/auth/auth.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const projects_route_1 = __importDefault(require("./routes/projects.route"));
//socket
const socket_io_1 = __importDefault(require("socket.io"));
const http_1 = __importDefault(require("http"));
class Server {
    constructor(port) {
        this.port = port;
        this.app = express_1.default();
        this.http = http_1.default.createServer(this.app);
        this.io = socket_io_1.default(this.http);
        this.config();
        this.middleware();
        this.routes();
        this.socket();
    }
    config() {
        this.app.set("port", process.env.PORT || 4000);
        this.app.use("/api/image", express_1.default.static(path_1.default.join(__dirname, "../public/image")));
    }
    middleware() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(cors_1.default({
            origin: "*",
            methods: "GET,PUT,POST",
            allowedHeaders: "X-Requested-With,content-type,token",
            credentials: true,
        }));
    }
    routes() {
        this.app.use("/", default_route_1.default);
        //auth
        this.app.use("/api/auth", auth_route_1.default);
        //api
        this.app.use("/api/project", projects_route_1.default);
        this.app.use("/api/user", user_route_1.default);
    }
    socket() {
        this.io.on("connect", (socket) => {
            colors_1.default.yellow("server> ") + "user: " + colors_1.default.red("Connect");
            socket.on("user-signin", (data) => {
                this.io.emit('user-signin', data);
            });
            socket.on("stream", (data) => {
                //data que recivo
                socket.broadcast.emit("stream", data); //data q envio
            });
            socket.on("disconnect", () => {
                console.log(colors_1.default.yellow("server> ") + "user: " + colors_1.default.red("Disconnect"));
            });
        });
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.http.listen(this.app.get("port"));
            console.log(colors_1.default.yellow("server> ") +
                "UP, puerto: " +
                colors_1.default.red(this.app.get("port")));
        });
    }
}
exports.server = new Server();
exports.default = exports.server;
exports.io = exports.server.io;
