import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// Mock framer-motion to render plain divs/spans
vi.mock("framer-motion", () => {
  const React = require("react");
  const actual = {
    motion: new Proxy(
      {},
      {
        get: (_target: unknown, prop: string) => {
          return React.forwardRef((props: Record<string, unknown>, ref: unknown) => {
            const {
              initial: _initial,
              animate: _animate,
              exit: _exit,
              variants: _variants,
              whileInView: _whileInView,
              viewport: _viewport,
              transition: _transition,
              style,
              ...rest
            } = props;
            return React.createElement(prop, { ...rest, style, ref });
          });
        },
      }
    ),
    useScroll: () => ({ scrollY: { get: () => 0, onChange: () => () => {} } }),
    useTransform: () => 0,
    AnimatePresence: ({ children }: { children: unknown }) => children,
  };
  return actual;
});

// Mock next/link
vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => {
    const React = require("react");
    return React.createElement("a", { href, ...props }, children);
  },
}));

// Mock @base-ui/react/accordion for Curriculum tests
vi.mock("@base-ui/react/accordion", () => {
  const React = require("react");
  const Accordion = {
    Root: React.forwardRef(({ children, className, ...props }: Record<string, unknown>, ref: unknown) =>
      React.createElement("div", { className, ref, ...props }, children)
    ),
    Item: React.forwardRef(({ children, className, ...props }: Record<string, unknown>, ref: unknown) =>
      React.createElement("div", { className, ref, ...props }, children)
    ),
    Header: ({ children, ...props }: Record<string, unknown>) =>
      React.createElement("div", props, children),
    Trigger: React.forwardRef(({ children, className, ...props }: Record<string, unknown>, ref: unknown) =>
      React.createElement("button", { className, ref, ...props }, children)
    ),
    Panel: React.forwardRef(({ children, className, ...props }: Record<string, unknown>, ref: unknown) =>
      React.createElement("div", { className, ref, ...props }, children)
    ),
  };
  return { Accordion };
});

// Mock @base-ui/react/button
vi.mock("@base-ui/react/button", () => {
  const React = require("react");
  const Button = React.forwardRef(
    ({ children, className, render, ...props }: Record<string, unknown>, ref: unknown) => {
      if (render && React.isValidElement(render)) {
        return React.cloneElement(render as React.ReactElement, { className, ref, ...props }, children);
      }
      return React.createElement("button", { className, ref, ...props }, children);
    }
  );
  return { Button };
});

// Mock next/image
vi.mock("next/image", () => ({
  default: ({ src, alt, fill, ...props }: Record<string, unknown>) => {
    const React = require("react");
    return React.createElement("img", { src, alt, ...props });
  },
}));

import { Hero } from "../hero";
import { ProofBar } from "../proof-bar";
import { Problem } from "../problem";
import { HowItWorks } from "../how-it-works";
import { Curriculum } from "../curriculum";
import { Who } from "../who";
import { Why } from "../why";
import { Team } from "../team";
import { Enroll } from "../enroll";
import { FAQ } from "../faq";
import { FinalCTA } from "../final-cta";

// ─── Hero ─────────────────────────────────────────
describe("Hero", () => {
  it("renders cohort pill text with spots remaining", () => {
    render(<Hero />);
    expect(screen.getByText(/Founding cohort/)).toBeInTheDocument();
    expect(screen.getByText(/Spring 2026/)).toBeInTheDocument();
    expect(screen.getByText(/7 of 10 seats/i)).toBeInTheDocument();
  });

  it("renders all headline words", () => {
    render(<Hero />);
    expect(screen.getByText(/Make your team/i)).toBeInTheDocument();
    expect(screen.getByText(/AI\u2011fluent/)).toBeInTheDocument();
  });

  it("renders subtitle text", () => {
    render(<Hero />);
    expect(screen.getByText(/live, instructor-led program/)).toBeInTheDocument();
    expect(screen.getByText(/No coding required/)).toBeInTheDocument();
  });

  it("renders CTA buttons", () => {
    render(<Hero />);
    expect(screen.getByText(/Request a proposal/)).toBeInTheDocument();
    expect(screen.getByText(/View the curriculum/)).toBeInTheDocument();
  });

  it("renders trust indicators", () => {
    render(<Hero />);
    expect(screen.getByText(/Taught by a University of Chicago instructor/)).toBeInTheDocument();
    expect(screen.getByText(/Completion certificate for L&D/)).toBeInTheDocument();
    expect(screen.getByText(/Curriculum tailored to your industry/)).toBeInTheDocument();
  });
});

