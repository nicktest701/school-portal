const cheerio = require('cheerio');
const moment = require('moment')
const axios = require('axios');



function stripHtmlTags(html) {
    const $ = cheerio.load(html);
    return $.text();
}


function truncateWords(paragraph, size) {
    const stripedWords = stripHtmlTags(paragraph);

    if (stripedWords?.length <= size) return stripedWords;

    const words = stripedWords?.split(' ');
    return words.slice(0, size)?.join(' ');
}

const isWeekend = (date) => {
    const day = moment(date).day();
    return day === 0 || day === 6; // 0 is Sunday, 6 is Saturday
};



/**
 * Converts an image from a URL to a Base64 string.
 * @param {string} imageUrl - The URL of the image.
 * @returns {Promise<string>} - A promise that resolves to a Base64 encoded image string.
 */
const convertImageToBase64 = async (imageUrl) => {
    try {
        // Fetch the image as binary data
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

        // Convert binary data to Base64
        const base64Image = Buffer.from(response.data).toString('base64');

        // Get the image MIME type from headers
        const mimeType = response.headers['content-type'];

        // Return the Base64 image in proper format
        return `data:${mimeType};base64,${base64Image}`;
    } catch (error) {
        console.error('Error converting image to Base64:', error);
        throw new Error('Failed to convert image to Base64');
    }
};




module.exports = {
    truncateWords, stripHtmlTags, isWeekend, convertImageToBase64
}

