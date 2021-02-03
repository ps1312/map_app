import { Formik, Field, FieldProps } from 'formik';
import { FormControl, FormLabel, Input, FormErrorMessage, Alert, AlertIcon, Link, Flex } from "@chakra-ui/react";

import { SubmitLoginButton } from "./SubmitLoginButton";
import { validateRequired } from '../../../services/validations/requiredField';
import { validateEmail } from '../../../services/validations/validateEmail';

type LoginFormProps = {
  failed: boolean;
  isLoading: boolean;
  onSubmit: ((values: LoginFormValues) => void);
}

export type LoginFormValues = {
  email: string;
  password: string;
}

export const LoginForm = ({
  failed,
  isLoading,
  onSubmit,
} : LoginFormProps) => {
  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {(props) => {
        const isValid = props.isValid === true && props.dirty === true

        return (
          <>
            {failed &&
              <Alert status="error">
                <AlertIcon />
                Something went wrong.
              </Alert>
            }

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

            <Field name="password" validate={validateRequired}>
            {({ field, form }: FieldProps<string>) => {
                const isInvalid = form.errors.password !== undefined && form.touched.password !== undefined
                return (
                  <FormControl mt={5} isInvalid={isInvalid}>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input {...field} id="password" type="password" placeholder="Please, enter a password"/>
                    <FormErrorMessage>Invalid password</FormErrorMessage>
                  </FormControl>
                )
              }}
            </Field>

            <Flex flexDirection="row" justifyContent="space-between">
              <Link mb="3" color="blue.600" fontWeight="bold" href="/register" alignSelf="flex-end">
                Create an account
              </Link>

              <SubmitLoginButton
                disabled={!isValid}
                isLoading={isLoading}
                onSubmit={props.handleSubmit}
              />
            </Flex>
          </>
        )
      }}
    </Formik>
  )
}
