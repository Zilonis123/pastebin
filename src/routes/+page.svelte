
<script>
    import { goto } from '$app/navigation';
    import { onMount } from "svelte"

    function play() {
        goto("/abc")
    }

</script>

<svelte:head>
    <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">
</svelte:head>

<div class="frame">
    <div class="text-frame">
        <h1 class="title">Robot or Not</h1>
    </div>
    <div class="buttons">
        <button class="play" on:click={play}>Start Game</button>
    </div>
</div>


<style>
    .frame {
        display: grid;
        grid-template-columns: 75% auto;
        width: 100vm;
        height: 100vh;
    }

    .text-frame {
        display: grid;
        align-items: center;
        justify-content: left;
    }

    .title {
        margin-left: 10vw;
        font-family: 'Roboto', sans-serif;
    }

    .buttons {
        display: grid;
        align-items: center;
    }

    .play {
        margin-right: 10vw;
        font-family: 'Poppins', sans-serif;        
        font-size: 20px;
        border: none;
        height: 60px;
        width: 200px;
        background-color: blueviolet;
        transition: ease-in-out 1s;
    }

    .play:hover {
        cursor: pointer;
        opacity: 90%;
        font-size: 19px
    }
</style>