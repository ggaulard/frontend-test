import Note from "../../../domain/call/note";

export interface NoteDTO {
  id: string;
  content: string;
}

export function buildNote(dto: NoteDTO): Note {
  const domain = new Note();
  domain.id = dto.id;
  domain.content = dto.content;
  return domain;
}
