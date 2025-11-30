import { describe, expect, it } from 'vitest';
import {
  cosineSimilarity,
  dotProduct,
  normalizeVector,
  vectorMagnitude,
} from '../vectors';

describe('Vector Utils', () => {
  describe('cosineSimilarity', () => {
    it('should calculate similarity for identical vectors (1.0)', () => {
      const vecA = [1, 2, 3];
      const vecB = [1, 2, 3];
      expect(cosineSimilarity(vecA, vecB)).toBeCloseTo(1.0);
    });

    it('should calculate similarity for opposite vectors (-1.0)', () => {
      const vecA = [1, 1];
      const vecB = [-1, -1];
      expect(cosineSimilarity(vecA, vecB)).toBeCloseTo(-1.0);
    });

    it('should calculate similarity for orthogonal vectors (0.0)', () => {
      const vecA = [1, 0];
      const vecB = [0, 1];
      expect(cosineSimilarity(vecA, vecB)).toBeCloseTo(0.0);
    });

    it('should handle known values correctly', () => {
      // vectors [3, 4] and [5, 2]
      // dot product = 15 + 8 = 23
      // |A| = 5, |B| = sqrt(29) ≈ 5.385
      // sim = 23 / (5 * 5.385) ≈ 0.854
      const vecA = [3, 4];
      const vecB = [5, 2];
      expect(cosineSimilarity(vecA, vecB)).toBeCloseTo(0.854, 3);
    });

    it('should return 0 for zero magnitude vectors', () => {
      expect(cosineSimilarity([0, 0], [1, 1])).toBe(0);
      expect(cosineSimilarity([1, 1], [0, 0])).toBe(0);
    });

    it('should throw error for different dimensions', () => {
      expect(() => cosineSimilarity([1, 2], [1, 2, 3])).toThrowError(
        /dimensions/,
      );
    });

    it('should return 0 for empty vectors', () => {
      expect(cosineSimilarity([], [])).toBe(0);
    });
  });

  describe('vectorMagnitude', () => {
    it('should calculate magnitude correctly', () => {
      expect(vectorMagnitude([3, 4])).toBe(5); // 3-4-5 triangle
      expect(vectorMagnitude([1, 0, 0])).toBe(1);
      expect(vectorMagnitude([0, 0, 0])).toBe(0);
    });
  });

  describe('normalizeVector', () => {
    it('should normalize a vector to unit length', () => {
      const vec = [3, 4];
      const normalized = normalizeVector(vec);
      expect(normalized[0]).toBeCloseTo(0.6); // 3/5
      expect(normalized[1]).toBeCloseTo(0.8); // 4/5
      expect(vectorMagnitude(normalized)).toBeCloseTo(1.0);
    });

    it('should handle zero vector', () => {
      const vec = [0, 0, 0];
      const normalized = normalizeVector(vec);
      expect(normalized).toEqual([0, 0, 0]);
    });
  });

  describe('dotProduct', () => {
    it('should calculate dot product correctly', () => {
      expect(dotProduct([1, 2], [3, 4])).toBe(11); // 1*3 + 2*4 = 3 + 8 = 11
    });

    it('should throw error for different dimensions', () => {
      expect(() => dotProduct([1], [1, 2])).toThrowError(/dimensions/);
    });
  });
});
