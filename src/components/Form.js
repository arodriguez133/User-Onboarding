import React, {useState} from 'react';
import * as yup from 'yup';

const formSchema = yup.object().shape({
    name: yup.string().required("dude, put your name in"),
    email: yup.string().email().required("That's not a real email, shitbag"),
    password: yup.string(),
    terms: yup.boolean().oneOf([true], "Oh, so you disagree? Get the hell out of here")
})

const Form = () => {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        password:"",
        terms: false
    })

    //error handling state
    const [errors, SetErrors] = useState({
        name: "",
        email: "",
        password: "",
        terms: ""
    })

    const validate = (e) => {
        yup.reach(formSchema, e.target.name)
        .validate(e.target.value)
        .then(valid => {
            SetErrors({
                ...errors,
                [e.target.name]: ""
            })
        })
        .catch(err => {
            // console.log(err.errors)
            SetErrors({
                ...errors,
                [e.target.name]:err.errors[0]
            })
        })
    }

    //onSubmit function
    const formSubmit = (e) => {
        e.preventDefault();

      
    }

    //onChange function

    const inputChange = e => {
        e.persist()

        validate(e)

        let value = e.target.type === "checkbox" ? e.target.checked : e.target.value
        setFormState({...formState, [e.target.name]: value})
    }


    return(
        <div>
            <form onSubmit = {formSubmit}>
                <input type="text" name="name"  value = {formState.name} onChange = {inputChange} placeholder = "Name:"></input>
                <input type ="text" name="email"  value = {formState.email} onChange = {inputChange} placeholder = "Email:"></input>
                 {errors.email.length > 0 ? <p>{errors.email}</p> : null}
                <input type = "text" name="password" value = {formState.password} onChange = {inputChange} placeholder = "Password:"></input>
                 {errors.password.length > 0 ? <p>{errors.password}</p>: null}
                <label htmlFor = "terms">
                  I have read the Terms and Conditions:
                  <input type = "checkbox" id = "terms" name = "terms" value = {formState.terms} onChange = {inputChange}/>
                 {errors.terms.length > 0 ? <p>{errors.terms}</p>: null }
                  <button type="button">Submit</button>
                </label>
            </form>
        </div>
    )

}

export default Form;