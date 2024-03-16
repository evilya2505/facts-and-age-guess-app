import * as yup from "yup";

export const factsFormSchema = yup.object({
  fact: yup.string(),
});
