import data from '$lib/data/sogetiLevels.json';

export async function get({ params }) {
    const { slug } = params;

    return {
        body: data
    };
}