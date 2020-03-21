import React from 'react'
import { Field, Form, Formik, FormikProps, ErrorMessage } from 'formik';
import * as Yup from 'yup'; 

const FormikYup: React.FC = () => {
    console.log('render Formik')

    let data: Array<number> = []
    for (let i = 0; i <= 50; i++) {
        data.push(i)
    }
    const MyInput = ({ field, form, ...props }: any) => {
        return <input {...field} {...props} />;
    };

    type PropsFormik = {
        email: string, color: string, firstName: string, lastName: string, lastName1: string
    }

    // check again
    const initialValues: any = { email: '', color: 'red', firstName: '', lastName: '', lastName1: '' }


    const validate = (values: any, props: any /* only available when using withFormik */) => {
        const errors: any = {};

        if (!values.email) {
            errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }

        //...

        return errors;
    };

    const validationSchema = () => {
        let mess = ''
        return Yup.object().shape({
            email: Yup.string()
                .email('Invalid email')
                .required('Required')
                .test(
                    'text is-jimmy',
                    'email is not Jimmy',
                    value => {
                        // console.log('value', value);
                        return value !== 'a@gmail.com'

                    },
            ),
            firstName: Yup.string()
                .min(2, 'Too Short!')
                .max(50, 'Too Long!')
                .required('Required ${path}')
                // .test('test email foobar@example.com and first name blank is show message ', ' message ${mess} ', function () {
                //     console.log('this.parent', this.parent);
                //     if (this.parent.email === "foobar@example.com") {
                //         mess = 'papidipupi'
                //         return false
                //     }
                //     // mess = 'username abc'
                //     return true;
                // }),
                // .when('email', (email: any, schema: any) => {
                //     console.log('email', email);

                //     if (email === "foobar@example.com") {
                //         return schema.label("papidipupi")
                //     }

                //     return schema.label("username abc")
                // }),
                .when('email', {
                    is: (val: any) => {
                        console.log('val', val)
                    },
                    otherwise: (s: any) => {
                        console.log('ssssss', s)
                    },
                }.otherwise),
            lastName: Yup.string()
                .min(2, 'Too Short!')
                .max(50, 'Too Long!')
                .required('Required'),
            lastName1: Yup.string()
                .min(2, 'Too Short!')
                .max(50, 'Too Long!')
                .required('Required ${path}')
                .test(
                    'text is-jimmy',
                    'email is not Jimmy',
                    function (lastName1) {
                        // console.log('lastName1', lastName1);
                        return true
                    }
                ),
        });
    }
    const test = (props: FormikProps<PropsFormik>) => {
        console.log('props', props)
        // props.setErrors({})
        // props.initialErrors({})
        // props.initialize(initialValues)

    }
    // 1. sao ko dùng field formik mà MyInput làm gì ? 
    // 2. validate onchange , onBlur woking when submit once
    // 3. formink default validate onBlur
    // 4. FastField use when ~30+ fields
    // 5. Not reset form and error must type = "button"
    // 6. Yup have validate but not show error
    // 7. reset form and clear message working but have problems
    // 8. use when or test
    return (
        <>
            <h1>Formink</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}

                // validateOnChange={true}
                // validate={values => {
                //     const errors:any = {};
                //     if (!values.email) {
                //       errors.email = 'Required';
                //     } else if (
                //       !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                //     ) {
                //       errors.email = 'Invalid email address';
                //     }
                //     return errors;
                //   }}
                onSubmit={(values, actions) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        actions.setSubmitting(false);
                    }, 1000);

                }}>{(props: FormikProps<PropsFormik>) => (
                    <Form
                    >
                        <Field name="email" placeholder="Email" className="testClassName" />
                        <ErrorMessage name="email" />
                        <br />
                        <Field as="select" name="color">
                            <option value="red">Red</option>
                            <option value="green">Green</option>
                            <option value="blue">Blue</option>
                        </Field>
                        <br />

                        <Field type="lastName1" name="lastName1" placeholder="Last Name1" className="testClassName" />
                        <ErrorMessage name="lastName1" />
                        <br />

                        <Field name="lastName" placeholder="Last Name" component={MyInput} />
                        <ErrorMessage name="lastName" />
                        <br />

                        <Field name="firstName" placeholder="First Name" component={MyInput} />
                        <ErrorMessage name="firstName" />
                        <br />

                        <button type="submit">Submit</button>
                        <button type="button"  onClick={() => props.handleReset(initialValues)} >Reset</button>
                        <button type="button" onClick={() => props.setErrors({})} >Clear message error</button>

                        <button type="button" onClick={() => test(props)} >Test</button>



                    </Form>
                )}
            </Formik>
        </>
    )
}
export default FormikYup