import { screen, fireEvent, waitFor } from '@testing-library/react'

export async function simulateTyping(label: string, value: string): Promise<void> {
  const input = screen.getByLabelText(label)
  await waitFor(() => fireEvent.change(input, { target: { value } }));
  await waitFor(() => fireEvent.blur(input));
}

export async function submitForm() {
  await waitFor(() => fireEvent.click(screen.getByRole('button')))
}