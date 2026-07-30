/**
 * Room domain models.
 */

export type RoomType = 'Single' | 'Double' | 'Twin' | 'Family' | 'Suite';

export interface RoomAmenities {
  wifi: boolean;
  tv: boolean;
  radio: boolean;
  refreshments: boolean;
  safe: boolean;
  views: boolean;
}

export interface Room {
  roomName: string;
  type: RoomType;
  accessible: boolean;
  image?: string;
  description?: string;
  features?: string[];
  roomPrice: number;
}

export interface RoomResponse extends Room {
  roomid: number;
}

export type CreateRoomPayload = Room;
export type UpdateRoomPayload = Partial<Room>;
