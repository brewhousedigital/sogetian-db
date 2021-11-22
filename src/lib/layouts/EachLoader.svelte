<script>
    export let array = [];
</script>


{#if array.length > 0}

    <slot></slot>

{:else}

    <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>

{/if}