'use client'

import { motion } from 'framer-motion'

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#0a1628] pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Terms of Service
          </h1>
          
          <div className="prose prose-invert prose-amber max-w-none">
            <p className="text-white/70 text-lg mb-8">
              Last updated: December 24, 2025
            </p>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Agreement to Terms
              </h2>
              <p className="text-white/70">
                By accessing or using the Driftwoods website and services, you agree to be bound 
                by these Terms of Service. If you do not agree to these terms, please do not use 
                our website or services.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Use of Our Services
              </h2>
              <p className="text-white/70 mb-4">
                You agree to use our website and services only for lawful purposes and in accordance 
                with these Terms. You agree not to:
              </p>
              <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                <li>Use our services in any way that violates applicable laws or regulations</li>
                <li>Attempt to gain unauthorized access to any part of our website or systems</li>
                <li>Interfere with or disrupt the operation of our website</li>
                <li>Use automated systems or software to extract data from our website</li>
                <li>Impersonate any person or entity</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Online Ordering
              </h2>
              <p className="text-white/70 mb-4">
                When placing an order through our online ordering system (powered by Toast):
              </p>
              <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                <li>You agree to provide accurate and complete information</li>
                <li>You are responsible for all orders placed through your account</li>
                <li>Prices are subject to change without notice</li>
                <li>We reserve the right to refuse or cancel any order</li>
                <li>Menu items and availability may vary</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Payment Terms
              </h2>
              <p className="text-white/70">
                Payment is required at the time of ordering for online orders. We accept major 
                credit cards and other payment methods as indicated during checkout. All payments 
                are processed securely through our third-party payment processor.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Intellectual Property
              </h2>
              <p className="text-white/70">
                All content on this website, including text, graphics, logos, images, and software, 
                is the property of Driftwoods or its content suppliers and is protected by copyright 
                and other intellectual property laws. You may not reproduce, distribute, modify, or 
                create derivative works without our express written consent.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Disclaimer of Warranties
              </h2>
              <p className="text-white/70">
                Our website and services are provided "as is" without any warranties, express or 
                implied. We do not warrant that our website will be uninterrupted, error-free, or 
                free of viruses or other harmful components.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Limitation of Liability
              </h2>
              <p className="text-white/70">
                To the fullest extent permitted by law, Driftwoods shall not be liable for any 
                indirect, incidental, special, consequential, or punitive damages arising out of 
                or related to your use of our website or services.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Allergies and Dietary Restrictions
              </h2>
              <p className="text-white/70">
                While we strive to accommodate dietary restrictions and allergies, we cannot 
                guarantee that any menu item is completely free of allergens. Please inform our 
                staff of any allergies or dietary restrictions when ordering. Consuming raw or 
                undercooked meats, poultry, seafood, shellfish, or eggs may increase your risk 
                of foodborne illness.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Age Restrictions
              </h2>
              <p className="text-white/70">
                You must be 21 years of age or older to purchase alcoholic beverages. By ordering 
                alcohol, you represent that you are of legal drinking age and will provide valid 
                identification upon request.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Changes to Terms
              </h2>
              <p className="text-white/70">
                We reserve the right to modify these Terms of Service at any time. Changes will 
                be effective immediately upon posting to our website. Your continued use of our 
                services after changes are posted constitutes your acceptance of the modified terms.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Governing Law
              </h2>
              <p className="text-white/70">
                These Terms shall be governed by and construed in accordance with the laws of the 
                State of Arizona, without regard to its conflict of law provisions.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Contact Us
              </h2>
              <p className="text-white/70">
                If you have any questions about these Terms of Service, please contact us at:
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
