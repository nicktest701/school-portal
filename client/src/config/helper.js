
import moment from 'moment';

export const getItem = (key) => {
    return JSON.parse(localStorage.getItem(key))
}

export const saveItem = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}

export const removeItem = (key) => {
    return localStorage.removeItem(key)
}

export const isWeekend = (date) => {
    const day = moment(date).day();
    return day === 0 || day === 6; // 0 is Sunday, 6 is Saturday
};