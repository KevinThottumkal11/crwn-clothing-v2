import { useState } from "react";

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

    const handleChage = (event) => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value })
    }

    return (
        <div>
            <h1>Sign up with your email and password</h1>
            <form onSubmit={() => {}}>
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