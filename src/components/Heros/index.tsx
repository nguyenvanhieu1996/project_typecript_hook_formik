import React, { useEffect, Fragment, useState, useCallback, useMemo } from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import { Hero } from '../../store/heros/types'
import { fetchRequest } from '../../store/heros/actions'
import { Table } from 'antd';
import DetailHero from './detail';
import InputHero from './input';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import Input1 from './input1';
import Input2 from './input2';
import Input3 from './input3';
import Input4 from './input4';
import MemoCallBack from './Memo';
import Square from './Square';
import FormikTest from './formik';

// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
    loading: boolean
    data: Hero[]
    errors?: string
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface PropsFromDispatch {
    fetchRequest: typeof fetchRequest
}

interface Props {
    form: any
}
// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & PropsFromDispatch & Props

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'https://api.opendota.com'
const Heros: React.FC<AllProps> = ({ fetchRequest, data, loading, form }) => {
    console.log('render')
    const [dataDetail, setDataDetail] = useState<Hero>()
    const [count, setCount] = useState(0)
    const [number, setNumber] = useState([1, 2, 3])
    const [newArr, setNewArr] = useState([])

    const columns = [
        {
            title: 'Hero',
            dataIndex: 'name',
            key: 'name',
            render: (value: any, record: any) => {
                return <Fragment>
                    <div onClick={() => showDetail(record.id)}>
                        <img src={API_ENDPOINT + record.icon} /> {' '}
                        <span>{value}</span>
                    </div>
                </Fragment>
            }
        },
        {
            title: 'Pro Picks/Bans*',
            dataIndex: 'pro_pick',
            key: 'pro_pick',
            render: (_: any, record: any) => {
                return (record.pro_pick + '/' + record.pro_ban) || 0
            }
        },
        {
            title: 'Pro Wins*',
            dataIndex: 'pro_win',
            key: 'pro_win',
        },
    ];

    useEffect(() => {
        handleData()
    }, [])

    const handleData = async () => {
        let result = await fetchRequest()
        // console.log('result', result)
    }

    const showDetail = async (id: number) => {
        let result = data.find((item: Hero) => item.id === id)
        console.log('result detail', result);

        setDataDetail(result)
    }
    const { getFieldDecorator } = form
    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log('form', form);

        form.validateFields((err: any, values: any) => {
            const aaaa = { ...form.getFieldsValue() }
            console.log('form', aaaa);
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
        console.log('event', event)
    }

    const imcrement = useCallback(
        (n) => {
            setCount((c) => c + n)
        },
        [],
    )
    const [value, setValue] = useState(undefined)

    let dataCallBack = [
        { id: 1, name: 'abc' },
        { id: 2, name: 'aaâ' }
    ]


    // const resultMemo1 = useMemo(() => {
    //     return getCodeGroup('abc').map((item) => {
    //         if (dataRes.name === '123') {
    //             return {
    //                 value: item.id,
    //                 label: item.name
    //             }
    //         }
    //         return {
    //             value: item.id,
    //             label: item.name
    //         }
    //     })
    // }, [dataCallBack, dataRes])

    const resultMemo = useMemo(() => {
        return dataCallBack.map((item) => {
            return {
                value: item.id,
                label: item.name
            }
        })
    }, [dataCallBack])

    const resultCallBack = useMemo(() => {
        let abc = []
        return dataCallBack.map((item) => {
            return {
                value: item.id,
                label: item.name
            }
        })
        console.log('abc', abc);

        //    return setNewArr(abc)
    }, [dataCallBack])

    useEffect(() => {

        // let arr: any = []
        // for (let i = 0; i < dataCallBack.length; i++) {
        //     const element = dataCallBack[i];
        //     arr.unshift({
        //         value: element.id,
        //         label: element.name
        //     })

        // }
        // setNewArr(arr)
        // console.log('result', arr)
    }, [])


    return (
        <>
            <FormikTest />
            {/* <MemoCallBack imcrement={imcrement} count={count} /> */}
            <ul>
                {
                    resultCallBack.map((item: any, index: any) => {
                        return (
                            <li key={index}>{item.value}</li>
                        )
                    })
                }

            </ul>
            <input type="text" onChange={(val: any) => setValue(val)} />
            <div>Count here : {count}</div>
            {
                number.map((item) => {
                    return (
                        <Square imcrement={imcrement} key={item} n={item} />
                    )
                })
            }
            {dataDetail && (<DetailHero dataDetail={dataDetail} />)}
            <InputHero />
            <Form className="login-form" onSubmit={handleSubmit}>
                <Form.Item label="E-mail" >
                    {
                        getFieldDecorator('email3', {
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


                <Input1 />
                <br />
                <br />
                <Input2 />
                <br />
                <br />
                <Input3 />
                <br />
                <br />
                <Input4 />

            </Form>
            {
                loading ? (
                    <span style={{ fontSize: '50px' }}>...Loading</span>
                ) : (
                        <Table dataSource={data} columns={columns} rowKey="id" />
                    )
            }
        </>
    )
}
// It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.
const mapStateToProps = ({ heroes }: ApplicationState) => ({
    loading: heroes.loading,
    // errors: heroes.errors,
    data: heroes.data
})

// mapDispatchToProps is especially useful for constraining our actions to the connected component.
// You can access these via `this.props`.
const mapDispatchToProps = {
    fetchRequest
}

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.

const WrappedInput1Form = Form.create()(Heros);

// export default React.memo(WrappedInput1Form)


export default React.memo(connect(
    mapStateToProps,
    mapDispatchToProps
)(WrappedInput1Form))