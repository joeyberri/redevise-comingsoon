import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const BLOG_DIR = 'c:/Users/hp/Desktop/japa/domains/redevise/coming-soon/redevise-comingsoon/src/content/blog';

// Stock Unsplash images mapped to blog tags
const tagImageMap = {
  "Admin Tools": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
  "AI": "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80",
  "Business Strategy": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  "Behavioral Psychology": "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&w=1200&q=80",
  "System Architecture": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
  "Workflows": "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80",
  "Engineering": "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80",
  "Data Insights": "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80",
  "Customer Support": "https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=1200&q=80",
  "Optimization": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
  "Church Tech": "https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&w=1200&q=80",
  "Automation": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
  "Analytics": "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
  "Professional Services": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
  "SaaS": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
  "Education": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
  "Operations": "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=1200&q=80",
  "Habit Systems": "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1200&q=80",
  "Productivity": "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&q=80",
  "Development": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80"
};

// Rich context expansion paragraphs based on the primary category tag of the post
const tagContextMap = {
  "Admin Tools": "Custom admin dashboards and internal tools are critical for operational velocity. When operations teams are forced to use raw database views or developer-facing interfaces, task completion times slow down and error rates rise. Designing clear, role-based workflows in your admin panel ensures team members can act quickly and securely without needing technical support.",
  "AI": "While AI and automated intelligence promise significant efficiency gains, they introduce liabilities if deployed without human-in-the-loop safeguards. To scale safely, business operations must implement feedback loops, exception handling, and model monitoring to catch hallucinations and correct data drift before it impacts customers.",
  "Business Strategy": "A sustainable business technology roadmap must focus on high-yield, long-term operational improvements over short-term feature checklists. Subscribing to too many disconnected SaaS platforms creates fragmented data silos and integrations that break. Investing in a unified system architecture keeps software costs scaling sub-linearly with headcount growth.",
  "Behavioral Psychology": "Software adoption is fundamentally a behavioral challenge, not a technological one. Operations teams naturally resist tools that introduce cognitive friction or require extensive retraining. To build tools that teams actually want to use, software designers must study existing user habits, reduce interaction steps, and present the right action at the right time.",
  "System Architecture": "Resilient systems are designed to degrade gracefully rather than fail catastrophically during unexpected spikes or outages. Building high-availability infrastructure involves separating core database writes from third-party integrations, implementing robust caching strategies, and ensuring every critical pathway is monitored for early signs of degradation.",
  "Workflows": "Automating a broken workflow only accelerates its failures. Before writing code or subscribing to new automation tools, operations leaders must audit and simplify their existing human workflows. Mapping handoffs, removing redundant approvals, and defining clear escalation paths is the first step toward effective process automation.",
  "Engineering": "High-quality engineering is a balancing act between shipping speed and long-term codebase maintainability. When teams rush features without proper architecture planning, they accumulate technical debt that slows future development to a crawl. A disciplined software delivery process relies on automated testing, clean code boundaries, and staging previews.",
  "Data Insights": "Having access to operational data is meaningless unless it drives decisions. Too many companies build static dashboards that sit ignored because they display trailing metrics instead of leading indicators. To build a data-driven culture, teams need active analytics loops that highlight immediate blockers and project capacity requirements.",
  "Customer Support": "The best customer support is invisible because the underlying product and operations work seamlessly to prevent tickets from occurring. When customer issues do arise, support operations teams need consolidated dashboards that gather all client context—from CRM to billing history—into a single screen, minimizing context switching and resolution time.",
  "Optimization": "System-level optimization requires looking at how work flows across different teams, rather than optimizing individual tasks in isolation. Removing a bottleneck in one department often exposes a larger bottleneck elsewhere. Operations managers must continuously measure throughput and address structural process constraints.",
  "Church Tech": "Churches and volunteer-driven organizations face a unique operational challenge: systems must be simple enough for non-technical volunteers to navigate without training, yet powerful enough to manage member engagement and coordinate events. Building custom, focused tools prevents the admin bloat associated with generic church management platforms.",
  "Automation": "Workflow automation should handle repetitive, low-context tasks so human team members can focus on high-leverage decisions. Implementing message queues, webhooks, and automated notifications saves hours of manual data entry, but success depends on having clear error boundaries and visibility when a sync fails.",
  "Analytics": "Operational analytics should be tailored to non-technical business leaders, focusing on actionable trends rather than raw metrics. Measuring process cycle times, customer onboarding milestones, and support queue trends provides the visibility needed to adjust resources and optimize workflows in real time.",
  "Professional Services": "Professional services firms lose significant billable hours to manual coordination, disconnected tools, and scope creep. By constructing integrated pipelines that connect proposal creation, resource allocation, and project delivery, service organizations can scale their capacity and improve client satisfaction without burning out.",
  "SaaS": "While subscribing to SaaS platforms is quick, growing organizations often outgrow off-the-shelf software, leading to complex workarounds and manual copy-pasting. Building a custom integration layer or a dedicated operational platform helps businesses break free from SaaS limits and build a unique competitive advantage.",
  "Education": "Operational onboarding and training programs often fail because they rely on static documentation libraries that new hires ignore. To accelerate employee time-to-value, companies must design active learning pathways, interactive checklists, and immediate feedback loops that get staff productive in their first week.",
  "Operations": "A company's operational infrastructure defines its growth ceiling. Without designed, documented systems, teams operate reactively, relying on heroics to handle volume spikes. Scaling operations requires replacing manual check-ins with live-ops dashboards and establishing standard operating procedures that survive team turnover.",
  "Habit Systems": "Individual productivity habits are fragile unless reinforced by the software and systems the team uses every day. Rather than hoping team members remember to log updates or check documentation, operations leaders should embed these habits directly into standard workflows through auto-prompts and clear checklists.",
  "Productivity": "True productivity is not about working longer hours, but about eliminating unnecessary friction from everyday processes. Connecting disconnected tools, automating status updates, and simplifying document access allows team members to spend their energy on creative and strategic tasks instead of administrative overhead.",
  "Development": "Modern web development processes require continuous integration, staging environments, and zero-downtime deployments. By setting up automated linting, type checking, and unit testing, developers can push code with confidence, knowing they won't introduce regressions or break critical user flows in production."
};

