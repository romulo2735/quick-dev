import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany} from 'typeorm';
import {User} from '../user/user.entity';
import {PostHistory} from './post-history.entity';

@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @ManyToOne(() => User)
    @JoinColumn({name: 'user_id'})
    user: User;

    @Column({length: 100})
    title: string;

    @Column('text')
    description: string;

    @Column({nullable: true})
    image: string;

    @Column({default: 0})
    views: number;

    @Column({default: 0})
    likes: number;

    @Column({default: 0})
    dislikes: number;

    @OneToMany(() => PostHistory, postHistory => postHistory.post)
    history: PostHistory[];
}
