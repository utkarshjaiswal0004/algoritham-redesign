"use client";
/**
 * Theme-aware monogram SVG marks for partner companies.
 * All paths use `currentColor` so they pick up the parent text color and
 * automatically swap between light/dark mode without extra logic.
 */

type LogoProps = { size?: number; className?: string };

export function MicrosoftLogo({ size = 22, className = "" }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" className={className} aria-label="Microsoft">
      <rect x="1"  y="1"  width="9" height="9" fill="#F25022"/>
      <rect x="12" y="1"  width="9" height="9" fill="#7FBA00"/>
      <rect x="1"  y="12" width="9" height="9" fill="#00A4EF"/>
      <rect x="12" y="12" width="9" height="9" fill="#FFB900"/>
    </svg>
  );
}

export function FortinetLogo({ size = 22, className = "" }: LogoProps) {
  // Stylised "F" with a shield-like crossbar
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" className={className} aria-label="Fortinet">
      <path
        d="M4 3 H18 V7 H8 V10 H15 V14 H8 V19 H4 Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function DellLogo({ size = 22, className = "" }: LogoProps) {
  // Oval D
  return (
    <svg width={size} height={size} viewBox="0 0 28 22" className={className} aria-label="Dell">
      <ellipse cx="14" cy="11" rx="12" ry="9" fill="none" stroke="currentColor" strokeWidth="1.8"/>
      <text x="14" y="15" fontSize="11" fontWeight="700" textAnchor="middle" fill="currentColor" fontFamily="ui-sans-serif, system-ui">D</text>
    </svg>
  );
}

export function HPELogo({ size = 22, className = "" }: LogoProps) {
  // Filled rectangle bar (hpe element)
  return (
    <svg width={size} height={size} viewBox="0 0 28 22" className={className} aria-label="HP Enterprise">
      <rect x="1" y="2"  width="26" height="3" fill="#01A982"/>
      <text x="14" y="17" fontSize="9" fontWeight="800" textAnchor="middle" fill="currentColor" fontFamily="ui-sans-serif, system-ui">HPE</text>
    </svg>
  );
}

export function VMwareLogo({ size = 22, className = "" }: LogoProps) {
  // Three vertical pipes (V/M/W abstraction)
  return (
    <svg width={size} height={size} viewBox="0 0 28 22" className={className} aria-label="VMware">
      <g fill="currentColor">
        <rect x="2"  y="6" width="3" height="13" rx="1" />
        <rect x="7"  y="3" width="3" height="16" rx="1" />
        <rect x="12" y="6" width="3" height="13" rx="1" />
        <rect x="17" y="3" width="3" height="16" rx="1" />
        <rect x="22" y="6" width="3" height="13" rx="1" />
      </g>
    </svg>
  );
}

export function AWSLogo({ size = 22, className = "" }: LogoProps) {
  // Cube outline
  return (
    <svg width={size} height={size} viewBox="0 0 26 22" className={className} aria-label="AWS">
      <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
        <path d="M13 2 L23 7 L23 15 L13 20 L3 15 L3 7 Z" />
        <path d="M13 2 L13 20" />
        <path d="M3 7 L23 7" />
      </g>
      <text x="13" y="14" fontSize="6" fontWeight="800" textAnchor="middle" fill="currentColor" fontFamily="ui-sans-serif, system-ui">AWS</text>
    </svg>
  );
}

export function IBMLogo({ size = 22, className = "" }: LogoProps) {
  // Horizontal stripes monogram
  return (
    <svg width={size} height={size} viewBox="0 0 28 22" className={className} aria-label="IBM">
      <g fill="currentColor">
        <rect x="3" y="5"  width="22" height="1.6"/>
        <rect x="3" y="8"  width="22" height="1.6"/>
        <rect x="3" y="11" width="22" height="1.6"/>
        <rect x="3" y="14" width="22" height="1.6"/>
        <rect x="3" y="17" width="22" height="1.6"/>
      </g>
    </svg>
  );
}

export const PartnerLogos = {
  microsoft: MicrosoftLogo,
  fortinet:  FortinetLogo,
  dell:      DellLogo,
  hpe:       HPELogo,
  vmware:    VMwareLogo,
  aws:       AWSLogo,
  ibm:       IBMLogo,
} as const;

export type PartnerKey = keyof typeof PartnerLogos;
