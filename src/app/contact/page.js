import Contact from '@/components/contact'

const contactCards = [
  {
    title: 'অফিস ঠিকানা',
    detail: 'মুন্নু সিটি, গিলন্ড, মানিকগঞ্জ সদর, মানিকগঞ্জ-১৮০০',
  },
  {
    title: 'ফোন',
    detail: '+৮৮০ ১২৩৪ ৫৬৭৮৯০',
  },
  {
    title: 'ইমেইল',
    detail: 'office@afrozakhanrita.com',
  },
]

export default function ContactPage() {
  return (
    <div className="space-y-10 px-4 py-10">
      <section className="max-w-5xl mx-auto text-center space-y-4">
        <p className="text-sm uppercase  text-brandGreen font-semibold">
          সরাসরি যোগাযোগ
        </p>
        <h1 className="text-4xl font-bold text-brandGray">
          আপনার অভিযোগ বা পরামর্শ আমাদের কাছে পৌঁছে দিন
        </h1>
        <p className="text-base text-brandGray/80">
          যে কোনো সমস্যায় আমরা আপনার পাশে দাঁড়িয়ে প্রস্তুত। নিচে দেওয়া ফোন/ইমেইল
          কিংবা অনলাইন ফর্মের মাধ্যমে আপনার কথা সাহস নিয়ে বলুন।
        </p>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        {contactCards.map((card) => (
          <article
            key={card.title}
            className="bg-brandGreen/10 border border-brandGreen/60 rounded-2xl p-6 text-center"
          >
            <h2 className="text-lg font-semibold text-brandGreen mb-2">
              {card.title}
            </h2>
            <p className="text-sm text-brandGray leading-relaxed">
              {card.detail}
            </p>
          </article>
        ))}
      </section>

      <section className="bg-white">
        <div className="max-w-7xl mx-auto">
          <Contact />
        </div>
      </section>
    </div>
  )
}
