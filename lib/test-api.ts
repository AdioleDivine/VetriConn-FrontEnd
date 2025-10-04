// Simple API test utility
export async function testConnection() {
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_API_URL_DEV ||
    "http://localhost:5000/api/v1";

  console.log("Testing connection to:", API_BASE_URL);

  try {
    // Test basic connectivity
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "test@test.com",
        password: "test",
      }),
    });

    console.log("Test response status:", response.status);
    console.log(
      "Test response headers:",
      Object.fromEntries(response.headers.entries())
    );

    const data = await response.json();
    console.log("Test response data:", data);

    return { success: true, status: response.status, data };
  } catch (error) {
    console.error("Connection test failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Call this in browser console: testConnection()
if (typeof window !== "undefined") {
  (window as any).testConnection = testConnection;
}
