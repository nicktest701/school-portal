import moment from "moment";

export const getItem = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const saveItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeItem = (key) => {
  return localStorage.removeItem(key);
};

export const isWeekend = (date) => {
  const day = moment(date).day();
  return day === 0 || day === 6; // 0 is Sunday, 6 is Saturday
};

// Convert Base64 to Blob and create Object URL
// const base64ToBlobUrl = (base64) => {
//   // Split the Base64 string into parts
//   const parts = base64.split(";base64,");
//   const contentType = parts[0].split(":")[1];
//   const raw = window.atob(parts[1]);
//   const rawLength = raw.length;
//   const uInt8Array = new Uint8Array(rawLength);

//   for (let i = 0; i < rawLength; ++i) {
//     uInt8Array[i] = raw.charCodeAt(i);
//   }

//   const blob = new Blob([uInt8Array], { type: contentType });
//   return URL.createObjectURL(blob);
// };

export const getLastPathname = (path) => {
  const segments = path.split("/").filter(Boolean); // Remove empty segments
  return segments.length ? segments[segments.length - 1] : "/";
};

export function generateRandomRGBAColors(count = 10) {
  const colors = [];

  for (let i = 0; i < count; i++) {
    const r = Math.floor(Math.random() * 256); // Red: 0-255
    const g = Math.floor(Math.random() * 256); // Green: 0-255
    const b = Math.floor(Math.random() * 256); // Blue: 0-255
    // const a = Math.random().toFixed(2); // Alpha: 0.00-1.00

    colors.push(`rgb(${r}, ${g}, ${b})`);
  }

  return ["rgb(255, 192, 159)", " rgb(1, 46, 84)", ...colors];
}

export function generateRGBAColorsBetween(
  minColor = { r: 1, g: 46, b: 84 },
  maxColor = { r: 255, g: 192, b: 159 },
  count = 10
) {
  const colors = [];

  for (let i = 0; i < count; i++) {
    const r = Math.floor(
      Math.random() * (maxColor.r - minColor.r) + minColor.r
    );
    const g = Math.floor(
      Math.random() * (maxColor.g - minColor.g) + minColor.g
    );
    const b = Math.floor(
      Math.random() * (maxColor.b - minColor.b) + minColor.b
    );
    const a = Math.random().toFixed(2); // alpha from 0.00 to 1.00

    colors.push(`rgba(${r}, ${g}, ${b}, ${a})`);
  }

  return colors;
}

