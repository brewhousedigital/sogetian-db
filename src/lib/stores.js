import { writable } from 'svelte/store';

export const resumes = writable([]);

export const updateResumes = async() => {
    let data = await fetch("/api/resumes");
    data = await data.json();
    resumes.set([...data]);
}