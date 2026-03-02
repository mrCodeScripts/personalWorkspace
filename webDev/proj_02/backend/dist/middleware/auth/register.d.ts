import { Request, Response } from "express";
export interface FormValidationResult {
    username: {
        valid: boolean;
        reason: string;
    };
    phoneOrEmail: {
        valid: boolean;
        reason: string;
    };
    createPassword: {
        valid: boolean;
        reason: string;
        weakUsername?: boolean;
        suggestions?: string[];
    };
    confirmPassword: {
        valid: boolean;
        reason: string;
    };
    hasError: boolean;
}
export declare function RegisterNewAccount(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * ===========================
 * HTTP Status Codes Reference
 * ===========================
 *
 * 1xx - Informational
 * 100 Continue - Client should continue request
 * 101 Switching Protocols - Server is switching protocols as requested
 * 102 Processing - WebDAV; request is being processed
 * 103 Early Hints - Used to preload resources (HTTP/2)
 *
 * 2xx - Success
 * 200 OK - Standard success response
 * 201 Created - Resource successfully created
 * 202 Accepted - Request accepted but not yet processed
 * 203 Non-Authoritative Information - Metadata from another source
 * 204 No Content - Success but no content to return
 * 205 Reset Content - Reset form/UI in client
 * 206 Partial Content - For range requests (download/resume)
 * 207 Multi-Status - WebDAV; multiple responses
 * 208 Already Reported - WebDAV; already reported
 * 226 IM Used - Delta encoding used
 *
 * 3xx - Redirection
 * 300 Multiple Choices - Multiple options for resource
 * 301 Moved Permanently - Resource moved permanently
 * 302 Found - Resource temporarily moved
 * 303 See Other - Redirect with GET method
 * 304 Not Modified - Cached resource still valid
 * 305 Use Proxy - Resource must be accessed via proxy
 * 307 Temporary Redirect - Temporary redirect; keep method
 * 308 Permanent Redirect - Permanent redirect; keep method
 *
 * 4xx - Client Errors
 * 400 Bad Request - Request malformed or invalid
 * 401 Unauthorized - Missing or invalid auth
 * 402 Payment Required - Reserved for future use
 * 403 Forbidden - Server refuses to authorize
 * 404 Not Found - Resource does not exist
 * 405 Method Not Allowed - HTTP method not supported
 * 406 Not Acceptable - Server cannot return requested content type
 * 407 Proxy Authentication Required - Proxy authentication needed
 * 408 Request Timeout - Client took too long
 * 409 Conflict - Resource conflict, e.g., duplicate
 * 410 Gone - Resource permanently removed
 * 411 Length Required - Content-Length header missing
 * 412 Precondition Failed - Conditions in headers failed
 * 413 Payload Too Large - Request body too big
 * 414 URI Too Long - Request URL too long
 * 415 Unsupported Media Type - Invalid content type
 * 416 Range Not Satisfiable - Invalid range header
 * 417 Expectation Failed - `Expect` header failed
 * 418 I'm a teapot - RFC joke; not real
 * 421 Misdirected Request - Request sent to wrong server
 * 422 Unprocessable Entity - Validation error (WebDAV)
 * 423 Locked - Resource is locked (WebDAV)
 * 424 Failed Dependency - Dependent request failed
 * 425 Too Early - Retry later to avoid replay attacks
 * 426 Upgrade Required - Must upgrade protocol
 * 428 Precondition Required - Headers required
 * 429 Too Many Requests - Rate-limiting hit
 * 431 Request Header Fields Too Large - Headers too big
 * 451 Unavailable For Legal Reasons - Blocked for legal reasons
 *
 * 5xx - Server Errors
 * 500 Internal Server Error - Generic server error
 * 501 Not Implemented - Server does not support method
 * 502 Bad Gateway - Invalid response from upstream
 * 503 Service Unavailable - Server temporarily overloaded
 * 504 Gateway Timeout - Upstream server timeout
 * 505 HTTP Version Not Supported - Version not supported
 * 506 Variant Also Negotiates - Server error with content negotiation
 * 507 Insufficient Storage - WebDAV; not enough storage
 * 508 Loop Detected - WebDAV; infinite loop detected
 * 510 Not Extended - Further extensions required
 * 511 Network Authentication Required - Network-level auth needed
 */
//# sourceMappingURL=register.d.ts.map