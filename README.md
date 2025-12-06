# Hunter Cobbs - AI-Augmented Development Portfolio

Static website showcasing projects built using hybrid human-LLM development methodology with transparent contribution tracking.

## Tech Stack

- Plain HTML/CSS/JavaScript (no build system)
- Vanilla JS for dynamic content rendering
- GitHub Pages ready

## Project Structure

```
.
├── index.html          # Main portfolio page
├── css/
│   └── style.css      # Styling and responsive design
├── js/
│   └── main.js        # Project data and rendering logic
└── README.md          # This file
```

## Adding New Projects

To add a new project to the portfolio, edit `js/main.js` and add a new object to the `projects` array:

```javascript
{
    name: "Project Name",
    language: "Language/Tech",
    description: "Brief description of the project",
    tags: ["Tag1", "Tag2", "Tag3"],
    github: "https://github.com/yourusername/repo",
    contributions: {
        "CLASSIC": 0,
        "CLASSIC-REVIEW": 0,
        "LLM-ASSISTED": 0,
        "LLM-ARCH": 0,
        "LLM-REVIEW": 0,
        "VIBE": 0
    },
    features: [
        "Feature 1 description",
        "Feature 2 description"
    ]
}
```

## Contribution Labels

Projects track development methodology using standardized labels:

- **[CLASSIC]** - Traditional hand-coded implementation without AI assistance
- **[CLASSIC-REVIEW]** - Traditional human-run code review
- **[LLM-ASSISTED]** - Code written with LLM assistance (pair programming style)
- **[LLM-ARCH]** - Software architect leveraging LLM for code generation while reviewing all plans
- **[LLM-REVIEW]** - LLM-powered code review and resulting fixes
- **[VIBE]** - Experimental or exploratory coding

## Development Workflow

This project follows a branch-based development workflow:

### Branch Naming

- `feature/<description>` - New features or enhancements
- `bugfix/<description>` - Bug fixes
- `refactor/<description>` - Code refactoring
- `test/<description>` - Test additions or improvements

### Commit Labels

All commits should be tagged with contribution labels:

```
[LLM-ARCH] Add project card animation system
[CLASSIC] Fix typo in bio section
[LLM-ASSISTED] Implement responsive grid layout
```

### Workflow

1. Create a new branch from `main`
2. Make changes and commit with appropriate labels
3. Push branch to remote
4. Create pull request to merge into `main`
5. Review and merge (do not commit directly to `main`)

**Exception**: Documentation-only changes (*.md files) may be committed directly to `main`.

## Local Development

Simply open `index.html` in a web browser. No build process required.

## GitHub Pages Deployment

1. Push to GitHub
2. Enable GitHub Pages in repository settings
3. Set source to `main` branch, root directory
4. Site will be available at `https://yourusername.github.io/huntercobbs/`

## License

Personal portfolio - all rights reserved.
