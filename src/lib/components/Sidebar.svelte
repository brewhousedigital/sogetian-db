<script>
    export let url = "";

    let links = [
        {name: "Dashboard", url: "/", icon: 'speedometer'},
        {name: "Resumes", url: "/resumes", icon: 'people-fill'},
        {name: "Clients", url: "/clients", icon: 'briefcase'},
        {name: "Reports", url: "/reports", icon: 'file-bar-graph'},
        {name: "Admin", url: "/admin", icon: 'gear'},
    ]
</script>


<style>
    aside {
        padding: 12px 27px;
    }
    a {
        display: block;
        width: 100%;
        text-align: left;
        padding: 16px 10px 16px 20px;
        margin-bottom: 8px;
        font-size: 18px;
        font-weight: 500;

    }

    a i {
        margin-right: 20px;
    }

    a:hover, a:focus, a.active {
        background-color: #0070AD;
        color: #fff;
    }
</style>


<aside>
    {#each links as link}
        <a href={link.url} class="btn {url === link.url ? 'active' : ''}">
            <i class="bi bi-{link.icon}"></i>
            {link.name}
        </a>
    {/each}
</aside>