import Image from 'next/image';
import Form from './components/main-form';
import { Container, Stack, Text, Group, Center, Box } from '@mantine/core';

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
      <Box
        pos="absolute"
        top="10%"
        left="10%"
        w={100}
        h={50}
        bg="rgba(255, 255, 255, 0.5)"
        style={{
          borderRadius: '50px',
          boxShadow: '0 4px 20px rgba(255, 255, 255, 0.3)',
          filter: 'blur(0.5px)'
        }}
      />
      <Box
        pos="absolute"
        top="15%"
        right="15%"
        w={80}
        h={40}
        bg="rgba(255, 255, 255, 0.45)"
        style={{
          borderRadius: '40px',
          boxShadow: '0 3px 15px rgba(255, 255, 255, 0.25)',
          filter: 'blur(0.5px)'
        }}
      />
      <Box
        pos="absolute"
        bottom="20%"
        left="5%"
        w={120}
        h={60}
        bg="rgba(255, 255, 255, 0.4)"
        style={{
          borderRadius: '60px',
          boxShadow: '0 5px 25px rgba(255, 255, 255, 0.2)',
          filter: 'blur(1px)'
        }}
      />
      <Box
        pos="absolute"
        top="60%"
        right="8%"
        w={90}
        h={45}
        bg="rgba(255, 255, 255, 0.48)"
        style={{
          borderRadius: '45px',
          boxShadow: '0 4px 18px rgba(255, 255, 255, 0.28)',
          filter: 'blur(0.5px)'
        }}
      />
      <Box
        pos="absolute"
        top="25%"
        left="70%"
        w={60}
        h={30}
        bg="rgba(255, 255, 255, 0.42)"
        style={{
          borderRadius: '30px',
          boxShadow: '0 3px 12px rgba(255, 255, 255, 0.22)',
          filter: 'blur(0.5px)'
        }}
      />
      <Box
        pos="absolute"
        bottom="40%"
        right="25%"
        w={70}
        h={35}
        bg="rgba(255, 255, 255, 0.44)"
        style={{
          borderRadius: '35px',
          boxShadow: '0 3px 14px rgba(255, 255, 255, 0.24)',
          filter: 'blur(1px)'
        }}
      />
      <Container size="sm" py="xl">
        <Center style={{ minHeight: 'calc(100vh - 80px)' }}>
          <Stack align="center" w="100%" pt={40} pb={40}>
            {/* Header */}
            <Stack align="center" gap="sm" mb="xl">
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
            <Box w="100%" maw={400}>
              <Form />
            </Box>
          </Stack>
        </Center>
      </Container>
      
      {/* Footer */}
      <Box 
        pos="absolute" 
        bottom={20} 
        left="50%" 
        style={{ transform: 'translateX(-50%)', zIndex: 10 }}
      >
        <Text 
          size="sm" 
          c="white" 
          ta="center"
          style={{ 
            textShadow: '0 1px 3px rgba(0,0,0,0.3)',
            opacity: 0.8
          }}
        >
          © 2025 Good Rabbit Foundation
        </Text>
      </Box>
    </main>
  )
}
