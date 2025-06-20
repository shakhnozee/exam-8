export interface State {
  length: number;
  includeUpper: boolean;
  includeLower: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  mode: 'easy-say' | 'easy-read' | 'all';
  password: string;
}