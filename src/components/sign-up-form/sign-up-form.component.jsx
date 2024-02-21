import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    console.log(formFields);

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
        <div>
            <h1>Sign up with your email and password</h1>
            <form onSubmit={handleSubmit}>
                <label>Display Name</label>
                <input 
                type="text" 
                required 
                onChange={handleChage} 
                name="displayName"
                value={displayName}/>

                <label>Email</label>
                <input 
                type="email" 
                required 
                onChange={handleChage} 
                name="email"
                value={email}/>

                <label>Password</label>
                <input 
                type="password" 
                required 
                onChange={handleChage} 
                name="password"
                value={password}/>

                <label>Confirm Password</label>
                <input t
                ype="password" 
                required 
                onChange={handleChage} 
                name="confirmPassword"
                value={confirmPassword}/>

                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUpForm;