export const config = {
    apiUrl: process.env.REACT_APP_API_URL ?? 'http://localhost:3001',
    emailFooterTemplate: process.env.REACT_APP_EMAIL_FOOTER_TEMPLATE,
    defaultEmailSendMethod: process.env.REACT_APP_DEFAULT_EMAIL_SEND_METHOD,
};
