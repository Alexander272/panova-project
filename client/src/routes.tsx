import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { PageNotFound } from './pages/PageNotFound/404'
import { HomePage } from './pages/Home/Home'
import { AddPage } from './pages/Add/Add'
import { EditPage } from './pages/Edit/Edit'
import { EmployeePage } from './pages/Employee/Employee'

export const routes = (
    <Switch>
        <Route path="/" exact>
            <HomePage />
        </Route>
        <Route path="/employee/add" exact>
            <AddPage />
        </Route>
        <Route path="/employee/edit" exact>
            <EmployeePage />
        </Route>
        <Route path="/employee/edit/:id" exact>
            <EditPage />
        </Route>
        <Route path="*">
            <PageNotFound />
        </Route>
    </Switch>
)
