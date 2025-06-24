
import { useState, useEffect } from 'react';

export const useMemberCount = () => {
  const [memberCount, setMemberCount] = useState(0); // Starting with 0 active members

  useEffect(() => {
    // Simulate real-time active member changes
    const interval = setInterval(() => {
      setMemberCount(prev => {
        // Random chance of member activity change (members joining/leaving)
        if (Math.random() < 0.15) {
          const change = Math.floor(Math.random() * 3) - 1; // Can be -1, 0, 1, or 2
          const newCount = Math.max(0, prev + change); // Ensure count doesn't go below 0
          return newCount;
        }
        return prev;
      });
    }, 5000); // Check every 5 seconds for more realistic activity

    return () => clearInterval(interval);
  }, []);

  return memberCount;
};