// ─── ProofBar ─────────────────────────────────────
describe("ProofBar", () => {
  it("renders proof points", () => {
    render(<ProofBar />);
    expect(screen.getByText("University of Chicago")).toBeInTheDocument();
    expect(screen.getByText("8 hours")).toBeInTheDocument();
    expect(screen.getByText("3 deliverables")).toBeInTheDocument();
  });

  it("renders label", () => {
    render(<ProofBar />);
    expect(screen.getByText(/Our team teaches at the University of Chicago/)).toBeInTheDocument();
  });
});

// ─── Problem ──────────────────────────────────────
describe("Problem", () => {
  it("renders section heading", () => {
    render(<Problem />);
    expect(screen.getByText(/AI Skills Gap Is Already/)).toBeInTheDocument();
  });

  it("renders negative checklist items", () => {
    render(<Problem />);
    expect(screen.getByText(/Teams experimenting with AI individually/)).toBeInTheDocument();
    expect(screen.getByText(/No standard for judging/)).toBeInTheDocument();
  });

  it("renders ROI framing", () => {
    render(<Problem />);
    expect(screen.getByText(/2.5 hours\/week/)).toBeInTheDocument();
    expect(screen.getByText(/\$9,750/)).toBeInTheDocument();
    expect(screen.getByText(/What inaction costs/)).toBeInTheDocument();
  });
});

// ─── HowItWorks ───────────────────────────────────
describe("HowItWorks", () => {
  it("renders section header", () => {
    render(<HowItWorks />);
    expect(screen.getByText("Two sessions. Real deliverables.")).toBeInTheDocument();
    expect(screen.getByText("The Program")).toBeInTheDocument();
  });

  it("renders session cards", () => {
    render(<HowItWorks />);
    expect(screen.getByText("Foundation & Fluency")).toBeInTheDocument();
    expect(screen.getByText("Strategy & Mastery")).toBeInTheDocument();
  });

  it("renders deliverables", () => {
    render(<HowItWorks />);
    expect(screen.getByText(/AI Integration Blueprint for your team/)).toBeInTheDocument();
    expect(screen.getByText(/Workflow automation map/)).toBeInTheDocument();
  });

  it("renders outcome card", () => {
    render(<HowItWorks />);
    expect(screen.getByText("What Your Team Leaves With")).toBeInTheDocument();
    expect(screen.getByText(/role-specific tools/)).toBeInTheDocument();
  });
});

// ─── Curriculum ───────────────────────────────────
describe("Curriculum", () => {
  it("renders section header", () => {
    render(<Curriculum />);
    expect(screen.getByText("Curriculum")).toBeInTheDocument();
    expect(screen.getByText(/What you.ll learn/)).toBeInTheDocument();
  });

  it("renders all 8 module titles", () => {
    render(<Curriculum />);
    expect(screen.getByText("The Process Matrix")).toBeInTheDocument();
    expect(screen.getByText("The AI Toolkit")).toBeInTheDocument();
    expect(screen.getByText("Reading a Process")).toBeInTheDocument();
    expect(screen.getByText("Building Your First AI Workflow")).toBeInTheDocument();
    expect(screen.getByText("AI Strategy for Your Team")).toBeInTheDocument();
    expect(screen.getByText("Workflow Guardrails")).toBeInTheDocument();
    expect(screen.getByText("Building AI Culture")).toBeInTheDocument();
    expect(screen.getByText(/90-Day AI Roadmap/)).toBeInTheDocument();
  });

  it("renders session titles", () => {
    render(<Curriculum />);
    expect(screen.getByText(/Session One/)).toBeInTheDocument();
    expect(screen.getByText(/Session Two/)).toBeInTheDocument();
  });
});

