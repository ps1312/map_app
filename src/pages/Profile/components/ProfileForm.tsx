import { Formik, Field, FieldProps } from 'formik';
import { FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react";

import { SubmitProfileEditButton } from "./SubmitProfileEditButton"
import { validateEmail } from '../../../services/validations/validateEmail';
import { validateRequired } from '../../../services/validations/requiredField';

type ProfileFormProps = {
  initialValues: EditProfileFormValues;
  isLoading: boolean;
  onSubmit: ((values: EditProfileFormValues) => void);
}

export type EditProfileFormValues = {
  email: string;
  first_name: string;
  last_name: string;
}

const ProfileForm = ({ initialValues, onSubmit, isLoading }: ProfileFormProps) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {(props) => {
        const isValid = props.isValid === true && props.dirty === true
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

            <Field name="first_name" validate={validateRequired}>
              {({ field, form }: FieldProps<string>) => {
                const isInvalid = form.errors.first_name !== undefined && form.touched.first_name !== undefined
                return (
                  <FormControl mt={5} isInvalid={isInvalid}>
                    <FormLabel htmlFor="first_name">First name</FormLabel>
                    <Input {...field} id="first_name" type="first_name" placeholder="Please, enter your first name" />
                    <FormErrorMessage>Invalid first name</FormErrorMessage>
                  </FormControl>
                )
              }}
            </Field>

            <Field name="last_name" validate={validateRequired}>
              {({ field, form }: FieldProps<string>) => {
                const isInvalid = form.errors.last_name !== undefined && form.touched.last_name !== undefined
                return (
                  <FormControl mt={5} isInvalid={isInvalid}>
                    <FormLabel htmlFor="last_name">Last name</FormLabel>
                    <Input {...field} id="last_name" type="last_name" placeholder="Please, enter your last name" />
                    <FormErrorMessage>Invalid last name</FormErrorMessage>
                  </FormControl>
                )
              }}
            </Field>

            <SubmitProfileEditButton
              isLoading={isLoading}
              disabled={!isValid || isLoading}
              onSubmit={props.handleSubmit}
            />
          </>
        )
      }}
    </Formik>
  )
}

export default ProfileForm
