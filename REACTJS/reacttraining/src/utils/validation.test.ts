import { validateLoginForm, Errors } from "./validation";

describe('validateLoginForm', () => {
  test('Please re-enter because the username is missing.', () => {
    const result: Errors = validateLoginForm(undefined, 'Password@789');
    expect(result.username).toBe('Username is required.');
    expect(result.password).toBeUndefined();
  });

  test('Please re-enter because the password is missing.', () => {
    const result: Errors = validateLoginForm('Username@789');
    expect(result.password).toBe('Password is required.');
    expect(result.username).toBeUndefined();
  });

  test('Please re-enter because both username and password are missing', () => {
    const result: Errors = validateLoginForm(undefined, undefined);
    expect(result.username).toBe('Username is required.');
    expect(result.password).toBe('Password is required.');
  });

  test('Please re-enter because the password must be at least 8 characters long.', () => {
    const result: Errors = validateLoginForm('Username@789', 'abc@123');
    expect(result.password).toBe('Password must be at least 8 characters long.');
    expect(result.username).toBeUndefined();
  });

  test('Successfully!', () => {
    const result: Errors = validateLoginForm('Username@789', 'Abcd@1234');
    expect(result.username).toBeUndefined();
    expect(result.password).toBeUndefined();
  });
});