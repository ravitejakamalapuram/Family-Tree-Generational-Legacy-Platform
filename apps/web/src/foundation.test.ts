import { describe, expect, it } from 'vitest';
import { ApiError } from './api-client';

describe('web foundation', () => {
  it('preserves API error status and correlation metadata', () => {
    const error = new ApiError(409, 'CONFLICT', 'request-1', 'The record changed.');
    expect(error.status).toBe(409);
    expect(error.code).toBe('CONFLICT');
    expect(error.requestId).toBe('request-1');
  });
});
