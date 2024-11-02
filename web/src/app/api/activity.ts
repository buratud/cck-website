import { Activity } from "./domain";
import api from "./config";

export const getActivities = async (): Promise<Activity[]> => {
  const response = await api.get<Activity[]>('/api/activities');
  return response.data;
};

export const getActivity = async (activityId: string): Promise<Activity> => {
  const response = await api.get<Activity>(`/api/activity/${activityId}`);
  return response.data;
}

export const createActivity = async (activity: Activity) => {
  const response = await api.post('/api/activity', activity);
  return response.data;
};

export const updateActivity = async (activity: Activity) => {
  const response = await api.put(`/api/activity/${activity._id}`, activity);
  return response.data;
};

export const deleteActivity = async (activityId: Activity) => {
  const response = await api.delete(`/api/activity/${activityId}`);
  return response.data;
};