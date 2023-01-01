import { IInputsValue } from "./InputsValue";

export interface IForm {
    label?: string,
    submitForm: (value: IInputsValue) => void
}