import { ForbiddenException, Injectable } from '@nestjs/common';
import { InsertNoteDTO, UpdateNoteDTO } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NoteService {
  constructor(private prismaService: PrismaService) {}

  async getNotes(userId: number) {
    const note = await this.prismaService.note.findMany({
      where: {
        userId,
      },
    });
    return note;
  }

  async getNoteById(noteId: number) {
    const note = await this.prismaService.note.findUnique({
      where: {
        id: noteId,
      },
    });
    return note;
  }

  insertNote(userId: number, insertNote: InsertNoteDTO) {
    const note = this.prismaService.note.create({
      data: {
        ...insertNote,
        userId,
      },
    });
    return note;
  }

  updateNoteById(noteId: number, insertNote: UpdateNoteDTO) {
    const note = this.prismaService.note.findUnique({
      where: {
        id: noteId,
      },
    });
    if (!note) {
      throw new ForbiddenException('Cannot find Note to update');
    }
    return this.prismaService.note.update({
      where: {
        id: noteId,
      },
      data: {
        ...insertNote,
      },
    });
  }

  deleteNoteById(noteId: number) {
    const note = this.prismaService.note.delete({
      where: {
        id: noteId,
      },
    });

    return note;
  }
}
