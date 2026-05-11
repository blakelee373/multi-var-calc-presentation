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
  section: string;
  Component: ComponentType;
};

export const slides: SlideMeta[] = [
  { slug: "title",       title: "Multivariable calculus & the gradient", section: "Cover",          Component: Slide01Title },
  { slug: "single-var",  title: "Single-variable calculus",              section: "Foundations",    Component: Slide02Path },
  { slug: "problem",     title: "Why one direction isn't enough",        section: "Motivation",     Component: Slide03Problem },
  { slug: "many",        title: "From one input to several",             section: "Setup",          Component: Slide04Compare },
  { slug: "directions",  title: "Direction of fastest increase",         section: "Concept",        Component: Slide05Compass },
  { slug: "partials",    title: "Partial derivatives",                   section: "Definitions",    Component: Slide06Partials },
  { slug: "gradient",    title: "The gradient ∇f",                       section: "Definition",     Component: Slide07Gradient },
  { slug: "contour",     title: "Reading contour maps",                  section: "Geometry",       Component: Slide08Contour },
  { slug: "example",     title: "Worked example",                        section: "Practice",       Component: Slide09Example },
  { slug: "recap",       title: "Summary",                               section: "Recap",          Component: Slide10Recap },
];
