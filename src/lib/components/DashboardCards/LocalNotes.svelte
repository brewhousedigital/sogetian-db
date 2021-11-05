<script>
    import {onMount} from "svelte";

    let notes = []

    onMount(() => {
        if(localStorage.getItem("sogetian-notes-block") !== null) {
            notes = JSON.parse(localStorage.getItem("sogetian-notes-block"));
            sortNotes(notes);
            saveNotes();
        } else {
            // Set the empty notes
            localStorage.setItem("sogetian-notes-block", JSON.stringify([]))
        }
    })

    function handleNewNote() {
        let newItem = prompt("Enter your new note");
        notes = [...notes, {
            title: newItem,
            completed: false,
            id: Math.ceil(Math.random() * 9999999)
        }];
        sortNotes(notes);
        saveNotes();
    }

    function sortNotes(array) {
        return array.sort(function (a, b) {
            return a.completed - b.completed;
        })
    }

    function saveNotes() {
        localStorage.setItem("sogetian-notes-block", JSON.stringify(notes))
    }

    function handleDelete(e) {
        console.log(e.target)
        let thisId = parseInt(e.target.getAttribute("data-id"));

        let temporaryNotes = notes.map(item => {
            if(item.id === thisId) {
                console.log("deleting...")
                item = false;
            }

            return item;
        })

        let filtered = temporaryNotes.filter(Boolean);

        notes = [...filtered];
        sortNotes(notes);
        saveNotes();
    }
</script>


<style>
    .completed {
        opacity: 0.5;
    }

    .completed label {
        text-decoration: line-through;
    }

    .delete-note-btn * {
        pointer-events: none;
    }
</style>


<h2 class="mb-3">
    Notes
    <button type="button" class="btn btn-outline-primary btn-sm ms-4" on:click={handleNewNote}>
        <i class="bi bi-plus"></i>
        Add
    </button>
</h2>

{#each notes as note, index}
    <div class="form-check {note.completed ? 'completed' : ''}">
        <input class="form-check-input"
               type="checkbox"
               value={note.id}
               bind:checked={note.completed}
               on:change={saveNotes}
               id="dashboard-note-{index}">

        <label class="form-check-label"
               for="dashboard-note-{index}">{note.title}</label>

        {#if note.completed}
        <button class="btn btn-sm delete-note-btn" on:click={handleDelete} data-id={note.id}>
            <i class="bi bi-trash"></i>
        </button>
        {/if}
    </div><!-- end form check -->
{:else}
    <p>You don't have any notes. Get to writing! ✏</p>
{/each}