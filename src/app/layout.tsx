import '@/styles/index.css';
import React from 'react';

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
            <body>{children}</body>
        </html>
    );
}
