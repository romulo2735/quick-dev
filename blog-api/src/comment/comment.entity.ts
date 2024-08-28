import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Post } from '../post/post.entity';

@Entity('comments')
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column()
    post_id: number;

    @ManyToOne(() => Post)
    @JoinColumn({ name: 'post_id' })
    post: Post;

    @Column('text')
    description: string;

    @Column({ default: false })
    removed_by_user: boolean;

    @Column({ default: false })
    removed_by_post_owner: boolean;
}
