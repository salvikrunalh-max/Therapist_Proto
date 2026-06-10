import { useState, useEffect, useRef } from 'react';
import {
  Brain, Shield, Heart, Flame, Calendar, Clock, Check, ChevronRight,
  Award, BookOpen, Users, ArrowRight, Menu, X, Sparkles, Leaf,
  Mail, User, MessageSquare, Star, Lock, MapPin, Eye
} from 'lucide-react';

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.unobserve(el); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function Header({ onBookClick }: { onBookClick: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass border-b border-white/[0.06]' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-sage-500/15 flex items-center justify-center group-hover:bg-sage-500/25 transition-colors">
            <Leaf className="w-4 h-4 text-sage-400" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-serif text-[15px] text-cream-50">Michael Paschall</span>
            <span className="text-[9px] uppercase tracking-[0.18em] text-cream-300/50 font-medium mt-0.5">LPC &middot; IFS Certified</span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-7">
          <a href="#about" className="text-[13px] text-cream-200/60 hover:text-cream-50 transition-colors">About</a>
          <a href="#specialties" className="text-[13px] text-cream-200/60 hover:text-cream-50 transition-colors">Specialties</a>
          <a href="#booking" className="text-[13px] text-cream-200/60 hover:text-cream-50 transition-colors">Booking</a>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onBookClick}
            className="hidden sm:inline-flex items-center gap-1.5 bg-sage-500 hover:bg-sage-400 text-base-900 font-semibold text-[13px] px-4 py-1.5 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-sage-500/20"
          >
            Book Consultation
            <ArrowRight className="w-3 h-3" />
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-1.5 text-cream-200/60 hover:text-cream-50 transition-colors">
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden glass border-t border-white/[0.06] animate-slide-down">
          <div className="px-4 py-3 flex flex-col gap-2">
            <a href="#about" onClick={() => setMenuOpen(false)} className="text-[13px] text-cream-200/60 hover:text-cream-50 py-1.5 transition-colors">About</a>
            <a href="#specialties" onClick={() => setMenuOpen(false)} className="text-[13px] text-cream-200/60 hover:text-cream-50 py-1.5 transition-colors">Specialties</a>
            <a href="#booking" onClick={() => setMenuOpen(false)} className="text-[13px] text-cream-200/60 hover:text-cream-50 py-1.5 transition-colors">Booking</a>
            <button
              onClick={() => { onBookClick(); setMenuOpen(false); }}
              className="sm:hidden flex items-center justify-center gap-1.5 bg-sage-500 text-base-900 font-semibold text-[13px] px-4 py-2 rounded-full mt-1"
            >
              Book Consultation <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      <div className="sm:hidden fixed bottom-3 left-3 right-3 z-40">
        <button
          onClick={onBookClick}
          className="w-full flex items-center justify-center gap-2 bg-sage-500 hover:bg-sage-400 text-base-900 font-semibold text-[13px] py-2.5 rounded-full shadow-xl shadow-sage-500/20 transition-all"
        >
          <Calendar className="w-4 h-4" />
          Book Consultation
        </button>
      </div>
    </header>
  );
}

