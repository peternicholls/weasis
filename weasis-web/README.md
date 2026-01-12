# Weasis Web - README

## Overview

This is the **web-based WASM version** of the Weasis DICOM viewer. This module represents the beginning of a complete architectural transformation from a Java desktop application to a modern web application.

## ⚠️ Important Notice

This is a **proof-of-concept** and **work-in-progress**. The web viewer is NOT feature-complete and does not yet provide the full functionality of the desktop Weasis viewer.

## Current Status

### ✅ Implemented
- Basic project structure
- TypeScript configuration
- Vite build setup
- UI scaffold with viewer layout
- Placeholder service architecture

### 🚧 In Progress / TODO
- [ ] Integrate Cornerstone.js for DICOM rendering
- [ ] Implement file loading and parsing
- [ ] Add basic viewing tools (zoom, pan, window/level)
- [ ] Study/Series management
- [ ] Measurement tools
- [ ] 3D MPR support
- [ ] DICOM networking (WADO, DICOMweb)
- [ ] Export functionality

## Prerequisites

- Node.js 18+ 
- npm or pnpm

## Installation

```bash
cd weasis-web
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

This will start the Vite dev server at `http://localhost:3000`

## Building

Build for production:

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Technology Stack

- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server
- **dicom-parser**: DICOM file parsing (currently installed)
- **Cornerstone.js**: Medical imaging library (planned - has WASM dependency issues)
- **dcmjs**: DICOM utilities (planned)

## Architecture

```
weasis-web/
├── index.html              # Main HTML file (root level for Vite)
├── src/
│   ├── components/         # UI components (future)
│   ├── services/           # Business logic services
│   │   ├── DicomViewerService.ts
│   │   └── UIController.ts
│   ├── types/              # TypeScript type definitions
│   │   └── dicom.ts
│   ├── utils/              # Utility functions
│   │   └── DicomUtils.ts
│   └── main.ts             # Application entry point
├── dist/                   # Build output (generated)
├── package.json
├── tsconfig.json
├── vite.config.ts
└── pom.xml                 # Optional Maven integration
```

## Comparison with Desktop Weasis

| Feature | Desktop Weasis | Web Weasis | Status |
|---------|---------------|------------|--------|
| DICOM Display | ✅ Full | 🚧 Planned | TODO |
| Window/Level | ✅ Full | 🚧 Planned | TODO |
| Zoom/Pan | ✅ Full | 🚧 Planned | TODO |
| Measurements | ✅ Full | 🚧 Planned | TODO |
| MPR | ✅ Full | 🚧 Planned | TODO |
| 3D Rendering | ✅ JOGL | 🚧 WebGL | TODO |
| DICOM Send | ✅ Full | ❌ Not planned | - |
| Query/Retrieve | ✅ Full | 🚧 DICOMweb only | TODO |
| Offline Support | ✅ Full | 🚧 Service Workers | TODO |

## Development Roadmap

See the main [WASM_CONVERSION_GUIDE.md](../WASM_CONVERSION_GUIDE.md) for the complete conversion strategy.

### Phase 1: Core Viewer (Current)
- [x] Project structure
- [ ] Cornerstone.js integration
- [ ] Basic DICOM rendering
- [ ] File loading
- [ ] Essential tools (pan, zoom, W/L)

### Phase 2: Study Management
- [ ] Series/Study organization
- [ ] Thumbnail grid
- [ ] Multi-viewport layouts

### Phase 3: Advanced Tools
- [ ] Measurement tools
- [ ] Annotations
- [ ] Cine playback

### Phase 4: Networking
- [ ] DICOMweb WADO-RS
- [ ] QIDO-RS queries
- [ ] STOW-RS send

## Contributing

This is part of the larger Weasis project conversion effort. Please refer to the main repository's CONTRIBUTING.md for guidelines.

## Known Limitations

1. **No Native Support**: Cannot use native libraries (OpenCV, etc.)
2. **File System**: Limited compared to desktop (uses File API)
3. **Performance**: May be slower than native for very large datasets
4. **Browser Support**: Requires modern browser with WASM support
5. **Offline**: Limited compared to desktop application

## Browser Compatibility

Target browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## License

Dual-licensed under EPL-2.0 OR Apache-2.0, same as the main Weasis project.

## Related Documentation

- [WASM Conversion Guide](../WASM_CONVERSION_GUIDE.md)
- [Cornerstone.js Documentation](https://www.cornerstonejs.org/)
- [DICOM Standard](https://www.dicomstandard.org/)

## Support

For questions about the web version specifically, please create an issue in the main repository with the `web` label.
