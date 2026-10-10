
import jsPDF from "jspdf";

type RGB = [number, number, number];

export function createBudgetPdfPreview(): string {
  const doc = new jsPDF("p", "mm", "a4");

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const width = pageWidth - margin * 2;

  const C: Record<string, RGB> = {
    bgTop: [222, 239, 255],
    bgMid: [241, 249, 255],
    bgBottom: [219, 237, 252],
    ink: [14, 36, 64],
    body: [46, 68, 98],
    muted: [96, 118, 146],
    accent: [16, 112, 184],
    accentSoft: [120, 195, 245],
    border: [178, 210, 238],
    shadow: [70, 120, 170],
    green: [30, 125, 95],
  };

  const setOpacity = (opacity: number) => {
    doc.setGState(
      new (doc as any).GState({
        opacity,
        "stroke-opacity": opacity,
      }),
    );
  };

  const setText = (size: number, bold: boolean, color: RGB) => {
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(size);
    doc.setTextColor(...color);
  };

  const mix = (a: RGB, b: RGB, t: number): RGB => [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ];

  const drawBackground = () => {
    const steps = 70;
    const stripH = pageHeight / steps;

    for (let i = 0; i < steps; i++) {
      const t = i / (steps - 1);
      const color =
        t < 0.5
          ? mix(C.bgTop, C.bgMid, t * 2)
          : mix(C.bgMid, C.bgBottom, (t - 0.5) * 2);

      doc.setFillColor(...color);
      doc.rect(0, i * stripH, pageWidth, stripH + 0.4, "F");
    }

    const orb = (cx: number, cy: number, radius: number, color: RGB) => {
      doc.setFillColor(...color);

      for (let i = 0; i < 7; i++) {
        setOpacity(0.035);
        doc.circle(cx, cy, radius * (1 - i / 7), "F");
      }

      setOpacity(1);
    };

    orb(pageWidth - 8, 30, 58, [130, 200, 255]);
    orb(6, pageHeight * 0.55, 50, [165, 185, 255]);
    orb(pageWidth * 0.72, pageHeight - 6, 52, [120, 225, 235]);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(38);
    doc.setTextColor(...C.accent);
    setOpacity(0.055);

    doc.text("The local Route", pageWidth / 2, pageHeight * 0.43, {
      align: "center",
      angle: 32,
    });

    doc.text("The local Route", pageWidth / 2, pageHeight * 0.82, {
      align: "center",
      angle: 32,
    });

    setOpacity(1);
  };

  const glassCard = (x: number, y: number, w: number, h: number) => {
    doc.setFillColor(...C.shadow);
    setOpacity(0.06);
    doc.roundedRect(x + 0.4, y + 1.5, w, h, 5, 5, "F");

    doc.setFillColor(255, 255, 255);
    setOpacity(0.76);
    doc.roundedRect(x, y, w, h, 5, 5, "F");

    doc.setDrawColor(...C.border);
    doc.setLineWidth(0.4);
    setOpacity(0.95);
    doc.roundedRect(x, y, w, h, 5, 5, "S");

    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(0.6);
    doc.line(x + 6, y + 0.5, x + w - 6, y + 0.5);

    setOpacity(1);
  };

  const drawPill = (
    text: string,
    x: number,
    y: number,
    w: number,
    fill: RGB = C.accentSoft,
  ) => {
    doc.setFillColor(...fill);
    setOpacity(0.2);
    doc.roundedRect(x, y, w, 7, 3, 3, "F");
    setOpacity(1);

    setText(7, true, C.accent);
    doc.text(text, x + w / 2, y + 4.7, { align: "center" });
  };

  const drawSectionTitle = (title: string, x: number, y: number) => {
    setText(8.5, true, C.accent);
    doc.text(title.toUpperCase(), x, y);

    const textWidth = doc.getTextWidth(title.toUpperCase());

    doc.setDrawColor(...C.border);
    doc.setLineWidth(0.3);
    doc.line(x + textWidth + 5, y - 1.5, pageWidth - margin, y - 1.5);
  };

  const drawFooter = (page: number, totalPages: number) => {
    const y = pageHeight - 17;

    setText(8, true, C.ink);
    doc.text("Created by Anuj Srivastava", margin, y + 4);

    const creditWidth = doc.getTextWidth("Created by Anuj Srivastava");
    const iconX = margin + creditWidth + 5;
    const iconY = y + 0.5;
    const iconSize = 5;

    doc.setDrawColor(221, 42, 123);
    doc.setLineWidth(0.45);
    doc.roundedRect(iconX, iconY, iconSize, iconSize, 1.2, 1.2, "S");
    doc.circle(iconX + iconSize / 2, iconY + iconSize / 2, 1.1, "S");
    doc.circle(iconX + iconSize * 0.76, iconY + iconSize * 0.24, 0.3, "F");

    setText(8, false, C.body);
    doc.text("@srivastava_._anuj", iconX + iconSize + 2, y + 4);

    doc.link(iconX, y, 42, 8, {
      url: "https://instagram.com/srivastava_._anuj",
    });

    const pillW = 30;
    const pillH = 7.5;
    const pillX = pageWidth - margin - pillW;

    doc.setFillColor(255, 255, 255);
    setOpacity(0.7);
    doc.roundedRect(pillX, y - 1, pillW, pillH, 3.5, 3.5, "F");
    setOpacity(1);

    doc.setDrawColor(...C.border);
    doc.roundedRect(pillX, y - 1, pillW, pillH, 3.5, 3.5, "S");

    setText(7.5, true, C.muted);
    doc.text(`Page ${page} of ${totalPages}`, pillX + pillW / 2, y + 4, {
      align: "center",
    });
  };

  const drawLineItem = (
    label: string,
    value: string,
    x: number,
    y: number,
    rightX: number,
    options?: { bold?: boolean; color?: RGB },
  ) => {
    setText(8, options?.bold ?? false, options?.color ?? C.body);
    doc.text(label, x, y);
    doc.text(value, rightX, y, { align: "right" });
  };

  // ==========================================
  // PAGE 1 — TRIP OVERVIEW + BUDGET
  // ==========================================

  drawBackground();

  // Hero
  glassCard(margin, 13, width, 43);

  drawPill("SAMPLE ITINERARY", margin + 7, 19, 33);

  setText(22, true, C.ink);
  doc.text("Jaipur, Rajasthan", margin + 7, 34);

  setText(8.5, false, C.body);
  doc.text("The Pink City · Forts, old streets & Rajasthani culture", margin + 7, 41);

  setText(8, true, C.accent);
  doc.text("5 DAYS / 4 NIGHTS", margin + 7, 49);

  const heroRightX = pageWidth - margin - 7;
  setText(8, true, C.body);
  doc.text("2 TRAVELLERS", heroRightX, 49, { align: "right" });

  // Destination description
  glassCard(margin, 61, width, 27);

  setText(8.5, true, C.ink);
  doc.text("Your Jaipur escape", margin + 6, 69);

  setText(8, false, C.body);
  doc.text(
    doc.splitTextToSize(
      "Explore pink-hued bazaars, grand Rajput forts, peaceful gardens and local food stalls on a relaxed five-day city trip.",
      width - 12,
    ),
    margin + 6,
    76,
  );

  // Budget summary
  glassCard(margin, 93, width, 35);

  setText(8.5, true, C.accent);
  doc.text("ESTIMATED TRIP BUDGET", margin + 6, 101);

  setText(22, true, C.ink);
  doc.text("₹18,500", margin + 6, 115);

  setText(8, false, C.muted);
  doc.text("For 2 travellers · 5 days", margin + 6, 122);

  doc.setDrawColor(...C.border);
  doc.line(pageWidth / 2 + 8, 101, pageWidth / 2 + 8, 120);

  setText(8, false, C.muted);
  doc.text("COST PER PERSON", pageWidth / 2 + 14, 106);

  setText(15, true, C.green);
  doc.text("₹9,250", pageWidth / 2 + 14, 115);

  setText(7.5, false, C.muted);
  doc.text("Budget estimate, not a quote", pageWidth / 2 + 14, 122);

  // Transport snapshot
  glassCard(margin, 133, width, 29);

  setText(8.5, true, C.accent);
  doc.text("TRANSPORT PLAN", margin + 6, 141);

  drawLineItem("Arrival", "Train · ₹1,200", margin + 6, 149, pageWidth / 2 - 2);
  drawLineItem("Return", "Train · ₹1,200", pageWidth / 2 + 6, 149, pageWidth - margin - 6);

  setText(7.5, false, C.muted);
  doc.text("Local travel: metro, e-rickshaw and shared rides", margin + 6, 157);

  // Expense breakdown
  glassCard(margin, 167, width, 66);

  drawSectionTitle("Expense Breakdown", margin + 6, 176);

  const leftX = margin + 7;
  const rightX = pageWidth / 2 - 2;
  const secondX = pageWidth / 2 + 6;
  const secondRightX = pageWidth - margin - 7;

  drawLineItem("Arrival train", "₹1,200", leftX, 186, rightX);
  drawLineItem("Return train", "₹1,200", leftX, 195, rightX);
  drawLineItem("Accommodation", "₹4,800", leftX, 204, rightX);
  drawLineItem("Local transport", "₹2,000", leftX, 213, rightX);

  drawLineItem("Food & drinks", "₹3,000", secondX, 186, secondRightX);
  drawLineItem("Entry tickets", "₹1,500", secondX, 195, secondRightX);
  drawLineItem("Activities", "₹1,500", secondX, 204, secondRightX);
  drawLineItem("Emergency buffer", "₹3,300", secondX, 213, secondRightX);

  doc.setDrawColor(...C.border);
  doc.line(margin + 6, 219, pageWidth - margin - 6, 219);

  setText(8.5, true, C.ink);
  doc.text("TOTAL ESTIMATE", margin + 7, 227);
  doc.text("₹18,500", pageWidth - margin - 7, 227, { align: "right" });

  // Itinerary preview
  drawSectionTitle("Your 5-Day Itinerary", margin + 1, 243);

  const dayCards = [
    {
      day: "DAY 01",
      title: "Arrival & Pink City",
      desc: "Check in, explore Hawa Mahal from outside and wander through the colourful lanes of the old city.",
    },
    {
      day: "DAY 02",
      title: "Amber Fort & Jal Mahal",
      desc: "Visit Amber Fort in the morning, stop for lake views at Jal Mahal and enjoy sunset at Nahargarh.",
    },
    {
      day: "DAY 03",
      title: "Palaces & Local Markets",
      desc: "Explore City Palace, Jantar Mantar and the bazaars around Bapu Bazaar for textiles and local snacks.",
    },
  ];

  let y = 249;

  dayCards.forEach((day) => {
    glassCard(margin, y, width, 28);

    drawPill(day.day, margin + 5, y + 5, 18);

    setText(9, true, C.ink);
    doc.text(day.title, margin + 28, y + 8);

    setText(7.7, false, C.body);
    const lines = doc.splitTextToSize(day.desc, width - 34);
    doc.text(lines.slice(0, 2), margin + 28, y + 15);

    y += 32;
  });

  // ==========================================
  // PAGE 2 — ITINERARY CONTINUED + TRAVEL NOTES
  // ==========================================

  doc.addPage();
  drawBackground();

  drawPill("JAIPUR · 5 DAYS", margin, 16, 32);

  setText(19, true, C.ink);
  doc.text("Make the most of Jaipur", margin, 29);

  setText(8.5, false, C.body);
  doc.text("A relaxed route with room for food, photos and spontaneous stops.", margin, 36);

  drawSectionTitle("Daily Itinerary · Continued", margin + 1, 49);

  const remainingDays = [
    {
      day: "DAY 04",
      title: "Gardens, Art & Slow Travel",
      desc: "Spend the morning at Albert Hall Museum's exterior and Ram Niwas Garden, then enjoy cafés and a slower afternoon.",
      plan: "Suggested pace: relaxed",
    },
    {
      day: "DAY 05",
      title: "Local Breakfast & Departure",
      desc: "Enjoy a local breakfast, pick up last-minute souvenirs and head to the railway station for your return journey.",
      plan: "Keep departure time flexible",
    },
  ];

  let dayY = 56;

  remainingDays.forEach((day) => {
    glassCard(margin, dayY, width, 38);

    drawPill(day.day, margin + 6, dayY + 6, 18);

    setText(10, true, C.ink);
    doc.text(day.title, margin + 29, dayY + 10);

    setText(8, false, C.body);
    doc.text(
      doc.splitTextToSize(day.desc, width - 36),
      margin + 29,
      dayY + 18,
    );

    setText(7.5, true, C.accent);
    doc.text(day.plan, margin + 29, dayY + 32);

    dayY += 43;
  });

  // Practical details
  glassCard(margin, 151, width, 49);

  drawSectionTitle("Practical Travel Notes", margin + 6, 160);

  const notes = [
    "Stay: budget guesthouse or hostel for four nights.",
    "Getting around: use the metro where convenient and e-rickshaws for shorter hops.",
    "Food: allow extra time for local thalis, kachori and lassi stops.",
    "Tickets: confirm monument entry fees and opening hours before visiting.",
  ];

  let noteY = 169;

  notes.forEach((note) => {
    doc.setFillColor(...C.accent);
    doc.circle(margin + 8, noteY - 1, 0.8, "F");

    setText(7.8, false, C.body);
    doc.text(note, margin + 12, noteY);

    noteY += 8;
  });

  // Sample disclaimer
  glassCard(margin, 207, width, 28);

  setText(8.5, true, C.accent);
  doc.text("A NOTE ON THIS ESTIMATE", margin + 6, 216);

  setText(7.8, false, C.body);
  doc.text(
    doc.splitTextToSize(
      "This is a sample budget for preview purposes. Actual prices vary by travel dates, train availability, room type, group size and personal choices. Verify ticket prices and opening hours before your trip.",
      width - 12,
    ),
    margin + 6,
    224,
  );

  // Call to action / brand block
  glassCard(margin, 243, width, 25);

  setText(10, true, C.ink);
  doc.text("Travel more. Plan smarter.", margin + 7, 253);

  setText(8, false, C.body);
  doc.text("The local Route · Thoughtful trips for curious travellers", margin + 7, 261);

  // Footer on every page
  const totalPages = doc.getNumberOfPages();

  for (let page = 1; page <= totalPages; page++) {
    doc.setPage(page);
    drawFooter(page, totalPages);
  }

  return doc.output("datauristring");
}
