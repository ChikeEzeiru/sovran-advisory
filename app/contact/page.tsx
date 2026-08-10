import type { Metadata } from "next"
import { Navbar } from "@/components/sections/Navbar"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Sovran Advisory. We work with governments, institutions, and corporates across African markets.",
}
import { Footer } from "@/components/sections/Footer"

const OFFICES = [
  {
    country: "Rwanda",
    address: "EAR Province Headquarter Blg, Remera opp Amahoro stadium, 573, Kigali",
    phone: "+25008300029",
    email: "kigali@sovranadvisory.com",
  },
  {
    country: "Ghana",
    address: "1st Floor, 5 Labone Crescent, Labone, Accra, Ghana",
    phone: "+233302960460",
    email: "accra@sovranadvisory.com",
  },
  {
    country: "Kenya",
    address: "Enterprise Rd, 18046-00500 Enterprise Rd, Nairobi",
    phone: "+254-20557435",
    email: "nairobi@sovranadvisory.com",
  },
]

export default function ContactPage() {
  return (
    <>
      <Navbar theme="light" />
      <main>
        <section className="px-12 pt-40 pb-24 max-w-[1600px] mx-auto w-full">
          <div className="flex flex-col gap-4 max-w-3xl">
            <div className="self-start border border-[#d0d6d8] rounded-[10px] px-3 py-1">
              <span className="text-base font-normal leading-6 text-[#67787c]">Contact</span>
            </div>
            <h1 className="text-5xl font-medium leading-tight tracking-tight text-[#161b1d]">
              Discuss an engagement with our team.
            </h1>
            <p className="text-xl font-normal leading-8 text-[#4b585b] max-w-2xl">
              We respond to all enquiries within one business day. For sensitive matters, please indicate as much in your note and we will handle accordingly.
            </p>
          </div>
        </section>

        <section className="px-12 pb-32 max-w-[1600px] mx-auto w-full">
          <div className="flex gap-16 items-start">
            {/* Form */}
            <div className="flex-1 flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-[#161b1d]">First name</label>
                  <input
                    type="text"
                    placeholder="First name"
                    className="w-full px-3.5 py-2.5 text-base rounded-xl border border-[#d0d6d8] bg-white text-[#161b1d] placeholder:text-[#67787c] outline-none focus:ring-2 focus:ring-[#1a3d2e]/30"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-[#161b1d]">Last name</label>
                  <input
                    type="text"
                    placeholder="Last name"
                    className="w-full px-3.5 py-2.5 text-base rounded-xl border border-[#d0d6d8] bg-white text-[#161b1d] placeholder:text-[#67787c] outline-none focus:ring-2 focus:ring-[#1a3d2e]/30"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#161b1d]">Email</label>
                <input
                  type="email"
                  placeholder="you@organisation.com"
                  className="w-full px-3.5 py-2.5 text-base rounded-xl border border-[#d0d6d8] bg-white text-[#161b1d] placeholder:text-[#67787c] outline-none focus:ring-2 focus:ring-[#1a3d2e]/30"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#161b1d]">Organisation</label>
                <input
                  type="text"
                  placeholder="Your organisation"
                  className="w-full px-3.5 py-2.5 text-base rounded-xl border border-[#d0d6d8] bg-white text-[#161b1d] placeholder:text-[#67787c] outline-none focus:ring-2 focus:ring-[#1a3d2e]/30"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#161b1d]">Message</label>
                <textarea
                  rows={5}
                  placeholder="Briefly describe what you would like to discuss."
                  className="w-full px-3.5 py-2.5 text-base rounded-xl border border-[#d0d6d8] bg-white text-[#161b1d] placeholder:text-[#67787c] outline-none focus:ring-2 focus:ring-[#1a3d2e]/30 resize-none"
                />
              </div>
              <button
                type="submit"
                className="self-start bg-[#1a3d2e] hover:bg-[#2a5c45] text-white text-base font-medium px-5 py-3 rounded-xl transition-colors duration-150"
              >
                Send message
              </button>
            </div>

            {/* Offices */}
            <div className="w-80 shrink-0 flex flex-col gap-8">
              <h2 className="text-xl font-medium text-[#161b1d]">Our offices</h2>
              {OFFICES.map((office) => (
                <div key={office.country} className="flex flex-col gap-1.5">
                  <p className="text-sm font-medium uppercase tracking-wide text-[#67787c]">{office.country}</p>
                  <p className="text-base text-[#4b585b] leading-6">{office.address}</p>
                  <p className="text-base text-[#4b585b]">{office.phone}</p>
                  <a href={`mailto:${office.email}`} className="text-base text-[#1a3d2e] hover:underline">{office.email}</a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
