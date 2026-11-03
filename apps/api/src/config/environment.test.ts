import { describe, expect, it } from 'vitest';
import { parseEnvironment } from './environment.js';

describe('runtime environment', () => {
  it('provides safe local defaults', () => {
    expect(parseEnvironment({})).toMatchObject({
      NODE_ENV: 'development',
      PORT: 3000,
    });
  });

  it('rejects invalid ports', () => {
    expect(() => parseEnvironment({ PORT: '70000' })).toThrow();
  });
});
