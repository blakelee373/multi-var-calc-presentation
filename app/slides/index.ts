import type { ComponentType } from "react";
import Slide01Title from "./Slide01Title";
import Slide02Path from "./Slide02Path";
import Slide03Problem from "./Slide03Problem";
import Slide04Compare from "./Slide04Compare";
import Slide05Compass from "./Slide05Compass";
import Slide06Partials from "./Slide06Partials";
import Slide07Gradient from "./Slide07Gradient";
import Slide08Contour from "./Slide08Contour";
import Slide09Example from "./Slide09Example";
import Slide10Recap from "./Slide10Recap";

export type SlideMeta = {
  slug: string;
  title: string;
  Component: ComponentType;
};

export const slides: SlideMeta[] = [
  { slug: "title", title: "Why we need a 3D compass", Component: Slide01Title },
  { slug: "one-path", title: "Normal calculus: one path", Component: Slide02Path },
  { slug: "the-problem", title: "The problem: more than one route", Component: Slide03Problem },
  { slug: "compare", title: "One variable vs. many", Component: Slide04Compare },
  { slug: "3d-compass", title: "A 3D compass", Component: Slide05Compass },
  { slug: "partials", title: "Partial derivatives", Component: Slide06Partials },
  { slug: "gradient", title: "The gradient", Component: Slide07Gradient },
  { slug: "contour", title: "Contour map view", Component: Slide08Contour },
  { slug: "example", title: "Example: f = x² + y²", Component: Slide09Example },
  { slug: "recap", title: "Final takeaway", Component: Slide10Recap },
];
