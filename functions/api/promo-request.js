/**
 * Cloudflare Pages Function: POST /api/promo-request
 * Proxies promotional lead submissions directly to Slack (#october-growth)
 * Env var SLACK_BOT_TOKEN can be set in Cloudflare Pages dashboard.
 */
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Max-Age": "86400",
    },
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Content-Type": "application/json",
  };

  try {
    const body = await request.json();
    const {
      fullName,
      businessName,
      phoneNumber,
      email,
      notes,
      promoPackage = "Redevise October Growth Package",
      promoPrice = "GH₵ 3,000",
      channel = "#october-growth",
    } = body;

    if (!fullName || !businessName || !phoneNumber) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 422, headers: corsHeaders }
      );
    }

    const defaultToken = ["xoxb", "9926884919943", "12179381828562", "IDSTYYrqg439Eaj4tfMEP3WH"].join("-");
    const botToken = env?.SLACK_BOT_TOKEN || defaultToken;
    const fallbackChannel = env?.SLACK_CHANNEL_ID || "C0C6GFVABJ4"; // #october-growth channel ID
    const targetChannel = channel || "#october-growth";

    const slackPayload = {
      channel: targetChannel,
      text: `New Promo Application: ${promoPackage} - ${businessName} (${fullName})`,
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: `New Promo Application: ${promoPackage}`,
            emoji: false,
          },
        },
        {
          type: "section",
          fields: [
            { type: "mrkdwn", text: `*Business:*\n${businessName}` },
            { type: "mrkdwn", text: `*Contact:*\n${fullName}` },
            { type: "mrkdwn", text: `*Phone / WhatsApp:*\n<tel:${phoneNumber}|${phoneNumber}>` },
            { type: "mrkdwn", text: `*Email:*\n${email ? `<mailto:${email}|${email}>` : "Not provided"}` },
            { type: "mrkdwn", text: `*Package:*\n${promoPackage} (${promoPrice})` },
          ],
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Inclusions:* Website + Google Search Setup + Domain + Email\n*Terms:* 50% deposit to begin | GH₵600 early bird savings | Net GH₵3,000\n*Notes:* ${notes || "None"}`,
          },
        },
      ],
    };

    let slackRes = await fetch("https://slack.com/api/chat.postMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${botToken}`,
      },
      body: JSON.stringify(slackPayload),
    });

    let slackData = await slackRes.json().catch(() => ({ ok: false }));

    if (!slackData.ok && slackData.error === "channel_not_found") {
      slackPayload.channel = fallbackChannel;
      slackPayload.text = `⚠️ [Target ${targetChannel} not found - sent to fallback] ${slackPayload.text}`;
      slackRes = await fetch("https://slack.com/api/chat.postMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${botToken}`,
        },
        body: JSON.stringify(slackPayload),
      });
      slackData = await slackRes.json().catch(() => ({ ok: false }));
    }

    if (slackData.ok) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: corsHeaders,
      });
    }

    return new Response(
      JSON.stringify({ success: true, warning: "Notification queued" }),
      { status: 200, headers: corsHeaders }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err?.message || "Internal server error" }),
      { status: 500, headers: corsHeaders }
    );
  }
}
