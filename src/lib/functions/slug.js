import slugify from 'slugify';

// Options
// https://www.npmjs.com/package/slugify#user-content-options

export const slug = (string) => {
    return slugify(string, {
        lower: true,  // convert to lower case
        strict: true, // strip special characters except replacement
        locale: 'en', // language code of the locale to use
    });
}