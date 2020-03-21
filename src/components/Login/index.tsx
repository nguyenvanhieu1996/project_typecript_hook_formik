import React from 'react';
import { Form, Input, Button, Icon } from 'antd';
import { loginUser } from '../../api/Users'
import { setCookie } from '../../utils'
import { LoginEntity } from '../../models/Users'

interface Props {
    form: any,
    history: any
}

const Login: React.FC<Props> = ({ form, history }) => {
    const { getFieldDecorator } = form;

    const handleSuccessLogin = (data: LoginEntity) => {
        setCookie(data.token)
        history.push('/')
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        form.validateFields((err: any, values: any) => {
            if (err) return false
            console.log('Received values of form: ', values);
            const data = {
                email: 'eve.holt@reqres.in',
                password: 'cityslicka'
            }
            const dataAction = {
                data,
                cbSuccessfully: (data: LoginEntity) => handleSuccessLogin(data)
            }
            loginUser(dataAction)
        });
    }

    return (
        <>
            <Form onSubmit={handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('email')(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Email"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password')(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
          </Button>
            </Form>
        </>
    );
};

const LoginForm = Form.create()(Login);

export default LoginForm;
