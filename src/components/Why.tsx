import { Heart, Shield, Users, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Why = () => {
  const { t } = useTranslation();
  
  return (
    <section className="py-24 bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t('why.title')}
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              {t('why.intro')}
            </p>
          </div>

          {/* The Why Section */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold mb-8 text-center">{t('why.subtitle')}</h3>
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                {t('why.description')}
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
                <h4 className="text-xl font-bold text-white">{t('why.aligned_values.title')}</h4>
              </div>
              <p className="text-gray-300 leading-relaxed">
                {t('why.aligned_values.description')}
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-900/30 to-red-800/20 backdrop-blur-sm rounded-2xl p-8 border border-red-500/30 shadow-xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center shadow-lg mr-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white">{t('why.curated_community.title')}</h4>
              </div>
              <p className="text-gray-300 leading-relaxed">
                {t('why.curated_community.description')}
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-600/30 shadow-xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center shadow-lg mr-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white">{t('why.safety_privacy.title')}</h4>
              </div>
              <p className="text-gray-300 leading-relaxed">
                {t('why.safety_privacy.description')}
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-900/30 to-yellow-800/20 backdrop-blur-sm rounded-2xl p-8 border border-yellow-500/30 shadow-xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-full flex items-center justify-center shadow-lg mr-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white">{t('why.meaningful_features.title')}</h4>
              </div>
              <p className="text-gray-300 leading-relaxed">
                {t('why.meaningful_features.description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};