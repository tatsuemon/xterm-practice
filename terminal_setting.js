Terminal.applyAddon(attach);
Terminal.applyAddon(fit);
Terminal.applyAddon(fullscreen);

const term = new Terminal({fontFamily: "Menlo for Powerline"});
const container = document.getElementById('terminal');
term.open(container);
term.fit();
term.toggleFullScreen(true);


// httpsだったらwss://, それ以外はws://
const protocol = (location.protocol === 'https:') ? 'wss://' : 'ws://';
const port = location.port ? `:${location.port}` : '';
const socketUrl = `${protocol}${location.hostname}${port}/shell`;
const socket = new WebSocket(socketUrl);
// これでWebSocketStreamとTerminalを繋げるかつopen
socket.onopen = (ev) => { term.attach(socket) };