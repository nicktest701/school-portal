
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

  // Convert Base64 to Blob and create Object URL
  const base64ToBlobUrl = (base64) => {
    // Split the Base64 string into parts
    const parts = base64.split(';base64,');
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    const blob = new Blob([uInt8Array], { type: contentType });
    return URL.createObjectURL(blob);
  };


  export const getLastPathname = (path) => {
    const segments = path.split("/").filter(Boolean); // Remove empty segments
    return segments.length ? segments[segments.length - 1] : "/";
  }