import Section from "../components/Section.jsx";
import { Heading, Text } from "../components/Typography.jsx";
import Pill from "../components/Pill.jsx";
import { motion } from "framer-motion";

const PrivacyPage = () => {
  return (
    <Section name="privacy" className="pt-32">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Pill className="mb-6">Data Strategy</Pill>
          <Heading level={1} className="mb-8 text-gradient">Privacy Policy</Heading>
          <Text className="mb-12 text-lg text-text-muted">
            Last Updated: May 7, 2026
          </Text>

          <div className="space-y-12">
            <section>
              <Heading level={3} className="mb-4">1. Data Philosophy</Heading>
              <Text>
                At Redevise, we believe data should serve you, not exploit you. We only collect the minimum amount of information necessary to provide our services and power the Jarvis intelligence layer to your benefit.
              </Text>
            </section>

            <section>
              <Heading level={3} className="mb-4">2. Information We Collect</Heading>
              <Text>
                We collect information you provide directly (such as when you fill out an inquiry form), technical usage data (IP addresses, browser types), and context-specific data used to optimize your workflows via Jarvis.
              </Text>
            </section>

            <section>
              <Heading level={3} className="mb-4">3. How We Use Data</Heading>
              <Text>
                We use your data to:
                <ul className="list-disc list-inside mt-4 space-y-2 opacity-80">
                  <li>Deliver and improve our products and services.</li>
                  <li>Train the Jarvis intelligence layer for cross-product optimization.</li>
                  <li>Communicate with you regarding your inquiries and projects.</li>
                  <li>Ensure the security and integrity of our platform.</li>
                </ul>
              </Text>
            </section>

            <section>
              <Heading level={3} className="mb-4">4. Data Sharing</Heading>
              <Text>
                We do not sell your personal data. We only share information with trusted third-party service providers necessary for operation (e.g., hosting, email delivery) or when required by law.
              </Text>
            </section>

            <section>
              <Heading level={3} className="mb-4">5. Your Rights</Heading>
              <Text>
                You have the right to access, correct, or delete your personal information. If you wish to exercise these rights or have questions about our data practices, please contact us via the inquiry flow.
              </Text>
            </section>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

export default PrivacyPage;