// Help numbers written in words
function convertNumWord(str) {
  const map = {
    'one': '1', 'two': '2', 'three': '3', 'four': '4', 'five': '5',
    'six': '6', 'seven': '7', 'eight': '8', 'nine': '9', 'ten': '10'
  };
  let res = str.toLowerCase();
  for (const [w, n] of Object.entries(map)) {
    res = res.replace(new RegExp(`\\b${w}\\b`, 'g'), n);
  }
  return res;
}

// Clean and parse values for comparative table
function formatMetricVal(val) {
  let cleaned = val.trim();
  cleaned = cleaned.replace(/\s*percent/g, '%');
  if (/^\d+$/.test(cleaned)) {
    return cleaned + '%';
  }
  return cleaned;
}

// Generate comparison delta text
function getMetricChangeStr(before, after) {
  const bNum = parseFloat(before);
  const aNum = parseFloat(after);
  if (!isNaN(bNum) && !isNaN(aNum) && before.includes('%') && after.includes('%')) {
    const diff = aNum - bNum;
    if (diff > 0) {
      return `+${diff}% increase`;
    } else {
      return `${diff}% reduction`;
    }
  }
  if (before.includes('hour') || after.includes('hour')) {
    return 'Reduced';
  }
  if (before.includes('day') || after.includes('day')) {
    return 'Reduced';
  }
  return `Optimized`;
}

