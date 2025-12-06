/* Project Data */
const projects = [
    {
        name: "XoE (X over Ethernet)",
        language: "ANSI-C (C89)",
        description: "Extensible framework for encapsulation of various protocols into Ethernet-transmissible data. Built as a testbed for human-LLM hybrid development with labeled contributions.",
        tags: ["C89", "Networking", "Cross-Platform"],
        github: "https://github.com/hcobbs/xoe",
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
    /* Add more projects here in the future */
];

/* Render Projects */
function renderProjects() {
    const grid = document.getElementById('projectsGrid');

    projects.forEach(project => {
        const card = createProjectCard(project);
        grid.appendChild(card);
    });
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';

    /* Calculate total commits for percentage */
    const totalCommits = Object.values(project.contributions)
        .reduce((sum, val) => sum + val, 0);

    /* Build contribution stats HTML */
    let statsHTML = '';
    for (const [label, count] of Object.entries(project.contributions)) {
        if (count > 0) {
            const percentage = ((count / totalCommits) * 100).toFixed(1);
            const labelClass = label.toLowerCase().replace(/-/g, '-');
            statsHTML += `
                <div class="stat-bar">
                    <span class="stat-label">[${label}]</span>
                    <div class="stat-visual">
                        <div class="stat-fill ${labelClass}"
                             style="width: ${percentage}%"></div>
                    </div>
                    <span class="stat-value">${count}</span>
                </div>
            `;
        }
    }

    /* Build tags HTML */
    const tagsHTML = project.tags
        .map(tag => `<span class="project-tag">${tag}</span>`)
        .join('');

    /* Build features HTML if available */
    let featuresHTML = '';
    if (project.features && project.features.length > 0) {
        featuresHTML = `
            <ul style="margin: 1rem 0; padding-left: 1.5rem; color: var(--text-light);">
                ${project.features.map(f => `<li style="margin-bottom: 0.5rem;">${f}</li>`).join('')}
            </ul>
        `;
    }

    card.innerHTML = `
        <h3>${project.name}</h3>
        <div class="project-meta">
            ${tagsHTML}
        </div>
        <p class="project-description">${project.description}</p>
        ${featuresHTML}
        <div class="project-stats">
            <h4>Contribution Breakdown (${totalCommits} commits)</h4>
            <div class="stats-bars">
                ${statsHTML}
            </div>
        </div>
        <div class="project-links">
            <a href="${project.github}" class="project-link" target="_blank">View on GitHub</a>
        </div>
    `;

    return card;
}

/* Initialize on page load */
document.addEventListener('DOMContentLoaded', () => {
    renderProjects();

    /* Animate stat bars on scroll into view */
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fills = entry.target.querySelectorAll('.stat-fill');
                fills.forEach(fill => {
                    const width = fill.style.width;
                    fill.style.width = '0%';
                    setTimeout(() => {
                        fill.style.width = width;
                    }, 100);
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    /* Observe all project cards */
    setTimeout(() => {
        document.querySelectorAll('.project-card').forEach(card => {
            observer.observe(card);
        });
    }, 100);
});
