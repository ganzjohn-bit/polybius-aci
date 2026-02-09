import { PROMPTS } from '@/lib/constants';

export interface ContentBlock {
  type: string;
  text?: string;
  name?: string;
  input?: Record<string, unknown>;
}

export interface ApiResponse {
  content: ContentBlock[];
  stop_reason: string;
}

export function findToolUseBlock(data: ApiResponse, toolName: string): ContentBlock | undefined {
  return data.content.find(
    (item) => item.type === PROMPTS.TOOL_USE && item.name === toolName
  );
}