// ─── Who ──────────────────────────────────────────
describe("Who", () => {
  it("renders section header", () => {
    render(<Who />);
    expect(screen.getByText(/Who It.s For/)).toBeInTheDocument();
    expect(screen.getByText(/This Is Built for You If/)).toBeInTheDocument();
  });

  it("renders yes items", () => {
    render(<Who />);
    expect(screen.getByText(/non-technical role and feel left behind/)).toBeInTheDocument();
    expect(screen.getByText(/practical skills, not theoretical overviews/)).toBeInTheDocument();
  });

  it("renders no items", () => {
    render(<Who />);
    expect(screen.getByText(/already an AI engineer or developer/)).toBeInTheDocument();
    expect(screen.getByText(/AI is a fad/)).toBeInTheDocument();
  });

  it("renders card titles", () => {
    render(<Who />);
    expect(screen.getByText(/in the right place/)).toBeInTheDocument();
    expect(screen.getByText(/isn.t for you if/)).toBeInTheDocument();
  });
});

// ─── Why ─────────────────────────────────────────
describe("Why", () => {
  it("renders section header", () => {
    render(<Why />);
    expect(screen.getByText("Why This Program")).toBeInTheDocument();
    expect(screen.getByText("Why this program works")).toBeInTheDocument();
  });

  it("renders all three cards", () => {
    render(<Why />);
    expect(screen.getByText("Live, Not Recorded")).toBeInTheDocument();
    expect(screen.getByText("Outcomes, Not Theory")).toBeInTheDocument();
    expect(screen.getByText("8 Hours, Not 8 Weeks")).toBeInTheDocument();
  });

  it("renders card descriptions", () => {
    render(<Why />);
    expect(screen.getByText(/instructor-led with real-time Q&A/)).toBeInTheDocument();
    expect(screen.getByText(/documents they.ll use Monday morning/)).toBeInTheDocument();
    expect(screen.getByText(/Two half-day sessions/)).toBeInTheDocument();
  });
});

// ─── Team ────────────────────────────────────────
describe("Team", () => {
  it("renders section header", () => {
    render(<Team />);
    expect(screen.getByText("Your Instructors")).toBeInTheDocument();
    expect(screen.getByText(/Who.s teaching/)).toBeInTheDocument();
  });

  it("renders Shubham Chandra card", () => {
    render(<Team />);
    expect(screen.getByText("Shubham Chandra")).toBeInTheDocument();
    expect(screen.getByText("Head of Curriculum")).toBeInTheDocument();
    expect(screen.getByText(/Digital Realty/)).toBeInTheDocument();
    expect(screen.getByText(/Teaches AI-driven entrepreneurship at the University of Chicago/)).toBeInTheDocument();
  });

  it("renders JT O'Connor card", () => {
    render(<Team />);
    expect(screen.getByText(/J\.T\. O.Connor/)).toBeInTheDocument();
    expect(screen.getByText("Program Director")).toBeInTheDocument();
    expect(screen.getByText(/operations and business development/)).toBeInTheDocument();
  });

  it("renders team member images", () => {
    render(<Team />);
    expect(screen.getByAltText("Shubham Chandra")).toBeInTheDocument();
    expect(screen.getByAltText(/J\.T\. O.Connor/)).toBeInTheDocument();
  });
});

