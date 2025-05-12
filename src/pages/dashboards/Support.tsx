import { useState } from 'react';
import { MessageSquare, Phone, Mail, FileQuestion, Search, ExternalLink, Clock, AlertCircle, Send } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SupportTicket {
  subject: string;
  category: string;
  priority: string;
  description: string;
  attachments?: File[];
}

const Support = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [ticket, setTicket] = useState<SupportTicket>({
    subject: '',
    category: '',
    priority: 'normal',
    description: ''
  });

  const handleSubmitTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would submit the ticket to the backend
    console.log('Submitting ticket:', ticket);
    // Reset form and show success message
    setTicket({
      subject: '',
      category: '',
      priority: 'normal',
      description: ''
    });
    setShowTicketForm(false);
    alert('Support ticket submitted successfully! We will respond within 24 hours.');
  };

  // Role-specific FAQs
  const faqs = {
    customer: [
      {
        question: "How do I start a new video project?",
        answer: "Navigate to your dashboard and click 'New Project'. Follow the project wizard to specify your requirements, upload assets, and set your goals. Our team will review and provide an estimate within 24 hours."
      },
      {
        question: "What file formats do you accept?",
        answer: "We accept most common video formats (MP4, MOV, AVI) and image formats (JPG, PNG, PSD). For best quality, we recommend providing source files in their highest resolution."
      },
      {
        question: "How long does a typical project take?",
        answer: "Project timelines vary based on complexity. Basic projects typically take 5-7 business days, while more complex projects may take 2-3 weeks. Your project dashboard will show estimated completion dates."
      }
    ],
    videographer: [
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
      }
    ],
    admin: [
      {
        question: "How do I assign projects to videographers?",
        answer: "In the Projects section, select a project and click 'Assign'. You can filter videographers by location, expertise, and availability before making an assignment."
      },
      {
        question: "What are the SLA requirements for support tickets?",
        answer: "High priority tickets require response within 2 hours, normal priority within 24 hours, and low priority within 48 hours. All response times are during business hours."
      },
      {
        question: "How do I process videographer payouts?",
        answer: "Review completed projects in the Payouts section. Verify deliverables, approve the payment amount, and initiate the transfer. Payments are processed every Monday for the previous week."
      }
    ]
  };

  const filteredFaqs = faqs[user?.role || 'customer'].filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Role-specific categories
  const ticketCategories = {
    customer: ['project', 'billing', 'technical', 'account', 'other'],
    videographer: ['project', 'payment', 'technical', 'account', 'other'],
    admin: ['system', 'user', 'videographer', 'billing', 'other']
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Support Center</h1>
        <p className="mt-2 text-gray-600">
          {user?.role === 'admin' 
            ? 'Manage support requests and assist users'
            : 'Get help with your account and projects'}
        </p>
      </div>

      {/* Support Ticket Form */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Mail className="w-6 h-6 text-purple-600 mr-3" />
            <h2 className="text-lg font-semibold text-gray-800">Submit a Support Ticket</h2>
          </div>
          <button
            onClick={() => setShowTicketForm(!showTicketForm)}
            className="text-sm text-gray-600 hover:text-black"
          >
            {showTicketForm ? 'Cancel' : 'Create New Ticket'}
          </button>
        </div>

        {showTicketForm ? (
          <form onSubmit={handleSubmitTicket} className="space-y-6">
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                value={ticket.subject}
                onChange={(e) => setTicket({ ...ticket, subject: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black"
                required
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                value={ticket.category}
                onChange={(e) => setTicket({ ...ticket, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black"
                required
              >
                <option value="">Select a category</option>
                {ticketCategories[user?.role || 'customer'].map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                id="priority"
                value={ticket.priority}
                onChange={(e) => setTicket({ ...ticket, priority: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black"
                required
              >
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                value={ticket.description}
                onChange={(e) => setTicket({ ...ticket, description: e.target.value })}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black"
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Attachments (optional)
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-black hover:text-gray-700"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                <Send className="h-4 w-4 mr-2" />
                Submit Ticket
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-600">Need help? Create a support ticket and we'll respond within 24 hours.</p>
          </div>
        )}
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
          <p className="text-gray-600 mb-4">Speak with a representative</p>
          <a
            href="tel:1-800-VIDEO-PRO"
            className="block w-full text-center bg-black text-white py-2 px-4 rounded-md hover:bg-gray-900 transition-colors"
          >
            1-800-VIDEO-PRO
          </a>
          <p className="text-sm text-gray-500 mt-2">
            {user?.role === 'admin' ? '24/7 Support Line' : 'Mon-Fri: 9am - 6pm EST'}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center mb-4">
            <Mail className="w-6 h-6 text-purple-600 mr-3" />
            <h2 className="text-lg font-semibold text-gray-800">Email</h2>
          </div>
          <p className="text-gray-600 mb-4">Send us a detailed message</p>
          <button
            onClick={() => setShowTicketForm(true)}
            className="block w-full text-center bg-black text-white py-2 px-4 rounded-md hover:bg-gray-900 transition-colors"
          >
            Create Support Ticket
          </button>
          <p className="text-sm text-gray-500 mt-2">Response within 24 hours</p>
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
            {user?.role === 'customer' && (
              <>
                <li>
                  <a href="#" className="flex items-center text-gray-600 hover:text-black">
                    <ExternalLink className="h-5 w-5 mr-2" />
                    Getting Started Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-gray-600 hover:text-black">
                    <ExternalLink className="h-5 w-5 mr-2" />
                    Video Requirements
                  </a>
                </li>
              </>
            )}
            {user?.role === 'videographer' && (
              <>
                <li>
                  <a href="#" className="flex items-center text-gray-600 hover:text-black">
                    <ExternalLink className="h-5 w-5 mr-2" />
                    Videographer Guidelines
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-gray-600 hover:text-black">
                    <ExternalLink className="h-5 w-5 mr-2" />
                    Payment Documentation
                  </a>
                </li>
              </>
            )}
            {user?.role === 'admin' && (
              <>
                <li>
                  <a href="#" className="flex items-center text-gray-600 hover:text-black">
                    <ExternalLink className="h-5 w-5 mr-2" />
                    Admin Manual
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-gray-600 hover:text-black">
                    <ExternalLink className="h-5 w-5 mr-2" />
                    Support Protocols
                  </a>
                </li>
              </>
            )}
            <li>
              <a href="#" className="flex items-center text-gray-600 hover:text-black">
                <ExternalLink className="h-5 w-5 mr-2" />
                Terms of Service
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
              <span className="font-medium">
                {user?.role === 'admin' ? 'Under 2 hours' : 'Under 24 hours'}
              </span>
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
            <h3 className="font-medium text-gray-700 mb-2">
              {user?.role === 'admin' ? 'Support Team Hours' : 'Customer Support'}
            </h3>
            <p className="text-gray-600">Monday - Friday: 9am - 6pm EST</p>
            <p className="text-gray-600">Saturday: 10am - 4pm EST</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Emergency Support</h3>
            <p className="text-gray-600">
              {user?.role === 'admin' 
                ? 'On-call support available 24/7'
                : 'Available 24/7 for urgent issues'}
            </p>
            <p className="text-gray-600">
              {user?.role === 'admin'
                ? 'Response within 30 minutes'
                : 'Response within 2 hours'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;