// Parse metrics from the client engagement paragraph
function parseMetricsFromParagraph(paragraph) {
  const sentences = paragraph.split(/[.!?]+/).map(s => s.trim()).filter(Boolean);
  const metrics = {};

  sentences.forEach(s => {
    const clean = convertNumWord(s);
    
    let category = null;
    if (clean.includes('error rate') || clean.includes('errors')) {
      category = 'Error Rate';
    } else if (clean.includes('efficiency')) {
      category = 'Operational Efficiency';
    } else if (clean.includes('context switching') || clean.includes('switching')) {
      category = 'Context Switching';
    } else if (clean.includes('completion time') || clean.includes('processing time') || clean.includes('approval time') || clean.includes('turnaround time')) {
      category = 'Process Cycle Time';
    } else if (clean.includes('completion rate')) {
      category = 'Completion Rate';
    } else if (clean.includes('competency rate') || clean.includes('competency')) {
      category = 'Competency Rate';
    } else if (clean.includes('open rate')) {
      category = 'Email Open Rate';
    } else if (clean.includes('drop-off') || clean.includes('drop off')) {
      category = 'User Drop-off';
    } else if (clean.includes('accuracy')) {
      category = 'Accuracy Rate';
    } else if (clean.includes('billable') || clean.includes('hours')) {
      category = 'Billable Hours';
    } else if (clean.includes('volume')) {
      category = 'Volume Deviation';
    }
    
    if (!category) return;
    
    if (!metrics[category]) {
      metrics[category] = { before: 'Baseline', after: 'Optimized', change: '' };
    }
    
    // Check for "from X to Y"
    const fromToMatch = clean.match(/(?:from|previously|was)\s+(\d+(?:\.\d+)?(?:\s*%|\s*percent|x|\s*days?|\s*hours?|\s*weeks?)?)\s+(?:to|now is)\s+(\d+(?:\.\d+)?(?:\s*%|\s*percent|x|\s*days?|\s*hours?|\s*weeks?)?)/i);
    if (fromToMatch) {
      metrics[category].before = formatMetricVal(fromToMatch[1]);
      metrics[category].after = formatMetricVal(fromToMatch[2]);
      metrics[category].change = getMetricChangeStr(metrics[category].before, metrics[category].after);
      return;
    }
    
    // Check for "was X" or "previously X"
    const wasMatch = clean.match(/(?:was|previously|had been)\s+(\d+(?:\.\d+)?(?:\s*%|\s*percent|x|\s*days?|\s*hours?|\s*weeks?)?)/i);
    if (wasMatch) {
      metrics[category].before = formatMetricVal(wasMatch[1]);
    }
    
    // Check for "dropped to Y", "increased to Y", etc.
    const toMatch = clean.match(/(?:dropped to|increased to|dropped by|increased by|reduced to|reduced by|decreased to|is now)\s+(\d+(?:\.\d+)?(?:\s*%|\s*percent|x|\s*days?|\s*hours?|\s*weeks?)?)/i);
    if (toMatch) {
      const val = formatMetricVal(toMatch[1]);
      if (clean.includes('dropped by') || clean.includes('reduced by') || clean.includes('decreased by')) {
        metrics[category].after = 'Reduced';
        metrics[category].change = `-${val} reduction`;
      } else if (clean.includes('increased by')) {
        metrics[category].after = 'Optimized';
        metrics[category].change = `+${val} increase`;
      } else {
        metrics[category].after = val;
      }
    } else {
      const directMatch = clean.match(/(?:increased|dropped|decreased|reduced|saved)\s+(\d+(?:\.\d+)?(?:\s*%|\s*percent|x|\s*days?|\s*hours?|\s*weeks?)?)/i);
      if (directMatch) {
        const val = formatMetricVal(directMatch[1]);
        if (clean.includes('increased')) {
          metrics[category].change = `+${val} increase`;
          metrics[category].after = `+${val}`;
        } else {
          metrics[category].change = `-${val} reduction`;
          metrics[category].after = `-${val}`;
        }
      }
    }
  });
  
  for (const data of Object.values(metrics)) {
    if (data.before !== 'Baseline' && data.after !== 'Optimized' && !data.change) {
      data.change = getMetricChangeStr(data.before, data.after);
    }
  }
  
  return metrics;
}

