// apiConfig.ts
const BASE_URL = 'http://127.0.0.1:8000';

export { BASE_URL };

export const REGISTER_URL = `${BASE_URL}/register/`;
export const LOGIN_URL = `${BASE_URL}/login/`;
export const LOGOUT_URL = `${BASE_URL}/logout/`;
export const VERIFY_TOKEN_URL = `${BASE_URL}/token/verify/`;
export const CHANGE_PASSWORD_URL = `${BASE_URL}/password/change`;
export const RESEND_EMAIL_URL = `${BASE_URL}/resend-email/`;
export const RESET_PASSWORD_URL = `${BASE_URL}/password/reset/`;
export const USER_URL = `${BASE_URL}/api/users/`;
export const REFRESH_TOKEN_URL = `${BASE_URL}/token/refresh/`;

// Face Recognition
export const RECOGNITION_URL = `${BASE_URL}/api/recognition/recognize/`;

// Transactions
export const ACCOUNTS_URL = `${BASE_URL}/transactions/accounts/`;
export const TRANSACTIONS_URL = `${BASE_URL}/transactions/transactions/`;
export const WITHDRAWALS_URL = `${BASE_URL}/transactions/withdrawals/`;
export const DEPOSITS_URL = `${BASE_URL}/transactions/deposits/`;
export const TRANSFERS_URL = `${BASE_URL}/transactions/transfers/`;
export const BILL_PAYMENTS_URL = `${BASE_URL}/transactions/bill-payments/`;
