<script>
    import { socket } from "../../assets/socket-client.ts"
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    onMount(() => {
        const roomid = localStorage.getItem("roomId")
        if (!roomid) goto("/")

        socket.on("badLogin", () => {
            goto("/")
        })

        socket.emit("loginRoom", roomid)
        
    })
</script>
Hello you are in room ..