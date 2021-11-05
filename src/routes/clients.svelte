<script>
    import GeneralTemplate from "$lib/layouts/GeneralTemplate.svelte";

    import clients from "$lib/data/clients.json"
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
            <div class="col-lg-4">
                <div class="card">
                    <img src="/images/{client.logo}" class="card-img-top" alt={client.name}>
                    <div class="card-body">
                        <h5 class="card-title">{client.name}</h5>
                        <p class="card-text">{client.description}</p>
                        <a href="#">See More</a>
                    </div>
                </div><!-- end card -->
            </div><!-- end col -->
        {/each}
    </div>

</GeneralTemplate>