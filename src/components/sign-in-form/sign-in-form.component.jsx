import { useState, useContext } from "react";
import { 
    createAuthUserWithEmailAndPassword, 
    createUserDocumentFromAuth,
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import './sign-in-form.styles.scss';
// import { UserContext } from "../../context/user.context";

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    // const { setCurrentUser } = useContext(UserContext);

    // console.log(formFields);

    const SignInWithGoogle = async () => {
        await signInWithGooglePopup();
        
    }

    const resetForm = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const {user} = await signInAuthUserWithEmailAndPassword(email, password);
            // console.log(response);
            // setCurrentUser(user);

            resetForm();
            
        } catch(error) {
            switch(error.code) {
                case "auth/wrong-password":
                    alert('Incorrect password for email');
                    break;

                case "auth/user-not-found":
                    alert("No user associated with thsi email");
                    break;

                default:
                    console.log(error);
            }
            // if (error.code === "auth/wrong-password") {
            //     alert('Incorrect password for email');
            // } else if (error.code === "auth/
        }
    }

    const handleChage = (event) => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value })
    }

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                label="Email"
                type="email" 
                required 
                onChange={handleChage} 
                name="email"
                value={email}/>

                <FormInput 
                label="Password"
                type="password" 
                required 
                onChange={handleChage} 
                name="password"
                value={password}/>

                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={SignInWithGoogle}>
                        Google Sign In
                    </Button>
                </div>
                
            </form>
        </div>
    )
}

export default SignInForm;