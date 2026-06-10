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
              <Heading level={2} variant="card-title" className="mb-4">1. The Agreement & Acceptance</Heading>
              <Text>
                By accessing or using the Redevise platform, products, web services, or consulting resources, you agree to be bound by these Terms of Service. If you are entering into this agreement on behalf of a company, church, or other legal entity, you represent that you have the authority to bind such entity to these terms. If you do not agree, you are prohibited from accessing or using our services.
              </Text>
            </section>

            <section>
              <Heading level={2} variant="card-title" className="mb-4">2. Service Provision & Warranties</Heading>
              <Text>
                Redevise provides software applications, custom engineering consulting, and optimization infrastructure (including the Core systems). Our services are provided on an "as is" and "as available" basis. Except as expressly set forth in a separate written agreement signed by both parties, Redevise makes no warranties, express or implied, including but not limited to merchantability, fitness for a particular purpose, or non-infringement.
              </Text>
            </section>

            <section>
              <Heading level={2} variant="card-title" className="mb-4">3. Intellectual Property Rights</Heading>
              <Text>
                The Redevise name, logos, system architectures, custom algorithms, and the underlying Core intelligence systems are the exclusive property of Redevise and its licensors. You are granted no rights or licenses to our technology except as explicitly agreed. However, any business reports, user interface assets specifically created for you, or data structures containing your proprietary business info generated under paid services remain your property.
              </Text>
            </section>

            <section>
              <Heading level={2} variant="card-title" className="mb-4">4. User Obligations & Prohibited Conduct</Heading>
              <Text>
                You agree to use our services in compliance with all applicable laws and regulations. You are strictly prohibited from:
                <ul className="list-disc list-inside mt-4 space-y-2 opacity-80">
                  <li>Attempting to reverse engineer, decompile, or extract source code from the Redevise platform or Core systems.</li>
                  <li>Using automated scripts, bots, or scraping tools to query our scheduling systems, contact forms, or APIs without express authorization.</li>
                  <li>Interfering with, disrupting, or testing the vulnerability of our servers, networks, or hosting configurations.</li>
                  <li>Using our systems to transmit malware, perform denial-of-service attacks, or host unauthorized or illegal material.</li>
                </ul>
              </Text>
            </section>

            <section>
              <Heading level={2} variant="card-title" className="mb-4">5. Limitation of Liability</Heading>
              <Text>
                To the maximum extent permitted by applicable law, Redevise and its affiliates, directors, officers, employees, or agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data loss, business interruption, or system downtime, even if advised of the possibility of such damages. Our maximum cumulative liability for any claim arising out of these terms shall not exceed the amount paid by you, if any, to access our services.
              </Text>
            </section>

            <section>
              <Heading level={2} variant="card-title" className="mb-4">6. Modification of Terms</Heading>
              <Text>
                We reserve the right, at our sole discretion, to modify or replace these Terms of Service at any time. When modifications occur, we will update the "Last Updated" date at the top of this page. Your continued use of our services after such modifications constitute your binding acceptance of the updated terms.
              </Text>
            </section>

            <section>
              <Heading level={2} variant="card-title" className="mb-4">7. Governing Law & Dispute Resolution</Heading>
              <Text>
                These Terms of Service and any disputes arising out of or related to your use of Redevise services shall be governed by and construed in accordance with the laws of the jurisdiction where Redevise is registered, without giving effect to any principles of conflicts of law. Any legal action or proceeding arising under these terms shall be brought exclusively in the courts located in that jurisdiction.
              </Text>
            </section>

            <section>
              <Heading level={2} variant="card-title" className="mb-4">8. Contact Us</Heading>
              <Text>
                If you have any questions, concerns, or requests regarding these Terms of Service, please contact our legal operations team directly at <a href="mailto:team@redevise.com" className="text-lime hover:underline">team@redevise.com</a>.
              </Text>
            </section>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

export default TermsPage;
