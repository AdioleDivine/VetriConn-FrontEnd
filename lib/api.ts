const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_URL_DEV;

// API Response types
export interface LoginResponse {
  success: boolean;
  message: string;
  data?: {
    user: {
      id: string;
      email: string;
      first_name?: string;
      last_name?: string;
      role?: string;
    };
    token: string;
  };
  error?: string;
}

export interface SignupResponse {
  success: boolean;
  message: string;
  data?: {
    user: {
      id: string;
      email: string;
      first_name: string;
      last_name: string;
      role: string;
    };
    token: string;
  };
  error?: string;
}

// Complete User Profile Interface (Backend)
export interface UserProfile {
  first_name: string;
  last_name: string;
  role: string;
  picture?: string;
  email: string;
  password: string;
  profession?: string;
  bio?: string;
  current_job?: string;
  experience?: string;
  location?: string;
  looking_for?: string[];
  socials?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  professional_summary?: string;
  work_experience?: Array<{
    company: string;
    position: string;
    start_date?: string;
    end_date?: string;
    description?: string;
  }>;
  education?: Array<{
    institution: string;
    degree: string;
    field_of_study: string;
    start_year?: string;
    end_year?: string;
    description?: string;
    location?: string;
  }>;
  certifications?: Array<{
    name: string;
    issuing_organization: string;
    issue_date: string;
    expiration_date?: string;
    credential_id?: string;
    credential_url?: string;
  }>;
  saved_jobs?: string[];
  attachments?: Array<{
    name: string;
    url: string;
    file_type?: string;
    file_size?: number;
    upload_date?: Date | string;
    description?: string;
  }>;
}

// Login API call
export async function loginUser(
  email: string,
  password: string
): Promise<LoginResponse> {
  // Additional check for undefined API_BASE_URL
  if (!API_BASE_URL) {
    throw new Error(
      "API_BASE_URL is not defined. Please check your environment variables."
    );
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    // Check if the response is JSON
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const textResponse = await response.text();
      throw new Error(
        `Server returned non-JSON response: ${response.status} ${response.statusText}. Response: ${textResponse}`
      );
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          data.error ||
          `HTTP ${response.status}: ${response.statusText}`
      );
    }

    return data;
  } catch (error) {
    console.error("Login error:", error);

    // Handle network errors specifically
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error(
        `Network error: Unable to connect to ${API_BASE_URL}. Please ensure the backend server is running.`
      );
    }

    throw error;
  }
}

// Signup API call
export async function signupUser(userData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: string;
  promotionalEmails?: boolean;
}): Promise<SignupResponse> {
  try {
    const requestBody: Record<string, string | boolean> = {
      first_name: userData.firstName,
      last_name: userData.lastName,
      email: userData.email,
      password: userData.password,
    };

    // Map frontend role values to backend format
    if (userData.role) {
      const roleMapping: Record<string, string> = {
        jobseeker: "job_seeker",
        employer: "employer",
      };
      requestBody.role = roleMapping[userData.role] || userData.role;
    }

    // Add promotional_emails if provided
    if (userData.promotionalEmails !== undefined) {
      requestBody.promotional_emails = userData.promotionalEmails;
    }

    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error || "Signup failed");
    }

    return data;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
}

// Store authentication token
export function storeAuthToken(token: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem("authToken", token);
  }
}

// Get authentication token
export function getAuthToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken");
  }
  return null;
}

// Remove authentication token
export function removeAuthToken() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("authToken");
  }
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return getAuthToken() !== null;
}

// Logout API call
export async function logoutUser(): Promise<{
  success: boolean;
  message: string;
}> {
  const token = getAuthToken();

  if (!token) {
    // If no token, consider it a successful logout
    return { success: true, message: "Already logged out" };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // Check if the response is JSON
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      // Even if the server doesn't return JSON, we'll remove the token locally
      removeAuthToken();
      return { success: true, message: "Logged out successfully" };
    }

    const data = await response.json();

    // Remove token regardless of server response
    removeAuthToken();

    if (!response.ok) {
      // Even if server returns error, we've removed the token locally
      return { success: true, message: "Logged out locally" };
    }

    return data;
  } catch (error) {
    console.error("Logout error:", error);

    // Remove token even if there's a network error
    removeAuthToken();

    return { success: true, message: "Logged out locally" };
  }
}

