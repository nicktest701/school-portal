

export const getItem = (key) => {
    return JSON.parse(localStorage.getItem(key))
}

export const saveItem = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}

export const removeItem = (key) => {
    return localStorage.removeItem(key)
}