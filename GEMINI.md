# GEMINI.md - Notion MCP Server

This project is a Model Context Protocol (MCP) server that enables Gemini CLI and other MCP-compatible clients to interact with the Notion API. It provides tools for searching, reading, creating, and updating Notion pages and databases.

## Project Overview

- **Purpose:** Expose Notion API capabilities as MCP tools.
- **Main Technologies:**
  - [Model Context Protocol (MCP) SDK](https://github.com/modelcontextprotocol/sdk)
  - [@notionhq/client](https://github.com/makenotion/notion-sdk-js)
  - TypeScript
  - Zod (for schema validation)
  - Express (for HTTP transport)
  - Esbuild (for bundling)

### Architecture

- `src/shared/notionServer.ts`: The core server logic where the `McpServer` is initialized, Notion client is configured, and all tools/prompts are registered.
- `src/server.ts`: Entry point for the standard input/output (STDIO) transport.
- `src/http.ts`: Entry point for the HTTP transport using Express.
- `src/cli.ts`: A wrapper that chooses between `stdio` and `http` transports based on the `MCP_TRANSPORT` environment variable.

## Building and Running

### Prerequisites

- Node.js 20+
- A Notion Internal Integration Token (API Key)

### Commands

- **Install Dependencies:** `npm install`
- **Development (STDIO):** `npm run dev` (uses `tsx watch`)
- **Development (HTTP):** `npm run dev:http` (starts server on port 3030 by default)
- **Build Project:** `npm run build` (compiles TypeScript and bundles into `dist/extension.cjs`)
- **Run Production:** `npm start`
- **Linting:** `npm run lint` (currently a placeholder)

### Authentication

The server looks for a Notion API key in the following environment variables (in order of priority):
1. `NOTION_API_KEY`
2. `GEMINI_NOTION_API_KEY`
3. `NOTION_TOKEN`
4. `NOTION_SECRET`

**Windows Note:** On Windows, the server specifically checks the User-scoped environment variables in the registry (`HKCU\Environment`).

## Development Conventions

- **Tool Naming:** All tools are prefixed with `notion_` (e.g., `notion_search`, `notion_create_page`).
- **Input Validation:** Use `zod` schemas for all tool input definitions.
- **Error Handling:** Errors in tool execution should be caught and returned gracefully via the MCP protocol.
- **Transport Flexibility:** Core logic is decoupled from transport in `src/shared/notionServer.ts`, allowing for easy addition of new transport methods.
- **Bundling:** The project uses `esbuild` to create a single-file CJS bundle (`dist/extension.cjs`) for easier distribution as a Gemini extension.

## Key Files

- `package.json`: Project metadata, scripts, and dependencies.
- `tsconfig.json`: TypeScript configuration.
- `gemini-extension.json`: Metadata for Gemini CLI extension discovery.
- `src/shared/notionServer.ts`: The main implementation of Notion tools.
- `dist/extension.cjs`: The bundled output used for extension installation.
