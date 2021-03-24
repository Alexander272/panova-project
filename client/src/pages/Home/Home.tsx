import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { Button } from '../../components/Button/Button'
import { DropdownList } from '../../components/DropdownList/DropdownList'
import classes from './home.module.scss'
import { data } from '../data'

export const HomePage = () => {
    const history = useHistory()
    const [open, setOpen] = useState(false)
    const [employes, setEmployes] = useState(data)
    const [index, setIndex] = useState(0)

    useEffect(() => {
        setEmployes(data)
    }, [])

    const handler = () => {}

    const openHandler = (event: React.MouseEvent<HTMLParagraphElement>) => {
        const { target } = (event.target as HTMLParagraphElement).dataset
        history.push(`/employee/${target}`)
    }

    const onSelectHandler = (event: React.MouseEvent<HTMLParagraphElement>) => {
        const { index } = (event.target as HTMLParagraphElement).dataset
        index != null && setIndex(+index)
        onToggleHandler()
    }

    const onToggleHandler = () => setOpen((prev) => !prev)

    return (
        <div className={'container'}>
            <div className={'header'}>
                <h1 className={'title'}>Расчет ЗП</h1>
            </div>
            <div className={classes.form}>
                <div className={classes.btns}>
                    <p
                        data-target="add"
                        onClick={openHandler}
                        className={[classes.btn, classes.addBtn].join(' ')}>
                        <span
                            className={[classes.icon, classes.addIcon].join(
                                ' '
                            )}>
                            &#43;
                        </span>
                        <span className={classes.btnText}>
                            Добавить сотрудника
                        </span>
                    </p>
                    <p
                        data-target="edit"
                        onClick={openHandler}
                        className={[classes.btn, classes.editBtn].join(' ')}>
                        <span
                            className={[classes.icon, classes.editIcon].join(
                                ' '
                            )}>
                            &#9998;
                        </span>
                        <span className={classes.btnText}>
                            Редактировать сотрудников
                        </span>
                    </p>
                </div>

                {employes.length && (
                    <div className={classes.container}>
                        <DropdownList
                            data={employes}
                            isOpen={open}
                            index={index}
                            onSelect={onSelectHandler}
                            onToggle={onToggleHandler}
                        />
                        <div className={classes.info}>
                            <p className={classes.infoText}>
                                Должность:{' '}
                                <span className={classes.infoBold}>
                                    {employes[index].job}
                                </span>
                            </p>
                            <p className={classes.infoText}>
                                Оклад:{' '}
                                <span className={classes.infoBold}>
                                    {new Intl.NumberFormat('ru-RU', {
                                        currency: 'RUB',
                                        style: 'currency',
                                    }).format(+employes[index].salary)}
                                </span>
                            </p>
                        </div>
                    </div>
                )}

                <Button text={'Расчитать'} type="primary" onClick={handler} />
            </div>
        </div>
    )
}
