import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { generateUUID } from '../utils/uuid/generate-uuid';

export enum TypesEmployee {
  'ADMINISTRATOR',
  'MODERATOR',
  'SUPPORT',
}

@Entity('employees')
export class Employee {
  @PrimaryColumn()
  id!: string;

  @Column({ length: 100 })
  name!: string;

  @Column({ enum: TypesEmployee, default: 'SUPPORT' })
  type!: TypesEmployee;

  @Column({ length: 255 })
  email!: string;

  @Column({ length: 11 })
  cpf!: string;

  @Column({ length: 255 })
  password!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  constructor() {
    if (!this.id) {
      this.id = generateUUID();
    }
  }
}
