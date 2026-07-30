/**
 * Room API Client.
 *
 * @see https://restful-booker.herokuapp.com/apidoc/#api-Room
 */

import { AxiosInstance, AxiosResponse } from 'axios';
import { createHttpClient } from './base.client';
import { CreateRoomPayload, RoomResponse, UpdateRoomPayload } from '../../models/room.model';
import { env } from '../../config/env';
import { ApiEndpoints } from '../../config/urls';

export class RoomClient {
  private readonly http: AxiosInstance;

  constructor(token?: string) {
    this.http = createHttpClient({
      baseURL: env.apiUrl,
      token,
    });
  }

  /** GET /room — returns all rooms */
  async getAll(): Promise<AxiosResponse<{ rooms: RoomResponse[] }>> {
    return this.http.get(ApiEndpoints.room);
  }

  /** GET /room/:id */
  async getById(id: number): Promise<AxiosResponse<RoomResponse>> {
    return this.http.get(ApiEndpoints.roomById(id));
  }

  /** POST /room — requires auth */
  async create(payload: CreateRoomPayload): Promise<AxiosResponse<RoomResponse>> {
    return this.http.post(ApiEndpoints.room, payload);
  }

  /** PUT /room/:id — requires auth */
  async update(id: number, payload: UpdateRoomPayload): Promise<AxiosResponse<RoomResponse>> {
    return this.http.put(ApiEndpoints.roomById(id), payload);
  }

  /** DELETE /room/:id — requires auth */
  async delete(id: number): Promise<AxiosResponse<void>> {
    return this.http.delete(ApiEndpoints.roomById(id));
  }
}
