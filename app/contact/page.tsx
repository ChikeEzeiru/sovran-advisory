import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { InternalPageHero } from "@/components/sections/InternalPageHero";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Contact", description: "Tell us the market, the decision and what is making it difficult." };
const inputClass = "w-full rounded-xs border border-border-primary bg-bg-primary px-3.5 py-2.5 text-base text-text-primary shadow-xs outline-none placeholder:text-text-placeholder focus:border-border-brand focus:ring-2 focus:ring-border-brand/20";

export default function ContactPage() {
  return <><Navbar theme="light" /><main>
    <InternalPageHero eyebrow="Contact" title="Have a decision to work through?" intro="Tell us the market, the decision and what is making it difficult. We will respond with the right next conversation." />
    <section className="mx-auto grid w-full max-w-400 grid-cols-12 gap-12 px-12 pb-24 max-lg:grid-cols-1 max-md:px-6 max-md:pb-16">
      <aside className="col-span-4"><p className="max-w-sm text-base leading-6 text-text-tertiary">This is a conceptual contact experience. No enquiry will be sent.</p><div className="mt-12 border-t border-border-primary pt-5"><p className="text-sm text-text-quaternary">Conceptual locations</p><p className="mt-2 text-base leading-7 text-text-secondary">Lagos · Nairobi · Accra · Johannesburg</p></div></aside>
      <form className="col-span-8 grid grid-cols-2 gap-5 rounded-xs bg-bg-primary p-8 max-md:grid-cols-1 max-md:p-6">
        {[["Name", "Your name", "text"], ["Organisation", "Your organisation", "text"], ["Work email", "you@organisation.com", "email"], ["Role", "Your role", "text"]].map(([label, placeholder, type]) => <label key={label} className="flex flex-col gap-1.5"><span className="text-sm font-medium text-text-secondary">{label}</span><input type={type} placeholder={placeholder} className={inputClass} /></label>)}
        <label className="col-span-2 flex flex-col gap-1.5 max-md:col-span-1"><span className="text-sm font-medium text-text-secondary">Market(s) involved</span><input type="text" placeholder="For example: Kenya and Nigeria" className={inputClass} /></label>
        <label className="col-span-2 flex flex-col gap-1.5 max-md:col-span-1"><span className="text-sm font-medium text-text-secondary">What are you working through?</span><textarea rows={6} placeholder="Tell us the decision, what is at stake and where you need clarity." className={`${inputClass} resize-y`} /></label>
        <label className="col-span-2 flex flex-col gap-1.5 max-md:col-span-1"><span className="text-sm font-medium text-text-secondary">Preferred contact method</span><select className={inputClass} defaultValue="email"><option value="email">Email</option><option value="phone">Phone</option><option value="video">Video call</option></select></label>
        <div className="col-span-2 mt-2 max-md:col-span-1"><Button type="submit" variant="primary" size="lg">Send enquiry</Button></div>
      </form>
    </section>
  </main><SiteFooter /></>;
}
