
import { useState, useEffect } from 'react';

export const useMemberCount = () => {
  const [memberCount, setMemberCount] = useState(12847); // Starting count

  useEffect(() => {
    // Simulate real-time member growth
    const interval = setInterval(() => {
      setMemberCount(prev => {
        // Random chance of member increase (about every 30-60 seconds)
        if (Math.random() < 0.1) {
          return prev + Math.floor(Math.random() * 3) + 1; // Add 1-3 members
        }
        return prev;
      });
    }, 3000); // Check every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return memberCount;
};
