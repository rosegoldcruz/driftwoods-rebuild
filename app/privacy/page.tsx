'use client'

import { motion } from 'framer-motion'

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0a1628] pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Privacy Policy
          </h1>
          
          <div className="prose prose-invert prose-amber max-w-none">
            <p className="text-white/70 text-lg mb-8">
              Last updated: December 24, 2025
            </p>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Information We Collect
              </h2>
              <p className="text-white/70 mb-4">
                At Driftwoods, we collect information you provide directly to us, such as when you:
              </p>
              <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                <li>Place an order through our online ordering system</li>
                <li>Make a reservation</li>
                <li>Sign up for our newsletter or promotional emails</li>
                <li>Contact us with inquiries or feedback</li>
                <li>Apply for employment through our careers page</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Types of Information
              </h2>
              <p className="text-white/70 mb-4">
                The information we collect may include:
              </p>
              <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                <li>Name and contact information (email address, phone number)</li>
                <li>Delivery or pickup address</li>
                <li>Payment information (processed securely through third-party providers)</li>
                <li>Order history and preferences</li>
                <li>Device and browser information for website optimization</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                How We Use Your Information
              </h2>
              <p className="text-white/70 mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                <li>Process and fulfill your orders</li>
                <li>Send order confirmations and updates</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Send promotional communications (with your consent)</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Information Sharing
              </h2>
              <p className="text-white/70">
                We do not sell, trade, or rent your personal information to third parties. 
                We may share your information with service providers who assist us in operating 
                our website, conducting our business, or servicing you (such as payment processors 
                and delivery services), so long as those parties agree to keep this information confidential.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Cookies and Tracking
              </h2>
              <p className="text-white/70">
                Our website may use cookies and similar tracking technologies to enhance your 
                experience, analyze site traffic, and understand where our visitors are coming from. 
                You can set your browser to refuse all or some browser cookies, or to alert you 
                when cookies are being sent.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Data Security
              </h2>
              <p className="text-white/70">
                We implement appropriate security measures to protect your personal information. 
                However, no method of transmission over the Internet or electronic storage is 
                100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Your Rights
              </h2>
              <p className="text-white/70 mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Contact Us
              </h2>
              <p className="text-white/70">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="mt-4 text-white/70">
                <p>Driftwoods</p>
                <p>9832 N. 7th St.</p>
                <p>Phoenix, AZ 85020</p>
                <p>Email: info@driftwoodsaz.com</p>
                <p>Phone: (480) 393-3261</p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
