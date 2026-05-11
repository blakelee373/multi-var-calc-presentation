import { palette } from "@/lib/palette";

type CharacterProps = {
  pose?: "neutral" | "confident" | "thinking";
  size?: number;
};

export function Character({ pose = "neutral", size = 120 }: CharacterProps) {
  const arms = {
    neutral: { left: "M28 60 L20 78", right: "M52 60 L62 78" },
    confident: { left: "M28 60 L18 70", right: "M52 60 L70 50" },
    thinking: { left: "M28 60 L36 44", right: "M52 60 L62 78" },
  }[pose];

  return (
    <svg
      viewBox="0 0 80 140"
      width={size}
      height={(size * 140) / 80}
      aria-hidden
    >
      {/* head */}
      <circle cx="40" cy="22" r="14" fill="#F5D7B5" stroke={palette.ink} strokeWidth="2" />
      {/* hair */}
      <path d="M26 18 Q40 6 54 18 Q52 12 40 10 Q28 12 26 18Z" fill={palette.ink} />
      {/* eyes */}
      <circle cx="35" cy="22" r="1.5" fill={palette.ink} />
      <circle cx="45" cy="22" r="1.5" fill={palette.ink} />
      {/* smile */}
      <path d="M35 28 Q40 31 45 28" stroke={palette.ink} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* body */}
      <path d="M28 38 L52 38 L52 78 L28 78 Z" fill={palette.teal} stroke={palette.ink} strokeWidth="2" />
      <path d="M40 38 L40 78" stroke={palette.ink} strokeWidth="1" opacity="0.3" />
      {/* arms */}
      <path d={arms.left} stroke={palette.ink} strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d={arms.right} stroke={palette.ink} strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* legs */}
      <path d="M32 78 L30 110" stroke={palette.ink} strokeWidth="4" strokeLinecap="round" />
      <path d="M48 78 L50 110" stroke={palette.ink} strokeWidth="4" strokeLinecap="round" />
      {/* shoes */}
      <ellipse cx="28" cy="114" rx="6" ry="3" fill={palette.ink} />
      <ellipse cx="52" cy="114" rx="6" ry="3" fill={palette.ink} />
    </svg>
  );
}
