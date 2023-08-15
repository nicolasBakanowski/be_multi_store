export interface TokenPayload {
  id: number;
  name: string;
  email: string;
  roleId?: number | null;
}
