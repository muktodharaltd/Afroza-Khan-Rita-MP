export default function NariShaktiPage() {
  return (
    <div className="px-4 py-10">
      <section className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 items-stretch">
        {/* Card visual */}
        <div className="bg-white/80 border border-[#c43d74]/20 rounded-3xl shadow-xl w-full lg:w-1/2 flex justify-center items-center p-4">
          <img
            src="/narisokti.jpeg"
            alt="নারীশক্তি কার্ড"
            className="max-w-full h-auto rounded-3xl"
          />
        </div>

        {/* Registration form */}
        <div className="bg-white/90 backdrop-blur border border-[#c43d74]/30 rounded-3xl shadow-xl p-6 md:p-8 w-full lg:w-1/2 flex flex-col">
          <p className="text-sm uppercase  text-[#b12462] font-semibold text-center">
            নারীশক্তি কার্ড রেজিস্ট্রেশন
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#7a1245] text-center mt-2">
            আপনার তথ্য পূরণ করুন
          </h1>
          <p className="text-sm md:text-base text-brandGray/80 text-center mt-3 leading-relaxed">
            সুরক্ষিত ও সুবিধাভোগী হতে প্রয়োজনীয় তথ্য জমা দিন। জমাকৃত তথ্য শুধু
            কমিউনিটি সহায়তা ও যাচাইয়ের উদ্দেশ্যে ব্যবহৃত হবে।
          </p>

          <form className="mt-6 space-y-4">
            
              <label className="flex flex-col text-sm font-medium text-[#7a1245]">
                নাম
                <input
                  type="text"
                  placeholder="আপনার পূর্ণ নাম লিখুন"
                  className="mt-1 rounded-lg border border-[#c43d74]/40 px-3 py-2 text-brandGray focus:outline-none focus:ring-2 focus:ring-[#c43d74]/60 bg-white/80"
                  required
                />
              </label>
              <label className="flex flex-col text-sm font-medium text-[#7a1245]">
                বয়স
                <input
                  type="number"
                  min="10"
                  placeholder="বয়স লিখুন"
                  className="mt-1 rounded-lg border border-[#c43d74]/40 px-3 py-2 text-brandGray focus:outline-none focus:ring-2 focus:ring-[#c43d74]/60 bg-white/80"
                  required
                />
              </label>
            

            <label className="flex flex-col text-sm font-medium text-[#7a1245]">
              স্বামী/ পিতার নাম
              <input
                type="text"
                placeholder="স্বামী বা পিতার নাম লিখুন"
                className="mt-1 rounded-lg border border-[#c43d74]/40 px-3 py-2 text-brandGray focus:outline-none focus:ring-2 focus:ring-[#c43d74]/60 bg-white/80"
                required
              />
            </label>

            <label className="flex flex-col text-sm font-medium text-[#7a1245]">
              মাতার নাম
              <input
                type="text"
                placeholder="মাতার নাম লিখুন"
                className="mt-1 rounded-lg border border-[#c43d74]/40 px-3 py-2 text-brandGray focus:outline-none focus:ring-2 focus:ring-[#c43d74]/60 bg-white/80"
                required
              />
            </label>

            <label className="flex flex-col text-sm font-medium text-[#7a1245]">
              ঠিকানা
              <textarea
                rows={3}
                placeholder="বর্তমান বাসার ঠিকানা"
                className="mt-1 rounded-lg border border-[#c43d74]/40 px-3 py-2 text-brandGray focus:outline-none focus:ring-2 focus:ring-[#c43d74]/60 bg-white/80 resize-none"
                required
              />
            </label>
            <label className="flex flex-col text-sm font-medium text-[#7a1245]">
              জাতীয় পরিচয় পত্রের নাম্বার
              <textarea
                rows={3}
                placeholder="ভোটার আইডি কার্ড নাম্বার"
                className="mt-1 rounded-lg border border-[#c43d74]/40 px-3 py-2 text-brandGray focus:outline-none focus:ring-2 focus:ring-[#c43d74]/60 bg-white/80 resize-none"
                required
              />
            </label>

            

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                className="w-full sm:w-auto bg-[#b12462] hover:bg-[#7a1245] text-white font-semibold px-5 py-3 rounded-xl shadow-md transition"
              >
                রেজিস্ট্রেশন করুন
              </button>
              <button
                type="button"
                className="w-full sm:w-auto bg-white text-[#7a1245] font-semibold px-5 py-3 rounded-xl border border-[#c43d74]/50 shadow-sm hover:bg-[#ffe6f0] transition"
              >
                রিসেট
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}

