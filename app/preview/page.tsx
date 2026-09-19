import type { Metadata } from "next";
import { Button, type ButtonSize } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Component preview",
  robots: { index: false, follow: false, nocache: true },
};

const SIZES: ButtonSize[] = ["xs", "sm", "md", "lg", "xl"];

function SizeLabel({ size }: { size: ButtonSize }) {
  const meta: Record<ButtonSize, string> = {
    xs: "xs — 32px",
    sm: "sm — 36px",
    md: "md — 40px",
    lg: "lg — 44px",
    xl: "xl — 48px",
  };
  return (
    <p className="text-[11px] font-medium tracking-widest uppercase text-[#7A7874] w-20 shrink-0">
      {meta[size]}
    </p>
  );
}

function Row({ size }: { size: ButtonSize }) {
  return (
    <div className="flex items-center gap-6">
      <SizeLabel size={size} />
      <div className="flex items-center gap-4 flex-wrap">
        <Button size={size} href="#">
          Primary
        </Button>
        <Button size={size} href="#" variant="primary-alt">
          Alt
        </Button>
        <Button size={size} href="#" variant="secondary">
          Secondary
        </Button>
        <Button size={size} href="#" variant="tertiary">
          Tertiary
        </Button>
        <Button size={size} href="#" variant="link">
          Link
        </Button>
        <Button size={size} href="#" variant="destructive">
          Destructive
        </Button>
        <Button size={size} href="#" variant="destructive-link">
          Del link
        </Button>
      </div>
    </div>
  );
}

export default function PreviewPage() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Light ground */}
      <section className="flex flex-col gap-8 p-16 bg-[#F7F6F3]">
        <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#7A7874]">
          Light ground
        </p>
        {SIZES.map((size) => (
          <Row key={size} size={size} />
        ))}
      </section>

      {/* Dark ground */}
      <section
        data-theme="dark"
        className="flex flex-col gap-8 p-16 bg-[#111111]"
      >
        <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#555552]">
          Dark ground
        </p>
        {SIZES.map((size) => (
          <Row key={size} size={size} />
        ))}
      </section>
    </main>
  );
}
