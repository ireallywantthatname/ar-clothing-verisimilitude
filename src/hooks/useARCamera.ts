"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";

export interface CameraPermissions {
  camera: boolean;
  microphone: boolean;
}

export interface FaceDetection {
  faceShape: "round" | "oval" | "square" | "heart" | "diamond";
  skinTone: "fair" | "light" | "medium" | "tan" | "deep";
  confidence: number;
  landmarks: Array<{ x: number; y: number }>;
}

export interface GestureDetection {
  type: "swipe" | "pinch" | "tap" | "hold" | "wave";
  direction?: "left" | "right" | "up" | "down";
  confidence: number;
}

export function useARCamera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [isInitialized, setIsInitialized] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [permissions, setPermissions] = useState<CameraPermissions>({
    camera: false,
    microphone: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [faceDetection, setFaceDetection] = useState<FaceDetection | null>(
    null
  );
  const [gestureDetection, setGestureDetection] =
    useState<GestureDetection | null>(null);

  // Initialize TensorFlow.js
  const initializeTensorFlow = useCallback(async () => {
    try {
      await tf.ready();
      await tf.setBackend("webgl");
      console.log("TensorFlow.js initialized with WebGL backend");
      setIsInitialized(true);
    } catch (err) {
      console.error("Failed to initialize TensorFlow.js:", err);
      setError("Failed to initialize AR engine");
    }
  }, []);

  // Request camera permissions
  const requestPermissions = useCallback(async (): Promise<boolean> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user",
        },
        audio: true,
      });

      setPermissions({
        camera: true,
        microphone: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsStreaming(true);
      }

      return true;
    } catch (err) {
      console.error("Failed to get camera permissions:", err);
      setError("Camera access denied. Please enable camera permissions.");
      return false;
    }
  }, []);

  // Stop camera stream
  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      setIsStreaming(false);
    }
  }, []);

  // Basic face detection (placeholder - would use a proper model in production)
  const detectFace = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current || !isInitialized) return;

    // This is a simplified implementation
    // In production, you'd load a proper face detection model
    const mockDetection: FaceDetection = {
      faceShape: "oval",
      skinTone: "medium",
      confidence: 0.85,
      landmarks: [
        { x: 100, y: 120 }, // Left eye
        { x: 180, y: 120 }, // Right eye
        { x: 140, y: 160 }, // Nose
        { x: 140, y: 200 }, // Mouth
      ],
    };

    setFaceDetection(mockDetection);
  }, [isInitialized]);

  // Basic gesture detection (placeholder)
  const detectGestures = useCallback(async () => {
    if (!videoRef.current || !isInitialized) return;

    // Mock gesture detection
    // In production, you'd implement hand tracking and gesture recognition
    const gestures: GestureDetection[] = [
      { type: "wave", confidence: 0.9 },
      { type: "swipe", direction: "left", confidence: 0.8 },
      { type: "pinch", confidence: 0.7 },
    ];

    // Randomly select a gesture for demo purposes
    const randomGesture = gestures[Math.floor(Math.random() * gestures.length)];
    setGestureDetection(randomGesture);
  }, [isInitialized]);

  // Capture screenshot
  const captureScreenshot = useCallback((): string | null => {
    if (!videoRef.current || !canvasRef.current) return null;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return null;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    return canvas.toDataURL("image/png");
  }, []);

  // Start AR session
  const startARSession = useCallback(async () => {
    const hasPermissions = await requestPermissions();
    if (!hasPermissions) return false;

    // Start detection loops
    const detectionInterval = setInterval(() => {
      detectFace();
      detectGestures();
    }, 100); // 10 FPS

    return () => clearInterval(detectionInterval);
  }, [requestPermissions, detectFace, detectGestures]);

  // Initialize on mount
  useEffect(() => {
    initializeTensorFlow();

    return () => {
      stopStream();
    };
  }, [initializeTensorFlow, stopStream]);

  return {
    videoRef,
    canvasRef,
    isInitialized,
    isStreaming,
    permissions,
    error,
    faceDetection,
    gestureDetection,
    requestPermissions,
    stopStream,
    captureScreenshot,
    startARSession,
  };
}
