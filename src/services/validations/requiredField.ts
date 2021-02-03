export function validateRequired(value: string) {
  let error;
  if (!value) {
    error = 'Required';
  }
  return error;
}
