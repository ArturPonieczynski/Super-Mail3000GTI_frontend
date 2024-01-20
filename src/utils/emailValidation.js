export const validateEmails = (input) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const emails = input.replace(/\s+/g, '').split(',');

    const invalidEmails = emails.filter(email => !emailRegex.test(email));

    if (invalidEmails.length > 0) {
        return {valid: false, invalidEmails: invalidEmails};
    } else {
        return {valid: true, invalidEmails: []};
    }
}
