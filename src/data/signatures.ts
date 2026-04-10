/**
 * What: Team email signature data. Source of truth.
 * Why: One file to edit when credentials or roles change.
 * How: Add a SignaturePerson entry; signatures page re-renders.
 * Deps: None; consumed by EmailSignature + /brand/signatures page.
 */

export interface SignaturePerson {
  id: string;
  name: string;
  role: string;
  /** Italicized credential lines. Each string is one visual line. */
  credentials: string[];
  /** Public URL shown under the rule. */
  link: {
    label: string;
    href: string;
  };
}

export const signaturePeople: SignaturePerson[] = [
  {
    id: "shubham",
    name: "Shubham Chandra",
    role: "Head of Curriculum",
    credentials: [
      "Teaches AI at the University of Chicago",
      "Builds AI systems at Digital Realty",
    ],
    link: {
      label: "unlockintelligencehq.com",
      href: "https://unlockintelligencehq.com",
    },
  },
  {
    id: "jt",
    name: "J.T. O\u2019Connor",
    role: "Program Director",
    credentials: [
      "Your main point of contact \u2014 from first conversation",
      "through program delivery.",
    ],
    link: {
      label: "unlockintelligencehq.com",
      href: "https://unlockintelligencehq.com",
    },
  },
];
