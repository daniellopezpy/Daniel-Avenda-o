/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Calendar, 
  Megaphone, 
  User, 
  Clock, 
  Ticket,
  ChevronRight,
  Zap
} from 'lucide-react';

// --- Types ---
interface Speaker {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
}

interface Update {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

// --- Data ---
const SPEAKERS: Speaker[] = [
  {
    id: '1',
    name: 'ATMOSFEAR',
    role: 'DJ SET',
    imageUrl: 'https://picsum.photos/seed/dj/400/400'
  },
  {
    id: '2',
    name: 'PASTOR MARCOS G.',
    role: 'FEATURED SPEAKER',
    imageUrl: 'https://picsum.photos/seed/pastor/400/400'
  },
  {
    id: '3',
    name: 'JÓVENES EN FUEGO',
    role: 'WORSHIP BAND',
    imageUrl: 'https://picsum.photos/seed/band/400/400'
  },
  {
    id: '4',
    name: 'ELENA RODRIGUEZ',
    role: 'KEYNOTE SPEAKER',
    imageUrl: 'https://picsum.photos/seed/speaker/400/400'
  }
];

const UPDATES: Update[] = [
  {
    id: '1',
    title: 'NUEVO HORARIO: TALLERES CONFIRMADOS',
    description: 'Inscríbete ahora en la app.',
    icon: <Clock className="w-5 h-5 text-neon-lime" />
  },
  {
    id: '2',
    title: 'PRE-VENTA AGOTADA: ÚLTIMAS ENTRADAS',
    description: 'No te quedes fuera.',
    icon: <Ticket className="w-5 h-5 text-neon-pink" />
  },
  {
    id: '3',
    title: 'NUEVA ACTUALIZACIÓN DE HORARIO',
    description: 'Revisa tu agenda actualizada.',
    icon: <Calendar className="w-5 h-5 text-neon-purple" />
  }
];

// --- Components ---

const Background = () => (
  <div className="fixed inset-0 -z-10 bg-[#0A0A0A] overflow-hidden">
    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-neon-lime/20 blur-[120px] rounded-full animate-pulse" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-neon-pink/10 blur-[150px] rounded-full" />
    <div className="absolute top-[30%] right-[10%] w-[40%] h-[40%] bg-neon-purple/5 blur-[100px] rounded-full" />
    
    {/* Dynamic floating shapes */}
    <motion.div 
      animate={{ 
        rotate: 360,
        scale: [1, 1.2, 1],
      }}
      transition={{ 
        duration: 20, 
        repeat: Infinity, 
        ease: "linear" 
      }}
      className="absolute top-20 right-20 w-32 h-32 border-2 border-neon-lime/20 rounded-full blur-[2px]"
    />
    <motion.div 
      animate={{ 
        y: [0, -50, 0],
        x: [0, 30, 0],
      }}
      transition={{ 
        duration: 15, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
      className="absolute bottom-40 left-10 w-24 h-24 border border-neon-pink/20 rounded-xl blur-[1px] rotate-12"
    />
  </div>
);

const CountdownCard = () => {
  const [timeLeft, setTimeLeft] = useState('00:00:00:00');

  useEffect(() => {
    const timer = setInterval(() => {
      // Mock countdown logic
      const now = new Date();
      const eventDate = new Date('2025-10-31T00:00:00');
      const diff = eventDate.getTime() - now.getTime();
      
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / 1000 / 60) % 60);
      const s = Math.floor((diff / 1000) % 60);
      
      setTimeLeft(`${d.toString().padStart(2, '0')}:${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto mt-8 px-4"
    >
      <div className="glass px-6 py-8 rounded-3xl text-center relative overflow-hidden group">
        {/* Glow corner */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-neon-lime/20 blur-2xl rounded-full" />
        
        <div className="flex justify-center items-center gap-2 mb-2">
          <Zap className="w-5 h-5 text-neon-lime fill-neon-lime" />
          <h1 className="text-4xl font-black font-display tracking-tighter italic text-neon-lime italic">
            LUMINATION <span className="text-white relative">25 <span className="absolute -top-1 -right-4 text-[10px] font-bold border rounded-full px-1">20</span></span>
          </h1>
        </div>
        
        <div className="flex justify-between items-center mt-6 text-white/90">
          {timeLeft.split(':').map((unit, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-bold font-display tracking-wider">{unit}</span>
              <span className="text-[10px] uppercase tracking-widest mt-1 opacity-60 font-medium">
                {['DÍAS', 'HORAS', 'MIN', 'SEG'][i]}
              </span>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-6 border-t border-white/10 flex justify-center items-center gap-2">
          <span className="text-xs uppercase tracking-[0.3em] font-bold opacity-80">AL 31 DE OCTUBRE</span>
        </div>
      </div>
    </motion.div>
  );
};

const SectionHeader = ({ title }: { title: string }) => (
  <div className="px-6 mt-10 mb-4">
    <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white/90 font-display">
      {title}
    </h2>
  </div>
);

const SpeakerItem: React.FC<{ speaker: Speaker }> = ({ speaker }) => {
  return (
    <div className="min-w-[160px] flex flex-col items-center group cursor-pointer">
      <div className="relative p-1 rounded-3xl bg-gradient-to-br from-neon-lime via-transparent to-neon-pink group-hover:scale-105 transition-transform duration-300">
        <div className="bg-[#0A0A0A] rounded-[calc(1.5rem-1px)] p-1">
          <div className="w-32 h-32 rounded-2xl overflow-hidden border border-white/10">
            <img 
              src={speaker.imageUrl} 
              alt={speaker.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-neon-lime/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="mt-4 text-center px-2">
        <p className="text-[11px] font-black uppercase tracking-widest text-white leading-tight">
          {speaker.name}
        </p>
        <p className="text-[9px] font-bold uppercase tracking-widest text-white/50 mt-1">
          {speaker.role}
        </p>
      </div>
    </div>
  );
};

const UpdateItem: React.FC<{ update: Update }> = ({ update }) => {
  return (
    <motion.div 
      whileHover={{ x: 5 }}
      className="glass-dark mx-6 mb-3 p-4 rounded-2xl flex items-center gap-4 relative overflow-hidden group"
    >
      <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
        {update.icon}
      </div>
      <div className="flex-1">
        <h3 className="text-[11px] font-black uppercase tracking-widest text-white leading-tight">
          {update.title}
        </h3>
        <p className="text-[10px] text-white/60 mt-0.5">
          {update.description}
        </p>
      </div>
      <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-neon-lime transition-colors" />
      
      {/* Subtle gradient flash */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
    </motion.div>
  );
};

const TabBar = () => {
  const [activeTab, setActiveTab] = useState('home');
  
  const tabs = [
    { id: 'home', icon: Home },
    { id: 'calendar', icon: Calendar },
    { id: 'notifications', icon: Megaphone },
    { id: 'profile', icon: User },
  ];

  return (
    <div className="fixed bottom-6 left-6 right-6 z-50">
      <div className="glass px-6 py-4 rounded-full flex justify-between items-center shadow-2xl">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative p-2 outline-none group"
            >
              <Icon 
                className={`w-6 h-6 transition-all duration-300 ${
                  isActive ? 'text-neon-lime scale-110' : 'text-white/40 group-hover:text-white/70'
                }`} 
              />
              {isActive && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-neon-lime rounded-full shadow-[0_0_8px_rgba(212,255,0,0.8)]"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen pb-32">
      <Background />
      
      {/* Header Info */}
      <div className="pt-6 px-6 flex justify-between items-center">
        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
          <span className="text-[10px] font-bold">L25</span>
        </div>
        <div className="flex items-center gap-1 bg-neon-lime/10 px-3 py-1 rounded-full border border-neon-lime/20">
          <div className="w-1.5 h-1.5 bg-neon-lime rounded-full animate-pulse" />
          <span className="text-[10px] font-black text-neon-lime tracking-widest">LIVE</span>
        </div>
      </div>

      <main>
        <CountdownCard />
        
        <SectionHeader title="FEATURED SPEAKERS" />
        <div className="flex overflow-x-auto no-scrollbar gap-6 px-6 pb-4">
          {SPEAKERS.map((speaker) => (
            <SpeakerItem key={speaker.id} speaker={speaker} />
          ))}
          {/* Spacer for end scroll */}
          <div className="min-w-[1px]" />
        </div>

        <SectionHeader title="LATEST UPDATES" />
        <div className="pb-4">
          {UPDATES.map((update) => (
            <UpdateItem key={update.id} update={update} />
          ))}
        </div>
      </main>

      <TabBar />
    </div>
  );
}

