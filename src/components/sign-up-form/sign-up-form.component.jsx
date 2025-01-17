import { useState, useContext } from "react";
import { 
    createAuthUserWithEmailAndPassword, 
    createUserDocumentFromAuth 
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-up-form.styles.scss';
// import { UserContext } from "../../context/user.context";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    // const { setCurrentUser } = useContext(UserContext);

    // console.log(formFields);

    const resetForm = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert('passwords do not match');
            return;
        }

        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
                
            // setCurrentUser(user);

            await createUserDocumentFromAuth(user, { displayName });
            resetForm();
            
        } catch(error) {
            if (error.code == 'auth/email-already-in-use') {
                alert('Cannot create user, enail already in use');
            } else {
                console.log('user creation encountered an error', error);

            }
        }
    }

    const handleChage = (event) => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value })
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have a account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                label="Display Name"
                type="text" 
                required 
                onChange={handleChage} 
                name="displayName"
                value={displayName}/>

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

                <FormInput
                label="Confirm Password"
                type="password" 
                required 
                onChange={handleChage} 
                name="confirmPassword"
                value={confirmPassword}/>

                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;