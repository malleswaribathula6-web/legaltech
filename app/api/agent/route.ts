import { NextResponse } from "next/server";
import { fetchAPLandRecord } from "@/lib/mockData";
import { performStatutoryAudit } from "@/lib/aiReasoning";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      surveyNumber, 
      district = "NTR (Vijayawada)", 
      language = "en",
      action = "audit", // "audit" or "chat"
      chatMessage = "",
      chatHistory = []
    } = body;

    if (!surveyNumber && action !== "general_chat") {
      return NextResponse.json(
        { error: "Survey number is required." },
        { status: 400 }
      );
    }

    // 1. Fetch AP Land Record from MeeBhoomi & 22-A engine
    const record = fetchAPLandRecord(surveyNumber || "104/2", district);

    // 2. Perform Local Statutory Intelligence Reasoning
    const statutoryAudit = performStatutoryAudit(record, language as any);

    // Check for OpenRouter API Key (env or custom header)
    const apiKey = process.env.OPENROUTER_API_KEY || req.headers.get("x-openrouter-key");

    if (action === "chat") {
      // Conversational Legal Assistant
      if (apiKey) {
        try {
          const chatSystemPrompt = `You are LandNyaya, an elite LegalTech Advocate & Land Law AI specializing in Andhra Pradesh Revenue Law, including:
1. AP Rights in Land and Pattadar Pass Books Act, 1971 (Sections 4, 5, 5-A, 5-B)
2. AP Survey and Boundaries Act, 1923 (Section 10 F-Line Demarcation)
3. Registration Act, 1908 (AP Section 22-A Prohibited Categories 1(a) to 1(e))
4. AP Assigned Lands (Prohibition of Transfers) Act, 1977 (Act 9/1977)
5. Limitation Act, 1963 (Article 65 Adverse Possession & Section 27)
6. AP Dotted Lands (Updation in ROR) Act, 2017 & AP Inams Abolition Act, 1956

The user is inquiring about Survey No. ${record.surveyNumber} in ${record.village}, ${record.mandal}, ${record.district}.
Land details: ${record.totalExtent}, Classification: ${record.landClassification}, 22-A Status: ${record.section22AFlag ? `Flagged (${record.section22ACategory})` : 'Clear'}, MeeBhoomi 1-B: ${record.mutationDetails.status}, Boundary: ${record.boundaryAndPossession.details}.

Answer accurately, citing specific sections, MeeSeva processes, and judicial precedents.
Respond in ${language === "te" ? "Telugu (తెలుగు)" : language === "hi" ? "Hindi (हिन्दी)" : "English"}.`;

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
                { role: "system", content: chatSystemPrompt },
                ...chatHistory,
                { role: "user", content: chatMessage }
              ],
              temperature: 0.3,
              max_tokens: 1500,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            const reply = data.choices?.[0]?.message?.content;
            if (reply) {
              return NextResponse.json({ reply, record, timestamp: new Date().toISOString() });
            }
          }
        } catch (e) {
          console.warn("OpenRouter chat fallback to local knowledge:", e);
        }
      }

      // Local high-fidelity knowledge response for chat
      let localReply = "";
      const msg = chatMessage.toLowerCase();
      if (msg.includes("sell") || msg.includes("buy") || msg.includes("market") || msg.includes("purchase")) {
        if (record.section22AFlag) {
          localReply = `⚠️ **Statutory Restriction:** This land parcel (Survey ${record.surveyNumber}) is flagged under **${record.section22ACategory || 'Section 22-A'}**. Any deed executed is prohibited from registration under the Registration Act 1908. You must first obtain a De-notification Order from the District Collector / Endowments Tribunal before executing any conveyance.`;
        } else if (record.boundaryAndPossession.disputeFlag) {
          localReply = `⚠️ **Boundary Precaution:** While the title in MeeBhoomi is registered, there is an active boundary discrepancy (${record.boundaryAndPossession.encroachmentExtent || 'deficit'}). We strongly recommend conducting a formal Section 10 F-Line Survey Demarcation through MeeSeva before paying final purchase consideration.`;
        } else {
          localReply = `✅ **Title Marketability Confirmed:** The title for Survey ${record.surveyNumber} is clear, classified as ${record.landClassification}, with clean 30-year Encumbrance and active 1-B e-Pattadar Passbook. Registration can proceed smoothly at SRO ${record.mandal}.`;
        }
      } else if (msg.includes("f-line") || msg.includes("survey") || msg.includes("demarcation") || msg.includes("boundary")) {
        localReply = `📐 **F-Line Demarcation Procedure under AP Survey & Boundaries Act 1923 (Sec 10):**\n\n1. **Apply via MeeSeva:** Submit an application for F-Line Demarcation citing Survey No. ${record.surveyNumber}.\n2. **Statutory Fee:** Pay the requisite challan fee (approx ₹500 to ₹1,000 per survey sub-division).\n3. **Notice to Adjacent Landowners:** Mandal Surveyor issues Form-VIII notice to adjacent survey holders (${record.boundaryAndPossession.boundaries.north}, ${record.boundaryAndPossession.boundaries.south}, etc.).\n4. **Ground Measurement & Stones:** Surveyor visits with Total Station/DGPS and fixes boundary stones as per FMB (Field Measurement Book).`;
      } else if (msg.includes("mutation") || msg.includes("1-b") || msg.includes("passbook") || msg.includes("tahsildar")) {
        localReply = `📜 **MeeBhoomi 1-B Mutation Process (AP ROR Act 1971):**\n\n- Under **Section 4**, acquisition of rights via registered deed or succession must be intimated to Tahsildar within 90 days.\n- Under **Section 5**, Tahsildar verifies the registered deed and issues Form-VIII notice inviting objections.\n- Upon approval, electronic Title Deed-cum-e-Pattadar Passbook is issued and synchronized with Webland 2.0. If Tahsildar delays beyond 30 days, file Section 5-B Appeal before the RDO.`;
      } else {
        localReply = `⚖️ **LandNyaya Advisory for Survey ${record.surveyNumber}:**\n\n- **Pattadar:** ${record.ownerName} (Khata: ${record.khataNumber})\n- **Classification:** ${record.landClassification}\n- **22-A Status:** ${record.section22AFlag ? '⚠️ Flagged' : '✅ Clear'}\n- **MeeBhoomi 1-B:** ${record.mutationDetails.status}\n\nFor this parcel, you can generate ready-to-file legal petitions directly from the **Statutory Notices** tab or download the complete Audit Dossier.`;
      }

      return NextResponse.json({
        reply: localReply,
        record,
        timestamp: new Date().toISOString()
      });
    }

    // Default Audit Mode
    let aiAnalysis = statutoryAudit.fullMarkdownReport;

    // If OpenRouter key is present, enhance with live LLM trace
    if (apiKey) {
      try {
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

        if (response.ok) {
          const data = await response.json();
          if (data.choices?.[0]?.message?.content) {
            aiAnalysis = data.choices[0].message.content;
          }
        }
      } catch (e) {
        console.warn("OpenRouter API error fallback to local reasoning:", e);
      }
    }

    return NextResponse.json({
      record,
      aiAnalysis,
      statutoryAudit,
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
