import data from '$lib/data/sogetiApps.json';

export async function get({ params }) {
    const { slug } = params;

    return {
        body: data
    };
}