import { auth } from "./firebase";

// SignUp User
export function signup(username, password){
    return auth.createUserWithEmailAndPassword(username, password)
    // .then((userCredential) => {
    //     // Signed in 
    //     console.log(userCredential.user)
    //     // ...
    // })
    // .catch((error) => {
    //     alert(error.message)
    //     console.log(error.code)
    //     console.log(error.message)
    //     // ..
    // });
}

// SignIn User
export async function signin(username, password){
    console.log(username)
    console.log(password)
    console.log(auth)

    return auth.signInWithEmailAndPassword(username, password)
    // .then((userCredential) => {
    //   // Signed in 
    //     // console.log(userCredential.user)
    //   // ...
    // }).catch((error) => {

    // })
}

// SignOut User
export async function signout(){
    return auth.signOut()
    .then(() => {
        // Sign-out successful.
        console.log("LogOut Success")
    }).catch((error) => {
        alert(error.message)
        console.log(error.code)
        console.log(error.message)
    });
}

// GetUser SignIn
export async function getuser(){
 return auth.onAuthStateChanged((user) => {
    if (user !== null) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log("User logged in : ", uid)
        user.providerData.forEach((profile) => {
            console.log("Sign-in provider: " + profile.providerId);
            console.log("  Provider-specific UID: " + profile.uid);
            console.log("  Name: " + profile.displayName);
            console.log("  Email: " + profile.email);
            console.log("  Photo URL: " + profile.photoURL);
          });
        // ...
    } else {
        // User is signed out
        // ...
    }})
}