import {Match} from "./match";
import {UserDTO} from "../../core/models/user";

export enum TournamentCategory {
  Junior = "Junior",
  Senior = "Senior",
  Veteran = "Veteran",
}
export enum TournamentStatus {
  WaitingForPlayers = "WaitingForPlayers",
  InProgress = "InProgress",
  Closed = "Closed",
}
export interface TournamentIndexDTO {
  total: number;
  results: TournamentDTO[] | null;
}
export interface TournamentDTO {
  id: string;
  name: string;
  location: string | null; // Nullable location
  minPlayers: number;
  maxPlayers: number;
  eloMin?: number | null; // Nullable eloMin
  eloMax?: number | null; // Nullable eloMax
  categories?: (TournamentCategory | null)[] | null; // Nullable categories
  womenOnly: boolean;
  endOfRegistrationDate: string;
  count: number;
  canRegister: boolean;
  isRegistered: boolean;
  status: TournamentStatus;
  currentRound: number;
}
export interface TournamentDetailsDTO {
  id: string;
  name: string;
  location?: string | null;
  minPlayers: number;
  maxPlayers: number;
  eloMin?: number | null;
  eloMax?: number | null;
  categories?: (TournamentCategory | null)[] | null;
  womenOnly: boolean;
  endOfRegistrationDate: string;
  count: number;
  canRegister: boolean;
  isRegistered: boolean;
  status: TournamentStatus;
  currentRound: number;
  players?: (UserDTO | null)[] | null;
  canStart: boolean;
  canValidateRound: boolean;
  matches?: (Match | null)[] | null;
}
