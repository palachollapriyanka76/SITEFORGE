// Standard API response wrapper
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: PaginationMeta;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface PaginationMeta {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

export interface PaginationInput {
  page?: number;
  perPage?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

// Socket.io event types
export interface SocketEvents {
  // Client -> Server
  "website:join": (websiteId: string) => void;
  "website:leave": (websiteId: string) => void;
  "page:update": (data: { pageId: string; components: unknown[] }) => void;

  // Server -> Client
  "website:updated": (data: { websiteId: string; updatedBy: string }) => void;
  "page:updated": (data: { pageId: string; components: unknown[] }) => void;
  "ai:job:status": (data: { jobId: string; status: string; result?: unknown }) => void;
  "ai:job:progress": (data: { jobId: string; progress: number; message: string }) => void;
}
