// httpsだったらwss://, それ以外はws://
const protocol = location.protocol
const port = location.port ? `:${location.port}` : '';
const socketUrl = `${protocol}${location.hostname}${port}`;

let socket = io.connect(socketUrl);
socket.on("connect", function(){
    console.log(socket);
    Terminal.applyAddon(attach);
    Terminal.applyAddon(fit);
    Terminal.applyAddon(fullscreen);

    const term = new Terminal({fontFamily: "Menlo for Powerline"});
    term.on("data", function(data){
        socket.emit("message", data);
    })

    socket.on("data", function(data){
        term.write(data);
    })
    const container = document.getElementById('terminal');
    term.open(container);
    term.fit();
    term.toggleFullScreen(true);
})

// // httpsだったらwss://, それ以外はws://
// const protocol = (location.protocol === 'https:') ? 'wss://' : 'ws://';
// const port = location.port ? `:${location.port}` : '';
// const socketUrl = `${protocol}${location.hostname}${port}/shell`;
// const socket = new WebSocket(socketUrl);
// console.log(socket)
// var sscket = io.connect()
// これでWebSocketStreamとTerminalを繋げるかつopen
// socket.onopen = () => { 
//     console.log(socket)
//     term.attach(socket)
// };