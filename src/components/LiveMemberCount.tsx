import { Users, Activity } from "lucide-react";
import { useLiveMembers } from "@/hooks/useLiveMembers";

export const LiveMemberCount = () => {
  const { liveCount, totalMembers } = useLiveMembers();

  const formatCount = (count: number) => {
    return count.toLocaleString();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
      {/* Total Members */}
      <div className="flex items-center justify-center space-x-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 shadow-2xl shadow-purple-500/10">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div className="text-left">
            <div className="text-3xl font-bold text-white bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              {formatCount(totalMembers)}
            </div>
            <div className="text-sm text-gray-400 font-medium">Total Members</div>
          </div>
        </div>
      </div>

      {/* Live Members */}
      <div className="flex items-center justify-center space-x-4 bg-gradient-to-r from-green-900/30 to-emerald-900/30 backdrop-blur-sm rounded-2xl p-6 border border-green-500/20 shadow-2xl shadow-green-500/10">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div className="text-left">
            <div className="text-3xl font-bold text-white bg-gradient-to-r from-white via-green-200 to-emerald-200 bg-clip-text text-transparent">
              {formatCount(liveCount)}
            </div>
            <div className="text-sm text-gray-400 font-medium">Members Online Now</div>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-green-400">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
          <span className="text-sm font-semibold">Live</span>
        </div>
      </div>
    </div>
  );
};
