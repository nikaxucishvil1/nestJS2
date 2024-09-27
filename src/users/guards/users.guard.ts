import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request | any = context.switchToHttp().getRequest();
    const userId = request.headers['user-id'] as string;
    if (!userId || !Types.ObjectId.isValid(userId))
      throw new BadRequestException('Invalid or No User id provided');
    request.userId = userId;
    return true;
  }
}
