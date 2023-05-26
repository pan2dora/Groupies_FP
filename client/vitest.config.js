/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  test: {
    framework: "vitest",
    globals: true,
    environment: "jsdom",
  },
});


import { render, screen, fireEvent } from '@testing-library/react';
import UserSignup from './UserSignup';

describe('UserSignup', () => {
  it('updates user data on form submission', async () => {
    render(<UserSignup />);

    const displayNameInput = screen.getByLabelText('Display Name:');
    const pronounsInput = screen.getByLabelText('Pronouns:');
    const dateOfBirthInput = screen.getByLabelText('Date of Birth:');
    const pictureInput = screen.getByLabelText('Picture:');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    fireEvent.change(displayNameInput, { target: { value: 'John Doe' } });
    fireEvent.change(pronounsInput, { target: { value: 'he/him' } });
    fireEvent.change(dateOfBirthInput, { target: { value: '1990-01-01' } });
    fireEvent.change(pictureInput, { target: { value: 'https://example.com/picture.jpg' } });

    fireEvent.click(submitButton);

    await screen.findByText('User data updated successfully');

    expect(displayNameInput.value).toBe('');
    expect(pronounsInput.value).toBe('');
    expect(dateOfBirthInput.value).toBe('');
    expect(pictureInput.value).toBe('');
  });
});