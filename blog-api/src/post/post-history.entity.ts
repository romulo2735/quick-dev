import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import {Post} from './post.entity';

@Entity('post_histories')
export class PostHistory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    post_id: number;

    @ManyToOne(() => Post)
    @JoinColumn({name: 'post_id'})
    post: Post;

    @Column('text')
    description: string;

    @Column()
    edited_at: Date;
}
