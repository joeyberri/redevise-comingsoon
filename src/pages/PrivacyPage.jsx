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
              <Heading level={2} variant="card-title" className="mb-4">1. Data Philosophy & Sovereignty</Heading>
              <Text>
                At Redevise, we reject the surveillance economy. We believe that your data belongs to you. We strictly design our systems to collect the absolute minimum amount of information necessary to deliver, secure, and optimize our services. When we deploy custom intelligence systems (such as Core instances), we enforce absolute data isolation—your institutional knowledge never cross-contaminates another organization's systems or training data.
              </Text>
            </section>

            <section>
              <Heading level={2} variant="card-title" className="mb-4">2. Information We Collect</Heading>
              <Text>
                We only collect data that you explicitly provide to us, or that is technically required to serve you:
                <ul className="list-disc list-inside mt-4 space-y-2 opacity-80">
                  <li><strong>Inquiry & Consultation Data:</strong> Name, organization, email address, interests, and freeform messages sent via our consultation flow or scheduling forms.</li>
                  <li><strong>Core Instance Data:</strong> Under specific consulting arrangements, the data processed by your dedicated Core instance is stored within secure, isolated environments under your control.</li>
                  <li><strong>Technical Usage Metadata:</strong> Basic web client logs (IP address, browser type, device type, referrer) used exclusively for performance tuning, DDoS mitigation, and system health monitoring.</li>
                </ul>
              </Text>
            </section>

            <section>
              <Heading level={2} variant="card-title" className="mb-4">3. How We Use Data</Heading>
              <Text>
                We use the information we collect to:
                <ul className="list-disc list-inside mt-4 space-y-2 opacity-80">
                  <li>Respond to inquiries, coordinate consultations, and execute projects.</li>
                  <li>Configure, maintain, and optimize your dedicated Core instances and custom integrations.</li>
                  <li>Develop and refine our product offerings without compromising individual privacy (we do not use client-specific proprietary data to train models for competitors).</li>
                  <li>Ensure the security, availability, and reliability of our network infrastructure.</li>
                </ul>
              </Text>
            </section>

            <section>
              <Heading level={2} variant="card-title" className="mb-4">4. Cookies & Tracking Technologies</Heading>
              <Text>
                We do not use tracking cookies or cross-site advertising scripts. We may use local storage or session-based state purely for system operations (such as maintaining your active state in the consultation booking modal). Any analytics we collect are aggregated, anonymous, and focused strictly on performance optimization.
              </Text>
            </section>

            <section>
              <Heading level={2} variant="card-title" className="mb-4">5. Data Retention & Deletion</Heading>
              <Text>
                We retain consultation requests and contact information only as long as necessary to manage our relationship with you or execute active agreements. If you request that your data be deleted, we will purge it from our production systems within 30 days, except where retention is required by law.
              </Text>
            </section>

            <section>
              <Heading level={2} variant="card-title" className="mb-4">6. Third-Party Service Providers</Heading>
              <Text>
                We selectively work with third-party providers who share our commitment to privacy and security. These include:
                <ul className="list-disc list-inside mt-4 space-y-2 opacity-80">
                  <li><strong>Cloudflare:</strong> For secure, edge-based application hosting and security.</li>
                  <li><strong>Resend:</strong> For transactional email delivery.</li>
                  <li><strong>Cal.com:</strong> For scheduling and appointment bookings.</li>
                </ul>
                We do not sell, rent, or lease your personal information to third parties.
              </Text>
            </section>

            <section>
              <Heading level={2} variant="card-title" className="mb-4">7. International Transfers & Security</Heading>
              <Text>
                Your data may be processed on servers located in the United States or other jurisdictions, depending on where our hosting partners route traffic. We implement industry-standard security measures, including transport encryption (HTTPS) and isolated container architectures, to safeguard your data against unauthorized access, alteration, or loss.
              </Text>
            </section>

            <section>
              <Heading level={2} variant="card-title" className="mb-4">8. Your Rights & Contact Information</Heading>
              <Text>
                Depending on your location, you may have rights under the GDPR, CCPA, or other regional data protection frameworks (such as rights of access, correction, portability, and erasure). If you wish to exercise any of these rights, or if you have questions regarding this policy, please reach out to us directly at <a href="mailto:team@redevise.com" className="text-lime hover:underline">team@redevise.com</a>.
              </Text>
            </section>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

export default PrivacyPage;
