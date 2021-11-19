<script>
    import {slug} from "$lib/functions/slug";

    export let logo = "";
    export let name = "";
    export let description = "";
    export let type = "client";
    export let resumeID = 0;

    let href = "";
    let src = "";
    let style = "";
    if(type === "resume") {
        // Probably a profile photo
        src = logo;
        style = "max-width: 175px;";
        href = "/resumes/" + resumeID;
    } else {
        // Profile a client image
        src = "/images/" + logo;
        href = "/clients/" + slug(name);
    }
</script>

<style>

</style>

<div class="card" {style}>
    <img {src} class="card-img-top" alt={name} >
    <div class="card-body">
        <h5 class="card-title">{name}</h5>
        <p class="card-text">{description}</p>
        <a {href} class="stretched-link">See More</a>
    </div><!-- end card body -->
</div><!-- end card -->