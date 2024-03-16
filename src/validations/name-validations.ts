import * as yup from "yup";

export const nameFormSchema = yup.object({
  name: yup
    .string()
    .matches(/^[A-Za-zА-Яа-я]+$/, "Имя должно содержать только буквы")
    .required("Имя обязательно для заполнения"),
});
