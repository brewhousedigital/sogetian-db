<script>
    // Components
    import GeneralTemplate from "$lib/layouts/GeneralTemplate.svelte";

    // Helper functions
    import {onMount} from "svelte";
    import {getAllResumes} from "$lib/functions/request";
    import EachLoader from "$lib/layouts/EachLoader.svelte";

    // Variables
    let resumes = [];

    onMount(async() => {
        resumes = await getAllResumes();
    })
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

    <EachLoader array={resumes}>
        <div class="list-group">
            {#each resumes as resume}
                <a href="/resumes/{resume.id}" class="list-group-item list-group-item-action">
                    <div class="d-flex w-100 align-items-center">
                        <img src="{resume.image === '' ? '/images/placeholder-avatar.png' : resume.image}"
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
    </EachLoader>

</GeneralTemplate>