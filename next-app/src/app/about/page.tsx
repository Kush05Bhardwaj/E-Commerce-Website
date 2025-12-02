'use client';

import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import {
  Target,
  Users,
  Award,
  Heart,
  TrendingUp,
  Shield,
  Zap,
  Globe,
} from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { icon: Users, value: '240K+', label: 'Happy Customers' },
    { icon: TrendingUp, value: '50+', label: 'Countries Served' },
    { icon: Award, value: '12K+', label: 'Products' },
    { icon: Heart, value: '4.9/5', label: 'Customer Rating' },
  ];

  const values = [
    {
      icon: Target,
      title: 'Quality First',
      description: 'We curate only the best products from trusted brands and manufacturers.',
      color: 'from-brand-500 to-brand-600',
    },
    {
      icon: Shield,
      title: 'Secure Shopping',
      description: 'Your data and transactions are protected with industry-leading security.',
      color: 'from-success-500 to-success-600',
    },
    {
      icon: Zap,
      title: 'Fast Delivery',
      description: 'Lightning-fast shipping to get your products to you as quickly as possible.',
      color: 'from-warning-500 to-warning-600',
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Serving customers worldwide with localized support and shipping.',
      color: 'from-premium-500 to-premium-600',
    },
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Product',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    },
    {
      name: 'David Kim',
      role: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-12">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h1 className="mb-6 text-5xl font-extrabold text-slate-900 lg:text-6xl">
            About{' '}
            <span className="bg-gradient-to-r from-brand-600 to-accent-600 bg-clip-text text-transparent">
              MERN Commerce
            </span>
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-slate-600">
            Your one-stop shop for premium products. We're revolutionizing online shopping with
            cutting-edge technology and unparalleled customer service.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="rounded-2xl bg-white p-8 text-center shadow-soft"
            >
              <stat.icon className="mx-auto mb-4 text-brand-600" size={40} />
              <div className="mb-2 text-4xl font-extrabold text-slate-900">{stat.value}</div>
              <div className="text-slate-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16 rounded-2xl bg-white p-12 shadow-soft"
        >
          <h2 className="mb-6 text-3xl font-extrabold text-slate-900">Our Story</h2>
          <div className="space-y-4 text-lg text-slate-600">
            <p>
              Founded in 2020, MERN Commerce started with a simple mission: to make premium products
              accessible to everyone, everywhere. What began as a small online store has grown into
              a global e-commerce platform serving hundreds of thousands of customers worldwide.
            </p>
            <p>
              We leverage the power of modern web technologies—MongoDB, Express, React, and Node.js—to
              deliver a seamless, lightning-fast shopping experience. Our platform is built with
              Next.js 15, ensuring optimal performance and user experience.
            </p>
            <p>
              Today, we partner with over 500 brands and offer more than 12,000 products across
              multiple categories. But we're just getting started. Our vision is to become the
              world's most customer-centric e-commerce platform.
            </p>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="mb-8 text-center text-3xl font-extrabold text-slate-900">
            Our Values
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="group cursor-pointer rounded-2xl bg-white p-8 shadow-soft transition-all hover:scale-105 hover:shadow-glow"
              >
                <div className={`mb-4 inline-block rounded-xl bg-gradient-to-r ${value.color} p-3`}>
                  <value.icon className="text-white" size={28} />
                </div>
                <h3 className="mb-3 text-xl font-bold text-slate-900">{value.title}</h3>
                <p className="text-slate-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="mb-8 text-center text-3xl font-extrabold text-slate-900">
            Meet Our Team
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="mb-4 overflow-hidden rounded-2xl">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-64 w-full object-cover transition-transform group-hover:scale-110"
                  />
                </div>
                <h3 className="mb-1 text-xl font-bold text-slate-900">{member.name}</h3>
                <p className="text-slate-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
