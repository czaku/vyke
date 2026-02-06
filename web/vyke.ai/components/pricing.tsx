'use client'

import { motion } from 'framer-motion'
import { Check, Sparkles } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    description: 'For hobbyists and bedroom producers',
    price: 'Free',
    period: 'forever',
    features: [
      '10 analyses per month',
      'Basic pattern generation',
      'Community support',
      'Ableton export',
      'Web app access',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    description: 'For serious producers',
    price: '$29',
    period: '/month',
    features: [
      'Unlimited analyses',
      'Advanced AI generation',
      'VST3/AU plugin',
      'Sample library integration',
      'Priority support',
      'Custom templates',
      'Export to all formats',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Studio',
    description: 'For professional studios',
    price: '$99',
    period: '/month',
    features: [
      'Everything in Pro',
      'Team collaboration (5 seats)',
      'API access',
      'Custom model training',
      'Dedicated support',
      'SLA guarantee',
      'White-label options',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
]

export function Pricing() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-sm tracking-[0.2em] text-[#00d4aa] uppercase font-medium">Pricing</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold">
            Simple, transparent
            <br />
            <span className="text-gradient-accent">pricing</span>
          </h2>
          <p className="mt-4 text-white/50 max-w-lg mx-auto">
            Start free, upgrade when you need more power. No hidden fees, cancel anytime.
          </p>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`relative rounded-2xl p-8 ${
                plan.popular 
                  ? 'bg-gradient-to-b from-[#00d4aa]/10 to-transparent border-2 border-[#00d4aa]/50' 
                  : 'card'
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1 px-4 py-1 rounded-full bg-[#00d4aa] text-black text-sm font-medium">
                    <Sparkles size={14} />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="text-sm text-white/50 mt-1">{plan.description}</p>
              </div>

              <div className="mb-8">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-white/50">{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#00d4aa]/20 flex items-center justify-center mt-0.5">
                      <Check size={12} className="text-[#00d4aa]" />
                    </div>
                    <span className="text-white/70 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                className={`w-full py-3 rounded-lg font-medium transition-all ${
                  plan.popular 
                    ? 'btn-primary' 
                    : 'btn-secondary'
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Enterprise note */}
        <motion.p 
          className="text-center mt-12 text-white/40 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          Need something custom?{' '}
          <a href="#" className="text-[#00d4aa] hover:underline">Let's talk</a>
        </motion.p>
      </div>
    </section>
  )
}
