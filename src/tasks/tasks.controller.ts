import {
  Body,
  Controller,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';

@Controller('tasks')
export class TasksController {
  constructor(
    @Inject('TASKS_SERVICE') private readonly tasksService: ClientProxy,
  ) {}

  @UseGuards(AccessTokenGuard)
  @Post('')
  createTask(
    @Body() body: { title: string; description: string; status: string },
  ) {
    return this.tasksService.send('task.create', body);
  }

  @UseGuards(AccessTokenGuard)
  @Post('assign/:id')
  assignTask(@Param('id') id: string, @Body() body: { user_id: string }) {
    return this.tasksService.send('task.assign', {
      task_id: id,
      ...body,
    });
  }

  @UseGuards(AccessTokenGuard)
  @Post('update/:id')
  updateTask(
    @Param('id') id: string,
    @Body()
    body: {
      title: string;
      description: string;
      status: string;
    },
  ) {
    return this.tasksService.send('task.update', {
      task_id: id,
      ...body,
    });
  }
}
