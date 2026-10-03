export interface LandRecord {
  surveyNumber: string;
  subDivision?: string;
  lpNumber?: string;
  district: string;
  mandal: string;
  village: string;
  khataNumber: string;
  ownerName: string;
  fatherOrHusbandName: string;
  pattadarPassbookNo: string;
  aadhaarLinked: boolean;
  totalExtent: string; // e.g. "Ac. 2.45 Cts"
  extentInAcres: number;
  extentInCents: number;
  landClassification: "Ryotwari Patta (Dry)" | "Ryotwari Patta (Wet)" | "Government Poramboke" | "Assigned Land (POT)" | "Endowment / Temple Land" | "Dotted Land (చుక్కల భూమి)" | "Gramakantam / Abadi" | "Inam Land";
  marketValuePerAcre: string;
  totalEstimatedValue: string;
  
  // MeeBhoomi 1-B & Adangal
  mutationDetails: {
    status: "Approved & Digitally Signed" | "Mutation Pending under Sec 5" | "Rejected / In Disputed Register" | "Discrepancy in Khata Linkage";
    remarks: string;
    lastMutationDate: string;
    tahsildarOffice: string;
    rorStatus: string;
    cultivatorName: string;
  };

  // IGRS Encumbrance
  encumbrance: {
    status: "Nil Encumbrance (Clean 30-Year Trace)" | "Active Bank Mortgage Registered" | "Court Attachment / Lis Pendens" | "Multiple Conflicting Conveyances";
    details: string;
    certificateNo: string;
    searchPeriod: string;
    registeredDeeds: Array<{
      docNo: string;
      year: string;
      deedType: string;
      executant: string;
      claimant: string;
      extent: string;
    }>;
  };

  // AP Registration Act Section 22-A
  section22AFlag: boolean;
  section22ACategory?: string;
  section22AReason?: string;
  deNotificationStatus?: string;

  // F-Line Demarcation & Boundary
  boundaryAndPossession: {
    details: string;
    fLineStatus: "Demarcated & Field Stones Fixed" | "Pending Sec 10 Demarcation" | "Disputed Overlap Detected" | "Encroachment Notice Issued";
    disputeFlag: boolean;
    encroachmentExtent?: string;
    encroacherName?: string;
    boundaries: {
      north: string;
      south: string;
      east: string;
      west: string;
    };
    gpsCoordinates: {
      pointA: [number, number];
      pointB: [number, number];
      pointC: [number, number];
      pointD: [number, number];
    };
  };

  // Statutory Risk Score (0 - 100)
  riskScore: number;
  riskCategory: "LOW_RISK" | "MEDIUM_RISK" | "HIGH_RISK" | "CRITICAL_VOID";
  statutoryTags: string[];
}

