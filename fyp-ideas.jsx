import { useState } from "react";

const projects = [
  {
    id: 1,
    tag: "🔥 Trending",
    tagColor: "#ff6b35",
    title: "PhishBERT: Transformer-Based Multi-Modal Phishing Detection Engine",
    domain: "Phishing / NLP",
    difficulty: "High",
    novelty: "★★★★☆",
    problem:
      "Traditional phishing filters rely on blacklists and simple heuristics that fail against zero-day phishing campaigns. Attackers now use URL obfuscation, lookalike domains, and context-aware lure text that evades legacy filters.",
    ai: "Fine-tune a BERT/RoBERTa transformer model on both email body text (NLP) and URL lexical features simultaneously. A multi-modal fusion layer combines text embeddings with URL structural features (entropy, TLD, subdomain depth) for a joint prediction. Active learning loop flags uncertain samples for analyst review.",
    tools: ["Python", "HuggingFace Transformers", "BERT/RoBERTa", "scikit-learn", "Flask API", "PhishTank Dataset", "OpenPhish", "Docker"],
    outcome:
      "A real-time browser extension + email gateway API that detects phishing with >97% accuracy, including zero-day URLs not in any blacklist. Publishable F1-score benchmarks against legacy systems.",
  },
  {
    id: 2,
    tag: "🚀 Novel",
    tagColor: "#7c3aed",
    title: "SHIELD: Federated Learning for Privacy-Preserving Intrusion Detection",
    domain: "Network Security / Federated ML",
    difficulty: "Very High",
    novelty: "★★★★★",
    problem:
      "Organizations cannot share raw network traffic logs for collaborative threat intelligence due to privacy regulations (GDPR, HIPAA). This siloes threat data and weakens detection models trained on single-organization data only.",
    ai: "Implement a Federated Learning (FL) framework where each node (simulated organization) trains a local LSTM-based anomaly detection model on its own traffic. Only model gradients — not raw data — are shared with a central aggregator (FedAvg algorithm). Differential privacy noise is added to gradients before sharing, preventing inference attacks on the shared parameters.",
    tools: ["Python", "PySyft / Flower FL Framework", "PyTorch", "LSTM", "NSL-KDD / CICIDS2017 Dataset", "Differential Privacy Library", "Wireshark"],
    outcome:
      "A proof-of-concept federated IDS that achieves within 3–5% accuracy of centralized training while provably protecting organizational data. A rare, publishable research contribution at the intersection of FL, privacy, and security.",
  },
  {
    id: 3,
    tag: "🚀 Novel",
    tagColor: "#7c3aed",
    title: "AdversaGuard: Detecting Adversarial Attacks on AI-Based Security Systems",
    domain: "AI Security / Meta-Security",
    difficulty: "Very High",
    novelty: "★★★★★",
    problem:
      "As organizations deploy AI-based malware detectors and intrusion detection systems, adversaries are crafting adversarial examples — subtly perturbed inputs designed to fool ML models while remaining functionally malicious. Current security systems are blind to this threat.",
    ai: "Build a secondary 'adversarial detector' model (a neural network trained on adversarial perturbation signatures) that monitors an existing ML-based malware classifier. Use FGSM, PGD, and C&W attack generation to create a training dataset of adversarial samples. The detector flags inputs whose feature distributions indicate adversarial manipulation before they reach the primary classifier.",
    tools: ["Python", "PyTorch", "Cleverhans / ART (IBM Adversarial Robustness Toolbox)", "EMBER Malware Dataset", "Explainability: SHAP", "Jupyter Notebooks"],
    outcome:
      "A meta-security layer that makes AI-based security tools adversarially robust. Demonstrates an attack-defense red-blue team cycle in ML systems — a highly novel and conference-worthy research contribution.",
  },
  {
    id: 4,
    tag: "🔍 Research",
    tagColor: "#0ea5e9",
    title: "DeepFake Sentinel: Real-Time Video Deepfake Detection for Identity Verification",
    domain: "Deepfake Security / Computer Vision",
    difficulty: "High",
    novelty: "★★★★☆",
    problem:
      "Deepfake technology is being weaponized for identity fraud, bypassing KYC (Know Your Customer) video verification systems at financial institutions, creating fake video evidence, and enabling CEO fraud attacks in enterprise settings.",
    ai: "Train a CNN-Transformer hybrid (EfficientNet backbone + temporal attention) on facial inconsistency features: unnatural blinking frequency, GAN-generated texture artifacts, facial landmark jitter across frames, and frequency-domain anomalies (FFT analysis reveals GAN fingerprints invisible to the eye).",
    tools: ["Python", "PyTorch", "EfficientNet", "FaceForensics++ Dataset", "OpenCV", "MTCNN (face detection)", "Grad-CAM for explainability", "FastAPI"],
    outcome:
      "A real-time deepfake detection API that processes video streams and returns a confidence score with highlighted facial regions of concern. Directly applicable to video KYC platforms and legal evidence authentication pipelines.",
  },
  {
    id: 5,
    tag: "🔥 Trending",
    tagColor: "#ff6b35",
    title: "RansomWatch: Behavioral AI System for Pre-Encryption Ransomware Termination",
    domain: "Malware Detection / Behavioral Analysis",
    difficulty: "High",
    novelty: "★★★★☆",
    problem:
      "Signature-based antivirus tools detect ransomware only after known variants are catalogued. Novel ransomware families evade detection, and by the time encryption begins, data loss has already occurred. The critical window is pre-encryption behavior.",
    ai: "Train a Random Forest + LSTM ensemble on Windows API call sequences extracted from malware sandboxes. The model identifies behavioral fingerprints of ransomware (rapid file enumeration, entropy spikes in written file data, shadow copy deletion commands, Registry modifications) before encryption completes. A real-time kernel hook monitors API calls and triggers automated process termination.",
    tools: ["Python", "Cuckoo Sandbox", "Windows Sysinternals", "scikit-learn", "PyTorch LSTM", "VirusTotal API", "CAPE Sandbox Dataset", "PE File Analysis: pefile library"],
    outcome:
      "A lightweight Windows endpoint agent that terminates ransomware processes within 2–5 seconds of behavioral trigger, before significant file encryption occurs. Tested against real ransomware families (WannaCry, LockBit variants) in isolated sandbox environments.",
  },
  {
    id: 6,
    tag: "🌐 IoT",
    tagColor: "#10b981",
    title: "IoTSentinel-AI: Graph Neural Network-Based Anomaly Detection for Smart Home Networks",
    domain: "IoT Security / Graph ML",
    difficulty: "High",
    novelty: "★★★★★",
    problem:
      "IoT devices (smart TVs, cameras, thermostats) have minimal security and cannot run traditional endpoint protection. Compromised IoT devices form botnets (Mirai variants), exfiltrate data, and pivot to enterprise networks. Per-device ML models fail because IoT traffic context is relational, not isolated.",
    ai: "Model the smart home network as a graph where devices are nodes and traffic flows are edges. A Graph Neural Network (GNN / GraphSAGE) learns normal communication patterns between devices. Anomalies — such as a smart bulb suddenly communicating with a C2 server, or a camera generating unusual outbound traffic volumes — are flagged based on deviation from the learned graph topology and edge weight distributions.",
    tools: ["Python", "PyTorch Geometric", "GraphSAGE / GCN", "UNSW-NB15 / N-BaIoT Dataset", "Raspberry Pi (physical IoT simulation)", "Wireshark / tcpdump", "NetworkX"],
    outcome:
      "A network-level IoT security monitor deployable on a home router or gateway that detects botnet enrollment, data exfiltration, and lateral movement from IoT devices without requiring agents on the devices themselves.",
  },
  {
    id: 7,
    tag: "🧠 AI-Native",
    tagColor: "#f59e0b",
    title: "SocialEngineerAI: LLM-Powered Red Team Tool for Social Engineering Simulation",
    domain: "Social Engineering / LLM Security",
    difficulty: "Medium-High",
    novelty: "★★★★☆",
    problem:
      "Security awareness training is static and fails to prepare employees for highly personalized, AI-crafted social engineering attacks. Organizations lack tools to simulate realistic LLM-generated phishing emails, vishing scripts, and pretexting scenarios at scale for security training.",
    ai: "Build a controlled red-team simulation platform that uses a fine-tuned LLM (GPT-4o API or locally hosted Mistral) to generate context-aware spear-phishing emails, pretexting call scripts, and fake LinkedIn messages using OSINT data about target profiles. A secondary NLP classifier evaluates the generated content for persuasiveness and flags the most dangerous variants for training scenario generation. Full ethical guardrails and consent framework included.",
    tools: ["Python", "OpenAI GPT-4o API / Mistral (local)", "LangChain", "SpaCy (OSINT NLP processing)", "OSINT Framework", "FastAPI", "React (dashboard)", "Responsible Disclosure Framework"],
    outcome:
      "An internal security awareness platform that generates personalized, realistic attack simulations. Organizations can test employee resilience against AI-generated attacks — a critical gap given the rise of LLM-assisted phishing. Strong ethics chapter for academic presentation.",
  },
  {
    id: 8,
    tag: "☁️ Cloud",
    tagColor: "#3b82f6",
    title: "CloudGuardian: Reinforcement Learning Agent for Adaptive Cloud Security Policy Management",
    domain: "Cloud Security / Reinforcement Learning",
    difficulty: "Very High",
    novelty: "★★★★★",
    problem:
      "Cloud IAM (Identity and Access Management) policies are typically static and overly permissive. Security teams manually respond to threats too slowly. There is no adaptive system that automatically tightens permissions, isolates resources, or modifies firewall rules in response to detected anomalies.",
    ai: "Train a Deep Reinforcement Learning (DRL) agent (PPO algorithm) in a simulated AWS-like cloud environment (using LocalStack). The agent's state space includes current IAM policy configuration, active alerts, user behavior anomalies, and resource access patterns. Actions include: tighten permission, revoke session token, quarantine instance, generate incident report. Reward function balances security posture improvement with minimal operational disruption.",
    tools: ["Python", "Stable-Baselines3 (PPO)", "LocalStack (AWS simulation)", "AWS IAM Policy Simulator", "OpenAI Gym (custom environment)", "CloudTrail logs", "Boto3"],
    outcome:
      "An autonomous cloud security agent that demonstrates adaptive threat response — tightening IAM policies and isolating compromised resources 10x faster than human-driven playbooks. A breakthrough concept in autonomous security operations.",
  },
  {
    id: 9,
    tag: "🔍 Research",
    tagColor: "#0ea5e9",
    title: "XplainSOC: Explainable AI System for SIEM Alert Triage and Analyst Decision Support",
    domain: "Security Operations / XAI",
    difficulty: "Medium",
    novelty: "★★★☆☆",
    problem:
      "Security Operations Centers (SOCs) are overwhelmed by thousands of daily SIEM alerts, with analyst fatigue causing 50–70% of alerts to go uninvestigated. Existing ML-based alert prioritization systems are black boxes that analysts distrust — they cannot explain WHY an alert is high priority.",
    ai: "Train a gradient-boosted ensemble (XGBoost/LightGBM) on historical SIEM alert data labeled by analyst outcomes (true positive / false positive). Integrate SHAP (SHapley Additive exPlanations) to generate natural-language explanations: 'This alert is HIGH priority because: source IP has 3 prior failed authentications, destination is a sensitive server, and time-of-day is outside working hours.' A LIME-based what-if interface lets analysts probe the model interactively.",
    tools: ["Python", "XGBoost / LightGBM", "SHAP", "LIME", "Splunk / Elastic SIEM (log ingestion)", "MITRE ATT&CK Framework", "React (analyst dashboard)", "UNSW-NB15 Dataset"],
    outcome:
      "An explainable alert triage system that reduces analyst false-positive investigation time by an estimated 40% while building trust in AI-assisted SOC workflows. Directly addresses the critical SOC analyst shortage crisis in cybersecurity.",
  },
  {
    id: 10,
    tag: "🧬 Emerging",
    tagColor: "#ec4899",
    title: "BioContinuous: Behavioral Biometrics Engine for Zero-Trust Continuous Authentication",
    domain: "Identity Security / Behavioral AI",
    difficulty: "Medium-High",
    novelty: "★★★★☆",
    problem:
      "Traditional authentication (passwords, MFA) is a one-time gate. Once an attacker steals a session token or passes authentication, they have unrestricted access. Zero-trust requires continuously verifying user identity throughout a session — current biometric systems cannot do this invisibly.",
    ai: "Collect passive behavioral signals (typing rhythm/dwell time, mouse movement dynamics, scroll patterns, touchscreen pressure) and train a Siamese Neural Network to build a unique behavioral fingerprint per user. During an active session, a sliding window of behavior is compared to the enrollment profile using contrastive learning. A confidence score triggers step-up authentication when deviation exceeds a learned threshold.",
    tools: ["Python", "PyTorch (Siamese Network)", "JavaScript (browser behavioral telemetry)", "Flask/FastAPI", "One-class SVM (baseline comparison)", "BioChron / BBMAS Dataset", "React (demo portal)"],
    outcome:
      "A transparent, zero-friction continuous authentication system that detects session hijacking and insider threats in real-time without requiring explicit user interaction. Highly applicable to banking, healthcare, and government portals.",
  },
  {
    id: 11,
    tag: "🌐 Network",
    tagColor: "#10b981",
    title: "DNSExfilDetect: Deep Learning System for DNS-Based Data Exfiltration Detection",
    domain: "Network Security / Deep Learning",
    difficulty: "Medium",
    novelty: "★★★☆☆",
    problem:
      "DNS tunneling is a stealthy data exfiltration technique where attackers encode stolen data within DNS query strings, bypassing traditional firewalls and DLP tools that don't inspect DNS deeply. It's used in APT campaigns and is notoriously difficult to detect without ML.",
    ai: "Train a 1D Convolutional Neural Network on character-level features of DNS query strings: query length distribution, Shannon entropy of subdomains, query frequency per domain, unique subdomain count, and lexical n-gram patterns. A secondary LSTM models temporal query patterns per client IP. The combined model distinguishes malicious tunneling traffic from legitimate CDN and cloud traffic with high precision.",
    tools: ["Python", "PyTorch (CNN + LSTM)", "Zeek / Suricata (DNS log extraction)", "CIRA-CIC-DoHBrw Dataset", "Scapy (traffic generation)", "ELK Stack (log pipeline)", "Wireshark"],
    outcome:
      "A passive network sensor that detects DNS exfiltration and tunneling tools (Iodine, DNSCat2, dnscat) in real-time from network tap data. Deployable at enterprise DNS resolvers as a low-overhead detection layer with near-zero false positive rate on legitimate traffic.",
  },
  {
    id: 12,
    tag: "🧠 AI-Native",
    tagColor: "#f59e0b",
    title: "VulnScan-GPT: LLM-Augmented Static Code Analysis for Zero-Day Vulnerability Discovery",
    domain: "Application Security / LLM + SAST",
    difficulty: "High",
    novelty: "★★★★☆",
    problem:
      "Traditional Static Application Security Testing (SAST) tools rely on pattern matching and produce massive numbers of false positives, causing developer fatigue. They miss complex, multi-step vulnerabilities (business logic flaws, second-order SQL injections, deserialization chains) that require reasoning across code context.",
    ai: "Build a pipeline that decomposes source code into function-level chunks and passes them through a fine-tuned Code LLM (CodeBERT or fine-tuned GPT-4o) with a specialized security reasoning prompt chain. The LLM reasons about data flow, taint analysis, and vulnerability patterns (OWASP Top 10, CWE taxonomy). A confidence-ranked output with CWE classification and remediation suggestions is generated. Results are cross-validated against traditional AST-based analysis to reduce false positives.",
    tools: ["Python", "CodeBERT / GPT-4o API", "LangChain", "Semgrep (AST baseline)", "Joern (Code Property Graph)", "OWASP Benchmark", "Juliet Test Suite (CWE dataset)", "VSCode Extension (output UI)"],
    outcome:
      "A hybrid SAST tool that discovers vulnerability classes missed by traditional tools — particularly logic flaws and injection chains — with LLM-generated fix suggestions. Reduces false positive rates vs. standalone SAST by ~35% in benchmark testing. Strong AppSec and DevSecOps career relevance.",
  },
];

