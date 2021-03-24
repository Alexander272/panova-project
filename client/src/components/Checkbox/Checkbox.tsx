import React from 'react'
import classes from './checkbox.module.scss'

type Props = {
    id: string
    name: string
    checked: boolean
    text: string
    onClick: () => void
}

export const Checkbox: React.FC<Props> = ({ id, name, checked, text, onClick }) => {
    return (
        <div className={classes.container}>
            <input
                className={classes.input}
                type="checkbox"
                id={id}
                name={name}
                checked={checked}
            />
            <label className={classes.label} htmlFor={id} data-content={text}>
                {text}
            </label>
        </div>
    )
}
