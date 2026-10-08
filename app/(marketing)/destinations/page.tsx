import type { Metadata } from "next";

import { destinations } from "../../../data/destinations";
import { DestinationCard } from "../../../components/destination/destination-card";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "Explore destinations across India through my personal travel experiences and guides.",
};

export default function DestinationsPage() {
  return (
    <div className="min-h-screen bg-black pt-32">
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">

        {/* PAGE INTRO */}
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.2em] text-white/40">
            Explore India
          </p>

          <h1 className="mt-5 text-5xl font-semibold tracking-tight sm:text-6xl">
            Destinations
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/50">
            Places I&apos;ve explored, places I&apos;m planning to visit and
            destinations waiting for the next journey.
          </p>
        </div>

        {/* DESTINATIONS */}
        <div className="mt-20 space-y-4">

          {/* ================================================== */}
          {/* ROW 1 — BIG + 2 SMALL + WIDE */}
          {/* 0, 1, 2, 3 */}
          {/* ================================================== */}

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

            <div className="min-h-[520px]">
              <DestinationCard destination={destinations[0]} />
            </div>

            <div className="grid grid-cols-2 gap-4">

              <div className="min-h-[250px]">
                <DestinationCard destination={destinations[1]} />
              </div>

              <div className="min-h-[250px]">
                <DestinationCard destination={destinations[2]} />
              </div>

              <div className="col-span-2 min-h-[250px]">
                <DestinationCard destination={destinations[3]} />
              </div>

            </div>
          </div>


          {/* ================================================== */}
          {/* ROW 2 — 1 + 2 + 1 */}
          {/* 4, 5, 6 */}
          {/* ================================================== */}

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">

            <div className="min-h-[420px] lg:col-span-1">
              <DestinationCard destination={destinations[4]} />
            </div>

            <div className="min-h-[420px] lg:col-span-2">
              <DestinationCard destination={destinations[5]} />
            </div>

            <div className="min-h-[420px] lg:col-span-1">
              <DestinationCard destination={destinations[6]} />
            </div>

          </div>

{/* ROW 3 — FEATURED + STACK */}
{/* 7, 8, 9, 10 */}
<div className="grid grid-cols-1 gap-4 lg:grid-cols-3">

  {/* Large feature */}
  <div className="min-h-[520px] lg:col-span-2">
    <DestinationCard destination={destinations[7]} />
  </div>

  {/* Two stacked destinations */}
  <div className="grid grid-rows-2 gap-4">
    <div className="min-h-[250px]">
      <DestinationCard destination={destinations[8]} />
    </div>

    <div className="min-h-[250px]">
      <DestinationCard destination={destinations[9]} />
    </div>
  </div>

  {/* Full-width destination */}
  {/* <div className="min-h-[280px] lg:col-span-3">
    <DestinationCard destination={destinations[10]} />
  </div> */}

</div>


{/* ROW 4 — OFFSET EDITORIAL */}
{/* 11, 12, 13 */}
<div className="grid grid-cols-1 gap-4 lg:grid-cols-12">

  <div className="min-h-[420px] lg:col-span-3">
    <DestinationCard destination={destinations[11]} />
  </div>

  <div className="min-h-[520px] lg:col-span-6">
    <DestinationCard destination={destinations[12]} />
  </div>

  <div className="min-h-[420px] lg:col-span-3 lg:mt-20">
    <DestinationCard destination={destinations[13]} />
  </div>

</div>


{/* ROW 5 — BIG LEFT + 3 SMALL */}
{/* 14, 15, 16, 17 */}
<div className="grid grid-cols-1 gap-4 lg:grid-cols-4">

  <div className="min-h-[540px] lg:col-span-2">
    <DestinationCard destination={destinations[14]} />
  </div>

  <div className="grid grid-rows-2 gap-4 lg:col-span-2">

    <div className="grid grid-cols-2 gap-4">
      <div className="min-h-[260px]">
        <DestinationCard destination={destinations[15]} />
      </div>

      <div className="min-h-[260px]">
        <DestinationCard destination={destinations[16]} />
      </div>
    </div>

    <div className="min-h-[260px]">
      <DestinationCard destination={destinations[17]} />
    </div>

  </div>

</div>


{/* ROW 6 — 4 EQUAL */}
{/* 18, 19, 20, 21 */}
<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

  <div className="min-h-[340px]">
    <DestinationCard destination={destinations[18]} />
  </div>

  <div className="min-h-[340px]">
    <DestinationCard destination={destinations[19]} />
  </div>

  <div className="min-h-[340px]">
    <DestinationCard destination={destinations[20]} />
  </div>

  <div className="min-h-[340px]">
    <DestinationCard destination={destinations[21]} />
  </div>

</div>


{/* ROW 7 — WIDE CENTER */}
{/* 22, 23, 24 */}
<div className="grid grid-cols-1 gap-4 lg:grid-cols-4">

  <div className="min-h-[400px] lg:col-span-1">
    <DestinationCard destination={destinations[22]} />
  </div>

  <div className="min-h-[520px] lg:col-span-2">
    <DestinationCard destination={destinations[23]} />
  </div>

  <div className="min-h-[400px] lg:col-span-1">
    <DestinationCard destination={destinations[24]} />
  </div>

</div>


{/* ROW 8 — NESTED RIGHT */}
{/* 25, 26, 27, 28 */}
<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

  {/* Wide destination */}
  <div className="min-h-[520px]">
    <DestinationCard destination={destinations[25]} />
  </div>

  {/* Three-card composition */}
  <div className="grid grid-cols-2 gap-4">

    <div className="min-h-[250px]">
      <DestinationCard destination={destinations[26]} />
    </div>

    <div className="min-h-[250px]">
      <DestinationCard destination={destinations[27]} />
    </div>

    <div className="col-span-2 min-h-[250px]">
      <DestinationCard destination={destinations[28]} />
    </div>

  </div>

</div>


{/* ROW 9 — ASYMMETRIC */}
{/* 29, 30, 31, 32 */}
<div className="grid grid-cols-1 gap-4 lg:grid-cols-6">

  <div className="min-h-[460px] lg:col-span-2">
    <DestinationCard destination={destinations[29]} />
  </div>

  <div className="min-h-[460px] lg:col-span-2 lg:mt-16">
    <DestinationCard destination={destinations[30]} />
  </div>

  <div className="min-h-[460px] lg:col-span-2">
    <DestinationCard destination={destinations[31]} />
  </div>

  <div className="min-h-[280px] lg:col-span-3">
    <DestinationCard destination={destinations[32]} />
  </div>

</div>


{/* ROW 10 — BIG RIGHT + SMALL STACK */}
{/* 33, 34, 35, 36 */}
<div className="grid grid-cols-1 gap-4 lg:grid-cols-3">

  {/* Two stacked cards */}
  <div className="grid grid-rows-2 gap-4">

    <div className="min-h-[250px]">
      <DestinationCard destination={destinations[33]} />
    </div>

    <div className="min-h-[250px]">
      <DestinationCard destination={destinations[34]} />
    </div>

  </div>

  {/* Big feature */}
  <div className="min-h-[520px] lg:col-span-2">
    <DestinationCard destination={destinations[35]} />
  </div>

  {/* Wide bottom card */}
  <div className="min-h-[280px] lg:col-span-3">
    <DestinationCard destination={destinations[36]} />
  </div>

</div>


{/* ROW 11 — EDITORIAL SPLIT */}
{/* 37, 38, 39 */}
<div className="grid grid-cols-1 gap-4 lg:grid-cols-6">

  <div className="min-h-[480px] lg:col-span-2">
    <DestinationCard destination={destinations[37]} />
  </div>

  <div className="min-h-[480px] lg:col-span-2 lg:mt-24">
    <DestinationCard destination={destinations[38]} />
  </div>

  <div className="min-h-[300px] lg:col-span-2">
    <DestinationCard destination={destinations[39]} />
  </div>

</div>


{/* ROW 12 — FINAL FEATURE */}
{/* 40 */}
{/* <div className="min-h-[560px] ">
  <DestinationCard destination={destinations[40]} />
</div> */}

        </div>
      </section>
    </div>
  );
}