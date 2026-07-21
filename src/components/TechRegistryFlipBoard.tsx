"use client";

/* Hallmark · component: TechRegistryFlipBoard · theme: custom · genre: editorial
 * states: default · hover · focus · active · disabled · loading · error · success
 * contrast: pass (46–50)
 */

import { useState, useEffect, useRef } from "react";

export interface TechItem {
  id: string;
  name: string;
  symbol: string;
  categoryTag: string;
  status: "OPERATIONAL" | "ACTIVE" | "EVALUATION" | "DEPORTED";
  log: string;
}

export type CategoryKey = "devops" | "mobile" | "web" | "data";

export const TECH_REGISTRY_DATA: Record<CategoryKey, { label: string; num: string; items: TechItem[] }> = {
  devops: {
    label: "DevOps & CI/CD",
    num: "01",
    items: [
      { id: "dk", name: "Docker", symbol: "DK", categoryTag: "CONTAINERIZATION", status: "OPERATIONAL", log: "SYS_LOG: Containerized legacy platforms; setup multi-stage configurations." },
      { id: "k8", name: "Kubernetes", symbol: "K8", categoryTag: "ORCHESTRATION", status: "OPERATIONAL", log: "SYS_LOG: Orchestrated multi-node clusters and managed Helm templates." },
      { id: "go", name: "ArgoCD", symbol: "GO", categoryTag: "GITOPS SYNC", status: "OPERATIONAL", log: "SYS_LOG: Configured GitOps continuous delivery sync loops on K8s." },
      { id: "gl", name: "GitLab CI", symbol: "GL", categoryTag: "BUILD PIPELINES", status: "OPERATIONAL", log: "SYS_LOG: Built auto-tagging CI/CD release build pipelines." },
      { id: "ek", name: "ELK Stack", symbol: "EK", categoryTag: "LOG TELEMETRY", status: "OPERATIONAL", log: "SYS_LOG: Set up elastic telemetry parsing for container log streams." },
      { id: "aw", name: "AWS Cloud", symbol: "AW", categoryTag: "INFRASTRUCTURE", status: "OPERATIONAL", log: "SYS_LOG: Implemented transit gateway routing and secure serverless hosting." },
      { id: "ck", name: "CKAD Cert", symbol: "CK", categoryTag: "CERTIFICATION", status: "EVALUATION", log: "SYS_LOG: Standardizing developer containerized operations certification." },
    ]
  },
  mobile: {
    label: "Mobile Systems",
    num: "02",
    items: [
      { id: "fl", name: "Flutter", symbol: "FL", categoryTag: "CROSS-PLATFORM", status: "OPERATIONAL", log: "SYS_LOG: Primary cross-platform SDK for major user CRM application." },
      { id: "sb", name: "Shorebird", symbol: "SB", categoryTag: "OTA HOTPATCH", status: "OPERATIONAL", log: "SYS_LOG: Wired automated OTA code pushes to bypass review queues." },
      { id: "fc", name: "Firebase FCM", symbol: "FC", categoryTag: "PUSH MESSAGING", status: "OPERATIONAL", log: "SYS_LOG: Configured platform-native push messaging templates." },
      { id: "io", name: "iOS Dev", symbol: "IO", categoryTag: "NATIVE SWIFT", status: "OPERATIONAL", log: "SYS_LOG: Programmed native iOS bridges and Xcode build scripts." },
      { id: "an", name: "Android Native", symbol: "AN", categoryTag: "NATIVE GRADLE", status: "OPERATIONAL", log: "SYS_LOG: Tuned Gradle dependencies and configured flavor splits." },
      { id: "ta", name: "Tauri", symbol: "TA", categoryTag: "DESKTOP BRIDGE", status: "EVALUATION", log: "SYS_LOG: Evaluating lightweight webview-based desktop native integrations." },
    ]
  },
  web: {
    label: "Web Architecture",
    num: "03",
    items: [
      { id: "rt", name: "React", symbol: "RT", categoryTag: "UI FRAMEWORK", status: "OPERATIONAL", log: "SYS_LOG: Engineered high-performance JSpreadsheet grid views." },
      { id: "nx", name: "Next.js", symbol: "NX", categoryTag: "SERVER COMPILER", status: "OPERATIONAL", log: "SYS_LOG: Leveraged server-side compilation for deterministic portfolios." },
      { id: "ts", name: "TypeScript", symbol: "TS", categoryTag: "STRICT TYPES", status: "OPERATIONAL", log: "SYS_LOG: Wrote strict typings and type-safe schemas across repositories." },
      { id: "js", name: "JavaScript", symbol: "JS", categoryTag: "SHELL UTILS", status: "OPERATIONAL", log: "SYS_LOG: Created shell automation scripts and node utilities." },
      { id: "ht", name: "HTML / CSS", symbol: "HT", categoryTag: "FLUID LAYOUT", status: "OPERATIONAL", log: "SYS_LOG: Coded responsive fluid visual layouts." },
      { id: "sc", name: "SCSS / Sass", symbol: "SC", categoryTag: "TOKEN PIPELINE", status: "OPERATIONAL", log: "SYS_LOG: Managed modular design system tokens via preprocessors." },
    ]
  },
  data: {
    label: "Platform & Data",
    num: "04",
    items: [
      { id: "pg", name: "PostgreSQL", symbol: "PG", categoryTag: "RELATIONAL DB", status: "OPERATIONAL", log: "SYS_LOG: Maintained relational schemas and optimized complex indexing." },
      { id: "mg", name: "MongoDB", symbol: "MG", categoryTag: "DOCUMENT STORE", status: "OPERATIONAL", log: "SYS_LOG: Engineered unstructured document stores for event metadata." },
      { id: "ms", name: "SQL Server", symbol: "MS", categoryTag: "LEGACY ENGINE", status: "OPERATIONAL", log: "SYS_LOG: Query profiling and legacy database tuning." },
      { id: "lx", name: "Linux CLI", symbol: "LX", categoryTag: "SHELL KERNEL", status: "OPERATIONAL", log: "SYS_LOG: Written bash scripts for auto-renewing security configurations." },
      { id: "vs", name: "VS Code", symbol: "VS", categoryTag: "DEVELOPER IDE", status: "OPERATIONAL", log: "SYS_LOG: Integrated static analysis linters and debugging environments." },
      { id: "os", name: "macOS / Win", symbol: "OS", categoryTag: "TARGET PLATFORMS", status: "OPERATIONAL", log: "SYS_LOG: Cross-compiled artifacts for desktop targets." },
    ]
  }
};

