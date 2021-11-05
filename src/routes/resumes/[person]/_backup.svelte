<script context="module">
    export async function load(pageInformation) {
        // Dynamic folders return objects
        let slug = pageInformation.page.params;
        return {props: {pageSlug: slug.person}};
    }
</script>

<script>
    export let pageSlug;

    import {afterUpdate} from "svelte";
    import MultiSelect from 'svelte-multiselect'
    import GeneralTemplate from "$lib/layouts/GeneralTemplate.svelte";
    import {resumes} from "$lib/stores";

    let editMode = true;
    let resume;
    let affiliationsAwardsPublications = [];
    let skillsCertifications = [];

    const webFrameworks = [
        "CompTIA Fundamentals",
        "Certified Scrum Master",
        `Svelte`,
        `React`,
        `Vue`,
        `Angular`,
        `Polymer`,
        `Ruby on Rails`,
        `ASP.net`,
        `Laravel`,
        `Django`,
        `Express`,
        `Spring`,
    ]

    // Anytime $resumes object updates, update the specific resume here
    $: resume = $resumes.find(item => item.id === parseInt(pageSlug))

    afterUpdate(() => {
        // Update values on the resume
        if(resume) {
            if(typeof resume.skillsCertifications === "string") {
                skillsCertifications = JSON.parse(resume.skillsCertifications);
            }

            affiliationsAwardsPublications = resume.affiliations.split(",")
        }
    })
</script>


<svelte:head>
    <title>Resume</title>
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

    /*section {

    }

    section:hover, section:focus {
        outline: 4px solid #0070AD;
        outline-offset: 10px;

    }*/
</style>


<GeneralTemplate>
    {#if resume}
        <div class="header pb-3 border-bottom mb-5">
            <div class="d-flex align-items-center justify-content-between">
                <p class="h2 resume-title fw-bold">Consultant Resume</p>

                <div class="form-check form-switch">
                    <input class="form-check-input"
                           type="checkbox"
                           role="switch"
                           bind:checked={editMode}
                           id="edit-mode">
                    <label class="form-check-label" for="edit-mode">Edit Mode</label>
                </div>
            </div>

            <section>
                {#if editMode}
                    <input type="text"
                           class="form-control form-control-lg display-1 fw-bold"
                           placeholder="Your Name"
                           bind:value={resume.name}
                           aria-label="Your Name">
                {:else}
                    <h1 class="display-1 fw-bold">{resume.name}</h1>
                {/if}

                {#if editMode}{:else}{/if}
                <h2>{resume.level}</h2>
            </section>
        </div>

        <div class="row">
            <div class="col sidebar">
                <section class="mb-4">
                    <img src="/images/{resume.image === '' ? 'placeholder-avatar.png' : resume.image}"
                         alt="Profile Photo for {resume.name}"
                         class="img-fluid rounded">
                </section>

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
                    {#if editMode}
                        <textarea rows="4" class="form-control" bind:value={resume.summary}></textarea>
                    {:else}
                        <p>{resume.summary}</p>
                    {/if}
                </section>

                <section class="mb-5">
                    <h3>Education</h3>
                    {#if editMode}
                        <textarea rows="3" class="form-control" bind:value={resume.education}></textarea>
                    {:else}
                        <p>{resume.education}</p>
                    {/if}
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
                        <tr>
                            <td class="skills-category-col">Certifications</td>
                            <td>
                                {#if editMode}
                                    <MultiSelect bind:skillsCertifications
                                                 selected={skillsCertifications}
                                                 options={webFrameworks}
                                                 --sms-active-color="white" />
                                {:else}
                                    {resume.skillsCertifications}
                                {/if}

                            </td>
                        </tr>
                        <tr>
                            <td class="skills-category-col">Trained / Proficient</td>
                            <td>
                                {#if editMode}
                                    <input type="text" class="form-control" bind:value={resume.skillsTrained} aria-label="">
                                {:else}
                                    {resume.skillsTrained}
                                {/if}
                            </td>
                        </tr>
                        <tr>
                            <td class="skills-category-col">Operating Systems</td>
                            <td>
                                {#if editMode}
                                    <input type="text" class="form-control" placeholder="Windows, Linux" bind:value={resume.skillsOS} aria-label="">
                                {:else}
                                    {resume.skillsOS}
                                {/if}
                            </td>
                        </tr>
                        <tr>
                            <td class="skills-category-col">Applications and Utilities</td>
                            <td>
                                {#if editMode}
                                    <input type="text" class="form-control" placeholder="Visual Studio Code, Photoshop, Figma" bind:value={resume.skillsApplications} aria-label="">
                                {:else}
                                    {resume.skillsApplications}
                                {/if}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </section>

                <section class="mb-5">
                    <h3>Professional Affiliations, Awards, Publications</h3>
                    {#if editMode}{:else}{/if}
                    <ul>
                        {#each affiliationsAwardsPublications as item}
                            <li>{item.trim()}</li>
                        {/each}
                    </ul>
                </section>

                <section class="mb-5">
                    <h3>Professional Experience</h3>
                    {#if editMode}{:else}{/if}
                </section>
            </div><!-- end col -->
        </div><!-- end row -->
    {/if}


</GeneralTemplate>
