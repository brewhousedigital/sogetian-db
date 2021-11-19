<script context="module">
    export async function load(pageInformation) {
        // Dynamic folders return objects
        let slug = pageInformation.page.params;
        return {props: {pageSlug: slug.client}};
    }
</script>

<script>
    import {resumes, clients} from "$lib/stores";
    import {slug} from "$lib/functions/slug";
    import Card from "$lib/components/Card.svelte";

    export let pageSlug;

    import GeneralTemplate from "$lib/layouts/GeneralTemplate.svelte";

    // Anytime $clients object updates, update the specific resume here
    let client;
    $: client = $clients.find(item => slug(item.name) === pageSlug)

    let consultants = [];
    $: {if(client) consultants = $resumes.filter(consultant => consultant['jobsAssigned'].includes(client.id))}
</script>


<svelte:head>
    <title>Client {client ? client.name : ''}</title>
</svelte:head>


<style>
    #edit-mode-btn {
        position: absolute;
        top: 12px;
        right: 12px;
    }

    .preserve-whitespace {
        white-space: break-spaces;
    }

    .resume-title {
        color: #0070AD;
    }

    h1 {

    }

    h2 {

    }

    .sidebar {
        max-width: 200px;
        margin-right: 30px;
    }

    .main-content {

    }

    .skills-category-col {
        min-width: 225px;
    }

    /*section {

    }

    section:hover, section:focus {
        outline: 4px solid #0070AD;
        outline-offset: 10px;

    }*/

    :global(.multiselect) {
        /* top-level wrapper div */
    }
    :global(.multiselect ul.tokens > li) {
        /* the blue tags representing selected options with remove buttons inside the input */
        background-color: #eee;
    }
    :global(.multiselect ul.tokens > li button),
    :global(.multiselect button.remove-all) {
        /* buttons to remove a single or all selected options at once */
    }
    :global(.multiselect ul.options) {
        /* dropdown options */
        background-color: #222;
    }
    :global(.multiselect ul.options li) {
        /* dropdown options */
        color: #eee;
    }
    :global(.multiselect ul.options li.selected) {
        /* selected options in the dropdown list */
    }
    :global(.multiselect ul.options li:not(.selected):hover) {
        /* unselected but hovered options in the dropdown list */
    }
    :global(.multiselect ul.options li.selected:hover) {
        /* selected and hovered options in the dropdown list */
        /* probably not necessary to style this state in most cases */
    }
    :global(.multiselect ul.options li.active) {
        /* active means element was navigated to with up/down arrow keys */
        /* ready to be selected by pressing enter */
    }
    :global(.multiselect ul.options li.selected.active) {
        /* both active and already selected, pressing enter now will deselect the element again */
    }
    :global(.multiselect ul.options li.disabled) {
        /* this option is one included in disabledOptions (see props above) */
    }
</style>


<GeneralTemplate>
    {#if client}

        <div class="header pb-3 border-bottom mb-5">
            <p class="h2 resume-title fw-bold">Client</p>
            <h1 class="display-1 fw-bold">{client.name}</h1>
        </div>

        <p>Started: {client.created}</p>
        <p>BDE: {client.BDE}</p>
        <p class="mb-5">Tagline: {client.description}</p>

        <h2>Consultants</h2>
        {#each consultants as consultant}
            <div class="col-xl-3 col-lg-4 col-6">
                <Card name={consultant.name} logo={consultant.image} type="resume" resumeID={consultant.id}/>
            </div>
        {:else}
            <div class="col-12">There aren't any consultants currently assigned to {client.name}.</div>
        {/each}

    {/if}
</GeneralTemplate>
