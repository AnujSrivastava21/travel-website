import jsPDF from "jspdf";

import type {
  Itinerary,
  TransportType,
  CityTransport,
} from "../budget/budget-types";

type DownloadBudgetPDFProps = {
  itinerary: Itinerary;
  members: number;
  arrivalTransport: TransportType;
  departureTransport: TransportType;
  cityTransport: CityTransport;
  arrivalCost: number;
  hotelCost: number;
  cityTransportCost: number;
  foodCost: number;
  entryFeesCost: number;
  departureCost: number;
  total: number;
  perPerson: number;
  duration: number;
  numberOfScooties: number;
};

type RGB = [number, number, number];

type Block = {
  h: number; // block height (mm)
  gap: number; // space after the block (mm)
  draw: (x: number, top: number) => void;
};

export function downloadBudgetPDF({
  itinerary,
  members,
  arrivalTransport,
  departureTransport,
  cityTransport,
  arrivalCost,
  hotelCost,
  cityTransportCost,
  foodCost,
  entryFeesCost,
  departureCost,
  total,
  perPerson,
  duration,
  numberOfScooties,
}: DownloadBudgetPDFProps) {
  const doc = new jsPDF();

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  const topMargin = 14;
  const footerReserve = 22;
  const usableHeight = pageHeight - topMargin - footerReserve;

  /*
   * ==========================================
   * THEME: ICE / CRYSTAL
   * ==========================================
   */
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
  };

  const PT = 0.352778; // 1pt in mm
  doc.setLineHeightFactor(1.4);

  const lh = (size: number) => size * 1.4 * PT; // line pitch
  const asc = (size: number) => size * PT * 0.82; // top -> baseline
  const dsc = (size: number) => size * PT * 0.28; // baseline -> bottom

  const money = (value: number) =>
    `INR ${Math.round(value).toLocaleString("en-IN")}`;

  const formatTransport = (transport: TransportType) =>
    transport === "train" ? "Train" : "Bus";

  const formatCityTransport = (transport: CityTransport) => {
    switch (transport) {
      case "scooty":
        return "Scooty";
      case "privateCab":
        return "Private cab";
      case "sharedTaxi":
        return "Shared taxi";
    }
  };

  /*
   * ==========================================
   * LOW LEVEL HELPERS
   * ==========================================
   */
  const setOpacity = (opacity: number) => {
    doc.setGState(
      new (doc as any).GState({
        opacity,
        "stroke-opacity": opacity,
      }),
    );
  };

  const mix = (a: RGB, b: RGB, t: number): RGB => [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ];

  const setText = (size: number, bold: boolean, color: RGB) => {
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(size);
    doc.setTextColor(color[0], color[1], color[2]);
  };

  const wrap = (
    text: string,
    size: number,
    bold: boolean,
    width: number,
  ): string[] => {
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(size);
    return doc.splitTextToSize(text, width) as string[];
  };

  const glowOrb = (
    cx: number,
    cy: number,
    radius: number,
    color: RGB,
    strength: number,
  ) => {
    const layers = 7;
    doc.setFillColor(color[0], color[1], color[2]);
    for (let i = 0; i < layers; i++) {
      setOpacity(strength * 0.25);
      doc.circle(cx, cy, radius * (1 - i / layers), "F");
    }
    setOpacity(1);
  };

  // Diagonal, centred, translucent watermark
  const drawWatermark = (text: string, centerY: number) => {
    const angle = 32;
    const rad = (angle * Math.PI) / 180;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(44);
    doc.setTextColor(C.accent[0], C.accent[1], C.accent[2]);

    const w = doc.getTextWidth(text);
    const cx = pageWidth / 2;

    const startX = cx - (w / 2) * Math.cos(rad);
    const startY = centerY + (w / 2) * Math.sin(rad);

    setOpacity(0.08);
    doc.text(text, startX, startY, { angle });
    setOpacity(1);
  };

  // Instagram logo drawn with vector shapes
  const drawInstagramIcon = (x: number, top: number, size: number) => {
    doc.setDrawColor(221, 42, 123);
    doc.setFillColor(221, 42, 123);
    doc.setLineWidth(0.45);

    doc.roundedRect(x, top, size, size, size * 0.3, size * 0.3, "S");
    doc.circle(x + size / 2, top + size / 2, size * 0.22, "S");
    doc.circle(x + size * 0.76, top + size * 0.24, size * 0.06, "F");
  };

  // Icy gradient background + glow orbs + watermark (every page)
  const drawBackground = () => {
    const steps = 70;
    const stripH = pageHeight / steps;

    for (let i = 0; i < steps; i++) {
      const t = i / (steps - 1);
      const color =
        t < 0.5
          ? mix(C.bgTop, C.bgMid, t * 2)
          : mix(C.bgMid, C.bgBottom, (t - 0.5) * 2);

      doc.setFillColor(color[0], color[1], color[2]);
      doc.rect(0, i * stripH, pageWidth, stripH + 0.4, "F");
    }

    glowOrb(pageWidth - 8, 30, 58, [130, 200, 255], 0.22);
    glowOrb(6, pageHeight * 0.55, 50, [165, 185, 255], 0.16);
    glowOrb(pageWidth * 0.72, pageHeight - 6, 52, [120, 225, 235], 0.18);

    drawWatermark("The local Route", pageHeight * 0.3);
    drawWatermark("The local Route", pageHeight * 0.74);
  };

  // Frosted glass panel
  const glassCard = (x: number, top: number, w: number, h: number) => {
    doc.setFillColor(C.shadow[0], C.shadow[1], C.shadow[2]);
    setOpacity(0.05);
    doc.roundedRect(x + 0.4, top + 1.6, w, h, 5, 5, "F");
    setOpacity(0.06);
    doc.roundedRect(x + 0.2, top + 0.8, w, h, 5, 5, "F");

    doc.setFillColor(255, 255, 255);
    setOpacity(0.66);
    doc.roundedRect(x, top, w, h, 5, 5, "F");

    doc.setDrawColor(C.border[0], C.border[1], C.border[2]);
    doc.setLineWidth(0.4);
    setOpacity(0.95);
    doc.roundedRect(x, top, w, h, 5, 5, "S");

    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(0.6);
    setOpacity(0.95);
    doc.line(x + 6, top + 0.5, x + w - 6, top + 0.5);

    setOpacity(1);
  };

  // Small translucent pill with centred text
  const pill = (
    x: number,
    top: number,
    w: number,
    h: number,
    text: string,
    size: number,
  ) => {
    doc.setFillColor(C.accentSoft[0], C.accentSoft[1], C.accentSoft[2]);
    setOpacity(0.2);
    doc.roundedRect(x, top, w, h, h / 2, h / 2, "F");

    doc.setDrawColor(C.accent[0], C.accent[1], C.accent[2]);
    doc.setLineWidth(0.25);
    setOpacity(0.4);
    doc.roundedRect(x, top, w, h, h / 2, h / 2, "S");
    setOpacity(1);

    setText(size, true, C.accent);
    doc.text(text, x + w / 2, top + h / 2 + size * PT * 0.34, {
      align: "center",
    });
  };

  const sectionLabel = (
    text: string,
    x: number,
    baseline: number,
    size: number,
  ) => {
    setText(size, true, C.accent);
    doc.text(text, x, baseline);
  };

  // Lays out pill chips in wrapping rows
  const layoutChips = (
    labels: string[],
    maxW: number,
    size: number,
    padX: number,
    gap: number,
  ) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(size);

    const chips: { label: string; w: number; x: number; row: number }[] = [];
    let cx = 0;
    let row = 0;

    labels.forEach((raw) => {
      const maxText = maxW - padX * 2;
      const label =
        doc.getTextWidth(raw) > maxText
          ? (doc.splitTextToSize(raw, maxText) as string[])[0]
          : raw;

      const w = Math.min(doc.getTextWidth(label) + padX * 2, maxW);

      if (cx > 0 && cx + w > maxW) {
        row++;
        cx = 0;
      }

      chips.push({ label, w, x: cx, row });
      cx += w + gap;
    });

    return { chips, rows: labels.length > 0 ? row + 1 : 0 };
  };

  /*
   * ==========================================
   * BLOCK BUILDERS
   * Every block measures itself first, so the
   * layout can be fitted before anything is
   * drawn. `s` is a spacing/size scale (1 = roomy).
   * ==========================================
   */

  // ---- Hero: title, destination, duration, travellers, description ----
  const buildHero = (s: number): Block => {
    const pad = 6.5 * s;
    const fLabel = 8 * s;
    const fTitle = 17 * s;
    const fDesc = 9 * s;
    const fChip = 8 * s;

    const innerW = contentWidth - pad * 2 - 8 * s;

    const titleLines = wrap(itinerary.title, fTitle, true, innerW);
    const descLines = wrap(
      itinerary.description || "Your planned travel itinerary.",
      fDesc,
      false,
      innerW,
    );

    const chipLabels = [
      itinerary.destination,
      `${duration} day${duration === 1 ? "" : "s"}`,
      `${members} traveler${members === 1 ? "" : "s"}`,
    ].filter(Boolean) as string[];

    const chipLayout = layoutChips(chipLabels, innerW, fChip, 3.6 * s, 2.5 * s);
    const chipH = 6 * s;
    const chipPitch = chipH + 2 * s;

    const labelBase = pad + asc(fLabel);
    const titleBase = labelBase + dsc(fLabel) + asc(fTitle) + 2.2 * s;
    const titleLast = titleBase + (titleLines.length - 1) * lh(fTitle);
    const chipsTop = titleLast + dsc(fTitle) + 2.8 * s;
    const chipsBottom =
      chipsTop + (chipLayout.rows - 1) * chipPitch + chipH;
    const descBase = chipsBottom + 2.4 * s + asc(fDesc);
    const descLast = descBase + (descLines.length - 1) * lh(fDesc);
    const h = descLast + dsc(fDesc) + pad;

    return {
      h,
      gap: 4.5 * s,
      draw: (x, top) => {
        glassCard(x, top, contentWidth, h);

        // Crystal facets (corner)
        const xr = x + contentWidth;

        doc.setFillColor(C.accentSoft[0], C.accentSoft[1], C.accentSoft[2]);
        setOpacity(0.2);
        doc.triangle(
          xr - 7,
          top + 7,
          xr - 55,
          top + 7,
          xr - 7,
          top + h - 7,
          "F",
        );

        doc.setFillColor(255, 255, 255);
        setOpacity(0.5);
        doc.triangle(
          xr - 7,
          top + h - 7,
          xr - 42,
          top + h - 7,
          xr - 7,
          top + 16,
          "F",
        );
        setOpacity(1);

        sectionLabel("TRIP BUDGET", x + pad, top + labelBase, fLabel);

        setText(fTitle, true, C.ink);
        doc.text(titleLines, x + pad, top + titleBase);

        chipLayout.chips.forEach((chip) => {
          pill(
            x + pad + chip.x,
            top + chipsTop + chip.row * chipPitch,
            chip.w,
            chipH,
            chip.label,
            fChip,
          );
        });

        setText(fDesc, false, C.body);
        doc.text(descLines, x + pad, top + descBase);
      },
    };
  };

  // ---- Summary: total + per person ----
  const buildSummary = (s: number): Block => {
    const pad = 6.5 * s;
    const fCap = 7.5 * s;
    const fTotal = 21 * s;
    const fPer = 15 * s;

    const capBase = pad + asc(fCap);
    const totalBase = capBase + dsc(fCap) + asc(fTotal) + 2.2 * s;
    const h = totalBase + dsc(fTotal) + pad;

    const splitX = contentWidth * 0.6;

    return {
      h,
      gap: 4.5 * s,
      draw: (x, top) => {
        glassCard(x, top, contentWidth, h);

        sectionLabel(
          "TOTAL ESTIMATED BUDGET",
          x + pad,
          top + capBase,
          fCap,
        );

        setText(fTotal, true, C.ink);
        doc.text(money(total), x + pad, top + totalBase);

        // divider
        doc.setDrawColor(C.border[0], C.border[1], C.border[2]);
        doc.setLineWidth(0.3);
        setOpacity(0.9);
        doc.line(
          x + splitX - 6 * s,
          top + pad,
          x + splitX - 6 * s,
          top + h - pad,
        );
        setOpacity(1);

        sectionLabel(
          "APPROX. PER PERSON",
          x + splitX,
          top + capBase,
          fCap,
        );

        setText(fPer, true, C.accent);
        doc.text(money(perPerson), x + splitX, top + totalBase);
      },
    };
  };

  // ---- Breakdown: transport | expenses side by side ----
  const buildBreakdown = (s: number): Block => {
    const pad = 6.5 * s;
    const fHdr = 8 * s;
    const fRow = 9 * s;
    const rowPitch = 7.6 * s;
    const gutter = 9 * s;
    const colW = (contentWidth - pad * 2 - gutter) / 2;

    const transportRows: [string, number][] = [
      [`Arrival (${formatTransport(arrivalTransport)})`, arrivalCost],
      [`Departure (${formatTransport(departureTransport)})`, departureCost],
      [
        `Local transport (${formatCityTransport(cityTransport)}${
          cityTransport === "scooty" ? ` x${numberOfScooties}` : ""
        })`,
        cityTransportCost,
      ],
    ];

    const expenseRows: [string, number][] = [
      ["Accommodation", hotelCost],
      ["Food", foodCost],
      ["Entry fees and activities", entryFeesCost],
    ];

    const hdrBase = pad + asc(fHdr);
    const firstRow = hdrBase + dsc(fHdr) + 3.2 * s + asc(fRow);
    const h = firstRow + 2 * rowPitch + dsc(fRow) + pad;

    const drawColumn = (
      title: string,
      rows: [string, number][],
      colX: number,
      top: number,
    ) => {
      sectionLabel(title, colX, top + hdrBase, fHdr);

      rows.forEach(([label, amount], i) => {
        const base = top + firstRow + i * rowPitch;

        setText(fRow, true, C.ink);
        const amountText = money(amount);
        const amountW = doc.getTextWidth(amountText);

        setText(fRow, false, C.body);
        const fitted = (
          doc.splitTextToSize(label, colW - amountW - 3) as string[]
        )[0];
        doc.text(fitted, colX, base);

        setText(fRow, true, C.ink);
        doc.text(amountText, colX + colW, base, { align: "right" });

        if (i < rows.length - 1) {
          doc.setDrawColor(C.border[0], C.border[1], C.border[2]);
          doc.setLineWidth(0.25);
          setOpacity(0.75);
          doc.line(colX, base + 2.5 * s, colX + colW, base + 2.5 * s);
          setOpacity(1);
        }
      });
    };

    return {
      h,
      gap: 4.5 * s,
      draw: (x, top) => {
        glassCard(x, top, contentWidth, h);

        const leftX = x + pad;
        const rightX = leftX + colW + gutter;

        // column divider
        doc.setDrawColor(C.border[0], C.border[1], C.border[2]);
        doc.setLineWidth(0.3);
        setOpacity(0.9);
        doc.line(
          leftX + colW + gutter / 2,
          top + pad,
          leftX + colW + gutter / 2,
          top + h - pad,
        );
        setOpacity(1);

        drawColumn("TRANSPORT", transportRows, leftX, top);
        drawColumn("EXPENSES", expenseRows, rightX, top);
      },
    };
  };

  // ---- Itinerary heading (drawn together with the first day) ----
  const headingHeight = (s: number) => 7.5 * s;

  const drawHeading = (x: number, top: number, s: number) => {
    const f = 8.5 * s;
    const label = "DAILY ITINERARY";
    const base = top + asc(f) + 0.5 * s;

    setText(f, true, C.accent);
    doc.text(label, x + 1, base);
    const w = doc.getTextWidth(label);

    doc.setDrawColor(C.border[0], C.border[1], C.border[2]);
    doc.setLineWidth(0.3);
    setOpacity(0.9);
    doc.line(x + w + 5, base - 1.2 * s, x + contentWidth, base - 1.2 * s);
    setOpacity(1);
  };

  // ---- One day card ----
  const buildDay = (
    day: Itinerary["days"][number],
    s: number,
    withHeading: boolean,
  ): Block => {
    const pad = 6.5 * s;
    const badge = 12 * s;
    const textGap = 5 * s;

    const fTitle = 10.5 * s;
    const fDesc = 8.8 * s;
    const fChip = 7.5 * s;

    const innerW = contentWidth - pad * 2 - badge - textGap;

    const titleLines = wrap(day.title, fTitle, true, innerW);
    const descLines = day.description
      ? wrap(day.description, fDesc, false, innerW)
      : [];

    const chipLayout = layoutChips(
      day.locations ?? [],
      innerW,
      fChip,
      3.2 * s,
      2.2 * s,
    );
    const chipH = 5.4 * s;
    const chipPitch = chipH + 1.9 * s;

    const headH = withHeading ? headingHeight(s) : 0;

    const titleBase = pad + asc(fTitle);
    let last = titleBase + (titleLines.length - 1) * lh(fTitle);
    let bottom = last + dsc(fTitle);

    let descBase = 0;
    if (descLines.length > 0) {
      descBase = bottom + 1.4 * s + asc(fDesc);
      last = descBase + (descLines.length - 1) * lh(fDesc);
      bottom = last + dsc(fDesc);
    }

    let chipsTop = 0;
    if (chipLayout.rows > 0) {
      chipsTop = bottom + 2.2 * s;
      bottom = chipsTop + (chipLayout.rows - 1) * chipPitch + chipH;
    }

    const cardH = Math.max(bottom + pad, pad * 2 + badge);

    return {
      h: headH + cardH,
      gap: 4.5 * s,
      draw: (x, top) => {
        if (withHeading) drawHeading(x, top, s);

        const cTop = top + headH;
        glassCard(x, cTop, contentWidth, cardH);

        // Day badge
        const bx = x + pad;
        const by = cTop + pad;

        doc.setFillColor(C.accentSoft[0], C.accentSoft[1], C.accentSoft[2]);
        setOpacity(0.22);
        doc.roundedRect(bx, by, badge, badge, 3 * s, 3 * s, "F");

        doc.setDrawColor(C.accent[0], C.accent[1], C.accent[2]);
        doc.setLineWidth(0.25);
        setOpacity(0.4);
        doc.roundedRect(bx, by, badge, badge, 3 * s, 3 * s, "S");
        setOpacity(1);

        setText(5.2 * s, true, C.accent);
        doc.text("DAY", bx + badge / 2, by + 4.3 * s, { align: "center" });

        setText(10.5 * s, true, C.ink);
        doc.text(`${day.day}`, bx + badge / 2, by + 10 * s, {
          align: "center",
        });

        // Text column
        const tx = x + pad + badge + textGap;

        setText(fTitle, true, C.ink);
        doc.text(titleLines, tx, cTop + titleBase);

        if (descLines.length > 0) {
          setText(fDesc, false, C.body);
          doc.text(descLines, tx, cTop + descBase);
        }

        chipLayout.chips.forEach((chip) => {
          pill(
            tx + chip.x,
            cTop + chipsTop + chip.row * chipPitch,
            chip.w,
            chipH,
            chip.label,
            fChip,
          );
        });
      },
    };
  };

  // ---- Empty itinerary ----
  const buildEmptyDays = (s: number): Block => {
    const pad = 6.5 * s;
    const f = 9 * s;
    const headH = headingHeight(s);
    const cardH = pad * 2 + lh(f);

    return {
      h: headH + cardH,
      gap: 4.5 * s,
      draw: (x, top) => {
        drawHeading(x, top, s);
        glassCard(x, top + headH, contentWidth, cardH);

        setText(f, false, C.body);
        doc.text(
          "No daily itinerary details available.",
          x + pad,
          top + headH + pad + asc(f),
        );
      },
    };
  };

  // ---- Disclaimer (plain text, no card) ----
  const buildDisclaimer = (s: number): Block => {
    const f = 7.5 * s;
    const lines = wrap(
      "This is an estimated budget. Actual expenses may vary depending on availability, season, and personal choices.",
      f,
      false,
      contentWidth,
    );

    return {
      h: lines.length * lh(f),
      gap: 0,
      draw: (x, top) => {
        setText(f, false, C.muted);
        doc.text(lines, x, top + asc(f));
      },
    };
  };

  const buildBlocks = (s: number): Block[] => {
    const blocks: Block[] = [
      buildHero(s),
      buildSummary(s),
      buildBreakdown(s),
    ];

    if (!itinerary.days || itinerary.days.length === 0) {
      blocks.push(buildEmptyDays(s));
    } else {
      itinerary.days.forEach((day, i) => {
        blocks.push(buildDay(day, s, i === 0));
      });
    }

    blocks.push(buildDisclaimer(s));
    return blocks;
  };

  /*
   * ==========================================
   * AUTO-FIT
   * Use the fewest pages possible, then pick
   * the roomiest scale that still fits them.
   * No wasted page, no nearly-empty last page
   * caused by a few extra lines.
   * ==========================================
   */
  const paginate = (blocks: Block[]): Block[][] => {
    const pages: Block[][] = [[]];
    let used = 0;

    blocks.forEach((block) => {
      const current = pages[pages.length - 1];

      if (current.length > 0 && used + block.h > usableHeight) {
        pages.push([]);
        used = 0;
      }

      pages[pages.length - 1].push(block);
      used += block.h + block.gap;
    });

    return pages;
  };

  const scales = [1, 0.97, 0.94, 0.91, 0.88, 0.85];

  const minPages = paginate(buildBlocks(scales[scales.length - 1])).length;

  let pages: Block[][] = [];

  for (const s of scales) {
    const candidate = paginate(buildBlocks(s));
    if (candidate.length === minPages) {
      pages = candidate;
      break;
    }
  }

  /*
   * ==========================================
   * DRAW
   * ==========================================
   */
  pages.forEach((blocks, pageIndex) => {
    if (pageIndex > 0) doc.addPage();

    drawBackground();

    let y = topMargin;

    blocks.forEach((block) => {
      block.draw(margin, y);
      y += block.h + block.gap;
    });
  });

  /*
   * ==========================================
   * FOOTER: credit, Instagram, page numbers
   * ==========================================
   */
  const totalPages = doc.getNumberOfPages();

  for (let page = 1; page <= totalPages; page++) {
    doc.setPage(page);

    const pillW = 30;
    const pillH = 7.5;
    const pillX = pageWidth - margin - pillW;
    const pillTop = pageHeight - 18;

    doc.setFillColor(255, 255, 255);
    setOpacity(0.6);
    doc.roundedRect(pillX, pillTop, pillW, pillH, pillH / 2, pillH / 2, "F");

    doc.setDrawColor(C.border[0], C.border[1], C.border[2]);
    doc.setLineWidth(0.3);
    setOpacity(0.95);
    doc.roundedRect(pillX, pillTop, pillW, pillH, pillH / 2, pillH / 2, "S");
    setOpacity(1);

    setText(8, true, C.muted);
    doc.text(
      `Page ${page} of ${totalPages}`,
      pillX + pillW / 2,
      pillTop + 5,
      { align: "center" },
    );

    // Creator credit
    const creditText = "Created by Anuj Srivastava";
    setText(8, true, C.ink);
    doc.text(creditText, margin, pillTop + 5);
    const creditW = doc.getTextWidth(creditText);

    // Instagram logo + handle
    const iconSize = 5;
    const iconX = margin + creditW + 6;
    const handle = "@srivastava_._anuj";

    drawInstagramIcon(iconX, pillTop + 1.25, iconSize);

    setText(8, false, C.body);
    doc.text(handle, iconX + iconSize + 2, pillTop + 5);
    const handleW = doc.getTextWidth(handle);

    doc.link(iconX, pillTop, iconSize + 2 + handleW, pillH, {
      url: "https://instagram.com/srivastava_._anuj",
    });
  }

  /*
   * ==========================================
   * DOWNLOAD
   * ==========================================
   */
  const safeName = (itinerary.slug || itinerary.title || "trip-budget")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  doc.save(`${safeName || "trip-budget"}-budget.pdf`);
}