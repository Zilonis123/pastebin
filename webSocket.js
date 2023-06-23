// @ts-nocheck
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

    const bins = {}


    io.on('connection', (socket) => {
        socket.on("getBin", (binId) => {

            // @ts-ignore
            const bin = bins[binId];

            if (!bin) {
                socket.emit("failedBin")
                return
            }

            bins[binId].views++;

            socket.emit("succesfulBin", bin)
        });

        socket.on("createBin", async (bin) => {

            const id = await uidgen.generate(); // -> 'B1q2hUEKmeVp9zWepx9cnp'
            
            bin.views = 0;
            bins[id] = bin; // add the bin to all bins

            socket.emit("createdBin", id)
        })
    });

    console.log('SocketIO injected');
}