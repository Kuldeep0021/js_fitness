"use client";

import { useState } from 'react';
import api, { sendGymEmail } from '../lib/api';

export default function BmiCalculator() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', email: '', age: '', height: '', weight: '', gender: 'male'
  });
  const [result, setResult] = useState<null | { bmi: number, calories: number, category: string, color: string }>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const getBmiCategory = (bmi: number) => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-400' };
    if (bmi < 25) return { category: 'Normal Weight', color: 'text-green-400' };
    if (bmi < 30) return { category: 'Overweight', color: 'text-yellow-400' };
    return { category: 'Obese', color: 'text-red-400' };
  };

  const calculateResults = (w: number, h: number, a: number, g: string) => {
    const heightInMeters = h / 100;
    const bmi = w / (heightInMeters * heightInMeters);
    
    let bmr;
    if (g === 'male') {
      bmr = (10 * w) + (6.25 * h) - (5 * a) + 5;
    } else {
      bmr = (10 * w) + (6.25 * h) - (5 * a) - 161;
    }
    const calories = bmr * 1.55;
    const { category, color } = getBmiCategory(bmi);

    return { bmi: parseFloat(bmi.toFixed(1)), calories: Math.round(calories), category, color };
  };

  const handleCalculateStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(formData.weight);
    const h = parseFloat(formData.height);
    const a = parseInt(formData.age);

    const calc = calculateResults(w, h, a, formData.gender);
    setResult(calc);
    setStep(2);
  };

  const handleSubmitLeadStep2 = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/leads', {
        ...formData,
        bmi: result?.bmi,
        calorieEstimate: result?.calories
      });
      // send webhook to n8n for trial trigger
      try {
        await sendGymEmail({ name: formData.name, email: formData.email }, 'trial');
      } catch (webErr) {
        console.error('Webhook send failed', webErr);
      }
      setSubmitted(true);
    } catch (err) {
      console.error('Failed to submit lead', err);
      alert('Failed to submit request. Please ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="bmi" className="py-16 sm:py-20 bg-slate-900 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute -left-20 top-1/2 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="text-center mb-10 sm:mb-12">
          <span className="text-orange-500 text-sm font-bold tracking-widest uppercase">Free Health Check by JS Fitness</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
            Free <span className="gradient-text">BMI Calculator</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto">Find out your Body Mass Index and daily calorie requirement. Get a free trial pass at JS Fitness Sohna!</p>
        </div>

        <div className="glass-panel rounded-2xl p-6 sm:p-8 md:p-12 shadow-2xl border border-slate-700 relative overflow-hidden">
          {/* Progress Bar */}
          {!submitted && (
            <div className="absolute top-0 left-0 w-full h-1 bg-slate-800">
              <div 
                className="h-full bg-gradient-to-r from-orange-500 to-yellow-500 transition-all duration-500" 
                style={{ width: step === 1 ? '50%' : '100%' }}
              />
            </div>
          )}

          {!submitted ? (
            <div className="relative">
              {/* STEP 1: PHYSICAL METRICS */}
              <div className={`transition-all duration-500 ${step === 1 ? 'opacity-100' : 'hidden opacity-0'}`}>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 text-center">Step 1: Your Body Metrics</h3>
                <form onSubmit={handleCalculateStep1} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-slate-300 mb-2 font-medium text-sm">Age</label>
                    <input required type="number" min="1" max="120" className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 sm:p-4 text-white focus:outline-none focus:border-orange-500 transition-colors" placeholder="e.g. 25" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} />
                  </div>
                  
                  <div>
                    <label className="block text-slate-300 mb-2 font-medium text-sm">Gender</label>
                    <select className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 sm:p-4 text-white focus:outline-none focus:border-orange-500 transition-colors" value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})}>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-2 font-medium text-sm">Height (cm)</label>
                    <input required type="number" min="50" max="300" className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 sm:p-4 text-white focus:outline-none focus:border-orange-500 transition-colors" placeholder="e.g. 175" value={formData.height} onChange={e => setFormData({...formData, height: e.target.value})} />
                  </div>
                  
                  <div>
                    <label className="block text-slate-300 mb-2 font-medium text-sm">Weight (kg)</label>
                    <input required type="number" min="20" max="300" className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 sm:p-4 text-white focus:outline-none focus:border-orange-500 transition-colors" placeholder="e.g. 70" value={formData.weight} onChange={e => setFormData({...formData, weight: e.target.value})} />
                  </div>

                  <div className="sm:col-span-2 mt-2 sm:mt-4">
                    <button type="submit" className="w-full py-3 sm:py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-all text-lg shadow-lg shadow-orange-500/20 transform hover:scale-[1.02]">
                      Calculate BMI
                    </button>
                  </div>
                </form>
              </div>

              {/* STEP 2: RESULTS & LEAD CAPTURE */}
              <div className={`transition-all duration-500 ${step === 2 ? 'opacity-100' : 'hidden opacity-0'}`}>
                <div className="text-center mb-6 sm:mb-8">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">Here are your results!</h3>
                  <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-md mx-auto mt-6">
                    <div className="bg-slate-800 p-3 sm:p-4 rounded-xl border border-slate-700">
                      <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">BMI</p>
                      <p className="text-2xl sm:text-3xl font-bold text-orange-500">{result?.bmi}</p>
                    </div>
                    <div className="bg-slate-800 p-3 sm:p-4 rounded-xl border border-slate-700">
                      <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Status</p>
                      <p className={`text-sm sm:text-base font-bold ${result?.color}`}>{result?.category}</p>
                    </div>
                    <div className="bg-slate-800 p-3 sm:p-4 rounded-xl border border-slate-700">
                      <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Calories</p>
                      <p className="text-2xl sm:text-3xl font-bold text-orange-500">{result?.calories}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 p-5 sm:p-6 rounded-xl border border-slate-700 mt-6 sm:mt-8">
                  <h4 className="text-lg sm:text-xl font-bold text-white mb-2 text-center">Claim Your Free Trial Pass</h4>
                  <p className="text-slate-400 text-sm text-center mb-6">Enter your details and we&apos;ll send your customized plan and a free 1-day pass!</p>
                  
                  <form onSubmit={handleSubmitLeadStep2} className="space-y-4 max-w-md mx-auto">
                    <div>
                      <input required type="text" placeholder="Full Name" className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white focus:outline-none focus:border-orange-500 transition-colors" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div>
                      <input required type="email" placeholder="Email Address" className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white focus:outline-none focus:border-orange-500 transition-colors" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                    </div>
                    <div className="flex gap-3 sm:gap-4 pt-2">
                      <button type="button" onClick={() => setStep(1)} className="w-1/3 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition-all">
                        Back
                      </button>
                      <button disabled={loading} type="submit" className="w-2/3 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-all flex justify-center items-center">
                        {loading ? 'Sending...' : 'Get Free Pass'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-6 sm:py-8">
              <div className="inline-flex p-4 rounded-full bg-green-500/20 text-green-400 mb-6">
                <svg className="w-12 h-12 sm:w-16 sm:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">Trial Pass Sent!</h3>
              <p className="text-slate-300 mb-8 max-w-md mx-auto text-base sm:text-lg">We&apos;ve emailed your free Trial Pass and customized BMI report to <b>{formData.email}</b>.</p>
              
              <button onClick={() => { setSubmitted(false); setStep(1); setFormData({...formData, name: '', email: '', weight: '', height: ''}); }} className="mt-4 px-8 py-3 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-lg transition-all font-bold">
                Start Over
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
