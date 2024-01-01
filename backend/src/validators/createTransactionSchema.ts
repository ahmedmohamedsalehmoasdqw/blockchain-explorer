import * as yup from "yup";

export const createTransactionSchema = yup.object().shape({
  data: yup
    .object()
    .shape({
      sender: yup.string().required(),
      receiver: yup.string().required(),
      amount: yup.number().required(),
    })
    .required(),
});
