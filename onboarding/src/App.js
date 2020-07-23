import React, { useState, useEffect } from 'react';
import './App.css';
import FormData from './Form'
import formSchema from './validation/formSchema'
import Friend from './Friend'
import axios from 'axios'
import * as yup from 'yup'

const initialFormValues = {

  username: '',
  email: '',
  password: '',


  termsService: {
    terms: false,
  },
}
const initialFormErrors = {
  username: '',
  email: '',
  password: '',
}
const initialFriends = []
const initialDisabled = true


export default function App() {

  const [friends, setFriends] = useState(initialFriends) 
  const [formValues, setFormValues] = useState(initialFormValues) 
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled) 


  const postNewFriend = newFriend => {
 
    axios.post('https://reqres.in/api/users', newFriend)
      .then(res => {
        setFriends([res.data, ...friends])
        setFormValues(initialFormValues)
      })
      .catch(err => {  
        
      })
  }

  const inputChange = (name, value) => {
    
    yup
      .reach(formSchema, name)
     
      .validate(value)
      
      .then(valid => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        })
      })
  
      .catch(err => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        })
      })

    setFormValues({
      ...formValues,
      [name]: value 
    })
  }

  const checkboxChange = (name, isChecked) => {
 
    setFormValues({
      ...formValues,
      termsService: {
        ...formValues.termsService,
        [name]: isChecked, 
      }
    })
  }

  const submit = () => {
    const newFriend = {
      username: formValues.username.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      
      termsService: Object.keys(formValues.termsService).filter(hb => formValues.termsService[hb]),
    }

    postNewFriend(newFriend)
  }


  useEffect(() => {

    formSchema.isValid(formValues).then(valid => {
      setDisabled(!valid)
    })
  }, [formValues])

  return (
    <div className='container'>
      <header><h1></h1></header>

      <FormData
        values={formValues}
        inputChange={inputChange}
        checkboxChange={checkboxChange}
        submit={submit}
        disabled={disabled}
        errors={formErrors}
      />

      {
        friends.map(friend => {
          return (
            <Friend key={friend.id} details={friend} />
          )
        })
      } 
    </div>
  )
}
