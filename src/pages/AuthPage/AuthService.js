import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../firebase";

export class AuthService {

     static signIn({email, password}) {
        return signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                localStorage.setItem('User', JSON.stringify({email: userCredential.user.email, id: userCredential.user.uid}))
            })

     }

    static signUp({email, password}) {
        return createUserWithEmailAndPassword(auth, email, password)

    }

    static logout() {
        localStorage.removeItem('User')
    }

    static getUser(){
         return JSON.parse(localStorage.getItem('User'))
    }
}