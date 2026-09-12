"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { REGIONAL_MAP_GEOMETRY } from "@/data/regional-map.generated";
import {
  SOVRAN_LOCATIONS,
  type SovranLocation,
} from "@/data/sovran-locations";

const COUNTRY_ALIASES: Record<string, string> = {
  "cote divoire": "ivory coast",
  "côte divoire": "ivory coast",
  "dem rep congo": "democratic republic of the congo",
  "democratic republic of congo": "democratic republic of the congo",
  "dr congo": "democratic republic of the congo",
  "republic of congo": "republic of the congo",
  "the gambia": "gambia",
  "united republic of tanzania": "tanzania",
};

const COUNTRY_PATHS: Record<string, string> = REGIONAL_MAP_GEOMETRY.countries;

function normaliseCountryName(value: string) {
  const normalised = value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

  return COUNTRY_ALIASES[normalised] ?? normalised;
}

function groupLocations(locations: SovranLocation[]) {
  const groups = new Map<string, SovranLocation[]>();

  for (const location of locations) {
    const country = normaliseCountryName(location.country);
    groups.set(country, [...(groups.get(country) ?? []), location]);
  }

  return groups;
}

function patternId(mapId: string, country: string) {
  return `${mapId}-${country.replaceAll(" ", "-")}`;
}

