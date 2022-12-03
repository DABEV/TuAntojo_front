import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-storage.js";

import { storage } from "./Firestore.js";

const saveImageFirestore = async (image) => {
  console.log(image);
  const storageRef = ref(storage, "orders/" + image.name);
  const metadata = { contentType: "img/jpeg" };
  await uploadBytes(storageRef, image, metadata).then(async() => {
    await getDownloadURL(ref(storage, storageRef.fullPath)).then(async(url) => {
      console.log(url);
      localStorage.setItem("imgUrl", url);
      return "Si esto se lee, es porque si sirve";
    });
  });
};

export { saveImageFirestore };
