import { UserDTO } from "./user.dto";

export interface LoginResponseDTO {
  access_token: string;
  refresh_token: string;
  user: UserDTO;
}
