import React from 'react';
import { useNavigate } from 'react-router-dom';
import CommonButton from '../../common/components/CommonButton/CommonButton';
import './MainPage.css';

function MainPage() {

    const navigate = useNavigate();

    const handleContinue = () => navigate('/login')

    return (
        <div>
            <div className="animation">
                <div className="animated-text">
                    <h1>Welcome to Task Manager!</h1>
                    <h2>This App provides you and your team with an easy way to manage your projects</h2>
                    <h3>You can create, and edit tasks</h3>
                    <h4>Choose and create different projects</h4>
                    <h5>Track and filter your activity</h5>
                    <div>Easy to use</div>
                    <div>The way easier to learn how to use</div>
                    <div>*Trial Version*</div>
                </div>
                <CommonButton
                    variant={'primary'}
                    name={'Continue'}
                    type={'submit'}
                    onClick={handleContinue}
                />
            </div>
            )
        </div>
    );
}

export default MainPage;
