import React from 'react'
import { Link } from 'react-router-dom'
import classes from './breadcrumbs.module.scss'

type LinkType = {
    link: string
    text: string
}

type Props = {
    links: LinkType[]
}

export const Breadcrumbs: React.FC<Props> = ({ links }) => {
    return (
        <div className={classes.breadcrumbs}>
            {links.map((link, index) => (
                <React.Fragment key={index}>
                    <Link to={link.link} className={classes.link}>
                        {link.text}
                    </Link>{' '}
                    {index < links.length - 1 && '/'}
                </React.Fragment>
            ))}
        </div>
    )
}