const difficultyColors = {
  "Medium": "#10b981",
  "Medium-High": "#f59e0b",
  "High": "#f97316",
  "Very High": "#ef4444",
};

const domainIcons = {
  "Phishing / NLP": "📧",
  "Network Security / Federated ML": "🔗",
  "AI Security / Meta-Security": "🛡️",
  "Deepfake Security / Computer Vision": "👁️",
  "Malware Detection / Behavioral Analysis": "🦠",
  "IoT Security / Graph ML": "📡",
  "Social Engineering / LLM Security": "🎭",
  "Cloud Security / Reinforcement Learning": "☁️",
  "Security Operations / XAI": "🔎",
  "Identity Security / Behavioral AI": "🔐",
  "Network Security / Deep Learning": "🌐",
  "Application Security / LLM + SAST": "💻",
};

export default function App() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const tags = ["All", "🔥 Trending", "🚀 Novel", "🔍 Research", "🧠 AI-Native", "🌐 Network", "☁️ Cloud", "🌐 IoT", "🧬 Emerging"];

  const filtered = projects.filter((p) => {
    const tagMatch = filter === "All" || p.tag === filter;
    const searchMatch =
      search === "" ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.domain.toLowerCase().includes(search.toLowerCase());
    return tagMatch && searchMatch;
  });

  const proj = selected !== null ? projects.find((p) => p.id === selected) : null;

  return (
    <div style={{ fontFamily: "'IBM Plex Mono', 'Courier New', monospace", background: "#080c14", minHeight: "100vh", color: "#c8d6e5" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0d1520; }
        ::-webkit-scrollbar-thumb { background: #1e3a5f; border-radius: 3px; }
        .card:hover { border-color: #2563eb !important; transform: translateY(-2px); box-shadow: 0 8px 32px rgba(37,99,235,0.15) !important; }
        .card { transition: all 0.2s ease; cursor: pointer; }
        .filter-btn:hover { background: #1e3a5f !important; }
        .tool-tag { display: inline-block; background: #0d1e33; border: 1px solid #1e3a5f; color: #60a5fa; padding: 2px 8px; border-radius: 3px; font-size: 11px; margin: 2px; }
        .close-btn:hover { background: #1e3a5f !important; }
        .overlay { animation: fadeIn 0.15s ease; }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        .modal { animation: slideUp 0.2s ease; }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
        .search-input:focus { outline: none; border-color: #2563eb !important; }
        .section-header { color: #3b82f6; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 6px; }
      `}</style>

      {/* Header */}
      <div style={{ borderBottom: "1px solid #1e2d45", padding: "28px 32px 20px", background: "linear-gradient(180deg, #0a1628 0%, #080c14 100%)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <span style={{ background: "#2563eb", color: "#fff", padding: "2px 8px", fontSize: 10, letterSpacing: 2, fontWeight: 700 }}>FYP GUIDE</span>
            <span style={{ color: "#3b82f6", fontSize: 11 }}>// AI × CYBERSECURITY</span>
          </div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(22px, 4vw, 36px)", fontWeight: 800, color: "#f0f6ff", margin: "0 0 6px", letterSpacing: -0.5 }}>
            Final Year Project Ideas
            <span style={{ color: "#2563eb" }}>_</span>
          </h1>
          <p style={{ color: "#607d9a", fontSize: 13, margin: 0 }}>
            12 research-grade projects combining Artificial Intelligence & Cybersecurity · BE Capstone 2024–25
          </p>
          <div style={{ display: "flex", gap: 24, marginTop: 16 }}>
            {[["12", "Projects"], ["5", "Domains"], ["3+", "Novel/Emerging"], ["4–6", "Month Scope"]].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#2563eb", fontFamily: "'Syne', sans-serif" }}>{n}</div>
                <div style={{ fontSize: 10, color: "#607d9a", letterSpacing: 1 }}>{l.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ padding: "16px 32px", borderBottom: "1px solid #1e2d45", background: "#0a1628" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
          <input
            className="search-input"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search projects..."
            style={{ background: "#0d1e33", border: "1px solid #1e3a5f", color: "#c8d6e5", padding: "6px 12px", fontSize: 12, borderRadius: 4, fontFamily: "inherit", width: 200 }}
          />
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {tags.map(t => (
              <button
                key={t}
                className="filter-btn"
                onClick={() => setFilter(t)}
                style={{
                  background: filter === t ? "#2563eb" : "#0d1e33",
                  border: `1px solid ${filter === t ? "#2563eb" : "#1e3a5f"}`,
                  color: filter === t ? "#fff" : "#607d9a",
                  padding: "4px 10px",
                  fontSize: 11,
                  cursor: "pointer",
                  borderRadius: 3,
                  fontFamily: "inherit",
                  transition: "all 0.15s"
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 16 }}>
          {filtered.map((p) => (
            <div
              key={p.id}
              className="card"
              onClick={() => setSelected(p.id)}
              style={{
                background: "#0d1520",
                border: "1px solid #1e2d45",
                borderRadius: 6,
                padding: 20,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Subtle left accent */}
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: p.tagColor, borderRadius: "6px 0 0 6px" }} />

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <span style={{ background: p.tagColor + "22", color: p.tagColor, border: `1px solid ${p.tagColor}44`, padding: "2px 8px", fontSize: 10, borderRadius: 3, fontWeight: 600 }}>
                  {p.tag}
                </span>
                <span style={{ fontSize: 18 }}>{domainIcons[p.domain] || "🔒"}</span>
              </div>

              <div style={{ fontSize: 11, color: "#3b82f6", marginBottom: 6, letterSpacing: 0.5 }}>#{String(p.id).padStart(2, "0")} · {p.domain}</div>

              <h3 style={{ fontSize: 13.5, fontWeight: 600, color: "#e2ebf7", margin: "0 0 10px", lineHeight: 1.4, fontFamily: "'Syne', sans-serif" }}>
                {p.title}
              </h3>

              <p style={{ fontSize: 11.5, color: "#607d9a", margin: "0 0 12px", lineHeight: 1.6 }}>
                {p.problem.slice(0, 130)}...
              </p>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <span style={{ fontSize: 10, color: "#607d9a" }}>DIFFICULTY: </span>
                  <span style={{ fontSize: 10, color: difficultyColors[p.difficulty], fontWeight: 600 }}>{p.difficulty}</span>
                </div>
                <div>
                  <span style={{ fontSize: 10, color: "#607d9a" }}>NOVELTY: </span>
                  <span style={{ fontSize: 10, color: "#f59e0b" }}>{p.novelty}</span>
                </div>
                <span style={{ fontSize: 10, color: "#2563eb", border: "1px solid #1e3a5f", padding: "2px 7px", borderRadius: 3 }}>VIEW →</span>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", color: "#607d9a", padding: 48, fontSize: 13 }}>
            No projects match your filter. Try a different tag or search term.
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {proj && (
        <div
          className="overlay"
          onClick={(e) => e.target === e.currentTarget && setSelected(null)}
          style={{ position: "fixed", inset: 0, background: "rgba(4,8,20,0.92)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 24 }}
        >
          <div
            className="modal"
            style={{ background: "#0d1520", border: "1px solid #2563eb44", borderRadius: 8, maxWidth: 760, width: "100%", maxHeight: "88vh", overflow: "hidden", display: "flex", flexDirection: "column" }}
          >
            {/* Modal header */}
            <div style={{ padding: "18px 24px 16px", borderBottom: "1px solid #1e2d45", background: "#0a1628", flexShrink: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
                    <span style={{ background: proj.tagColor + "22", color: proj.tagColor, border: `1px solid ${proj.tagColor}44`, padding: "2px 8px", fontSize: 10, borderRadius: 3, fontWeight: 600 }}>{proj.tag}</span>
                    <span style={{ fontSize: 10, color: "#607d9a" }}>#{String(proj.id).padStart(2, "0")} · {proj.domain}</span>
                  </div>
                  <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 17, fontWeight: 800, color: "#f0f6ff", margin: 0, lineHeight: 1.3 }}>{proj.title}</h2>
                </div>
                <button
                  className="close-btn"
                  onClick={() => setSelected(null)}
                  style={{ background: "#1e2d45", border: "1px solid #2d4060", color: "#c8d6e5", width: 28, height: 28, borderRadius: 4, cursor: "pointer", fontSize: 14, fontFamily: "inherit", flexShrink: 0, marginLeft: 12 }}
                >✕</button>
              </div>
              <div style={{ display: "flex", gap: 20, marginTop: 10 }}>
                <div><span style={{ fontSize: 10, color: "#607d9a" }}>DIFFICULTY: </span><span style={{ fontSize: 10, color: difficultyColors[proj.difficulty], fontWeight: 700 }}>{proj.difficulty}</span></div>
                <div><span style={{ fontSize: 10, color: "#607d9a" }}>NOVELTY: </span><span style={{ fontSize: 10, color: "#f59e0b" }}>{proj.novelty}</span></div>
                <div><span style={{ fontSize: 10, color: "#607d9a" }}>TIMELINE: </span><span style={{ fontSize: 10, color: "#10b981" }}>4–6 Months</span></div>
              </div>
            </div>

            {/* Modal body */}
            <div style={{ padding: "20px 24px", overflowY: "auto" }}>
              <div style={{ marginBottom: 20 }}>
                <div className="section-header">⚠ Problem Statement</div>
                <p style={{ fontSize: 13, lineHeight: 1.75, color: "#9ab0c8", margin: 0, background: "#070d1a", padding: 14, borderRadius: 4, borderLeft: "3px solid #f97316" }}>{proj.problem}</p>
              </div>

              <div style={{ marginBottom: 20 }}>
                <div className="section-header">🤖 How AI Is Used</div>
                <p style={{ fontSize: 13, lineHeight: 1.75, color: "#9ab0c8", margin: 0, background: "#070d1a", padding: 14, borderRadius: 4, borderLeft: "3px solid #2563eb" }}>{proj.ai}</p>
              </div>

              <div style={{ marginBottom: 20 }}>
                <div className="section-header">🔧 Key Technologies & Tools</div>
                <div style={{ background: "#070d1a", padding: 14, borderRadius: 4, borderLeft: "3px solid #7c3aed" }}>
                  {proj.tools.map(t => <span key={t} className="tool-tag">{t}</span>)}
                </div>
              </div>

              <div>
                <div className="section-header">🎯 Expected Outcome & Impact</div>
                <p style={{ fontSize: 13, lineHeight: 1.75, color: "#9ab0c8", margin: 0, background: "#070d1a", padding: 14, borderRadius: 4, borderLeft: "3px solid #10b981" }}>{proj.outcome}</p>
              </div>
            </div>

            {/* Modal footer */}
            <div style={{ padding: "12px 24px", borderTop: "1px solid #1e2d45", background: "#0a1628", flexShrink: 0, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 11, color: "#607d9a" }}>Click outside to close</span>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => setSelected(proj.id > 1 ? proj.id - 1 : projects.length)} style={{ background: "#1e2d45", border: "1px solid #2d4060", color: "#c8d6e5", padding: "5px 12px", fontSize: 11, cursor: "pointer", borderRadius: 3, fontFamily: "inherit" }}>← Prev</button>
                <button onClick={() => setSelected(proj.id < projects.length ? proj.id + 1 : 1)} style={{ background: "#2563eb", border: "none", color: "#fff", padding: "5px 12px", fontSize: 11, cursor: "pointer", borderRadius: 3, fontFamily: "inherit" }}>Next →</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{ borderTop: "1px solid #1e2d45", padding: "16px 32px", textAlign: "center" }}>
        <p style={{ fontSize: 11, color: "#2d4060", margin: 0 }}>
          Senior Cybersecurity Researcher & FYP Mentor · AI × Cybersecurity Project Guide 2024–25 · Click any card to explore the full project brief
        </p>
      </div>
    </div>
  );
}
