
export enum UserRole {
  Admin = "Admin",
  Player = "Player",
}
export enum UserGender {
  Female = "Female",
  Male = "Male",
  Other = "Other",
}
export interface UserDTO {
  id: string;
  username: string;
  email: string;
  birthDate: string;
  elo: number;
  gender: UserGender;
  role: UserRole;
}

export interface TokenDTO {
  token: string | null; // Nullable token
  user: UserDTO;
}
