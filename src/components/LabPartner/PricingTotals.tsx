
import { labTests } from "@/data/labTests";

export const PricingTotals = () => {
  const totalPricing = {
    men: labTests.filter(test => !test.womenOnly).reduce((sum, test) => sum + parseInt(test.price.replace('$', '')), 0),
    women: labTests.reduce((sum, test) => sum + parseInt(test.price.replace('$', '')), 0)
  };

  return (
    <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
      <h3 className="text-xl font-semibold text-slate-800 mb-4">Total Package Pricing</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="text-center p-4 bg-white rounded-lg border border-slate-200">
          <h4 className="font-semibold text-slate-700 mb-2">Gentlemen's Package</h4>
          <div className="text-3xl font-bold text-blue-600">${totalPricing.men}</div>
          <p className="text-sm text-slate-500 mt-1">6 Essential Tests</p>
        </div>
        <div className="text-center p-4 bg-white rounded-lg border border-slate-200">
          <h4 className="font-semibold text-slate-700 mb-2">Ladies' Package</h4>
          <div className="text-3xl font-bold text-purple-600">${totalPricing.women}</div>
          <p className="text-sm text-slate-500 mt-1">7 Comprehensive Tests</p>
        </div>
      </div>
    </div>
  );
};
