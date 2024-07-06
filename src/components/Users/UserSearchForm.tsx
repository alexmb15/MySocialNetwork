import React from "react";
import {FilterType} from "../../Redux/users-reducer";
import {Field, Form, Formik} from "formik";
import styles from "./UserSearchForm.module.css";

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
    filter: FilterType
}
type FriendFormType = 'true' | 'false' | 'null'
type FormType = {
    term: string
    friend: FriendFormType
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export const UserSearchForm: React.FC<PropsType> = (props) => {

    const onSubmit = async (values: FormType/*, {setSubmitting}: {setSubmitting: (isSubmitting: boolean)=>void}*/) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === "null" ? null : values.friend === "true"
        }
        props.onFilterChanged(filter);
        await sleep(1000)
    }

    return (
        <div>
            <Formik
                enableReinitialize
                initialValues={{
                    term: props.filter.term,
                    friend: String(props.filter.friend) as FriendFormType
                }}
                onSubmit={onSubmit}
            >
                {({isSubmitting}) => (
                    <Form>
                        <div>
                            <label className={styles.label} htmlFor="term" >Find by name</label>
                            <Field
                                id="term"
                                name="term"
                                placeholder="David"
                                type="text"
                                className={styles.inputField}
                            />
                            <label className={styles.label} htmlFor="friend"> Select </label>
                            <Field className={styles.inputField} name="friend" as="select">
                                <option value="null"> all</option>
                                <option value="true"> Only friends</option>
                                <option value="false"> Without friends</option>
                            </Field>
                            <button type="submit" disabled={isSubmitting}>
                                Submit
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}