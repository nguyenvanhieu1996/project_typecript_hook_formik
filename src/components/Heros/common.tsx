import React from 'react'
import {
    Form, Icon, Input, Button, Checkbox, Tooltip, Select, Cascader, AutoComplete, Row,
    Col,
} from 'antd';

interface Props {
    form: any
}
const FieldInputEmail: React.FC<Props> = ({ form }) => {
    const { getFieldDecorator } = form
    console.log('render InputHero')
    return (
        <>
            <Form.Item label="E-mail" >
                {
                    getFieldDecorator('email1', {
                        rules: [
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ],
                    })(<Input />)}
            </Form.Item>
        </>
    )
}
const FieldInputEmailForm = Form.create()(FieldInputEmail);

export default FieldInputEmailForm