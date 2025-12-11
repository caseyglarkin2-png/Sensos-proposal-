import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { 
  Terminal, 
  Activity, 
  Brain, 
  ShieldAlert, 
  Zap, 
  Users, 
  Wine, 
  CheckCircle, 
  ArrowRight, 
  Menu, 
  X,
  Box,
  Anchor,
  Cpu,
  Wifi,
  Sparkles,
  RefreshCw,
  AlertTriangle,
  Image,
  Download,
  Mic,
  Volume2,
  Play,
  Pause,
  Loader2
} from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const SensosProposal = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeVertical, setActiveVertical] = useState('AOG');
  
  // Custom Color Palette based on docs
  const colors = {
    void: '#050505', // The Singularity Background
    neon: '#00FFC2', // LIA Intelligence
    alert: '#FF2A00', // Risk/Exception
    text: '#E5E5E5', // Titanium White
    subtext: '#9CA3AF' // Muted Code
  };

  const navItems = [
    { id: 'strategy', label: 'The Singularity' },
    { id: 'lia', label: 'Meet LIA ✨' },
    { id: 'meme', label: 'Meme Generator' },
    { id: 'voice', label: 'Voice Engine' },
    { id: 'manifest', label: 'Manifest 2026' },
    { id: 'bid', label: 'The Bid' }
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <HeroSection setActiveSection={setActiveSection} />;
      case 'strategy':
        return <StrategySection />;
      case 'lia':
        return <LIASection activeVertical={activeVertical} setActiveVertical={setActiveVertical} />;
      case 'meme':
        return <MemeGeneratorSection />;
      case 'voice':
        return <VoiceEngineSection />;
      case 'manifest':
        return <ManifestSection />;
      case 'bid':
        return <BidSection />;
      default:
        return <HeroSection setActiveSection={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-[#00FFC2] selection:text-black scanline-overlay" style={{ backgroundColor: colors.void, color: colors.text }}>
      {/* Navigation */}
      <nav className="fixed w-full z-50 border-b border-white/10 backdrop-blur-md bg-black/80" role="navigation" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <button 
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity" 
              onClick={() => setActiveSection('home')}
              aria-label="Return to home"
            >
              <div className="w-10 h-10 border border-[#00FFC2] flex items-center justify-center bg-[#00FFC2]/10" aria-hidden="true">
                <Terminal size={24} color={colors.neon} />
              </div>
              <span className="font-bold text-xl tracking-tighter">SENSOS <span className="text-[#00FFC2]">x</span> DWTB?!</span>
            </button>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8" role="menubar">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:text-[#00FFC2] hover:bg-white/5 ${activeSection === item.id ? 'text-[#00FFC2] border-b-2 border-[#00FFC2]' : 'text-gray-300'}`}
                    aria-label={`Navigate to ${item.label}`}
                    aria-current={activeSection === item.id ? 'page' : undefined}
                    role="menuitem"
                  >
                    {item.label}
                  </button>
                ))}
                <button 
                  className="bg-[#00FFC2] text-black px-4 py-2 rounded-sm font-bold text-sm hover:bg-[#00CC9A] transition-colors flex items-center"
                  aria-label="Accept bid and start partnership"
                  onClick={() => setActiveSection('bid')}
                >
                  <Sparkles size={16} className="mr-2" aria-hidden="true" /> ACCEPT BID
                </button>
              </div>
            </div>

            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#00FFC2]"
                aria-expanded={isMenuOpen}
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black border-b border-white/10" role="menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                  role="menuitem"
                  aria-label={`Navigate to ${item.label}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-20" role="main" aria-label="Main content">
        {renderSection()}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-20 py-12 bg-black" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[#00FFC2] font-mono mb-4">"You Merely Adopted the Supply Chain. We Were Born In It."</p>
          <div className="flex justify-center items-center space-x-2 text-gray-500 text-sm">
            <span>Casey Larkin</span>
            <span aria-hidden="true">•</span>
            <span>The Freight Marketer</span>
            <span aria-hidden="true">•</span>
            <span>One Neck to Choke</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

// --- API UTILS ---
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-09-2025" });

// --- SECTIONS ---

const HeroSection = ({ setActiveSection }) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden" aria-label="Hero section">
      {/* Abstract Background Particles (Simulated with CSS) */}
      <div className="absolute inset-0 z-0 opacity-20" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00FFC2] rounded-full filter blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#FF2A00] rounded-full filter blur-[100px] animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <div className="inline-block mb-6 px-4 py-1 border border-[#00FFC2]/50 rounded-full bg-[#00FFC2]/10 backdrop-blur-sm">
          <span className="text-[#00FFC2] font-mono text-sm tracking-widest flex items-center gap-2">
             <Sparkles size={14} aria-hidden="true" /> PROPOSAL ID: SINGULARITY_2026
          </span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8 leading-tight">
          VISIBILITY <br />
          IS <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2A00] to-red-900">DEAD</span>.
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 font-light">
          We aren't building you a "control tower" to watch disasters happen. 
          We are building <span className="text-white font-semibold">The Singularity</span>. 
          The point where visibility collapses into action.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <button 
            onClick={() => setActiveSection('bid')}
            className="w-full md:w-auto px-8 py-4 bg-[#00FFC2] hover:bg-[#00CC9A] text-black font-bold text-lg rounded-sm transition-all transform hover:scale-105 flex items-center justify-center"
            aria-label="View the bid details"
          >
            SEE THE BID <ArrowRight className="ml-2" size={20} aria-hidden="true" />
          </button>
          <button 
            onClick={() => setActiveSection('lia')}
            className="w-full md:w-auto px-8 py-4 border border-white/20 hover:bg-white/10 text-white font-medium text-lg rounded-sm transition-all flex items-center justify-center"
            aria-label="Test the AI demonstrations"
          >
             <Sparkles size={18} className="mr-2 text-[#00FFC2]" aria-hidden="true" /> TEST THE AI
          </button>
        </div>
      </div>
    </section>
  );
};

const StrategySection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20" aria-labelledby="strategy-heading">
      <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
        <div>
          <h2 id="strategy-heading" className="text-4xl font-bold mb-6 flex items-center">
            <span className="text-[#FF2A00] mr-4 text-5xl" aria-hidden="true">01.</span>
            THE PROBLEM
          </h2>
          <p className="text-xl text-gray-400 mb-6 leading-relaxed">
            The industry is drowning in "Visibility." Billions spent on Control Towers that are just observation decks for chaos.
          </p>
          <div className="p-6 border-l-4 border-[#FF2A00] bg-white/5">
            <h3 className="text-white font-bold mb-2">The Current Reality:</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start"><ShieldAlert size={20} className="mr-3 text-[#FF2A00] mt-1" /> Passive "Dots on a map"</li>
              <li className="flex items-start"><ShieldAlert size={20} className="mr-3 text-[#FF2A00] mt-1" /> Alert fatigue (10,000 notifications)</li>
              <li className="flex items-start"><ShieldAlert size={20} className="mr-3 text-[#FF2A00] mt-1" /> Human dependency for resolution</li>
            </ul>
          </div>
        </div>
        <div className="relative h-80 bg-gray-900 rounded-lg overflow-hidden border border-white/10 flex items-center justify-center">
            {/* Visual metaphor for chaos */}
            <div className="absolute inset-0 flex flex-wrap opacity-20">
                {Array.from({ length: 50 }).map((_, i) => (
                    <div key={i} className="w-4 h-4 m-2 bg-red-500 rounded-full animate-ping" style={{ animationDelay: `${Math.random() * 2}s` }}></div>
                ))}
            </div>
            <h3 className="text-3xl font-mono text-[#FF2A00] z-10 bg-black/50 px-4 py-2">THE CHAOS</h3>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="order-2 md:order-1 relative h-80 bg-black rounded-lg overflow-hidden border border-[#00FFC2] flex items-center justify-center shadow-[0_0_50px_rgba(0,255,194,0.1)]">
             {/* Visual metaphor for order */}
             <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-40 h-40 border-2 border-[#00FFC2] rounded-full animate-spin-slow flex items-center justify-center">
                    <div className="w-20 h-20 bg-[#00FFC2] rounded-full animate-pulse shadow-[0_0_30px_#00FFC2]"></div>
                 </div>
             </div>
             <h3 className="text-3xl font-mono text-[#00FFC2] z-10 bg-black/80 px-4 py-2 border border-[#00FFC2]">THE SINGULARITY</h3>
        </div>
        <div className="order-1 md:order-2">
          <h2 className="text-4xl font-bold mb-6 flex items-center">
            <span className="text-[#00FFC2] mr-4 text-5xl">02.</span>
            THE SENSOS SHIFT
          </h2>
          <p className="text-xl text-gray-400 mb-6 leading-relaxed">
            We move from "Glass" (passive) to "Brain" (agentic). LIA doesn't just watch; she acts.
          </p>
          <div className="p-6 border-l-4 border-[#00FFC2] bg-[#00FFC2]/5">
            <h3 className="text-white font-bold mb-2">The New Reality:</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center"><Brain size={20} className="mr-3 text-[#00FFC2]" /> <strong>Predict:</strong> Anticipate the disruption.</li>
              <li className="flex items-center"><Activity size={20} className="mr-3 text-[#00FFC2]" /> <strong>Prioritize:</strong> Filter the noise.</li>
              <li className="flex items-center"><Zap size={20} className="mr-3 text-[#00FFC2]" /> <strong>Execute:</strong> Autonomous resolution.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const LIASection = ({ activeVertical, setActiveVertical }) => {
  const [simulationState, setSimulationState] = useState('idle');
  const [logs, setLogs] = useState([]);
  const scrollRef = useRef(null);

  const scenarios = useMemo(() => ({
    AOG: {
      title: "Aviation (AOG)",
      trigger: "Part #X99 stuck in Customs (Dubai)",
      action: "LIA re-routed to courier, updated ERP, notified maintenance crew.",
      icon: <Anchor className="text-sky-400" size={32} />,
      backupLogs: ["Reading Flight Telemetry...", "Customs Database: DXB-2026-X99", "Status: HELD - MISSING DOCS", "Panic Level: DEFCON 1"]
    },
    Pharma: {
      title: "Life Sciences",
      trigger: "Temp Excursion Risk > 2°C projected in 4 hours",
      action: "LIA alerted carrier to move to climate hold. Batch saved.",
      icon: <Activity className="text-green-400" size={32} />,
      backupLogs: ["Sensor ID: #8821-COLD", "Ambient Temp: 24°C (Rising)", "Traffic Delay: +4h 20m", "Impact: SPOILAGE IMMINENT"]
    },
    Retail: {
      title: "Retail / 3PL",
      trigger: "Port Strike LA/LB Probability 85%",
      action: "LIA diverted 40 containers to Seattle-Tacoma automatically.",
      icon: <Box className="text-yellow-400" size={32} />,
      backupLogs: ["Scanning Labor Union Newsfeeds...", "Keyword Match: 'STRIKE AUTHORIZATION'", "Risk Probability: 85%", "Affected Containers: 40 Units"]
    }
  }), []);

  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const runSimulation = useCallback(async () => {
    setSimulationState('initializing');
    setLogs([]);
    
    const addLog = (text) => {
      setLogs(prev => [...prev, `> ${text}`]);
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    };

    // Simulation Sequence
    addLog("INITIALIZING LIA CORE v2.4...");
    await wait(500);
    addLog("ESTABLISHING SECURE UPLINK...");
    await wait(500);
    setSimulationState('streaming');
    
    // GENERATIVE AI INTEGRATION
    let streamData = [];
    try {
        const prompt = `You are LIA, an autonomous supply chain agent. Generate a sequence of 4-6 short, terse, highly technical system logs (no timestamps) showing you detecting and resolving this issue: "${scenarios[activeVertical].trigger}". 
        Style: Cyberpunk/Terminal. Use uppercase mostly. 
        Format: Return ONLY a raw JSON array of strings. Example: ["SCANNING...", "DETECTED X"]`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        // Clean markdown code blocks if present
        const jsonText = text.replace(/```json/g, '').replace(/```/g, '').trim();
        streamData = JSON.parse(jsonText);
    } catch (e) {
        // Fallback to backup logs if API fails
        console.error("Gemini AI failed, using backup:", e);
        streamData = scenarios[activeVertical].backupLogs;
        addLog("AI UPLINK UNSTABLE... REVERTING TO LOCAL CACHE");
    }

    for (const line of streamData) {
      addLog(line);
      await wait(600);
    }

    addLog("ANALYZING ANOMALY...");
    setSimulationState('analyzing');
    await wait(1500);

    addLog("CALCULATING RESOLUTION...");
    await wait(1000);
    setSimulationState('resolved');
  }, [activeVertical, scenarios]);

  useEffect(() => {
    // Reset simulation on vertical change
    runSimulation();
  }, [runSimulation]);

  return (
    <div className="bg-white/5 py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 border border-[#00FFC2]/50 rounded-full bg-[#00FFC2]/10 backdrop-blur-sm mb-4">
             <span className="text-[#00FFC2] font-mono text-xs flex items-center gap-2">
                <Sparkles size={12} /> POWERED BY GEMINI
             </span>
          </div>
          <h2 className="text-4xl font-bold mb-4">MEET LIA</h2>
          <p className="text-gray-400">The world's first agentic supply chain employee.</p>
        </div>

        <div className="bg-black border border-gray-800 rounded-xl overflow-hidden shadow-2xl max-w-5xl mx-auto flex flex-col md:flex-row h-[600px]">
            {/* Sidebar Control */}
            <div className="w-full md:w-1/3 border-r border-gray-800 bg-gray-900/50 p-6 flex flex-col">
              <div className="mb-8">
                <div className="text-xs font-mono text-gray-500 mb-2">SYSTEM STATUS</div>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${simulationState === 'idle' ? 'bg-gray-500' : 'bg-[#00FFC2] animate-pulse'}`}></div>
                  <span className="text-[#00FFC2] font-mono font-bold uppercase">{simulationState === 'resolved' ? 'OPTIMIZED' : 'PROCESSING'}</span>
                </div>
              </div>

              <h3 className="text-gray-400 font-mono text-xs mb-4 uppercase tracking-wider">Select Simulation</h3>
              <div className="space-y-3">
                {Object.keys(scenarios).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveVertical(key)}
                    className={`w-full text-left p-4 rounded border transition-all relative overflow-hidden group ${activeVertical === key ? 'border-[#00FFC2] bg-[#00FFC2]/10 text-white' : 'border-gray-800 text-gray-500 hover:border-gray-600 hover:bg-white/5'}`}
                  >
                    <div className="relative z-10 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-sm">{scenarios[key].title}</div>
                        <div className="text-[10px] opacity-70 mt-1 font-mono">CLICK TO RUN SIMULATION</div>
                      </div>
                      {activeVertical === key && <Activity size={16} className="text-[#00FFC2] animate-pulse" />}
                    </div>
                    {/* Background fill animation */}
                    {activeVertical === key && (
                       <div className="absolute inset-0 bg-[#00FFC2]/5 transform origin-left animate-slideRight"></div>
                    )}
                  </button>
                ))}
              </div>
              
              <div className="mt-auto pt-6 border-t border-gray-800">
                <div className="flex items-center space-x-3 text-xs text-gray-500 font-mono">
                  <Wifi size={14} />
                  <span>UPLINK: SECURE (24ms)</span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-gray-500 font-mono mt-2">
                  <Cpu size={14} />
                  <span>CPU LOAD: 12%</span>
                </div>
              </div>
            </div>

            {/* Terminal / HUD Display */}
            <div className="w-full md:w-2/3 bg-black relative flex flex-col font-mono text-sm">
               {/* Terminal Header */}
               <div className="bg-gray-900 px-4 py-2 flex items-center justify-between border-b border-gray-800">
                 <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500"></div>
                 </div>
                 <div className="text-gray-500 text-xs">lia_neural_core.sh</div>
               </div>

               {/* Log Output Area */}
               <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-gray-800">
                  {logs.map((log, i) => (
                    <div key={i} className="text-green-500/80 animate-fadeIn font-mono">
                      {log}
                    </div>
                  ))}
                  {simulationState !== 'resolved' && (
                    <div className="w-3 h-5 bg-[#00FFC2] animate-pulse inline-block ml-1"></div>
                  )}
               </div>

               {/* HUD Overlay for Resolution */}
               {simulationState === 'resolved' && (
                 <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-8 animate-fadeIn">
                    <div className="w-full max-w-md border border-[#00FFC2] bg-black p-6 rounded relative shadow-[0_0_50px_rgba(0,255,194,0.2)]">
                      <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-[#00FFC2]"></div>
                      <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-[#00FFC2]"></div>
                      
                      <div className="flex items-center justify-center mb-6">
                        <div className="w-16 h-16 rounded-full border-2 border-[#00FFC2] flex items-center justify-center animate-bounce-slow">
                          <CheckCircle size={32} className="text-[#00FFC2]" />
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-[#00FFC2] font-bold text-xl mb-2 tracking-wider">ACTION EXECUTED</div>
                        <div className="text-white mb-6 text-sm leading-relaxed">
                          {scenarios[activeVertical].action}
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div className="bg-[#00FFC2]/10 p-2 rounded border border-[#00FFC2]/20">
                            <div className="text-gray-400">Time Saved</div>
                            <div className="text-white font-bold">4h 22m</div>
                          </div>
                          <div className="bg-[#00FFC2]/10 p-2 rounded border border-[#00FFC2]/20">
                            <div className="text-gray-400">Cost Prevented</div>
                            <div className="text-white font-bold">$142,000</div>
                          </div>
                        </div>
                        <button 
                            onClick={() => runSimulation()}
                            className="mt-6 text-xs text-gray-500 hover:text-white flex items-center justify-center w-full gap-2 transition-colors"
                        >
                            <RefreshCw size={12} /> RE-RUN SIMULATION
                        </button>
                      </div>
                    </div>
                 </div>
               )}
            </div>
        </div>
      </div>
    </div>
  );
};

const ManifestSection = () => {
  const [crisis, setCrisis] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateCrisis = async () => {
    setLoading(true);
    try {
        const prompt = `Generate a short, high-stakes supply chain crisis scenario for a "War Game" roundtable. 
        It must be realistic but catastrophic. 
        Return ONLY valid JSON with this structure: { "title": "Crisis Name", "situation": "What happened", "impact": "Financial/Time Impact" }.`;
        
        const result = await model.generateContent(prompt);
        const text = await result.response.text();
        const jsonText = text.replace(/```json/g, '').replace(/```/g, '').trim();
        setCrisis(JSON.parse(jsonText));
    } catch (e) {
        console.error("Failed to generate crisis", e);
        setCrisis({
            title: "Suez Canal Blockage II",
            situation: "Ever Given sister ship grounded. Canal blocked indefinitely.",
            impact: "$9.6 Billion Daily Trade Halted"
        });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold mb-4 uppercase tracking-tighter">Manifest 2026</h2>
        <p className="text-xl text-[#00FFC2]">February 9-11 • Las Vegas • Booth #337</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* The Booth */}
        <div className="col-span-2 relative group overflow-hidden rounded-xl border border-gray-800 hover:border-[#00FFC2] transition-colors bg-black h-96">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b')] bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity"></div>
            
            <div className="absolute bottom-0 left-0 p-8 z-20">
              <h3 className="text-3xl font-bold text-white mb-2">THE MONOLITH</h3>
              <p className="text-gray-300 max-w-md">
                No open counters. No swag hunters. A "Vantablack" box that generates FOMO. 
                Inside: The LIA Pillar visualizes global supply chain healing in real-time.
              </p>
            </div>
            <div className="absolute top-4 right-4 bg-white/10 backdrop-blur px-3 py-1 rounded text-xs font-mono border border-white/20">
              BOOTH CONCEPT
            </div>
        </div>

        {/* The War Game */}
        <div className="relative group overflow-hidden rounded-xl border border-gray-800 hover:border-[#FF2A00] transition-colors bg-black h-96 flex flex-col">
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
            <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
              <Users size={120} />
            </div>
            
            <div className="p-6 z-20 flex-1 flex flex-col">
              <div className="flex justify-between items-start">
                  <h3 className="text-2xl font-bold text-white mb-2">THE WAR GAME</h3>
                  <div className="bg-[#FF2A00]/20 text-[#FF2A00] px-3 py-1 rounded text-xs font-mono border border-[#FF2A00]/20">
                    INTERACTIVE
                  </div>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Roundtable: "The 12:30 Anomaly".
                <br />
                We hand out crisis cards. They panic. LIA solves it.
              </p>
              
              <div className="mt-auto bg-[#FF2A00]/10 border border-[#FF2A00]/30 p-4 rounded-lg relative overflow-hidden">
                 {loading ? (
                    <div className="flex items-center justify-center h-20 text-[#FF2A00] animate-pulse">
                        <RefreshCw className="animate-spin mr-2" /> GENERATING CRISIS...
                    </div>
                 ) : crisis ? (
                    <div className="animate-fadeIn">
                        <div className="flex items-center text-[#FF2A00] mb-2 gap-2">
                             <AlertTriangle size={16} /> 
                             <span className="font-bold uppercase text-xs">{crisis.title}</span>
                        </div>
                        <p className="text-xs text-white mb-2 leading-tight">"{crisis.situation}"</p>
                        <p className="text-xs text-gray-400 font-mono">IMPACT: {crisis.impact}</p>
                    </div>
                 ) : (
                    <div className="text-center py-4 text-gray-500 text-xs">
                        Click below to generate a new scenario using Gemini AI.
                    </div>
                 )}
              </div>

              <button 
                onClick={generateCrisis}
                className="mt-4 w-full py-2 bg-[#FF2A00] hover:bg-red-600 text-white text-xs font-bold rounded flex items-center justify-center gap-2 transition-colors"
              >
                <Sparkles size={12} /> GENERATE NEW CRISIS
              </button>
            </div>
        </div>
      </div>

      {/* The Dinners */}
      <div className="mt-12 grid md:grid-cols-2 gap-8">
        <div className="bg-[#111] p-8 rounded-xl border border-gray-800 hover:border-[#00FFC2] transition-colors">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xl font-bold">NIGHT 1: THE HAFLA</h4>
            <Wine className="text-[#00FFC2]" />
          </div>
          <div className="text-sm text-gray-400 mb-4">Venue: <span className="text-white">Miznon / HaSalon</span></div>
          <p className="text-gray-300 text-sm">
            Organized chaos. High energy. Arak shots and roasted cauliflower.
            We break down the corporate walls. "Born in it" vibes.
          </p>
        </div>

        <div className="bg-[#111] p-8 rounded-xl border border-gray-800 hover:border-white transition-colors">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xl font-bold">NIGHT 2: THE SANCTUARY</h4>
            <div className="w-2 h-2 rounded-full bg-white"></div>
          </div>
          <div className="text-sm text-gray-400 mb-4">Venue: <span className="text-white">TAO Asian Bistro</span></div>
          <p className="text-gray-300 text-sm">
            Silence. Service. Symmetry. The "Opium Room".
            This is where we close the C-Suite deals.
          </p>
        </div>
      </div>
    </div>
  );
};

// Meme Generator Section
const MemeGeneratorSection = () => {
  const [memeText, setMemeText] = useState('');
  const [generatedMeme, setGeneratedMeme] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateMeme = async () => {
    if (!memeText.trim()) {
      setError('Please enter a supply chain crisis scenario');
      return;
    }

    setLoading(true);
    setError(null);
    setGeneratedMeme(null);

    try {
      // Use Gemini to generate meme text
      const prompt = `Create a funny, cynical supply chain meme caption about: "${memeText}". 
      The caption should be in the style of internet memes - short, punchy, relatable to supply chain professionals.
      Format: Return ONLY the meme text, no quotes, no explanation. Max 2 lines.`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const memeCaption = response.text().trim();

      // Since Gemini doesn't support image generation in the free tier,
      // we'll create a text-based meme with styling
      setGeneratedMeme({
        caption: memeCaption,
        scenario: memeText
      });
    } catch (e) {
      console.error('Meme generation failed:', e);
      setError('Meme generation failed. Using fallback.');
      setGeneratedMeme({
        caption: 'When the container is stuck at port but the customer wants it tomorrow',
        scenario: memeText
      });
    }

    setLoading(false);
  };

  const downloadMeme = () => {
    // Create a canvas-based meme download
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Neon border
    ctx.strokeStyle = '#00FFC2';
    ctx.lineWidth = 4;
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

    // Title
    ctx.fillStyle = '#00FFC2';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('SUPPLY CHAIN MEME', canvas.width / 2, 60);

    // Scenario
    ctx.fillStyle = '#9CA3AF';
    ctx.font = '18px Arial';
    const scenarioLines = wrapText(ctx, generatedMeme.scenario, canvas.width - 100);
    scenarioLines.forEach((line, i) => {
      ctx.fillText(line, canvas.width / 2, 120 + i * 25);
    });

    // Caption (the meme text)
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 32px Arial';
    const captionLines = wrapText(ctx, generatedMeme.caption, canvas.width - 100);
    const startY = canvas.height / 2 + 50;
    captionLines.forEach((line, i) => {
      ctx.fillText(line, canvas.width / 2, startY + i * 40);
    });

    // Download
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'supply-chain-meme.png';
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  const wrapText = (ctx, text, maxWidth) => {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    words.forEach(word => {
      const testLine = currentLine + word + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && currentLine !== '') {
        lines.push(currentLine.trim());
        currentLine = word + ' ';
      } else {
        currentLine = testLine;
      }
    });
    lines.push(currentLine.trim());
    return lines;
  };

  return (
    <div className="min-h-screen py-24">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 border border-[#00FFC2]/50 rounded-full bg-[#00FFC2]/10 backdrop-blur-sm mb-4">
            <span className="text-[#00FFC2] font-mono text-xs flex items-center gap-2">
              <Image size={12} /> AI-POWERED MEME GENERATOR
            </span>
          </div>
          <h2 className="text-5xl font-bold mb-4">SUPPLY CHAIN MEMES</h2>
          <p className="text-xl text-gray-400">Turn your logistics nightmares into viral content</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-black border border-gray-800 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4 text-[#00FFC2]">Create Your Meme</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Crisis Scenario</label>
                <textarea
                  value={memeText}
                  onChange={(e) => setMemeText(e.target.value)}
                  placeholder="e.g., Container stuck in Suez Canal"
                  className="w-full h-32 bg-gray-900 border border-gray-700 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00FFC2] transition-colors"
                  aria-label="Enter crisis scenario for meme"
                />
              </div>
              <button
                onClick={generateMeme}
                disabled={loading}
                className="w-full bg-[#00FFC2] hover:bg-[#00CC9A] disabled:bg-gray-700 disabled:cursor-not-allowed text-black font-bold py-3 px-6 rounded flex items-center justify-center gap-2 transition-all"
                aria-label="Generate meme"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles size={20} />
                    Generate Meme
                  </>
                )}
              </button>
              {error && (
                <div className="text-[#FF2A00] text-sm flex items-center gap-2">
                  <AlertTriangle size={16} />
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Preview Section */}
          <div className="bg-black border border-gray-800 rounded-xl p-6 flex flex-col">
            <h3 className="text-xl font-bold mb-4 text-[#00FFC2]">Preview</h3>
            {generatedMeme ? (
              <div className="flex-1 flex flex-col">
                <div className="flex-1 bg-[#050505] border-2 border-[#00FFC2] rounded-lg p-8 flex flex-col items-center justify-center text-center">
                  <div className="text-[#00FFC2] text-xs font-mono mb-4 uppercase">Supply Chain Meme</div>
                  <div className="text-gray-400 text-sm mb-8 italic">{generatedMeme.scenario}</div>
                  <div className="text-white text-2xl font-bold leading-tight">{generatedMeme.caption}</div>
                </div>
                <button
                  onClick={downloadMeme}
                  className="mt-4 w-full bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded flex items-center justify-center gap-2 transition-colors"
                  aria-label="Download meme"
                >
                  <Download size={16} />
                  Download Meme
                </button>
              </div>
            ) : (
              <div className="flex-1 bg-gray-900/50 border border-gray-700 border-dashed rounded-lg flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <Image size={48} className="mx-auto mb-2 opacity-50" />
                  <p>Your meme will appear here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Voice Engine Section
const VoiceEngineSection = () => {
  const [narrative, setNarrative] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [audioData, setAudioData] = useState(null);
  const [visualizerData, setVisualizerData] = useState(Array(20).fill(0));
  const audioRef = useRef(null);
  const analyzerRef = useRef(null);
  const animationFrameRef = useRef(null);

  const generateVoice = async () => {
    if (!narrative.trim()) {
      setError('Please enter a narrative to convert to speech');
      return;
    }

    setLoading(true);
    setError(null);
    setAudioData(null);
    setIsPlaying(false);

    try {
      // Note: Gemini TTS requires a different API endpoint
      // For now, we'll generate the text and provide a placeholder for audio
      const prompt = `Enhance this executive briefing for a supply chain platform: "${narrative}". 
      Make it sound professional, urgent, and compelling. Keep it under 100 words.
      Return ONLY the enhanced text.`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const enhancedText = response.text().trim();

      // In a real implementation, you would call Gemini's TTS API here
      // For now, we'll simulate audio generation
      setError('Note: Text-to-Speech requires Gemini TTS API configuration. Enhanced text is shown below.');
      
      // Store the enhanced narrative
      setAudioData({
        text: enhancedText,
        original: narrative
      });

    } catch (e) {
      console.error('Voice generation failed:', e);
      setError('Voice generation failed. Please try again.');
    }

    setLoading(false);
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    } else {
      audioRef.current.play();
      setIsPlaying(true);
      startVisualizer();
    }
  };

  const startVisualizer = () => {
    if (!analyzerRef.current) return;

    const animate = () => {
      const dataArray = new Uint8Array(analyzerRef.current.frequencyBinCount);
      analyzerRef.current.getByteFrequencyData(dataArray);

      // Sample 20 frequency bins for visualization
      const samples = [];
      const step = Math.floor(dataArray.length / 20);
      for (let i = 0; i < 20; i++) {
        samples.push(dataArray[i * step] / 255);
      }
      setVisualizerData(samples);

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen py-24 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 border border-[#00FFC2]/50 rounded-full bg-[#00FFC2]/10 backdrop-blur-sm mb-4">
            <span className="text-[#00FFC2] font-mono text-xs flex items-center gap-2">
              <Mic size={12} /> AI VOICE ENGINE
            </span>
          </div>
          <h2 className="text-5xl font-bold mb-4">NARRATIVE DELIVERY</h2>
          <p className="text-xl text-gray-400">Transform your pitch into an executive briefing</p>
        </div>

        <div className="bg-black border border-gray-800 rounded-xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Input Section */}
            <div className="p-6 border-r border-gray-800">
              <h3 className="text-xl font-bold mb-4 text-[#00FFC2]">Your Narrative</h3>
              <textarea
                value={narrative}
                onChange={(e) => setNarrative(e.target.value)}
                placeholder="Enter your executive briefing text here..."
                className="w-full h-64 bg-gray-900 border border-gray-700 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00FFC2] transition-colors resize-none"
                aria-label="Enter narrative text"
              />
              <button
                onClick={generateVoice}
                disabled={loading}
                className="mt-4 w-full bg-[#00FFC2] hover:bg-[#00CC9A] disabled:bg-gray-700 disabled:cursor-not-allowed text-black font-bold py-3 px-6 rounded flex items-center justify-center gap-2 transition-all"
                aria-label="Generate voice"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Processing...
                  </>
                ) : (
                  <>
                    <Volume2 size={20} />
                    Enhance & Generate
                  </>
                )}
              </button>
              {error && (
                <div className="mt-4 text-[#FF2A00] text-sm flex items-start gap-2">
                  <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}
            </div>

            {/* Audio Player Section */}
            <div className="p-6 bg-gradient-to-br from-gray-900 to-black">
              <h3 className="text-xl font-bold mb-4 text-[#00FFC2]">Enhanced Audio</h3>
              
              {audioData ? (
                <div className="space-y-6">
                  {/* Enhanced Text Display */}
                  <div className="bg-black/50 border border-[#00FFC2]/20 rounded-lg p-4 h-48 overflow-y-auto">
                    <div className="text-gray-400 text-xs mb-2">ENHANCED NARRATIVE:</div>
                    <p className="text-white text-sm leading-relaxed">{audioData.text}</p>
                  </div>

                  {/* Audio Visualizer */}
                  <div className="bg-black border border-gray-800 rounded-lg p-4">
                    <div className="flex items-end justify-around h-24 gap-1">
                      {visualizerData.map((value, i) => (
                        <div
                          key={i}
                          className="bg-[#00FFC2] rounded-t transition-all duration-100"
                          style={{
                            height: `${Math.max(10, value * 100)}%`,
                            width: '100%',
                            opacity: isPlaying ? 0.8 : 0.3
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Playback Controls (Placeholder) */}
                  <div className="flex items-center justify-center gap-4">
                    <button
                      onClick={togglePlayPause}
                      disabled
                      className="w-16 h-16 rounded-full border-2 border-[#00FFC2] bg-[#00FFC2]/10 flex items-center justify-center hover:bg-[#00FFC2]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
                    >
                      {isPlaying ? (
                        <Pause size={24} className="text-[#00FFC2]" />
                      ) : (
                        <Play size={24} className="text-[#00FFC2] ml-1" />
                      )}
                    </button>
                  </div>
                  <div className="text-center text-gray-500 text-xs">
                    Audio playback requires TTS API configuration
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <Volume2 size={48} className="mx-auto mb-2 opacity-50" />
                    <p>Generate audio to see the player</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="mt-8 bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#00FFC2]/10 border border-[#00FFC2] flex items-center justify-center">
              <Sparkles size={20} className="text-[#00FFC2]" />
            </div>
            <div>
              <h4 className="font-bold text-white mb-2">Production Implementation Note</h4>
              <p className="text-gray-400 text-sm">
                This demo showcases text enhancement using Gemini. For full TTS functionality, integrate Google Cloud Text-to-Speech API
                or Gemini's multimodal capabilities with audio output. The visualizer demonstrates real-time audio analysis using Web Audio API.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BidSection = () => {
  return (
    <div className="bg-[#0A0A0A] py-24 border-t border-gray-800">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 bg-[#00FFC2] text-black font-bold rounded-full mb-4 text-sm">
            THE HOMETOWN DISCOUNT
          </div>
          <h2 className="text-4xl font-bold mb-4">ALL MUSCLE. NO FAT.</h2>
          <p className="text-gray-400">Comparing "Global Agency" fees vs. The "Dude" Reality.</p>
        </div>

        <div className="bg-black border border-gray-800 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-3 border-b border-gray-800 bg-gray-900/50 text-sm font-mono text-gray-400">
            <div className="p-4">DELIVERABLE</div>
            <div className="p-4 border-l border-gray-800">AGENCY PRICE</div>
            <div className="p-4 border-l border-gray-800 text-[#00FFC2] bg-[#00FFC2]/5">"THE DUDE" PRICE</div>
          </div>

          {/* Row 1 */}
          <div className="grid grid-cols-3 border-b border-gray-800 hover:bg-white/5 transition-colors">
            <div className="p-6">
              <div className="font-bold text-white">Phase 1: Capital Project</div>
              <div className="text-xs text-gray-500 mt-1">Rebrand, WebGL Site, Content</div>
            </div>
            <div className="p-6 border-l border-gray-800 flex items-center text-gray-400 line-through decoration-red-500">
              $111,500
            </div>
            <div className="p-6 border-l border-gray-800 flex items-center text-[#00FFC2] font-bold text-xl bg-[#00FFC2]/5">
              $75,000
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-3 border-b border-gray-800 hover:bg-white/5 transition-colors">
            <div className="p-6">
              <div className="font-bold text-white">Phase 2: Manifest</div>
              <div className="text-xs text-gray-500 mt-1">Booth Design, Event Mgmt, Strategy</div>
            </div>
            <div className="p-6 border-l border-gray-800 flex items-center text-gray-400 line-through decoration-red-500">
              $58,000
            </div>
            <div className="p-6 border-l border-gray-800 flex items-center text-[#00FFC2] font-bold text-xl bg-[#00FFC2]/5">
              $15,000
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-3 hover:bg-white/5 transition-colors">
            <div className="p-6">
              <div className="font-bold text-white">Phase 3: Retainer</div>
              <div className="text-xs text-gray-500 mt-1">Monthly Growth & PR Engine</div>
            </div>
            <div className="p-6 border-l border-gray-800 flex items-center text-gray-400 line-through decoration-red-500">
              $24,500 / mo
            </div>
            <div className="p-6 border-l border-gray-800 flex items-center text-[#00FFC2] font-bold text-xl bg-[#00FFC2]/5">
              $12,000 / mo
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-gray-900 to-black p-8 rounded-xl border border-[#00FFC2]/30">
          <div>
            <div className="text-gray-400 text-sm uppercase tracking-widest mb-1">Total First Year Savings</div>
            <div className="text-4xl font-bold text-white">~$230,000</div>
          </div>
          <div className="mt-6 md:mt-0">
            <button className="px-8 py-4 bg-[#00FFC2] hover:bg-[#00CC9A] text-black font-bold text-lg rounded-sm transition-all shadow-[0_0_20px_rgba(0,255,194,0.3)] hover:shadow-[0_0_40px_rgba(0,255,194,0.5)]">
              INITIATE PARTNERSHIP
            </button>
            <div className="text-center mt-2 text-xs text-gray-500">"One Neck to Choke." - Casey</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SensosProposal;
