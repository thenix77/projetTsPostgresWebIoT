import express from "express";
import color from "colors";
import path from "path";

import cors from "cors";
//ruta
import defaultRoute from "./routes/default.route";

//api
import authRoute from "./routes/auth/auth.route";
import userRoute from "./routes/user.route";
import projectRoute from "./routes/projects.route";

//socket
import IO from "socket.io";
import HTTP from "http";

class Server {
  private app: express.Application;
  private http: HTTP.Server;
  io: IO.Server;

  constructor(private port?: number) {
    this.app = express();
    this.http = HTTP.createServer(this.app);
    this.io = IO(this.http);

    this.config();
    this.middleware();
    this.routes();
    this.socket();
  }

  private config() {
    this.app.set("port", process.env.PORT || 4000);

    this.app.use(
      "/api/image",
      express.static(path.join(__dirname, "../public/image"))
    );
  }

  private middleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));

    this.app.use(
      cors({
        origin: "*",
        methods: "GET,PUT,POST",
        allowedHeaders: "X-Requested-With,content-type,token",
        credentials: true,
      })
    );
  }

  private routes() {
    this.app.use("/", defaultRoute);

    //auth
    this.app.use("/api/auth", authRoute);

    //api
    this.app.use("/api/project", projectRoute);
    this.app.use("/api/user", userRoute);
  }

  private socket() {
    this.io.on("connect", (socket) => {
      color.yellow("server> ") + "user: " + color.red("Connect")

      socket.on("user-signin", (data) => {
        this.io.emit('user-signin',data)
        
      });

      socket.on("stream", (data) => {
        //data que recivo
        socket.broadcast.emit("stream", data); //data q envio
        
      });

      socket.on("disconnect", () => {
        console.log(
          color.yellow("server> ") + "user: " + color.red("Disconnect")
        );
      });
    });
  }

  async start() {
    await this.http.listen(this.app.get("port"));
    console.log(
      color.yellow("server> ") +
        "UP, puerto: " +
        color.red(this.app.get("port"))
    );
  }
}

export const server = new Server();
export default server;
export const io = server.io;
