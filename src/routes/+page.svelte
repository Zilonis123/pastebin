
<script lang="ts">
    import { goto } from '$app/navigation';
    import { onMount } from "svelte"
    import { socket } from '../assets/socket-client';

    let bin: string;
    let title: string;
    let description: string;

    function createBin() {
        socket.emit("createBin", {title, description, bin});

        socket.on("createdBin", (id) => {
            goto("/" + id)
        });
    }
</script>

<main>
    <label for="title">Title</label>
    <input name="title" bind:value={title}>
    <label for="description">Description</label>
    <input name="description" bind:value={description}>
    <label for="bin">Text</label>
    <input name="bin" class="bin" bind:value={bin}>

    <button on:click={createBin}>Create bin</button>
</main>

<style>
    main {
        background-color: var(--surface);
        width: 100vw;
        height: 100vh;
        display: grid;
        padding: 50px 100px 50px 100px;
        gap: 10px
    }

    input {
        width: 100px;
        height: 50px;
        color: #292929;
    }

    .bin {
        width: 300px;
        height: 150px;
    }

    button  {
        background-color: var(--secondary-surface);
        width: 100px;
        height: 70px;
    }
</style>