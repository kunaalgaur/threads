import * as yup from 'yup';

export const onboardingValidations = yup.object().shape({
  username: yup
    .string()
    .required('Username is a required field')
    .matches(
      /^[a-zA-Z][a-zA-Z0-9._]{2,28}[a-zA-Z0-9]$/,
      `Username can consist of alphanumberic characters and special characters like '_' or '.' and must start with an english alphabet..`
    )
    .min(3, 'Username should be atleast 3 charcters.')
    .max(20, 'Username cannot exceed 20 characters.'),
  bio: yup.string().max(80, 'bio cannot exceed 80 characters.'),
});
