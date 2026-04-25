import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, organization, phone, budget, service, message } = body;

    // ── Validation ──────────────────────────────────────────────────────────
    if (!fullName || !email || !budget || !message) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    // ── Send via Resend (https://resend.com) ─────────────────────────────────
    // Install with: pnpm add resend
    // Set RESEND_API_KEY in your .env.local
    // Swap the `to` address with your real inbox.
    //
    // If you'd rather use Nodemailer / SendGrid / any other provider,
    // replace the block below — the validated `body` object stays the same.

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "prepilot.web@gmail.com";

    if (!RESEND_API_KEY) {
      // Dev mode: just log and return success so the UI works without setup
      console.log("📬 Contact form submission (no RESEND_API_KEY set):", body);
      return NextResponse.json({ success: true, dev: true });
    }

    const htmlBody = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#fdfcfb;border-radius:12px;border:1px solid #e5e5e5;">
        <h2 style="margin-top:0;color:#1f1a14;">New enquiry from PrePilot contact form</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#7a6e62;font-size:13px;width:160px;">Name</td><td style="padding:8px 0;font-weight:600;">${fullName}</td></tr>
          <tr><td style="padding:8px 0;color:#7a6e62;font-size:13px;">Email</td><td style="padding:8px 0;font-weight:600;"><a href="mailto:${email}">${email}</a></td></tr>
          ${organization ? `<tr><td style="padding:8px 0;color:#7a6e62;font-size:13px;">Organisation</td><td style="padding:8px 0;">${organization}</td></tr>` : ""}
          ${phone ? `<tr><td style="padding:8px 0;color:#7a6e62;font-size:13px;">Phone</td><td style="padding:8px 0;">${phone}</td></tr>` : ""}
          <tr><td style="padding:8px 0;color:#7a6e62;font-size:13px;">Budget</td><td style="padding:8px 0;">${budget}</td></tr>
          ${service ? `<tr><td style="padding:8px 0;color:#7a6e62;font-size:13px;">Service</td><td style="padding:8px 0;">${service}</td></tr>` : ""}
        </table>
        <hr style="border:none;border-top:1px solid #e5e5e5;margin:24px 0;"/>
        <p style="color:#1f1a14;white-space:pre-wrap;">${message}</p>
        <p style="font-size:12px;color:#7a6e62;margin-top:32px;">Sent via prepilot.com contact form</p>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "PrePilot Contact <onboarding@resend.dev>",
        to: [TO_EMAIL],
        reply_to: email,
        subject: `New enquiry from ${fullName}${organization ? ` · ${organization}` : ""}`,
        html: htmlBody,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend error:", err);
      return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}