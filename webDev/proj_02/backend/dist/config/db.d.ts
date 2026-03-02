import mysql from 'mysql2/promise';
export declare const connectDB: () => Promise<void>;
export declare const disconnectDB: () => Promise<void>;
export declare const db: mysql.Pool;
export declare const testConnection: () => Promise<void>;
//# sourceMappingURL=db.d.ts.map