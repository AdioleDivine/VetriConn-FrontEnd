import useSWR from "swr";
import { getUserProfile } from "@/lib/api";

export function useUserProfile() {
  const { data, error, mutate, isLoading } = useSWR(
    "/auth/profile",
    getUserProfile
  );

  // Map backend user data to frontend format with proper fallbacks
  const userProfile = data?.data?.user
    ? {
        name:
          `${data.data.user.first_name || ""} ${
            data.data.user.last_name || ""
          }`.trim() || "User",
        title: data.data.user.profession || "",
        location: data.data.user.location || "",
        experience: data.data.user.experience || "",
        current: data.data.user.current_job || "",
        lookingFor: data.data.user.looking_for || [],
        bio: data.data.user.bio || null, // null if no bio exists
        avatar:
          data.data.user.picture &&
          data.data.user.picture.trim() &&
          data.data.user.picture.trim() !== "/images/richmond.svg"
            ? data.data.user.picture.trim()
            : "",
        socials: {
          linkedin: data.data.user.socials?.linkedin || "",
          twitter: data.data.user.socials?.twitter || "",
          github: data.data.user.socials?.github || "",
        },
        professionalSummary: data.data.user.professional_summary || "",
      }
    : null;

  return {
    userProfile,
    isLoading,
    isError: !!error,
    mutateProfile: mutate,
  };
}
