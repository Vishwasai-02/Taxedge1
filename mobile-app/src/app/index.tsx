import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuthStore } from "../store/authStore";

// Splash animation sequence:
// 0-800ms (particles & logo reveal) + 700-1300ms (sheen sweep) + 900-1600ms (text reveal)
// + 1000ms hold + 130ms blackout transition = ~2750ms total sequence
const SPLASH_TOTAL_DURATION_MS = 2750;

export default function Index() {
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    // Navigate strictly after the Splash Screen animation has completed and fully faded to black
    const timer = setTimeout(() => {
      if (isLoggedIn) {
        router.replace("/(main)/home" as any);
      } else {
        router.replace("/(auth)/login" as any);
      }
    }, SPLASH_TOTAL_DURATION_MS);

    return () => clearTimeout(timer);
  }, [isLoggedIn, router]);

  return null;
}
