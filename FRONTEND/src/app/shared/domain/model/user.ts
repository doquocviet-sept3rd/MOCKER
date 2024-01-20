import { Base } from './base';

export interface User extends Base {
  id: string;
  email: string;
  password: string;
}
