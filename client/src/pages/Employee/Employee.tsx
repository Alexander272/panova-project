import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { UserCard } from '../../components/UserCard/UserCard'
import { Breadcrumbs } from './../../components/Breadcrumbs/Breadcrumbs'
import { Modal } from '../../components/Modal/Modal'
import classes from './employee.module.scss'
import { data } from '../data'

export const EmployeePage = () => {
    const history = useHistory()
    const [open, setOpen] = useState(false)
    const [currentId, setCurrentId] = useState<null | string>(null)
    const [employes, setEmployes] = useState(data)

    const onToggleHandler = () => setOpen((prev) => !prev)

    const onEditHandler = (event: React.MouseEvent<HTMLParagraphElement>) => {
        const { id } = (event.target as HTMLParagraphElement).dataset
        id && history.push(`/employee/edit/${id}`)
    }

    const onOpenHandler = (event: React.MouseEvent<HTMLParagraphElement>) => {
        const { id } = (event.target as HTMLParagraphElement).dataset
        id && setCurrentId(id)
        onToggleHandler()
    }

    const onRemoveHandler = () => {
        setEmployes((prev) =>
            prev.filter((employee) => employee._id !== currentId)
        )
        setCurrentId(null)
        onToggleHandler()
    }

    return (
        <div className="container">
            <div className="header">
                <h1 className="title">Список сотрудников</h1>
            </div>
            <Modal
                title="Удалить сотрудника"
                isOpen={open}
                onToggle={onToggleHandler}>
                <p className={classes.modalTitle}>
                    Вы уверены что хотите удалить сотрудника
                </p>
                <div className={classes.modalBtns}>
                    <p
                        className={[classes.modalBtn, classes.modalDel].join(
                            ' '
                        )}
                        onClick={onRemoveHandler}>
                        Удалить
                    </p>
                    <p className={[classes.modalBtn].join(' ')}>Отмена</p>
                </div>
            </Modal>

            <div className={classes.container}>
                <div className={classes.breadContainer}>
                    <Breadcrumbs
                        links={[
                            { link: '/', text: 'Главная' },
                            {
                                link: '/employee/edit',
                                text: 'Список сотрудников',
                            },
                        ]}
                    />
                </div>
                <div className={classes.list}>
                    {employes.length > 0 ? (
                        employes.map((employee) => {
                            return (
                                <UserCard
                                    key={employee._id}
                                    user={employee}
                                    editHandler={onEditHandler}
                                    removeHandler={onOpenHandler}
                                />
                            )
                        })
                    ) : (
                        <p>Сотрудники не найдены</p>
                    )}
                </div>
            </div>
        </div>
    )
}
