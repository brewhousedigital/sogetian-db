<script>
    import GeneralTemplate from "$lib/layouts/GeneralTemplate.svelte";
    import {resumes} from "$lib/stores";
</script>


<svelte:head>
    <title>Resumes</title>
</svelte:head>


<style>
    .list-group img {
        max-width: 50px;
        margin-right: 16px;
    }

    h2 {
        margin-right: 32px;
    }

    .updated {
        min-width: 200px;
        margin-left: auto;
        padding: 0 12px;
        opacity: 0.5;
    }
</style>


<GeneralTemplate>
    <h1 class="mb-5">Resumes</h1>

    {#if $resumes.length > 0}

        <div class="list-group">
            {#each $resumes as resume}
            <a href="/resumes/{resume.id}" class="list-group-item list-group-item-action">
                <div class="d-flex w-100 align-items-center">
                    <img src="/images/placeholder-avatar.png"
                         alt="Profile photo for {resume.name}"
                         width="50"
                         height="50"
                         class="img-fluid rounded">
                    <h2 class="mb-0 fw-bold">{resume.name}</h2>
                    <div class="updated">
                        <div>Updated</div>
                        <div>{resume.updated}</div>
                    </div>
                </div>
            </a>
            {/each}
        </div>

    {:else}

        <p>No resumes found</p>

    {/if}

</GeneralTemplate>