import React from 'react'

export default function Form(props) {
  const {
    values,
    submit,
    inputChange,
    checkboxChange,
    disabled,
    errors,
  } = props

  const onSubmit = evt => {
    evt.preventDefault()
    submit()
  }

  const onCheckboxChange = evt => {
    const { name, checked } = evt.target
    checkboxChange(name, checked)
  }

  const onInputChange = evt => {
    const { name, value } = evt.target
    inputChange(name, value)
  }

  return (
    <form className='form container' onSubmit={onSubmit}>
      <div className='form-group submit'>

        <div className='errors'>
         
          <div>{errors.username}</div>
          <div>{errors.email}</div>
        </div>
      </div>

      <div className='form-group inputs'>
        <h4>User Information</h4>

        <label>Name&nbsp;
          <input
            value={values.username}
            onChange={onInputChange}
            name='username'
            type='text'
          />
        </label><br/>

        <label>Email
          <input
            value={values.email}
            onChange={onInputChange}
            name='email'
            type='text'
          />
        </label><br/>

        <label>Password
          <input
            value={values.password}
            onChange={onInputChange}
            name='password'
            type='password'
          />
        </label><br/>
      </div>

      <div className='form-group checkboxes'>


        <label>I have read the Terms of Service
          <input
            type="checkbox"
            name='terms'
            checked={values.termsService.terms === true}
            onChange={onCheckboxChange}
          />
        </label><br/>

        <button >submit</button>

      </div>
    </form>
  )
}
