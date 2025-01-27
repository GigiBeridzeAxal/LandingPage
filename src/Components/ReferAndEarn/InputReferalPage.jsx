import { WavesIcon as WaveIcon } from 'lucide-react';

export default function InputReferalPage() {
  return (
    <div className="bg-gray-400 text-black p-8">
      <div className="flex flex-col items-center gap-10 md:gap-0 md:items-start justify-center">
        {/* Logo */}
        <div className="mt-2">
          <img
            className="h-16 w-auto bg-gray-80 rounded"
            src="/Super5logo.png"
            alt="Super5"
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl">👋</span>
                <h1 className="text-4xl font-bold">Welcome!</h1>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed max-w-md">
                Showcase your products, create amazing collections, and
                experience the future of shopping. Start with a referral code
                for exclusive rewards.
              </p>
            </div>

            <div className="space-y-4 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter Your Referral/Promo Code"
                  className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor focus:border-transparent placeholder-gray-500"
                />
              </div>
              <button className="flex w-full justify-center bg-primaryColor px-3 py-3 text-lg font-semibold leading-6 text-white rounded-full shadow-sm">
                Continue
              </button>
              <button className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors">
                No, I don&apos;t have any code
              </button>
            </div>
          </div>

          {/* Right Column - Decorative Elements */}
          <div className="relative h-[500px] hidden lg:block">
            {/* Top Image Container */}
            <div className="absolute right-20 top-0 w-64 h-80 rounded-[40px] overflow-hidden">
              <img
                src={'/assets/super.png'}
                alt="Productimage"
                className="w-full h-48 object-cover"
              />
            </div>

            {/* Decorative Coins - Top */}
            <div className="absolute top-20 right-0 w-40 h-40 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-[30px] transform rotate-12">
              <div className="absolute inset-2 bg-yellow-400 rounded-[25px] flex items-center justify-center">
                <span className="text-4xl">⭐</span>
              </div>
            </div>

            {/* Decorative Coins - Bottom */}
            <div className="absolute bottom-10 right-20 w-48 h-48 bg-gradient-to-br from-blue-400 to-emerald-400 rounded-[30px] transform -rotate-12">
              <div className="absolute inset-2 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-[25px] flex items-center justify-center">
                <div className="grid grid-cols-2 gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center"
                    >
                      <span className="text-yellow-600 text-sm">$</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
