import {Match} from "./match";
import {UserDTO} from "../../shared/models/user";

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
  results: TournamentDTO[];
}
export interface TournamentDTO {
  id: string;
  name: string;
  location: string; // Nullable location
  minPlayers: number;
  maxPlayers: number;
  eloMin?: number; // Nullable eloMin
  eloMax?: number; // Nullable eloMax
  categories?: TournamentCategory[]; // Nullable categories
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
  location?: string;
  minPlayers: number;
  maxPlayers: number;
  eloMin?: number;
  eloMax?: number;
  categories?: TournamentCategory[];
  womenOnly: boolean;
  endOfRegistrationDate: string;
  count: number;
  canRegister: boolean;
  isRegistered: boolean;
  status: TournamentStatus;
  currentRound: number;
  players?: UserDTO[] ;
  canStart: boolean;
  canValidateRound: boolean;
  matches?: Match[];
}
