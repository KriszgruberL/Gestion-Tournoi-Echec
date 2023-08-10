import {TournamentCategory} from "./tournament";

export interface TournamentAddDTO {
  name: string;
  location?: string ; // Nullable location
  minPlayers: number;
  maxPlayers: number;
  eloMin?: number |null; // Nullable eloMin
  eloMax?:  |null; // Nullable eloMax
  categories: TournamentCategory[];
  womenOnly: boolean;
  endOfRegistrationDate: string;
}
