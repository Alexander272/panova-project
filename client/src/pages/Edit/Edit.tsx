import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs'
import { Button } from '../../components/Button/Button'
import { Input } from '../../components/Input/Input'
import classes from '../Add/add.module.scss'
import { data } from '../data'

export const EditPage = () => {
    const { id } = useParams<{ id: string }>()
    const [form, setFrom] = useState({
        name: '',
        job: '',
        salary: '',
        award: '',
    })

    useEffect(() => {
        setFrom(data[+id])
    }, [id])

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFrom({ ...form, [event.target.name]: event.target.value })
    }

    const saveHandler = () => {}

    return (
        <div className={'container'}>
            <div className={'header'}>
                <h1 className={'title'}>Редактировать сотрудника</h1>
            </div>

            <div className={classes.form}>
                <div className={classes.breadContainer}>
                    <Breadcrumbs
                        links={[
                            { link: '/', text: 'Главная' },
                            {
                                link: '/employee/add',
                                text: 'Редактировать сотрудника',
                            },
                        ]}
                    />
                </div>
                <Input
                    type="text"
                    placeholder="ФИО сотрудника"
                    value={form.name}
                    name="name"
                    onChange={changeHandler}
                />
                <Input
                    type="text"
                    placeholder="Должность"
                    value={form.job}
                    name="job"
                    onChange={changeHandler}
                />
                <Input
                    type="number"
                    placeholder="Оклад"
                    value={form.salary}
                    name="salary"
                    onChange={changeHandler}
                />
                <Input
                    type="number"
                    placeholder="Премия в %"
                    value={form.award}
                    name="award"
                    onChange={changeHandler}
                />
                <Button
                    text={'Сохранить'}
                    type="primary"
                    onClick={saveHandler}
                />
            </div>
        </div>
    )
}
