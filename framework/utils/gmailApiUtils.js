const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const clientSecret = (email) => require(`./../../${email.replace('@gmail.com', '')}/clientSecret.json`).installed;
const token = (email) => require(`./../../${email.replace('@gmail.com', '')}/token.json`);
const newTokenPath = (email) => `${email.replace('@gmail.com', '')}/token.json`;
const GmailMessage = require('./../models/gmailMessage')
const SCOPES = ['https://mail.google.com/'];

function getIdLastMessage(email) {
  return new Promise((resolve) => {
    let auth = authorize(email);
    const gmail = google.gmail({version: 'v1', auth});
    gmail.users.messages.list({
      userId: 'me',
      q: 'label:inbox'
    }, (err, res) => {
      if (err) {
        return console.log('The API returned an error: ' + err);
      }
      resolve(res.data.messages[0].id)
    });
  });
}

function getEmailMessage(messageId, email) {
  return new Promise((resolve) => {
    let auth = authorize(email);
    const gmail = google.gmail({version: 'v1', auth});
    gmail.users.messages.get({
      userId: 'me',
      id: messageId
    }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      var subject = res.data.payload.headers.find(header => header.name == 'Subject').value;
      var message = Buffer.from(res.data.payload.body.data, 'base64').toString('utf8')
      resolve(new GmailMessage(subject, message));
    });
  });
}

function sendMessage(to, from, subject, message) {
  return new Promise((resolve) => {
    let raw = makeBody(to, from, subject, message);
    let auth = authorize(from);
    const gmail = google.gmail({version: 'v1', auth});
    gmail.users.messages.send({
        auth: auth,
        userId: 'me',
        resource: {
            raw: raw
        }
    }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      resolve(res.status);
    });
  });
}

function makeBody(to, from, subject, message) {
  var str = ["Content-Type: text/plain; charset=\"UTF-8\"\n",
      "MIME-Version: 1.0\n",
      "Content-Transfer-Encoding: 7bit\n",
      "to: ", to, "\n",
      "from: ", from, "\n",
      "subject: ", subject, "\n\n",
      message
  ].join('');
  return Buffer.from(str).toString("base64").replace(/\+/g, '-').replace(/\//g, '_');
}

function authorize(email) {
  var clientSecretFile = clientSecret(email);
  const oAuth2Client = new google.auth.OAuth2(clientSecretFile.client_id, clientSecretFile.client_secret, clientSecretFile.redirect_uris[0]);
  oAuth2Client.setCredentials(token(email));
  return oAuth2Client;
}

function getNewToken(email) {
  var clientSecretFile = clientSecret(email);
  const oAuth2Client = new google.auth.OAuth2(clientSecretFile.client_id, clientSecretFile.client_secret, clientSecretFile.redirect_uris[0]);
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      fs.writeFile(newTokenPath(email), JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', newTokenPath(email));
      });
    });
  });
}

module.exports = {
  getNewToken,
  getIdLastMessage,
  getEmailMessage,
  sendMessage
};
