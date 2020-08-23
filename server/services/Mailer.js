const keys = require('../config/keys');

const apiKey = keys.mailgunPublicKey;
const DOMAIN = keys.mailgunDomain;
const mailgun = require('mailgun-js')({apiKey, domain: DOMAIN});

class Mailer {
    constructor({ subject, recipients }, content) {
        this.data = {
          from: 'no-reply@samples.mailgun.org',
          subject: subject,
          text: 'This is just text',
          html: content,
          "o:tracking": 'yes',
          to: this.formatAddresses(recipients),
        };
    }

    formatAddresses(recipients) {
        return recipients.map(({ email }) => {
            return email;
        }).join(',');
    }

    async send() {
        // const response = await mailgun.messages().send(this.data);
        // return response;
        response = mailgun.messages().send(this.data, function (error, body) {

            mailgun.get(`/${DOMAIN}/events`, function (error, body) {
                const response = body;

                // console.log('Tracking click response:', response);
                return response;
            });
        });
    }
}


module.exports = Mailer;
