// src/utils/cognito.js
import { Auth } from "aws-amplify";

/**
 * Sign up a user with email+password.
 * attributes: { name: "Full Name" } etc.
 */
export async function signUp({ email, password, attributes = {} }) {
  return Auth.signUp({
    username: email,
    password,
    attributes,
  });
}

/** Confirm signup using code sent to email */
export async function confirmSignUp({ email, code }) {
  return Auth.confirmSignUp(email, code);
}

/** Sign in user */
export async function signIn({ email, password }) {
  return Auth.signIn(email, password);
}

/** Sign out user */
export async function signOut() {
  return Auth.signOut();
}

/** Get current authenticated user (returns null if none) */
export async function currentUser() {
  try {
    const u = await Auth.currentAuthenticatedUser();
    return u;
  } catch {
    return null;
  }
}
