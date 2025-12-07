/* Project Data - shared across pages */
const projects = [
    {
        id: "xoe",
        name: "XoE (X over Ethernet)",
        language: "ANSI-C (C89)",
        description: "Extensible framework for encapsulation of various protocols into Ethernet-transmissible data. Built as a testbed for human-LLM hybrid development with labeled contributions.",
        tags: ["C89", "Networking", "Cross-Platform"],
        github: "https://github.com/hcobbs/xoe",
        repo: "hcobbs/xoe",
        contributions: {
            "CLASSIC": 2,
            "CLASSIC-REVIEW": 1,
            "LLM-ASSISTED": 18,
            "LLM-ARCH": 36,
            "LLM-REVIEW": 3,
            "VIBE": 0
        },
        features: [
            "Network server implementation with cross-platform support",
            "Packet management and protocol definitions",
            "Automatic OS detection and library linking",
            "Strict C89 compliance with full pedantic warnings"
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
            "LLM-ARCH": 3,
            "LLM-REVIEW": 4,
            "VIBE": 0
        },
        features: [
            "Guard bands for buffer overflow/underflow detection",
            "Thread-based memory access control",
            "Optional Feistel cipher encryption at rest",
            "Multi-pass secure wiping of freed memory"
        ]
    }
];

/* Get project by ID */
function getProjectById(id) {
    return projects.find(p => p.id === id);
}
