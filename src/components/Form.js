import React, {useState} from 'react';
import * as yup from 'yup';

const formSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().password().required(),
    terms: yup.boolean().oneOf([true])
})

const Form = () => {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        password:"",
        terms: false
    })

    //onSubmit function
    const formSubmit = (e) => {
        e.preventDefault();

        setFormState({name: "", email: "", password: "", terms: false})
    }

    //onChange function

    const inputChange = e => {
        let value = e.target.type === "checkbox" ? e.target.checked : e.target.value
        setFormState({...formState, [e.target.name]: value})
    }


    return(
        <div>
            <form onSubmit = {formSubmit}>
                <input type="text" name="name"  value = {formState.name} onChange = {inputChange} placeholder = "Name:"></input>
                <input type ="text" name="email"  value = {formState.email} onChange = {inputChange} placeholder = "Email:"></input>
                <input type = "text" name="password" value = {formState.password} onChange = {inputChange} placeholder = "Password:"></input>
                <label htmlFor = "terms">
                  I have read the Terms and Conditions:
                  <input type = "checkbox" id = "terms" name = "terms" value = {formState} onChange = {inputChange}/>
                  <button type="button">Submit</button>
                </label>
            </form>
        </div>
    )

}

export default Form;