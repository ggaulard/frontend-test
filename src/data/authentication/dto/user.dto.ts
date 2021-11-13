import User from "../../../domain/user/user";

export interface UserDTO {
  id: string;
  username: string;
}

export function buildUser(dto?: UserDTO): User | undefined {
  if (!dto) {
    return undefined;
  }
  const domain = new User();
  domain.id = dto.id;
  domain.username = dto.username;
  return domain;
}
