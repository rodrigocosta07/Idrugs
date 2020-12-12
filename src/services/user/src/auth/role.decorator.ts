import { SetMetadata } from '@nestjs/common';

export const Type = (type: string) => SetMetadata('type', type);