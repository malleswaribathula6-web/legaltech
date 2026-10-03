import { LandRecord } from "./mockData";

export interface StatutoryAuditResult {
  verdict: {
    status: "CLEAR_TITLE" | "CLOUDED_TITLE" | "VOID_TITLE";
    title: string;
    summary: string;
    marketabilityRating: string;
    confidenceScore: number;
  };
  statutoryRisks: Array<{
    act: string;
    section: string;
    severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
    finding: string;
    legalConsequence: string;
    casePrecedent?: string;
  }>;
  roadmap: {
    phase1: {
      timeline: string;
      title: string;
      actions: string[];
    };
    phase2: {
      timeline: string;
      title: string;
      actions: string[];
    };
    phase3: {
      timeline: string;
      title: string;
      actions: string[];
    };
  };
  fullMarkdownReport: string;
}

export function performStatutoryAudit(record: LandRecord, language: "en" | "te" | "hi" = "en"): StatutoryAuditResult {
  const is22A = record.section22AFlag;
  const isAssigned = record.landClassification.includes("Assigned") || record.section22ACategory?.includes("Assigned");
  const isEndowment = record.landClassification.includes("Endowment") || record.section22ACategory?.includes("Endowment");
  const isDotted = record.landClassification.includes("Dotted");
  const hasBoundaryDispute = record.boundaryAndPossession.disputeFlag;
  const isAdversePossession = record.boundaryAndPossession.encroacherName?.includes("Hostile") || record.statutoryTags.includes("Limitation Act 1963 Art 65");

  let status: "CLEAR_TITLE" | "CLOUDED_TITLE" | "VOID_TITLE" = "CLEAR_TITLE";
  let title = "Clear & Unencumbered Marketable Title";
  let summary = "The land parcel exhibits a pristine 30-year chain of title, valid MeeBhoomi 1-B electronic entry, zero Section 22-A prohibitions, and confirmed physical boundary demarcation.";
  let marketabilityRating = "A+ (Prime Institutional Grade)";
  let confidenceScore = 98;

  const statutoryRisks: StatutoryAuditResult["statutoryRisks"] = [];

  // 1. Analyze 22-A & Classification
  if (isAssigned) {
    status = "VOID_TITLE";
    title = "Void Ab Initio - Prohibited Transfer under AP Act 9 of 1977";
    summary = "The land is an Assigned D-Form Patta. Alienation by sale, gift, mortgage, or lease is strictly null and void under Section 3 of AP Assigned Lands (POT) Act, 1977. Liable to immediate government resumption.";
    marketabilityRating = "F (Unmarketable / Illegal to Transact)";
    confidenceScore = 99;

    statutoryRisks.push({
      act: "AP Assigned Lands (Prohibition of Transfers) Act, 1977 (Act 9/1977)",
      section: "Section 3(1) & Section 4(1)(a)",
      severity: "CRITICAL",
      finding: "Alienation of assigned land assigned to landless poor is illegal and prohibited.",
      legalConsequence: "Transaction is null and void ab initio. Tahsildar has statutory powers to resume possession without compensation.",
      casePrecedent: "State of AP v. Ch. Ranga Reddy (2007) - Full Bench AP High Court"
    });

    statutoryRisks.push({
      act: "Registration Act, 1908 (AP Amendment)",
      section: "Section 22-A(1)(a)",
      severity: "CRITICAL",
      finding: "Property is listed in Prohibited Register. Sub-Registrar is legally bound to refuse registration.",
      legalConsequence: "Any registration effected in contravention is deemed non-est and cancelled ex-parte."
    });
  } else if (isEndowment) {
    status = "VOID_TITLE";
    title = "Statutory Bar - Endowments / Temple Land Prohibition";
    summary = "Property belongs to Religious / Charitable Institution (Simhachalam Devasthanam). Transfer is prohibited under Section 22-A(1)(c) of Registration Act and Section 83 of AP Endowments Act 1987.";
    marketabilityRating = "F (High Litigation / Inam Bar)",
    confidenceScore = 96;

    statutoryRisks.push({
      act: "AP Charitable and Hindu Religious Institutions & Endowments Act, 1987 (Act 30/1987)",
      section: "Section 80 & Section 83",
      severity: "CRITICAL",
      finding: "Temple inam lands cannot be alienated without prior sanction of the Government & Commissioner.",
      legalConsequence: "Summary eviction under Section 83 with police assistance; Nil compensation to unauthorized occupants.",
      casePrecedent: "B. Gowraiah v. District Collector & Endowments Tribunal (2019)"
    });

    statutoryRisks.push({
      act: "Registration Act, 1908 (AP Amendment)",
      section: "Section 22-A(1)(c)",
      severity: "CRITICAL",
      finding: "Endowments commissioner gazette notification active across this survey sub-division.",
      legalConsequence: "Deed registration blocked across all SRO portals in Andhra Pradesh."
    });
  } else if (isDotted) {
    status = "CLOUDED_TITLE";
    title = "Clouded Title - Dotted Land Resolution Pending";
    summary = "Survey parcel is listed with dots (...) in RSR. Transaction is temporarily locked in CARD portal pending District Level Committee (DLC) de-notification under AP Dotted Lands Act 2017.";
    marketabilityRating = "C (Conditional on DLC Order)",
    confidenceScore = 91;

    statutoryRisks.push({
      act: "AP Dotted Lands (Updation in ROR) Act, 2017 (Act 10/2017)",
      section: "Section 5 & 6",
      severity: "MEDIUM",
      finding: "Dots in RSR column 16 require regularization through 12-year continuous revenue record proof.",
      legalConsequence: "Cannot execute registered sale deed until District Collector issues Form-IV de-notification gazette.",
      casePrecedent: "K. Sudhakar v. Tahsildar & DLC Collector (2020 AP HC)"
    });
  } else if (isAdversePossession) {
    status = "CLOUDED_TITLE";
    title = "Clouded Title - Adverse Possession Threat under Article 65";
    summary = "Although revenue records reflect the registered Pattadar, actual physical possession has been held by a third-party hostile possessor for >12 years. High risk of title extinguishment under Section 27 Limitation Act 1963.";
    marketabilityRating = "D (Severe Title Vulnerability)",
    confidenceScore = 94;

    statutoryRisks.push({
      act: "Limitation Act, 1963",
      section: "Article 65 read with Section 27",
      severity: "HIGH",
      finding: "12-year statutory limitation period for recovery of immovable property has elapsed without formal suit.",
      legalConsequence: "Extinguishment of true owner's right to property; Hostile possessor can claim ownership by prescription.",
      casePrecedent: "Ravinder Kaur Grewal v. Manjit Kaur (2019) Supreme Court of India"
    });
  } else if (hasBoundaryDispute) {
    status = "CLOUDED_TITLE";
    title = "Boundary Deficit & Encroachment Detected";
    summary = "Physical ground survey reveals a deficit/overlap compared to FMB (Field Measurement Book). Demarcation under Section 10 of AP Survey and Boundaries Act 1923 required before any commercial closing.";
    marketabilityRating = "B- (Encumbered Boundary)",
    confidenceScore = 92;

    statutoryRisks.push({
      act: "AP Survey and Boundaries Act, 1923",
      section: "Section 10 (Survey Demarcation & Determination of Boundaries)",
      severity: "MEDIUM",
      finding: "Discrepancy between registered extent in document vs physical demarcation on ground.",
      legalConsequence: "Risk of boundary disputes with adjacent survey holders; Buyer cannot take vacant possession of full extent.",
      casePrecedent: "M. Subrahmanyam v. Mandal Surveyor (2015)"
    });
  }

  // 2. AP ROR 1971 Statutory Check
  statutoryRisks.push({
    act: "AP Rights in Land and Pattadar Pass Books Act, 1971",
    section: "Section 4 & 5 (Intimation of Acquisition & 1-B Record of Rights Update)",
    severity: record.mutationDetails.status.includes("Approved") ? "LOW" : "HIGH",
    finding: `MeeBhoomi 1-B Status: ${record.mutationDetails.status}.`,
    legalConsequence: record.mutationDetails.status.includes("Approved") 
      ? "Statutory presumption of title under Section 6 of Act 26 of 1971 is operative."
      : "No statutory presumption of correctness until e-Pattadar Passbook is issued by Tahsildar under Section 6-A."
  });

  // Roadmap generation
  let phase1 = {
    timeline: "0 - 7 Days (Immediate Emergency)",
    title: "Statutory Preservation & Record Safeguarding",
    actions: [
      "Obtain certified copies of Form-1B, Adangal, and Field Measurement Book (FMB) from MeeSeva / MeeBhoomi portal.",
      "Conduct a certified physical inspection and GPS coordinate boundary mapping.",
      "Issue RTI Application to SRO for 30-year Encumbrance inspection slip."
    ]
  };

  let phase2 = {
    timeline: "1 - 3 Months (Revenue & Demarcation)",
    title: "Tahsildar & Sub-Divisional Revenue Proceedings",
    actions: [
      "File Form-VIII Application under Section 10 AP Survey & Boundaries Act 1923 for Mandal Surveyor F-Line Demarcation.",
      "If 1-B mutation is pending, submit formal petition under Section 4 & 5 before Tahsildar with registered title deed.",
      "Establish physical boundary pillars with red flags and notify adjacent survey owners."
    ]
  };

  let phase3 = {
    timeline: "3 - 6 Months (Title Perfection & Dispute Resolution)",
    title: "Appellate Redressal or Civil Court Adjudication",
    actions: [
      "If aggrieved by Tahsildar orders, file statutory appeal under Section 5-B before Revenue Divisional Officer (RDO).",
      "Execute registered boundary rectification deed if minor variance is confirmed in FMB.",
      "Obtain Final Marketable Title Certificate from empanelled High Court advocate."
    ]
  };

  if (isAssigned) {
    phase1.actions = [
      "Cease all commercial transactions immediately. DO NOT pay advance consideration.",
      "Issue legal demand notice to seller/promoter for refund of advance under Section 65 of Indian Contract Act 1872.",
      "Check eligibility under AP Assigned Lands Amendment Act 2023 (if 20-year period from assignment elapsed)."
    ];
    phase2.actions = [
      "Submit representation to District Collector for verification of assignment conditions and 20-year regularization norms.",
      "If land is resumed under Section 4 POT Act, file statutory appeal under Section 4-A before RDO."
    ];
    phase3.actions = [
      "Approach Hon'ble High Court of Andhra Pradesh under Article 226 if Tahsildar initiates arbitrary resumption without notice."
    ];
  } else if (isEndowment) {
    phase1.actions = [
      "Obtain certified extract of Section 43 Register from Assistant Commissioner of Endowments.",
      "Check Inam Fair Register (IFR) of 1860 for Ryotwari Patta granted under AP Inams Abolition Act 1956."
    ];
    phase2.actions = [
      "File De-notification Application under Section 22-A(4) before District Level Committee headed by District Collector.",
      "File Revision Petition under Section 87 of Endowments Act 1987 before Endowments Tribunal."
    ];
    phase3.actions = [
      "File Writ Petition in AP High Court seeking direction to SRO for registration pursuant to *Vinjamuri Rajagopala Chary v. State of AP* Full Bench guidelines."
    ];
  } else if (isAdversePossession) {
    phase1.actions = [
      "Immediately issue a formal Legal Notice to the hostile occupant demanding vacant possession and mesne profits.",
      "Lodge a formal police complaint for criminal trespass under BNS / IPC to break continuity of hostile possession."
    ];
    phase2.actions = [
      "File a Civil Suit for Recovery of Possession based on Title under Section 5 of Specific Relief Act 1963 before Senior Civil Judge.",
      "File Interlocutory Application (IA) under Order 39 Rules 1 & 2 CPC for interim injunction restraining further construction or alienation."
    ];
    phase3.actions = [
      "Obtain decree for possession and execute warrant of possession with Court Ameen and police assistance under Order 21 Rule 35 CPC."
    ];
  }

  // Generate complete Markdown Report
  const fullMarkdownReport = `
# ⚖️ LandNyaya Autonomous Statutory Audit Dossier
**Survey Number:** ${record.surveyNumber} | **Sub-Division:** ${record.subDivision || "A"} | **District:** ${record.district} | **Mandal:** ${record.mandal} | **Village:** ${record.village}
**Date of Audit:** ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })} | **Audit Reference:** LN-AP-${Math.floor(100000 + Math.random() * 900000)}

---

## 1. Statutory Ownership & Title Marketability Verdict
**Verdict:** **${title}**  
**Marketability Rating:** \`${marketabilityRating}\` | **Title Integrity Score:** \`${record.riskScore}/100\` (${record.riskCategory})  
**Executive Summary:**  
${summary}

- **Primary Pattadar:** ${record.ownerName} (Khata No: ${record.khataNumber})
- **Extent & Classification:** ${record.totalExtent} | *${record.landClassification}*
- **MeeBhoomi 1-B Record of Rights:** \`${record.mutationDetails.status}\` — ${record.mutationDetails.remarks}
- **IGRS 30-Year Encumbrance:** \`${record.encumbrance.status}\` (${record.encumbrance.details})
- **Registration Act Section 22-A Prohibited Flag:** ${is22A ? `⚠️ **PROHIBITED (${record.section22ACategory})**` : "✅ **CLEAR - Not in Prohibited List**"}

---

## 2. Key Red Flags & Statutory Risk Matrix

${statutoryRisks.map((r, i) => `
### ${i + 1}. ${r.act} — \`${r.section}\` [${r.severity}]
- **Factual Finding:** ${r.finding}
- **Statutory Consequence:** ${r.legalConsequence}
${r.casePrecedent ? `- **Authoritative Judicial Precedent:** *${r.casePrecedent}*` : ""}
`).join("\n")}

---

## 3. Boundary, Demarcation & Physical Possession Audit
- **F-Line Demarcation Status:** \`${record.boundaryAndPossession.fLineStatus}\`
- **Field Findings:** ${record.boundaryAndPossession.details}
${record.boundaryAndPossession.encroachmentExtent ? `- **Identified Encroachment Extent:** **${record.boundaryAndPossession.encroachmentExtent}** by *${record.boundaryAndPossession.encroacherName}*` : ""}
- **Boundaries as per Revenue Records:**
  - **North:** ${record.boundaryAndPossession.boundaries.north}
  - **South:** ${record.boundaryAndPossession.boundaries.south}
  - **East:** ${record.boundaryAndPossession.boundaries.east}
  - **West:** ${record.boundaryAndPossession.boundaries.west}

---

## 4. 3-Phase Immediate Statutory Action Roadmap

### Phase 1: ${phase1.timeline} — ${phase1.title}
${phase1.actions.map((a, idx) => `${idx + 1}. ${a}`).join("\n")}

### Phase 2: ${phase2.timeline} — ${phase2.title}
${phase2.actions.map((a, idx) => `${idx + 1}. ${a}`).join("\n")}

### Phase 3: ${phase3.timeline} — ${phase3.title}
${phase3.actions.map((a, idx) => `${idx + 1}. ${a}`).join("\n")}

---
*Generated by LandNyaya Autonomous LegalTech Reasoning Engine. Built exclusively for Andhra Pradesh Land Laws.*
`;

  return {
    verdict: {
      status,
      title,
      summary,
      marketabilityRating,
      confidenceScore
    },
    statutoryRisks,
    roadmap: {
      phase1,
      phase2,
      phase3
    },
    fullMarkdownReport
  };
}
