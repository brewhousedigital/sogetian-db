<script context="module">
    export async function load(pageInformation) {
        // Dynamic folders return objects
        let slug = pageInformation.page.params;
        return {props: {pageSlug: slug.person}};
    }
</script>

<script>
    export let pageSlug;

    import ResumeEditBtn from "$lib/components/Resume/ResumeEditBtn.svelte";
    import {afterUpdate} from "svelte";
    import MultiSelect from 'svelte-multiselect'
    import GeneralTemplate from "$lib/layouts/GeneralTemplate.svelte";
    import {resumes} from "$lib/stores";

    let resume;
    let affiliationsAwardsPublications = [];
    let skillsCertifications = [];

    let modalTitle = "";
    let modalContent = "";
    let modalBindValue;
    let modalBindValueSkillsCerts;
    let modalBindValueSkillsTrained;
    let modalBindValueSkillsApps;
    let modalSelectOptions = [];
    let modalPlaceholder = "";
    let handleModalSave = () => {}

    const sogetiLevels = [
        "Consultant A1",
        "Consultant A2",
        "Senior Consultant",
        "Manager",
        "Senior Manager",
        "Director",
        "Vice President"
    ];

    const sogetiCertifications = [
        "CompTIA Fundamentals",
        "Certified Scrum Master",
        "Azure Cloud",
        "AWS Cognito",
    ]

    const sogetiTrained = [
        "Front-end Development",
        "Back-end Development",
        "Graphic Design",
        "Web Design",
        "UX Research",
        "QA Testing",
        "Scrum / Agile",
        "Machine Learning"
    ]

    const sogetiApps = [
        "Photoshop",
        "Visual Studio Code",
        "WebStorm",
        "Svelte",
        "React",
        "Angular",
        "Gatsby",
        "FaunaDB",
        "Figma",
        "Sketch"
    ]

    // Anytime $resumes object updates, update the specific resume here
    $: resume = $resumes.find(item => item.id === parseInt(pageSlug))

    let editMode = false;
    let editModeText = "Edit Mode";

    afterUpdate(() => {
        // Update values on the resume
        if(resume) {
            skillsCertifications = resume.skillsCertifications.split(",");
            affiliationsAwardsPublications = resume.affiliations.split(",")
        }
    })

    function handleEdit(type) {
        let editModal = new bootstrap.Modal(document.getElementById('edit-resume-modal'))

        if(type === "name") {
            modalContent = "input";
            modalTitle = "Edit Your Name";
            modalPlaceholder = "My name is...";
            modalBindValue = resume.name;
            handleModalSave = (e) => {
                e.preventDefault();
                resume.name = modalBindValue;
                editModal.hide();
            }
        }

        if(type === "level") {
            modalContent = "select";
            modalTitle = "Edit Level";
            modalBindValue = [resume.level];
            modalSelectOptions = sogetiLevels;
            handleModalSave = (e) => {
                e.preventDefault();
                console.log("modalBindValue", modalBindValue)
                resume.level = modalBindValue;
                editModal.hide();
            }
        }

        if(type === "summary") {
            modalContent = "textarea";
            modalTitle = "Edit Summary";
            modalPlaceholder = "Tell us a bit about yourself";
            modalBindValue = resume.summary;
            handleModalSave = (e) => {
                e.preventDefault();
                resume.summary = modalBindValue;
                console.log(">>resume.summary", resume.summary)
                editModal.hide();
            }
        }

        if(type === "education") {
            modalContent = "textarea";
            modalTitle = "Edit Education";
            modalPlaceholder = "University of...";
            modalBindValue = resume.summary;
            handleModalSave = (e) => {
                e.preventDefault();
                resume.education = modalBindValue;
                editModal.hide();
            }
        }

        if(type === "skills") {
            modalContent = "skills";
            modalTitle = "Edit Skills";
            modalBindValueSkillsCerts = resume.skillsCertifications.split(",");
            modalBindValueSkillsTrained = resume.skillsTrained.split(",");
            modalBindValueSkillsApps = resume.skillsApplications.split(",");

            handleModalSave = (e) => {
                e.preventDefault();
                resume.skillsCertifications = modalBindValueSkillsCerts.join(", ");
                resume.skillsTrained = modalBindValueSkillsTrained.join(", ");
                resume.skillsApplications = modalBindValueSkillsApps.join(", ");
                editModal.hide();
            }
        }

        editModal.show();
    }

    function handleEditResume() {
        editMode = !editMode;

        editMode
            ? editModeText = "Stop Editing"
            : editModeText = "Edit Mode";
    }
