"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { geoContains, geoNaturalEarth1, geoPath } from "d3-geo";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import africaData from "@/data/africa.json";
import {
  SOVRAN_LOCATIONS,
  type SovranLocation,
} from "@/data/sovran-locations";

type AfricaProperties = {
  id: string;
  name: string;
};

type AfricaFeature = Feature<Geometry, AfricaProperties>;

type MapCell = {
  x: number;
  y: number;
  countryId: string;
  countryName: string;
  active: boolean;
};

type CountryHitArea = {
  countryName: string;
  path: string;
};

const AFRICA = africaData as FeatureCollection<Geometry, AfricaProperties>;

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

function useMapDimensions(
  containerRef: React.RefObject<HTMLDivElement | null>,
  fillContainer: boolean,
) {
  const [dimensions, setDimensions] = useState({ width: 960, height: 560 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(([entry]) => {
      const nextWidth = Math.round(entry.contentRect.width);
      const naturalHeight =
        nextWidth < 640
          ? Math.max(340, Math.round(nextWidth * 0.92))
          : Math.min(720, Math.round(nextWidth * 0.58));
      const nextHeight = fillContainer
        ? Math.round(entry.contentRect.height)
        : naturalHeight;

      setDimensions((current) =>
        Math.abs(current.width - nextWidth) >= 8 ||
        Math.abs(current.height - nextHeight) >= 8
          ? { width: nextWidth, height: nextHeight }
          : current,
      );
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, [containerRef, fillContainer]);

  return dimensions;
}

function buildCells(
  width: number,
  height: number,
  activeCountries: Set<string>,
  focusPresence: boolean,
) {
  const padding = 4;
  const cellSize = width < 640 ? 4.5 : width < 1024 ? 4 : 3.5;
  const cellStep = width < 640 ? 7 : width < 1024 ? 6 : 5;
  const projection = geoNaturalEarth1().fitExtent(
    [
      [padding, padding],
      [width - padding, height - padding],
    ],
    AFRICA,
  );

  if (focusPresence && width >= 480) {
    const focusScale = width >= 600 ? 1.38 : 1.26;
    projection.scale(projection.scale() * focusScale);

    const [[scaledLeft, scaledTop], [scaledRight]] =
      geoPath(projection).bounds(AFRICA);
    const [translateX, translateY] = projection.translate();
    projection.translate([
      translateX + width / 2 - (scaledLeft + scaledRight) / 2,
      translateY + padding - scaledTop,
    ]);
  }

  if (width > 720) {
    const [[currentLeft], [currentRight]] =
      geoPath(projection).bounds(AFRICA);
    const projectedWidth = currentRight - currentLeft;

    if (projectedWidth < 640) {
      projection.scale(projection.scale() * (640 / projectedWidth));

      const [[scaledLeft, scaledTop], [scaledRight]] =
        geoPath(projection).bounds(AFRICA);
      const [translateX, translateY] = projection.translate();
      projection.translate([
        translateX + width / 2 - (scaledLeft + scaledRight) / 2,
        translateY + padding - scaledTop,
      ]);
    }
  }

  const [[mapLeft, mapTop], [mapRight, mapBottom]] =
    geoPath(projection).bounds(AFRICA);
  const left = Math.max(0, mapLeft);
  const top = Math.max(0, mapTop);
  const right = Math.min(width, mapRight);
  const bottom = Math.min(height, mapBottom);
  const features = AFRICA.features as AfricaFeature[];
  const pathGenerator = geoPath(projection);
  const hitAreas = features.flatMap((feature): CountryHitArea[] => {
    const countryName = normaliseCountryName(feature.properties.name);
    const path = activeCountries.has(countryName)
      ? pathGenerator(feature)
      : null;

    return path ? [{ countryName, path }] : [];
  });
  const cells: MapCell[] = [];

  for (let y = top; y <= bottom; y += cellStep) {
    for (let x = left; x <= right; x += cellStep) {
      const coordinate = projection.invert?.([x, y]);
      if (!coordinate) continue;

      const country = features.find((feature) =>
        geoContains(feature, coordinate),
      );
      if (!country) continue;

      const countryKey = normaliseCountryName(country.properties.name);
      cells.push({
        x: Math.round(x * 10) / 10,
        y: Math.round(y * 10) / 10,
        countryId: country.properties.id,
        countryName: countryKey,
        active: activeCountries.has(countryKey),
      });
    }
  }

  return { cells, cellSize, hitAreas };
}

export function RegionalPresenceMap({
  locations = SOVRAN_LOCATIONS,
  showLocationList = true,
  fillContainer = false,
  focusPresence = false,
  onActiveCountryChange,
  className = "",
}: {
  locations?: SovranLocation[];
  showLocationList?: boolean;
  fillContainer?: boolean;
  focusPresence?: boolean;
  onActiveCountryChange?: (country: string | null) => void;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width, height } = useMapDimensions(containerRef, fillContainer);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const locationsByCountry = useMemo(() => groupLocations(locations), [locations]);
  const activeCountries = useMemo(
    () => new Set(locationsByCountry.keys()),
    [locationsByCountry],
  );
  const { cells, cellSize, hitAreas } = useMemo(
    () => buildCells(width, height, activeCountries, focusPresence),
    [width, height, activeCountries, focusPresence],
  );
  const cellsByCountry = useMemo(() => {
    const groups = new Map<string, MapCell[]>();
    for (const cell of cells.filter((item) => item.active)) {
      groups.set(cell.countryName, [
        ...(groups.get(cell.countryName) ?? []),
        cell,
      ]);
    }
    return groups;
  }, [cells]);

  const visibleCountry = hoveredCountry ?? selectedCountry;

  useEffect(() => {
    const location = visibleCountry
      ? locationsByCountry.get(visibleCountry)?.[0]
      : undefined;
    onActiveCountryChange?.(location?.country ?? null);
  }, [locationsByCountry, onActiveCountryChange, visibleCountry]);

  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;

    const datasetCountries = new Set(
      AFRICA.features.map((feature) =>
        normaliseCountryName(feature.properties.name),
      ),
    );

    for (const location of locations) {
      const country = normaliseCountryName(location.country);
      if (!datasetCountries.has(country)) {
        console.warn(
          `RegionalPresenceMap: configured country "${location.country}" was not found in the geographic dataset.`,
        );
      } else if (!cellsByCountry.has(country)) {
        console.warn(
          `RegionalPresenceMap: configured country "${location.country}" is too small to appear at the current cell density.`,
        );
      }
    }
  }, [cellsByCountry, locations]);

  function selectCountry(country: string) {
    setSelectedCountry((current) => (current === country ? null : country));
  }

  return (
    <div
      ref={containerRef}
      className={`${fillContainer ? "absolute inset-0" : "relative w-full"} ${className}`}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Sovran Advisory regional presence across Africa"
        className="block size-full overflow-hidden"
        onPointerDown={(event) => {
          if (event.target === event.currentTarget) setSelectedCountry(null);
        }}
      >
        <g aria-hidden="true" className="pointer-events-none">
          {cells
            .filter((cell) => !cell.active)
            .map((cell, index) => (
              <rect
                key={`${cell.countryId}-${cell.x}-${cell.y}`}
                x={cell.x - cellSize / 2}
                y={cell.y - cellSize / 2}
                width={cellSize}
                height={cellSize}
                rx={0.5}
                fill="var(--sovran-color-fg-quaternary)"
                className="regional-map-cell opacity-25"
                style={{ animationDelay: `${Math.min(index * 2, 280)}ms` }}
              />
            ))}
        </g>

        {[...cellsByCountry].map(([country, countryCells]) => {
          const highlighted = visibleCountry === country;
          const hitArea = hitAreas.find(
            (area) => area.countryName === country,
          );
          const label = (locationsByCountry.get(country) ?? [])
            .map((location) => `${location.city}, ${location.country}`)
            .join("; ");

          return (
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
              {hitArea && (
                <path
                  d={hitArea.path}
                  fill="transparent"
                  stroke="none"
                  pointerEvents="all"
                />
              )}
              {countryCells.map((cell, index) => (
                <rect
                  key={`${cell.countryId}-${cell.x}-${cell.y}`}
                  x={cell.x - cellSize / 2}
                  y={cell.y - cellSize / 2}
                  width={cellSize}
                  height={cellSize}
                  rx={0.5}
                  fill="var(--sovran-color-bg-brand-solid)"
                  className="regional-map-cell transition-opacity duration-150 motion-reduce:transition-none"
                  opacity={highlighted ? 1 : 0.82}
                  style={{ animationDelay: `${Math.min(index * 4, 220)}ms` }}
                />
              ))}
            </g>
          );
        })}
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