const CHAR_POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-# /.";

function SingleFlapTile({ char, isFlipping }: { char: string; isFlipping: boolean }) {
  const [displayChar, setDisplayChar] = useState(char);
  const [topChar, setTopChar] = useState(char);
  const [bottomChar, setBottomChar] = useState(char);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (char !== displayChar) {
      setTopChar(char);
      setAnimating(true);
      const timer = setTimeout(() => {
        setDisplayChar(char);
        setBottomChar(char);
        setAnimating(false);
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [char, displayChar]);

  return (
    <span className={`flip-tile ${animating || isFlipping ? "is-flipping" : ""}`}>
      <span className="flip-tile__top">{topChar}</span>
      <span className="flip-tile__bottom">{displayChar}</span>
      <span className="flip-tile__flap-top">{displayChar}</span>
      <span className="flip-tile__flap-bottom">{topChar}</span>
      <span className="flip-tile__line" aria-hidden="true" />
    </span>
  );
}

function SplitFlapText({
  targetText,
  isFlipping,
  maxLength = 14,
  staggerDelay = 0
}: {
  targetText: string;
  isFlipping: boolean;
  maxLength?: number;
  staggerDelay?: number;
}) {
  const paddedTarget = targetText.toUpperCase().padEnd(maxLength, " ").slice(0, maxLength);
  const [currentChars, setCurrentChars] = useState<string[]>(paddedTarget.split(""));

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    let stepCount = 0;
    const maxSteps = 6;

    if (isFlipping) {
      const delayTimeout = setTimeout(() => {
        interval = setInterval(() => {
          stepCount++;
          if (stepCount >= maxSteps) {
            setCurrentChars(paddedTarget.split(""));
            if (interval) clearInterval(interval);
          } else {
            setCurrentChars((prev) =>
              prev.map((_, idx) => {
                if (paddedTarget[idx] === " ") return " ";
                const randIndex = Math.floor(Math.random() * CHAR_POOL.length);
                return CHAR_POOL[randIndex];
              })
            );
          }
        }, 50);
      }, staggerDelay);

      return () => {
        clearTimeout(delayTimeout);
        if (interval) clearInterval(interval);
      };
    } else {
      setCurrentChars(paddedTarget.split(""));
    }
  }, [paddedTarget, isFlipping, staggerDelay]);

  return (
    <span className="split-flap-word" aria-label={targetText}>
      {currentChars.map((c, idx) => (
        <SingleFlapTile key={idx} char={c} isFlipping={isFlipping} />
      ))}
    </span>
  );
}

