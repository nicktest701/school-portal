const fs = require('fs/promises');
async function ImageToBase64(url, format) {
  const image = await fs.readFile(url, { encoding: 'base64' });
  return `data:${format};base64,${image}`;
}

module.exports = ImageToBase64;
