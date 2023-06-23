import { Server } from 'socket.io';
import UIDGenerator from 'uid-generator';
const uidgen = new UIDGenerator(); // Default is a 128-bit UID encoded in base58

export const webSocketServer = {
    name: 'webSocketServer',
    /**
     * @param {{ httpServer: any; }} server
     */
    configureServer(server) {
        injectSocketIO(server.httpServer);
    }
};

/**
 * @param {Partial<import("socket.io").ServerOptions> | undefined} server
 */
export function injectSocketIO(server) {
    const io = new Server(server);

    const bins = {
        "abc": {
            "title": "abc",
            "bin": "I am <strong>strong</strong>!" 
        }
    }


    io.on('connection', (socket) => {
        socket.on("getBin", (binId) => {

            // @ts-ignore
            const bin = bins[binId];

            socket.emit("succesfulBin", bin)
        });

    });

    console.log('SocketIO injected');
}