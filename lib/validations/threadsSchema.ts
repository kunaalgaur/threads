import * as yup from 'yup';

export const threadsValidations = yup
  .object()
  .shape({
    image: yup.string(),
    caption: yup.string(),
  })
  .test(
    'eitherImageOrCaption',
    'Enter either a caption, an image, or both',
    function (value) {
      const { image, caption } = value;

      // Check if at least one of image or caption is provided
      if (!image && !caption) {
        return this.createError({
          message: 'Enter either a caption, an image, or both',
          path: 'image',
        });
      }

      return true;
    }
  );
