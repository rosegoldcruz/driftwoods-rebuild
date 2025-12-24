'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Briefcase, Clock, MapPin, DollarSign, Heart, Users, Coffee, Smile } from 'lucide-react'

const openPositions = [
  {
    title: 'Line Cook',
    type: 'Full-time / Part-time',
    description: 'Join our kitchen team and help create delicious dishes that keep our guests coming back.',
    requirements: [
      '1+ year experience in a fast-paced kitchen',
      'Knowledge of food safety and sanitation',
      'Ability to work flexible hours including weekends',
      'Team player with positive attitude',
    ],
  },
  {
    title: 'Server',
    type: 'Full-time / Part-time',
    description: 'Be the face of Driftwoods and deliver exceptional dining experiences to our guests.',
    requirements: [
      'Previous serving experience preferred',
      'Excellent communication and interpersonal skills',
      'Ability to multitask in a busy environment',
      'Must be 21+ for alcohol service',
    ],
  },
  {
    title: 'Bartender',
    type: 'Full-time / Part-time',
    description: 'Craft cocktails and pour pints while providing outstanding service at our bar.',
    requirements: [
      '2+ years bartending experience',
      'Knowledge of craft beer and cocktail preparation',
      'Arizona Title 4 certification',
      'Must be 21+',
    ],
  },
  {
    title: 'Host/Hostess',
    type: 'Part-time',
    description: 'Create welcoming first impressions and ensure smooth seating flow.',
    requirements: [
      'Friendly and professional demeanor',
      'Basic computer skills for reservation system',
      'Ability to stand for extended periods',
      'Weekend availability required',
    ],
  },
]

const benefits = [
  { icon: DollarSign, title: 'Competitive Pay', description: 'Above industry-standard wages plus tips' },
  { icon: Coffee, title: 'Shift Meals', description: 'Free meals during your shifts' },
  { icon: Clock, title: 'Flexible Hours', description: 'Work schedules that fit your life' },
  { icon: Heart, title: 'Health Benefits', description: 'Medical coverage for full-time employees' },
  { icon: Users, title: 'Great Team', description: 'Work with awesome, supportive people' },
  { icon: Smile, title: 'Growth Opportunities', description: 'Advance your hospitality career' },
]

export default function CareersPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 bg-dark">
        <div className="container relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
              Join Our <span className="text-primary">Team</span>
            </h1>
            <p className="text-xl text-gray-300">
              We're always looking for passionate people to join the Driftwoods family.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Work Here */}
      <section className="py-20 bg-cream">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
              Why Work at Driftwoods?
            </h2>
            <p className="text-dark/70 max-w-2xl mx-auto">
              We're more than a workplace — we're a community. Join a team that values hard work, 
              creativity, and having fun while delivering great experiences.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="bg-white p-6 rounded-xl shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="p-3 bg-primary/10 rounded-xl w-fit mb-4">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-dark mb-2">{benefit.title}</h3>
                <p className="text-dark/70 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-dark-lighter">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-cream mb-4">
              Open Positions
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Check out our current openings below. Don't see what you're looking for? 
              We're always accepting applications.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {openPositions.map((position, index) => (
              <motion.div
                key={position.title}
                className="bg-dark p-6 rounded-xl border border-gray-800 hover:border-primary/30 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-cream">{position.title}</h3>
                    <span className="text-primary text-sm">{position.type}</span>
                  </div>
                  <Briefcase className="w-6 h-6 text-primary" />
                </div>
                <p className="text-gray-400 text-sm mb-4">{position.description}</p>
                <ul className="space-y-2 mb-6">
                  {position.requirements.map((req, i) => (
                    <li key={i} className="text-gray-400 text-sm flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      {req}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/careers/apply?position=${encodeURIComponent(position.title)}`}
                  className="btn-primary inline-block text-sm px-6 py-2"
                >
                  Apply Now
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* General Application CTA */}
      <section className="py-20 bg-primary">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Don't See Your Position?
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              We're always on the lookout for talented individuals. Submit a general application 
              and we'll keep you in mind for future opportunities.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/careers/apply"
                className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-cream transition-colors"
              >
                Submit General Application
              </Link>
              <Link
                href="/contact"
                className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Location Note */}
      <section className="py-12 bg-dark">
        <div className="container">
          <div className="flex items-center justify-center gap-2 text-gray-400">
            <MapPin className="w-5 h-5 text-primary" />
            <span>All positions are located at our Sunnyslope location: 9832 N. 7th St., Phoenix, AZ 85020</span>
          </div>
        </div>
      </section>
    </>
  )
}
