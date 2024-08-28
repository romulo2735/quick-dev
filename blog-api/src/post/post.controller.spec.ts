import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './post.entity';

describe('PostService', () => {
  let service: PostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostService],
    }).compile();

    service = module.get<PostService>(PostService);
  });

  it('should create a new post', () => {
    const createPostDto: CreatePostDto = {
      user_id: 1,
      title: 'New Post',
      description: 'Post description',
      image: 'image.jpg',
    };

    const result = service.create(createPostDto);

    expect(result).toEqual({
      id: 1,
      user_id: 1,
      title: 'New Post',
      description: 'Post description',
      image: 'image.jpg',
    });
    expect(service.findAll()).toHaveLength(1);
  });

  it('should find a post by ID', () => {
    const createPostDto: CreatePostDto = {
      user_id: 1,
      title: 'New Post',
      description: 'Post description',
      image: 'image.jpg',
    };

    service.create(createPostDto);
    const result = service.findOne(1);

    expect(result).toEqual({
      id: 1,
      user_id: 1,
      title: 'New Post',
      description: 'Post description',
      image: 'image.jpg',
    });
  });

  it('should throw NotFoundException when post is not found', () => {
    expect(() => service.findOne(999)).toThrow(NotFoundException);
  });

  it('should update a post', () => {
    const createPostDto: CreatePostDto = {
      user_id: 1,
      title: 'New Post',
      description: 'Post description',
      image: 'image.jpg',
    };
    const updatePostDto: UpdatePostDto = {
      title: 'Updated Post',
      description: 'Updated description',
      image: 'updated-image.jpg',
    };

    service.create(createPostDto);
    const updatedPost = service.update(1, 1, updatePostDto);

    expect(updatedPost).toEqual({
      id: 1,
      user_id: 1,
      title: 'Updated Post',
      description: 'Updated description',
      image: 'updated-image.jpg',
    });
  });

  it('should throw ForbiddenException when updating a post of another user', () => {
    const createPostDto: CreatePostDto = {
      user_id: 1,
      title: 'New Post',
      description: 'Post description',
      image: 'image.jpg',
    };
    const updatePostDto: UpdatePostDto = {
      title: 'Updated Post',
      description: 'Updated description',
      image: 'updated-image.jpg',
    };

    service.create(createPostDto);
    expect(() => service.update(1, 2, updatePostDto)).toThrow(ForbiddenException);
  });

  it('should remove a post', () => {
    const createPostDto: CreatePostDto = {
      user_id: 1,
      title: 'New Post',
      description: 'Post description',
      image: 'image.jpg',
    };

    service.create(createPostDto);
    service.remove(1, 1);

    expect(service.findAll()).toHaveLength(0);
  });

  it('should throw ForbiddenException when deleting a post of another user', () => {
    const createPostDto: CreatePostDto = {
      user_id: 1,
      title: 'New Post',
      description: 'Post description',
      image: 'image.jpg',
    };

    service.create(createPostDto);
    expect(() => service.remove(1, 2)).toThrow(ForbiddenException);
  });
});