export const PRESET_LAND_RECORDS: Record<string, LandRecord> = {
  // Case 1: Clear Marketable Title (Vijayawada / Penamaluru)
  "104/2": {
    surveyNumber: "104/2",
    subDivision: "2B",
    lpNumber: "LP-AP-NTR-2024-00981",
    district: "NTR (Vijayawada)",
    mandal: "Penamaluru",
    village: "Tadigadapa",
    khataNumber: "1429",
    ownerName: "Muppala Venkata Satyanarayana Rao",
    fatherOrHusbandName: "Late M. Koteswara Rao",
    pattadarPassbookNo: "APPPB-NTR-882194",
    aadhaarLinked: true,
    totalExtent: "Ac. 2.50 Cts (10,890 Sq.Yds)",
    extentInAcres: 2,
    extentInCents: 50,
    landClassification: "Ryotwari Patta (Dry)",
    marketValuePerAcre: "₹ 1,20,00,000 / Acre",
    totalEstimatedValue: "₹ 3,00,00,000",
    mutationDetails: {
      status: "Approved & Digitally Signed",
      remarks: "Clear e-Pattadar Passbook issued under AP ROR Act 1971. Form-1B electronically verified with biometric authentication.",
      lastMutationDate: "14-Aug-2021",
      tahsildarOffice: "Tahsildar Penamaluru, NTR District",
      rorStatus: "Khata verified & synced with Webland 2.0",
      cultivatorName: "Self (Pattadar in actual physical possession)"
    },
    encumbrance: {
      status: "Nil Encumbrance (Clean 30-Year Trace)",
      details: "Search conducted from 01-Jan-1994 to present (30+ years). Absolute ancestral succession followed by registered partition deed No. 4412/2012 SRO Kankipadu. Nil ongoing court attachments.",
      certificateNo: "EC-NTR-2024-099412",
      searchPeriod: "01/01/1994 to 01/10/2026",
      registeredDeeds: [
        { docNo: "4412/2012", year: "2012", deedType: "Registered Partition Deed", executant: "Family Co-parceners", claimant: "M. V. Satyanarayana Rao", extent: "Ac. 2.50 Cts" }
      ]
    },
    section22AFlag: false,
    boundaryAndPossession: {
      details: "Four clear concrete survey boundary stones fixed. Clear 30ft access road on East. No active encroachment or trespass complaint logged.",
      fLineStatus: "Demarcated & Field Stones Fixed",
      disputeFlag: false,
      boundaries: {
        north: "Land in Survey No. 104/1 (G. Raghava Rao)",
        south: "Land in Survey No. 104/3 (Gram Panchayat Channel)",
        east: "30-Feet R&B Village Approach Road",
        west: "Land in Survey No. 105 (K. Sambasiva Rao)"
      },
      gpsCoordinates: {
        pointA: [16.4851, 80.6892],
        pointB: [16.4862, 80.6908],
        pointC: [16.4848, 80.6915],
        pointD: [16.4839, 80.6899]
      }
    },
    riskScore: 8,
    riskCategory: "LOW_RISK",
    statutoryTags: ["Clear Title", "MeeBhoomi 1-B Clean", "30-Yr Clean EC", "Ryotwari Patta"]
  },

  // Case 2: Endowments / Simhachalam Section 22-A Flag (Visakhapatnam)
  "88/4A": {
    surveyNumber: "88/4A",
    subDivision: "4A-1",
    lpNumber: "LP-AP-VSP-2023-4109",
    district: "Visakhapatnam",
    mandal: "Madhurawada",
    village: "Madhurawada",
    khataNumber: "912",
    ownerName: "Pothula Appala Raju (Claimant)",
    fatherOrHusbandName: "P. Gurumurthy",
    pattadarPassbookNo: "APPPB-VSP-449102 (Suspended)",
    aadhaarLinked: true,
    totalExtent: "Ac. 1.75 Cts (7,623 Sq.Yds)",
    extentInAcres: 1,
    extentInCents: 75,
    landClassification: "Endowment / Temple Land",
    marketValuePerAcre: "₹ 3,50,00,000 / Acre",
    totalEstimatedValue: "₹ 6,12,50,000",
    mutationDetails: {
      status: "Discrepancy in Khata Linkage",
      remarks: "Mutation frozen pursuant to District Collector & Endowments Commissioner Gazette Notification. Claimed as Sri Varaha Lakshmi Narasimha Swamy Devasthanam (Simhachalam) Inam land.",
      lastMutationDate: "03-Feb-2017",
      tahsildarOffice: "Tahsildar Bheemunipatnam / Madhurawada Sub-Division",
      rorStatus: "Inam Title Register Entry 1860 & Endowments Sec 43 Register Match",
      cultivatorName: "Disputed Cultivation / Commercial Shed"
    },
    encumbrance: {
      status: "Court Attachment / Lis Pendens",
      details: "Writ Petition WP No. 22109/2021 pending before Hon'ble High Court of Andhra Pradesh challenging Sec 22-A(1)(c) notification. Registration prohibited under IGRS AP gazette.",
      certificateNo: "EC-VSP-2024-558110",
      searchPeriod: "01/01/1990 to 01/10/2026",
      registeredDeeds: [
        { docNo: "2201/2004", year: "2004", deedType: "Unregistered GPA Agreement", executant: "Private Developer", claimant: "P. Appala Raju", extent: "Ac. 1.75 Cts" }
      ]
    },
    section22AFlag: true,
    section22ACategory: "Section 22-A(1)(c) - Endowments / Religious Institution Land",
    section22AReason: "Notified under AP Charitable & Hindu Religious Institutions & Endowments Act 1987. Registration barred under Sec 22-A Registration Act.",
    deNotificationStatus: "De-notification Application rejected by Endowments Tribunal; Review pending with Commissioner.",
    boundaryAndPossession: {
      details: "Boundary overlap with Temple Devasthanam compound wall. Notice issued under Sec 83 of AP Endowments Act 1987 for removal of encroachment.",
      fLineStatus: "Disputed Overlap Detected",
      disputeFlag: true,
      encroachmentExtent: "0.45 Cents",
      encroacherName: "Temple Administration Buffer Wall & Local Commercial Sheds",
      boundaries: {
        north: "Simhachalam Hill Footpath Reserve",
        south: "Survey No. 89 (Private Layout)",
        east: "National Highway 16 Buffer Zone",
        west: "Devasthanam Survey No. 88/3"
      },
      gpsCoordinates: {
        pointA: [17.8184, 83.3491],
        pointB: [17.8198, 83.3510],
        pointC: [17.8175, 83.3524],
        pointD: [17.8162, 83.3501]
      }
    },
    riskScore: 94,
    riskCategory: "CRITICAL_VOID",
    statutoryTags: ["Section 22-A(1)(c) Red Flag", "Simhachalam Devasthanam Dispute", "Registration Prohibited", "Endowments Act Sec 83 Notice"]
  },

  // Case 3: Boundary Encroachment & F-Line Discrepancy (Mangalagiri / Guntur)
  "45/1": {
    surveyNumber: "45/1",
    subDivision: "1A",
    lpNumber: "LP-AP-GNT-2023-7729",
    district: "Guntur",
    mandal: "Mangalagiri",
    village: "Nowlur",
    khataNumber: "633",
    ownerName: "Garapati Srinivasa Rao",
    fatherOrHusbandName: "G. Venkateswarlu",
    pattadarPassbookNo: "APPPB-GNT-339182",
    aadhaarLinked: true,
    totalExtent: "Ac. 3.10 Cts (13,486 Sq.Yds)",
    extentInAcres: 3,
    extentInCents: 10,
    landClassification: "Ryotwari Patta (Dry)",
    marketValuePerAcre: "₹ 2,80,00,000 / Acre",
    totalEstimatedValue: "₹ 8,68,00,000",
    mutationDetails: {
      status: "Approved & Digitally Signed",
      remarks: "Pattadar passbook updated in 2018. However, physical extent on ground is Ac. 2.82 Cts, showing a deficit of 28 Cents compared to FMB (Field Measurement Book).",
      lastMutationDate: "19-Nov-2018",
      tahsildarOffice: "Tahsildar Mangalagiri, Guntur District",
      rorStatus: "MeeBhoomi 1-B shows 3.10 Acres, Ground Verification indicates discrepancy",
      cultivatorName: "Self & Tenant Cultivator"
    },
    encumbrance: {
      status: "Nil Encumbrance (Clean 30-Year Trace)",
      details: "Registered Sale Deed No. 1820/1998 SRO Mangalagiri. Zero registered mortgages or money decrees on file.",
      certificateNo: "EC-GNT-2024-883912",
      searchPeriod: "01/01/1994 to 01/10/2026",
      registeredDeeds: [
        { docNo: "1820/1998", year: "1998", deedType: "Absolute Sale Deed", executant: "V. Subba Rao", claimant: "Garapati Srinivasa Rao", extent: "Ac. 3.10 Cts" }
      ]
    },
    section22AFlag: false,
    boundaryAndPossession: {
      details: "Adjacent owner in Survey 45/2 has erected a barbed wire fence encroaching 28 cents into the eastern corridor. F-Line demarcation petition filed under Section 10 of AP Survey and Boundaries Act 1923.",
      fLineStatus: "Pending Sec 10 Demarcation",
      disputeFlag: true,
      encroachmentExtent: "28 Cents (1,219 Sq.Yds)",
      encroacherName: "K. Nageswara Rao (Adjacent Survey 45/2 Owner)",
      boundaries: {
        north: "Survey No. 44 (Irrigation Channel)",
        south: "Survey No. 46 (Agricultural Land)",
        east: "Survey No. 45/2 (Encroached boundary)",
        west: "Panchayat Tar Road"
      },
      gpsCoordinates: {
        pointA: [16.4385, 80.5512],
        pointB: [16.4398, 80.5539],
        pointC: [16.4378, 80.5548],
        pointD: [16.4365, 80.5521]
      }
    },
    riskScore: 58,
    riskCategory: "MEDIUM_RISK",
    statutoryTags: ["Boundary Discrepancy", "28 Cents Physical Deficit", "AP Survey Act Sec 10 Demarcation Required", "FMB Discrepancy"]
  },

  // Case 4: Assigned Land POT Act Violation (Chandragiri / Tirupati)
  "112/B": {
    surveyNumber: "112/B",
    subDivision: "B2",
    lpNumber: "LP-AP-TPT-2022-1088",
    district: "Tirupati",
    mandal: "Chandragiri",
    village: "A.Rangampeta",
    khataNumber: "405",
    ownerName: "Chelluri Venkatesh (Purchaser via Unregistered Agreement)",
    fatherOrHusbandName: "C. Munirathnam",
    pattadarPassbookNo: "APPPB-TPT-001923 (Assigned D-Patta)",
    aadhaarLinked: false,
    totalExtent: "Ac. 1.50 Cts (6,534 Sq.Yds)",
    extentInAcres: 1,
    extentInCents: 50,
    landClassification: "Assigned Land (POT)",
    marketValuePerAcre: "₹ 80,00,000 / Acre",
    totalEstimatedValue: "₹ 1,20,00,000",
    mutationDetails: {
      status: "Rejected / In Disputed Register",
      remarks: "Originally assigned as D-Form Patta in 1984 for landless poor. Transfer/alienation is strictly prohibited under AP Assigned Lands (Prohibition of Transfers) Act, 1977 (Act 9 of 1977).",
      lastMutationDate: "12-Jan-1984 (Original Grant)",
      tahsildarOffice: "Tahsildar Chandragiri, Tirupati District",
      rorStatus: "Assigned Category - Mutation to non-assignee rejected under Sec 3 of POT Act",
      cultivatorName: "Unlawful Transferee / Purchaser"
    },
    encumbrance: {
      status: "Multiple Conflicting Conveyances",
      details: "Agreement of Sale executed on ₹100 stamp paper in 2016. SRO rejected registration quoting Sec 22-A(1)(a) & Act 9 of 1977.",
      certificateNo: "EC-TPT-2024-118490",
      searchPeriod: "01/01/1980 to 01/10/2026",
      registeredDeeds: []
    },
    section22AFlag: true,
    section22ACategory: "Section 22-A(1)(a) - Assigned Land under AP Act 9 of 1977",
    section22AReason: "D-Form Assigned Patta alienated in violation of condition of non-alienability. Land is liable for resumption to Government under Section 4 of POT Act.",
    deNotificationStatus: "Strictly Non-Transferable. No de-notification permitted unless covered by AP Assigned Lands Amendment Act 2023 (20-year rule with Collector sanction).",
    boundaryAndPossession: {
      details: "Tahsildar Form-I notice issued for resumption of land under Section 4(1)(a) of AP Act 9 of 1977.",
      fLineStatus: "Encroachment Notice Issued",
      disputeFlag: true,
      encroachmentExtent: "Entire 1.50 Acres",
      encroacherName: "Purchaser under void transaction",
      boundaries: {
        north: "Government Poramboke Vagu",
        south: "Survey No. 113 (Private Patta)",
        east: "Survey No. 112/A (Original Assignee)",
        west: "Village Cart Track"
      },
      gpsCoordinates: {
        pointA: [13.5821, 79.3142],
        pointB: [13.5834, 79.3160],
        pointC: [13.5818, 79.3172],
        pointD: [13.5805, 79.3150]
      }
    },
    riskScore: 98,
    riskCategory: "CRITICAL_VOID",
    statutoryTags: ["AP Assigned Lands Act 1977", "Void Ab Initio under Sec 3", "Liable for Govt Resumption", "Sec 22-A(1)(a) Blocked"]
  },

  // Case 5: Dotted Land (చుక్కల భూమి) / ROR 1-B Resolution Pending (Gannavaram / Krishna)
  "210/3": {
    surveyNumber: "210/3",
    subDivision: "3",
    lpNumber: "LP-AP-KRI-2024-5502",
    district: "Krishna",
    mandal: "Gannavaram",
    village: "Savargudem",
    khataNumber: "Unassigned (Dotted Land)",
    ownerName: "Kolli Sambasiva Rao & Legal Heirs",
    fatherOrHusbandName: "K. Ranga Rao",
    pattadarPassbookNo: "Pending Regularization",
    aadhaarLinked: true,
    totalExtent: "Ac. 4.20 Cts (18,295 Sq.Yds)",
    extentInAcres: 4,
    extentInCents: 20,
    landClassification: "Dotted Land (చుక్కల భూమి)",
    marketValuePerAcre: "₹ 1,50,00,000 / Acre",
    totalEstimatedValue: "₹ 6,30,00,000",
    mutationDetails: {
      status: "Mutation Pending under Sec 5",
      remarks: "Land marked with dots (...) in Column 16 of Re-Settlement Register (RSR). Application filed under AP Dotted Lands (Updation in ROR) Act, 2017 (Act 10 of 2017) before District Level Committee (DLC).",
      lastMutationDate: "Pending before DLC Collector Committee",
      tahsildarOffice: "Tahsildar Gannavaram, Krishna District",
      rorStatus: "Under Verification by District Level Regularization Committee",
      cultivatorName: "Continuous family cultivation since 1954 (Citing 1954 Pahani & 10-1 Account)"
    },
    encumbrance: {
      status: "Nil Encumbrance (Clean 30-Year Trace)",
      details: "Possession established through continuous agricultural cesses and old revenue receipts. Registration currently locked in CARD portal pending DLC de-listing.",
      certificateNo: "EC-KRI-2024-332190",
      searchPeriod: "01/01/1990 to 01/10/2026",
      registeredDeeds: []
    },
    section22AFlag: true,
    section22ACategory: "Section 22-A(1)(e) - Dotted Lands (Temporary Prohibition)",
    section22AReason: "Listed as Dotted Land under RSR. Requires District Collector DLC order under AP Act 10 of 2017 for removal from 22-A list and issuance of 1-B e-Passbook.",
    deNotificationStatus: "Tahsildar favorable field enquiry report submitted to RDO; Final Collector DLC Gazette notification awaited.",
    boundaryAndPossession: {
      details: "Physical possession peaceful and unhindered for 70+ years. Cultivating paddy and mango orchards with registered agricultural borewell.",
      fLineStatus: "Demarcated & Field Stones Fixed",
      disputeFlag: false,
      boundaries: {
        north: "Survey No. 209 (Pattadar K. Appa Rao)",
        south: "Survey No. 211 (Gram Panchayat Drain)",
        east: "Vijayawada Airport Approach Highway",
        west: "Survey No. 210/2 (Canal Bund)"
      },
      gpsCoordinates: {
        pointA: [16.5312, 80.7950],
        pointB: [16.5330, 80.7975],
        pointC: [16.5310, 80.7990],
        pointD: [16.5292, 80.7965]
      }
    },
    riskScore: 42,
    riskCategory: "MEDIUM_RISK",
    statutoryTags: ["AP Dotted Lands Act 2017", "DLC Regularization in Progress", "Sec 22-A De-listing Imminent", "Continuous Possession Since 1954"]
  },

  // Case 6: Adverse Possession & Long Possession Dispute (Kurnool Rural)
  "34/1C": {
    surveyNumber: "34/1C",
    subDivision: "1C-2",
    lpNumber: "LP-AP-KNL-2023-9904",
    district: "Kurnool",
    mandal: "Kurnool Rural",
    village: "Nandyal Checkpost Area",
    khataNumber: "518",
    ownerName: "Shaik Mohammed Ismail (Recorded Pattadar)",
    fatherOrHusbandName: "Shaik Ibrahim",
    pattadarPassbookNo: "APPPB-KNL-109482",
    aadhaarLinked: true,
    totalExtent: "Ac. 0.95 Cts (4,138 Sq.Yds)",
    extentInAcres: 0,
    extentInCents: 95,
    landClassification: "Ryotwari Patta (Dry)",
    marketValuePerAcre: "₹ 1,80,00,000 / Acre",
    totalEstimatedValue: "₹ 1,71,00,000",
    mutationDetails: {
      status: "Approved & Digitally Signed",
      remarks: "Record owner lives overseas in Kuwait. Physical possession held hostilely by third party cultivator for 14 continuous years with electricity connection in their name.",
      lastMutationDate: "05-May-2010",
      tahsildarOffice: "Tahsildar Kurnool Rural",
      rorStatus: "Khata active for S. M. Ismail, Cultivator column in e-Panta shows third party",
      cultivatorName: "Boyi Venkateswarlu (Hostile Possessor claiming adverse title)"
    },
    encumbrance: {
      status: "Nil Encumbrance (Clean 30-Year Trace)",
      details: "Clear registered title in favor of recorded Pattadar since 2002. However, physical inspection reveals adverse occupation and construction of semi-permanent godown.",
      certificateNo: "EC-KNL-2024-448201",
      searchPeriod: "01/01/1995 to 01/10/2026",
      registeredDeeds: [
        { docNo: "1105/2002", year: "2002", deedType: "Sale Deed", executant: "K. R. V. Murthy", claimant: "Shaik Mohammed Ismail", extent: "Ac. 0.95 Cts" }
      ]
    },
    section22AFlag: false,
    boundaryAndPossession: {
      details: "Cultivator Boyi Venkateswarlu has sent legal notice asserting Adverse Possession under Article 65 of Limitation Act, 1963 citing 14 years open, peaceful, uninterrupted hostile possession. Threat of title extinguishment under Section 27 Limitation Act.",
      fLineStatus: "Disputed Overlap Detected",
      disputeFlag: true,
      encroachmentExtent: "Entire 0.95 Cents",
      encroacherName: "Boyi Venkateswarlu (Hostile Possessor)",
      boundaries: {
        north: "Survey No. 33 (Private Layout)",
        south: "Survey No. 35 (State Highway 30)",
        east: "Survey No. 34/1B",
        west: "Survey No. 34/2"
      },
      gpsCoordinates: {
        pointA: [15.8281, 78.0371],
        pointB: [15.8294, 78.0388],
        pointC: [15.8279, 78.0396],
        pointD: [15.8268, 78.0379]
      }
    },
    riskScore: 78,
    riskCategory: "HIGH_RISK",
    statutoryTags: ["Limitation Act 1963 Art 65", "Adverse Possession Risk", "Physical Possession Lost", "Civil Ejectment Suit Required"]
  }
};

