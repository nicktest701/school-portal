const { ref, uploadBytes, getDownloadURL, uploadString } = require("firebase/storage");
const fs = require("fs");
const path = require("path");

const { storage } = require("../firebase");


async function uploadFile(filename, location) {
  const filePath = path.join(process.cwd(), `/images/${location}`, filename);

  // if (process.env.NODE_ENV !== 'production') return filePath

  const storageRef = ref(storage, `${location}/${filename}`);

  try {
    // Upload the file to Cloud Storage
    await uploadBytes(storageRef, fs.readFileSync(filePath));

    // Get the download URL of the uploaded file
    const downloadURL = await getDownloadURL(storageRef);

      // Clean up local file
      fs.unlinkSync(filePath);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading file to Cloud Storage", error);
  }
}


// Upload base64 image to Firebase Storage
async function uploadBase64Image(base64Image, fileName, uploadPath = "frebbys") {
  if (!base64Image || !fileName) {
    throw new Error("Missing image data or file name");
  }

  const storageRef = ref(storage, `${uploadPath}/${fileName}`);

  // Upload the Base64 image
  await uploadString(storageRef, base64Image, "base64");

  const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${process.env.FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(uploadPath + '/' + fileName)}?alt=media`;

  return imageUrl;
}


async function getImageAsBase64(imageUrl) {
  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const base64Image = Buffer.from(response.data, "binary").toString("base64");

    // Extract content type from headers for complete base64 format
    const contentType = response.headers["content-type"];
    return `data:${contentType};base64,${base64Image}`;
  } catch (error) {
    throw new Error("Failed to fetch and convert image: " + error.message);
  }
}


async function uploadMultipleImages(files, uploadPath = "students/") {
  const uploadedUrls = [];

  for (const file of files) {
   
    const imageUrl = await uploadFile(file.filename, uploadPath);

    uploadedUrls.push({
      indexnumber: file.originalname?.split('.')[0],
      url: imageUrl
    });

    // Clean up local file
    fs.unlinkSync(filePath);
  }

  return uploadedUrls;
}




module.exports = {
  uploadFile,
  uploadBase64Image, getImageAsBase64, uploadMultipleImages
};
