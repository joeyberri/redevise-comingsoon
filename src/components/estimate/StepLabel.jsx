import { Heading } from "../Typography.jsx";

const StepLabel = ({ number, title }) => (
  <div className="flex items-center gap-4 mb-8">
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-lime/10 border border-lime/20 text-lime font-sans font-bold text-sm shrink-0">
      {number}
    </div>
    <Heading level={3} variant="card-title">
      {title}
    </Heading>
  </div>
);

export default StepLabel;
