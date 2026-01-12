/**
 * UI Controller
 * 
 * Manages UI interactions and connects them to the DICOM viewer service.
 */

import { DicomViewerService } from './DicomViewerService';

export class UIController {
  private viewerService: DicomViewerService;

  constructor(viewerService: DicomViewerService) {
    this.viewerService = viewerService;
  }

  init(): void {
    console.log('Initializing UI Controller...');
    
    // Set up event listeners
    this.setupFileInput();
    this.setupToolbarButtons();
    
    console.log('UI Controller initialized');
  }

  private setupFileInput(): void {
    const openFileBtn = document.getElementById('openFile');
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;

    openFileBtn?.addEventListener('click', () => {
      fileInput?.click();
    });

    fileInput?.addEventListener('change', async (event) => {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        this.hideWelcomeMessage();
        this.updateStatus('Loading DICOM files...');
        
        try {
          await this.viewerService.loadDicomFiles(input.files);
          this.updateStatus(`Loaded ${input.files.length} file(s)`);
        } catch (error) {
          console.error('Error loading files:', error);
          this.updateStatus('Error loading files');
        }
      }
    });
  }

  private setupToolbarButtons(): void {
    document.getElementById('zoomIn')?.addEventListener('click', () => {
      this.viewerService.zoom(1.2);
      this.updateStatus('Zoomed in');
    });

    document.getElementById('zoomOut')?.addEventListener('click', () => {
      this.viewerService.zoom(0.8);
      this.updateStatus('Zoomed out');
    });

    document.getElementById('reset')?.addEventListener('click', () => {
      this.viewerService.resetView();
      this.updateStatus('View reset');
    });

    document.getElementById('pan')?.addEventListener('click', () => {
      this.viewerService.setTool('pan');
      this.updateStatus('Pan tool activated');
    });

    document.getElementById('windowLevel')?.addEventListener('click', () => {
      this.viewerService.setTool('windowLevel');
      this.updateStatus('Window/Level tool activated');
    });
  }

  private hideWelcomeMessage(): void {
    const welcomeMessage = document.getElementById('welcomeMessage');
    if (welcomeMessage) {
      welcomeMessage.style.display = 'none';
    }
  }

  private updateStatus(message: string): void {
    const statusElement = document.getElementById('statusText');
    if (statusElement) {
      statusElement.textContent = message;
    }
  }
}
