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
            "CLASSIC": 1,
            "CLASSIC-REVIEW": 0,
            "LLM-ASSISTED": 14,
            "LLM-ARCH": 23,
            "LLM-REVIEW": 2,
            "VIBE": 0
        },
        features: [
            "Network server implementation with cross-platform support",
            "Packet management and protocol definitions",
            "Automatic OS detection and library linking",
            "Strict C89 compliance with full pedantic warnings"
        ]
    }
    /* Add more projects here */
];

/* Get project by ID */
function getProjectById(id) {
    return projects.find(p => p.id === id);
}
