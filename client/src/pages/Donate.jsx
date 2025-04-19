// src/pages/Donate.jsx
import React, { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';

const Donate = () => {
  const { t } = useTranslation();
  const [donationAmount, setDonationAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const donationOptions = [
    { value: '500', label: '₹500' },
    { value: '1000', label: '₹1,000' },
    { value: '2500', label: '₹2,500' },
    { value: '5000', label: '₹5,000' },
    { value: 'custom', label: t('donate.customAmount') }
  ];
  
  const handleAmountSelection = (amount) => {
    setDonationAmount(amount);
    if (amount !== 'custom') {
      setCustomAmount('');
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In a real implementation, this would be an API call to process the donation
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
      // Reset form and show success
      setFormSubmitted(true);
      setDonationAmount('');
      setCustomAmount('');
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Error processing donation:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const getFinalAmount = () => {
    if (donationAmount === 'custom') {
      return customAmount ? parseInt(customAmount) : 0;
    }
    return donationAmount ? parseInt(donationAmount) : 0;
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-6">{t('donate.title')}</h1>
      
      <div className="max-w-4xl mx-auto bg-purple-800 rounded-lg shadow-lg p-6 md:p-8">
        {formSubmitted ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-green-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <h2 className="text-2xl font-bold mb-4">{t('donate.thankYou')}</h2>
            <p className="text-lg mb-6">{t('donate.donationReceived')}</p>
            <button 
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg"
              onClick={() => setFormSubmitted(false)}
            >
              {t('donate.makeAnotherDonation')}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t('donate.chooseAmount')}</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {donationOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`py-3 rounded-lg border-2 transition-colors ${
                      donationAmount === option.value
                        ? 'bg-purple-600 border-white'
                        : 'bg-purple-700 border-purple-600 hover:bg-purple-600'
                    }`}
                    onClick={() => handleAmountSelection(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              
              {donationAmount === 'custom' && (
                <div className="mt-4">
                  <label htmlFor="customAmount" className="block mb-2">
                    {t('donate.enterAmount')}
                  </label>
                  <div className="flex items-center">
                    <span className="bg-purple-700 py-3 px-4 rounded-l-lg">₹</span>
                    <input
                      type="number"
                      id="customAmount"
                      className="bg-purple-700 text-white py-3 px-4 rounded-r-lg w-full"
                      placeholder="1000"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      min="100"
                      required={donationAmount === 'custom'}
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t('donate.personalInfo')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block mb-2">
                    {t('donate.fullName')} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="bg-purple-700 text-white py-3 px-4 rounded-lg w-full"
                    placeholder={t('donate.namePlaceholder')}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block mb-2">
                    {t('donate.email')} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="bg-purple-700 text-white py-3 px-4 rounded-lg w-full"
                    placeholder={t('donate.emailPlaceholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block mb-2">
                    {t('donate.phone')}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="bg-purple-700 text-white py-3 px-4 rounded-lg w-full"
                    placeholder={t('donate.phonePlaceholder')}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block mb-2">
                    {t('donate.message')}
                  </label>
                  <textarea
                    id="message"
                    className="bg-purple-700 text-white py-3 px-4 rounded-lg w-full h-24 resize-none"
                    placeholder={t('donate.messagePlaceholder')}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t('donate.paymentMethod')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  type="button"
                  className={`py-3 px-4 rounded-lg border-2 flex items-center justify-center ${
                    paymentMethod === 'upi'
                      ? 'bg-purple-600 border-white'
                      : 'bg-purple-700 border-purple-600 hover:bg-purple-600'
                  }`}
                  onClick={() => setPaymentMethod('upi')}
                >
                  <span>UPI</span>
                </button>
                
                <button
                  type="button"
                  className={`py-3 px-4 rounded-lg border-2 flex items-center justify-center ${
                    paymentMethod === 'card'
                      ? 'bg-purple-600 border-white'
                      : 'bg-purple-700 border-purple-600 hover:bg-purple-600'
                  }`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <span>{t('donate.creditDebitCard')}</span>
                </button>
                
                <button
                  type="button"
                  className={`py-3 px-4 rounded-lg border-2 flex items-center justify-center ${
                    paymentMethod === 'netbanking'
                      ? 'bg-purple-600 border-white'
                      : 'bg-purple-700 border-purple-600 hover:bg-purple-600'
                  }`}
                  onClick={() => setPaymentMethod('netbanking')}
                >
                  <span>{t('donate.netBanking')}</span>
                </button>
              </div>
            </div>
            
            <div className="text-center">
              <p className="mb-6">
                {t('donate.totalAmount')}: 
                <span className="text-2xl font-bold ml-2">₹{getFinalAmount().toLocaleString()}</span>
              </p>
              
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-3 rounded-lg shadow-lg transform transition-transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={!donationAmount || (donationAmount === 'custom' && !customAmount) || !name || !email || isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('donate.processing')}
                  </span>
                ) : (
                  t('donate.donateNow')
                )}
              </button>
              
              <p className="mt-4 text-sm text-gray-300">
                {t('donate.securePayment')}
              </p>
            </div>
          </form>
        )}
      </div>
      
      <div className="max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-bold mb-6">{t('donate.otherWays')}</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-purple-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">{t('donate.bankTransfer')}</h3>
            <p className="mb-2"><strong>{t('donate.accountName')}:</strong> Media Vision Bangalore</p>
            <p className="mb-2"><strong>{t('donate.accountNumber')}:</strong> 1234567890</p>
            <p className="mb-2"><strong>IFSC:</strong> ABCD0001234</p>
            <p className="mb-2"><strong>{t('donate.bank')}:</strong> Example Bank</p>
            <p><strong>{t('donate.branch')}:</strong> MG Road, Bangalore</p>
          </div>
          
          <div className="bg-purple-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">{t('donate.chequeDD')}</h3>
            <p className="mb-4">
              {t('donate.chequeInstructions')}
            </p>
            <address className="not-italic">
              <strong>Media Vision Bangalore</strong><br />
              123 MG Road<br />
              Bangalore, Karnataka 560001<br />
              India
            </address>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;