import Link from 'next/link'
import { MapPin, Phone, Clock, Instagram, Facebook, Mail } from 'lucide-react'

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/menu', label: 'Menu' },
  { href: '/careers', label: 'Careers' },
  { href: '/contact', label: 'Contact' },
]

const hours = [
  { day: 'Monday - Thursday', time: '11:00 AM - 10:00 PM' },
  { day: 'Friday', time: '11:00 AM - 11:00 PM' },
  { day: 'Saturday', time: '8:00 AM - 11:00 PM' },
  { day: 'Sunday', time: '8:00 AM - 10:00 PM' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark-lighter pt-16 pb-8" role="contentinfo">
      <div className="container">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div>
            <h2 className="text-3xl font-bold text-primary mb-4">Driftwoods</h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your neighborhood bar & grill in the heart of Sunnyslope. 
              Where friends and family gather for great food and lasting memories.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-dark rounded-full text-gray-400 hover:text-primary hover:bg-dark-lighter transition-all"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-dark rounded-full text-gray-400 hover:text-primary hover:bg-dark-lighter transition-all"
                aria-label="Follow us on Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="mailto:info@driftwoodsaz.com"
                className="p-2 bg-dark rounded-full text-gray-400 hover:text-primary hover:bg-dark-lighter transition-all"
                aria-label="Email us"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-cream mb-6">Quick Links</h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/order"
                    className="text-primary hover:text-primary-light transition-colors font-medium"
                  >
                    Order Online →
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-xl font-semibold text-cream mb-6 flex items-center gap-2">
              <Clock size={20} className="text-primary" />
              Hours
            </h3>
            <ul className="space-y-3">
              {hours.map((item) => (
                <li key={item.day} className="text-gray-400">
                  <span className="block text-cream">{item.day}</span>
                  <span>{item.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold text-cream mb-6">Contact</h3>
            <address className="not-italic space-y-4">
              <a
                href="https://www.google.com/maps/place/9832+N+7th+St,+Phoenix,+AZ+85020"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-gray-400 hover:text-primary transition-colors"
              >
                <MapPin size={20} className="text-primary flex-shrink-0 mt-1" />
                <span>9832 N. 7th St.<br />Phoenix, AZ 85020</span>
              </a>
              <a
                href="tel:+14803933261"
                className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors"
              >
                <Phone size={20} className="text-primary flex-shrink-0" />
                <span>(480) 393-3261</span>
              </a>
            </address>
          </div>
        </div>

        {/* Back to Top */}
        <div className="flex justify-center mb-8">
          <a
            href="#"
            className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors"
            aria-label="Back to top"
          >
            <svg
              className="w-5 h-5 rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
            Back to top
          </a>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} Driftwoods. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/privacy" className="hover:text-cream transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-cream transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>

        {/* Powered By */}
        <div className="mt-6 pt-6 border-t border-gray-800 text-center">
          <p className="text-gray-600 text-xs">
            Powered by{' '}
            <a 
              href="https://aeoninvest.tech" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-primary transition-colors font-medium"
            >
              AEON
            </a>
            <span className="text-gray-700 ml-1">— Advanced Efficient Optimized Network</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
