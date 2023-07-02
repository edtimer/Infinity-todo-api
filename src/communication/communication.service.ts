import { Injectable } from '@nestjs/common';
import { CreateInstantMessageInput } from './dto/create-communication-instant.input';
import { CreateEmailInput } from './dto/create-communication.input';
import { MailerService } from '@nestjs-modules/mailer';
import { OnEvent } from '@nestjs/event-emitter';

import { TenantCreatedEvent } from 'event/tenantCreated';
// import client from '@sendgrid/mail'
@Injectable()
export class CommunicationService {
  constructor(private readonly mail: MailerService) { }

@OnEvent('tenant.created')
  async sendFirstTimeEmail(createCommunicationInput: TenantCreatedEvent): Promise<string> {
  
    const client = require('@sendgrid/mail');
    client.setApiKey(process.env.SENDGRID_API_KEY);
    try {


      const message = {
        type:'text/html',
        
        from: {

          email: process.env.EMAIL_ADDRESS,
          name: `A task is due ${createCommunicationInput.name}`
        },
        to:
        {
          email: createCommunicationInput.email,
          name: 'User'
        },

        subject: `Hello! , you have a task due`,
        content: [
          {
            type: 'text/html',
            value: '<p>Hello from Twilio SendGrid!</p><p>Sending with the email service trusted by developers and marketers for <strong>time-savings</strong>, <strong>scalability</strong>, and <strong>delivery expertise</strong>.</p><p>%open-track%</p>'
          }
        ],
        // text:createCommunicationInput.object,
        dynamic_template_data: {
          "email_Content": `Hello you have a task due.`,
        },
        template_id: "id here"
        ,

      };

      client
        .send(message)
        // .then(() => console.log('Mail sent successfully'))
        .then(() => {'Mail sent successfully'})
        .catch(error => {
          console.error(error.response.body);
        });
return "success"


    }
    catch (err) {
      throw Error(`Error-Communication failed ${err}`)
    }
  }

  async sendEmail(createCommunicationInput: CreateEmailInput): Promise<string> {
    const client = require('@sendgrid/mail');
    client.setApiKey(process.env.SENDGRID_API_KEY);
    try {



      const message = {
        type:'text/html',
        
        from: {

          email: process.env.EMAIL_ADDRESS,
          name: `Infinity to do notification ${createCommunicationInput.subject}`
        },
        to:
        {
          // email: emailhere,
          name: 'name here'
        },

        subject: createCommunicationInput.subject,
        content: [
          {
            type: 'text/html',
            value: '<p>Hello from Twilio SendGrid!</p><p>Sending with the email service trusted by developers and marketers for <strong>time-savings</strong>, <strong>scalability</strong>, and <strong>delivery expertise</strong>.</p><p>%open-track%</p>'
          }
        ],
        // text:createCommunicationInput.object,
        dynamic_template_data: {
          "email_Content": createCommunicationInput.object,
        },
        template_id: "template id here"
        ,
      

      };

      client
        .send(message)
        // .then(() => console.log('Mail sent successfully'))
        .then(() => {'Mail sent successfully'})
        .catch(error => {
          console.error(error.response.body);
        });
return "success"



    }
    catch (err) {
      throw Error(`Error-Communication failed ${err}`)
    }
  }
  sendInstantMessage(createCommunicationInput: CreateInstantMessageInput) {
    return 'This action adds a new communication';
  }


}
