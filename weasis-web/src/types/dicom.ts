/**
 * DICOM Types
 * 
 * TypeScript type definitions for DICOM-related data structures.
 */

export interface DicomImage {
  imageId: string;
  rows: number;
  columns: number;
  pixelData: ArrayBuffer;
  minPixelValue: number;
  maxPixelValue: number;
  slope: number;
  intercept: number;
  windowCenter: number;
  windowWidth: number;
  metadata: DicomMetadata;
}

export interface DicomMetadata {
  patientName?: string;
  patientId?: string;
  studyDate?: string;
  studyDescription?: string;
  seriesDescription?: string;
  modality?: string;
  instanceNumber?: number;
  seriesNumber?: number;
  studyInstanceUID?: string;
  seriesInstanceUID?: string;
  sopInstanceUID?: string;
  [key: string]: unknown;
}

export interface DicomSeries {
  seriesInstanceUID: string;
  seriesNumber: number;
  seriesDescription: string;
  modality: string;
  images: DicomImage[];
}

export interface DicomStudy {
  studyInstanceUID: string;
  studyDate: string;
  studyDescription: string;
  patientName: string;
  patientId: string;
  series: DicomSeries[];
}

export interface ViewportSettings {
  windowWidth: number;
  windowCenter: number;
  scale: number;
  pan: { x: number; y: number };
  rotation: number;
  invert: boolean;
}

export enum Tool {
  Pan = 'pan',
  Zoom = 'zoom',
  WindowLevel = 'windowLevel',
  Length = 'length',
  Angle = 'angle',
  Rectangle = 'rectangle',
  Ellipse = 'ellipse',
}
