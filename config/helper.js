const cheerio = require('cheerio');


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


module.exports = {
    truncateWords, stripHtmlTags
}

