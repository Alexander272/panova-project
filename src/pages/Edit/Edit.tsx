import React, { useCallback, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs'
import { Button } from '../../components/Button/Button'
import { Input } from '../../components/Input/Input'
import classes from '../Add/add.module.scss'
// import { data } from '../data'

export const EditPage = () => {
    const { id } = useParams<{ id: string }>()
    const history = useHistory()
    const [form, setFrom] = useState({
        name: '',
        job: '',
        salary: '',
        award: '',
    })

    const fetchEmployee = useCallback(async () => {
        const res = await fetch(
            `https://alex-js.firebaseio.com/emploeys/${id}.json`
        )
        const data = await res.json()
        setFrom(data)
    }, [id])

    useEffect(() => {
        fetchEmployee()
    }, [fetchEmployee])

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFrom({ ...form, [event.target.name]: event.target.value })
    }

    const saveHandler = async () => {
        try {
            const res = await fetch(
                `https://alex-js.firebaseio.com/emploeys/${id}.json`,
                {
                    method: 'PATCH',
                    body: JSON.stringify(form),
                }
            )
            await res.json()
            history.push('/employee/edit')
        } catch (error) {}
    }

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
