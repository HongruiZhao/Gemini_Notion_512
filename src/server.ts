import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { buildNotionServer } from './shared/notionServer.js';

const server = buildNotionServer();

async function main() {
  const transport = new StdioServerTransport();
  console.error('Connecting Notion MCP server to stdio...');
  await server.connect(transport);
  console.error('Notion MCP server connected.');
}

main().catch((err) => {
  console.error('Failed to start Notion MCP server:', err);
  process.exit(1);
});
