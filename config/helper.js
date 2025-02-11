const cheerio = require('cheerio');
const moment = require('moment')

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


module.exports = {
    truncateWords, stripHtmlTags, isWeekend
}

