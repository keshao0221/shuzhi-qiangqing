import { communityRepository } from '../repositories/community.repository';

export const communityService = {
  async createPost(userId: string, content: string, image?: string, tag?: string, duration?: string) {
    return communityRepository.createPost({ userId, content, image, tag, duration });
  },

  async getPosts(limit = 20, offset = 0) {
    const posts = await communityRepository.findPosts(limit, offset);
    
    return posts.map(post => ({
      ...post,
      time: post.createdAt.toISOString(),
      comments: post.comments?.length || 0,
    }));
  },

  async getPostById(id: string) {
    const post = await communityRepository.findPostById(id);
    if (!post) {
      throw new Error('帖子不存在');
    }
    return post;
  },

  async likePost(userId: string, postId: string) {
    const existing = await communityRepository.findPostById(postId);
    if (!existing) {
      throw new Error('帖子不存在');
    }

    try {
      await communityRepository.likePost(userId, postId);
      await communityRepository.updatePostLikes(postId, 1);
      return { liked: true };
    } catch {
      await communityRepository.unlikePost(userId, postId);
      await communityRepository.updatePostLikes(postId, -1);
      return { liked: false };
    }
  },

  async createComment(userId: string, postId: string, content: string) {
    const post = await communityRepository.findPostById(postId);
    if (!post) {
      throw new Error('帖子不存在');
    }
    return communityRepository.createComment({ userId, postId, content });
  },

  async getComments(postId: string, limit = 20) {
    return communityRepository.findCommentsByPostId(postId, limit);
  },
};
