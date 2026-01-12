# Weasis WASM/Web Integration Documentation

## Overview

This document describes how the new web-based WASM module integrates with the existing Weasis desktop application codebase.

## Module Structure

The Weasis project now contains two parallel viewer implementations:

### 1. Desktop Weasis (Existing)
- **Location**: Root modules (weasis-core, weasis-base, etc.)
- **Technology**: Java 24, Swing, OSGi
- **Target**: Desktop platforms (Windows, macOS, Linux)
- **Status**: Production-ready, fully featured

### 2. Web Weasis (New)
- **Location**: `weasis-web/`
- **Technology**: TypeScript, Vite, Cornerstone.js
- **Target**: Modern web browsers
- **Status**: Proof-of-concept, under development

## Directory Layout

```
weasis/
├── weasis-core/              # Desktop: Core functionality
├── weasis-base/              # Desktop: Base UI components
├── weasis-dicom/             # Desktop: DICOM handling
├── weasis-launcher/          # Desktop: Application launcher
├── weasis-distributions/     # Desktop: Build/packaging
├── weasis-web/              # WEB: New web-based viewer
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
├── pom.xml                   # Desktop: Maven parent POM
├── WASM_CONVERSION_GUIDE.md # Conversion strategy
└── README.md                 # Main documentation
```

## Build Systems

### Desktop Build (Maven)
```bash
# Build desktop version
mvn clean install
```

The desktop build process is **unchanged** and operates independently of the web module.

### Web Build (npm/Vite)
```bash
# Build web version
cd weasis-web
npm install
npm run build
```

The web build is **separate** and uses standard Node.js tooling.

## Development Workflow

### Desktop Development
No changes to existing workflow:
1. Use IntelliJ IDEA, Eclipse, or NetBeans
2. Maven for dependency management
3. Run/debug as Java application
4. OSGi framework for modularity

### Web Development
New workflow for web module:
1. Use VS Code, WebStorm, or any text editor
2. npm for dependency management
3. Vite dev server for hot reload
4. Modern JavaScript ecosystem

## Code Reuse Strategy

### What CAN be Reused
Limited due to platform differences:

1. **Business Logic Concepts**
   - DICOM tag interpretation
   - Window/level algorithms
   - Measurement calculations
   - Data models (must be rewritten in TypeScript)

2. **Knowledge & Documentation**
   - DICOM workflows
   - Medical imaging algorithms
   - User interaction patterns

### What CANNOT be Reused
Platform-specific code:

1. **UI Layer**
   - All Swing components → Must be rewritten in HTML/CSS/JS
   - Event handling → Web event model
   - Layout managers → CSS Grid/Flexbox

2. **Native Dependencies**
   - OpenCV → Use WASM port or pure JS alternatives
   - JOGL → WebGL for 3D rendering
   - File I/O → Browser File API

3. **OSGi Framework**
   - Module system → ES6 modules
   - Service registry → Dependency injection pattern

## Shared Resources

### Common Assets
These can potentially be shared:

1. **Documentation**
   - User guides (adaptable)
   - DICOM conformance statements
   - API documentation concepts

2. **Test Data**
   - Sample DICOM files
   - Test images
   - Test cases (must be rewritten)

3. **Translations**
   - i18n string resources (can be converted to JSON)

## Migration Path

### Phase 1: Parallel Development (Current)
- Desktop version continues normal development
- Web version built from scratch
- No dependencies between modules
- Separate release cycles

### Phase 2: Feature Parity
- Web version gains core features
- Both versions maintained
- User can choose platform

### Phase 3: Consolidation (Future)
- Evaluate user adoption
- Potentially focus on one platform
- Or maintain both for different use cases

## Version Compatibility

### Desktop Weasis
- Version: 4.6.7-SNAPSHOT
- Java: 24
- Minimum JRE: 24

### Web Weasis
- Version: 1.0.0 (independent)
- Browsers: Chrome 90+, Firefox 88+, Safari 14+
- No server requirements (static hosting)

