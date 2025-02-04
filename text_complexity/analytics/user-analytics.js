class ReadingMetricsTracker {
    constructor() {
      this.startTime = Date.now();
      this.wordCount = 0;
      this.misreads = 0;
      this.quizScores = [];
      
      // Text selection tracking
      document.addEventListener('selectionchange', this.handleTextSelection);
      // Input tracking for corrections
      document.addEventListener('input', this.handleInputCorrection);
    }
  
    handleTextSelection = () => {
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        this.wordCount += selection.toString().split(/\s+/).length;
      }
    };
  
    handleInputCorrection = (event) => {
      if (event.data === ' ' || event.inputType === 'insertText') {
        this.misreads++;
      }
    };
  
    getMetrics() {
      const elapsedMinutes = (Date.now() - this.startTime) / 60000;
      return {
        wpm: Math.round(this.wordCount / elapsedMinutes),
        errorRate: (this.misreads / this.wordCount * 100).toFixed(2),
        comprehension: this.quizScores.length > 0 ? 
          this.quizScores.reduce((a,b) => a + b) / this.quizScores.length : 0
      };
    }
  }
  
  class AnalyticsDB {
    constructor() {
      this.dbName = 'ReadingAnalytics';
      this.storeName = 'UserMetrics';
      this.compressionLevel = 3;  // 1-9 where 9 is max compression
      
      if (!('indexedDB' in window)) {
        console.error('IndexedDB not supported');
        return;
      }
      
      this.db = indexedDB.open(this.dbName, 1);
      this.db.onupgradeneeded = (event) => {
        const db = event.target.result;
        db.createObjectStore(this.storeName, { keyPath: 'timestamp' });
      };
    }
  
    async saveMetrics(metrics) {
      const compressed = LZString.compressToUTF16(JSON.stringify({
        ...metrics,
        timestamp: Date.now()
      }));
  
      return new Promise((resolve, reject) => {
        const transaction = this.db.result.transaction([this.storeName], 'readwrite');
        const store = transaction.objectStore(this.storeName);
        store.put({ timestamp: Date.now(), data: compressed });
        
        transaction.oncomplete = resolve;
        transaction.onerror = reject;
      });
    }
  
    async getMetrics() {
      return new Promise((resolve) => {
        const transaction = this.db.result.transaction([this.storeName], 'readonly');
        const store = transaction.objectStore(this.storeName);
        const request = store.getAll();
  
        request.onsuccess = (event) => {
          const decompressed = event.target.result.map(entry => 
            JSON.parse(LZString.decompressFromUTF16(entry.data))
          );
          resolve(decompressed);
        };
      });
    }
  }
  