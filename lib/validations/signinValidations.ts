import * as yup from 'yup';

export const signinValidations = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is a required field'),
  password: yup
    .string()
    .required('Password is a required field.')
    .min(8, 'Password should be atleast 8 characters.')
    .max(20, 'Password cannot exceed 20 characters.')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%^&*#])[A-Za-z\d@$!%^&*#]{8,}$/,
      'Password must be alphanumberic, containing atleast one uppercase, lowercase and speacial charcter.'
    ),
});
