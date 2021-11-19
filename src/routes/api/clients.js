import clients from '$lib/data/clients.json';

export async function get({ params }) {
    const { slug } = params;

    return {
        body: clients
    };
}