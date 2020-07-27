export default function validEmail(emailToCheck: string): boolean {
  // Valid email regex - https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript/46181#46181
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    emailToCheck
  );
}
