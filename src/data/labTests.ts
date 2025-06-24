
export interface LabTest {
  name: string;
  description: string;
  price: string;
  included: string;
  womenOnly?: boolean;
}

export const labTests: LabTest[] = [
  {
    name: "STD Screening Test Panel — Expanded",
    description: "Screen for seven of the most common sexually transmitted infections and diseases, including chlamydia, gonorrhea, hepatitis B, hepatitis C, trichomoniasis, syphilis, HIV-1, and HIV-2. Take control of your sexual health with comprehensive testing.",
    price: "$149",
    included: "Independent physician consultation for abnormal results included"
  },
  {
    name: "Herpes (HSV) 1 & 2 Test",
    description: "This herpes test detects both types of the herpes simplex virus (HSV), a sexually transmitted infection, in your blood.",
    price: "$79",
    included: "Blood test with rapid results"
  },
  {
    name: "HPV Test for Cervical Cancer Risk (Self-Swab Collection)",
    description: "This high-risk HPV test detects high-risk Human Papillomavirus (HPV) types to assess the risk for cervical precancer and cancer. Self-collection vaginal swab in healthcare setting.",
    price: "$119",
    included: "Self-swab collection kit and risk assessment",
    womenOnly: true
  },
  {
    name: "Autoimmune Screening Test (ANA with Reflex)",
    description: "Detect autoantibodies in your blood related to various autoimmune diseases to help you and your healthcare provider determine next steps.",
    price: "$99",
    included: "Comprehensive autoantibody panel"
  },
  {
    name: "COVID-19 Antibody Test",
    description: "Detect COVID-19 antibodies from a previous infection or vaccination.",
    price: "$59",
    included: "Antibody detection and immunity status"
  },
  {
    name: "Drug Screening Test Panel — Expanded",
    description: "Evaluate your urine for eleven different drugs/drug classes to ensure a clean health profile.",
    price: "$129",
    included: "11-panel comprehensive drug screening"
  }
];