</script>


<svelte:head>
    <title>Resume</title>
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
    {#if resume}
        <button id="edit-mode-btn" class="btn btn-outline-primary" on:click={handleEditResume}>
            <i class="bi bi-pencil"></i>
            {editModeText}
        </button>

        <div class="header pb-3 border-bottom mb-5">
            <p class="h2 resume-title fw-bold">Consultant Resume</p>

            <section>
                <h1 class="display-1 fw-bold">{resume.name} <ResumeEditBtn isVisible={editMode} {handleEdit} type="name"/></h1>
                <h2>{resume.level} <ResumeEditBtn isVisible={editMode} {handleEdit} type="level"/></h2>
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
                    <h3>Summary <ResumeEditBtn isVisible={editMode} {handleEdit} type="summary"/></h3>
                    <p class="preserve-whitespace">{resume.summary}</p>
                </section>

                <section class="mb-5">
                    <h3>Education <ResumeEditBtn isVisible={editMode} {handleEdit} type="education"/></h3>
                    <p class="preserve-whitespace">{resume.education}</p>
                </section>

                <section class="mb-5">
                    <h3>Skills, Training, and Certifications <ResumeEditBtn isVisible={editMode} {handleEdit} type="skills"/></h3>
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
                                {resume.skillsCertifications}
                            </td>
                        </tr>
                        <tr>
                            <td class="skills-category-col">Trained / Proficient</td>
                            <td>{resume.skillsTrained}</td>
                        </tr>
                        <!--<tr>
                            <td class="skills-category-col">Operating Systems</td>
                            <td>{resume.skillsOS}</td>
                        </tr>-->
                        <tr>
                            <td class="skills-category-col">Applications and Utilities</td>
                            <td>{resume.skillsApplications}</td>
                        </tr>
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



    <!-- Modal -->
    <div class="modal fade" id="edit-resume-modal" tabindex="-1" aria-labelledby="edit-resume-modal-label" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <form class="modal-content border-0 shadow" on:submit={handleModalSave}>
                <div class="modal-header border-0">
                    <h3 class="modal-title" id="edit-resume-modal-label">{modalTitle}</h3>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    {#if modalContent === "input"}
                        <input type="text" class="form-control" placeholder={modalPlaceholder} bind:value={modalBindValue}>
                    {/if}

                    {#if modalContent === "textarea"}
                        <textarea class="form-control" placeholder={modalPlaceholder} bind:value={modalBindValue} rows="4"></textarea>
                    {/if}

                    {#if modalContent === "select"}
                        <MultiSelect bind:modalBindValue
                                     maxSelect={1}
                                     on:change={event => {modalBindValue = event.detail.token}}
                                     selected={modalBindValue}
                                     options={modalSelectOptions} />
                    {/if}

                    {#if modalContent === "skills"}
                        <div class="mb-3">
                            <p class="fw-bold">Certifications</p>
                            <MultiSelect bind:modalBindValueSkillsCerts
                                         on:change={event => {modalBindValueSkillsCerts = [...modalBindValueSkillsCerts, event.detail.token]}}
                                         selected={modalBindValueSkillsCerts}
                                         options={sogetiCertifications}/>
                        </div>

                        <div class="mb-3">
                            <p class="fw-bold">Trained / Proficient</p>
                            <MultiSelect bind:modalBindValueSkillsTrained
                                         on:change={event => {modalBindValueSkillsTrained = [...modalBindValueSkillsTrained, event.detail.token]}}
                                         selected={modalBindValueSkillsTrained}
                                         options={sogetiTrained}/>
                        </div>

                        <div class="mb-3">
                            <p class="fw-bold">Applications and Utilities</p>
                            <MultiSelect bind:modalBindValueSkillsApps
                                         on:change={event => {modalBindValueSkillsApps = [...modalBindValueSkillsApps, event.detail.token]}}
                                         selected={modalBindValueSkillsApps}
                                         options={sogetiApps}/>
                        </div>

                    {/if}
                </div>
                <div class="modal-footer border-0">
                    <button type="button" class="btn me-4" data-bs-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary px-5">Save</button>
                </div>
            </form>
        </div>
    </div>
</GeneralTemplate>
