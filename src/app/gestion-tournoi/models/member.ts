import {UserGender} from "../../shared/models/user";

export interface Member {
  username: string
  email: string
  birthDate: string
  elo: number
  gender: UserGender;
}

export interface MemberForm {
  username: string;
  email: string;
  birthDate: string;
  elo?: number | null;
  gender: UserGender;
}

export interface ChangePasswordDTO {
  oldPassword? :string |null,
  password?	: string |null,

}
