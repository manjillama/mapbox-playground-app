import axios, {AxiosResponse} from 'axios';
import {YATRIHUB_API_SERVER} from '@env';

const instance = axios.create({
  baseURL: YATRIHUB_API_SERVER,
});

const JWT_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYTg1YWFlZWUzY2QzMDAxYzJkZjE1ZCIsImlhdCI6MTY0NTM3MjU3MiwiZXhwIjoxNjUzMTQ4NTcyfQ.k46ePIDlfI3dH0Oam_Pn00qv5wycYrbL0A995VrQ-RQ';

export function get(url: string, params = {}): Promise<AxiosResponse> {
  return instance.get(url, {
    params,
    headers: {
      Authorization: `Bearer ${JWT_TOKEN}`,
    },
  });
}

export function post(url: string, body: any): Promise<AxiosResponse> {
  return instance.post(url, body, {
    headers: {
      Authorization: `Bearer ${JWT_TOKEN}`,
    },
  });
}

export function patch(url: string, body: any): Promise<AxiosResponse> {
  return instance.patch(url, body, {
    headers: {
      Authorization: `Bearer ${JWT_TOKEN}`,
    },
  });
}

export function put(url: string, body: any): Promise<AxiosResponse> {
  return instance.put(url, body, {
    headers: {
      Authorization: `Bearer ${JWT_TOKEN}`,
    },
  });
}

export function del(url: string): Promise<AxiosResponse> {
  return instance.delete(url, {
    headers: {
      Authorization: `Bearer ${JWT_TOKEN}`,
    },
  });
}

export default {get, post, patch, del};
