export function validateEmail(email: string) {
  const pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return pattern.test(email);
}

export function validateMobileNumber(phoneNumber: string) {
  const pattern = /^[+\d-]+$/;
  return pattern.test(phoneNumber);
}

export function validatePhoneNumber(phoneNumber: string) {
  const pattern = /^(?:[+\d-]+)?$/;
  return pattern.test(phoneNumber);
}

export function isObjEmpty(obj: object) {
  return Object.keys(obj).length === 0;
}
