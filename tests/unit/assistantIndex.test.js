import { describe, it, expect } from 'vitest';
import { queryAssistant } from '../../src/data/assistantIndex';

describe('assistantIndex', () => {
  it('should return frontend projects on query', () => {
    const result = queryAssistant('show frontend projects');
    expect(result.type).toBe('projects');
    expect(result.data.length).toBeGreaterThan(0);
  });

  it('should handle general text queries', () => {
    const result = queryAssistant('why react over vue');
    expect(result.type).toBe('text');
    expect(result.content).toContain('ecosystem');
  });

  it('should handle unknown queries gracefully', () => {
    const result = queryAssistant('what is the meaning of life');
    expect(result.type).toBe('text');
    expect(result.content).toContain('couldn\'t find specific data');
  });
});
