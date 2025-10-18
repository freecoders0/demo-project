export interface Contact {
  type: "whatsapp" | "messenger";
  label?: string;
  value: string;
}

export interface User {
  id: string;
  name: string;
  role: string;
  avatar: string;
  contacts: Contact[];
}
