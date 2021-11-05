<script>
    import GeneralTemplate from "$lib/layouts/GeneralTemplate.svelte";
    import DashboardCard from "$lib/components/DashboardCards/DashboardCard.svelte";
</script>


<svelte:head>
    <title>Dashboard</title>
</svelte:head>


<GeneralTemplate>
    <h1 class="mb-5">Dashboard</h1>

    <div class="row">
        <div class="col-lg-3 mb-4">
            <DashboardCard title="Total Users" number="2,300" color="#8280FF" icon="file-check" />
        </div><!-- end col -->

        <div class="col-lg-3 mb-4">
            <DashboardCard title="Out Of Date Resumes" number="23" color="#209add" icon="calendar-x" />
        </div><!-- end col -->

        <div class="col-lg-3 mb-4">
            <DashboardCard title="ATO" number="4" color="#FE976F" icon="umbrella" />
        </div><!-- end col -->

        <div class="col-lg-3 mb-4">
            <DashboardCard title="Total Clients" number="400" color="#4FDA93" icon="box" />
        </div><!-- end col -->

        <div class="col-lg-6 mb-4">
            <DashboardCard type="notes" />
        </div><!-- end col -->
    </div><!-- end row -->
</GeneralTemplate>