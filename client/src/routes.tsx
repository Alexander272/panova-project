import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { PageNotFound } from './pages/PageNotFound/404'
import { HomePage } from './pages/Home/Home'

export const routes = (
    <Switch>
        <Route path="/" exact>
            <HomePage />
        </Route>
        <Route path="*">
            <PageNotFound />
        </Route>
    </Switch>
)
