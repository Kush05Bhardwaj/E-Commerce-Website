'use client';

import { motion } from 'framer-motion';
import { Truck, Package, MapPin, Clock, DollarSign, Globe } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function ShippingInfoPage() {
  const shippingOptions = [
    {
      icon: <Truck className="w-8 h-8" />,
      title: 'Standard Shipping',
      time: '5-7 Business Days',
      cost: '$4.99',
      description: 'Reliable delivery for most orders',
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: 'Express Shipping',
      time: '2-3 Business Days',
      cost: '$14.99',
      description: 'Faster delivery when you need it',
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Next Day Delivery',
      time: '1 Business Day',
      cost: '$24.99',
      description: 'Order by 2 PM for next day arrival',
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'International',
      time: '7-14 Business Days',
      cost: 'Varies',
      description: 'Ships worldwide with tracking',
    },
  ];

  const faqs = [
    {
      question: 'When will my order ship?',
      answer:
        'Orders typically ship within 1-2 business days. You\'ll receive a tracking number via email once your order ships. Orders placed on weekends will ship on the next business day.',
    },
    {
      question: 'Do you offer free shipping?',
      answer:
        'Yes! We offer free standard shipping on all orders over $50 within the continental United States. International orders over $100 also qualify for free standard shipping.',
    },
    {
      question: 'Can I track my order?',
      answer:
        'Absolutely! Once your order ships, you\'ll receive a tracking number via email. You can also track your order by logging into your account and viewing your order history.',
    },
    {
      question: 'Do you ship internationally?',
      answer:
        'Yes, we ship to over 50 countries worldwide. International shipping rates vary by destination and are calculated at checkout. Please note that international orders may be subject to customs fees.',
    },
    {
      question: 'What if my package is lost or damaged?',
      answer:
        'If your package is lost or damaged during shipping, please contact our customer service team immediately. We\'ll work with the carrier to resolve the issue and send a replacement or refund as needed.',
    },
    {
      question: 'Can I change my shipping address?',
      answer:
        'If your order hasn\'t shipped yet, we can update your shipping address. Please contact us as soon as possible. Once an order has shipped, we cannot change the address, but you may be able to redirect it with the carrier.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <Truck className="w-16 h-16" />
            </div>
            <h1 className="text-5xl font-bold mb-4">Shipping Information</h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Fast, reliable delivery to your doorstep
            </p>
          </motion.div>
        </div>
      </section>

      {/* Shipping Options */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Shipping Options
            </h2>
            <p className="text-xl text-gray-600">
              Choose the delivery speed that works for you
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {shippingOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="text-green-600 mb-4">{option.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {option.title}
                </h3>
                <p className="text-2xl font-bold text-green-600 mb-2">
                  {option.cost}
                </p>
                <p className="text-gray-600 mb-2">{option.time}</p>
                <p className="text-sm text-gray-500">{option.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Free Shipping Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-12 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg shadow-lg p-8 text-center"
          >
            <DollarSign className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-3xl font-bold mb-2">Free Shipping Available!</h3>
            <p className="text-xl text-green-100">
              Orders over $50 get free standard shipping
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
              Shipping FAQs
            </h2>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  className="bg-white rounded-lg shadow-lg p-6"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