interface UserProfileResponse {
  success: boolean;
  message: string;
  data?: {
    user: {
      id: string;
      email: string;
      first_name?: string;
      last_name?: string;
      profession?: string;
      location?: string;
      experience?: string;
      current_job?: string;
      looking_for?: string[];
      bio?: string;
      picture?: string;
      socials?: {
        linkedin?: string;
        twitter?: string;
        github?: string;
      };
      professional_summary?: string;
      attachments?: Array<{
        name: string;
        url: string;
        file_type?: string;
        file_size?: number;
        upload_date?: string;
        description?: string;
      }>;
    };
  };
}

// Get user profile
export async function getUserProfile(): Promise<UserProfileResponse> {
  const token = getAuthToken();

  if (!token) {
    throw new Error("No authentication token found");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error || "Failed to fetch profile");
    }

    // Normalize attachments if they exist in the profile
    if (data.data && data.data.user && data.data.user.attachments) {
      data.data.user.attachments = normalizeAttachments(
        data.data.user.attachments
      );
    }

    return data;
  } catch (error) {
    console.error("Profile fetch error:", error);
    throw error;
  }
}

// Update user profile
export async function updateUserProfile(
  profileData: Record<string, unknown>
): Promise<Record<string, unknown>> {
  const token = getAuthToken();

  if (!token) {
    throw new Error("No authentication token found");
  }

  console.log(
    "Making profile update request to:",
    `${API_BASE_URL}/auth/profile`
  );
  console.log("Profile data:", profileData);

  try {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });

    console.log("Profile update response status:", response.status);

    const data = await response.json();
    console.log("Profile update response data:", data);

    if (!response.ok) {
      throw new Error(data.message || data.error || "Failed to update profile");
    }

    return data;
  } catch (error) {
    console.error("Profile update error:", error);

    // Handle network errors specifically
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error(
        `Network error: Unable to connect to server. Please ensure the backend server is running.`
      );
    }

    throw error;
  }
}

