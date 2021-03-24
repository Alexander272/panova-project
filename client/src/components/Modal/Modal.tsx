import React from 'react'
import classes from './modal.module.scss'

type Props = {
    title: string
    isOpen: boolean
    onToggle: any
    children: any
}

export const Modal: React.FC<Props> = ({ title, isOpen, onToggle, children }) => {
    return (
        <div className={[classes.blackout, !isOpen ? classes.hidden : null].join(' ')}>
            <div className={classes.modal}>
                <div className={classes.header}>
                    <p className={classes.title}>{title}</p>
                    <p onClick={onToggle} className={classes.close}>
                        &times;
                    </p>
                </div>
                {children}
            </div>
        </div>
    )
}
