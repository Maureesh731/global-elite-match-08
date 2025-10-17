import { Globe } from "lucide-react";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";

export const VisitorCounter = () => {
  const { visitorCount, loading } = useVisitorTracking();

  const formatVisitorCount = (count: number) => {
    return count.toLocaleString();
  };

  return (
    <div className="flex items-center justify-center space-x-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 shadow-2xl shadow-purple-500/10">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
          <Globe className="w-6 h-6 text-white" />
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-white bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
            {loading ? "..." : formatVisitorCount(visitorCount)}
          </div>
          <div className="text-sm text-gray-400 font-medium">Visitors from around the world</div>
        </div>
      </div>
      <div className="flex items-center space-x-2 text-green-400">
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
        <span className="text-sm font-semibold">Live</span>
      </div>
    </div>
  );
};
