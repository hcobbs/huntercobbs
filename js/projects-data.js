/* Project Data - shared across pages */
const projects = [
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
        description: "Secure memory pool management library with guard bands, thread ownership enforcement, encryption at rest, and leak detection.",
        tags: ["C89", "Security", "Memory Management"],
        github: "https://github.com/hcobbs/RAMpart",
        repo: "hcobbs/RAMpart",
        contributions: {
            "CLASSIC": 0,
            "CLASSIC-REVIEW": 0,
            "LLM-ASSISTED": 0,
            "LLM-ARCH": 4,
            "LLM-REVIEW": 4,
            "VIBE": 0
        },
        features: [
            "Guard bands for buffer overflow/underflow detection",
            "Thread-based memory access control",
            "Optional Feistel cipher encryption at rest",
            "Multi-pass secure wiping of freed memory"
        ]
    },
    {
        id: "mako",
        name: "Mako",
        language: "Flutter (Dart)",
        description: "Network traffic capture and monitoring app with native packet capture for Android and iOS (VPN-based), plus real-time traffic analysis and anomaly detection.",
        tags: ["Flutter", "Networking", "Mobile", "Android", "iOS"],
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
            "Native packet capture on Android, VPN-based on iOS",
            "Real-time data rate visualization",
            "Traffic pattern analysis and anomaly detection",
            "Configurable rules to flag suspicious network patterns"
        ]
    }
];

/* Get project by ID */
function getProjectById(id) {
    return projects.find(p => p.id === id);
}
