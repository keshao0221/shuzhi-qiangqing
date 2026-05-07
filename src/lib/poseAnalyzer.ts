import type { Landmark } from './usePoseDetection';

export type ExerciseType = 'squat' | 'jumping_jacks' | 'plank' | 'lunge';

export interface AnalysisResult {
  isCorrect: boolean;
  score: number;
  feedback: string;
  correction?: string;
}

export interface JointAngles {
  leftHip: number;
  rightHip: number;
  leftKnee: number;
  rightKnee: number;
  leftShoulder: number;
  rightShoulder: number;
  leftElbow: number;
  rightElbow: number;
}

const calculateAngle = (
  point1: Landmark,
  point2: Landmark,
  point3: Landmark
): number => {
  const radians = Math.atan2(point3.y - point2.y, point3.x - point2.x) -
                  Math.atan2(point1.y - point2.y, point1.x - point2.x);
  let angle = Math.abs(radians * 180 / Math.PI);
  if (angle > 180) angle = 360 - angle;
  return angle;
};

const getJointAngles = (landmarks: Landmark[]): JointAngles => {
  return {
    leftHip: calculateAngle(landmarks[11], landmarks[23], landmarks[25]),
    rightHip: calculateAngle(landmarks[12], landmarks[24], landmarks[26]),
    leftKnee: calculateAngle(landmarks[23], landmarks[25], landmarks[27]),
    rightKnee: calculateAngle(landmarks[24], landmarks[26], landmarks[28]),
    leftShoulder: calculateAngle(landmarks[11], landmarks[11], landmarks[13]),
    rightShoulder: calculateAngle(landmarks[12], landmarks[12], landmarks[14]),
    leftElbow: calculateAngle(landmarks[11], landmarks[13], landmarks[15]),
    rightElbow: calculateAngle(landmarks[12], landmarks[14], landmarks[16]),
  };
};

export const analyzeSquat = (landmarks: Landmark[]): AnalysisResult => {
  const angles = getJointAngles(landmarks);
  const avgKneeAngle = (angles.leftKnee + angles.rightKnee) / 2;
  const avgHipAngle = (angles.leftHip + angles.rightHip) / 2;

  const leftShoulderHeight = landmarks[11].y;
  const leftHipHeight = landmarks[23].y;
  const leftKneeHeight = landmarks[25].y;

  const isTooHigh = leftShoulderHeight < leftHipHeight * 0.9;
  const isKneeCaved = false;

  if (avgKneeAngle > 160) {
    return {
      isCorrect: false,
      score: 20,
      feedback: '请下蹲',
      correction: '膝盖弯曲，将重心下降至大腿与地面平行',
    };
  }

  if (avgKneeAngle > 90 && avgKneeAngle <= 160) {
    const depthScore = Math.round((180 - avgKneeAngle) / 90 * 40 + 20);
    if (isKneeCaved) {
      return {
        isCorrect: false,
        score: depthScore,
        feedback: '膝盖外翻',
        correction: '膝盖朝向与脚尖方向一致，不要内扣',
      };
    }
    if (isTooHigh) {
      return {
        isCorrect: false,
        score: depthScore,
        feedback: '下蹲深度不够',
        correction: '继续下蹲，使大腿与地面平行或更低',
      };
    }
    return {
      isCorrect: true,
      score: depthScore + 40,
      feedback: '动作标准',
      correction: undefined,
    };
  }

  if (avgKneeAngle <= 90) {
    if (isKneeCaved) {
      return {
        isCorrect: false,
        score: 85,
        feedback: '深蹲到位但膝盖外翻',
        correction: '膝盖朝向与脚尖方向一致',
      };
    }
    return {
      isCorrect: true,
      score: 100,
      feedback: '完美深蹲',
      correction: undefined,
    };
  }

  return {
    isCorrect: false,
    score: 0,
    feedback: '未检测到有效姿势',
    correction: '请站在摄像头前，确保全身可见',
  };
};

export const analyzeJumpingJacks = (landmarks: Landmark[]): AnalysisResult => {
  const angles = getJointAngles(landmarks);

  const leftArmAngle = Math.abs(180 - angles.leftElbow);
  const rightArmAngle = Math.abs(180 - angles.rightElbow);
  const avgArmAngle = (leftArmAngle + rightArmAngle) / 2;

  const shoulderWidth = Math.abs(landmarks[11].x - landmarks[12].x);
  const hipWidth = Math.abs(landmarks[23].x - landmarks[24].x);
  const widthRatio = shoulderWidth / hipWidth;

  if (widthRatio > 1.5 && avgArmAngle > 120) {
    return {
      isCorrect: true,
      score: 100,
      feedback: '动作舒展',
      correction: undefined,
    };
  }

  if (widthRatio < 1.2 && avgArmAngle < 60) {
    return {
      isCorrect: false,
      score: 30,
      feedback: '请张开双臂',
      correction: '双手向两侧伸展，双脚分开与肩同宽',
    };
  }

  return {
    isCorrect: true,
    score: 60,
    feedback: '动作进行中',
    correction: undefined,
  };
};

