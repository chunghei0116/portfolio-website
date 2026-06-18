# Specification: Resume Card Redesign & Content Copywrite

## 1. Goal
Redesign the career timeline layout into a **Brutalist Coordinate Grid** (Option A) and rewrite the experience descriptions to reflect high-impact technical accomplishments.

## 2. Copy Changes

### AS Watson Group
- **Title**: Mobile Application Developer
- **Original desc**: "Primary developer on 1M Active user CRM in Hong Kong. Flutter Expertised."
- **Rewritten copy**: "Lead Flutter developer responsible for the 1M+ active user CRM application in Hong Kong. Engineered high-availability client architectures and optimized core module load times."

### Asia Allied Infrastructure Group
- **Title**: Programmer
- **Original desc**: "Procurement website, internal Staff app, enterprise / unlisted app release, DevOps / CICD, K8s admin."
- **Rewritten copy**: "Architected secure procurement portals, internal staff platforms, and managed enterprise-grade app store deployments. Set up GitLab/ArgoCD pipelines and EKS container administration."

### EMSD HKSAR
- **Title**: Summer Intern
- **Original desc**: "Mainly assisting System Analyst to bugfix and develop features on government websites."
- **Rewritten copy**: "Collaborated with senior System Analysts to patch, debug, and develop new public-facing features on government municipal websites."

## 3. UI Redesign Details (Option A: Brutalist Coordinate Grid)
- Reorganize timeline entries into a clean vertical list of datasheet rows.
- Remove the complex overlapping vertical line and circle dot design that gets visually clustered.
- Instead, render each entry in a clean structured brutalist table-row block:
  - Left column/tag: `[ 2025 - PRES ]` (Monospaced tag in custom blue border/box).
  - Center/Header: Bold company and role headers separated by vector coordinate arrows (`-->` or similar).
  - Details: Bulleted list describing specific accomplishments under the headings.
  - Border separator: Clean bottom coordinate grid line separating each work record.
- Align this design consistently in both the homepage [TechSection.tsx](file:///Users/jones.tse/development/personal/portfolio-website/src/components/ui/TechSection.tsx) and the biography timeline in [about/page.tsx](file:///Users/jones.tse/development/personal/portfolio-website/src/app/about/page.tsx).
