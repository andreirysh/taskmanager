import React, {useContext, useState} from 'react'
import AuthForm from '../AuthForm/AuthForm'
import '../AuthForm/AuthForm.css'
import {  useNavigate } from "react-router-dom";
import { AuthService } from "../../AuthService";
import {AlertContext} from "../../../../common/context/alert/AlertContext";

function Login() {

  const [loading, setLoading] = useState(false)
  const alert = useContext(AlertContext)
  const navigate = useNavigate()
  
  const login = (data) => {
    setLoading(true)
    AuthService.signIn(data).
      then(() => {
        navigate('/tasks')
      })
        .catch(e => alert.show({variant: 'danger', text: 'Wrong Email or Password'}))
        .finally(() => setLoading(false))
  }

  return (
    <AuthForm
      title={'Log in to continue'}
      isSignUpOpened={false}
      submit={login}
      loading={loading}
    />
  )
}

export default Login