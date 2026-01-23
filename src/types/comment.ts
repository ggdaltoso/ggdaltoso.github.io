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
}

export interface Message {
  type: 'success' | 'error';
  text: string;
}
