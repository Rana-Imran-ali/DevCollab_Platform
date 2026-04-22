import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Home = () => {
  // Stagger variants for general lists
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-[#FFD700] selection:text-black font-sans scroll-smooth">
      {/* Dynamic Navbar */}
      <div className="max-w-7xl mx-auto px-6 pt-4 relative z-50">
        <div className="rounded-2xl overflow-hidden border border-[#222222]">
           <Navbar 
              customActions={
                <div className="hidden md:flex items-center gap-6 text-sm font-medium mr-4">
                  <a href="#features" className="text-[#888888] hover:text-[#FFD700] transition-colors">Features</a>
                  <a href="#testimonials" className="text-[#888888] hover:text-[#FFD700] transition-colors">Testimonials</a>
                  <a href="#pricing" className="text-[#888888] hover:text-[#FFD700] transition-colors">Pricing</a>
                </div>
              }
           />
        </div>
      </div>

      <main>
        {/* 1. Hero Section */}
        <section className="relative pt-24 pb-32 overflow-hidden flex flex-col items-center justify-center text-center px-6 min-h-[90vh]">
          {/* Accent Blobs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FFD700] opacity-[0.04] blur-[120px] rounded-full pointer-events-none"></div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-5xl z-10"
          >
            <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2, duration: 0.5 }}
               className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#FFD700] text-xs font-bold uppercase tracking-wider mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-[#FFD700] shadow-[0_0_8px_#FFD700] animate-pulse"></span>
              Introducing DevCollab 2.0
            </motion.div>

            <h1 className="heading-xl mb-6">
              The platform where <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#FFD700] to-[#E6C200]">great developers</span> collaborate.
            </h1>
            
            <p className="text-lg md:text-xl text-[#888888] mb-12 max-w-2xl mx-auto leading-relaxed">
              Ship better code, faster. Unify your team's tracking, code review, and project management into one seamlessly integrated workspace.
            </p>

            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.4, duration: 0.6 }}
               className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/register">
                <Button variant="primary" size="lg" className="w-full sm:w-auto text-lg shadow-[0_0_30px_rgba(255,215,0,0.25)]">
                  Start Collaborating
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg bg-[#0A0A0A]">
                Book a Demo
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* 2. Features Section */}
        <section id="features" className="py-24 bg-[#111111] relative border-y border-[#222222]">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div 
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true, margin: "-100px" }}
               variants={containerVariants}
               className="text-center mb-16 max-w-3xl mx-auto"
            >
              <h2 className="heading-lg mb-4 text-white">Everything your team needs</h2>
              <p className="text-[#888888] text-lg">We've built all the core primitives for modern development workflows so you can focus on building your product.</p>
            </motion.div>

            <motion.div 
               variants={containerVariants}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true, margin: "-100px" }}
               className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                { 
                  title: 'Real-time Sync', 
                  desc: 'Collaborate live with your team. Changes push instantly to all connected clients natively with zero latency.',
                  icon: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                },
                { 
                  title: 'Native Git Integration', 
                  desc: 'Seamlessly link your PRs, branches, and commits directly to individual tasks without context switching.',
                  icon: <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3zm-12 0a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3zm6 6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
                },
                { 
                  title: 'Advanced Analytics', 
                  desc: 'Get deep insights into your team\'s velocity, bottleneck identification, and code churn over time.',
                  icon: <><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></>
                }
              ].map((feature, i) => (
                <motion.div key={i} variants={itemVariants}>
                  <Card hoverable className="h-full bg-[#0A0A0A]">
                    <div className="w-12 h-12 rounded-lg bg-[#FFD700]/10 flex items-center justify-center text-[#FFD700] mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {feature.icon}
                      </svg>
                    </div>
                    <h3 className="heading-md mb-2 text-white">{feature.title}</h3>
                    <p className="text-[#888888] leading-relaxed">{feature.desc}</p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 3. Testimonials Section */}
        <section id="testimonials" className="py-24 relative overflow-hidden">
           <div className="max-w-7xl mx-auto px-6">
            <motion.div 
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true, margin: "-100px" }}
               variants={containerVariants}
               className="text-center mb-16"
            >
              <h2 className="heading-lg mb-4 text-white">Loved by builders worldwide</h2>
            </motion.div>

            <motion.div 
               variants={containerVariants}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {[
                { name: 'Sarah Chen', role: 'CTO at TechFlow', text: "DevCollab completely transformed how our team works. Issue triaging went from hours to minutes." },
                { name: 'Alex Rivera', role: 'Senior Engineer', text: "The cleanest UI I've ever experienced in a project management tool. It's fast, unobtrusive, and powerful." },
                { name: 'Marcus Doe', role: 'Product Manager', text: "Finally, a tool where design meets engineering context. Absolutely essential for modern SaaS development." }
              ].map((t, i) => (
                <motion.div key={i} variants={itemVariants}>
                  <Card className="hover:border-[#FFD700]/30 transition-colors bg-[#111111]">
                     <div className="flex text-[#FFD700] mb-4">
                        {[...Array(5)].map((_, idx) => (
                          <svg key={idx} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                        ))}
                     </div>
                     <p className="text-white text-lg font-medium mb-6 leading-normal">"{t.text}"</p>
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#1A1A1A] border-2 border-[#3A3A3A] flex items-center justify-center font-bold text-white uppercase text-xs">
                          {t.name.substring(0, 2)}
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm">{t.name}</p>
                          <p className="text-[#888888] text-xs">{t.role}</p>
                        </div>
                     </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
           </div>
        </section>

        {/* 4. Pricing Section */}
        <section id="pricing" className="py-24 bg-[#111111] border-t border-[#222222]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="heading-lg mb-4 text-white">Simple, transparent pricing</h2>
              <p className="text-[#888888] text-lg">Start for free, upgrade when you need more power.</p>
            </div>

            <motion.div 
               variants={containerVariants}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center"
            >
              {[
                { tier: 'Free', price: '$0', desc: 'Perfect for indie hackers and small experiments.', features: ['Up to 3 users', 'Unlimited public projects', 'Basic analytics', 'Community support'], btn: 'Get Started Free' },
                { tier: 'Pro', price: '$12', desc: 'For professional developers and growing teams.', custom: true, features: ['Up to 10 users', 'Unlimited private projects', 'Advanced CI/CD integrations', 'Priority email support'], btn: 'Start Free Trial' },
                { tier: 'Team', price: '$49', desc: 'For larger organizations with complex workflows.', features: ['Unlimited users', 'Custom role permissions', 'SSO authentication', '24/7 dedicated support'], btn: 'Contact Sales' }
              ].map((plan, i) => (
                <motion.div key={i} variants={itemVariants} className={plan.custom ? "relative z-10" : ""}>
                   <div className={`p-8 rounded-2xl border ${plan.custom ? 'bg-[#1A1A1A] border-[#FFD700] ring-1 ring-[#FFD700] shadow-[0_0_30px_rgba(255,215,0,0.15)] transform md:-translate-y-4 md:scale-105' : 'bg-[#0A0A0A] border-[#222222]'}`}>
                      {plan.custom && (
                         <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-[#FFD700] text-black text-xs font-bold rounded-full uppercase tracking-wider">Most Popular</div>
                      )}
                      <h3 className="text-xl font-display font-medium text-white mb-2">{plan.tier}</h3>
                      <div className="mb-4">
                        <span className="text-4xl font-bold text-white">{plan.price}</span>
                        <span className="text-[#888888]">/mo</span>
                      </div>
                      <p className="text-[#888888] text-sm mb-6 pb-6 border-b border-[#222222]">{plan.desc}</p>
                      
                      <ul className="space-y-4 mb-8">
                        {plan.features.map((f, i) => (
                          <li key={i} className="flex items-center gap-3 text-sm text-[#CCCCCC]">
                             <svg className="w-5 h-5 text-[#FFD700] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                             {f}
                          </li>
                        ))}
                      </ul>
                      
                      <Button variant={plan.custom ? 'primary' : 'outline'} className="w-full">
                        {plan.btn}
                      </Button>
                   </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>

      {/* 5. Footer */}
      <footer className="bg-[#0A0A0A] border-t border-[#222222] pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[#FFD700] flex items-center justify-center text-black font-extrabold">D</div>
                <span className="font-display font-bold text-xl text-white">Dev<span className="text-[#FFD700]">Collab</span></span>
              </div>
              <p className="text-[#888888] text-sm max-w-xs mb-6">
                Designing the future of developer collaboration. Beautiful, fast, and unified.
              </p>
              <div className="flex gap-4">
                 {/* Social Icons Placeholder */}
                 <div className="w-8 h-8 rounded-full bg-[#111111] border border-[#222222] flex items-center justify-center text-[#888888] hover:text-[#FFD700] cursor-pointer transition-colors"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg></div>
                 <div className="w-8 h-8 rounded-full bg-[#111111] border border-[#222222] flex items-center justify-center text-[#888888] hover:text-[#FFD700] cursor-pointer transition-colors"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576.474-1.268.802-2.612.802-4 0-6.627-5.373-12-12-12z"/></svg></div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-[#888888]">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-[#888888]">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-[#888888]">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-[#222222] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-[#555555]">© 2026 DevCollab Inc. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-xs text-[#555555]">Systems Operational</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
