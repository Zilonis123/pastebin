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

    /**
     * @type {{ username: string; socket: import("socket.io").Socket<import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, any>; }[]}
     */
    const users = [] // there will be a list of all users that are in rooms
    /**
     * @type {any[]}
     */
    const rooms = [] // game rooms


    io.on('connection', (socket) => {
        // Let the user know who they are
        let username = `User ${Math.round(Math.random() * 999999)}`; // its more like an uid

        socket.on("loginRoom", (id) => {
            const roomIndex = rooms.findIndex(r => r.id == id);

            if (roomIndex == undefined) {
                socket.emit("badLogin", id)
                return
            }

            rooms[roomIndex].users.push(username)
            if (rooms[roomIndex].users.length > 1) rooms[roomIndex].vacant = false
        })

        
        socket.on("play", () => {
            // Player either wants to find a room or create one

            // check if the player already is in a room
            const rom = rooms.find(r => r.users.includes(username));
            if (rom != undefined) return socket.emit("foundRoom", JSON.stringify(rom))

            const potentialRoom = rooms.find(r => r.vacant && !r.bot) // room is open and isnt a bot one

            if (!potentialRoom) {
                // create a room
                const uid = uidgen.generateSync();
                const room = {
                    vacant: true,
                    bot: false,
                    users: [],
                    id: uid,
                }
                console.log("Created room with id " + uid)
                rooms.push(room)
                socket.emit("foundRoom", uid)
            } else {
               socket.emit("foundRoom", potentialRoom.id)
               // Since there's already a user make the room non vacant
               potentialRoom.vacant = false
            }

            users.push({username, socket});
        });

    });

    console.log('SocketIO injected');
}