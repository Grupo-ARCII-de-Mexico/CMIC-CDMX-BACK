import { SetMetadata } from '@nestjs/common';
import { Roles } from 'src/tools/eventos.enum';

export const META_ROLES = 'role';


export const RoleProtected = (...args: Roles[] ) => {


    return SetMetadata( META_ROLES , args);
}