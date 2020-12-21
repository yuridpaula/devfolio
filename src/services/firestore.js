import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,// "AIzaSyCgWA3o90mIrK_8ufqfhH-plNKOrBfOozk",
  authDomain: process.env.REACT_APP_AUTH_DOMAIN, //"yuri-devfolio.firebaseapp.com",
  databaseURL: process.env.REACT_APP_DATABASE_URL, //"https://yuri-devfolio.firebaseio.com",
  projectId: process.env.REACT_APP_PROJECT_ID, //"yuri-devfolio",
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET, // "yuri-devfolio.appspot.com",
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID, // "383925707815",
  appId: process.env.REACT_APP_APP_ID, //"1:383925707815:web:8c4e444f742ce153e25a02",
  measurementId: process.env.REACT_APP_MEASUREMENT_ID //"G-K1QSZ63CQJ"
};

firebase.initializeApp(firebaseConfig)
firebase.analytics()

const db = firebase.firestore()

export const auth = firebase.auth()

export const storage = firebase.storage()

export const storageKey = 'KEY_FOR_LOCAL_STORAGE'

export const isAuthenticated = () => {
  return !!auth.currentUser || !!localStorage.getItem(storageKey)
}

export const authenticateAnonymously = () => {
  return firebase.auth().signInAnonymously();
};

//retrieve data
export const getProfile = () => {
  return db.collection('profile')
    .doc('data')
    .get()
}

export const getTechs = () => {
  return db.collection('techs')
    .get()
}

export const getIcons = () => {
  return db.collection('icons')
    .get()
}

export const getMediaSocial = () => {
  return db.collection('mediasocial')
    .get()
}

export const getProjects = () => {
  return db.collection('projects')
    .get()
}

export const getTestimonials = () => {
  return db.collection('testimonials')
    .get()
}

//save data
export const saveProfile = profile => {
  return db.collection('profile')
    .doc('data')
    .set(profile)
}

export const saveIcon = (icon, ref) => {
  return db.collection('icons')
    .doc(ref)
    .set(icon)
}

export const saveMediaSocial = (media, ref) => {
  return db.collection('mediasocial')
    .doc(ref)
    .set(media)
}

export const saveTechs = (techs, ref) => {
  return db.collection('techs')
    .doc(ref)
    .set(techs)
}

export const saveProjects = (project, ref) => {
  if (ref) {
    return db.collection('projects')
      .doc(ref)
      .set(project)
  } else {
    return db.collection('projects')
      .add(project)
  }
}

export const saveTestimonials = (testimonials, ref) => {

  if (ref) {
    return db.collection('testimonials')
      .doc(ref)
      .set(testimonials)
  } else {
    return db.collection('testimonials')
      .add(testimonials)
  }
}

//delete data
export const deleteIcons = (icon) => {
  return db.collection('icons')
    .doc(icon)
    .delete()
}

export const deleteMediaSocial = (media) => {
  return db.collection('mediasocial')
    .doc(media)
    .delete()
}

export const deleteTechs = (techs) => {
  return db.collection('techs')
    .doc(techs)
    .delete()
}

export const deleteProjects = (project) => {
  return db.collection('projects')
    .doc(project)
    .delete()
}

export const deleteTestimonials = (testimonials) => {
  return db.collection('testimonials')
    .doc(testimonials)
    .delete()
}