const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_URL_DEV || 'http://localhost:5000/api/v1';

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

// Login API call
export async function loginUser(email: string, password: string): Promise<LoginResponse> {
  console.log('Environment variables:', {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_API_URL_DEV: process.env.NEXT_PUBLIC_API_URL_DEV
  });
  console.log('API_BASE_URL:', API_BASE_URL);
  console.log('Making login request to:', `${API_BASE_URL}/auth/login`);
  
  // Additional check for undefined API_BASE_URL
  if (!API_BASE_URL) {
    throw new Error('API_BASE_URL is not defined. Please check your environment variables.');
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    console.log('Login response status:', response.status);
    console.log('Login response headers:', Object.fromEntries(response.headers.entries()));

    // Check if the response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const textResponse = await response.text();
      console.log('Non-JSON response:', textResponse);
      throw new Error(`Server returned non-JSON response: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Login response data:', data);

    if (!response.ok) {
      throw new Error(data.message || data.error || `HTTP ${response.status}: ${response.statusText}`);
    }

    return data;
  } catch (error) {
    console.error('Login error:', error);
    
    // Handle network errors specifically
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error(`Network error: Unable to connect to ${API_BASE_URL}. Please ensure the backend server is running.`);
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
}): Promise<SignupResponse> {
  console.log('Making signup request to:', `${API_BASE_URL}/auth/register`);
  
  try {
    const requestBody: any = {
      first_name: userData.firstName,
      last_name: userData.lastName,
      email: userData.email,
      password: userData.password,
    };

    // Map frontend role values to backend format
    if (userData.role) {
      const roleMapping: Record<string, string> = {
        'jobseeker': 'job_seeker',
        'employer': 'employer'
      };
      requestBody.role = roleMapping[userData.role] || userData.role;
    }

    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error || 'Signup failed');
    }

    return data;
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
}

// Store authentication token
export function storeAuthToken(token: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('authToken', token);
  }
}

// Get authentication token
export function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null;
}

// Remove authentication token
export function removeAuthToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken');
  }
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return getAuthToken() !== null;
}

// Get user profile
export async function getUserProfile(): Promise<any> {
  const token = getAuthToken();
  
  if (!token) {
    throw new Error('No authentication token found');
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error || 'Failed to fetch profile');
    }

    return data;
  } catch (error) {
    console.error('Profile fetch error:', error);
    throw error;
  }
}