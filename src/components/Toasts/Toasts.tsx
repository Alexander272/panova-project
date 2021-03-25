import React from 'react'
import classes from './toasts.module.scss'

type Props = {
    type: string
    message: string | null
}

export const Toasts: React.FC<Props> = ({ type, message }) => {
    return (
        <div className={[classes.toasts, classes[type]].join(' ')}>
            <p className={classes.text}>{message}</p>
            <p className={classes.loader}></p>
        </div>
    )
}
