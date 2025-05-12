import { useState } from 'react';
import { MessageSquare, Phone, Mail, FileQuestion, Search, ExternalLink, Clock, AlertCircle } from 'lucide-react';

const Support = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      question: "How do I receive payments for completed projects?",
      answer: "Payments are automatically processed via ACH transfer to your linked bank account. You'll receive 80% of the project fee, with payments processed within 3-5 business days after project approval."
    },
    {
      question: "What are the storage pricing tiers?",
      answer: "Storage pricing starts at $10/month for 500GB. Additional storage can be purchased in 500GB increments. Bandwidth is charged at $0.05 per GB after the included 1TB monthly allowance."
    },
    {
      question: "How do I submit completed work?",
      answer: "Navigate to the 'Uploaded Work' section in your dashboard. You can upload files directly or provide links to your delivery. All submissions go through quality review before client delivery."
    },
    {
      question: "What equipment specifications are required?",
      answer: "Minimum requirements include 4K video capability, professional audio equipment, and lighting gear. Check the 'Guidelines' section for detailed specifications."
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Support Center</h1>
        <p className="mt-2 text-gray-600">Get help with your videographer account and projects</p>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center mb-4">
            <MessageSquare className="w-6 h-6 text-blue-600 mr-3" />
            <h2 className="text-lg font-semibold text-gray-800">Live Chat</h2>
          </div>
          <p className="text-gray-600 mb-4">Get instant help from our support team</p>
          <button className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-900 transition-colors">
            Start Chat
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center mb-4">
            <Phone className="w-6 h-6 text-green-600 mr-3" />
            <h2 className="text-lg font-semibold text-gray-800">Call Support</h2>
          </div>
          <p className="text-gray-600 mb-4">Videographer priority line</p>
          <a
            href="tel:1-800-VIDEO-PRO"
            className="block w-full text-center bg-black text-white py-2 px-4 rounded-md hover:bg-gray-900 transition-colors"
          >
            1-800-VIDEO-PRO
          </a>
          <p className="text-sm text-gray-500 mt-2">Available 24/7</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center mb-4">
            <Mail className="w-6 h-6 text-purple-600 mr-3" />
            <h2 className="text-lg font-semibold text-gray-800">Email</h2>
          </div>
          <p className="text-gray-600 mb-4">Send us a detailed message</p>
          <a
            href="mailto:videographer.support@northbound.com"
            className="block w-full text-center bg-black text-white py-2 px-4 rounded-md hover:bg-gray-900 transition-colors"
          >
            Send Email
          </a>
          <p className="text-sm text-gray-500 mt-2">Response within 2 hours</p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-12">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
          
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black"
            />
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <button
                  className="flex justify-between items-start w-full text-left"
                  onClick={() => {}}
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <FileQuestion className="h-5 w-5 text-gray-400 ml-4 flex-shrink-0" />
                </button>
                <p className="mt-2 text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Resources */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Resources</h2>
          <ul className="space-y-3">
            <li>
              <a href="#" className="flex items-center text-gray-600 hover:text-black">
                <ExternalLink className="h-5 w-5 mr-2" />
                Videographer Guidelines
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center text-gray-600 hover:text-black">
                <ExternalLink className="h-5 w-5 mr-2" />
                Equipment Requirements
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center text-gray-600 hover:text-black">
                <ExternalLink className="h-5 w-5 mr-2" />
                Payment Documentation
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center text-gray-600 hover:text-black">
                <ExternalLink className="h-5 w-5 mr-2" />
                Best Practices Guide
              </a>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Support Status</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-gray-600">Average Response Time</span>
              </div>
              <span className="font-medium">Under 2 hours</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-gray-600">System Status</span>
              </div>
              <span className="font-medium">All Systems Operational</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Hours */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Hours</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Technical Support</h3>
            <p className="text-gray-600">24/7 availability</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Account & Billing Support</h3>
            <p className="text-gray-600">Monday - Friday: 9am - 6pm EST</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;