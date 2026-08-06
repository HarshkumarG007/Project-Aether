import { describe, it, expect } from 'vitest';
import { parseCommand } from '../../src/components/terminal/commandParser';

describe('commandParser', () => {
  it('should return help commands', () => {
    const result = parseCommand('help');
    expect(result.output[0].text).toContain('AVAILABLE COMMANDS');
  });

  it('should return unknown for invalid command', () => {
    const result = parseCommand('foobar');
    expect(result.output[0].text).toContain('Command not found');
  });

  it('should trigger resume download action on sudo hire-me', () => {
    const result = parseCommand('sudo hire-me');
    expect(result.action).toBe('DOWNLOAD_RESUME');
  });

  it('should trigger clear action on clear', () => {
    const result = parseCommand('clear');
    expect(result.action).toBe('CLEAR');
  });

  it('should spawn coffee easter egg on coffee', () => {
    const result = parseCommand('coffee');
    expect(result.output[0].text).toContain('coffee mesh');
  });
});
