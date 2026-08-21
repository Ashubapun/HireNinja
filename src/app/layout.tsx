import '@/styles/index.css';
import React from 'react';
import { AuthProvider } from '@/contexts/AuthContext';

export const metadata = {
    title: 'HireNinja',
    description: 'AI-Powered Recruitment for Modern Teams',
};

export default function GlobalRootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}
