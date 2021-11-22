import data from '$lib/data/sogetiCertifications.json';

export async function get({ params }) {
    const { slug } = params;

    return {
        body: data
    };
}