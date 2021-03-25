import React from 'react'
import classes from './input.module.scss'

type Props = {
    placeholder: string
    type: string
    value: string
    name: string
    onChange: any
    inputType?: any
}

export const Input: React.FC<Props> = ({
    placeholder,
    type,
    value,
    onChange,
    name,
    inputType = null,
}) => {
    return (
        <div className={[classes.field, inputType ? classes[inputType] : null].join(' ')}>
            <input
                className={classes.input}
                type={type}
                value={value}
                onChange={onChange}
                name={name}
                id={name}
                required
            />
            <label htmlFor={name} className={classes.label}>
                {placeholder}
            </label>
        </div>
    )
}
