<script lang="ts">
    // @ts-ignore
    import { socket } from "../../assets/socket-client.ts"
    import { page } from '$app/stores'
    import { onMount } from "svelte";
    import { bind } from "svelte/internal";

    let bin = {"title": "", "bin": ""};
    onMount(() => {

        socket.emit("getBin", $page.params.id)

        socket.on("succesfulBin", (res) => {
            bin = res
            console.log(res)
        })
    });
</script>

<h1>{bin.title}</h1>
{@html bin.bin}