<script>
import Header from "$lib/components/Header.svelte";
import Sidebar from "$lib/components/Sidebar.svelte";
import {afterUpdate, onMount} from "svelte";
import {updateClientsStore, updateResumesStore} from "$lib/stores";

let url = "";

onMount(async() => {
    await updateResumesStore();
    await updateClientsStore();
})

afterUpdate(() => {
    // Pass updated url location to any components that need it
    if(window.location) url = window.location.pathname;
})
</script>


<style>
    .grid-container {
        height: 100vh;
        display: grid;
        grid-template-columns: 250px calc(100% - 250px);
        grid-template-rows: 84px calc(100% - 84px);
        gap: 0 0;
        grid-template-areas:
    "Header Header"
    "Sidebar MainContent";
    }
    .header {
        grid-area: Header;
        background-color: #fff;
    }
    .sidebar {
        grid-area: Sidebar;
        background-color: #fff;
    }
    .main-content {
        grid-area: MainContent;
        overflow-y: scroll;
        background-color: #F5F6FA;
        border-top-left-radius: 22px;
    }
</style>


<div class="grid-container">
    <div class="header">
        <Header/>
    </div>

    <div class="sidebar">
        <Sidebar {url}/>
    </div>

    <div class="main-content">
        <slot></slot>
    </div>
</div><!-- end container -->