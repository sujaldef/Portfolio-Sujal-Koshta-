// File: my-portfolio/components/emails/ContactFormEmail.jsx

import React from 'react';
import {
  Html,
  Body,
  Head,
  Heading,
  Container,
  Text,
  Section,
  Preview,
  Hr,
} from '@react-email/components';

const ContactFormEmail = ({ senderEmail, reason, message }) => {
  return (
    <Html>
      <Head />
      <Preview>New Message from your Portfolio Contact Form</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>New Message Received</Heading>
          <Text style={paragraph}>You have a new message from your portfolio contact form.</Text>
          <Hr style={hr} />
          <Section>
            <Text>
              <strong>From:</strong> {senderEmail}
            </Text>
            <Text>
              <strong>Reason for Contact:</strong> {reason}
            </Text>
          </Section>
          <Hr style={hr} />
          <Section>
            <Heading as="h2" style={subHeading}>Message:</Heading>
            <Text style={messageBox}>{message}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Styles for the email template
const main = {
  backgroundColor: '#f4f4f4',
  fontFamily: 'Arial, sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px',
  width: '580px',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
};

const heading = {
  color: '#333',
  fontSize: '24px',
};

const subHeading = {
  color: '#555',
  fontSize: '18px',
  marginTop: '20px',
}

const paragraph = {
  color: '#666',
  fontSize: '16px',
  lineHeight: '1.5',
};

const messageBox = {
  border: '1px solid #ddd',
  borderRadius: '4px',
  padding: '16px',
  backgroundColor: '#f9f9f9',
  fontSize: '15px',
  lineHeight: '1.6',
  color: '#333',
}

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0',
};

export default ContactFormEmail;