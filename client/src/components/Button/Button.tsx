import React from 'react'
import classes from './button.module.scss'

type Props = {
    text: string
    type: string
    icon?: any
    onClick: any
}

export const Button = ({ text, type, icon = null, onClick }: Props) => {
    return (
        <div
            onClick={onClick}
            className={[classes[type], classes.btn].join(' ')}>
            <p>
                {icon && icon}
                {text}
            </p>
        </div>
    )
}
