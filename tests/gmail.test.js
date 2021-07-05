const { expect } = require('chai');
const gmailApi = require('./../framework/utils/gmailApiUtils');
const senderEmail = 'easyhire6@gmail.com';
const recipientEmail = 'neweasyhire@gmail.com';
const subject = 'test subject';
const message = 'test message';
const messageTimeout = 10000;

describe('send message to gmail', () => {
    
    it('should get last message', async () => {
        await gmailApi.sendMessage(recipientEmail, senderEmail, subject, message);
        
        await new Promise(resolve => setTimeout(resolve, messageTimeout))
        
        let id = await gmailApi.getIdLastMessage(recipientEmail);
        let lastMessage = await gmailApi.getEmailMessage(id, recipientEmail);
        expect(lastMessage.subject).contains(subject);
        expect(lastMessage.message).contains(message);
    });
});
