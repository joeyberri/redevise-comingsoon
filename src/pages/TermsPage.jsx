import Section from "../components/Section.jsx";
import { Heading, Text } from "../components/Typography.jsx";
import Pill from "../components/Pill.jsx";
import { motion } from "framer-motion";

const TermsPage = () => {
  return (
    <Section name="terms" className="pt-32">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Pill className="mb-6">Legal</Pill>
          <Heading level={1} className="mb-8 text-gradient">Terms of Service</Heading>
          <Text className="mb-12 text-lg text-text-muted">
            Last Updated: May 7, 2026
          </Text>

          <div className="space-y-12">
            <section>
              <Heading level={3} className="mb-4">1. The Agreement</Heading>
              <Text>
                By accessing or using the Redevise platform, products, or services, you agree to be bound by these Terms of Service. If you do not agree to these terms, you must not access or use our services. Redevise reserves the right to modify these terms at any time.
              </Text>
            </section>

            <section>
              <Heading level={3} className="mb-4">2. Service Provision</Heading>
              <Text>
                Redevise provides software products, custom engineering services, and organizational consulting. Our services are provided "as is" and "as available". While we strive for "dramatic improvement or nothing," we do not guarantee specific outcomes as they depend on implementation and external factors.
              </Text>
            </section>

            <section>
              <Heading level={3} className="mb-4">3. Intellectual Property</Heading>
              <Text>
                The Redevise name, logo, Jarvis intelligence layer, and all associated software and content are the exclusive property of Redevise. You may not reproduce, distribute, or create derivative works without explicit written permission.
              </Text>
            </section>

            <section>
              <Heading level={3} className="mb-4">4. User Obligations</Heading>
              <Text>
                You agree to use our services only for lawful purposes. You are responsible for maintaining the confidentiality of any account credentials and for all activities that occur under your account.
              </Text>
            </section>

            <section>
              <Heading level={3} className="mb-4">5. Limitation of Liability</Heading>
              <Text>
                To the maximum extent permitted by law, Redevise shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of our services.
              </Text>
            </section>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

export default TermsPage;
