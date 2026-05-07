import { useEffect, useRef, useState, useCallback } from 'react';

export interface Landmark {
  x: number;
  y: number;
  z: number;
  visibility: number;
}

export interface PoseResult {
  landmarks: Landmark[];
  worldLandmarks: Landmark[];
}

export interface UsePoseDetectionOptions {
  runningMode?: 'video' | 'image';
  numPoses?: number;
  minPoseDetectionConfidence?: number;
  minPosePresenceConfidence?: number;
  minTrackingConfidence?: number;
}

export interface UsePoseDetectionReturn {
  isLoading: boolean;
  isReady: boolean;
  error: string | null;
  poseResult: PoseResult | null;
  detectPose: (video: HTMLVideoElement) => void;
  detectPoseFromStream: (stream: MediaStream) => void;
}

const defaultOptions: UsePoseDetectionOptions = {
  runningMode: 'video',
  numPoses: 1,
  minPoseDetectionConfidence: 0.5,
  minPosePresenceConfidence: 0.5,
  minTrackingConfidence: 0.5,
};

export function usePoseDetection(options: UsePoseDetectionOptions = {}): UsePoseDetectionReturn {
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [poseResult, setPoseResult] = useState<PoseResult | null>(null);

  const poseDetectorRef = useRef<PoseDetector | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const lastDetectionTimeRef = useRef<number>(-1);
  const rafIdRef = useRef<number | null>(null);

  const mergedOptions = { ...defaultOptions, ...options };

  const initPoseDetector = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { PoseDetector, FilesetResolver } = await import('@mediapipe/tasks-vision');

      const vision = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
      );

      poseDetectorRef.current = await PoseDetector.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/pose/pose_landmark_lite/float16/1/pose_landmark_lite.task',
          delegate: 'GPU',
        },
        runningMode: mergedOptions.runningMode,
        numPoses: mergedOptions.numPoses,
        minPoseDetectionConfidence: mergedOptions.minPoseDetectionConfidence,
        minPosePresenceConfidence: mergedOptions.minPosePresenceConfidence,
        minTrackingConfidence: mergedOptions.minTrackingConfidence,
      });

      setIsReady(true);
      setIsLoading(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '初始化姿势检测器失败';
      setError(errorMessage);
      setIsLoading(false);
      console.error('Pose detector init error:', err);
    }
  }, [mergedOptions]);

  useEffect(() => {
    initPoseDetector();

    return () => {
      if (poseDetectorRef.current) {
        poseDetectorRef.current.close();
        poseDetectorRef.current = null;
      }
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [initPoseDetector]);

  const detectPose = useCallback((video: HTMLVideoElement) => {
    if (!poseDetectorRef.current || !isReady) return;

    videoRef.current = video;

    const detectFrame = () => {
      if (!poseDetectorRef.current || !videoRef.current) return;

      const now = performance.now();
      if (now - lastDetectionTimeRef.current >= 100) {
        lastDetectionTimeRef.current = now;

        try {
          const result = poseDetectorRef.current.detectForVideo(videoRef.current, now);
          if (result.landmarks && result.landmarks.length > 0) {
            setPoseResult({
              landmarks: result.landmarks[0],
              worldLandmarks: result.worldLandmarks?.[0] || [],
            });
          }
        } catch (err) {
          console.error('Pose detection error:', err);
        }
      }

      rafIdRef.current = requestAnimationFrame(detectFrame);
    };

    detectFrame();
  }, [isReady]);

  const detectPoseFromStream = useCallback((stream: MediaStream) => {
    if (!poseDetectorRef.current || !isReady) return;

    const video = document.createElement('video');
    video.srcObject = stream;
    video.playsInline = true;
    video.muted = true;

    video.onloadedmetadata = () => {
      video.play();
      detectPose(video);
    };
  }, [isReady, detectPose]);

  return {
    isLoading,
    isReady,
    error,
    poseResult,
    detectPose,
    detectPoseFromStream,
  };
}