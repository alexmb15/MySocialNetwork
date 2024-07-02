import React from "react";
import {FilterType} from "../../Redux/users-reducer";
import {Field, Form, Formik} from "formik";

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export const UserSearchForm: React.FC<PropsType> = (props) => {

    const onSubmit = async (values: FilterType/*, {setSubmitting}: {setSubmitting: (isSubmitting: boolean)=>void}*/) => {
        props.onFilterChanged(values);
        await sleep(1000)
    }

    return (
        <div>
            <Formik
                initialValues={{
                    term: '',
                }}
                onSubmit={onSubmit}
            >
                {({isSubmitting}) => (
                    <Form>
                        <label htmlFor="term">Find by name</label>
                        <Field
                            id="term"
                            name="term"
                            placeholder="David"
                            type="text"
                        />
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}