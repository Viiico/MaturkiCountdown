import * as fs from 'fs';
const terminy = fs.readFileSync('terminy.json', 'utf8');
const now = new Date();

function parsePolishDate(polishDateString) {
    const [dates, time] = polishDateString.split(' ');
    const parsedDates = dates.split('.');
    const parsedTime = time.split(':');
    const date = new Date(parsedDates[2], parsedDates[1] - 1, parsedDates[0], parsedTime[0], parsedTime[1]);
    return date;
}

function countDown(termin) {
    const remainingTime = parsePolishDate(termin) - now;

    const seconds = Math.floor((remainingTime / 1000) % 60);
    const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
    const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

Object.entries(JSON.parse(terminy)).forEach(([egzamin, termin]) => {
    console.log(`${egzamin}: \t${countDown(termin)}`);
})