<script>
    import GeneralTemplate from "$lib/layouts/GeneralTemplate.svelte";
    import clients from "$lib/data/clients.json"
    import Card from "$lib/components/Card.svelte";
</script>


<svelte:head>
    <title>Clients</title>
</svelte:head>


<style>

</style>


<GeneralTemplate>
    <h1 class="mb-5">Clients</h1>

    <div class="row">
        {#each clients as client}
            <div class="col-xl-3 col-lg-4 col-6">
                <Card name={client.name} logo={client.logo} description={client.description} />
            </div><!-- end col -->
        {/each}
    </div>

</GeneralTemplate>