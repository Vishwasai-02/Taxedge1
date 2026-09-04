import type { DirectorInfo } from '../types/director.types';

export const directorSchema = {
  validateDirector(director: Partial<DirectorInfo>): { valid: boolean; errors: Record<string, string> } {
    const errors: Record<string, string> = {};
    if (!director.name?.trim()) errors.name = 'Director name is required';
    if (!director.pan?.trim()) errors.pan = 'PAN is required';
    return { valid: Object.keys(errors).length === 0, errors };
  },
};
