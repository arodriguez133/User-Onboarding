import React, {useState} from 'react';



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
    }

    //onChange function

    const inputChange = e => {
        let value = e.target.type === "checkbox" ? e.target.checked : e.target.value
        setFormState({...formState, [e.target.name]: value})
    }


    return(
        <div>
            <form>
                <input type="text" name="name" placeholder="Name:"></input>
                <input type ="text" name="email" placeholder="Email:"></input>
                <input type = "text" name="password" placeholder="Password:"></input>
                <label htmlFor = "terms">
                  I have read the Terms and Conditions:
                  <input type = "checkbox" id = "terms" name = "terms"/>
                  <button type="button">Submit</button>
                </label>
            </form>
        </div>
    )

}

export default Form;