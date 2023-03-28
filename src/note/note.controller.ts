import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { MyJwtGuard } from 'src/auth/guard';
import { InsertNoteDTO, UpdateNoteDTO } from './dto';
import { NoteService } from './note.service';

@UseGuards(MyJwtGuard)
@Controller('note')
export class NoteController {
  constructor(private noteService: NoteService) {}

  @Get()
  getNotes(@GetUser('id') userId: number) {
    this.noteService.getNotes(userId);
  }

  @Get(':id')
  getNoteById(@Param('id', ParseIntPipe) noteId: number) {
    this.noteService.getNoteById(noteId);
  }

  @Post()
  insertNote(@GetUser('id') userId: number, @Body() insertNote: InsertNoteDTO) {
    this.noteService.insertNote(userId, insertNote);
  }

  @Patch(':id')
  updateNoteById(@Param('id', ParseIntPipe) noteId: number, @Body() insertNote: UpdateNoteDTO) {
    this.noteService.updateNoteById(noteId, insertNote);
  }

  @Delete(':id')
  deleteNoteById(@Param('id', ParseIntPipe) noteId: number) {
    this.noteService.deleteNoteById(noteId);
  }
}
