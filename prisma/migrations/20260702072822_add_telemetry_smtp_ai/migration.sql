-- CreateTable
CREATE TABLE "VisitorLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "path" TEXT NOT NULL DEFAULT '/',
    "userAgent" TEXT,
    "ip" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "ErrorLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "message" TEXT NOT NULL,
    "stack" TEXT,
    "path" TEXT,
    "severity" TEXT NOT NULL DEFAULT 'ERROR',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "SystemConfig" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'global',
    "smtpHost" TEXT,
    "smtpPort" INTEGER NOT NULL DEFAULT 587,
    "smtpUser" TEXT,
    "smtpPassEncrypted" TEXT,
    "smtpFrom" TEXT,
    "smtpSecure" BOOLEAN NOT NULL DEFAULT false,
    "aiPrimaryProvider" TEXT NOT NULL DEFAULT 'Google Gemini',
    "aiFallbackOrder" TEXT NOT NULL DEFAULT 'Google Gemini,Nvidia NIM,OpenRouter,OpenAI',
    "geminiKeyEncrypted" TEXT,
    "openaiKeyEncrypted" TEXT,
    "nvidiaKeyEncrypted" TEXT,
    "openrouterKeyEncrypted" TEXT,
    "updatedAt" DATETIME NOT NULL
);