function Hero({ onBookClick }: { onBookClick: () => void }) {
  const { ref, inView } = useInView(0.15);
  return (
    <section ref={ref} className="relative min-h-screen flex items-center pt-14">
      <div className="absolute top-1/3 -left-24 w-72 h-72 bg-sage-500/[0.04] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-48 h-48 bg-gold-400/[0.04] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full py-8 md:py-0">
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
          {/* Profile placeholder */}
          <div className={`relative order-2 md:order-1 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden bg-base-700/60 border border-white/[0.06] relative">
              {/* Abstract geometric background */}
              <div className="absolute inset-0 bg-gradient-to-br from-base-600/80 via-base-700 to-base-800">
                <div className="absolute top-[15%] left-[20%] w-32 h-32 border border-sage-500/10 rounded-2xl rotate-12" />
                <div className="absolute top-[40%] right-[15%] w-24 h-24 border border-gold-400/10 rounded-full" />
                <div className="absolute bottom-[20%] left-[30%] w-16 h-16 border border-white/[0.04] rounded-lg -rotate-6" />
                {/* Profile photo placeholder */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className="w-20 h-20 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                    <User className="w-8 h-8 text-cream-300/20" />
                  </div>
                  <p className="text-[11px] text-cream-300/25 font-medium">Photo Placeholder</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-base-900/70 via-transparent to-transparent" />
              {/* Floating badge */}
              <div className="absolute bottom-3 left-3 glass rounded-lg px-3 py-2 border border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-sage-400" />
                  <div>
                    <p className="text-[11px] font-medium text-cream-50 leading-none">IFS Certified</p>
                    <p className="text-[9px] text-cream-300/50 mt-0.5">CTP &middot; EMDR Trained</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Copy */}
          <div className={`order-1 md:order-2 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.12s' }}>
            <div className="inline-flex items-center gap-1.5 bg-sage-500/10 text-sage-400 text-[11px] font-medium px-3 py-1 rounded-full mb-5 border border-sage-500/15">
              <MapPin className="w-3 h-3" />
              Greensboro, NC &middot; In-Person & Online
            </div>
            <h1 className="font-serif text-[clamp(2rem,5vw,3.5rem)] text-cream-50 leading-[1.08] mb-4 text-balance">
              Deep, Systemic Healing for<br />
              <span className="text-sage-400">Trauma & Anxiety.</span>
            </h1>
            <p className="text-cream-200/50 text-[15px] leading-relaxed mb-6 max-w-md">
              Licensed Professional Counselor specializing in Certified IFS Therapy, Trauma Resolution (CTP), and EMDR. Helping you heal your internal system with proven, compassionate methods.
            </p>
            <div className="flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={onBookClick}
                className="inline-flex items-center justify-center gap-1.5 bg-sage-500 hover:bg-sage-400 text-base-900 font-semibold text-[14px] px-6 py-2.5 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-sage-500/25"
              >
                Book Free Consultation
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <a
                href="#about"
                className="inline-flex items-center justify-center gap-1.5 bg-white/[0.04] hover:bg-white/[0.08] text-cream-100 font-medium text-[14px] px-6 py-2.5 rounded-full transition-all duration-200 border border-white/[0.08]"
              >
                Learn About My Approach
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustBand() {
  const { ref, inView } = useInView();
  const badges = [
    { icon: Award, label: 'LPC (North Carolina)' },
    { icon: Shield, label: 'Certified IFS Therapist' },
    { icon: Heart, label: 'Certified Trauma Professional' },
    { icon: Eye, label: 'EMDR Trained' },
    { icon: BookOpen, label: '15+ Years Practice' },
    { icon: Users, label: '2,000+ Sessions' },
    { icon: Lock, label: 'HIPAA Compliant' },
  ];

  return (
    <section ref={ref} className={`border-y border-white/[0.04] py-4 overflow-hidden ${inView ? 'animate-fade-in' : 'opacity-0'}`}>
      <div className="marquee-mask">
        <div className="flex animate-marquee w-max">
          {[...badges, ...badges].map((b, i) => (
            <div key={i} className="flex items-center gap-2 px-5 shrink-0">
              <b.icon className="w-3.5 h-3.5 text-sage-400/60" />
              <span className="text-[12px] text-cream-300/40 font-medium whitespace-nowrap">{b.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const { ref, inView } = useInView();
  return (
    <section id="about" ref={ref} className="py-10 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className={`max-w-2xl ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <p className="text-sage-400 text-[11px] font-semibold uppercase tracking-[0.18em] mb-3">About Michael</p>
          <h2 className="font-serif text-2xl sm:text-3xl text-cream-50 mb-5">Integrating IFS & EMDR for Deep, Lasting Healing</h2>
          <div className="space-y-3 text-[14px] text-cream-200/45 leading-relaxed">
            <p>
              I'm Michael Paschall, a Licensed Professional Counselor in Greensboro, NC. My practice is built on the integration of two of the most powerful, evidence-based modalities for trauma and anxiety: Internal Family Systems (IFS) and EMDR.
            </p>
            <p>
              As a Certified IFS Therapist and Certified Trauma Professional, I help clients access their core Self — the calm, compassionate center within — to safely understand and heal the protective parts that drive anxiety, perfectionism, and burnout. Combined with EMDR's targeted trauma reprocessing, this approach resolves root causes rather than managing symptoms.
            </p>
            <p>
              Whether in-person at my Greensboro office or online across North Carolina, I create a safe, non-judgmental space where every part of your system is welcome.
            </p>
          </div>
        </div>

        <div className={`grid sm:grid-cols-3 gap-3 mt-8 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.18s' }}>
          {[
            { icon: Heart, title: 'Self Leadership', desc: 'Access your core Self — the calm, compassionate center that can heal and lead every part of your system.' },
            { icon: Brain, title: 'IFS + EMDR', desc: 'Two proven modalities working together: IFS to understand your parts, EMDR to reprocess the traumas they carry.' },
            { icon: Leaf, title: 'Root-Cause Healing', desc: 'Release burdens carried by wounded parts so they no longer drive your reactions, fears, or self-sabotage.' },
          ].map((item) => (
            <div key={item.title} className="card-shine bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] rounded-xl p-5 transition-all duration-300 hover:border-sage-500/15 group">
              <div className="w-8 h-8 rounded-lg bg-sage-500/10 flex items-center justify-center mb-3 group-hover:bg-sage-500/15 transition-colors">
                <item.icon className="w-4 h-4 text-sage-400" />
              </div>
              <h3 className="font-serif text-lg text-cream-50 mb-1.5">{item.title}</h3>
              <p className="text-[13px] text-cream-200/40 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PartsGrid() {
  const { ref, inView } = useInView();
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const parts = [
    {
      icon: Flame,
      title: 'Anxiety',
      subtitle: 'The Worrier Part',
      desc: 'Your anxious part scans for danger to keep you safe — but when it takes over, it creates the very suffering it tries to prevent.',
      ifHelp: 'IFS helps this protector trust that your Self can handle uncertainty. Combined with EMDR, we reprocess the underlying experiences driving the hypervigilance.',
    },
    {
      icon: Shield,
      title: 'Trauma',
      subtitle: 'The Wounded Exile',
      desc: 'Trauma creates parts that carry painful memories and emotions, locked away to protect you from overwhelming pain.',
      ifHelp: 'IFS gently accesses exiled parts with Self-energy while EMDR reprocesses the traumatic memories they hold — resolving root causes, not just symptoms.',
    },
    {
      icon: Star,
      title: 'Perfectionism',
      subtitle: 'The Inner Manager',
      desc: 'The perfectionist drives you relentlessly, believing flawlessness is the only path to love and safety.',
      ifHelp: 'We help this part see that your worth isn\'t tied to achievement — creating space for authentic self-acceptance and sustainable performance.',
    },
    {
      icon: Flame,
      title: 'Chronic Burnout',
      subtitle: 'The Overworked Protector',
      desc: 'Burnout happens when protective parts push you past limits, afraid that slowing down means failure.',
      ifHelp: 'IFS negotiates with these protectors, building internal trust so you can rest without guilt and perform with sustainable energy.',
    },
  ];

  return (
    <section id="specialties" ref={ref} className="py-10 md:py-20 bg-base-800/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className={`max-w-2xl mb-8 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <p className="text-sage-400 text-[11px] font-semibold uppercase tracking-[0.18em] mb-3">What You Carry</p>
          <h2 className="font-serif text-2xl sm:text-3xl text-cream-50 mb-3">Your Struggles Make Sense</h2>
          <p className="text-cream-200/40 text-[14px] leading-relaxed">
            Every struggle has a protective purpose. Tap to discover how IFS + EMDR transforms these patterns.
          </p>
        </div>

        <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-3 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.12s' }}>
          {parts.map((part, i) => {
            const isActive = activeCard === i;
            return (
              <button
                key={part.title}
                onClick={() => setActiveCard(isActive ? null : i)}
                className={`card-shine text-left rounded-xl p-4 border transition-all duration-300 group cursor-pointer ${
                  isActive
                    ? 'bg-sage-500/[0.07] border-sage-500/20 ring-1 ring-sage-500/10'
                    : 'bg-white/[0.02] border-white/[0.06] hover:border-white/[0.1] hover:bg-white/[0.03]'
                }`}
              >
                <div className={`w-7 h-7 rounded-md ${isActive ? 'bg-sage-500/15' : 'bg-white/[0.04]'} flex items-center justify-center mb-2.5 transition-colors`}>
                  <part.icon className={`w-3.5 h-3.5 ${isActive ? 'text-sage-400' : 'text-cream-300/30'} transition-colors`} />
                </div>
                <h3 className="font-serif text-base text-cream-50 mb-0.5">{part.title}</h3>
                <p className={`text-[11px] font-medium mb-1.5 ${isActive ? 'text-sage-400' : 'text-cream-300/30'} transition-colors`}>{part.subtitle}</p>
                <p className="text-[12px] text-cream-200/35 leading-relaxed">{part.desc}</p>

                <div className={`overflow-hidden transition-all duration-300 ${isActive ? 'max-h-32 mt-2.5 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="inline-flex items-center gap-1 text-[10px] font-medium bg-sage-500/10 text-sage-400 px-2 py-0.5 rounded-full border border-sage-500/15 mb-1.5">
                    <Sparkles className="w-2.5 h-2.5" /> IFS + EMDR Approach
                  </div>
                  <p className="text-[12px] text-cream-200/50 leading-relaxed">{part.ifHelp}</p>
                </div>

                {!isActive && (
                  <div className="flex items-center gap-1 text-[10px] text-cream-300/20 group-hover:text-cream-200/40 transition-colors mt-2">
                    <span>Tap to learn more</span>
                    <ChevronRight className="w-2.5 h-2.5" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Testimonial() {
  const { ref, inView } = useInView();
  return (
    <section ref={ref} className="py-10 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className={`max-w-xl mx-auto ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6 relative">
            <div className="absolute -top-2.5 left-6 bg-sage-500/15 text-sage-400 w-5 h-5 rounded-full flex items-center justify-center text-sm font-serif">&ldquo;</div>
            <p className="text-cream-100 text-[15px] leading-relaxed mb-5 font-serif italic">
              IFS and EMDR together were transformative. For the first time, I understood why my anxiety kept returning — and we actually resolved the root. I feel like a different person.
            </p>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-sage-500/15 flex items-center justify-center">
                <User className="w-3.5 h-3.5 text-sage-400" />
              </div>
              <div>
                <p className="text-[13px] font-medium text-cream-100">J.T.</p>
                <p className="text-[11px] text-cream-300/35">Healthcare Professional, 8-month client</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BookingSection() {
  const { ref, inView } = useInView();
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const now = new Date();
  const today = now.getDate();

  const timeSlots = [
    '9:00 AM', '9:45 AM', '10:30 AM', '11:15 AM',
    '1:00 PM', '1:45 PM', '2:30 PM', '3:15 PM', '4:00 PM',
  ];

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < firstDayOfMonth; i++) calendarDays.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

  const isDateAvailable = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    if (date < new Date(now.getFullYear(), now.getMonth(), now.getDate())) return false;
    const dow = date.getDay();
    return dow !== 0 && dow !== 6;
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1); }
    else setCurrentMonth(currentMonth - 1);
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1); }
    else setCurrentMonth(currentMonth + 1);
    setSelectedDate(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="booking" ref={ref} className="py-10 md:py-20 bg-base-800/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className={`max-w-2xl mx-auto text-center mb-8 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <p className="text-sage-400 text-[11px] font-semibold uppercase tracking-[0.18em] mb-3">Begin Your Journey</p>
          <h2 className="font-serif text-2xl sm:text-3xl text-cream-50 mb-3">Book a Free Consultation</h2>
          <p className="text-cream-200/40 text-[14px] leading-relaxed">
            Choose a time that works for you. This 20-minute call helps us understand if IFS + EMDR is the right fit.
          </p>
        </div>

        {submitted ? (
          <div className="max-w-md mx-auto animate-fade-in-up">
            <div className="bg-sage-500/[0.07] border border-sage-500/15 rounded-xl p-6 text-center">
              <div className="w-11 h-11 rounded-full bg-sage-500/15 flex items-center justify-center mx-auto mb-3">
                <Check className="w-5 h-5 text-sage-400" />
              </div>
              <h3 className="font-serif text-xl text-cream-50 mb-1.5">Request Received</h3>
              <p className="text-cream-200/45 text-[13px] leading-relaxed">
                Thank you, {formData.name || 'friend'}! Michael will confirm your consultation within 24 hours. Check your email for details.
              </p>
              <button
                onClick={() => { setSubmitted(false); setSelectedDate(null); setSelectedTime(null); setFormData({ name: '', email: '', message: '' }); }}
                className="mt-4 text-[12px] text-sage-400 hover:text-sage-300 transition-colors underline underline-offset-4"
              >
                Book another time
              </button>
            </div>
          </div>
        ) : (
          <div className={`max-w-4xl mx-auto ${inView ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.12s' }}>
            <div className="grid lg:grid-cols-5 gap-3">
              {/* Calendar */}
              <div className="lg:col-span-3 bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <button onClick={handlePrevMonth} className="p-1 rounded-md hover:bg-white/[0.04] text-cream-200/40 hover:text-cream-50 transition-colors">
                    <ChevronRight className="w-3.5 h-3.5 rotate-180" />
                  </button>
                  <h4 className="text-[13px] font-medium text-cream-100">{monthNames[currentMonth]} {currentYear}</h4>
                  <button onClick={handleNextMonth} className="p-1 rounded-md hover:bg-white/[0.04] text-cream-200/40 hover:text-cream-50 transition-colors">
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-0.5 mb-1">
                  {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
                    <div key={d} className="text-center text-[9px] text-cream-300/25 font-medium py-0.5">{d}</div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-0.5">
                  {calendarDays.map((day, i) => {
                    if (day === null) return <div key={`e-${i}`} />;
                    const available = isDateAvailable(day);
                    const selected = selectedDate === day;
                    const isToday = day === today && currentMonth === now.getMonth() && currentYear === now.getFullYear();
                    return (
                      <button
                        key={day}
                        disabled={!available}
                        onClick={() => available && setSelectedDate(day)}
                        className={`aspect-square rounded-md text-[13px] flex items-center justify-center transition-all duration-200 ${
                          !available
                            ? 'text-cream-300/10 cursor-default'
                            : selected
                              ? 'bg-sage-500 text-base-900 font-semibold shadow-md shadow-sage-500/15'
                              : isToday
                                ? 'text-cream-50 font-semibold hover:bg-white/[0.06] border border-sage-500/25'
                                : 'text-cream-200/50 hover:bg-white/[0.04] hover:text-cream-100'
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>

                {selectedDate && (
                  <div className="mt-4 pt-3 border-t border-white/[0.04] animate-fade-in">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Clock className="w-3 h-3 text-sage-400" />
                      <span className="text-[11px] font-medium text-cream-200/40">Available times for {monthNames[currentMonth]} {selectedDate}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                      {timeSlots.map(t => (
                        <button
                          key={t}
                          onClick={() => setSelectedTime(t)}
                          className={`text-[11px] py-1.5 rounded-md border transition-all duration-200 ${
                            selectedTime === t
                              ? 'bg-sage-500/15 border-sage-500/20 text-sage-400 font-medium'
                              : 'bg-white/[0.01] border-white/[0.04] text-cream-200/40 hover:border-white/[0.08] hover:text-cream-200/60'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Contact form */}
              <div className="lg:col-span-2 bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
                <h4 className="text-[13px] font-medium text-cream-100 mb-3">Your Details</h4>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
                  <div className="relative">
                    <User className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-cream-300/25" />
                    <input
                      type="text"
                      placeholder="Full name"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-white/[0.02] border border-white/[0.06] rounded-lg pl-7 pr-3 py-2 text-[13px] text-cream-100 placeholder:text-cream-300/20 focus:outline-none focus:border-sage-500/25 focus:ring-1 focus:ring-sage-500/15 transition-all"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-cream-300/25" />
                    <input
                      type="email"
                      placeholder="Email address"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-white/[0.02] border border-white/[0.06] rounded-lg pl-7 pr-3 py-2 text-[13px] text-cream-100 placeholder:text-cream-300/20 focus:outline-none focus:border-sage-500/25 focus:ring-1 focus:ring-sage-500/15 transition-all"
                    />
                  </div>
                  <div className="relative">
                    <MessageSquare className="absolute left-2.5 top-2.5 w-3 h-3 text-cream-300/25" />
                    <textarea
                      placeholder="What brings you here? (optional)"
                      rows={2}
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-white/[0.02] border border-white/[0.06] rounded-lg pl-7 pr-3 py-2 text-[13px] text-cream-100 placeholder:text-cream-300/20 focus:outline-none focus:border-sage-500/25 focus:ring-1 focus:ring-sage-500/15 transition-all resize-none"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] text-cream-300/25 mt-0.5">
                    <Calendar className="w-3 h-3" />
                    <span>
                      {selectedDate && selectedTime
                        ? `${monthNames[currentMonth]} ${selectedDate}, ${selectedTime}`
                        : 'Select a date & time above'}
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={!selectedDate || !selectedTime || !formData.name || !formData.email}
                    className="w-full mt-1 bg-sage-500 hover:bg-sage-400 disabled:bg-sage-500/25 disabled:cursor-not-allowed text-base-900 disabled:text-base-900/40 font-semibold text-[13px] py-2.5 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-sage-500/15"
                  >
                    Request Consultation
                  </button>

                  <p className="text-[10px] text-cream-300/20 text-center">
                    Free 20-minute call &middot; No obligation
                  </p>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-6 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Leaf className="w-3.5 h-3.5 text-sage-400/40" />
            <span className="font-serif text-[13px] text-cream-200/30">Michael Paschall, LPC</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-cream-300/20">
            <MapPin className="w-3 h-3" />
            <span>Greensboro, NC &middot; In-Person & Online Across NC</span>
          </div>
          <p className="text-[11px] text-cream-300/20">
            &copy; {new Date().getFullYear()} All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-base-900 text-cream-100">
      <Header onBookClick={scrollToBooking} />
      <main>
        <Hero onBookClick={scrollToBooking} />
        <TrustBand />
        <About />
        <PartsGrid />
        <Testimonial />
        <BookingSection />
      </main>
      <Footer />
    </div>
  );
}
