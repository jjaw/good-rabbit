import React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

const EmailTemplate = (
  message, reciepientName, homeLink="https://www.goodrabb.it",
) => (
  <Html>
    <Head />
    <Preview>Random act of Positivity from Good Rabbit.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`${baseUrl}/goodrabbit_logo.png`}
          alt="Good Rabbit Logo"
          width={48}
          height={48}
        />
        <Heading style={heading}>Your gRabbit~</Heading>
        <Section style={body}>
          <Text style={paragraph}>
            {message}
          </Text>
        </Section>
        <Text style={paragraph}>
          hip hip,
          <br />- Good Rabbit Team
        </Text>
        <Text style={paragraph}>
            <Link style={link} href={homeLink}>
            🐰 Pass gRabbit forward! Click here to share positivity. 🐇
            </Link>
          </Text>
        <Hr style={hr} />
        <Img
          src={`${baseUrl}/goodrabbit_logo.png`}
          alt="Good Rabbit Logo"
          width={32}
          height={32}
          style={{
            WebkitFilter: 'grayscale(100%)',
            filter: 'grayscale(100%)',
            margin: '20px 0', 
          }}
        />
        <Text style={footer}>gRabbit is a small dosage of positivity encouragement.</Text>
        <Text style={footer}>Good Rabbit Foundation.</Text>
        <Text style={footer}>
          This address will not receive email replies.
        </Text>
      </Container>
    </Body>
  </Html>
);

export default EmailTemplate;

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 25px 48px',
  backgroundImage: 'url("/assets/raycast-bg.png")',
  backgroundPosition: 'bottom',
  backgroundRepeat: 'no-repeat, no-repeat',
};

const heading = {
  fontSize: '20px',
  fontWeight: 'bold',
  marginTop: '48px',
};

const body = {
  margin: '24px 0',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
};

const link = {
  color: '#FF6363',
};

const hr = {
  borderColor: '#dddddd',
  marginTop: '48px',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  marginLeft: '4px',
};