/**
 * Procedural Dynamic AP Land Record Generator
 * Generates mathematically consistent, high-fidelity land record for any arbitrary Survey Number!
 */
export function generateDynamicAPLandRecord(surveyNumber: string, district: string = "NTR (Vijayawada)"): LandRecord {
  // Hash the survey number to create deterministic properties
  let hash = 0;
  for (let i = 0; i < surveyNumber.length; i++) {
    hash = (hash << 5) - hash + surveyNumber.charCodeAt(i);
    hash |= 0;
  }
  const positiveHash = Math.abs(hash);

  const villages = [
    "Gollapudi", "Kankipadu", "Poranki", "Enikepadu", "Nidamanuru", "Nunna", 
    "Atkur", "Gannavaram", "Surampalli", "Kesarapalle", "Kaza", "Vaddeswaram"
  ];
  const mandals = ["Penamaluru", "Vijayawada Rural", "Gannavaram", "Kankipadu", "Mangalagiri", "Ibrahimpatnam"];
  const firstNames = ["Muppala", "Garapati", "Chalasani", "Yalamanchili", "Gadde", "Kakarla", "Doddapaneni", "Bollineni", "Vallabhaneni", "Nalluri"];
  const lastNames = ["Venkateswara Rao", "Satyanarayana", "Sambasiva Rao", "Srinivasa Rao", "Subba Rao", "Koteswara Rao", "Ramesh Babu", "Radhakrishna"];

  const village = villages[positiveHash % villages.length];
  const mandal = mandals[(positiveHash >> 2) % mandals.length];
  const owner = `${firstNames[positiveHash % firstNames.length]} ${lastNames[(positiveHash >> 3) % lastNames.length]}`;
  const father = `Late ${firstNames[(positiveHash + 2) % firstNames.length]} ${lastNames[(positiveHash >> 4) % lastNames.length]}`;
  const khata = `${100 + (positiveHash % 899)}`;
  const passbook = `APPPB-NTR-${100000 + (positiveHash % 899999)}`;
  const acres = (positiveHash % 5) + 1;
  const cents = (positiveHash % 90) + 5;
  const isFlagged22A = (positiveHash % 5) === 0; // 20% chance
  const isBoundaryDispute = (positiveHash % 4) === 0; // 25% chance

  const riskScore = isFlagged22A ? 92 : (isBoundaryDispute ? 62 : 12);
  const riskCategory = riskScore > 85 ? "CRITICAL_VOID" : (riskScore > 50 ? "MEDIUM_RISK" : "LOW_RISK");

  const baseLat = 16.5062 + ((positiveHash % 100) / 1000);
  const baseLng = 80.6480 + (((positiveHash >> 3) % 100) / 1000);

  return {
    surveyNumber,
    subDivision: `${positiveHash % 4 + 1}${String.fromCharCode(65 + (positiveHash % 3))}`,
    lpNumber: `LP-AP-${district.substring(0, 3).toUpperCase()}-2024-${1000 + (positiveHash % 9000)}`,
    district,
    mandal,
    village,
    khataNumber: khata,
    ownerName: owner,
    fatherOrHusbandName: father,
    pattadarPassbookNo: passbook,
    aadhaarLinked: true,
    totalExtent: `Ac. ${acres}.${cents.toString().padStart(2, "0")} Cts`,
    extentInAcres: acres,
    extentInCents: cents,
    landClassification: isFlagged22A ? "Assigned Land (POT)" : "Ryotwari Patta (Dry)",
    marketValuePerAcre: `₹ ${(80 + (positiveHash % 150))},00,000 / Acre`,
    totalEstimatedValue: `₹ ${(acres * 90 + (cents * 0.9)).toFixed(2)} Lakhs`,
    mutationDetails: {
      status: isFlagged22A ? "Mutation Pending under Sec 5" : "Approved & Digitally Signed",
      remarks: isFlagged22A 
        ? "Statutory scrutiny required under AP Rights in Land and Pattadar Pass Books Act 1971."
        : "Record title verified and matched with MeeBhoomi e-Pattadar Passbook registry.",
      lastMutationDate: "18-Oct-2020",
      tahsildarOffice: `Tahsildar ${mandal}, ${district}`,
      rorStatus: "MeeBhoomi Webland 2.0 Digitized",
      cultivatorName: "Self (Pattadar in verified possession)"
    },
    encumbrance: {
      status: isFlagged22A ? "Court Attachment / Lis Pendens" : "Nil Encumbrance (Clean 30-Year Trace)",
      details: isFlagged22A 
        ? "Subject to statutory classification verification in SRO prohibited list."
        : "Complete 30-year uninterrupted registered chain of title with nil encumbrances.",
      certificateNo: `EC-${district.substring(0, 3).toUpperCase()}-2024-${positiveHash % 900000}`,
      searchPeriod: "01/01/1994 to 01/10/2026",
      registeredDeeds: [
        {
          docNo: `${1000 + (positiveHash % 4000)}/2015`,
          year: "2015",
          deedType: "Absolute Sale Deed",
          executant: "Previous Owner",
          claimant: owner,
          extent: `Ac. ${acres}.${cents.toString().padStart(2, "0")} Cts`
        }
      ]
    },
    section22AFlag: isFlagged22A,
    section22ACategory: isFlagged22A ? "Section 22-A(1)(a) State Govt / Assigned Land Flag" : undefined,
    section22AReason: isFlagged22A ? "Prohibited registration category flagged in CARD AP portal." : undefined,
    boundaryAndPossession: {
      details: isBoundaryDispute 
        ? "Boundary discrepancy noted along Southern boundary. F-Line survey petition recommended."
        : "All boundaries demarcated with field stones in accordance with FMB map.",
      fLineStatus: isBoundaryDispute ? "Pending Sec 10 Demarcation" : "Demarcated & Field Stones Fixed",
      disputeFlag: isBoundaryDispute,
      encroachmentExtent: isBoundaryDispute ? "15 Cents" : undefined,
      encroacherName: isBoundaryDispute ? "Southern Plot Occupant" : undefined,
      boundaries: {
        north: `Land in Survey No. ${parseInt(surveyNumber) || 100}/1`,
        south: `Land in Survey No. ${parseInt(surveyNumber) || 100}/3`,
        east: "30-Feet Panchayat Road",
        west: "Agricultural Irrigation Channel"
      },
      gpsCoordinates: {
        pointA: [baseLat, baseLng],
        pointB: [baseLat + 0.0015, baseLng + 0.0018],
        pointC: [baseLat + 0.0005, baseLng + 0.0024],
        pointD: [baseLat - 0.0009, baseLng + 0.0006]
      }
    },
    riskScore,
    riskCategory,
    statutoryTags: isFlagged22A 
      ? ["Sec 22-A Scrutiny", "Assigned Land Check", "AP Act 9 of 1977"] 
      : ["Ryotwari Title", "MeeBhoomi Verified", "Clean EC"]
  };
}

export function fetchAPLandRecord(surveyNumber: string, district?: string): LandRecord {
  const cleanSurvey = surveyNumber.trim().toUpperCase();
  if (PRESET_LAND_RECORDS[cleanSurvey]) {
    return PRESET_LAND_RECORDS[cleanSurvey];
  }
  // Try finding by prefix / normalized format
  for (const key of Object.keys(PRESET_LAND_RECORDS)) {
    if (key.toLowerCase() === cleanSurvey.toLowerCase() || cleanSurvey.startsWith(key)) {
      return PRESET_LAND_RECORDS[key];
    }
  }
  // Dynamic procedural generation
  return generateDynamicAPLandRecord(cleanSurvey, district);
}
