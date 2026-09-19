import Image from "next/image"
import { PHARMACISTS, HEALTH_NOTES } from "@/lib/content"
import { Section, SectionHead } from "@/components/ui/section"
import { Reveal } from "@/components/ui/reveal"

export function Team() {
  return (
    <Section id="team" tone="white">
      <SectionHead
        title="من يقف خلف الطاولة"
        lede="تعرف على من يصرف دواءك ويجيب عن سؤالك."
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PHARMACISTS.map((person, index) => (
          <Reveal key={index} as="article" delay={index * 90}>
            <div className="group overflow-hidden rounded-2xl border border-line transition-colors duration-300 hover:border-green/40">
              <div className="relative aspect-[4/3] overflow-hidden bg-mist">
                <Image
                  src={person.image}
                  alt={person.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl text-ink">{person.name}</h3>
                <p className="mt-1 text-sm text-green">{person.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink/60">{person.detail}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

// ============================================================
// نصائح دوائية عامة — معلومات إرشادية، لا تشخيص ولا وصف علاج.
// ============================================================
export function HealthNotes() {
  return (
    <Section id="notes">
      <SectionHead
        title="ثلاث نصائح يسألنا عنها الناس كثيرًا"
        lede="معلومات عامة عن التعامل مع الدواء. لا تُغني عن استشارة طبيبك."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {HEALTH_NOTES.map((note) => (
          <article key={note.title} className="border-t-2 border-green pt-6">
            <h3 className="font-display text-lg leading-snug text-ink">{note.title}</h3>
            <p className="mt-3 text-[15px] leading-[1.9] text-ink/70">{note.body}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}
