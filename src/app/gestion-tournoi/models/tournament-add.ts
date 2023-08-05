import {TournamentCategory} from "./tournament";

interface TournamentAddDTO {
  name: string;
  location?: string | null; // Nullable location
  minPlayers: number;
  maxPlayers: number;
  eloMin?: number | null; // Nullable eloMin
  eloMax?: number | null; // Nullable eloMax
  categories: TournamentCategory[];
  womenOnly: boolean;
  endOfRegistrationDate: string;
}
