import { Heart, Shield, Users, Zap } from "lucide-react";

export const Why = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Introducing{" "}
              <span className="bg-gradient-to-r from-red-500 via-purple-500 to-red-400 bg-clip-text text-transparent">
                UntouchableDating.com
              </span>
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              An invitation‑only dating community created for people who value wellness, natural living, and choice—specifically singles who prefer partners that are health‑conscious and unvaccinated.
            </p>
          </div>

          {/* The Why Section */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold mb-8 text-center">The "Why"</h3>
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                During the last few years, I saw friends who prioritize holistic health struggle to find partners who share their lifestyle. Typical dating apps lump us all together, making it hard (and sometimes awkward) to filter for deeply held wellness choices. UntouchableDating was born to solve that:
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30 shadow-xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center shadow-lg mr-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white">Aligned Values</h4>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Everyone you meet here already shares your stance on natural immunity, healthy habits, and body autonomy.
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-900/30 to-red-800/20 backdrop-blur-sm rounded-2xl p-8 border border-red-500/30 shadow-xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center shadow-lg mr-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white">Curated Community</h4>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Access is granted by invite or vetting only, so spammers and trolls never make it through the door.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-600/30 shadow-xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center shadow-lg mr-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white">Safety & Privacy First</h4>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Discreet profile settings, ID verification, and encryption keep your personal decisions personal.
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-900/30 to-yellow-800/20 backdrop-blur-sm rounded-2xl p-8 border border-yellow-500/30 shadow-xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-full flex items-center justify-center shadow-lg mr-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white">Meaningful Features</h4>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Wellness‑focused bios, interest tags (organic foodies, yogis, homesteaders, etc.), private events, and "virtual first dates" via secure video chat.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};