import React, {useState} from 'react';
import * as yup from 'yup';
import axios from "axios";
import User from "./User";

const formSchema = yup.object().shape({
    name: yup.string().required("dude, put your name in"),
    email: yup.string().email("That's not a real email").required("That's not a real email, shitbag"),
    password: yup.string(),
    terms: yup.boolean().oneOf([true], "Check the box dog")
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

    //User State
    const [user, setUser] = useState([])

    const validate = e => {
        let value =
          e.target.type === "checkbox" ? e.target.checked : e.target.value;
        yup
          .reach(formSchema, e.target.name)
          .validate(value)
          .then(valid => {
            SetErrors({
              ...errors,
              [e.target.name]: ""
            });
          })
          .catch(err => {
            SetErrors({
              ...errors,
              [e.target.name]: err.errors[0]
            });
          });
      };
    


    

    //onSubmit function
    const formSubmit = (e) => {
        e.preventDefault();
        
        axios
      .post("https://reqres.in/api/users", formState)
      .then(response => setUser(response.data))
      .catch(err => console.log(err));
      
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
                  <button>Submit</button>
                </label>
            </form>
            <User user = {user}/>
        </div>
    )

}

export default Form;