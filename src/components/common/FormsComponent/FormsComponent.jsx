import styles from "./FormsComponent.module.css"
import {Field} from "redux-form";

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

export const formGeneralError = (props) => {
    return (
        <>
            {props.error && <div className={styles.formGeneralError}>
                {props.error}
            </div>}
        </>
    );
}

export const createField = (placeholder = "", name, validators, component, props = {}, text = "") => {
    return <div>
        <Field placeholder={placeholder}
               name={name}
               validate={validators}
               component={component}
               {...props}
        /> {text}
    </div>
}

export const createLabel = (name) => {
    return <div>
        <label>{name}</label>
    </div>
}

export const createImg = (img) => {
    return <div>
        <img src={img}/>
    </div>
}



export const createButton = (name) => {
    return <div>
        <button>{name}</button>
    </div>
}

export const Input = newComponent("input");
export const Textarea = newComponent("textarea");