import data from '$lib/data/sogetiTrained.json';

export async function get({ params }) {
    const { slug } = params;

    return {
        body: data
    };
}