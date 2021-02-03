import { Formik, Field, FieldProps } from 'formik';
import { FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react";

import { SubmitRegistrationButton } from "./SubmitRegistationButton";

type RegistrationFormProps = {
  isLoading: boolean;
  onSubmit: ((values: RegistrationFormValues) => void);
}

type RegistrationFormValues = {
  email: string;
  password: string;
}

export const RegistrationForm = ({
  isLoading,
  onSubmit,
} : RegistrationFormProps) => {
  const initialValues: RegistrationFormValues = {
    email: "",
    password: "",
  }

  return (
    <Formik initialValues={initialValues} onSubmit={(values) => onSubmit(values)}>
      {({ handleSubmit }) => {
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

            <Field name="password">
            {({ field, form }: FieldProps<string>) => {
                const isInvalid = form.errors.password !== undefined && form.touched.password !== undefined
                return (
                  <FormControl isRequired mt={5} isInvalid={isInvalid}>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input {...field} id="password" type="password" placeholder="Please, enter a password"/>
                    <FormErrorMessage>Invalid password</FormErrorMessage>
                  </FormControl>
                )
              }}
            </Field>

            <SubmitRegistrationButton
              isLoading={isLoading}
              onSubmit={handleSubmit}
            />
          </>
        )
      }}
    </Formik>
  )
}

function validateEmail(value: string) {
  let error;
  if (!value) {
    error = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
}