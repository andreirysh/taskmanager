import React, { useState } from "react"
import { AlertContext } from "./AlertContext";


export const AlertProvider = ({ children }) => {

    const [isShown, setIsShown] = useState(false)
    const [text, setText] = useState('')
    const [variant, setVariant] = useState('')

    const show = (payload) => {
        setVariant(payload.variant)
        setText(payload.text)
        setIsShown(true)
        setTimeout(() => {
            setVariant('')
            setText('')
            setIsShown(false)
        }, 5000)
    }

    return (
        <AlertContext.Provider value={{ show, alert: { visible: isShown, text, variant } }}>
            {children}
        </AlertContext.Provider>
    )
}
