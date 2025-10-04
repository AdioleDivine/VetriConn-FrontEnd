// Debug utility to test API connection
console.log("=== API Debug ===");
console.log(
  "API_BASE_URL:",
  process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_URL_DEV
);
console.log("Environment variables:", {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_API_URL_DEV: process.env.NEXT_PUBLIC_API_URL_DEV,
});

// Test function to verify API connection
export async function testApiConnection() {
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_URL_DEV;

  console.log("Testing API connection to:", `${API_BASE_URL}/login`);

  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "test@example.com",
        password: "testpassword",
      }),
    });

    console.log("Response status:", response.status);
    console.log(
      "Response headers:",
      Object.fromEntries(response.headers.entries())
    );

    const data = await response.text();
    console.log("Response body:", data);

    return { success: true, status: response.status, data };
  } catch (error) {
    console.error("API connection error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
