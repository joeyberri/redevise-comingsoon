import { useRef, useState, useEffect, useMemo } from "react";

const GRID_SIZE = 60;

const GridSpotlight = ({
  as: Component = "div",
  className = "",
  spotlightSize = 900,
  children,
}) => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 1440, height: 800 });
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const updateSize = () => {
      if (!containerRef.current) return;
      const { clientWidth, clientHeight } = containerRef.current;
      setDimensions({ width: clientWidth, height: clientHeight });
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Stepped upward growth spike that runs flush to the right edge
  const growthGeometry = useMemo(() => {
    const cols = Math.ceil(dimensions.width / GRID_SIZE);
    const rows = Math.ceil(dimensions.height / GRID_SIZE);

    if (cols < 6 || rows < 5) return null;

    // Start near the bottom-center and run all the way to the right edge (cols)
    const startCol = Math.max(2, Math.floor(cols * 0.34));
    const endCol = cols;
    const baseRow = rows - 1;

    // Cap the peak around 38% from the top so it doesn't crowd the top-right nav button
    const peakRow = Math.max(2, Math.floor(rows * 0.38));
    const maxRise = Math.max(2, baseRow - peakRow);

    const totalSteps = endCol - startCol;
    if (totalSteps <= 1) return null;

    const columns = [];
    const vertices = [];
    let pathD = "";

    for (let i = 0; i <= totalSteps; i++) {
      const col = startCol + i;
      const progress = i / totalSteps; // 0 -> 1

      // Smooth exponential rise
      const expRise = Math.round(Math.pow(progress, 2.0) * maxRise);
      const currentRow = Math.max(peakRow, baseRow - expRise);

      const x = col * GRID_SIZE;
      const y = currentRow * GRID_SIZE;

      if (i === 0) {
        pathD += `M ${x} ${dimensions.height} L ${x} ${y}`;
        vertices.push({ x, y, progress });
      } else {
        const prevCol = columns[columns.length - 1];
        pathD += ` L ${x} ${prevCol.y}`;
        if (y !== prevCol.y) {
          pathD += ` L ${x} ${y}`;
          // Only place a crosshair when the step actually climbs
          if (col < cols) {
            vertices.push({ x, y, progress });
          }
        }
      }

      columns.push({
        col,
        x,
        y,
        height: Math.max(0, dimensions.height - y),
        progress,
      });
    }

    // Carry the final horizontal line cleanly past the right edge
    const last = columns[columns.length - 1];
    pathD += ` L ${(last.col + 1) * GRID_SIZE} ${last.y}`;

    return { columns, vertices, pathD };
  }, [dimensions]);

  return (
    <Component
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`bg-[#070807] ${className}`}
    >
      {/* 1. Base 60px Structural Grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.035) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.035) 1px, transparent 1px)
          `,
          backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
        }}
        aria-hidden="true"
      />

      {/* 2. Subtle Cursor Spotlight over the Grid */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(190, 242, 2, 0.11) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(190, 242, 2, 0.11) 1px, transparent 1px)
          `,
          backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
          maskImage: `radial-gradient(${spotlightSize * 0.5}px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent)`,
          WebkitMaskImage: `radial-gradient(${spotlightSize * 0.5}px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent)`,
        }}
        aria-hidden="true"
      />

      {/* 3. Subtle Engineered Growth Spike (Flush Right) */}
      {growthGeometry && (
        <svg
          className="pointer-events-none absolute inset-0 w-full h-full overflow-hidden"
          aria-hidden="true"
        >
          <defs>
            {/* Whisper-soft vertical wash for the ascending columns */}
            <linearGradient id="growthColumnGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgb(190, 242, 2)" stopOpacity="0.045" />
              <stop offset="55%" stopColor="rgb(190, 242, 2)" stopOpacity="0.015" />
              <stop offset="100%" stopColor="rgb(190, 242, 2)" stopOpacity="0.0" />
            </linearGradient>

            {/* Restrained left-to-right gradient for the stepped contour line */}
            <linearGradient id="growthStrokeGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgb(190, 242, 2)" stopOpacity="0.03" />
              <stop offset="40%" stopColor="rgb(190, 242, 2)" stopOpacity="0.12" />
              <stop offset="100%" stopColor="rgb(190, 242, 2)" stopOpacity="0.24" />
            </linearGradient>
          </defs>

          {/* Ascending Grid Column Fills */}
          {growthGeometry.columns.map((col, idx) =>
            col.height > 0 ? (
              <rect
                key={idx}
                x={col.x}
                y={col.y}
                width={GRID_SIZE}
                height={col.height}
                fill="url(#growthColumnGrad)"
                opacity={0.25 + col.progress * 0.75}
              />
            ) : null
          )}

          {/* Crisp 1px Stepped Growth Line */}
          <path
            d={growthGeometry.pathD}
            fill="none"
            stroke="url(#growthStrokeGrad)"
            strokeWidth="1"
          />

          {/* Slow, Subtle Energy Surge along the growth contour */}
          <path
            d={growthGeometry.pathD}
            fill="none"
            stroke="rgb(190, 242, 2)"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeDasharray="90 1600"
            opacity="0.32"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="1690"
              to="0"
              dur="9s"
              repeatCount="indefinite"
            />
          </path>

          {/* Delicate Crosshairs (+) at upward step vertices */}
          {growthGeometry.vertices.map((v, idx) => (
            <g
              key={idx}
              transform={`translate(${v.x}, ${v.y})`}
              opacity={0.12 + v.progress * 0.25}
            >
              <line
                x1="-3"
                y1="0"
                x2="3"
                y2="0"
                stroke="rgb(190, 242, 2)"
                strokeWidth="1"
              />
              <line
                x1="0"
                y1="-3"
                x2="0"
                y2="3"
                stroke="rgb(190, 242, 2)"
                strokeWidth="1"
              />
            </g>
          ))}
        </svg>
      )}

      {/* Foreground Content */}
      {children}
    </Component>
  );
};

export default GridSpotlight;
