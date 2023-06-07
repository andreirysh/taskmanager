import Button from 'react-bootstrap/Button';
import React from 'react'
import { CommonSpinner } from "../CommonSpinner/CommonSpinner";

function CommonButton(props) {
    return (
        <Button
            onClick={props.onClick}
            variant={props.variant}
            type={props.type}
            className={props.classname}
            disabled={props.disabled || props.loading}
        >
            {props.loading ? <CommonSpinner /> : props.name}
        </Button>
    )
}

export default CommonButton