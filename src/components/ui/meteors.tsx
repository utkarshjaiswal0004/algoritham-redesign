"use client";
import { useEffect, useState } from "react";

interface Meteor { left: string; top: string; delay: string; duration: string; }

function generateMeteors(n: number): Meteor[] {
  return Array.from({ length: n }).map(() => ({
    left:     `${Math.random() * 100}%`,
    top:      `${-(Math.random() * 100)}%`,
    delay:    `${Math.random() * 1.5}s`,
    duration: `${(Math.random() * 5 + 4).toFixed(2)}s`,
  }));
}

export function Meteors({ number = 20, className = "" }: { number?: number; className?: string }) {
  // Random values are computed only on the client (after mount) to avoid
  // SSR/CSR hydration drift. Empty initial state renders nothing on the server.
  const [meteors, setMeteors] = useState<Meteor[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMeteors(generateMeteors(number));
  }, [number]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {meteors.map((m, i) => (
        <span
          key={i}
          className="meteor absolute h-px w-px rotate-[215deg] rounded-full bg-[var(--brand-purple)] shadow-[0_0_0_1px_#ffffff10]"
          style={{
            left: m.left,
            top: m.top,
            animationDelay: m.delay,
            animationDuration: m.duration,
          }}
        />
      ))}
      <style jsx>{`
        .meteor::before {
          content: "";
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 60px;
          height: 1px;
          background: linear-gradient(90deg, var(--brand-purple), transparent);
        }
        .meteor {
          animation: meteor linear infinite;
        }
        @keyframes meteor {
          0%   { transform: rotate(215deg) translateX(0);     opacity: 1; }
          70%  { opacity: 1; }
          100% { transform: rotate(215deg) translateX(-700px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
