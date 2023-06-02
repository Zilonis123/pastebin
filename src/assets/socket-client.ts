import { io } from "socket.io-client"

export const socket = io()

socket.on("name", (username: string) => {
    console.log("logged in as " + username)
})