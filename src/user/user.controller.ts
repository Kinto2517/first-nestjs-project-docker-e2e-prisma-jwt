import { Body, Controller, Get, ParseIntPipe, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Request } from 'express';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {

    constructor(private userService: UserService) {
        
    }

    @Get('me')
    getMe(
        @GetUser() user: User,
        @GetUser('email') email:string,
        ){
            console.log(email);
     return user;
    }


    @Patch('me')
    editUser(
        @GetUser('id') userId: number,
        @Body() dto:EditUserDto) {
        return this.userService.editUser(userId, dto);
    }
}
