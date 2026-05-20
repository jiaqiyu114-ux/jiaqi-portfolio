export function GlobalAtmosphere() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Desaturated indigo — upper-left */}
      <div
        className="absolute"
        style={{
          top: "-5vh",
          left: "-15vw",
          width: "62vw",
          height: "55vh",
          background:
            "radial-gradient(ellipse at center, rgba(45,62,130,0.07) 0%, transparent 70%)",
          filter: "blur(88px)",
        }}
      />

      {/* Muted blue — right, mid-height */}
      <div
        className="absolute"
        style={{
          top: "22vh",
          right: "-12vw",
          width: "50vw",
          height: "48vh",
          background:
            "radial-gradient(ellipse at center, rgba(38,72,128,0.06) 0%, transparent 66%)",
          filter: "blur(100px)",
        }}
      />

      {/* Smoke blue-teal — centre lower */}
      <div
        className="absolute"
        style={{
          top: "52vh",
          left: "12vw",
          width: "55vw",
          height: "46vh",
          background:
            "radial-gradient(ellipse at center, rgba(25,78,108,0.05) 0%, transparent 65%)",
          filter: "blur(110px)",
        }}
      />

      {/* Muted violet — lower-right */}
      <div
        className="absolute"
        style={{
          bottom: "-6vh",
          right: "-6vw",
          width: "46vw",
          height: "40vh",
          background:
            "radial-gradient(ellipse at center, rgba(48,35,108,0.04) 0%, transparent 62%)",
          filter: "blur(86px)",
        }}
      />

      {/* Global cinematic grain — single instance for whole page */}
      <div
        className="absolute inset-0 noise-overlay"
        style={{ opacity: 0.030, mixBlendMode: "overlay" }}
      />
    </div>
  );
}
