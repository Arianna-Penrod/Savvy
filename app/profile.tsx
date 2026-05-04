import { useState } from "react";

import AppLayout from "@/components/AppLayout";
import BestStoreCard from "@/components/bestStoreCard";
import UserProfileManager from "@/components/UserProfileManager";
import UserRecommendations from "@/components/UserRecommendations";
import { users } from "@/data/demoUser";
import { findBestStore } from "@/utils/bestStore";

export default function ProfilePage() {
  const [currentUser, setCurrentUser] = useState(users[0]);

  const bestStore = findBestStore(currentUser);

  return (
    <AppLayout
      title="My Profile"
      subtitle="Update your shopping preferences and find the best store for your list."
    >
      <BestStoreCard bestStore={bestStore} />

      <UserProfileManager
        currentUser={currentUser}
        onUpdate={setCurrentUser}
      />

      <UserRecommendations />
    </AppLayout>
  );
}
