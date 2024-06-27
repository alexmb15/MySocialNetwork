export type FieldValidatorType = (value: string) => string | undefined

export const requiredField: FieldValidatorType = (value) => {
    if(value) return undefined;
    return "Field is required"
}

export const maxLength = (maxLength: number): FieldValidatorType => (value) => {
    if(value && value.length > maxLength) return `Max length must be < ${maxLength}`;
    return undefined;
}