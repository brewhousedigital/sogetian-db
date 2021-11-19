import { writable } from 'svelte/store';


// Resumes
export const resumes = writable([]);

export const updateResumesStore = async() => {
    let data = await fetch("/api/resumes");
    data = await data.json();
    resumes.set([...data]);
}


// Clients
export const clients = writable([]);

export const updateClientsStore = async() => {
    let data = await fetch("/api/clients");
    data = await data.json();
    clients.set([...data]);
}