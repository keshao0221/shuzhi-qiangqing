import React, { useMemo } from 'react';
import type { Landmark } from './usePoseDetection';

interface SkeletonOverlayProps {
  landmarks: Landmark[];
  canvasWidth: number;
  canvasHeight: number;
  isFlipped?: boolean;
}

const POSE_CONNECTIONS = [
  [0, 1],   // nose - left_inner_eye
  [0, 2],   // nose - right_inner_eye
  [1, 3],   // left_inner_eye - left_outer_eye
  [2, 4],   // right_inner_eye - right_outer_eye
  [5, 6],   // left_shoulder - right_shoulder
  [5, 7],   // left_shoulder - left_elbow
  [7, 9],   // left_elbow - left_wrist
  [6, 8],   // right_shoulder - right_elbow
  [8, 10],  // right_elbow - right_wrist
  [5, 11],  // left_shoulder - left_hip
  [6, 12],  // right_shoulder - right_hip
  [11, 12], // left_hip - right_hip
  [11, 13], // left_hip - left_knee
  [13, 15], // left_knee - left_ankle
  [12, 14], // right_hip - right_knee
  [14, 16], // right_knee - right_ankle
];

const LANDMARK_NAMES = [
  'nose', 'left_eye_inner', 'left_eye', 'left_eye_outer',
  'right_eye_inner', 'right_eye', 'right_eye_outer',
  'left_ear', 'right_ear',
  'left_shoulder', 'right_shoulder',
  'left_elbow', 'right_elbow',
  'left_wrist', 'right_wrist',
  'left_pinky', 'right_pinky',
  'left_index', 'right_index',
  'left_thumb', 'right_thumb',
  'left_hip', 'right_hip',
  'left_knee', 'right_knee',
  'left_ankle', 'right_ankle',
  'left_heel', 'right_heel',
  'left_foot_index', 'right_foot_index'
];

export const SkeletonOverlay: React.FC<SkeletonOverlayProps> = ({
  landmarks,
  canvasWidth,
  canvasHeight,
  isFlipped = true,
}) => {
  const pathData = useMemo(() => {
    if (!landmarks || landmarks.length === 0) return { lines: [], points: [] };

    const lines: [number, number, number, number][] = [];
    const points: [number, number, string, number][] = [];

    POSE_CONNECTIONS.forEach(([start, end]) => {
      if (landmarks[start] && landmarks[end]) {
        const startPoint = landmarks[start];
        const endPoint = landmarks[end];

        const x1 = isFlipped ? (1 - startPoint.x) * canvasWidth : startPoint.x * canvasWidth;
        const y1 = startPoint.y * canvasHeight;
        const x2 = isFlipped ? (1 - endPoint.x) * canvasWidth : endPoint.x * canvasWidth;
        const y2 = endPoint.y * canvasHeight;

        lines.push([x1, y1, x2, y2]);
      }
    });

    landmarks.forEach((landmark, index) => {
      if (landmark && landmark.visibility > 0.5) {
        const x = isFlipped ? (1 - landmark.x) * canvasWidth : landmark.x * canvasWidth;
        const y = landmark.y * canvasHeight;
        const name = LANDMARK_NAMES[index] || `landmark_${index}`;
        points.push([x, y, name, landmark.visibility]);
      }
    });

    return { lines, points };
  }, [landmarks, canvasWidth, canvasHeight, isFlipped]);

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="skeletonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00ff88" />
          <stop offset="100%" stopColor="#00b4d8" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {pathData.lines.map(([x1, y1, x2, y2], index) => (
        <line
          key={`line-${index}`}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="url(#skeletonGradient)"
          strokeWidth={4}
          strokeLinecap="round"
          filter="url(#glow)"
        />
      ))}

      {pathData.points.map(([x, y, name, visibility], index) => (
        <g key={`point-${index}`}>
          <circle
            cx={x}
            cy={y}
            r={6 - visibility * 2}
            fill="#00ff88"
            stroke="#ffffff"
            strokeWidth={2}
            filter="url(#glow)"
          />
        </g>
      ))}
    </svg>
  );
};

export default SkeletonOverlay;