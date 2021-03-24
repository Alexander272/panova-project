import React from 'react'
import classes from './loader.module.scss'

type Props = {
    size: string
}

export const Loader: React.FC<Props> = ({ size }) => {
    return (
        <div className={classes.loaderContainer}>
            <div className={[classes.loader, classes[size]].join(' ')}>
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
            </div>
        </div>
    )
}
