import React from 'react'
import classes from './dropdownList.module.scss'

type Props = {
    data: {
        _id: string
        name: string
        job: string
        salary: string
    }[]
    isOpen: boolean
    index: number
    onSelect: (event: React.MouseEvent<HTMLParagraphElement>) => void
    onToggle: () => void
}

export const DropdownList: React.FC<Props> = ({
    data,
    index,
    isOpen,
    onSelect,
    onToggle,
}) => {
    return (
        <div className={classes.list}>
            <p className={classes.selected} onClick={onToggle}>
                {data[index].name}{' '}
                <span
                    className={[
                        isOpen ? classes.iconReverse : classes.iconNormal,
                        classes.icon,
                    ].join(' ')}>
                    &#8250;
                </span>
            </p>
            <div
                className={[
                    isOpen ? classes.open : null,
                    classes.container,
                ].join(' ')}>
                {data.map((d, index) => (
                    <p
                        key={d._id}
                        data-index={index}
                        onClick={onSelect}
                        className={classes.item}>
                        {d.name}
                    </p>
                ))}
            </div>
        </div>
    )
}
