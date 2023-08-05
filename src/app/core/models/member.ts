import {UserGender} from "./user";

export interface Member {
  username: string
  email: string
  birthDate: string
  elo: number
  gender: string
}
export interface MemberForm {
  username: string;
  email: string;
  birthDate: string;
  elo?: number | null;
  gender: UserGender;
}
