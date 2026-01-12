# Weasis WASM Conversion Guide

## Overview
This document outlines the strategy for converting the Weasis DICOM viewer from a Java desktop application to a WebAssembly (WASM) web application.

## Current Architecture
- **Language**: Java (24)
- **UI Framework**: Java Swing
- **Module System**: OSGi (Apache Felix)
- **Build System**: Maven
- **Native Dependencies**: OpenCV, JOGL
- **Code Size**: ~152,000 lines of Java

## Challenges

### 1. UI Framework Incompatibility
Java Swing does not compile to WASM or run in browsers. Complete UI rewrite required.

### 2. Native Dependencies
- OpenCV: Image processing (needs WASM alternative or port)
- JOGL: 3D rendering (replace with WebGL)

### 3. OSGi Framework
OSGi is desktop-oriented and incompatible with browser environment.

### 4. File System Access
Desktop file operations need to be replaced with browser APIs (File API, IndexedDB).

## Recommended Approaches

### Option 1: TeaVM (Pure WASM Compilation)
**Pros:**
- Compiles Java bytecode to JavaScript/WASM
- Can reuse some business logic
- Open source

**Cons:**
- Limited Java library support
- Still requires UI rewrite
- Performance limitations
- No Swing support

### Option 2: CheerpJ (Commercial)
**Pros:**
- Can run Swing applications in browser
- Minimal code changes potentially
- Commercial support

**Cons:**
- Commercial license required
- Large bundle size
- Performance overhead
- Licensing costs

### Option 3: Hybrid Approach (Recommended)
**Architecture:**
1. **Frontend**: Modern web framework (React/Vue/Svelte)
   - Canvas/WebGL for rendering
   - Web Components for UI
   
2. **Core Logic**: 
   - Port critical DICOM parsing to JavaScript/TypeScript
   - Use existing DICOM JavaScript libraries (cornerstone.js, dcmjs)
   - Compile performance-critical parts with AssemblyScript or Rust->WASM

3. **Storage**:
   - IndexedDB for local storage
   - File System Access API for file operations

## Conversion Strategy

### Phase 1: Infrastructure (2-4 weeks)
1. Create web module structure
2. Set up build pipeline (Webpack/Vite)
3. Configure WASM toolchain
4. Create development environment

### Phase 2: Core DICOM Viewer (8-12 weeks)
1. Implement DICOM image rendering (Canvas/WebGL)
2. Basic viewing operations (pan, zoom, windowing)
3. Series/study management
4. Thumbnail view

### Phase 3: Measurement Tools (4-6 weeks)
1. Port measurement graphics
2. Annotation tools
3. Region statistics

### Phase 4: Advanced Features (12-16 weeks)
1. MPR (Multi-planar reconstruction)
2. 3D rendering (WebGL)
3. DICOM networking (WADO, DICOMweb)
4. Export functionality

### Phase 5: Specialized Viewers (8-12 weeks)
1. ECG viewer
2. Structured reports
3. Audio playback

## Technology Stack Recommendation

### Frontend
- **Framework**: React or Vue.js
- **Rendering**: HTML5 Canvas, WebGL
- **DICOM**: cornerstone.js, cornerstoneWADOImageLoader, dcmjs
- **UI**: Material-UI or similar component library

### Build & Tooling
- **Bundler**: Vite or Webpack 5
- **Package Manager**: npm or pnpm
- **TypeScript**: For type safety
- **WASM**: AssemblyScript for performance-critical code

### Backend Integration
- **DICOM Server**: DICOMweb protocol
- **Storage**: IndexedDB API
- **File Access**: File System Access API

## Migration Path

### Step 1: Create Web Skeleton
```
weasis-web/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   ├── services/
│   ├── utils/
│   └── main.ts
├── package.json
└── vite.config.ts
```

### Step 2: Implement Core Viewer
Start with basic DICOM image display using cornerstone.js

### Step 3: Progressive Feature Addition
Add features incrementally, testing thoroughly

### Step 4: Parallel Development
Maintain desktop version while building web version

## Estimated Effort

**Total Estimated Time**: 12-18 months with dedicated team
- 2-3 senior developers
- 1 UI/UX designer
- 1 DICOM/medical imaging specialist
- DevOps support

**Minimum Viable Product (MVP)**: 4-6 months
- Basic DICOM viewing
- Core measurements
- Study/series management
- WADO/DICOMweb support

## Risks & Mitigation

### Risk 1: Performance
**Mitigation**: Use WebGL for rendering, WASM for critical paths

### Risk 2: Browser Compatibility
**Mitigation**: Target modern browsers (Chrome, Firefox, Safari, Edge)

### Risk 3: Feature Parity
**Mitigation**: Prioritize core features, phase advanced features

### Risk 4: File Size
**Mitigation**: Code splitting, lazy loading, optimized assets

## Next Steps

1. **Stakeholder Alignment**: Confirm scope, timeline, resources
2. **Proof of Concept**: Build minimal DICOM viewer (2-3 weeks)
3. **Architecture Review**: Finalize technical approach
4. **Resource Allocation**: Assign development team
5. **Iterative Development**: Start with MVP features

## Existing Open Source Web DICOM Viewers

Consider these as alternatives or references:
- **OHIF Viewer**: Modern, DICOMweb-based viewer
- **cornerstone.js**: Foundation library for medical imaging
- **dwv**: DICOM Web Viewer
- **Papaya**: Neuroimaging viewer

## Conclusion

Converting Weasis to WASM is a **complete rewrite project**, not a simple conversion. The recommended approach is a hybrid web application using modern web technologies while potentially reusing some business logic from the Java codebase.

This is a **major undertaking** requiring significant resources, time, and expertise.
