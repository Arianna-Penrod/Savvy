import { useState } from "react";

import AppLayout from "@/components/AppLayout";
import UserProfileManager from "@/components/UserProfileManager";
import UserRecommendations from "@/components/UserRecommendations";
import { users } from "@/data/demoUser";

export default function ProfilePage() {
  const [currentUser, setCurrentUser] = useState(users[0]);

  return (
    <AppLayout
      title="My Profile"
      subtitle="Update your shopping preferences, search radius, and personalized savings recommendations."
    >
      <UserProfileManager
        currentUser={currentUser}
        onUpdate={setCurrentUser}
      />

      <UserRecommendations />
    </AppLayout>
  );
}