export const analyzePlank = (landmarks: Landmark[]): AnalysisResult => {
  const angles = getJointAngles(landmarks);

  const shoulderToHip = Math.abs(landmarks[11].y - landmarks[23].y);
  const hipToAnkle = Math.abs(landmarks[23].y - landmarks[27].y);

  const alignment = Math.abs(shoulderToHip - hipToAnkle) / shoulderToHip;

  const avgHipAngle = (angles.leftHip + angles.rightHip) / 2;
  const isHipSagging = avgHipAngle < 160;
  const isHipRaised = avgHipAngle > 180;

  if (alignment < 0.15 && !isHipSagging && !isHipRaised) {
    return {
      isCorrect: true,
      score: 100,
      feedback: '标准平板支撑',
      correction: undefined,
    };
  }

  if (isHipSagging) {
    return {
      isCorrect: false,
      score: 50,
      feedback: '臀部下沉',
      correction: '收紧腹部，保持身体成一条直线',
    };
  }

  if (isHipRaised) {
    return {
      isCorrect: false,
      score: 60,
      feedback: '臀部过高',
      correction: '降低臀部，使其与肩和脚跟成一条直线',
    };
  }

  return {
    isCorrect: false,
    score: 70,
    feedback: '身体稍有偏移',
    correction: '请保持身体从头到脚成一条直线',
  };
};

export const analyzeLunge = (landmarks: Landmark[]): AnalysisResult => {
  const angles = getJointAngles(landmarks);

  const frontKneeAngle = angles.leftKnee;
  const backKneeAngle = angles.rightKnee;

  const frontKneeX = landmarks[25].x;
  const backKneeX = landmarks[26].x;
  const frontKneeY = landmarks[25].y;
  const backKneeY = landmarks[26].y;
  const backAnkleY = landmarks[28].y;

  const isBackKneeClose = Math.abs(backKneeY - backAnkleY) < 0.1;

  if (frontKneeAngle > 160) {
    return {
      isCorrect: false,
      score: 20,
      feedback: '请弯曲前腿',
      correction: '前腿弯曲约90度',
    };
  }

  if (frontKneeAngle > 90 && frontKneeAngle <= 160) {
    if (!isBackKneeClose) {
      return {
        isCorrect: false,
        score: 50,
        feedback: '后腿未收回',
        correction: '后膝向下接近地面',
      };
    }
    return {
      isCorrect: true,
      score: 80,
      feedback: '弓步姿势良好',
      correction: '保持平衡，收紧核心',
    };
  }

  if (frontKneeAngle <= 90 && frontKneeAngle > 70) {
    if (!isBackKneeClose) {
      return {
        isCorrect: false,
        score: 70,
        feedback: '后腿未完全收回',
        correction: '后膝应靠近地面',
      };
    }
    return {
      isCorrect: true,
      score: 100,
      feedback: '完美弓步',
      correction: undefined,
    };
  }

  return {
    isCorrect: false,
    score: 0,
    feedback: '姿势无法识别',
    correction: '请正对摄像头站立',
  };
};

export const analyzePose = (
  landmarks: Landmark[],
  exerciseType: ExerciseType
): AnalysisResult => {
  switch (exerciseType) {
    case 'squat':
      return analyzeSquat(landmarks);
    case 'jumping_jacks':
      return analyzeJumpingJacks(landmarks);
    case 'plank':
      return analyzePlank(landmarks);
    case 'lunge':
      return analyzeLunge(landmarks);
    default:
      return {
        isCorrect: false,
        score: 0,
        feedback: '未知运动类型',
        correction: undefined,
      };
  }
};

export const drawSkeletonOnCanvas = (
  ctx: CanvasRenderingContext2D,
  landmarks: Landmark[],
  canvasWidth: number,
  canvasHeight: number,
  isFlipped: boolean = true
) => {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  const POSE_CONNECTIONS = [
    [[0, 1], [0, 2], [1, 3], [2, 4]],
    [[5, 6]],
    [[5, 7], [7, 9], [6, 8], [8, 10]],
    [[5, 11], [6, 12], [11, 12]],
    [[11, 13], [13, 15], [12, 14], [14, 16]],
    [[23, 24]],
    [[23, 25], [25, 27], [24, 26], [26, 28]],
  ];

  const gradient = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight);
  gradient.addColorStop(0, '#00ff88');
  gradient.addColorStop(1, '#00b4d8');

  ctx.strokeStyle = gradient;
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';

  POSE_CONNECTIONS.flat().forEach(([startIdx, endIdx]) => {
    if (landmarks[startIdx] && landmarks[endIdx]) {
      const startPoint = landmarks[startIdx];
      const endPoint = landmarks[endIdx];

      const x1 = isFlipped ? (1 - startPoint.x) * canvasWidth : startPoint.x * canvasWidth;
      const y1 = startPoint.y * canvasHeight;
      const x2 = isFlipped ? (1 - endPoint.x) * canvasWidth : endPoint.x * canvasWidth;
      const y2 = endPoint.y * canvasHeight;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
  });

  landmarks.forEach((landmark) => {
    if (landmark.visibility > 0.5) {
      const x = isFlipped ? (1 - landmark.x) * canvasWidth : landmark.x * canvasWidth;
      const y = landmark.y * canvasHeight;

      ctx.beginPath();
      ctx.arc(x, y, 6, 0, 2 * Math.PI);
      ctx.fillStyle = '#00ff88';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  });
};