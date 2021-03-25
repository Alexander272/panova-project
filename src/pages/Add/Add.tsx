import React, { useState } from 'react'
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs'
import { Button } from '../../components/Button/Button'
import { Input } from '../../components/Input/Input'
import classes from './add.module.scss'

export const AddPage = () => {
    const [form, setFrom] = useState({
        name: '',
        job: '',
        salary: '',
        award: '',
    })

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFrom({ ...form, [event.target.name]: event.target.value })
    }

    const saveHandler = async () => {
        if (
            !(
                form.name.trim() &&
                form.job.trim() &&
                form.salary.trim() &&
                form.award.trim()
            )
        )
            return
        try {
            const res = await fetch(
                'https://alex-js.firebaseio.com/emploeys.json',
                {
                    method: 'POST',
                    body: JSON.stringify(form),
                }
            )
            await res.json()
            setFrom({
                name: '',
                job: '',
                salary: '',
                award: '',
            })
        } catch (error) {}
    }

    return (
        <div className={'container'}>
            <div className={'header'}>
                <h1 className={'title'}>Добавить сотрудника</h1>
            </div>

            <div className={classes.form}>
                <div className={classes.breadContainer}>
                    <Breadcrumbs
                        links={[
                            { link: '/', text: 'Главная' },
                            {
                                link: '/employee/add',
                                text: 'Добавить сотрудника',
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
