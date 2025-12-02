'use client';

import { motion } from 'framer-motion';
import { RotateCcw, CheckCircle, XCircle, Clock, FileText } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function ReturnsPage() {
  const returnSteps = [
    {
      step: '1',
      title: 'Initiate Return',
      description: 'Log into your account and select the order you want to return',
    },
    {
      step: '2',
      title: 'Print Label',
      description: 'Print the prepaid return shipping label from your account',
    },
    {
      step: '3',
      title: 'Pack & Ship',
      description: 'Pack your item securely and drop it off at any shipping location',
    },
    {
      step: '4',
      title: 'Get Refund',
      description: 'Receive your refund within 5-10 business days after we receive your return',
    },
  ];

  const eligibleItems = [
    'Unopened and unused products',
    'Items in original packaging',
    'Products with tags still attached',
    'Non-personalized items',
    'Items purchased within 30 days',
  ];

  const nonEligibleItems = [
    'Opened software or digital products',
    'Personalized or custom items',
    'Intimate apparel or swimwear',
    'Clearance or final sale items',
    'Gift cards',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <RotateCcw className="w-16 h-16" />
            </div>
            <h1 className="text-5xl font-bold mb-4">Returns & Refunds</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Easy returns within 30 days - We want you to love your purchase
            </p>
          </motion.div>
        </div>
      </section>

      {/* Return Policy Highlights */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-center"
            >
              <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                30-Day Returns
              </h3>
              <p className="text-gray-600">
                Return most items within 30 days of delivery
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-center"
            >
              <RotateCcw className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Free Returns
              </h3>
              <p className="text-gray-600">
                We provide prepaid return shipping labels
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-center"
            >
              <FileText className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Fast Refunds
              </h3>
              <p className="text-gray-600">
                Refunds processed within 5-10 business days
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Return Process */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
              How to Return an Item
            </h2>

            <div className="grid md:grid-cols-4 gap-8">
              {returnSteps.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Eligible vs Non-Eligible */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
              Return Eligibility
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Eligible */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="bg-green-50 rounded-lg shadow-lg p-8"
              >
                <div className="flex items-center mb-6">
                  <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-900">
                    Eligible Items
                  </h3>
                </div>
                <ul className="space-y-3">
                  {eligibleItems.map((item, index) => (
                    <li key={index} className="flex items-start text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Non-Eligible */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-red-50 rounded-lg shadow-lg p-8"
              >
                <div className="flex items-center mb-6">
                  <XCircle className="w-8 h-8 text-red-600 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-900">
                    Non-Eligible Items
                  </h3>
                </div>
                <ul className="space-y-3">
                  {nonEligibleItems.map((item, index) => (
                    <li key={index} className="flex items-start text-gray-700">
                      <XCircle className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
