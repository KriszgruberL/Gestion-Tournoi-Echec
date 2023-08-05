export enum MatchResult {
  NotPlayed = "NotPlayed",
  WhiteWin = "WhiteWin",
  BlackWin = "BlackWin",
  Draw = "Draw",
}

export interface MatchResultDTO {
  result: MatchResult;
}

export interface Match {
  id: number;
  tournamentId: string;
  blackName?: string | null;
  blackId?: string | null;
  whiteName?: string | null;
  whiteId?: string | null;
  result: MatchResult;
  round: number;
}
