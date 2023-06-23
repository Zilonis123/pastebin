<script lang="ts">
    // @ts-ignore
    import { socket } from "../../assets/socket-client.ts"
    import { page } from '$app/stores'
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";

    let bin = {"title": "", "description": "", "bin": "", "views": 0};
    onMount(() => {

        socket.emit("getBin", $page.params.id)

        socket.on("succesfulBin", (res) => {
            bin = res;
        });

        socket.on("failedBin", () => {
            goto("/")
        });
    });
</script>


<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400&display=swap" rel="stylesheet">
</svelte:head>

<main>
    <div class="bin-wrap">
        <h3 class="title">{bin.title}</h3>
        <p class="description">{bin.description}</p>
        <strong class="views">Views {bin.views}</strong>
        <div class="bin">
            <p>{@html bin.bin}</p>
        </div>
    </div>
</main>

<style>
    p {
        font-family: 'Open Sans', sans-serif;
        weight: 300;
    }

    main {
        background-color: var(--surface);
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .bin-wrap {
        background-color: var(--secondary-surface);
        border-radius: var(--radius);
        width: 80%;
        height: 60%;
        overflow: hidden;
        padding: 10px;
    }

    .description {
        grid-area: description;
    }

    .title {
        grid-area: title;
        weight: 400;
        font-family: 'Open Sans', sans-serif;
    }

    .views {
        grid-area: views;
    }

    .bin {
        grid-area: bin;

        background-color: #323232;
        border-radius: var(--radius);
        overflow:hidden;
        padding: 5px;

        height: 100%;
    }


</style>