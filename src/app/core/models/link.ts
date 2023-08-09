export interface Link {
  name : string;
  url : string;
  img : string;
  children? : Link[];
  isVisible? : boolean
}
