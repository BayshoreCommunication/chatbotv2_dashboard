import { Document, Link, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { SITE_URL } from "@/config/seo";
import {
  USER_GUIDE_FAQS,
  USER_GUIDE_INTRO,
  USER_GUIDE_PHASES,
  USER_GUIDE_PREREQUISITES,
} from "@/lib/userGuideData";

// Rendered server-side (see app/api/user-guide/pdf/route.ts) with
// @react-pdf/renderer's own primitives — not regular DOM/Tailwind, so this
// can't reuse the on-site guide's JSX, only its data (lib/userGuideData.ts).

const styles = StyleSheet.create({
  page: {
    paddingTop: 56,
    paddingBottom: 56,
    paddingHorizontal: 48,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#374151",
  },
  eyebrow: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#6d28d9",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  h1: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
    marginTop: 4,
  },
  subtitle: {
    fontSize: 10.5,
    color: "#6b7280",
    marginTop: 8,
    lineHeight: 1.5,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    marginTop: 20,
    marginBottom: 20,
  },
  phase: {
    marginBottom: 22,
  },
  phaseEyebrow: {
    fontSize: 8.5,
    fontFamily: "Helvetica-Bold",
    color: "#6d28d9",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  phaseTitle: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
    marginTop: 2,
  },
  phaseDescription: {
    fontSize: 9.5,
    color: "#6b7280",
    marginTop: 3,
    marginBottom: 10,
  },
  step: {
    marginBottom: 10,
    paddingLeft: 12,
    borderLeftWidth: 2,
    borderLeftColor: "#e5e7eb",
  },
  stepTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
  },
  stepDescription: {
    fontSize: 9.5,
    color: "#4b5563",
    marginTop: 2,
    lineHeight: 1.45,
  },
  stepTip: {
    fontSize: 8.5,
    color: "#6d28d9",
    marginTop: 3,
    lineHeight: 1.4,
  },
  stepLink: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#6d28d9",
    marginTop: 3,
    textDecoration: "none",
  },
  prereqBox: {
    backgroundColor: "#f9fafb",
    borderRadius: 4,
    padding: 12,
    marginBottom: 20,
  },
  prereqTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
    marginBottom: 6,
  },
  prereqItem: {
    fontSize: 9.5,
    color: "#4b5563",
    marginTop: 3,
    lineHeight: 1.4,
  },
  faqSection: {
    marginTop: 8,
  },
  faqTitle: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
    marginBottom: 10,
  },
  faqItem: {
    marginBottom: 10,
  },
  faqQuestion: {
    fontSize: 10.5,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
  },
  faqAnswer: {
    fontSize: 9.5,
    color: "#4b5563",
    marginTop: 2,
    lineHeight: 1.45,
  },
  footer: {
    position: "absolute",
    bottom: 28,
    left: 48,
    right: 48,
    fontSize: 8,
    color: "#9ca3af",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

const UserGuidePdfDocument = () => (
  <Document
    title="Go Converto — User Guide"
    author="Go Converto"
    subject="Step-by-step roadmap for setting up and running your Go Converto AI assistant"
  >
    <Page size="A4" style={styles.page}>
      <Text style={styles.eyebrow}>Go Converto</Text>
      <Text style={styles.h1}>Your Go Converto roadmap</Text>
      <Text style={styles.subtitle}>{USER_GUIDE_INTRO}</Text>

      <View style={styles.divider} />

      <View style={styles.prereqBox} wrap={false}>
        <Text style={styles.prereqTitle}>What you&apos;ll need before you start</Text>
        {USER_GUIDE_PREREQUISITES.map((item) => (
          <Text key={item} style={styles.prereqItem}>
            {"- "}
            {item}
          </Text>
        ))}
      </View>

      {USER_GUIDE_PHASES.map((phase) => (
        <View key={phase.title} style={styles.phase} wrap={false}>
          <Text style={styles.phaseEyebrow}>{phase.eyebrow}</Text>
          <Text style={styles.phaseTitle}>{phase.title}</Text>
          <Text style={styles.phaseDescription}>{phase.description}</Text>

          {phase.steps.map((step) => (
            <View key={step.id} style={styles.step}>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.stepDescription}>{step.description}</Text>
              {step.tip && (
                <Text style={styles.stepTip}>
                  {"Tip: "}
                  {step.tip}
                </Text>
              )}
              <Link style={styles.stepLink} src={`${SITE_URL}${step.href}`}>
                {step.linkLabel} {"->"}
              </Link>
            </View>
          ))}
        </View>
      ))}

      <View style={styles.divider} />

      <View style={styles.faqSection}>
        <Text style={styles.faqTitle}>Common questions</Text>
        {USER_GUIDE_FAQS.map((faq) => (
          <View key={faq.question} style={styles.faqItem} wrap={false}>
            <Text style={styles.faqQuestion}>{faq.question}</Text>
            <Text style={styles.faqAnswer}>{faq.answer}</Text>
          </View>
        ))}
      </View>

      <View style={styles.footer} fixed>
        <Text>goconverto.com</Text>
        <Text
          render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        />
      </View>
    </Page>
  </Document>
);

export default UserGuidePdfDocument;
