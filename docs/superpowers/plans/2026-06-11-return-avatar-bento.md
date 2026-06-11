# Return Avatar inside Bento Grid Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the Welcome card inside `src/components/ui/BentoGrid.tsx` to use the `<BentoCard>` component instead of a raw `div`, keeping the profile avatar image inside it.

**Architecture:** Use the existing `<BentoCard>` layout component for standardizing grid cards.

**Tech Stack:** Next.js, React, TailwindCSS, TypeScript.

---

### Task 1: Refactor BentoGrid to use BentoCard for the Welcome card

**Files:**
- Modify: `src/components/ui/BentoGrid.tsx`

- [ ] **Step 1: Replace raw div with BentoCard**
  Replace the parent element of the Welcome card with `BentoCard` and remove the redundant `rounded-[1.8rem]` and `p-8` classes since they are already provided by `BentoCard`.

```tsx
        {/* ROW 1 & 2 Left Section: Welcome to Bento Portfolio (col-span-6, row-span-2) */}
        <BentoCard className="col-span-12 md:col-span-6 md:row-span-2 bg-[#F5F2EB] text-[#0F0F0F] flex flex-col justify-between min-h-[340px] hover:shadow-[0_15px_35px_rgba(245,242,235,0.08)]">
          <div className="flex flex-col sm:flex-row gap-6 justify-between items-start">
            <div className="max-w-md">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#1982FC]">
                Welcome to
              </span>
              <h3 className="text-4xl sm:text-5xl font-sans font-[950] tracking-[-0.03em] leading-none uppercase mt-2">
                BENTO PORTFOLIO
              </h3>
              <p className="mt-4 text-xs font-semibold text-[#555555] leading-relaxed">
                Where code meets clean design. Engineering highly automated deployment pipelines and modular cross-platform interfaces.
              </p>
            </div>
            <img 
              src="/avatar.png" 
              alt="Profile Avatar" 
              className="w-24 h-24 rounded-full border-2 border-[#1982FC]/20 shadow-[0_8px_25px_rgba(25,130,252,0.1)] flex-shrink-0"
            />
          </div>
          <div className="flex items-center justify-between mt-8">
            <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#555555]">
              CHUNG HEI // DEVOPS & MOBILE
            </span>
            <div className="w-8 h-8 rounded-full bg-white border border-[#0F0F0F]/10 flex items-center justify-center shadow-sm cursor-pointer hover:scale-110 transition-transform">
              <svg className="w-4 h-4 text-[#0F0F0F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        </BentoCard>
```

- [ ] **Step 2: Run build and lint verification**
  Run: `npm run lint && npm run build`
  Expected: Successful compilation with no ESLint or TypeScript errors.

- [ ] **Step 3: Commit the change**
  Run: `git add src/components/ui/BentoGrid.tsx && git commit -m "refactor(bento): wrap Welcome/Avatar card with BentoCard component"`