// Main logic to enrich a single article
function enrichArticle(slug, originalContent) {
  // Idempotency: Skip if headers already exist
  if (originalContent.includes('## The Operational Challenge') || originalContent.includes('## Core Pillars')) {
    console.log(`- Skipping ${slug} (already enriched)`);
    return null;
  }

  // Parse frontmatter
  const fmMatch = originalContent.match(/^(---\r?\n[\s\S]+?\r?\n---)([\s\S]*)$/);
  if (!fmMatch) {
    console.log(`- Skipping ${slug} (invalid format)`);
    return null;
  }

  let fmBlock = fmMatch[1];
  let bodyBlock = fmMatch[2].trim();

  // Extract tags
  const tags = [];
  const tagsBlockMatch = fmBlock.match(/tags:\s*\r?\n([\s\S]*?)(?:\r?\n\w+:|$)/);
  if (tagsBlockMatch) {
    const tagLines = tagsBlockMatch[1].split('\n');
    tagLines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('-')) {
        tags.push(trimmed.slice(1).replace(/['"]/g, '').trim());
      }
    });
  }

  // Map cover image if empty or default
  const coverImageMatch = fmBlock.match(/coverImage:\s*['"]?(.*?)['"]?\r?\n/);
  if (coverImageMatch && (coverImageMatch[1] === "" || coverImageMatch[1] === "https://redevise.com/redevise.png")) {
    const primaryTag = tags[0] || "Operations";
    const mappedImage = tagImageMap[primaryTag] || tagImageMap["Operations"];
    fmBlock = fmBlock.replace(/coverImage:\s*['"]?.*?['"]?\r?\n/, `coverImage: "${mappedImage}"\n`);
    console.log(`  * Mapped coverImage to Unsplash for tag "${primaryTag}"`);
  }

  // Segment paragraphs
  const paragraphs = bodyBlock.split(/\r?\n\r?\n/).map(p => p.trim()).filter(Boolean);
  if (paragraphs.length < 3) {
    console.log(`- Skipping ${slug} (too short: ${paragraphs.length} paragraphs)`);
    return null;
  }

  const listItemRegex = /^([A-Z][a-zA-Z0-9\s-']{1,32})\.\s+(.+)$/;
  
  // Anchoring search: find the transition sentence (usually contains "Here is" or "Here are")
  const transitionRegex = /^(Here is|Here are|Here's|Below is|Below are|To\s+.*,\s+follow\s+this|Measuring\s+and\s+tracking)/i;
  let transitionIdx = -1;
  paragraphs.forEach((p, idx) => {
    if (transitionRegex.test(p) || p.toLowerCase().includes('here is what') || p.toLowerCase().includes('here is how') || p.toLowerCase().includes('here\'s what') || p.toLowerCase().includes('here\'s how')) {
      if (transitionIdx === -1) transitionIdx = idx;
    }
  });

  const listIndices = new Set();

  if (transitionIdx !== -1) {
    // Collect consecutive candidates immediately following transitionIdx
    let idx = transitionIdx + 1;
    while (idx < paragraphs.length - 1) {
      const p = paragraphs[idx];
      const match = p.match(listItemRegex);
      const isListItem = match && match[1].split(/\s+/).length <= 5;
      if (isListItem) {
        listIndices.add(idx);
        idx++;
      } else {
        break; // Stop at first non-list item
      }
    }
  }

  // Fallback runs-of-2 candidate search if listIndices is empty
  if (listIndices.size === 0) {
    const isCandidate = paragraphs.map((p, idx) => {
      const match = p.match(listItemRegex);
      return match && match[1].split(/\s+/).length <= 5 && idx > 0 && idx < paragraphs.length - 1;
    });

    paragraphs.forEach((p, idx) => {
      if (isCandidate[idx]) {
        const hasPrev = isCandidate[idx - 1];
        const hasNext = isCandidate[idx + 1];
        if (hasPrev || hasNext) {
          listIndices.add(idx);
        }
      }
    });
  }

  let firstListIdx = -1;
  let lastListIdx = -1;
  const listParagraphs = [];

  paragraphs.forEach((p, idx) => {
    if (listIndices.has(idx)) {
      listParagraphs.push(p);
      if (firstListIdx === -1) firstListIdx = idx;
      lastListIdx = idx;
    }
  });

  // Find Client story start point
  let clientStartIdx = -1;
  paragraphs.forEach((p, idx) => {
    if (idx >= paragraphs.length - 1 || listIndices.has(idx)) return;
    const isClient = p.includes('Redevise') || 
                     p.includes('client') || 
                     p.includes('partnering') || 
                     p.includes('partnered') || 
                     p.includes('For example') || 
                     p.includes('I redesigned') ||
                     p.includes('I built') || 
                     p.includes('I designed') ||
                     p.includes('percent') ||
                     p.includes('error rate') ||
                     p.includes('efficiency');
    if (isClient && clientStartIdx === -1) {
      clientStartIdx = idx;
    }
  });

  const introParagraphs = [];
  const clientParagraphs = [];
  const conclusionParagraphs = [];

  paragraphs.forEach((p, idx) => {
    if (listIndices.has(idx)) return;

    if (clientStartIdx !== -1 && idx >= clientStartIdx && (firstListIdx === -1 || idx < firstListIdx)) {
      // Group paragraphs after the client story starts but before list items
      if (firstListIdx !== -1 && idx === firstListIdx - 1 && p.length < 50 && p.includes('.')) {
        introParagraphs.push(p);
      } else {
        clientParagraphs.push(p);
      }
    } else if (firstListIdx !== -1 && idx < firstListIdx) {
      introParagraphs.push(p);
    } else if (lastListIdx !== -1 && idx > lastListIdx) {
      // After list items
      const isClientAfterList = p.includes('Redevise') || p.includes('client') || p.includes('percent') || p.includes('error rate') || p.includes('efficiency') || p.includes('completion time');
      if (isClientAfterList && idx < paragraphs.length - 2) {
        clientParagraphs.push(p);
      } else {
        conclusionParagraphs.push(p);
      }
    } else {
      // Fallback
      if (idx === 0) introParagraphs.push(p);
      else conclusionParagraphs.push(p);
    }
  });

  // Re-verify list items: if none found, do not crash but fallback
  const primaryTag = tags[0] || "Operations";
  const contextParagraph = tagContextMap[primaryTag] || tagContextMap["Operations"];

  let newBody = `## The Operational Challenge\n\n`;
  newBody += introParagraphs.join('\n\n') + `\n\n`;
  newBody += contextParagraph + `\n\n`;

  if (listParagraphs.length > 0) {
    newBody += `## Core Pillars\n\n`;
    listParagraphs.forEach(p => {
      const match = p.match(listItemRegex);
      if (match) {
        newBody += `* **${match[1]}**: ${match[2]}\n`;
      } else {
        newBody += `* ${p}\n`;
      }
    });
    newBody += `\n`;
  }

  // Client Case Study & Metrics Table
  if (clientParagraphs.length > 0) {
    newBody += `## Real-World Impact & Metrics\n\n`;
    newBody += clientParagraphs.join('\n\n') + `\n\n`;

    // Try to extract metrics across all client paragraphs
    const combinedClientText = clientParagraphs.join(' ');
    const metrics = parseMetricsFromParagraph(combinedClientText);
    const metricKeys = Object.keys(metrics);
    if (metricKeys.length > 0) {
      newBody += `### Performance Comparison\n\n`;
      newBody += `| Metric | Before Redevise | After Redevise | Improvement |\n`;
      newBody += `| :--- | :--- | :--- | :--- |\n`;
      metricKeys.forEach(key => {
        const data = metrics[key];
        newBody += `| ${key} | ${data.before} | ${data.after} | ${data.change || 'Optimized'} |\n`;
      });
      newBody += `\n`;
    }
  }

  // Clean conclusion takeaways: remove duplicate tag lists if any
  const cleanedTakeaways = conclusionParagraphs.filter(p => {
    const cleanWordCount = p.split(/\s+/).length;
    if (cleanWordCount < 15 && p.includes('.') && listParagraphs.some(lp => p.includes(lp.split('.')[0]))) {
      return false;
    }
    return true;
  });

  if (cleanedTakeaways.length > 0) {
    newBody += `> **Strategic Takeaway:** ` + cleanedTakeaways.join(' ').replace(/>\s*/g, '') + `\n\n`;
  }

  // Append standard CTA footer
  newBody += `---

### Optimizing Your Operations
Redevise designs and deploys custom business software, workflow automation, and technical SEO strategies that help operations teams scale without growing headcount. 

* **Ready to see what's possible?** Use our interactive [Project Cost Estimator](/estimate) to plan your next build.
* **Want to see how we work?** Learn about our systematic [Operational Process](/process) and how we guarantee delivery.
* **Get in touch:** Contact the Redevise team today to discuss your system challenges.
`;

  return fmBlock + '\n' + newBody;
}

// Execution block
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const slugArgIndex = args.indexOf('--slug');
const targetSlug = slugArgIndex !== -1 ? args[slugArgIndex + 1] : null;

const subdirs = readdirSync(BLOG_DIR).filter(name => {
  return statSync(join(BLOG_DIR, name)).isDirectory();
});

if (targetSlug) {
  console.log(`Running enrichment on single slug: "${targetSlug}"`);
  if (!subdirs.includes(targetSlug)) {
    console.error(`Slug "${targetSlug}" not found in blog content.`);
    process.exit(1);
  }
  const filePath = join(BLOG_DIR, targetSlug, 'index.mdoc');
  const original = readFileSync(filePath, 'utf-8');
  const enriched = enrichArticle(targetSlug, original);
  if (enriched) {
    if (isDryRun) {
      console.log(`\n=== DRY RUN PREVIEW FOR ${targetSlug} ===`);
      console.log(enriched);
      console.log(`=========================================`);
    } else {
      writeFileSync(filePath, enriched, 'utf-8');
      console.log(`Successfully enriched ${targetSlug}`);
    }
  }
} else {
  console.log(`Running enrichment on all ${subdirs.length} articles...`);
  let updatedCount = 0;
  subdirs.forEach(slug => {
    const filePath = join(BLOG_DIR, slug, 'index.mdoc');
    const original = readFileSync(filePath, 'utf-8');
    const enriched = enrichArticle(slug, original);
    if (enriched) {
      if (!isDryRun) {
        writeFileSync(filePath, enriched, 'utf-8');
      }
      updatedCount++;
    }
  });
  console.log(`\n🎉 Completed. Enriched ${updatedCount}/${subdirs.length} articles. (Dry run: ${isDryRun})`);
}
