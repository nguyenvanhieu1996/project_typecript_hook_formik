import React, { useState } from 'react'
import {
    Form, Icon, Input, Button, Checkbox, Tooltip, Select, Cascader, AutoComplete, Row,
    Col,
} from 'antd';

interface Props {
    form: any
}

const Input3: React.FC<Props> = ({ form }) => {
    console.log('render input 3')
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
    const prefixSelector = getFieldDecorator('prefix3', {
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
            <Form.Item label="E-mail">
                {getFieldDecorator('email3', {
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

            <Form.Item label="Password" hasFeedback>
                {getFieldDecorator('password3', {
                    rules: [
                        {
                            required: true,
                            message: 'Please input your password!',
                        }
                    ],
                })(<Input.Password />)}
            </Form.Item>

            <Form.Item label="Confirm Password" hasFeedback>
                {getFieldDecorator('confirm3', {
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
                {getFieldDecorator('nickname3', {
                    rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                })(<Input />)}
            </Form.Item>

            <Form.Item label="Habitual Residence">
                {getFieldDecorator('residence3', {
                    initialValue: ['zhejiang', 'hangzhou', 'xihu'],
                    rules: [
                        { type: 'array', required: true, message: 'Please select your habitual residence!' },
                    ],
                })(<Cascader options={residences} />)}
            </Form.Item>

            <Form.Item label="Phone Number">
                {getFieldDecorator('phone3', {
                    rules: [{ required: true, message: 'Please input your phone number!' }],
                })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
            </Form.Item>

            <Form.Item label="Website">
                {getFieldDecorator('website3', {
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
                        {getFieldDecorator('captcha3', {
                            rules: [{ required: true, message: 'Please input the captcha you got!' }],
                        })(<Input />)}
                    </Col>
                    <Col span={12}>
                        <Button>Get captcha</Button>
                    </Col>
                </Row>
            </Form.Item>

            <Form.Item >
                {getFieldDecorator('agreement3', {
                    valuePropName: 'checked',
                })(
                    <Checkbox>
                        I have read the <a href="">agreement</a>
                    </Checkbox>,
                )}
            </Form.Item>

            <Form.Item >
                <Button type="primary" htmlType="submit">
                    Register
          </Button>
            </Form.Item>
        </>
    )
}
const WrappedInput3Form = Form.create()(Input3);

export default React.memo(WrappedInput3Form)