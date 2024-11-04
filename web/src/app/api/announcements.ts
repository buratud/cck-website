import { Announcement } from './domain';
import api from './config';

export const getAnnouncements = async (): Promise<Announcement[]> => {
  const response = await api.get<Announcement[]>('/api/announcements');
  return response.data;
};

export const getAnnouncement = async (announcementId: string): Promise<Announcement> => {
  const response = await api.get<Announcement>(`/api/announcement/${announcementId}`);
  return response.data;
}

export const createAnnouncement = async (announcement: Announcement) => {
  const response = await api.post('/api/announcement', announcement);
  return response.data;
};

export const updateAnnouncement = async (announcement: Announcement) => {
  const response = await api.put(`/api/announcement/${announcement._id}`, announcement);
  return response.data;
};

export const deleteAnnouncement = async (announcementId: Announcement) => {
  const response = await api.delete(`/api/announcement/${announcementId}`);
  return response.data;
};