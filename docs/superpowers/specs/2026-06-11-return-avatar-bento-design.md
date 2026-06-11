# Specification: Return Avatar inside Bento Grid

## Goal
Refactor the Welcome card in BentoGrid to use the BentoCard component instead of a raw div, keeping the avatar image inside it.

## Approach
- Modify `src/components/ui/BentoGrid.tsx`
- Replace the raw `div` of the Welcome card (col-span-12 md:col-span-6 md:row-span-2) with `<BentoCard>`
- Clean up duplicate/redundant padding and rounded classes (like `p-8` and `rounded-[1.8rem]`) that are already provided by `BentoCard`
- Keep all inner content (text, avatar image) exactly the same.
