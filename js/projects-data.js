/* Project Data - shared across pages */
const projects = [
    {
        id: "stutter",
        name: "Stutter",
        language: "ANSI-C (C89)",
        description: "Fortuna-based cryptographically secure PRNG library with 32-pool entropy accumulation, AES-256-CTR generation, and thread-safe design. Underwent red-team security audit.",
        tags: ["C89", "Cryptography", "Security", "CSPRNG", "Audited"],
        github: "https://github.com/hcobbs/stutter",
        repo: "hcobbs/stutter",
        contributions: {
            "CLASSIC": 0,
            "CLASSIC-REVIEW": 0,
            "LLM-ASSISTED": 0,
            "LLM-ARCH": 3,
            "LLM-REVIEW": 0,
            "VIBE": 0
        },
        features: [
            "32-pool entropy accumulation with scheduled reseeding",
            "AES-256-CTR generation compatible with NIST standards",
            "Thread-safe design with hierarchical locking and TLS generators",
            "Backtrack and prediction resistance via one-way hashing"
        ]
    },
    {
        id: "xoe",
        name: "XoE (X over Ethernet)",
        language: "ANSI-C (C89)",
        description: "Extensible framework for encapsulation of various protocols into Ethernet-transmissible data. Built as a testbed for human-LLM hybrid development with labeled contributions.",
        tags: ["C89", "Networking", "TLS", "Cross-Platform"],
        github: "https://github.com/hcobbs/xoe",
        repo: "hcobbs/xoe",
        contributions: {
            "CLASSIC": 2,
            "CLASSIC-REVIEW": 2,
            "LLM-ASSISTED": 17,
            "LLM-ARCH": 38,
            "LLM-REVIEW": 2,
            "VIBE": 0
        },
        features: [
            "Multi-threaded TCP server with TLS 1.2/1.3 encryption",
            "Runtime encryption selection (none, TLS 1.2, TLS 1.3)",
            "Cross-platform POSIX support (Linux, macOS, BSD)",
            "Strict C89 compliance with pedantic warnings"
        ]
    },
    {
        id: "rampart",
        name: "RAMpart",
        language: "ANSI-C (C89)",
        description: "Secure memory pool management library with guard bands, thread ownership enforcement, and leak detection. Underwent comprehensive red-team security audit with all 17 identified vulnerabilities remediated.",
        tags: ["C89", "Security", "Memory Management", "Audited"],
        github: "https://github.com/hcobbs/RAMpart",
        repo: "hcobbs/RAMpart",
        contributions: {
            "CLASSIC": 0,
            "CLASSIC-REVIEW": 0,
            "LLM-ASSISTED": 0,
            "LLM-ARCH": 17,
            "LLM-REVIEW": 8,
            "VIBE": 0
        },
        features: [
            "Randomized guard bands with constant-time validation",
            "Thread ownership enforcement with canary protection",
            "Multi-pass secure wiping with random final pass",
            "Defense-in-depth: pool validation, safe unlinking, reentrancy protection"
        ]
    },
    {
        id: "mako",
        name: "Mako",
        language: "Flutter (Dart)",
        description: "Mobile network monitoring app providing transparency into device network activity. Answers the question: what data are your apps actually transmitting?",
        tags: ["Flutter", "Networking", "Mobile", "Android", "iOS", "GPLv3"],
        github: "https://github.com/hcobbs/mako",
        repo: "hcobbs/mako",
        contributions: {
            "CLASSIC": 0,
            "CLASSIC-REVIEW": 0,
            "LLM-ASSISTED": 0,
            "LLM-ARCH": 0,
            "LLM-REVIEW": 0,
            "VIBE": 19
        },
        features: [
            "Packet capture via libpcap FFI (Android) and VPN tunnel (iOS)",
            "Real-time bandwidth visualization per application",
            "Protocol identification and server destination tracking",
            "Rule-based anomaly detection for suspicious network behavior"
        ]
    },
    {
        id: "coral_greif",
        name: "Coral Greif",
        language: "Swift (iOS)",
        description: "WWII Pacific theater tactical naval warfare game. Turn-based Battleship-style combat with historical ship names, no RNG mechanics, and zero ads or microtransactions.",
        tags: ["Swift", "iOS", "SpriteKit", "Game", "GPLv3"],
        github: "https://github.com/hcobbs/coral_greif",
        repo: "hcobbs/coral_greif",
        contributions: {
            "CLASSIC": 0,
            "CLASSIC-REVIEW": 0,
            "LLM-ASSISTED": 0,
            "LLM-ARCH": 10,
            "LLM-REVIEW": 0,
            "VIBE": 2
        },
        features: [
            "Multiple AI difficulty levels with strategic opponents",
            "20-second turn timer for tactical pressure",
            "Deterministic gameplay with no randomness",
            "Player profiles with battle statistics tracking"
        ]
    }
];

/* Get project by ID */
function getProjectById(id) {
    return projects.find(p => p.id === id);
}
