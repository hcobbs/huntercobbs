/* Projects Page - Sidebar Navigation with Full Details */

const GITHUB_API = 'https://api.github.com';
let activeProjectId = null;

/* Configure marked for security */
if (typeof marked !== 'undefined') {
    marked.setOptions({
        headerIds: false,
        mangle: false
    });
}

/* Initialize on page load */
document.addEventListener('DOMContentLoaded', () => {
    const tabsContainer = document.getElementById('projectTabs');
    if (!tabsContainer) return;

    renderProjectTabs();

    /* Load first project by default, or from URL hash */
    const hashId = window.location.hash.slice(1);
    const initialProject = hashId && getProjectById(hashId)
        ? hashId
        : projects[0]?.id;

    if (initialProject) {
        selectProject(initialProject);
    }
});

/* Render sidebar tabs */
function renderProjectTabs() {
    const container = document.getElementById('projectTabs');
    if (!container) return;

    container.innerHTML = projects.map(project => `
        <button class="project-tab" data-id="${project.id}">
            <span class="tab-name">${project.name}</span>
            <span class="tab-lang">${project.language}</span>
        </button>
    `).join('');

    /* Add click handlers */
    container.querySelectorAll('.project-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            selectProject(tab.dataset.id);
        });
    });
}

/* Select and load a project */
function selectProject(projectId) {
    const project = getProjectById(projectId);
    if (!project) return;

    activeProjectId = projectId;

    /* Update URL hash */
    window.location.hash = projectId;

    /* Update active tab */
    document.querySelectorAll('.project-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.id === projectId);
    });

    /* Render static content */
    renderProjectHeader(project);
    renderContributionStats(project);
    renderReviewStatus(project);

    /* Fetch GitHub data */
    fetchAndRenderReadme(project.repo);
    fetchAndRenderCommits(project.repo);
    fetchAndRenderIssues(project.repo);
}

/* Render project header */
function renderProjectHeader(project) {
    document.getElementById('projectTitle').textContent = project.name;
    document.getElementById('projectDescription').textContent = project.description;

    document.getElementById('projectTags').innerHTML = project.tags
        .map(tag => `<span class="project-tag">${tag}</span>`)
        .join('');

    document.getElementById('projectLinks').innerHTML = `
        <a href="${project.github}" class="project-link" target="_blank" rel="noopener noreferrer">
            View on GitHub
        </a>
    `;
}

/* Render contribution stats */
function renderContributionStats(project) {
    const container = document.getElementById('contributionStats');
    const total = Object.values(project.contributions)
        .reduce((sum, val) => sum + val, 0);

    let html = `<p class="stats-total">${total} commits</p>`;

    for (const [label, count] of Object.entries(project.contributions)) {
        if (count > 0) {
            const pct = ((count / total) * 100).toFixed(1);
            const cls = label.toLowerCase().replace(/-/g, '-');
            html += `
                <div class="stat-bar">
                    <span class="stat-label">[${label}]</span>
                    <div class="stat-visual">
                        <div class="stat-fill ${cls}" style="width: ${pct}%"></div>
                    </div>
                    <span class="stat-value">${count}</span>
                </div>
            `;
        }
    }

    container.innerHTML = html;
}

/* Render review status badges */
function renderReviewStatus(project) {
    const container = document.getElementById('reviewStatus');
    if (!container || !project.reviews) {
        if (container) {
            container.innerHTML = '<p class="review-none">No reviews</p>';
        }
        return;
    }

    let html = '';
    const reviewTypes = [
        { key: 'security', label: 'Security Audit' },
        { key: 'codeReview', label: 'Code Review' }
    ];

    for (const type of reviewTypes) {
        const review = project.reviews[type.key];
        if (!review || review.status === 'none' || review.rounds.length === 0) {
            html += `
                <div class="review-row">
                    <span class="review-label">${type.label}:</span>
                    <span class="review-none">None</span>
                </div>
            `;
        } else {
            const labelHtml = review.baseUrl
                ? `<a href="${escapeHtml(review.baseUrl)}" target="_blank" rel="noopener noreferrer">${type.label}:</a>`
                : `${type.label}:`;

            const badgesHtml = review.rounds.map((round, idx) => {
                const url = review.baseUrl ? `${review.baseUrl}/${round.folder}` : '#';
                const title = `Round ${idx + 1}: ${round.date} (${round.severity})`;
                return `<a href="${escapeHtml(url)}"
                           class="review-badge severity-${round.severity}"
                           target="_blank"
                           rel="noopener noreferrer"
                           title="${escapeHtml(title)}">${idx + 1}</a>`;
            }).join('');

            html += `
                <div class="review-row">
                    <span class="review-label">${labelHtml}</span>
                    <div class="review-rounds">${badgesHtml}</div>
                </div>
            `;
        }
    }

    container.innerHTML = html;
}

