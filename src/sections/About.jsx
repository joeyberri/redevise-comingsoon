import Section from "../components/Section.jsx";
import ValueCard from "../components/ValueCard.jsx";
import { values } from "../constants/index.jsx";

const About = () => {
  return (
    <Section name="about" showDivider>
      <div className="grid gap-12 md:grid-cols-about md:gap-16">
        {/* Sidebar */}
        <div>
          <div className="pill mb-6">About</div>
          <h2 className="font-serif text-3xl text-text md:text-4xl lg:text-5xl leading-tight">
            The Redevise{" "}
            <span className="text-gradient">Way.</span>
          </h2>
        </div>

        {/* Body */}
        <div>
          <div className="mb-10 space-y-6">
            <p className="text-base leading-relaxed text-text-muted md:text-lg">
              Redevise started with a simple observation: most software makes
              processes more complicated, not less. Most consultants produce
              decks instead of outcomes. And most companies accept this as
              normal - because everyone else does, too.
            </p>
            <p className="text-base leading-relaxed text-text-muted md:text-lg">
              We didn&apos;t. We built Redevise around a single,
              non-negotiable standard:{" "}
              <strong className="font-semibold text-text">
                if the improvement isn&apos;t dramatic, we don&apos;t build
                it.
              </strong>{" "}
              Not for our own products. Not for our clients. Incremental gains
              don&apos;t justify the cognitive overhead of adopting something
              new.
            </p>
            <p className="text-base leading-relaxed text-text-muted md:text-lg">
              What emerged is something that doesn&apos;t fit a neat category.
              We&apos;re part product company, part engineering firm, part
              optimization consultancy - all unified by a shared intelligence
              layer we call Jarvis, and a shared philosophy we simply call:
              make it work better, or don&apos;t make it at all.
            </p>
            <p className="text-base leading-relaxed text-text-muted md:text-lg">
              The long-term mission is compounding intelligence: every product
              we ship and every client problem we solve makes Jarvis - and
              therefore all of Redevise - sharper. This is how we compete. Not
              on features. Not on hourly rates. On outcomes, intelligence, and
              execution speed.
            </p>
          </div>

          {/* Values */}
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {values.map((value) => (
              <ValueCard key={value.id} {...value} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default About;