## Deployment Options

### Desktop (Unchanged)
1. Native installers (Windows .exe, macOS .dmg, Linux packages)
2. Portable ZIP archives
3. Web launcher via weasis:// protocol

### Web (New)
1. Static hosting (Nginx, Apache)
2. CDN deployment
3. Progressive Web App (future)
4. Embedded in hospital portals

## Testing Strategy

### Desktop Tests
- JUnit tests (existing)
- Integration tests (existing)
- No changes required

### Web Tests
- Vitest for unit tests (to be added)
- Playwright for E2E tests (to be added)
- Separate test infrastructure

## Continuous Integration

### Current CI (GitHub Actions)
Handles desktop builds - **no changes needed**

### Future CI Addition
Add separate workflow for web module:
```yaml
# .github/workflows/web-build.yml
name: Web Build
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: cd weasis-web && npm install && npm run build
```

## Licensing

Both modules under **EPL-2.0 OR Apache-2.0** (unchanged).

Web module dependencies (Cornerstone.js, etc.) have compatible open-source licenses.

## Documentation Updates

### Updated Files
1. `WASM_CONVERSION_GUIDE.md` - Complete conversion strategy
2. `weasis-web/README.md` - Web module documentation
3. `INTEGRATION.md` - This file

### Unchanged Files
- Main `README.md` - Still focuses on desktop version
- Building docs - Desktop build process unchanged
- User guides - Desktop version documentation

## Support Matrix

| Feature | Desktop | Web | Notes |
|---------|---------|-----|-------|
| DICOM Display | ✅ | 🚧 | Web: planned |
| Multi-monitor | ✅ | ⚠️ | Web: browser limitations |
| 3D Rendering | ✅ | 🚧 | Web: WebGL instead of JOGL |
| DICOM Send | ✅ | 🚧 | Web: DICOMweb only |
| Offline Mode | ✅ | 🚧 | Web: Service workers |
| Plugins | ✅ | ❌ | Web: not supported |
| Native Print | ✅ | ⚠️ | Web: browser print API |

Legend:
- ✅ Fully supported
- 🚧 Planned/In development  
- ⚠️ Limited support
- ❌ Not supported

## Migration Decision Tree

Should you use Desktop or Web Weasis?

```
Need OSGi plugins? → Desktop
Need offline operation? → Desktop (for now)
Need maximum performance? → Desktop
Prefer easy deployment? → Web
Need cross-platform without install? → Web
Browser-only environment? → Web
Need cutting-edge features? → Desktop (more mature)
Want future-proof solution? → Web (growing)
```

## Frequently Asked Questions

### Q: Will the desktop version be deprecated?
**A:** No immediate plans. Both versions will coexist. Desktop has features that may never come to web.

### Q: Can I contribute to the web version?
**A:** Yes! See the web module's README for development setup.

### Q: Will my desktop plugins work in the web version?
**A:** No. Web version uses a completely different architecture. Plugins would need to be rewritten as web components.

### Q: When will web version be production-ready?
**A:** Current estimate: 12-18 months for full feature parity. MVP in 4-6 months.

### Q: Can I use both versions?
**A:** Yes. They're completely independent and can be installed/deployed simultaneously.

## Contact & Support

For questions about:
- **Desktop version**: Use existing support channels
- **Web version**: Create issue with `web` label
- **Conversion strategy**: Create issue with `wasm-conversion` label

## Next Steps for Contributors

### To work on Desktop Weasis:
1. Follow existing build instructions
2. No changes to your workflow
3. Ignore `weasis-web/` directory

### To work on Web Weasis:
1. Navigate to `weasis-web/`
2. Run `npm install`
3. Run `npm run dev`
4. See `weasis-web/README.md` for details

### To work on Conversion:
1. Read `WASM_CONVERSION_GUIDE.md`
2. Understand both codebases
3. Help port features from Java to TypeScript
