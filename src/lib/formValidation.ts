/* ========================================================================== */
/*  Form validation utilities                                                  */
/* ========================================================================== */

const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export function validateEmail(email: string): boolean {
  return EMAIL_RE.test(email.trim());
}

export function validateRequired(value: string): boolean {
  return value.trim().length > 0;
}

export function validateLength(
  value: string,
  min: number,
  max: number,
): boolean {
  const len = value.trim().length;
  return len >= min && len <= max;
}

/* -------------------------------------------------------------------------- */

export interface FieldError {
  field: string;
  message: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  /** Honeypot — must be empty */
  website: string;
}

export function validateContactForm(data: ContactFormData): FieldError[] {
  const errors: FieldError[] = [];

  if (!validateRequired(data.name)) {
    errors.push({ field: "name", message: "Name is required" });
  } else if (!validateLength(data.name, 2, 100)) {
    errors.push({ field: "name", message: "Name must be 2-100 characters" });
  }

  if (!validateRequired(data.email)) {
    errors.push({ field: "email", message: "Email is required" });
  } else if (!validateEmail(data.email)) {
    errors.push({ field: "email", message: "Please enter a valid email" });
  }

  if (!validateRequired(data.subject)) {
    errors.push({ field: "subject", message: "Subject is required" });
  } else if (!validateLength(data.subject, 3, 200)) {
    errors.push({ field: "subject", message: "Subject must be 3-200 characters" });
  }

  if (!validateRequired(data.message)) {
    errors.push({ field: "message", message: "Message is required" });
  } else if (!validateLength(data.message, 10, 2000)) {
    errors.push({ field: "message", message: "Message must be 10-2000 characters" });
  }

  // Honeypot check
  if (data.website.trim().length > 0) {
    errors.push({ field: "website", message: "Bot detected" });
  }

  return errors;
}
