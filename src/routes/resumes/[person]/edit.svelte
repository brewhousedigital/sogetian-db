<script context="module">
    export async function load(pageInformation) {
        // Dynamic folders return objects
        let slug = pageInformation.page.params;
        return {props: {pageSlug: slug.person}};
    }
</script>

<script>
    import {afterUpdate} from "svelte";

    export let pageSlug;

    import GeneralTemplate from "$lib/layouts/GeneralTemplate.svelte";
    import {resumes} from "$lib/stores";

    let resume;
    let affiliationsAwardsPublications = [];

    // Anytime $resumes object updates, update the specific resume here
    $: resume = $resumes.find(item => item.id === parseInt(pageSlug))

    afterUpdate(() => {
        // Update values on the resume
        if(resume) {
            affiliationsAwardsPublications = resume.affiliations.split(",")
        }
    })
</script>


<svelte:head>
    <title>Edit Resume</title>
</svelte:head>


<style>
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
</style>


<GeneralTemplate>
    {#if resume}
        <div class="header pb-3 border-bottom mb-5">
            <p class="h2 resume-title fw-bold">Consultant Resume</p>

            <h1 class="display-1 fw-bold">{resume.name}</h1>

            <h2>{resume.level}</h2>
        </div>

        <div class="row">
            <div class="col sidebar">
                <img src="/images/{resume.image === '' ? 'placeholder-avatar.png' : resume.image}"
                     alt="Profile Photo for {resume.name}"
                     class="img-fluid rounded d-block mb-4">

                <section class="mb-4">
                    <h3>Address</h3>
                    <address>
                        Company HQ<br>
                        123 Main Street<br>
                        Dallas, TX 12345
                    </address>
                </section>

                <section class="mb-4">
                    <h3>Telephone</h3>
                    <a href="tel:123-456-7890">123-456-7890</a>
                </section>


            </div><!-- end col -->

            <div class="col main-content">
                <section class="mb-5">
                    <h3>Summary</h3>
                    <p>{resume.summary}</p>
                </section>

                <section class="mb-5">
                    <h3>Education</h3>
                    <p>{resume.education}</p>
                </section>

                <section class="mb-5">
                    <h3>Skills, Training, and Certifications</h3>
                    <table class="table">
                        <thead class="visually-hidden">
                        <tr>
                            <th scope="col">Category</th>
                            <th scope="col">{resume.name}'s Skills</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr><td class="skills-category-col">Certifications</td><td>{resume.skillsCertifications}</td></tr>
                        <tr><td class="skills-category-col">Trained / Proficient</td><td>{resume.skillsTrained}</td></tr>
                        <tr><td class="skills-category-col">Operating Systems</td><td>{resume.skillsOS}</td></tr>
                        <tr><td class="skills-category-col">Applications and Utilities</td><td>{resume.skillsApplications}</td></tr>
                        </tbody>
                    </table>
                </section>

                <section class="mb-5">
                    <h3>Professional Affiliations, Awards, Publications</h3>
                    <ul>
                        {#each affiliationsAwardsPublications as item}
                            <li>{item.trim()}</li>
                        {/each}
                    </ul>
                </section>

                <section class="mb-5">
                    <h3>Professional Experience</h3>

                </section>
            </div><!-- end col -->
        </div><!-- end row -->
    {/if}
</GeneralTemplate>
