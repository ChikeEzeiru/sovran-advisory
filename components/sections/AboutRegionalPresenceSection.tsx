"use client";

import { useState } from "react";
import { RegionalPresenceMap } from "@/components/RegionalPresenceMap";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { SOVRAN_LOCATIONS } from "@/data/sovran-locations";

export function AboutRegionalPresenceSection() {
  const [mapActiveCountry, setMapActiveCountry] = useState<string | null>(null);
  const [addressActiveCountry, setAddressActiveCountry] = useState<
    string | null
  >(null);
  const activeCountry = addressActiveCountry ?? mapActiveCountry;

  return (
    <section
      aria-labelledby="regional-presence-heading"
      className="px-12 py-16 max-md:px-4"
    >
      <div className="mx-auto flex w-full max-w-400 flex-col gap-12">
        <div className="flex max-w-3xl flex-col items-start gap-4">
          <div className="flex flex-col items-start gap-2">
            <SectionEyebrow>Regional Presence</SectionEyebrow>
            <h2
              id="regional-presence-heading"
              className="text-4xl font-medium leading-11 tracking-tight text-text-secondary max-md:text-3xl max-md:leading-9"
            >
              Our work is grounded in the markets we operate in.
            </h2>
          </div>
          <p className="text-xl leading-7.5 text-text-tertiary max-md:text-base max-md:leading-6">
            Across our offices and wider network, we combine local knowledge
            with a regional view of Sub-Saharan Africa, helping clients
            understand the relationships, regulations and market realities
            shaping each decision.
          </p>
        </div>

        <div className="flex h-110 max-h-110 items-start gap-12 max-lg:h-auto max-lg:max-h-none max-lg:flex-col">
          <div className="flex h-full w-2/5 shrink-0 flex-col gap-12 max-lg:h-auto max-lg:w-full">
            <address className="flex flex-col gap-6 not-italic">
              {SOVRAN_LOCATIONS.map((location) => (
                <div
                  key={`${location.city}-${location.country}`}
                  onPointerEnter={() =>
                    setAddressActiveCountry(location.country)
                  }
                  onPointerLeave={() => setAddressActiveCountry(null)}
                  className={`flex flex-col gap-2 transition-opacity duration-250 ease-out motion-reduce:transition-none ${
                    activeCountry && activeCountry !== location.country
                      ? "opacity-30"
                      : "opacity-100"
                  }`}
                >
                  <p className="text-base font-medium leading-6 text-text-primary">
                    {location.city}, {location.country}
                  </p>
                  {location.address && (
                    <p className="text-base leading-6 text-text-secondary">
                      {location.address}
                    </p>
                  )}
                </div>
              ))}
            </address>
          </div>

          <div className="relative h-full min-w-0 flex-1 overflow-visible max-lg:h-112 max-lg:w-full max-lg:flex-none max-md:h-96">
            <div className="absolute -top-48 left-1/2 h-149 w-full -translate-x-1/2 max-lg:inset-0 max-lg:size-full max-lg:translate-x-0">
              <RegionalPresenceMap
                locations={SOVRAN_LOCATIONS}
                showLocationList={false}
                fillContainer
                allowOverflow
                highlightedCountry={addressActiveCountry}
                onActiveCountryChange={setMapActiveCountry}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
