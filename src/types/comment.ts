export type ReactionType =
  | '+1'
  | '-1'
  | 'laugh'
  | 'hooray'
  | 'confused'
  | 'heart'
  | 'rocket'
  | 'eyes';

export interface Reaction {
  id: number;
  content: ReactionType;
  user: {
    login: string;
    avatar_url: string;
  };
}

export interface Comment {
  id: number;
  body: string;
  author: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  created_at: string;
  updated_at: string;
  html_url: string;
  reactions?: {
    total_count: number;
    '+1': number;
    '-1': number;
    laugh: number;
    hooray: number;
    confused: number;
    heart: number;
    rocket: number;
    eyes: number;
    url: string;
  };
}

export interface Message {
  type: 'success' | 'error';
  text: string;
}
