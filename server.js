const express = require("express");
const pty = require("pty.js");
const app = express();
const socketIo = require("socket.io")
const expressWs = require("express-ws")(app);
const hostname = '127.0.0.1';
const port = 8800;
app.use(express.static(__dirname));

// shell(terminal)のインスタンス化とdataの扱い
// app.ws("/shell", function (ws, req) {
//   // Spawn the shell
//   // Compliments of http://krasimirtsonev.com/blog/article/meet-evala-your-terminal-in-the-browser-extension
//   let shell = pty.spawn("/bin/bash", [], {
//     name: "xterm-color",
//     // このプロジェクトのpathになっている
//     cwd: process.env.PWD,
//     // 環境設定(これのおかげでterminalの設定が自分で設定した仕様になっている)
//     env: process.env
//   });
//   // shell(terminal)から帰ってきた値をwebに表示させる
//   // websocketを使っている理由は常時通信させるため
//   // shell(Terminal)にeventを設置して、何か変化があったらそのデータをwebに送信している
//   // 出力専門
//   console.log("Aaa")
//   shell.on("data", function (data) {
//     ws.send(data);
//   });
//   // 入力された値をshell(terminal)に送る
//   // terminalに入力
//   ws.on("message", function (msg) {
//     shell.write(msg);
//   });
// });
// serverの立ち上げ
const server = app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
server;
const io = socketIo.listen(server);

let shell = pty.spawn(
  process.env.Shell || "/bin/bash", [], {
  name: "xterm-color",
  // このプロジェクトのpathになっている
  cwd: process.env.PWD,
  // 環境設定(これのおかげでterminalの設定が自分で設定した仕様になっている)
  env: process.env
});

shell.on("data", function (data) {
  io.emit("data", data);
});

io.on('connection', function (s) {
  console.log(s);
  console.log("connected");
});
io.on('data', function(data) {
  shell.write(data);
});