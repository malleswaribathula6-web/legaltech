import { NextResponse } from "next/server";
import { fetchAPLandRecord } from "@/lib/mockData";

export async function POST(req: Request) {
  try {
    const { surveyNumber, district = "NTR (Vijayawada)", language = "en" } = await req.json();

    if (!surveyNumber) {
      return NextResponse.json(
        { error: "Survey number is required." },
        { status: 400 }
      );
    }

    // 1. Tool Call: Deterministic AP MeeBhoomi & 22-A lookup
    const record = fetchAPLandRecord(surveyNumber, district);

    // 2. OpenRouter API Configuration
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing OPENROUTER_API_KEY in environment variables." },
        { status: 500 }
      );
    }

    const systemPrompt = `You are LandNyaya, an autonomous LegalTech AI agent specializing in Andhra Pradesh Land Revenue Law, Title Due Diligence, and Property Dispute Prevention.
Your role is to perform multi-stage statutory title reasoning and risk assessment under:
1. AP Rights in Land and Pattadar Pass Books Act, 1971 (Sections 4, 5, 5B)
2. AP Survey and Boundaries Act, 1923 (Section 10 - F-Line Survey Demarcation)
3. Registration Act, 1908 (AP Section 22-A Prohibited Properties Register)
4. Limitation Act, 1963 (Article 65 - Adverse Possession & Prescriptive Rights)

Provide a sharp, statutory reasoning trace, highlight legal red flags, and deliver strategic remedies.
Format the output cleanly in plain text with Markdown headers.
Respond strictly in the requested language: ${language === "te" ? "Telugu" : language === "hi" ? "Hindi" : "English"}.`;

    const userPrompt = `Conduct an exhaustive statutory land audit for this record:
- Survey / Sub-Division: ${record.surveyNumber}
- Location: ${record.village}, ${record.mandal}, ${record.district}, Andhra Pradesh
- Primary Pattadar: ${record.ownerName} (Khata No: ${record.khataNumber})
- Extent & Classification: ${record.totalExtent} (${record.landClassification})
- MeeBhoomi 1-B Status: ${record.mutationDetails.status} - ${record.mutationDetails.remarks}
- Encumbrance Status: ${record.encumbrance.status} (${record.encumbrance.details})
- Section 22-A Prohibited Flag: ${record.section22AFlag ? `FLAGGED: ${record.section22ACategory}` : "Clear"}
- Boundary & Physical Possession: ${record.boundaryAndPossession.details}

Produce a structured legal audit:
1. Ownership & Title Marketability Verdict (Clear vs. Clouded vs. Void under Sec 22-A)
2. Key Red Flags & Statutory Risks (cite exact act sections)
3. 3-Phase Immediate Action Roadmap for the landowner`;

    // 3. Call OpenRouter API
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "LandNyaya AP Agent",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.2,
        max_tokens: 2500,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("OpenRouter API error response:", errText);
      return NextResponse.json(
        { error: `OpenRouter error: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const aiAnalysis = data.choices?.[0]?.message?.content || "Audit successfully completed.";

    return NextResponse.json({
      record,
      aiAnalysis,
      timestamp: new Date().toISOString(),
    });

  } catch (error: any) {
    console.error("Agent API Route Exception:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error occurred." },
      { status: 500 }
    );
  }
}
