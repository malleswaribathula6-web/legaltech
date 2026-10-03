import { LandRecord } from "./mockData";

export interface PetitionTemplate {
  id: string;
  title: string;
  actTitle: string;
  targetAuthority: string;
  category: "DEMARCATION" | "MUTATION_APPEAL" | "22A_DELISTING" | "ENCROACHMENT_NOTICE";
  generateText: (record: LandRecord, customDetails?: Record<string, string>) => string;
}

export const PETITION_TEMPLATES: PetitionTemplate[] = [
  {
    id: "fline-demarcation-sec10",
    title: "Form-VIII: F-Line Survey Demarcation Petition",
    actTitle: "AP Survey and Boundaries Act, 1923 (Section 10)",
    targetAuthority: "The Tahsildar / Mandal Executive Magistrate",
    category: "DEMARCATION",
    generateText: (record) => {
      const today = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
      return `BEFORE THE HON'BLE TAHSILDAR & MANDAL EXECUTIVE MAGISTRATE
MANDAL REVENUE OFFICE, ${record.mandal.toUpperCase()} MANDAL, ${record.district.toUpperCase()} DISTRICT, ANDHRA PRADESH

APPLICATION UNDER SECTION 10 OF THE ANDHRA PRADESH SURVEY AND BOUNDARIES ACT, 1923
READ WITH FORM-VIII (RULE 43) OF AP SURVEY RULES

PETITIONER:
${record.ownerName}
S/o ${record.fatherOrHusbandName}
Resident of ${record.village} Village, ${record.mandal} Mandal, ${record.district} District, A.P.
Contact / Aadhaar: Linked (Pattadar Passbook No: ${record.pattadarPassbookNo})

VERSUS

RESPONDENTS / ADJACENT LAND OWNERS:
1. Owner / Cultivator of Northern Boundary (Survey No: ${record.boundaryAndPossession.boundaries.north})
2. Owner / Cultivator of Southern Boundary (Survey No: ${record.boundaryAndPossession.boundaries.south})
3. Owner / Cultivator of Eastern Boundary (Survey No: ${record.boundaryAndPossession.boundaries.east})
4. Owner / Cultivator of Western Boundary (Survey No: ${record.boundaryAndPossession.boundaries.west})

---

MEMORANDUM OF APPLICATION

1. The Petitioner is the absolute owner and peaceful possessor of agricultural/patta land admeasuring ${record.totalExtent} situated in Survey No. ${record.surveyNumber} (Khata No: ${record.khataNumber}) of ${record.village} Village, ${record.mandal} Mandal, ${record.district} District.

2. The Petitioner acquired the schedule property through registered deed / lawful ancestral succession and the Petitioner's name is duly recorded in the MeeBhoomi Record of Rights (1-B Register) and e-Pattadar Passbook bearing No. ${record.pattadarPassbookNo} issued by your office.

3. It is respectfully submitted that certain boundary stones on the ${record.boundaryAndPossession.fLineStatus.includes("Dispute") ? "disputed corridor" : "outer perimeters"} have been damaged/disturbed due to recent weather and third-party activities. An immediate survey, sub-division measurement, and fixing of standard boundary stones (F-Line Demarcation) is imperative in terms of the Field Measurement Book (FMB).

4. The Petitioner has paid the prescribed government user survey fee via MeeSeva / CFMS Treasury Challan.

PRAYER:
Wherefore, it is most respectfully prayed that this Hon'ble Authority may be pleased to:
a) Direct the Mandal Surveyor / Village Revenue Officer to conduct an on-ground F-Line survey of Survey No. ${record.surveyNumber} in ${record.village} Village;
b) Fix permanent survey boundary stones at Point A, Point B, Point C, and Point D in accordance with the certified FMB map;
c) Issue a certified Survey Demarcation Panchanama Copy to the Petitioner after serving due notice to adjacent owners under Section 10(2) of the Act.

Date: ${today}
Place: ${record.mandal}

(Signature of Petitioner / Pattadar)
${record.ownerName}

SCHEDULE OF PROPERTY:
District: ${record.district} | Mandal: ${record.mandal} | Village: ${record.village}
Survey No: ${record.surveyNumber} | Extent: ${record.totalExtent} | Classification: ${record.landClassification}
Boundaries:
North: ${record.boundaryAndPossession.boundaries.north}
South: ${record.boundaryAndPossession.boundaries.south}
East:  ${record.boundaryAndPossession.boundaries.east}
West:  ${record.boundaryAndPossession.boundaries.west}`;
    }
  },
  {
    id: "sec5b-ror-appeal",
    title: "Section 5-B Statutory Appeal (1-B Mutation Correction)",
    actTitle: "AP Rights in Land and Pattadar Pass Books Act, 1971 (Section 5-B)",
    targetAuthority: "The Revenue Divisional Officer (RDO) / Sub-Collector",
    category: "MUTATION_APPEAL",
    generateText: (record) => {
      const today = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
      return `BEFORE THE COURT OF THE REVENUE DIVISIONAL OFFICER / SUB-COLLECTOR
REVENUE DIVISION, ${record.district.toUpperCase()} DISTRICT, ANDHRA PRADESH

STATUTORY APPEAL UNDER SECTION 5-B OF THE ANDHRA PRADESH RIGHTS IN LAND AND PATTADAR PASS BOOKS ACT, 1971 (ACT 26 OF 1971)

APPEAL NO: ______ OF 2026

APPELLANT:
${record.ownerName}, S/o ${record.fatherOrHusbandName},
Resident of ${record.village} Village, ${record.mandal} Mandal, ${record.district} District.

VERSUS

RESPONDENTS:
1. The Tahsildar, ${record.mandal} Mandal, ${record.district} District.
2. The Village Revenue Officer (VRO), ${record.village} Village.

---

MEMORANDUM OF APPEAL GROUNDS

1. The Appellant submits that they are the lawful title-holder of land admeasuring ${record.totalExtent} in Survey No. ${record.surveyNumber}, ${record.village} Village, having acquired title through registered document / continuous lawful title.

2. That the Respondent No. 1 (Tahsildar) has failed to discharge statutory duty under Section 5(1) and Section 5(3) of Act 26 of 1971 by failing to effectuate prompt mutation / wrongfully reflecting disputed remarks in the Webland 2.0 electronic Record of Rights (1-B).

3. That under Section 4 of the Act, intimation of acquisition of rights was duly submitted along with requisite certified registered deeds and tax receipts. The non-issuance / delay of computerized e-Pattadar Passbook is arbitrary, unconstitutional, and violative of the principles of natural justice.

4. That the Appellant is in uninterrupted physical possession and cultivation of the land parcel and is entitled to statutory presumption of correctness under Section 6 of the Act.

PRAYER:
The Appellant therefore prays that this Hon'ble Appellate Authority may be pleased to:
a) Set aside any adverse entry/inaction in the Webland portal regarding Survey No. ${record.surveyNumber};
b) Direct Respondent No. 1 (Tahsildar) to promptly update Form 1-B in favor of the Appellant and issue updated Title Deed-cum-e-Pattadar Passbook;
c) Pass such other order or orders as this Hon'ble Court may deem fit and proper in the interests of justice.

Date: ${today}
Place: ${record.district}

(Signature of Appellant)
${record.ownerName}
Advocate for Appellant`;
    }
  },
  {
    id: "sec22a-denotification",
    title: "Section 22-A De-notification Representation to District Collector",
    actTitle: "Registration Act, 1908 (AP Section 22-A(4))",
    targetAuthority: "The District Collector & District Magistrate",
    category: "22A_DELISTING",
    generateText: (record) => {
      const today = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
      return `TO:
THE HON'BLE DISTRICT COLLECTOR & DISTRICT MAGISTRATE
${record.district.toUpperCase()} DISTRICT, ANDHRA PRADESH
CHAIRMAN, DISTRICT LEVEL DE-NOTIFICATION COMMITTEE (SECTION 22-A)

SUB: REPRESENTATION FOR DE-NOTIFICATION / DE-LISTING OF LAND IN SURVEY NO. ${record.surveyNumber} OF ${record.village.toUpperCase()} VILLAGE FROM SECTION 22-A PROHIBITED REGISTER UNDER REGISTRATION ACT, 1908.

RESPECTED SIR,

1. The Applicant, ${record.ownerName}, S/o ${record.fatherOrHusbandName}, is the absolute owner of land admeasuring ${record.totalExtent} situated in Survey No. ${record.surveyNumber} (Sub-Division ${record.subDivision || "Main"}), ${record.village} Village, ${record.mandal} Mandal, ${record.district} District.

2. The Applicant's land has been erroneously included in the Prohibited Properties Register under Section 22-A of the Registration Act, 1908 under the category: "${record.section22ACategory || "Prohibited Register"}".

3. GROUNDS FOR DE-NOTIFICATION:
   a) The subject land is private ancestral Ryotwari Patta land having a clear chain of title exceeding 50+ years prior to 1954.
   b) As held by the Full Bench of the Hon'ble High Court of Andhra Pradesh in 'Vinjamuri Rajagopala Chary v. State of Andhra Pradesh' (2016 (1) ALT 550 FB), mechanical inclusion without speaking order and prior inquiry is illegal and void.
   c) The revenue records (Re-Settlement Register / RSR 10-1 Account) clearly corroborate that the land is private patta and not government poramboke or inalienable endowment land.

4. PRAYER:
   The Applicant respectfully requests the District Level Committee headed by the Hon'ble District Collector to:
   a) Conduct an expeditious field and record inquiry through the Revenue Divisional Officer;
   b) Pass a speaking order de-notifying Survey No. ${record.surveyNumber} of ${record.village} Village from the Section 22-A Prohibited List;
   c) Issue formal communication to the concerned Sub-Registrar (SRO) to accept deeds for registration.

Enclosures:
1. Certified Copy of 1954 RSR / Diglot Extract
2. Certified 30-Year Encumbrance Certificate
3. Registered Title Deeds & Pattadar Passbook Copy

Date: ${today}
Place: ${record.district}

Yours faithfully,

${record.ownerName}
(Applicant / Landowner)`;
    }
  },
  {
    id: "encroachment-cease-desist",
    title: "Legal Notice for Immediate Removal of Encroachment & Trespass",
    actTitle: "Specific Relief Act, 1963 & Bharatiya Nyaya Sanhita (BNS)",
    targetAuthority: "Encroacher / Adjacent Trespasser",
    category: "ENCROACHMENT_NOTICE",
    generateText: (record) => {
      const today = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
      const encroacher = record.boundaryAndPossession.encroacherName || "Adjacent Occupant / Trespasser";
      return `REGISTERED POST WITH ACKNOWLEDGEMENT DUE (RPAD) & SPEED POST

LEGAL NOTICE UNDER SECTION 106 T.P. ACT & SECTION 5 SPECIFIC RELIEF ACT

DATE: ${today}

FROM:
LEGAL COUNSEL ON BEHALF OF:
${record.ownerName}, S/o ${record.fatherOrHusbandName},
Resident of ${record.village} Village, ${record.mandal} Mandal, ${record.district} District.

TO:
${encroacher}
Adjacent Boundary Occupant,
Survey No. ${record.surveyNumber} Vicinity, ${record.village} Village, ${record.mandal} Mandal, ${record.district} District.

SIR/MADAM,

Under instructions from and on behalf of our client, ${record.ownerName}, we hereby serve upon you this Legal Notice:

1. Our client is the absolute lawful owner and Pattadar in possession of land admeasuring ${record.totalExtent} situated in Survey No. ${record.surveyNumber}, ${record.village} Village, ${record.mandal} Mandal, covered by Khata No. ${record.khataNumber} and e-Pattadar Passbook No. ${record.pattadarPassbookNo}.

2. In the third week of recent months, taking unlawful advantage of our client's temporary absence, you have unauthorizedly trespassed into an extent of approximately ${record.boundaryAndPossession.encroachmentExtent || "disputed boundary"} along the corridor and erected illegal barricades/fences without any legal right or title.

3. Your illegal act constitutes:
   a) Unlawful Civil Encroachment and actionable Trespass under the Law of Torts;
   b) Criminal Trespass and Mischief under relevant provisions of the Bharatiya Nyaya Sanhita (BNS);
   c) Direct interference with our client's statutory rights under the AP Rights in Land & Pattadar Pass Books Act, 1971.

4. WE HEREBY CALL UPON YOU to immediately:
   a) Demolish and remove all unauthorized structures/fences within 7 (SEVEN) DAYS of receipt of this notice;
   b) Restore vacant, peaceful physical possession to our client;
   c) Desist from interfering with the F-Line survey demarcation conducted by the Mandal Surveyor.

FAILING WHICH, our client has given us strict instructions to institute a Civil Suit for Permanent Injunction, Mandatory Injunction, Recovery of Possession, and Damages of ₹5,00,000/- before the competent Civil Court, holding you liable for all costs and consequences.

(Advocate Signature)
High Court of Andhra Pradesh / District Bar Association`;
    }
  }
];
