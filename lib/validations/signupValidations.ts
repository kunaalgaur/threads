import * as yup from 'yup';

export const signupValidations = yup.object().shape({
  name: yup
    .string()
    .required('Name is a required field.')
    .min(3, 'Name should be atleast 3 characters.')
    .max(30, 'Name cannot exceed 30 characters.'),
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
