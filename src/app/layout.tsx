import type { Metadata } from 'next';
import Navbar from '@/common/Navbar';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { CopilotKit } from '@copilotkit/react-core';
import '@copilotkit/react-ui/styles.css';
import { CopilotPopup } from '@copilotkit/react-ui';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Financial Dashboard',
  description: 'An app to add and update Financial Data',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CopilotKit runtimeUrl="/api/copilotkit">
            <Navbar />
            {children}
            <CopilotPopup
              instructions={
                'You are assisting the user as best as you can. Ansewr in the best way possible given the data you have.'
              }
              labels={{
                title: 'Popup Assistant',
                initial: 'Need any help?',
              }}
            />
        </CopilotKit>
      </body>
    </html>
  );
}
