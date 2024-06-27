import styles from "./FormsComponent.module.css"
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form"
import React from "react"
import {FieldValidatorType} from "../../../utils/validators/validators"

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
    children: React.ReactNode
}

const FormControl = ({meta: {error, touched}, children}: FormControlPropsType) => {
    const hasError = error && touched;
    return <div className={styles.formComponent + " " + (hasError ? styles.error : "")}>

            <div>{children}</div>
            {hasError && <span>{error}</span>}
    </div>
}

export const formGeneralError: React.FC<WrappedFieldProps> = (props) => {
    return (
        <>
            {props.meta.error && <div className={styles.formGeneralError}>
                {props.meta.error}
            </div>}
        </>
    );
}

export function createField<FormKeysType extends string>(placeholder = "",
                            name: FormKeysType,
                            validators: Array<FieldValidatorType>,
                            component: React.FC<WrappedFieldProps>,
                            props = {},
                            text = "") {

    return <div>
        <Field placeholder={placeholder}
               name={name}
               validate={validators}
               component={component}
               {...props}
        /> {text}
    </div>
}

export const createLabel = (name: string) => {
    return <div>
        <label>{name}</label>
    </div>
}

export const createImg = (img: string) => {
    return <div>
        <img alt={"image"} src={img}/>
    </div>
}



export const createButton = (name: string) => {
    return <div>
        <button>{name}</button>
    </div>
}

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    //const {input, meta, child, ...restProps} = props;
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    //const {input, meta, child, ...restProps} = props;
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
}
/*
const newComponent = Component => ({input, meta, ...props}) => {
    const hasError = meta.error && meta.touched;
    return (
        <div className={styles.formComponent + " " + (hasError ? styles.error : "")}>
            <div>
                <Component {...input} {...props}/>
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}
export const Input = newComponent("input");
export const Textarea = newComponent("textarea");*/