// ─── Enroll ──────────────────────────────────────
describe("Enroll", () => {
  it("renders section header", () => {
    render(<Enroll />);
    expect(screen.getByText("Enroll")).toBeInTheDocument();
    expect(screen.getByText("Enroll your team")).toBeInTheDocument();
  });

  it("renders spots remaining indicator", () => {
    render(<Enroll />);
    expect(screen.getByText(/7 of 10 founding spots remaining/)).toBeInTheDocument();
  });

  it("renders Individual Enrollment card", () => {
    render(<Enroll />);
    expect(screen.getByText("Individual Enrollment")).toBeInTheDocument();
    expect(screen.getByText("For individuals")).toBeInTheDocument();
    expect(screen.getByText("Both live sessions (8 hours total)")).toBeInTheDocument();
    expect(screen.getByText("Certificate of completion")).toBeInTheDocument();
  });

  it("renders Team Training card", () => {
    render(<Enroll />);
    expect(screen.getByText("Team Training")).toBeInTheDocument();
    expect(screen.getByText("Recommended for organizations")).toBeInTheDocument();
    expect(screen.getByText("5+ seats, custom scheduling")).toBeInTheDocument();
    expect(screen.getByText(/Volume pricing/)).toBeInTheDocument();
  });

  it("renders CTA buttons with correct links", () => {
    render(<Enroll />);
    const proposalBtn = screen.getByText(/Request a proposal/);
    expect(proposalBtn.closest("a")).toHaveAttribute("href", "/contact?type=corporate");
    const startedBtn = screen.getByText(/Get started/);
    expect(startedBtn.closest("a")).toHaveAttribute("href", "/contact");
  });

  it("renders money-back guarantee", () => {
    render(<Enroll />);
    expect(screen.getByText(/refund you. No/)).toBeInTheDocument();
  });
});

// ─── FAQ ─────────────────────────────────────────
describe("FAQ", () => {
  it("renders section header", () => {
    render(<FAQ />);
    expect(screen.getByText("FAQ")).toBeInTheDocument();
    expect(screen.getByText("Common questions")).toBeInTheDocument();
  });

  it("renders all 6 questions", () => {
    render(<FAQ />);
    expect(screen.getByText("Do I need any technical background?")).toBeInTheDocument();
    expect(screen.getByText("Is this online or in-person?")).toBeInTheDocument();
    expect(screen.getByText("What if I miss a session?")).toBeInTheDocument();
    expect(screen.getByText(/different from watching YouTube tutorials/)).toBeInTheDocument();
    expect(screen.getByText(/Will AI replace my job/)).toBeInTheDocument();
    expect(screen.getByText(/corporate or team option/)).toBeInTheDocument();
  });

  it("renders answer content", () => {
    render(<FAQ />);
    expect(screen.getByText(/None. Zero./)).toBeInTheDocument();
    expect(screen.getByText(/Both options are available/)).toBeInTheDocument();
    expect(screen.getByText(/Sessions are recorded in full/)).toBeInTheDocument();
  });

  it("renders corporate FAQ with link", () => {
    render(<FAQ />);
    const link = screen.getByText("Reach out directly");
    expect(link.closest("a")).toHaveAttribute("href", "/contact?type=corporate");
  });
});

// ─── FinalCTA ────────────────────────────────────
describe("FinalCTA", () => {
  it("renders heading", () => {
    render(<FinalCTA />);
    expect(screen.getByText(/Companies Investing in AI Fluency/)).toBeInTheDocument();
    expect(screen.getByText(/Lead\./)).toBeInTheDocument();
  });

  it("renders subtitle", () => {
    render(<FinalCTA />);
    expect(screen.getByText(/Early-moving teams build the workflows/)).toBeInTheDocument();
  });

  it("renders CTA button linking to contact", () => {
    render(<FinalCTA />);
    const cta = screen.getByText(/Request a proposal/);
    expect(cta.closest("a")).toHaveAttribute("href", "/contact");
  });

  it("renders metadata line", () => {
    render(<FinalCTA />);
    expect(screen.getByText(/Founding cohort: Spring 2026/)).toBeInTheDocument();
    expect(screen.getByText(/Limited to 10 teams/)).toBeInTheDocument();
    expect(screen.getByText("No technical background required")).toBeInTheDocument();
  });
});
