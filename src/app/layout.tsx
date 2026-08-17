import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DMFlow AI - Turn Instagram Followers Into Customers With AI',
  description: 'Full-stack Instagram DM automation, AI agent chatbot, lead CRM, link-in-bio builder, digital products & analytics platform.',
  openGraph: {
    title: 'DMFlow AI - Turn Instagram Followers Into Customers With AI',
    description: 'Automate eligible Instagram conversations, capture leads in real-time, and let AI help turn followers into customers.',
    url: 'https://dmflow.ai',
    siteName: 'DMFlow AI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DMFlow AI',
    description: 'Turn Instagram Followers Into Customers With AI.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#09090b] text-slate-100 antialiased min-h-screen selection:bg-purple-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
