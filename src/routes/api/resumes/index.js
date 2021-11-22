import resumes from '$lib/data/resumes.json';

export async function get({ params }) {
    const { slug } = params;

    return {
        body: resumes
    };
}