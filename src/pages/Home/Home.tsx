import React, { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { Button } from '../../components/Button/Button'
import { DropdownList } from '../../components/DropdownList/DropdownList'
import { Input } from '../../components/Input/Input'
import { Checkbox } from './../../components/Checkbox/Checkbox'
import { EmploeysType } from '../../types/employes'
import classes from './home.module.scss'
// import { data } from '../data'

function isWeekday(date: Date) {
    const day = date.getDay()
    return day !== 0 && day !== 6
}

function getWeekdaysInMonth(month: number, year: number) {
    return getDaysInMonth(month, year).filter(isWeekday)
}

function getDaysInMonth(month: number, year: number) {
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)

    return getDaysInRange(firstDay, lastDay)
}

function getDaysInRange(start: Date, end: Date) {
    const r = []
    for (let dt = start; dt <= end; dt.setDate(dt.getDate() + 1)) {
        r.push(new Date(dt))
    }
    return r
}

const initState = {
    salary: 0,
    award: 0,
    children: 0,
    NDFL: 0,
    pension: 0,
    medical: 0,
    social: 0,
    FSS: 0,
}

export const HomePage = () => {
    const history = useHistory()
    const [open, setOpen] = useState(false)
    const [haveAChildren, setHaveAChildren] = useState(false)
    const [employes, setEmployes] = useState<EmploeysType[]>([])
    const [employesIds, setEmployesIds] = useState<string[]>([])
    const [index, setIndex] = useState(0)
    const [countWorkingDays, setCountWorkingDays] = useState(0)
    const [count, setCount] = useState('')
    const [countChildren, setCountChildren] = useState('')
    const [calc, setCalc] = useState(initState)

    const fetchEmployes = useCallback(async () => {
        const res = await fetch('https://alex-js.firebaseio.com/emploeys.json')
        const data = await res.json()
        setEmployes(Object.values(data))
        setEmployesIds(Object.keys(data))
    }, [])

    useEffect(() => {
        fetchEmployes()
        const date = new Date(Date.now())
        const workingDays = getWeekdaysInMonth(
            date.getMonth(),
            date.getFullYear()
        )
        setCountWorkingDays(workingDays.length)
    }, [fetchEmployes])

    const calculateHandler = () => {
        const fullSalary = (+employes[index].salary * +count) / countWorkingDays
        let children = 0
        for (let i = 0; i < +countChildren; i++) {
            if (i < 2) children += 1400
            else children += 3000
        }
        const fullAward =
            +count === countWorkingDays
                ? fullSalary * (+employes[index].award / 100)
                : +count >= countWorkingDays * 0.9
                ? fullSalary * (+employes[index].award / 200)
                : 0
        setCalc({
            salary: fullSalary - fullSalary * 0.13,
            award: fullAward - fullAward * 0.13,
            children,
            NDFL:
                fullSalary * 0.13 + fullAward * 0.13 - children > 0
                    ? fullSalary * 0.13 + fullAward * 0.13 - children
                    : 0,
            pension: fullSalary * 0.22 + fullAward * 0.22,
            medical: fullSalary * 0.051 + fullAward * 0.051,
            social: fullSalary * 0.029 + fullAward * 0.029,
            FSS: fullSalary * 0.002 + fullAward * 0.002,
        })
    }

    const openHandler = (event: React.MouseEvent<HTMLParagraphElement>) => {
        const { target } = (event.target as HTMLParagraphElement).dataset
        history.push(`/employee/${target}`)
    }

    const onSelectHandler = (event: React.MouseEvent<HTMLParagraphElement>) => {
        const { index } = (event.target as HTMLParagraphElement).dataset
        index != null && setIndex(+index)
        onToggleHandler()
        setCalc(initState)
    }

    const onToggleHandler = () => setOpen((prev) => !prev)
    const onSwitchHandler = () => setHaveAChildren((prev) => !prev)

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.name === 'count') setCount(event.target.value)
        else setCountChildren(event.target.value)
    }

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

                {employes.length > 0 && employesIds.length > 0 && (
                    <div className={classes.container}>
                        <DropdownList
                            data={employes}
                            ids={employesIds}
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
                            <p className={classes.infoText}>
                                Премия:{' '}
                                <span className={classes.infoBold}>
                                    {employes[index].award}%
                                </span>
                            </p>
                            <p className={classes.infoText}>
                                Число рабочих дней в месяце:{' '}
                                <span className={classes.infoBold}>
                                    {countWorkingDays}
                                </span>
                            </p>
                        </div>
                        <Input
                            type="number"
                            placeholder="Отработанные дни"
                            value={count}
                            name="count"
                            onChange={changeHandler}
                        />
                        <Checkbox
                            id={'children'}
                            name={'children'}
                            checked={haveAChildren}
                            text={'Использовать стандартный вычет на детей?'}
                            onClick={onSwitchHandler}
                        />
                        {haveAChildren && (
                            <Input
                                type="number"
                                placeholder="Количество детей"
                                value={countChildren}
                                name="countChildren"
                                onChange={changeHandler}
                            />
                        )}
                    </div>
                )}

                <div className={classes.calculateContainer}>
                    <p className={classes.infoText}>
                        Сумма зарплаты на руки:{' '}
                        <span className={classes.infoBold}>
                            {new Intl.NumberFormat('ru-RU', {
                                currency: 'RUB',
                                style: 'currency',
                            }).format(calc.salary)}
                        </span>
                    </p>
                    <p className={classes.infoText}>
                        Сумма премии:{' '}
                        <span className={classes.infoBold}>
                            {new Intl.NumberFormat('ru-RU', {
                                currency: 'RUB',
                                style: 'currency',
                            }).format(calc.award)}
                        </span>
                    </p>
                    <p className={classes.infoText}>
                        Сумма вычета за детей:{' '}
                        <span className={classes.infoBold}>
                            {new Intl.NumberFormat('ru-RU', {
                                currency: 'RUB',
                                style: 'currency',
                            }).format(calc.children)}
                        </span>
                    </p>
                    <p className={classes.infoText}>
                        Сумма НДФЛ (13%):{' '}
                        <span className={classes.infoBold}>
                            {new Intl.NumberFormat('ru-RU', {
                                currency: 'RUB',
                                style: 'currency',
                            }).format(calc.NDFL)}
                        </span>
                    </p>
                    <p className={classes.infoText}>Отчисления в ИФНС:</p>
                    <p className={classes.infoText}>
                        Пенсионное (22%):{' '}
                        <span className={classes.infoBold}>
                            {new Intl.NumberFormat('ru-RU', {
                                currency: 'RUB',
                                style: 'currency',
                            }).format(calc.pension)}
                        </span>
                    </p>
                    <p className={classes.infoText}>
                        Медицинское (5,1%):{' '}
                        <span className={classes.infoBold}>
                            {new Intl.NumberFormat('ru-RU', {
                                currency: 'RUB',
                                style: 'currency',
                            }).format(calc.medical)}
                        </span>
                    </p>
                    <p className={classes.infoText}>
                        Социальное (2,9%):{' '}
                        <span className={classes.infoBold}>
                            {new Intl.NumberFormat('ru-RU', {
                                currency: 'RUB',
                                style: 'currency',
                            }).format(calc.social)}
                        </span>
                    </p>
                    <p className={classes.infoText}>
                        Отчисления в ФСС (0,2%):{' '}
                        <span className={classes.infoBold}>
                            {new Intl.NumberFormat('ru-RU', {
                                currency: 'RUB',
                                style: 'currency',
                            }).format(calc.FSS)}
                        </span>
                    </p>
                </div>

                <Button
                    text={'Расчитать'}
                    type="primary"
                    onClick={calculateHandler}
                />
            </div>
        </div>
    )
}
