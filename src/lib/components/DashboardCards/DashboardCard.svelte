<script>
    import SmallNumberAndIcon from "$lib/components/DashboardCards/SmallNumberAndIcon.svelte";
    import LocalNotes from "$lib/components/DashboardCards/LocalNotes.svelte";

    export let type = "small";
    export let title = "Total Users";
    export let number = "2,300";
    export let icon = "file-check";
    export let color = "#8280FF"

    let smallClasses = 'd-flex flex-row align-items-center';

</script>


<style>
    .card {
        height: 100%;
        box-shadow: 0 .5rem 1rem rgba(0,0,0,.03);
        border-radius: 12px;
    }
</style>


<div class="card card-body border-0 {type === 'small' ? smallClasses : ''}">
    {#if type === "small"}
        <SmallNumberAndIcon {title} {number} {icon} {color} />
    {/if}

    {#if type === "notes"}
        <LocalNotes />
    {/if}
</div><!-- end card -->