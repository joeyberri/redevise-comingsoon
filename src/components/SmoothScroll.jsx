import { ReactLenis } from '@studio-freight/react-lenis';

export default function SmoothScroll({ children }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.14,
        smoothWheel: true,
        smoothTouch: false,
        wheelMultiplier: 1.2,
        duration: 0.5,
      }}
    >
      {children}
    </ReactLenis>
  );
}
