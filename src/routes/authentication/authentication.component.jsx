import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import { 
    auth,
    signInWithGooglePopup,
    signInWithGoogleRedirect, 
    createUserDocumentFromAuth 
} from "../../utils/firebase/firebase.utils";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";

import './authentication.styles.scss';

const Authentication = () => {
    useEffect(async () => {
        const response = await getRedirectResult(auth);
        // console.log(response);
        if (response) {
            const userDocRef = await createUserDocumentFromAuth(response.user);
        }
    }, [])

    // Will not console.log because we are redirected to a different domain. 
    // So it will not process the code after the redirect

    // const logGoogleRedirectUser = async () => {
    //     const { user } = await signInWithGoogleRedirect();
    //     console.log({user});
    // }

    return (
        <div className="authentication-container">
            {/* <button onClick={logGoogleUser}>Sign In with Google Popup</button>
            <button onClick={signInWithGoogleRedirect}>Sign In with Google Redirect</button> */}
            <SignInForm />
            <SignUpForm />
        </div>
    )
}

export default Authentication;