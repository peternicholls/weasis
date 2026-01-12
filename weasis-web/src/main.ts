/**
 * Weasis Web - Main Application Entry Point
 * 
 * This is the starting point for the web-based DICOM viewer.
 * It initializes the Cornerstone library and sets up the basic viewer functionality.
 */

import { DicomViewerService } from './services/DicomViewerService';
import { UIController } from './services/UIController';

class WeasisWebApp {
  private viewerService: DicomViewerService;
  private uiController: UIController;

  constructor() {
    this.viewerService = new DicomViewerService();
    this.uiController = new UIController(this.viewerService);
  }

  async init(): Promise<void> {
    try {
      console.log('Initializing Weasis Web Viewer...');
      
      // Initialize viewer service
      await this.viewerService.init();
      
      // Initialize UI controllers
      this.uiController.init();
      
      this.updateStatus('Ready');
      console.log('Weasis Web Viewer initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Weasis Web Viewer:', error);
      this.updateStatus('Initialization failed');
    }
  }

  private updateStatus(message: string): void {
    const statusElement = document.getElementById('statusText');
    if (statusElement) {
      statusElement.textContent = message;
    }
  }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  const app = new WeasisWebApp();
  await app.init();
});

export { WeasisWebApp };
