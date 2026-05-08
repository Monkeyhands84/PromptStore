type LogoProps = {
  size?: number;
  color?: string;
};

export function Logo({ size = 20, color }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" fill={color || "var(--accent)"} />
      <rect x="7" y="8" width="10" height="1.5" rx="0.75" fill="white" />
      <rect x="7" y="11.25" width="7" height="1.5" rx="0.75" fill="white" />
      <rect x="7" y="14.5" width="8.5" height="1.5" rx="0.75" fill="white" />
    </svg>
  );
}
