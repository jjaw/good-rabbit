import Image from 'next/image';
import Form from './components/main-form';
import { Container, Stack, Text, Group, Center } from '@mantine/core';

export default function Home() {
  return (
    <main 
      style={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #cdb4db 0%, #bde0fe 50%, #a2d2ff 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative Clouds */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '100px',
        height: '50px',
        background: 'rgba(255, 255, 255, 0.5)',
        borderRadius: '50px',
        boxShadow: '0 4px 20px rgba(255, 255, 255, 0.3)',
        filter: 'blur(0.5px)'
      }} />
      <div style={{
        position: 'absolute',
        top: '15%',
        right: '15%',
        width: '80px',
        height: '40px',
        background: 'rgba(255, 255, 255, 0.45)',
        borderRadius: '40px',
        boxShadow: '0 3px 15px rgba(255, 255, 255, 0.25)',
        filter: 'blur(0.5px)'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '5%',
        width: '120px',
        height: '60px',
        background: 'rgba(255, 255, 255, 0.4)',
        borderRadius: '60px',
        boxShadow: '0 5px 25px rgba(255, 255, 255, 0.2)',
        filter: 'blur(1px)'
      }} />
      <div style={{
        position: 'absolute',
        top: '60%',
        right: '8%',
        width: '90px',
        height: '45px',
        background: 'rgba(255, 255, 255, 0.48)',
        borderRadius: '45px',
        boxShadow: '0 4px 18px rgba(255, 255, 255, 0.28)',
        filter: 'blur(0.5px)'
      }} />
      <div style={{
        position: 'absolute',
        top: '25%',
        left: '70%',
        width: '60px',
        height: '30px',
        background: 'rgba(255, 255, 255, 0.42)',
        borderRadius: '30px',
        boxShadow: '0 3px 12px rgba(255, 255, 255, 0.22)',
        filter: 'blur(0.5px)'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '40%',
        right: '25%',
        width: '70px',
        height: '35px',
        background: 'rgba(255, 255, 255, 0.44)',
        borderRadius: '35px',
        boxShadow: '0 3px 14px rgba(255, 255, 255, 0.24)',
        filter: 'blur(1px)'
      }} />
      <Container size="sm" py="xl">
        <Center style={{ minHeight: 'calc(100vh - 80px)' }}>
          <Stack align="center" gap="lg" w="100%" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
            {/* Header */}
            <Stack align="center" gap="md">
              <Text 
                size="xl" 
                fw={500} 
                c="white" 
                ta="center"
                style={{ 
                  lineHeight: 1.4,
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}
              >
                Send positive thoughts to your friends..&nbsp;
                <Text component="span" fw={700} c="pastelRose.5">
                  why wait?
                </Text>
              </Text>
              
              <Group gap="xs" align="center">
                <Text size="sm" c="white" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>By</Text>
                <Image
                  src="/goodrabbit_logo.png"
                  alt="Good Rabbit Logo"
                  width={80}
                  height={20}
                  priority
                  style={{
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                />
              </Group>
            </Stack>

            {/* Form Container */}
            <div style={{ width: '100%', maxWidth: '400px' }}>
              <Form />
            </div>
          </Stack>
        </Center>
      </Container>
      
      {/* Footer */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10
      }}>
        <Text 
          size="sm" 
          c="white" 
          ta="center"
          style={{ 
            textShadow: '0 1px 3px rgba(0,0,0,0.3)',
            opacity: 0.8
          }}
        >
          © Good Rabbit Foundation
        </Text>
      </div>
    </main>
  )
}
