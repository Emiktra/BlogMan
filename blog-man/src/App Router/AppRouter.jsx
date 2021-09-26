import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Header } from '../Components/Header'
import { CreateBlog } from '../Pages/CreateBlog'
import { Home } from '../Pages/Home'
import { Profile } from '../Pages/Profile'
import { Register } from '../Pages/Register'
import { SignIn } from '../Pages/SignIn'

export const AppRouter = () => {
    return (
        <div>
            <Route path="/" component={Header}/>
            <Switch>
                <Route exact path="/" component={Home}  />
                <Route exact path="/profile" component={Profile}  />
                <Route exact path="/login" component={SignIn}  />
                <Route exact path="/register" component={Register}  />
                <Route exact path="/createBlog" component={CreateBlog}  />
            </Switch>
        </div>
    )
}
