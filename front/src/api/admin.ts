// src/api/admin.ts
import apiClient from './client';
import { User, Remedy, Source, Review, Comment } from '../types';

export interface CreateRemedyData {
  name: string;
  description: string;
  categories: string[];
  symptoms: {
    name: string;
    relevanceScore: number;
  }[];
  warnings?: string[];
  sourceIds: string[];
  verified?: boolean;
}

export interface CreateSourceData {
  title: string;
  url: string;
  credibilityScore: number;
  publicationDate?: Date;
  authors?: string[];
  publisher?: string;
  isPeerReviewed?: boolean;
  remedyIds?: string[];
}



export const getAllUsers = async (): Promise<User[]> => {
  const response = await apiClient.get('/admin/users');
  return response.data;
};

export const updateUserRole = async (userId: string, role: 'user' | 'moderator' | 'admin'): Promise<{ message: string, user: User }> => {
  const response = await apiClient.put('/admin/users/role', { userId, role });
  return response.data;
};

export const createRemedy = async (data: CreateRemedyData): Promise<Remedy> => {
  const response = await apiClient.post('/admin/remedies', data);
  return response.data;
};

export const getUniqueSymptoms = async (): Promise<string[]> => {
  const response = await apiClient.get('/admin/symptoms');
  return response.data;
};

export const getAllSources = async (): Promise<Source[]> => {
  const response = await apiClient.get('/admin/sources');
  return response.data;
};

export const createSource = async (data: CreateSourceData): Promise<Source> => {
  const response = await apiClient.post('/admin/sources', data);
  return response.data;
};

export const getAllReviews = async (): Promise<Review[]> => {
  const response = await apiClient.get('/admin/reviews');
  return response.data;
};

export const updateReviewStatus = async (
  reviewId: string,
  status: 'approved' | 'flagged'
): Promise<{ message: string; review: Review }> => {
  const response = await apiClient.put('/admin/reviews/status', {
    reviewId,
    status,
  });
  return response.data;
};

export const getAllComments = async (): Promise<Comment[]> => {
  const response = await apiClient.get('/admin/comments');
  return response.data;
};


export const updateCommentStatus = async (commentId: string, status: 'approved' | 'flagged'): Promise<{ message: string, comment: Comment }> => {
  const response = await apiClient.put('/admin/comments/status', { commentId, status });
  return response.data;
};