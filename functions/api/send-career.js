/**
 * Cloudflare Pages Function: POST /api/send-career
 * Handles secure server-side career application delivery via Resend.
 * Env var RESEND_API_KEY must be set in Cloudflare Pages dashboard.
 */
export async function onRequestPost(context) {
  const { request, env } = context;

  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  const { name, email, role, portfolio, resume, message } = body;

  if (!name || !email || !role || !resume || !message) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 422,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  const RESEND_API_KEY = env.RESEND_API_KEY;
  if (!RESEND_API_KEY) {
    return new Response(
      JSON.stringify({ error: "Server misconfiguration: missing RESEND_API_KEY" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  const emailPayload = {
    from: "Redevise Careers <team@redevise.com>",
    to: ["team@redevise.com"],
    reply_to: email,
    subject: `New Job Application: ${name} - ${role}`,
    html: `
      <div style="font-family: 'Inter', -apple-system, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #e8e8e8; border: 1px solid #1e1e1e; border-radius: 16px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #0d0d0d, #111); padding: 40px; border-bottom: 1px solid #1e1e1e;">
          <div style="display: inline-block; background: #beff50; color: #0a0a0a; font-size: 10px; font-weight: 800; letter-spacing: 0.2em; text-transform: uppercase; padding: 6px 14px; border-radius: 100px; margin-bottom: 24px;">Careers Application</div>
          <h1 style="margin: 0; font-size: 28px; font-weight: 800; color: #ffffff; line-height: 1.3;">New applicant<br/>details.</h1>
        </div>
        <div style="padding: 40px;">
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 32px;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1e1e1e; color: #666; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; width: 120px;">Name</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #1e1e1e; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1e1e1e; color: #666; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #1e1e1e;"><a href="mailto:${email}" style="color: #beff50; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1e1e1e; color: #666; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em;">Role</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #1e1e1e; font-weight: 600; color: #beff50;">${role}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1e1e1e; color: #666; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em;">Resume</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #1e1e1e;"><a href="${resume}" target="_blank" style="color: #beff50; text-decoration: underline;">View Resume Link</a></td>
            </tr>
            ${portfolio ? `
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1e1e1e; color: #666; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em;">Portfolio</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #1e1e1e;"><a href="${portfolio}" target="_blank" style="color: #beff50; text-decoration: underline;">${portfolio}</a></td>
            </tr>
            ` : ""}
          </table>

          <div style="background: #111; border: 1px solid #1e1e1e; border-radius: 12px; padding: 24px;">
            <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; color: #beff50; margin-bottom: 12px;">Cover Letter / Message</div>
            <p style="margin: 0; font-size: 15px; line-height: 1.7; color: #ccc;">${message.replace(/\n/g, "<br/>")}</p>
          </div>
        </div>
        <div style="padding: 24px 40px; border-top: 1px solid #1e1e1e; text-align: center; color: #333; font-size: 11px;">
          Redevise · <a href="https://redevise.com" style="color: #beff50; text-decoration: none;">redevise.com</a>
        </div>
      </div>
    `,
  };

  try {
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailPayload),
    });

    const resendData = await resendRes.json();

    if (!resendRes.ok) {
      console.error("Resend error:", resendData);
      return new Response(
        JSON.stringify({ error: "Email delivery failed", details: resendData }),
        { status: 502, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    return new Response(JSON.stringify({ success: true, id: resendData.id }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Internal server error", message: err.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
}

// Handle CORS preflight
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
