import clsx from "clsx";

const GlowOrb = ({ className, position = "center" }) => {
  const positions = {
    center: "left-1/2 top-1/2",
    top: "left-1/2 top-1/3",
    bottom: "left-1/2 top-2/3",
  };

  return (
    <div className={clsx(
      "glow-orb", 
      positions[position] || position, 
      className
    )} />
  );
};

export default GlowOrb;
