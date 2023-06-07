import Form from 'react-bootstrap/Form';
import CommonInput from '../../../../common/components/CommonInput/CommonInput';
import CommonButton from '../../../../common/components/CommonButton/CommonButton';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

const AuthForm = ({title,isSignUpOpened, submit, loading}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit = (e) => {
        e.preventDefault();
        const data = {
            email,
            password
        }
        submit(data)
    }

   
    return (
        <Form className='custom-form'>
            <header className='header--container'>
                <img className='img--size' src='https://i.ibb.co/zH9kqBh/id-card.png' alt='login'></img>
                <h3>{title}</h3>
            </header>
            <CommonInput
                placeholder={'Enter your email'}
                inputtype={'email'}
                controlIdName={'emailId'}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <CommonInput
                placeholder={'Enter your password'}
                inputtype={'password'}
                controlIdName={'passwordId'}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <div className='buttons--container'>
                <CommonButton
                    loading={loading}
                    name={'Continue'}
                    onClick={onSubmit}
                    type={'submit'}
                />
            </div>
            {isSignUpOpened ?
                <div className="signup_link">
                    Already has an account? <Link to='/login' className='signup--button'> Log in </Link>
                </div>
                :
                <div className="signup_link">
                    Not a member? <Link to='/signup' className='signup--button'> Sign up</Link>
                </div>}
        </Form>
    )
}

export default AuthForm;