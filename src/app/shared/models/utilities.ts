export interface Category {
  name: string,
}

export interface Column {
  field: string;
  header: string;
}

export interface RandomSet {
  totalPlayed: number;
  victoryCount: number;
  defeatCount: number;
  drawCount: number;
}
