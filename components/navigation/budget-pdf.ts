import jsPDF from "jspdf";

type ItineraryDay = {
  day: number;
  title: string;
  description: string;
  locations: string[];
};

type Itinerary = {
  title: string;
  duration: number;
  days: ItineraryDay[];
};

type TransportOption = "train" | "bus";

type CityTransport =
  | "scooty"
  | "privateCab"
  | "sharedTaxi";

type DownloadBudgetPDFProps = {
  itinerary: Itinerary;
  members: number;

  arrivalTransport: TransportOption;
  departureTransport: TransportOption;
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

  const pageWidth =
    doc.internal.pageSize.getWidth();

  const pageHeight =
    doc.internal.pageSize.getHeight();

  const margin = 16;
  const contentWidth =
    pageWidth - margin * 2;

  const bottomMargin = 24;
  const pad = 8;
  const cardGap = 7;

  let y = 18;

  /*
   * ==========================================
   * THEME: ICE / CRYSTAL
   * ==========================================
   */

  type RGB = [number, number, number];

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
    white: [255, 255, 255],
    shadow: [70, 120, 170],
  };

  const PT = 0.352778;

  doc.setLineHeightFactor(1.4);

  const lh = (size: number) =>
    size * 1.4 * PT;

  const formatPdfPrice = (
    price: number,
  ) =>
    `Rs. ${price.toLocaleString(
      "en-IN",
    )}`;

  /*
   * ==========================================
   * LOW LEVEL HELPERS
   * ==========================================
   */

  const setOpacity = (
    opacity: number,
  ) => {
    doc.setGState(
      new (doc as any).GState({
        opacity,
        "stroke-opacity": opacity,
      }),
    );
  };

  const mix = (
    a: RGB,
    b: RGB,
    t: number,
  ): RGB => [
    Math.round(
      a[0] + (b[0] - a[0]) * t,
    ),
    Math.round(
      a[1] + (b[1] - a[1]) * t,
    ),
    Math.round(
      a[2] + (b[2] - a[2]) * t,
    ),
  ];

  const wrap = (
    text: string,
    size: number,
    bold: boolean,
    width: number,
  ): string[] => {
    doc.setFont(
      "helvetica",
      bold ? "bold" : "normal",
    );

    doc.setFontSize(size);

    return doc.splitTextToSize(
      text,
      width,
    ) as string[];
  };

  const setText = (
    size: number,
    bold: boolean,
    color: RGB,
  ) => {
    doc.setFont(
      "helvetica",
      bold ? "bold" : "normal",
    );

    doc.setFontSize(size);

    doc.setTextColor(
      color[0],
      color[1],
      color[2],
    );
  };

  /*
   * ==========================================
   * GLOW ORB
   * ==========================================
   */

  const glowOrb = (
    cx: number,
    cy: number,
    radius: number,
    color: RGB,
    strength: number,
  ) => {
    const layers = 7;

    doc.setFillColor(
      color[0],
      color[1],
      color[2],
    );

    for (
      let i = 0;
      i < layers;
      i++
    ) {
      setOpacity(
        strength * 0.25,
      );

      doc.circle(
        cx,
        cy,
        radius *
          (1 - i / layers),
        "F",
      );
    }

    setOpacity(1);
  };

  /*
   * ==========================================
   * VISIBLE WATERMARK
   * ==========================================
   */

  const drawWatermark = (
    text: string,
    centerY: number,
  ) => {
    const angle = 32;

    const rad =
      (angle * Math.PI) /
      180;

    doc.setFont(
      "helvetica",
      "bold",
    );

    doc.setFontSize(42);

    doc.setTextColor(
      C.accent[0],
      C.accent[1],
      C.accent[2],
    );

    const w =
      doc.getTextWidth(text);

    const cx = pageWidth / 2;

    const startX =
      cx -
      (w / 2) *
        Math.cos(rad);

    const startY =
      centerY +
      (w / 2) *
        Math.sin(rad);

    setOpacity(0.16);

    doc.text(
      text,
      startX,
      startY,
      {
        angle,
      },
    );

    setOpacity(1);
  };

  /*
   * ==========================================
   * FULL PAGE WATERMARK
   * ==========================================
   */

  const drawFullPageWatermark =
    () => {
      drawWatermark(
        "THE LOCAL ROUTE",
        pageHeight * 0.22,
      );

      drawWatermark(
        "THE LOCAL ROUTE",
        pageHeight * 0.50,
      );

      drawWatermark(
        "THE LOCAL ROUTE",
        pageHeight * 0.78,
      );
    };

  /*
   * ==========================================
   * INSTAGRAM ICON
   * ==========================================
   */

  const drawInstagramIcon = (
    x: number,
    top: number,
    size: number,
  ) => {
    doc.setDrawColor(
      221,
      42,
      123,
    );

    doc.setFillColor(
      221,
      42,
      123,
    );

    doc.setLineWidth(0.45);

    doc.roundedRect(
      x,
      top,
      size,
      size,
      size * 0.3,
      size * 0.3,
      "S",
    );

    doc.circle(
      x + size / 2,
      top + size / 2,
      size * 0.22,
      "S",
    );

    doc.circle(
      x + size * 0.76,
      top + size * 0.24,
      size * 0.06,
      "F",
    );
  };

  /*
   * ==========================================
   * BACKGROUND
   * ==========================================
   */

  const drawBackground = () => {
    const steps = 70;

    const stripH =
      pageHeight / steps;

    for (
      let i = 0;
      i < steps;
      i++
    ) {
      const t =
        i / (steps - 1);

      const color =
        t < 0.5
          ? mix(
              C.bgTop,
              C.bgMid,
              t * 2,
            )
          : mix(
              C.bgMid,
              C.bgBottom,
              (t - 0.5) * 2,
            );

      doc.setFillColor(
        color[0],
        color[1],
        color[2],
      );

      doc.rect(
        0,
        i * stripH,
        pageWidth,
        stripH + 0.4,
        "F",
      );
    }

    glowOrb(
      pageWidth - 8,
      30,
      58,
      [130, 200, 255],
      0.22,
    );

    glowOrb(
      6,
      pageHeight * 0.55,
      50,
      [165, 185, 255],
      0.16,
    );

    glowOrb(
      pageWidth * 0.72,
      pageHeight - 6,
      52,
      [120, 225, 235],
      0.18,
    );

    drawFullPageWatermark();
  };

  /*
   * ==========================================
   * GLASS CARD
   * ==========================================
   */

  const glassCard = (
    x: number,
    top: number,
    w: number,
    h: number,
  ) => {
    doc.setFillColor(
      C.shadow[0],
      C.shadow[1],
      C.shadow[2],
    );

    setOpacity(0.05);

    doc.roundedRect(
      x + 0.4,
      top + 1.6,
      w,
      h,
      5,
      5,
      "F",
    );

    setOpacity(0.06);

    doc.roundedRect(
      x + 0.2,
      top + 0.8,
      w,
      h,
      5,
      5,
      "F",
    );

    doc.setFillColor(
      255,
      255,
      255,
    );

    setOpacity(0.66);

    doc.roundedRect(
      x,
      top,
      w,
      h,
      5,
      5,
      "F",
    );

    doc.setDrawColor(
      C.border[0],
      C.border[1],
      C.border[2],
    );

    doc.setLineWidth(0.4);

    setOpacity(0.95);

    doc.roundedRect(
      x,
      top,
      w,
      h,
      5,
      5,
      "S",
    );

    doc.setDrawColor(
      255,
      255,
      255,
    );

    doc.setLineWidth(0.6);

    setOpacity(0.95);

    doc.line(
      x + 6,
      top + 0.5,
      x + w - 6,
      top + 0.5,
    );

    setOpacity(1);
  };

  /*
   * ==========================================
   * PILL
   * ==========================================
   */

  const pill = (
    x: number,
    top: number,
    w: number,
    h: number,
    text: string,
    size: number,
    textColor: RGB,
    fillColor: RGB,
  ) => {
    doc.setFillColor(
      fillColor[0],
      fillColor[1],
      fillColor[2],
    );

    setOpacity(0.2);

    doc.roundedRect(
      x,
      top,
      w,
      h,
      h / 2,
      h / 2,
      "F",
    );

    doc.setDrawColor(
      C.accent[0],
      C.accent[1],
      C.accent[2],
    );

    doc.setLineWidth(0.25);

    setOpacity(0.4);

    doc.roundedRect(
      x,
      top,
      w,
      h,
      h / 2,
      h / 2,
      "S",
    );

    setOpacity(1);

    setText(
      size,
      true,
      textColor,
    );

    doc.text(
      text,
      x + w / 2,
      top +
        h / 2 +
        size * PT * 0.34,
      {
        align: "center",
      },
    );
  };

  const sectionLabel = (
    text: string,
    x: number,
    baseline: number,
  ) => {
    setText(
      8.5,
      true,
      C.accent,
    );

    doc.text(
      text,
      x,
      baseline,
    );
  };

  /*
   * ==========================================
   * PAGE CREATION
   * ==========================================
   */

  const addNewPage = () => {
    doc.addPage();

    drawBackground();

    y = 20;
  };

  const ensureSpace = (
    height: number,
  ) => {
    if (
      y + height >
      pageHeight - bottomMargin
    ) {
      addNewPage();
    }
  };

  /*
   * ==========================================
   * DAY CARD
   * ==========================================
   */

  const addDay = (
    day: ItineraryDay,
  ) => {
    const innerW =
      contentWidth -
      pad * 2;

    const titleLines =
      wrap(
        day.title,
        13,
        true,
        innerW,
      );

    const descLines =
      wrap(
        day.description,
        10,
        false,
        innerW,
      );

    doc.setFont(
      "helvetica",
      "bold",
    );

    doc.setFontSize(8);

    const chips: {
      label: string;
      w: number;
      x: number;
      row: number;
    }[] = [];

    let cx = 0;
    let row = 0;

    day.locations.forEach(
      (loc) => {
        const w = Math.min(
          doc.getTextWidth(loc) +
            8,
          innerW,
        );

        if (
          cx > 0 &&
          cx + w > innerW
        ) {
          row++;
          cx = 0;
        }

        chips.push({
          label: loc,
          w,
          x: cx,
          row,
        });

        cx += w + 3;
      },
    );

    const chipRows =
      chips.length > 0
        ? row + 1
        : 0;

    const chipPitch = 9;
    const chipH = 6.5;

    const badgeTop = 7;
    const badgeH = 6.2;

    const titleBase =
      badgeTop +
      badgeH +
      9;

    const titleLast =
      titleBase +
      (titleLines.length - 1) *
        lh(13);

    const descBase =
      titleLast + 7;

    const descLast =
      descBase +
      (descLines.length - 1) *
        lh(10);

    let bottom =
      descLast + 7;

    const placesLabelBase =
      descLast + 9;

    const chipsTop =
      placesLabelBase + 3;

    if (chipRows > 0) {
      bottom =
        chipsTop +
        (chipRows - 1) *
          chipPitch +
        chipH +
        7;
    }

    const cardH = bottom;

    ensureSpace(cardH);

    const x = margin;
    const top = y;

    glassCard(
      x,
      top,
      contentWidth,
      cardH,
    );

    const badgeText =
      `DAY ${day.day}`;

    doc.setFont(
      "helvetica",
      "bold",
    );

    doc.setFontSize(8.5);

    const badgeW =
      doc.getTextWidth(
        badgeText,
      ) + 9;

    pill(
      x + pad,
      top + badgeTop,
      badgeW,
      badgeH,
      badgeText,
      8.5,
      C.accent,
      C.accentSoft,
    );

    setText(
      13,
      true,
      C.ink,
    );

    doc.text(
      titleLines,
      x + pad,
      top + titleBase,
    );

    setText(
      10,
      false,
      C.body,
    );

    doc.text(
      descLines,
      x + pad,
      top + descBase,
    );

    if (chipRows > 0) {
      setText(
        7.5,
        true,
        C.muted,
      );

      doc.text(
        "PLACES",
        x + pad,
        top + placesLabelBase,
      );

      chips.forEach(
        (chip) => {
          pill(
            x + pad + chip.x,
            top +
              chipsTop +
              chip.row *
                chipPitch,
            chip.w,
            chipH,
            chip.label,
            8,
            C.accent,
            C.accentSoft,
          );
        },
      );
    }

    y +=
      cardH + 6;
  };

  /*
   * ==========================================
   * PAGE 1
   * ==========================================
   */

  drawBackground();

  /*
   * HERO CARD
   */

  {
    const innerW =
      contentWidth -
      pad * 2;

    const titleLines =
      wrap(
        itinerary.title,
        20,
        true,
        innerW - 6,
      );

    const chipText =
      `${duration} nights / ${itinerary.days.length} days`;

    const titleBase = 19;

    const titleLast =
      titleBase +
      (titleLines.length - 1) *
        lh(20);

    const chipTop =
      titleLast + 6;

    const chipH = 7;

    const heroH =
      chipTop +
      chipH +
      8;

    ensureSpace(heroH);

    const x = margin;
    const top = y;

    glassCard(
      x,
      top,
      contentWidth,
      heroH,
    );

    doc.setFillColor(
      C.accentSoft[0],
      C.accentSoft[1],
      C.accentSoft[2],
    );

    setOpacity(0.2);

    doc.triangle(
      x + contentWidth - 7,
      top + 7,
      x + contentWidth - 55,
      top + 7,
      x + contentWidth - 7,
      top + heroH - 7,
      "F",
    );

    doc.setFillColor(
      255,
      255,
      255,
    );

    setOpacity(0.5);

    doc.triangle(
      x + contentWidth - 7,
      top +
        heroH -
        7,
      x + contentWidth - 42,
      top +
        heroH -
        7,
      x + contentWidth - 7,
      top + 16,
      "F",
    );

    setOpacity(1);

    sectionLabel(
      "TRAVEL BUDGET PLAN",
      x + pad,
      top + 10,
    );

    setText(
      20,
      true,
      C.ink,
    );

    doc.text(
      titleLines,
      x + pad,
      top + titleBase,
    );

    doc.setFont(
      "helvetica",
      "bold",
    );

    doc.setFontSize(9);

    const chipW =
      doc.getTextWidth(
        chipText,
      ) + 10;

    pill(
      x + pad,
      top + chipTop,
      chipW,
      chipH,
      chipText,
      9,
      C.accent,
      C.accentSoft,
    );

    y +=
      heroH +
      cardGap;
  }

  /*
   * ==========================================
   * CREATED & MANAGED BY
   * FRONT PAGE
   * ==========================================
   */

  {
    const creditH = 29;

    ensureSpace(
      creditH,
    );

    const x = margin;
    const top = y;

    glassCard(
      x,
      top,
      contentWidth,
      creditH,
    );

    setText(
      10,
      true,
      C.ink,
    );

    doc.text(
      "Created and managed by Anuj Srivastava",
      x + pad,
      top + 11,
    );

    drawInstagramIcon(
      x + pad,
      top + 16,
      5,
    );

    setText(
      9,
      false,
      C.body,
    );

    doc.text(
      "Instagram: @srivastava_._anuj",
      x + pad + 8,
      top + 20,
    );

    doc.link(
      x + pad,
      top + 15,
      75,
      8,
      {
        url:
          "https://instagram.com/srivastava_._anuj",
      },
    );

    y +=
      creditH +
      cardGap;
  }

  /*
   * ==========================================
   * TRIP SUMMARY CARD
   * ==========================================
   */

  {
    const h = 48;

    ensureSpace(h);

    const x = margin;
    const top = y;

    const midX =
      x +
      contentWidth / 2;

    glassCard(
      x,
      top,
      contentWidth,
      h,
    );

    sectionLabel(
      "TRIP SUMMARY",
      x + pad,
      top + 10,
    );

    setText(
      22,
      true,
      C.ink,
    );

    doc.text(
      formatPdfPrice(total),
      x + pad,
      top + 24,
    );

    setText(
      9,
      false,
      C.muted,
    );

    doc.text(
      "Total trip budget",
      x + pad,
      top + 30,
    );

    doc.setDrawColor(
      C.border[0],
      C.border[1],
      C.border[2],
    );

    doc.setLineWidth(0.3);

    setOpacity(0.9);

    doc.line(
      midX,
      top + 15,
      midX,
      top + 32,
    );

    setOpacity(1);

    setText(
      16,
      true,
      C.accent,
    );

    doc.text(
      formatPdfPrice(perPerson),
      midX + 8,
      top + 23.5,
    );

    setText(
      9,
      false,
      C.muted,
    );

    doc.text(
      "Approx. per person",
      midX + 8,
      top + 30,
    );

    const travellersText =
      `Travellers: ${members} ${
        members === 1
          ? "person"
          : "people"
      }`;

    doc.setFont(
      "helvetica",
      "bold",
    );

    doc.setFontSize(8.5);

    const tW =
      doc.getTextWidth(
        travellersText,
      ) + 10;

    pill(
      x + pad,
      top + 36,
      tW,
      6.5,
      travellersText,
      8.5,
      C.accent,
      C.accentSoft,
    );

    y +=
      h + cardGap;
  }

  /*
   * ==========================================
   * BUDGET BREAKDOWN CARD
   * ==========================================
   */

  {
    const localTransportLabel =
      cityTransport ===
      "scooty"
        ? `Scooty · ${duration} days · ${numberOfScooties} ${
            numberOfScooties ===
            1
              ? "scooty"
              : "scooties"
          }`
        : cityTransport ===
            "privateCab"
          ? `Private Cab · ${duration} days`
          : `Shared Taxi · ${duration} days`;

    const rows: {
      label: string;
      value: number;
    }[] = [
      {
        label:
          "Reaching your destination",
        value:
          arrivalCost,
      },
      {
        label: `Hotel · ${duration} nights`,
        value:
          hotelCost,
      },
      {
        label:
          localTransportLabel,
        value:
          cityTransportCost,
      },
      {
        label: `Food · ${duration} days`,
        value:
          foodCost,
      },
      {
        label: `Entry fees & museums · ${duration} days`,
        value:
          entryFeesCost,
      },
      {
        label:
          "Getting back home",
        value:
          departureCost,
      },
    ];

    const rowH = 10;
    const firstRow = 21;

    const h =
      firstRow +
      (rows.length - 1) *
        rowH +
      9;

    ensureSpace(h);

    const x = margin;
    const top = y;

    glassCard(
      x,
      top,
      contentWidth,
      h,
    );

    sectionLabel(
      "BUDGET BREAKDOWN",
      x + pad,
      top + 10,
    );

    rows.forEach(
      (r, i) => {
        const base =
          top +
          firstRow +
          i * rowH;

        setText(
          10,
          false,
          C.body,
        );

        doc.text(
          r.label,
          x + pad,
          base,
        );

        setText(
          10,
          true,
          C.ink,
        );

        doc.text(
          formatPdfPrice(
            r.value,
          ),
          x +
            contentWidth -
            pad,
          base,
          {
            align: "right",
          },
        );

        if (
          i <
          rows.length - 1
        ) {
          doc.setDrawColor(
            C.border[0],
            C.border[1],
            C.border[2],
          );

          doc.setLineWidth(
            0.25,
          );

          setOpacity(0.75);

          doc.line(
            x + pad,
            base + 4,
            x +
              contentWidth -
              pad,
            base + 4,
          );

          setOpacity(1);
        }
      },
    );

    y +=
      h + cardGap;
  }

  /*
   * ==========================================
   * TRIP OVERVIEW CARD
   * ==========================================
   */

  {
    const overviewLines =
      wrap(
        "A complete day-wise travel plan covering the main places to visit, the suggested route, and the key stops for each day of the journey.",
        10,
        false,
        contentWidth -
          pad * 2,
      );

    const firstBase = 18;

    const h =
      firstBase +
      (overviewLines.length - 1) *
        lh(10) +
      8;

    ensureSpace(h);

    const x = margin;
    const top = y;

    glassCard(
      x,
      top,
      contentWidth,
      h,
    );

    sectionLabel(
      "TRIP OVERVIEW",
      x + pad,
      top + 10,
    );

    setText(
      10,
      false,
      C.body,
    );

    doc.text(
      overviewLines,
      x + pad,
      top + firstBase,
    );

    y +=
      h + cardGap;
  }

  /*
   * ==========================================
   * DAY-WISE PLAN
   * ==========================================
   */

  addNewPage();

  {
    const h = 26;

    const x = margin;
    const top = y;

    glassCard(
      x,
      top,
      contentWidth,
      h,
    );

    setText(
      15,
      true,
      C.ink,
    );

    doc.text(
      "DAY-WISE TRIP PLAN",
      x + pad,
      top + 11,
    );

    const sub =
      wrap(
        `${itinerary.title} · ${duration} nights / ${itinerary.days.length} days`,
        9,
        false,
        contentWidth -
          pad * 2,
      );

    setText(
      9,
      false,
      C.muted,
    );

    doc.text(
      sub[0],
      x + pad,
      top + 18.5,
    );

    y +=
      h + 7;
  }

  itinerary.days.forEach(
    (day) => {
      addDay(day);
    },
  );

  /*
   * ==========================================
   * FOOTER EVERY PAGE
   * ==========================================
   */

  const totalPages =
    doc.getNumberOfPages();

  for (
    let page = 1;
    page <= totalPages;
    page++
  ) {
    doc.setPage(page);

    const footerY =
      pageHeight - 13;

    setText(
      8,
      true,
      C.ink,
    );

    doc.text(
      "Anuj Srivastava",
      margin,
      footerY,
    );

    const pillW = 30;
    const pillH = 7.5;

    const pillX =
      pageWidth -
      margin -
      pillW;

    const pillTop =
      pageHeight - 18;

    doc.setFillColor(
      255,
      255,
      255,
    );

    setOpacity(0.6);

    doc.roundedRect(
      pillX,
      pillTop,
      pillW,
      pillH,
      pillH / 2,
      pillH / 2,
      "F",
    );

    doc.setDrawColor(
      C.border[0],
      C.border[1],
      C.border[2],
    );

    doc.setLineWidth(0.3);

    setOpacity(0.95);

    doc.roundedRect(
      pillX,
      pillTop,
      pillW,
      pillH,
      pillH / 2,
      pillH / 2,
      "S",
    );

    setOpacity(1);

    setText(
      8,
      true,
      C.muted,
    );

    doc.text(
      `Page ${page} of ${totalPages}`,
      pillX +
        pillW / 2,
      pillTop + 5,
      {
        align: "center",
      },
    );
  }

  /*
   * ==========================================
   * DOWNLOAD
   * ==========================================
   */

  const fileName =
    `${itinerary.title
      .replace(
        /[^a-zA-Z0-9]+/g,
        "-",
      )
      .replace(
        /^-|-$/g,
        "",
      )}-Budget.pdf`;

  doc.save(fileName);
}