export function RegionalPresenceMap({
  locations = SOVRAN_LOCATIONS,
  showLocationList = true,
  fillContainer = false,
  allowOverflow = false,
  highlightedCountry,
  onActiveCountryChange,
  className = "",
}: {
  locations?: SovranLocation[];
  showLocationList?: boolean;
  fillContainer?: boolean;
  allowOverflow?: boolean;
  highlightedCountry?: string | null;
  onActiveCountryChange?: (country: string | null) => void;
  className?: string;
}) {
  const mapId = useId().replaceAll(":", "");
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const locationsByCountry = useMemo(() => groupLocations(locations), [locations]);
  const countries = useMemo(
    () =>
      [...locationsByCountry].flatMap(([country, countryLocations]) => {
        const path = COUNTRY_PATHS[country];

        return path
          ? [
              {
                country,
                path,
                label: countryLocations
                  .map((location) => `${location.city}, ${location.country}`)
                  .join("; "),
              },
            ]
          : [];
      }),
    [locationsByCountry],
  );

  const mapActiveCountry = hoveredCountry ?? selectedCountry;
  const externalCountry = highlightedCountry
    ? normaliseCountryName(highlightedCountry)
    : null;
  const visibleCountry = hoveredCountry ?? externalCountry ?? selectedCountry;
  const neutralPatternId = `${mapId}-neutral`;

  useEffect(() => {
    const location = mapActiveCountry
      ? locationsByCountry.get(mapActiveCountry)?.[0]
      : undefined;
    onActiveCountryChange?.(location?.country ?? null);
  }, [locationsByCountry, mapActiveCountry, onActiveCountryChange]);

  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;

    for (const [country, countryLocations] of locationsByCountry) {
      if (!COUNTRY_PATHS[country]) {
        console.warn(
          `RegionalPresenceMap: no generated path exists for "${countryLocations[0]?.country}". Run npm run map:build after changing locations.`,
        );
      }
    }
  }, [locationsByCountry]);

  function selectCountry(country: string) {
    setSelectedCountry((current) => (current === country ? null : country));
  }

  return (
    <div
      className={`${fillContainer ? "absolute inset-0" : "relative w-full"} ${className}`}
    >
      <svg
        viewBox={`0 0 ${REGIONAL_MAP_GEOMETRY.width} ${REGIONAL_MAP_GEOMETRY.height}`}
        preserveAspectRatio="xMidYMin meet"
        role="img"
        aria-label="Sovran Advisory regional presence across Africa"
        className={`block size-full ${allowOverflow ? "overflow-visible" : "overflow-hidden"}`}
        onPointerDown={(event) => {
          if (event.target === event.currentTarget) setSelectedCountry(null);
        }}
      >
        <defs>
          <pattern
            id={neutralPatternId}
            patternUnits="userSpaceOnUse"
            x={REGIONAL_MAP_GEOMETRY.patternX}
            y={REGIONAL_MAP_GEOMETRY.patternY}
            width={REGIONAL_MAP_GEOMETRY.cellStep}
            height={REGIONAL_MAP_GEOMETRY.cellStep}
          >
            <rect
              width={REGIONAL_MAP_GEOMETRY.cellSize}
              height={REGIONAL_MAP_GEOMETRY.cellSize}
              rx={0.5}
              fill="var(--sovran-color-fg-quaternary)"
            />
          </pattern>

          {countries.map(({ country }) => {
            const highlighted = visibleCountry === country;

            return (
              <pattern
                key={country}
                id={patternId(mapId, country)}
                patternUnits="userSpaceOnUse"
                x={REGIONAL_MAP_GEOMETRY.patternX}
                y={REGIONAL_MAP_GEOMETRY.patternY}
                width={REGIONAL_MAP_GEOMETRY.cellStep}
                height={REGIONAL_MAP_GEOMETRY.cellStep}
              >
                <rect
                  width={REGIONAL_MAP_GEOMETRY.cellSize}
                  height={REGIONAL_MAP_GEOMETRY.cellSize}
                  rx={0.5}
                  fill={
                    highlighted
                      ? "var(--sovran-color-brand-900)"
                      : "var(--sovran-color-bg-brand-solid)"
                  }
                  className="transition-colors duration-150 motion-reduce:transition-none"
                />
              </pattern>
            );
          })}
        </defs>

        <path
          d={REGIONAL_MAP_GEOMETRY.africaPath}
          fill={`url(#${neutralPatternId})`}
          className="pointer-events-none opacity-25"
          aria-hidden="true"
        />

        {countries.map(({ country, path, label }) => (
          <g
            key={country}
            role="button"
            tabIndex={0}
            aria-label={label}
            aria-pressed={selectedCountry === country}
            className="cursor-pointer outline-none focus-visible:[filter:brightness(1.15)]"
            onPointerEnter={() => setHoveredCountry(country)}
            onPointerLeave={() => setHoveredCountry(null)}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={() => selectCountry(country)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                selectCountry(country);
              }
            }}
            onFocus={() => setHoveredCountry(country)}
            onBlur={() => setHoveredCountry(null)}
          >
            <path
              d={path}
              fill={`url(#${patternId(mapId, country)})`}
              className="pointer-events-none"
              aria-hidden="true"
            />
            <path d={path} fill="transparent" stroke="none" pointerEvents="all" />
          </g>
        ))}
      </svg>

      <div
        className={
          showLocationList
            ? "mt-6 border-t border-border-secondary-alt pt-5"
            : "sr-only"
        }
      >
        {locations.length > 0 ? (
          <ul
            aria-label="Sovran Advisory locations"
            className="grid grid-cols-2 gap-x-6 gap-y-3 max-sm:grid-cols-1"
          >
            {locations.map((location) => {
              const country = normaliseCountryName(location.country);
              const highlighted = visibleCountry === country;

              return (
                <li key={`${location.city}-${location.country}`}>
                  <button
                    type="button"
                    className={`w-full border-l-2 py-1 pl-3 text-left transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current motion-reduce:transition-none ${
                      highlighted
                        ? "border-border-brand text-text-primary"
                        : "border-border-secondary text-text-tertiary hover:border-border-brand"
                    }`}
                    onPointerEnter={() => setHoveredCountry(country)}
                    onPointerLeave={() => setHoveredCountry(null)}
                    onFocus={() => setHoveredCountry(country)}
                    onBlur={() => setHoveredCountry(null)}
                    onClick={() => selectCountry(country)}
                  >
                    <span className="block text-base font-medium leading-6">
                      {location.city}, {location.country}
                    </span>
                    <span className="block text-sm leading-5 text-text-quaternary">
                      {location.type}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-sm leading-5 text-text-quaternary">
            Regional locations will appear here once configured.
          </p>
        )}
      </div>
    </div>
  );
}
