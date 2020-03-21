import React from 'react';
import 'antd/dist/antd.css';
import {
  BrowserRouter as Router,
  Route, Switch, Link
} from 'react-router-dom';
import { Menu, Layout } from 'antd';

import Users from './components/Users';
import Detail from './components/Users/detail';
import Register from './components/Register';
import Login from './components/Login';
import { removeCookie } from './utils'
import { Provider } from 'react-redux';
import { Store } from 'redux'
import { ApplicationState } from './store';
import Heros from './components/Heros';
import FormikTest from './components/Heros/formik';
import FormikYup from './components/Heros/formik_yup';


// Any additional component props go here.
interface MainProps {
  store: Store<ApplicationState>
  history: History
}
const store: any = []
const Main: React.FC<MainProps> = ({store,history}) => {
  const { Content } = Layout;
  const logout = () => {
    removeCookie()
    alert('Logout success')
  }
  return (
    <Provider store={store}>
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Menu mode="horizontal">
            <Menu.Item key="register">
              <Link to="/register">Register</Link>
            </Menu.Item>
            <Menu.Item key="login">
              <Link to="/login">Login</Link>
            </Menu.Item>
            <Menu.Item key="mail">
              <Link to="/">User</Link>
            </Menu.Item>
            <Menu.Item key="detail">
              <Link to="/detail">Detail</Link>
            </Menu.Item>
            <Menu.Item key="heros">
              <Link to="/heros">Heros</Link>
            </Menu.Item>
            <Menu.Item key="formik">
              <Link to="/formik">Formik</Link>
            </Menu.Item>
            <Menu.Item key="FormikYup">
              <Link to="/formik-yup">FormikYup</Link>
            </Menu.Item>
            
            <Menu.Item key="logout">
              <span onClick={() => logout()}>Logout</span>
            </Menu.Item>
            <Menu.Item key="version">
              <span>Version 1.0</span>
            </Menu.Item>
          </Menu>

          <Layout className="site-layout">
            <Content
              className="site-layout-background"
              style={{
                margin: '15px',
                padding: 24,
                minHeight: 280,
              }}
            >
              <Switch>
                <Route path="/" exact component={Users} />
                <Route path="/detail/:id" exact component={Detail} />
                <Route path="/heros" exact component={Heros} />
                <Route path="/formik" exact component={FormikTest} />
                <Route path="/formik-yup" exact component={FormikYup} />
                <Route path="/register" exact component={Register} />
                <Route path="/login" exact component={Login} />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Router>
    </Provider>

  );
}

export default Main;