/* Fetch and render README */
async function fetchAndRenderReadme(repo) {
    const container = document.getElementById('readmeContent');
    container.innerHTML = '<p class="loading-text">Fetching README...</p>';

    try {
        const res = await fetch(`${GITHUB_API}/repos/${repo}/readme`, {
            headers: { 'Accept': 'application/vnd.github.v3.raw' }
        });

        if (!res.ok) throw new Error('README not found');

        const markdown = await res.text();
        container.innerHTML = sanitizeHtml(marked.parse(markdown));

        /* Add GitHub-style IDs to headings for TOC links */
        container.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
            const slug = heading.textContent
                .toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .trim();
            heading.id = slug;
        });

        /* Fix relative links to point to GitHub */
        const ghBlob = `https://github.com/${repo}/blob/main`;
        const ghRaw = `https://raw.githubusercontent.com/${repo}/main`;

        container.querySelectorAll('a').forEach(a => {
            const href = a.getAttribute('href');
            if (href && !href.startsWith('http') && !href.startsWith('#')) {
                a.href = `${ghBlob}/${href.replace(/^\.\//, '')}`;
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
            } else if (href && href.startsWith('http')) {
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
            }
        });

        container.querySelectorAll('img').forEach(img => {
            const src = img.getAttribute('src');
            if (src && !src.startsWith('http')) {
                img.src = `${ghRaw}/${src.replace(/^\.\//, '')}`;
            }
        });
    } catch (err) {
        container.innerHTML = '<p class="error-text">Could not load README</p>';
    }
}

/* Fetch and render commits */
async function fetchAndRenderCommits(repo) {
    const container = document.getElementById('recentCommits');
    container.innerHTML = '<p class="loading-text">Fetching commits...</p>';

    try {
        const res = await fetch(`${GITHUB_API}/repos/${repo}/commits?per_page=10`);
        if (!res.ok) throw new Error('Failed to fetch commits');

        const commits = await res.json();

        if (commits.length === 0) {
            container.innerHTML = '<p class="empty-text">No commits yet</p>';
            return;
        }

        container.innerHTML = commits.map(commit => {
            const msg = commit.commit.message.split('\n')[0];
            const date = new Date(commit.commit.author.date);
            const dateStr = date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
            });

            const labelMatch = msg.match(/^\[([A-Z-]+)\]/);
            const label = labelMatch ? labelMatch[1] : null;
            const cleanMsg = msg.replace(/^\[[A-Z-]+\]\s*/, '');

            return `
                <div class="commit-item">
                    <div class="commit-meta">
                        <span class="commit-date">${dateStr}</span>
                        ${label ? `<span class="commit-label">[${label}]</span>` : ''}
                    </div>
                    <p class="commit-message">${escapeHtml(cleanMsg)}</p>
                    <a href="${commit.html_url}" class="commit-link" target="_blank" rel="noopener noreferrer">
                        ${commit.sha.substring(0, 7)}
                    </a>
                </div>
            `;
        }).join('');
    } catch (err) {
        container.innerHTML = '<p class="error-text">Could not load commits</p>';
    }
}

/* Fetch and render issues/PRs */
async function fetchAndRenderIssues(repo) {
    const container = document.getElementById('issuesList');
    container.innerHTML = '<p class="loading-text">Fetching issues...</p>';

    try {
        const res = await fetch(
            `${GITHUB_API}/repos/${repo}/issues?state=all&per_page=10&sort=updated`
        );
        if (!res.ok) throw new Error('Failed to fetch issues');

        const issues = await res.json();

        if (issues.length === 0) {
            container.innerHTML = '<p class="empty-text">No issues or PRs</p>';
            return;
        }

        container.innerHTML = issues.map(issue => {
            const isPR = !!issue.pull_request;
            const icon = isPR ? 'PR' : '#';
            const stateClass = issue.state === 'open' ? 'state-open' : 'state-closed';

            return `
                <div class="issue-item">
                    <span class="issue-icon ${stateClass}">${icon}</span>
                    <div class="issue-content">
                        <a href="${issue.html_url}" class="issue-title" target="_blank" rel="noopener noreferrer">
                            ${escapeHtml(issue.title)}
                        </a>
                        <span class="issue-number">#${issue.number}</span>
                    </div>
                </div>
            `;
        }).join('');
    } catch (err) {
        container.innerHTML = '<p class="error-text">Could not load issues</p>';
    }
}

/* Escape HTML */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/* Sanitize HTML - remove dangerous elements and attributes */
function sanitizeHtml(html) {
    const div = document.createElement('div');
    div.innerHTML = html;

    /* Remove script tags */
    div.querySelectorAll('script').forEach(el => el.remove());

    /* Remove event handlers and javascript: URLs */
    div.querySelectorAll('*').forEach(el => {
        Array.from(el.attributes).forEach(attr => {
            if (attr.name.startsWith('on') ||
                (attr.name === 'href' && attr.value.toLowerCase().startsWith('javascript:')) ||
                (attr.name === 'src' && attr.value.toLowerCase().startsWith('javascript:'))) {
                el.removeAttribute(attr.name);
            }
        });
    });

    /* Remove iframes, objects, embeds */
    div.querySelectorAll('iframe, object, embed, form').forEach(el => el.remove());

    return div.innerHTML;
}
