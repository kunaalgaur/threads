import * as yup from 'yup';

export const threadsValidations = yup.object().shape({
  caption: yup.string().required(),
});
