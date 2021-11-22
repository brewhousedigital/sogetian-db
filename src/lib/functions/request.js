// Helper functions
import {slug} from "$lib/functions/slug";


/** These values control the localStorage and API route names. */
const resumesStorageName = "cache-resumes";
const resumesAPI = "/api/resumes";

const clientsStorageName = "cache-clients";
const clientsAPI = "/api/clients";

const sogetiLevelsStorageName = "cache-sogeti-levels";
const sogetiLevelsAPI = "/api/resumes/levels";
const sogetiCertificationsStorageName = "cache-sogeti-certifications";
const sogetiCertificationsAPI = "/api/resumes/certifications";
const sogetiTrainedStorageName = "cache-sogeti-trained";
const sogetiTrainedAPI = "/api/resumes/trained";
const sogetiAppsStorageName = "cache-sogeti-apps";
const sogetiAppsAPI = "/api/resumes/apps";


/**
 * This will query the localStorage for data, and then fetch fresh data if necessary.
 * @param {string} storageName - The key name of the localStorage item.
 * @param {string} api - The endpoint of the needed API.
 * @returns {JSON}
 */
async function checkCache(storageName, api) {
    if(localStorage.getItem(storageName) === null) {
        // Fetch from azure db
        let data = await fetch(api);
        data = await data.json();

        // Save to local storage for caching
        localStorage.setItem(storageName, JSON.stringify(data));
    }

    // Returns JSON
    return JSON.parse(localStorage.getItem(storageName));
}


/**
 * This returns the entire list of Resumes.
 * @returns {JSON}
 */
export const getAllResumes = () => {
    return checkCache(resumesStorageName, resumesAPI);
}


/**
 * This returns a specific resume by searching for an ID.
 * @param {int} pageSlug - This comes from the dynamic page URL like /resumes/5.
 * @returns {JSON}
 */
export const getResume = async(pageSlug) => {
    let resumeData = await getAllResumes();

    // Convert to number
    let pageID = Number(pageSlug);

    // The pageID must be an integer
    if(!isNaN(pageID)) {
        return resumeData.find(item => item.id === pageID);
    } else {
        return {}
    }
}


export const getResumeOptionValues = async() => {
    let sogetiLevels = await checkCache(sogetiLevelsStorageName, sogetiLevelsAPI);
    let sogetiCertifications = await checkCache(sogetiCertificationsStorageName, sogetiCertificationsAPI);
    let sogetiTrained = await checkCache(sogetiTrainedStorageName, sogetiTrainedAPI);
    let sogetiApps = await checkCache(sogetiAppsStorageName, sogetiAppsAPI);

    return [sogetiLevels, sogetiCertifications, sogetiTrained, sogetiApps];
}


/**
 * This returns the entire list of Clients.
 * @returns {JSON}
 */
export const getAllClients = () => {
    return checkCache(clientsStorageName, clientsAPI);
}


/**
 * This returns a specific client by searching for its slugified name.
 * @param {string} pageSlug - This comes from the dynamic page URL like /clients/employbridge.
 * @returns {JSON}
 */
export const getClient = async(pageSlug) => {
    let clientData = await getAllClients();

    // Loop through and see what slugified name matches the requested client
    return clientData.find(item => slug(item.name) === pageSlug);
}


export const resetCache = async() => {
    localStorage.removeItem(resumesStorageName);
    localStorage.removeItem(clientsStorageName);
}


