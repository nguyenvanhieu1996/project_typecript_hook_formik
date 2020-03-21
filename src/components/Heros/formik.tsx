import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';

const FormikTest: React.FC = () => {
    console.log('render Formik')

    let data: Array<number> = []
    for (let i = 0; i <= 50; i++) {
        data.push(i)
    }
    return (
        <>
            <h1>Formink</h1>
            <Formik
                initialValues={{ email1: '', password: '', password1: '', password2: '', color: '' }}
                validate={values => {
                    const errors: any = {};
                    if (!values.email1) {
                        errors.email1 = 'Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email1)
                    ) {
                        errors.email1 = 'Invalid email address';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    console.log('values', values);

                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        {
                            data.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <h1>{item}</h1>
                                        <Field type={`email${index}`} name={`email${index}`} />
                                        <ErrorMessage name={`email${index}`} component="div" />
                                    </div>
                                )
                            })
                        }
                        <Field as="select" name="color">
                            <option value="red">Red</option>
                            <option value="green">Green</option>
                            <option value="blue">Blue</option>
                        </Field>
                        {/* <Field type="email" name="email" />
                        <ErrorMessage name="email" component="div" />
                        <Field type="password" name="password" />
                        <ErrorMessage name="password" component="div" />
                        <Field type="password1" name="password1" />
                        <ErrorMessage name="password1" component="div" />
                        <Field type="password2" name="password2" />
                        <ErrorMessage name="password2" component="div" /> */}
                        <button type="submit" disabled={isSubmitting}>
                            Submit
          </button>
                    </Form>
                )}
            </Formik>
        </>
    )
}
export default FormikTest