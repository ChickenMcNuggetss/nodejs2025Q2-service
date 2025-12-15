import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

const timestampToNumber = {
  to: (value: number | null) => value,
  from: (value: Date | null) => (value ? value.getTime() : null),
};

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  login: string;
  @Column()
  password: string;
  @VersionColumn()
  version: number; // integer number, increments on update
  @CreateDateColumn({ type: 'timestamp', transformer: timestampToNumber })
  createdAt: Date; // timestamp of creation
  @UpdateDateColumn({ type: 'timestamp', transformer: timestampToNumber })
  updatedAt: Date; // timestamp of last update
}
