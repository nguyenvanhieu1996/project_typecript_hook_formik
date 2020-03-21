import React, { useState } from 'react'
import {
    Form, Icon, Input, Button, Checkbox, Tooltip, Select, Cascader, AutoComplete, Row,
    Col,
} from 'antd';
import FieldInputEmail from './common'

interface Props {
    form: any,
}
const Input1: React.FC<Props> = ({ form }) => {
    console.log('render input 1')
    const [autoCompleteResult, setAutoCompleteResult] = useState([])
    const { getFieldDecorator } = form
    const { Option } = Select;
    const AutoCompleteOption = AutoComplete.Option;
    const residences = [
        {
            value: 'zhejiang',
            label: 'Zhejiang',
            children: [
                {
                    value: 'hangzhou',
                    label: 'Hangzhou',
                    children: [
                        {
                            value: 'xihu',
                            label: 'West Lake',
                        },
                    ],
                },
            ],
        },
        {
            value: 'jiangsu',
            label: 'Jiangsu',
            children: [
                {
                    value: 'nanjing',
                    label: 'Nanjing',
                    children: [
                        {
                            value: 'zhonghuamen',
                            label: 'Zhong Hua Men',
                        },
                    ],
                },
            ],
        },
    ];
    const prefixSelector = getFieldDecorator('prefix1', {
        initialValue: '86',
    })(
        <Select style={{ width: 70 }}>
            <Option value="86">+86</Option>
            <Option value="87">+87</Option>
        </Select>,
    );

    const websiteOptions = autoCompleteResult.map(website => (
        <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));
    const handleWebsiteChange = (value: any) => {
        let autoCompleteResult: any;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        setAutoCompleteResult(autoCompleteResult)
    }
    return (
        <>
            <FieldInputEmail />
            {/* <Form.Item label="E-mail">
                {getFieldDecorator('email1', {
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
            </Form.Item> */}

            <Form.Item label="Password" hasFeedback>
                {getFieldDecorator('password1', {
                    rules: [
                        {
                            required: true,
                            message: 'Please input your password!',
                        }
                    ],
                })(<Input.Password />)}
            </Form.Item>

            <Form.Item label="Confirm Password" hasFeedback>
                {getFieldDecorator('confirm1', {
                    rules: [
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        }
                    ],
                })(<Input.Password />)}
            </Form.Item>

            <Form.Item
                label={
                    <span>
                        Nickname&nbsp;
              <Tooltip title="What do you want others to call you?">
                            <Icon type="question-circle-o" />
                        </Tooltip>
                    </span>
                }
            >
                {getFieldDecorator('nickname1', {
                    rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                })(<Input />)}
            </Form.Item>

            <Form.Item label="Habitual Residence">
                {getFieldDecorator('residence1', {
                    initialValue: ['zhejiang', 'hangzhou', 'xihu'],
                    rules: [
                        { type: 'array', required: true, message: 'Please select your habitual residence!' },
                    ],
                })(<Cascader options={residences} />)}
            </Form.Item>

            <Form.Item label="Phone Number">
                {getFieldDecorator('phone1', {
                    rules: [{ required: true, message: 'Please input your phone number!' }],
                })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
            </Form.Item>

            <Form.Item label="Website">
                {getFieldDecorator('website1', {
                    rules: [{ required: true, message: 'Please input website!' }],
                })(
                    <AutoComplete
                        dataSource={websiteOptions}
                        onChange={handleWebsiteChange}
                        placeholder="website"
                    >
                        <Input />
                    </AutoComplete>,
                )}
            </Form.Item>

            <Form.Item label="Captcha" extra="We must make sure that your are a human.">
                <Row gutter={8}>
                    <Col span={12}>
                        {getFieldDecorator('captcha1', {
                            rules: [{ required: true, message: 'Please input the captcha you got!' }],
                        })(<Input />)}
                    </Col>
                    <Col span={12}>
                        <Button>Get captcha</Button>
                    </Col>
                </Row>
            </Form.Item>

            <Form.Item >
                {getFieldDecorator('agreement1', {
                    valuePropName: 'checked',
                })(
                    <Checkbox>
                        I have read the <a href="">agreement</a>
                    </Checkbox>,
                )}
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Register 1
          </Button>
            </Form.Item>
        </>
    )
}
const WrappedInput1Form = Form.create()(Input1);

export default React.memo(WrappedInput1Form)