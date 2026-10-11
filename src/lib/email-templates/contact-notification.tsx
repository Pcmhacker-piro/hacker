import React from 'react'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  name?: string
  email?: string
  message?: string
}

const Email = ({ name, email, message }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New portfolio message from {name || 'a visitor'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>New message from your portfolio</Heading>
        <Section style={box}>
          <Text style={label}>From</Text>
          <Text style={value}>{name || 'Unknown'}</Text>
          <Text style={label}>Email</Text>
          <Text style={value}>
            {email ? <Link href={`mailto:${email}`} style={link}>{email}</Link> : '—'}
          </Text>
        </Section>
        <Hr style={hr} />
        <Text style={label}>Message</Text>
        <Text style={messageText}>{message || ''}</Text>
        <Hr style={hr} />
        <Text style={footer}>
          Reply directly to this email to respond to {name || 'the sender'}.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: (data: Record<string, any>) =>
    `Portfolio message from ${data['name'] || 'a visitor'}`,
  displayName: 'Contact form notification',
  previewData: {
    name: 'Jane Doe',
    email: 'jane@company.com',
    message: 'Hi Prakash — we have a frontend internship opening and your Verdiqy work caught my eye. Could we chat this week?',
  },
  to: 'pcmeena511@gmail.com',
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px 28px', maxWidth: '560px' }
const heading = { fontSize: '20px', color: '#0f172a', margin: '0 0 16px' }
const box = {
  backgroundColor: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
  padding: '12px 16px',
}
const label = {
  fontSize: '11px',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.06em',
  color: '#64748b',
  margin: '8px 0 2px',
}
const value = { fontSize: '14px', color: '#0f172a', margin: '0 0 4px' }
const link = { color: '#2563eb', textDecoration: 'none' }
const hr = { borderColor: '#e2e8f0', margin: '16px 0' }
const messageText = { fontSize: '14px', lineHeight: '1.6', color: '#1e293b', whiteSpace: 'pre-wrap' as const }
const footer = { fontSize: '12px', color: '#94a3b8' }
