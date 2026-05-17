/**
 * Chat Service — Real-time messaging API calls
 * Maps directly to Laravel /api/v1/chat/* endpoints
 */

import apiClient from './axios';

const chatService = {
  /** GET /api/v1/chat/channels */
  getChannels: () =>
    apiClient.get('/chat/channels'),

  /** GET /api/v1/chat/channels/:channelId/messages?cursor=xyz */
  getMessages: (channelId, cursor = null) =>
    apiClient.get(`/chat/channels/${channelId}/messages`, {
      params: cursor ? { cursor } : {},
    }),

  /** POST /api/v1/chat/channels/:channelId/messages */
  sendMessage: (channelId, data) =>
    apiClient.post(`/chat/channels/${channelId}/messages`, data),
};

export default chatService;
