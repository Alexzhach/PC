import { useState } from "react";

function registerForm(){
    const [formFields, setFormFields] = useState({
        username: "",
        email: "",
        password: "",
    });

    return (
        <form>
            <div>
                <label htmlFor="username"></label>
                <input 
                id="username"
                value={formFields.username}
                onChange={(e) => {
                    setFormFields((currentState) => ({
                        ...currentState,
                        username: e.target.value,
                    }))
                }}
                />
            </div>
            <div>
                <label htmlFor="email"></label>
                <input 
                id="email" 
                value={formFields.email}
                onChange={(e) => {
                    setFormFields((currentState) => ({
                        ...currentState,
                        email: e.target.value,
                    }))
                }}
                />
            </div>
            <div>
                <label htmlFor="password"></label>
                <input 
                id="password" 
                value={formFields.password}
                onChange={(e) => {
                    setFormFields((currentState) => ({
                        ...currentState,
                        password: e.target.value,
                    }))
                }}
                />
            </div>
        </form>
    )   
}