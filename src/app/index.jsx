import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuthStore } from "../store/authStore";

export default function Index() {
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    // Add a tiny delay to let splash fade transition complete smoothly
    const timer = setTimeout(() => {
      if (isLoggedIn) {
        router.replace("/(main)/home");
      } else {
        router.replace("/(auth)/login");
      }
    }, 1500); // 1.5 seconds is aligned with the splash screen overlay duration

    return () => clearTimeout(timer);
  }, [isLoggedIn]);

  return null;
}
