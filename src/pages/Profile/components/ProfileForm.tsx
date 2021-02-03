import { Formik, Field, FieldProps } from 'formik';
import { FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react";

import { SubmitProfileEditButton } from "./SubmitProfileEditButton"

type ProfileFormProps = {
  initialValues: EditProfileFormValues;
}

export type EditProfileFormValues = {
  email: string;
}

const ProfileForm = ({ initialValues }: ProfileFormProps) => {
  return (
    <Formik initialValues={initialValues} onSubmit={() => {}}>
      {(_props) => {
        return (
          <>
          <Field name="email" validate={validateEmail}>
              {({ field, form }: FieldProps<string>) => {
                const isInvalid = form.errors.email !== undefined && form.touched.email !== undefined
                return (
                  <FormControl mt={5} isInvalid={isInvalid}>
                    <FormLabel htmlFor="email">Email address</FormLabel>
                    <Input {...field} id="email" type="email" placeholder="Please, enter a email" />
                    <FormErrorMessage>Invalid email address</FormErrorMessage>
                  </FormControl>
                )
              }}
            </Field>

            <SubmitProfileEditButton isLoading={false} disabled={true} onSubmit={() => {}} />
          </>
        )
      }}
    </Formik>
  )
}

export default ProfileForm

function validateEmail(value: string) {
  let error;
  if (!value) {
    error = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
}