import React, {useContext, useState} from 'react'
import AuthForm from '../AuthForm/AuthForm'
import '../AuthForm/AuthForm.css'
import {useNavigate} from "react-router-dom";
import {AuthService} from "../../AuthService";
import {AlertContext} from "../../../../common/context/alert/AlertContext";

function Signup() {

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const alert = useContext(AlertContext)

  const signup = (data) => {
      setLoading(true)
     AuthService.signUp(data).then(() =>   navigate('/login'))
         .catch(e => alert.show({variant: 'danger', text: 'Wrong Email or Password'}))
         .finally(() => setLoading(false))
  }

  return (
    <AuthForm
    loading={loading}
    title={'Sign up to continue'}
    isSignUpOpened={true}
    submit={signup}
    />
  )
}

export default Signup