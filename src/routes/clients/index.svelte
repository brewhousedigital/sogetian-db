<script>
    // Components
    import GeneralTemplate from "$lib/layouts/GeneralTemplate.svelte";
    import Card from "$lib/components/Card.svelte";

    // Helper functions
    import {onMount} from "svelte";
    import {getAllClients} from "$lib/functions/request";
    import EachLoader from "$lib/layouts/EachLoader.svelte";

    // Variables
    let clients = [];

    onMount(async() => {
        clients = await getAllClients();
    })
</script>


<svelte:head>
    <title>Clients</title>
</svelte:head>


<style>

</style>


<GeneralTemplate>
    <h1 class="mb-5">Clients</h1>

    <EachLoader array={clients}>
        <div class="row">
            {#each clients as client}
                <div class="col-xl-3 col-lg-4 col-6">
                    <Card name={client.name} logo={client.logo} description={client.description} />
                </div><!-- end col -->
            {/each}
        </div>
    </EachLoader>

</GeneralTemplate>