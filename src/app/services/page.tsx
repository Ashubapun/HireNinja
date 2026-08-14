import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppIcon from '@/components/ui/AppIcon';
import Link from 'next/link';

export default function ServicesPage() {
    const services = [
        {
            title: 'AI-Powered Sourcing',
            description: 'Leverage our advanced machine learning algorithms to instantly identify and rank candidates based on precise skill set and cultural fit benchmarks.',
            icon: 'CpuChipIcon',
        },
        {
            title: 'Executive Search',
            description: 'Discreet, highly-targeted recruitment for C-suite and VP-level leadership that aligns with your long-term strategic vision.',
            icon: 'BriefcaseIcon',
        },
        {
            title: 'Dedicated Team Pods',
            description: 'Deploy full, cross-functional squads (engineering, design, product) built from the ground up to tackle your specific roadmap.',
            icon: 'UserGroupIcon',
        },
        {
            title: 'Salary Benchmarking',
            description: 'Real-time compensation analytics ensuring your offers are competitive enough to win top-tier talent in your regional market.',
            icon: 'ChartBarSquareIcon',
        }
    ];

    return (
        <div className="grain-overlay min-h-screen bg-canvas flex flex-col">
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative bg-navy pt-32 pb-20 overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.04]"
                        style={{ backgroundImage: 'linear-gradient(to right, #F4F6F8 1px, transparent 1px), linear-gradient(to bottom, #F4F6F8 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
                    <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 text-center">
                        <h1 className="text-display font-black text-white mb-6">
                            Our <span className="text-amber">Services</span>
                        </h1>
                        <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
                            From elite executive searches to automated, high-volume AI candidate screening, we provide the specialized deployment vehicles you need to scale fast.
                        </p>
                    </div>
                </section>

                {/* Services Grid */}
                <section className="py-24 max-w-7xl mx-auto px-6 lg:px-10">
                    <div className="grid md:grid-cols-2 gap-8">
                        {services.map((service, idx) => (
                            <div key={idx} className="p-8 rounded-3xl bg-white border border-navy/10 shadow-card card-lift group cursor-default h-full flex flex-col">
                                <div className="w-14 h-14 rounded-2xl bg-navy/5 flex items-center justify-center mb-6 group-hover:bg-amber/15 transition-colors">
                                    <AppIcon name={service.icon} size={28} className="text-navy group-hover:text-amber transition-colors" />
                                </div>
                                <h3 className="text-2xl font-black text-navy mb-4">{service.title}</h3>
                                <p className="text-gray leading-relaxed flex-1">{service.description}</p>
                                <div className="mt-8 pt-6 border-t border-navy/10">
                                    <Link href="/clients" className="text-sm font-bold text-amber hover:text-amber-dark flex items-center gap-2 transition-colors">
                                        Learn more <AppIcon name="ArrowRightIcon" size={16} />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="bg-navy py-20 border-t border-white/10 text-center">
                    <div className="max-w-4xl mx-auto px-6">
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-6">Ready to transform your hiring?</h2>
                        <p className="text-white/60 mb-8 max-w-xl mx-auto">Skip the noise and get straight to the signal. Let us show you how our AI matching changes everything.</p>
                        <Link href="/contact" className="inline-block px-8 py-4 bg-amber text-navy font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-amber-light transition-all card-lift">
                            Talk to Sales
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
