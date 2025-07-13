
import { Users } from "lucide-react";
import { useSubscriberCount } from "@/hooks/useSubscriberCount";
import { useUserSubscription } from "@/hooks/useUserSubscription";

export const MemberCounter = () => {
  const { subscriberCount, loading: countLoading } = useSubscriberCount();
  const { isSubscribed, loading: subLoading } = useUserSubscription();

  const formatMemberCount = (count: number) => {
    return count.toLocaleString();
  };

  // Only show to subscribed users
  if (subLoading || !isSubscribed) {
    return null;
  }

  return (
    <div className="flex items-center justify-center space-x-4 bg-gradient-to-r from-purple-900/30 to-red-900/30 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 shadow-2xl shadow-purple-500/10">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-red-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
          <Users className="w-6 h-6 text-white" />
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-white bg-gradient-to-r from-white via-purple-200 to-red-200 bg-clip-text text-transparent">
            {countLoading ? "..." : formatMemberCount(subscriberCount)}
          </div>
          <div className="text-sm text-gray-400 font-medium">Active Subscribers</div>
        </div>
      </div>
      <div className="flex items-center space-x-2 text-green-400">
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
        <span className="text-sm font-semibold">Live</span>
      </div>
    </div>
  );
};
