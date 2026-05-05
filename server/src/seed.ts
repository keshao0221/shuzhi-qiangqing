import { prisma } from './utils/prisma';

async function seed() {
  console.log('Seeding database...');

  // 先删除所有用户数据
  console.log('Deleting existing users...');
  await prisma.postLike.deleteMany({});
  await prisma.comment.deleteMany({});
  await prisma.post.deleteMany({});
  await prisma.workout.deleteMany({});
  await prisma.pointsHistory.deleteMany({});
  await prisma.redemption.deleteMany({});
  await prisma.user.deleteMany({});
  console.log('Deleted existing users');

  // 创建测试用户 test（支持邮箱登录）
  const testUser = await prisma.user.create({
    data: {
      email: 'test@example.com',
      name: 'test',
      avatar: '',
      points: 1250,
      height: 175,
      weight: 65,
      age: 25,
      gender: '男',
    },
  });
  console.log('Created test user:', testUser.id);

  // 为 test01 用户添加积分历史
  await prisma.pointsHistory.upsert({
    where: { id: 'points-history-1' },
    update: {},
    create: {
      id: 'points-history-1',
      userId: testUser.id,
      type: 'earn',
      amount: 1250,
      description: '注册奖励和训练奖励',
    },
  });

  const exercises = [
    { name: '俯卧撑', sets: '3', reps: '15', tag: '力量训练', image: 'pushup' },
    { name: '仰卧起坐', sets: '3', reps: '20', tag: '核心训练', image: 'situp' },
    { name: '深蹲', sets: '3', reps: '15', tag: '力量训练', image: 'squat' },
    { name: '平板支撑', time: '30秒', tag: '核心训练', image: 'plank' },
    { name: '跑步', time: '30分钟', tag: '有氧运动', image: 'running' },
    { name: '跳绳', time: '10分钟', tag: '有氧运动', image: 'jump_rope' },
    { name: '哑铃弯举', sets: '3', reps: '12', tag: '力量训练', image: 'dumbbell' },
    { name: '瑜伽拉伸', time: '15分钟', tag: '柔韧性', image: 'yoga' },
  ];

  const createdExercises = [];
  for (const exerciseData of exercises) {
    const exercise = await prisma.exercise.upsert({
      where: { name: exerciseData.name },
      update: {},
      create: exerciseData,
    });
    createdExercises.push(exercise);
  }

  const plans = [
    { name: '初学者入门', icon: '🏃', description: '适合运动新手的入门训练计划' },
    { name: '燃脂塑形', icon: '🔥', description: '高强度燃脂训练计划' },
    { name: '核心强化', icon: '💪', description: '增强核心力量的专项训练' },
  ];

  const createdPlans = [];
  for (const planData of plans) {
    const plan = await prisma.plan.upsert({
      where: { name: planData.name },
      update: {},
      create: planData,
    });
    createdPlans.push(plan);
  }

  // 为训练计划添加练习项
  if (createdPlans.length > 0 && createdExercises.length > 0) {
    await prisma.planExercise.upsert({
      where: { id: 'plan-exercise-1' },
      update: {},
      create: {
        id: 'plan-exercise-1',
        planId: createdPlans[0].id,
        exerciseId: createdExercises[0].id,
        order: 0,
      },
    });
  }

  const gifts = [
    { name: '运动水杯', image: 'water_bottle', points: 500, stock: 100, description: '高品质运动水杯' },
    { name: '运动毛巾', image: 'towel', points: 300, stock: 200, description: '速干运动毛巾' },
    { name: '瑜伽垫', image: 'yoga_mat', points: 800, stock: 50, description: '防滑瑜伽垫' },
    { name: '运动手环', image: 'smart_band', points: 1500, stock: 30, description: '智能运动手环' },
    { name: '跑鞋', image: 'running_shoes', points: 3000, stock: 20, description: '专业跑鞋' },
  ];

  for (const giftData of gifts) {
    await prisma.gift.upsert({
      where: { name: giftData.name },
      update: {},
      create: giftData,
    });
  }

  // 为 test01 用户创建训练记录
  await prisma.workout.upsert({
    where: { id: 'workout-1' },
    update: {},
    create: {
      id: 'workout-1',
      userId: testUser.id,
      sportType: '力量训练',
      duration: 45,
      calories: 350,
      distance: 0,
      steps: 800,
      avgHeartRate: 120,
      status: 'completed',
    },
  });

  // 为 test01 用户创建动态帖子
  await prisma.post.upsert({
    where: { id: 'post-1' },
    update: {},
    create: {
      id: 'post-1',
      userId: testUser.id,
      content: '今天完成了一次很棒的训练！继续加油！💪',
      tag: '健身日常',
      duration: '45分钟',
      likes: 12,
    },
  });

  console.log('Database seeded successfully!');
  await prisma.$disconnect();
}

seed().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