// Jobs API Response types - Direct array response from backend
export interface JobsResponse {
  _id: string;
  id: string;
  role: string;
  company_name: string;
  company_logo?: string;
  location?: string;
  salary: {
    symbol: string;
    number: number;
    currency: string;
  };
  salary_range?: {
    start_salary: {
      symbol: string;
      number?: number;
      currency: string;
    };
    end_salary: {
      symbol: string;
      number?: number;
      currency: string;
    };
  };
  tags?: string[];
  full_description?: string;
  responsibilities?: string[];
  qualifications?: string[];
  applicationLink?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

// Fetch jobs from database
export async function getJobs(options?: {
  page?: number;
  limit?: number;
  location?: string;
  search?: string;
}): Promise<JobsResponse[]> {
  const { page = 1, limit = 10, location, search } = options || {};

  // Build query parameters
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (location) {
    queryParams.append("location", location);
  }

  if (search) {
    queryParams.append("search", search);
  }

  console.log("Making jobs request to:", `${API_BASE_URL}/jobs?${queryParams}`);

  try {
    const response = await fetch(`${API_BASE_URL}/jobs?${queryParams}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Jobs response status:", response.status);

    // Check if the response is JSON
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const textResponse = await response.text();
      console.log("Non-JSON response:", textResponse);
      throw new Error(
        `Server returned non-JSON response: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log("Jobs response data:", data);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    // Backend returns array directly, not wrapped in success/data structure
    return data;
  } catch (error) {
    console.error("Jobs fetch error:", error);

    // Handle network errors specifically
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error(
        `Network error: Unable to connect to ${API_BASE_URL}. Please ensure the backend server is running.`
      );
    }

    throw error;
  }
}

// Fetch single job by ID
export async function getJobById(jobId: string): Promise<JobsResponse> {
  console.log("Making single job request to:", `${API_BASE_URL}/jobs/${jobId}`);

  try {
    const response = await fetch(`${API_BASE_URL}/jobs/${jobId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Single job response status:", response.status);

    // Check if the response is JSON
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const textResponse = await response.text();
      console.log("Non-JSON response:", textResponse);
      throw new Error(
        `Server returned non-JSON response: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log("Single job response data:", data);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    // Backend returns job object directly
    return data;
  } catch (error) {
    console.error("Single job fetch error:", error);

    // Handle network errors specifically
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error(
        `Network error: Unable to connect to ${API_BASE_URL}. Please ensure the backend server is running.`
      );
    }

    throw error;
  }
}

// Attachment types (matching backend schema)
export interface Attachment {
  _id?: string; // MongoDB ID when fetched from backend
  name: string;
  url: string;
  file_type?: string; // "pdf", "doc", "docx"
  file_size?: number; // in bytes
  upload_date?: string; // ISO date string
  description?: string;
  // For compatibility with existing frontend code
  id?: string; // Will map from _id
  type?: string; // Will map from file_type
  size?: number; // Will map from file_size
  uploadedAt?: string; // Will map from upload_date
  preview?: string; // Optional preview URL
}

export interface AttachmentUploadResponse {
  success: boolean;
  message: string;
  data?: {
    attachments: Attachment[];
  };
  error?: string;
}

export interface AttachmentsListResponse {
  success: boolean;
  message: string;
  data?: {
    attachments: Attachment[];
  };
  error?: string;
}

// Backend attachment type
interface BackendAttachment {
  _id?: string;
  id?: string;
  name: string;
  url: string;
  file_type?: string;
  file_size?: number;
  upload_date?: string;
  description?: string;
  type?: string;
  size?: number;
  uploadedAt?: string;
  preview?: string;
}

// Helper function to normalize attachment data from backend to frontend format
export function normalizeAttachment(
  backendAttachment: BackendAttachment
): Attachment {
  return {
    // Backend fields
    _id: backendAttachment._id,
    name: backendAttachment.name,
    url: backendAttachment.url,
    file_type: backendAttachment.file_type,
    file_size: backendAttachment.file_size,
    upload_date: backendAttachment.upload_date,
    description: backendAttachment.description,

    // Frontend compatibility fields
    id: backendAttachment._id || backendAttachment.id,
    type: backendAttachment.file_type || backendAttachment.type,
    size: backendAttachment.file_size || backendAttachment.size,
    uploadedAt: backendAttachment.upload_date || backendAttachment.uploadedAt,
    preview: backendAttachment.preview,
  };
}

// Helper function to normalize attachment array
export function normalizeAttachments(
  attachments: BackendAttachment[]
): Attachment[] {
  if (!Array.isArray(attachments)) return [];
  return attachments.map(normalizeAttachment);
}

// Upload single attachment
export async function uploadSingleAttachment(file: File): Promise<{
  success: boolean;
  message: string;
  data?: { attachment: Attachment };
}> {
  const token = getAuthToken();

  if (!token) {
    throw new Error("No authentication token found");
  }

  // Create FormData for single file upload
  const formData = new FormData();
  formData.append("file", file); // Backend expects field name 'file'

  console.log(
    "Making single attachment upload request to:",
    `${API_BASE_URL}/attachments/upload`
  );
  console.log("Uploading file:", {
    name: file.name,
    size: file.size,
    type: file.type,
  });

  try {
    const response = await fetch(`${API_BASE_URL}/attachments/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        // Don't set Content-Type for FormData, let browser set it with boundary
      },
      body: formData,
    });

    console.log("Attachment upload response status:", response.status);

    // Check if the response is JSON
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const textResponse = await response.text();
      console.log("Non-JSON response:", textResponse);
      throw new Error(
        `Server returned non-JSON response: ${response.status} ${response.statusText}. Response: ${textResponse}`
      );
    }

    const data = await response.json();
    console.log("Attachment upload response data:", data);

    if (!response.ok) {
      throw new Error(
        data.message || data.error || "Failed to upload attachment"
      );
    }

    // Normalize the response data
    if (data.data && data.data.attachment) {
      data.data.attachment = normalizeAttachment(data.data.attachment);
    }

    return data;
  } catch (error) {
    console.error("Attachment upload error:", error);

    // Handle network errors specifically
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error(
        `Network error: Unable to connect to ${API_BASE_URL}. Please ensure the backend server is running.`
      );
    }

    throw error;
  }
}

// Upload multiple attachments (uploads one by one)
export async function uploadAttachments(
  files: File[]
): Promise<AttachmentUploadResponse> {
  if (!files || files.length === 0) {
    throw new Error("No files provided for upload");
  }

  const uploadedAttachments: Attachment[] = [];
  const errors: string[] = [];

  console.log(`Starting upload of ${files.length} files...`);

  // Upload files one by one since backend only accepts one file per request
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    try {
      console.log(`Uploading file ${i + 1}/${files.length}: ${file.name}`);
      const result = await uploadSingleAttachment(file);

      if (result.data?.attachment) {
        uploadedAttachments.push(result.data.attachment);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : `Failed to upload ${file.name}`;
      errors.push(errorMessage);
      console.error(`Failed to upload ${file.name}:`, error);
    }
  }

  // Return results
  if (errors.length > 0 && uploadedAttachments.length === 0) {
    // All uploads failed
    throw new Error(`All uploads failed: ${errors.join(", ")}`);
  } else if (errors.length > 0) {
    // Some uploads failed
    console.warn(`Some uploads failed: ${errors.join(", ")}`);
  }

  return {
    success: true,
    message: `Successfully uploaded ${uploadedAttachments.length} of ${files.length} files`,
    data: {
      attachments: uploadedAttachments,
    },
  };
}

// Get user attachments
export async function getUserAttachments(): Promise<AttachmentsListResponse> {
  const token = getAuthToken();

  if (!token) {
    throw new Error("No authentication token found");
  }

  console.log("Making attachments request to:", `${API_BASE_URL}/attachments`);

  try {
    const response = await fetch(`${API_BASE_URL}/attachments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Attachments response status:", response.status);

    // Check if the response is JSON
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const textResponse = await response.text();
      console.log("Non-JSON response:", textResponse);
      throw new Error(
        `Server returned non-JSON response: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log("Attachments response data:", data);

    if (!response.ok) {
      throw new Error(
        data.message || data.error || "Failed to fetch attachments"
      );
    }

    // Normalize the response data
    if (data.data && data.data.attachments) {
      data.data.attachments = normalizeAttachments(data.data.attachments);
    }

    return data;
  } catch (error) {
    console.error("Attachments fetch error:", error);

    // Handle network errors specifically
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error(
        `Network error: Unable to connect to ${API_BASE_URL}. Please ensure the backend server is running.`
      );
    }

    throw error;
  }
}

// Update attachment metadata
export async function updateAttachment(
  attachmentId: string,
  updateData: { name?: string; [key: string]: unknown }
): Promise<{
  success: boolean;
  message: string;
  data?: { attachment: Attachment };
}> {
  const token = getAuthToken();

  if (!token) {
    throw new Error("No authentication token found");
  }

  console.log(
    "Making attachment update request to:",
    `${API_BASE_URL}/attachments/${attachmentId}`
  );
  console.log("Update data:", updateData);

  try {
    const response = await fetch(
      `${API_BASE_URL}/attachments/${attachmentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      }
    );

    console.log("Attachment update response status:", response.status);

    const data = await response.json();
    console.log("Attachment update response data:", data);

    if (!response.ok) {
      throw new Error(
        data.message || data.error || "Failed to update attachment"
      );
    }

    // Normalize the response data
    if (data.data && data.data.attachment) {
      data.data.attachment = normalizeAttachment(data.data.attachment);
    }

    return data;
  } catch (error) {
    console.error("Attachment update error:", error);

    // Handle network errors specifically
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error(
        `Network error: Unable to connect to ${API_BASE_URL}. Please ensure the backend server is running.`
      );
    }

    throw error;
  }
}

// Delete attachment
export async function deleteAttachment(
  attachmentId: string
): Promise<{ success: boolean; message: string }> {
  const token = getAuthToken();

  if (!token) {
    throw new Error("No authentication token found");
  }

  console.log(
    "Making attachment delete request to:",
    `${API_BASE_URL}/attachments/${attachmentId}`
  );

  try {
    const response = await fetch(
      `${API_BASE_URL}/attachments/${attachmentId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Attachment delete response status:", response.status);

    const data = await response.json();
    console.log("Attachment delete response data:", data);

    if (!response.ok) {
      throw new Error(
        data.message || data.error || "Failed to delete attachment"
      );
    }

    return data;
  } catch (error) {
    console.error("Attachment delete error:", error);

    // Handle network errors specifically
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error(
        `Network error: Unable to connect to ${API_BASE_URL}. Please ensure the backend server is running.`
      );
    }

    throw error;
  }
}

// Message/Contact form types
export interface ContactMessage {
  full_name: string;
  email: string;
  description: string;
}

export interface MessageResponse {
  success: boolean;
  description: string;
  data?: {
    id: string;
    full_name: string;
    email: string;
    description: string;
    createdAt: string;
  };
  error?: string;
}

// Send contact message
export async function sendContactMessage(
  messageData: ContactMessage
): Promise<MessageResponse> {
  console.log("Making message request to:", `${API_BASE_URL}/messages`);
  console.log("Message data:", messageData);

  try {
    const response = await fetch(`${API_BASE_URL}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageData),
    });

    console.log("Message response status:", response.status);

    // Check if the response is JSON
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const textResponse = await response.text();
      console.log("Non-JSON response:", textResponse);
      throw new Error(
        `Server returned non-JSON response: ${response.status} ${response.statusText}. Response: ${textResponse}`
      );
    }

    const data = await response.json();
    console.log("Message response data:", data);

    if (!response.ok) {
      throw new Error(data.message || data.error || "Failed to send message");
    }

    return data;
  } catch (error) {
    console.error("Message send error:", error);

    // Handle network errors specifically
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error(
        `Network error: Unable to connect to ${API_BASE_URL}. Please ensure the backend server is running.`
      );
    }

    throw error;
  }
}
