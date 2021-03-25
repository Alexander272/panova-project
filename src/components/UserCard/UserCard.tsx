import React from 'react'
import classes from './userCard.module.scss'

type Props = {
    user: {
        name: string
        job: string
        salary: string
    }
    id: string
    editHandler: (event: React.MouseEvent<HTMLParagraphElement>) => void
    removeHandler: (event: React.MouseEvent<HTMLParagraphElement>) => void
}

export const UserCard: React.FC<Props> = ({
    user,
    id,
    editHandler,
    removeHandler,
}) => {
    return (
        <div className={classes.card}>
            <div className={classes.info}>
                <p className={classes.infoText}>
                    <span>ФИО сотрудника:</span>
                    <span className={classes.infoBold}>{user.name}</span>
                </p>
                <p className={classes.infoText}>
                    <span>Должность:</span>
                    <span className={classes.infoBold}>{user.job}</span>
                </p>
                <p className={classes.infoText}>
                    <span>Оклад:</span>
                    <span className={classes.infoBold}>
                        {new Intl.NumberFormat('ru-RU', {
                            currency: 'RUB',
                            style: 'currency',
                        }).format(+user.salary)}
                    </span>
                </p>
            </div>
            <div className={classes.btns}>
                <p
                    onClick={editHandler}
                    data-id={id}
                    className={[classes.btn, classes.btnEdit].join(' ')}>
                    &#9998;
                </p>
                <p
                    onClick={removeHandler}
                    data-id={id}
                    className={[classes.btn, classes.btnDel].join(' ')}>
                    &times;
                </p>
            </div>
        </div>
    )
}
