import Section from "../components/Section.jsx";
import ValueCard from "../components/ValueCard.jsx";
import { values, aboutContent } from "../constants/index.jsx";
import { Heading, Text } from "../components/Typography.jsx";
import Pill from "../components/Pill.jsx";
import Grid from "../components/Grid.jsx";

const About = () => {
  return (
    <Section name="about" showDivider>
      <Grid variant="about" gap={12} className="md:gap-16">
        {/* Sidebar */}
        <div>
          <Pill className="mb-6">{aboutContent.pill}</Pill>
          <Heading level={2}>{aboutContent.title}</Heading>
        </div>

        {/* Body */}
        <div>
          <div className="mb-10 space-y-6">
            {aboutContent.paragraphs.map((para, i) => (
              <Text key={i}>{para}</Text>
            ))}
          </div>

          {/* Values */}
          <Grid cols={4} gap={6} className="grid-cols-2">
            {values.map((value) => (
              <ValueCard key={value.id} {...value} />
            ))}
          </Grid>
        </div>
      </Grid>
    </Section>
  );
};

export default About;
