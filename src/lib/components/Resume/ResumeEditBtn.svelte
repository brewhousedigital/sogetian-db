<script>
    export let type = "";
    export let handleEdit = () => {}
    export let isVisible = false;
</script>


<style>
    button {opacity: 0.5}
</style>


{#if isVisible}
<button on:click={() => {handleEdit(type)}} class="btn">
    <i class="bi bi-pencil"></i>
</button>
{/if}