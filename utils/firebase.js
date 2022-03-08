import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const auth = firebase.initializeApp(
    {
        apiKey: "AIzaSyCAOImVGzff9pXoR-jAklGX43p4Nj3_Vkg",
        authDomain: "golposholpo-ddc8b.firebaseapp.com",
        projectId: "golposholpo-ddc8b",
        storageBucket: "golposholpo-ddc8b.appspot.com",
        messagingSenderId: "78431117171",
        appId: "1:78431117171:web:f90a7625ef996e146bef06"
    }
).auth();

export default auth