import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wyatt.gg | Contact',
  description: 'Get in touch for sponsorships, voice acting opportunities, and business inquiries',
};

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Get in Touch</h1>
          <p className="text-gray-300 text-lg mb-4">
            Interested in working together? I'm open to sponsorships, voice acting opportunities, and other business inquiries.
          </p>
          <div className="bg-gray-800 rounded-lg p-6 max-w-2xl mx-auto">
            <p className="text-gray-300 mb-2">
              Feel free to reach out directly via email:
            </p>
            <a 
              href="mailto:lounge_lizards@yahoo.com" 
              className="text-blue-400 hover:text-blue-300 transition-colors duration-150 font-medium break-all"
            >
              lounge_lizards@yahoo.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}