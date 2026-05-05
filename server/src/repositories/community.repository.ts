import { prisma } from '../utils/prisma';

export const communityRepository = {
  createPost: (data: { userId: string; content: string; image?: string; tag?: string; duration?: string }) =>
    prisma.post.create({ data }),
  
  findPosts: (limit = 20, offset = 0) =>
    prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      skip: offset,
      take: limit,
      include: { user: { select: { name: true, avatar: true } } },
    }),
  
  findPostById: (id: string) =>
    prisma.post.findUnique({
      where: { id },
      include: { 
        user: { select: { name: true, avatar: true } },
        comments: { include: { user: { select: { name: true, avatar: true } } } }
      },
    }),
  
  likePost: (userId: string, postId: string) =>
    prisma.postLike.create({ data: { userId, postId } }),
  
  unlikePost: (userId: string, postId: string) =>
    prisma.postLike.delete({ where: { userId_postId: { userId, postId } } }),
  
  updatePostLikes: (postId: string, increment: number) =>
    prisma.post.update({
      where: { postId },
      data: { likes: { increment } },
    }),
  
  createComment: (data: { userId: string; postId: string; content: string }) =>
    prisma.comment.create({ data }),
  
  findCommentsByPostId: (postId: string, limit = 20) =>
    prisma.comment.findMany({
      where: { postId },
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: { user: { select: { name: true, avatar: true } } },
    }),
};
