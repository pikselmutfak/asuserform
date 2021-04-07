import {CssBaseline} from '@material-ui/core'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Users from './Users'
import UserDetail from './UserDetail'
import UserForm from './UserForm'

import {Provider} from 'react-redux'
import store from './store'

import axios from 'axios'
import {setAll} from './userSlice'

import 'bootstrap/dist/css/bootstrap.min.css'

axios.get('/api/users')
.then((response) => {
    store.dispatch(setAll(response.data))
})
.catch((err) => {
    console.log(err)
})

const App = () => {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Switch>
          <Provider store={store}>
            <Route path="/" component={Users} exact={true} />
            <Route path="/add" component={UserForm} exact={true} />
            <Route path="/update/:id" component={UserForm} exact={true} />
            <Route path="/user/:id" component={UserDetail} exact={true} />
          </Provider>
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App