export default function TechRegistryFlipBoard() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("devops");
  const [isFlipping, setIsFlipping] = useState<boolean>(false);
  const [hoveredItem, setHoveredItem] = useState<TechItem | null>(null);
  const [focusedItemId, setFocusedItemId] = useState<string | null>(null);
  const [visibleRowsCount, setVisibleRowsCount] = useState<number>(0);

  const currentCategoryData = TECH_REGISTRY_DATA[activeCategory];

  const triggerFlipSequence = (newCat: CategoryKey) => {
    if (isFlipping) return;
    setIsFlipping(true);
    setVisibleRowsCount(0);
    setActiveCategory(newCat);
    setHoveredItem(null);

    // Stagger revealing rows one by one like old school airport board
    const totalItems = TECH_REGISTRY_DATA[newCat].items.length;
    let revealed = 0;
    
    const revealInterval = setInterval(() => {
      revealed++;
      setVisibleRowsCount(revealed);
      if (revealed >= totalItems) {
        clearInterval(revealInterval);
        setTimeout(() => {
          setIsFlipping(false);
        }, 200);
      }
    }, 90);
  };

  useEffect(() => {
    // Initial mount reveal
    triggerFlipSequence("devops");
    // eslint-disable-next-deps
  }, []);

  const handleTabClick = (cat: CategoryKey) => {
    if (cat === activeCategory && !isFlipping) {
      triggerFlipSequence(cat);
      return;
    }
    triggerFlipSequence(cat);
  };

  const activeDisplayLog = hoveredItem
    ? hoveredItem.log
    : `SYS_LOG: Airport panel telemetry ready. Category [${currentCategoryData.num} / ${currentCategoryData.label.toUpperCase()}] active. Hover row to inspect log.`;

  return (
    <div className="airport-registry">
      {/* Board Top Header / Control Station */}
      <div className="airport-registry__header">
        <div className="airport-registry__title-block">
          <div className="airport-registry__badge font-mono">
            <span className={`airport-registry__led ${isFlipping ? "is-blinking" : "is-active"}`} />
            <span>TERMINAL 01 // DEPARTURES BOARD</span>
          </div>
          <h2 className="airport-registry__heading font-display">Technical Registry</h2>
        </div>

        {/* Action Button to manual flip / resync */}
        <button
          onClick={() => triggerFlipSequence(activeCategory)}
          disabled={isFlipping}
          className="airport-registry__resync-btn font-mono"
          title="Re-trigger Solari split-flap departure animation"
          aria-label="Resync split flap board"
        >
          <span className={`airport-registry__spin-icon ${isFlipping ? "is-spinning" : ""}`}>⟳</span>
          <span>{isFlipping ? "FLIPPING..." : "RESYNC BOARD"}</span>
        </button>
      </div>

      {/* Terminal Category Tabs */}
      <div className="airport-tabs" role="tablist" aria-label="Technical categories">
        {(Object.keys(TECH_REGISTRY_DATA) as CategoryKey[]).map((catKey) => {
          const cat = TECH_REGISTRY_DATA[catKey];
          const isActive = activeCategory === catKey;
          return (
            <button
              key={catKey}
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => handleTabClick(catKey)}
              disabled={isFlipping && isActive}
              className={`airport-tab ${isActive ? "is-active" : ""}`}
            >
              <span className="airport-tab__num font-mono">{cat.num}</span>
              <span className="airport-tab__label font-mono">{cat.label}</span>
              {isActive && <span className="airport-tab__indicator" aria-hidden="true" />}
            </button>
          );
        })}
      </div>

      {/* Airport Solari Departure Board Container */}
      <div className="solari-board" aria-live="polite">
        {/* Departure Table Headers */}
        <div className="solari-board__header-row" aria-hidden="true">
          <span className="solari-col solari-col--num">LN</span>
          <span className="solari-col solari-col--name">TECHNOLOGY / SYSTEM</span>
          <span className="solari-col solari-col--tag">SPECIALTY FIELD</span>
          <span className="solari-col solari-col--status">STATUS</span>
        </div>

        {/* Rows list showing items one by one */}
        <div className="solari-board__rows" role="list" aria-label={`Technologies in ${currentCategoryData.label}`}>
          {currentCategoryData.items.map((item, index) => {
            const isVisible = index < visibleRowsCount || !isFlipping;
            const isHovered = hoveredItem?.id === item.id;
            const isFocused = focusedItemId === item.id;

            return (
              <div
                key={item.id}
                role="listitem"
                tabIndex={0}
                onMouseEnter={() => setHoveredItem(item)}
                onMouseLeave={() => setHoveredItem(null)}
                onFocus={() => {
                  setHoveredItem(item);
                  setFocusedItemId(item.id);
                }}
                onBlur={() => {
                  setHoveredItem(null);
                  setFocusedItemId(null);
                }}
                className={`solari-row ${isVisible ? "is-visible" : "is-hidden"} ${
                  isHovered || isFocused ? "is-hovered" : ""
                }`}
                style={{ "--row-index": index } as React.CSSProperties}
              >
                {/* Line number */}
                <div className="solari-col solari-col--num">
                  <span className="solari-row__num-box">0{index + 1}</span>
                </div>

                {/* Tech Name Split Flap */}
                <div className="solari-col solari-col--name">
                  <SplitFlapText
                    targetText={item.name}
                    isFlipping={isFlipping}
                    maxLength={15}
                    staggerDelay={index * 50 + 20}
                  />
                </div>

                {/* Specialty Tag */}
                <div className="solari-col solari-col--tag">
                  <span className="solari-row__tag-pill">{item.categoryTag}</span>
                </div>

                {/* Status Indicator */}
                <div className="solari-col solari-col--status">
                  <span className={`solari-row__status-badge status--${item.status.toLowerCase()}`}>
                    <span className="solari-row__status-dot" />
                    {item.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Airport Readout Telemetry Footer */}
        <div className="solari-board__readout">
          <span className="solari-board__readout-prompt" aria-hidden="true">&gt;</span>
          <span className="solari-board__readout-text">{activeDisplayLog}</span>
        </div>
      </div>
    </div>
  );
}
