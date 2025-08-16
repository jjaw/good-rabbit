import './globals.css'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import { Inter } from 'next/font/google'
import { MantineProvider, ColorSchemeScript } from '@mantine/core'
import { Notifications } from '@mantine/notifications'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Good Rabbit',
  description: 'Send positive thoughts to your friends.. why wait?',
}

const theme = {
  primaryColor: 'pastelPink',
  colors: {
    pastelPurple: [
      '#f4f0f7',
      '#ede4f1', 
      '#e6d7eb',
      '#dfcae5',
      '#d8bddf',
      '#cdb4db',
      '#c2a9d1',
      '#b79ec7',
      '#ac93bd',
      '#a188b3'
    ],
    pastelPink: [
      '#fff7fb',
      '#ffeff6',
      '#ffe7f1',
      '#ffdfec',
      '#ffd7e7',
      '#ffc8dd',
      '#ffb9d3',
      '#ffaac9',
      '#ff9bbf',
      '#ff8cb5'
    ],
    pastelRose: [
      '#fff6f9',
      '#ffecf3',
      '#ffe2ed',
      '#ffd8e7',
      '#ffcee1',
      '#ffafcc',
      '#ff96b7',
      '#ff7da2',
      '#ff648d',
      '#ff4b78'
    ],
    pastelBlue: [
      '#f0f8ff',
      '#e1f1ff',
      '#d2eaff',
      '#c3e3ff',
      '#b4dcff',
      '#bde0fe',
      '#a6d4fd',
      '#8fc8fc',
      '#78bcfb',
      '#61b0fa'
    ],
    lightBlue: [
      '#f2f9ff',
      '#e5f3ff',
      '#d8edff',
      '#cbe7ff',
      '#bee1ff',
      '#a2d2ff',
      '#8bc3ff',
      '#74b4ff',
      '#5da5ff',
      '#4696ff'
    ]
  },
  defaultColorScheme: 'dark'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <MantineProvider theme={theme}>
          <Notifications />
          {children}
        </MantineProvider>
      </body>
    </html>
  )
}
