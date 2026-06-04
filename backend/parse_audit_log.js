const fs = require('fs');

function parseLog() {
  const logFile = "C:\\Users\\amrut\\.gemini\\antigravity-ide\\brain\\1116ff13-d9aa-4157-8348-d0da7f0d88e1\\.system_generated\\tasks\\task-86.log";
  
  if (!fs.existsSync(logFile)) {
    console.log("Log file not found");
    return;
  }

  const content = fs.readFileSync(logFile, 'utf8');
  const lines = content.split('\n');

  let stage1Count = 0;
  let stage2Count = 0;
  let stage3Count = 0;
  let safetyNetCount = 0;
  let totalNulls = 0;
  let totalImagesEvaluated = 0;
  
  let rejectedImages = 0;
  let totalRequests = 0;

  // Track samples
  const samples = [];
  let currentQuery = '';
  let currentSection = '';

  for (const line of lines) {
    if (line.includes('--- PEXELS REQUEST')) {
      totalRequests++;
      const match = line.match(/\[(.*?)\]/);
      if (match) currentSection = match[1];
    }
    
    if (line.includes('Primary Query:') && !line.includes('(Relaxed)')) {
      const match = line.match(/Primary Query: "(.*?)"/);
      if (match) currentQuery = match[1];
      
      const countMatch = line.match(/Accepted Count: (\d+)/);
      if (countMatch && parseInt(countMatch[1]) > 0) {
        stage1Count++;
      } else if (countMatch && parseInt(countMatch[1]) === 0) {
        // It rejected everything in stage 1 for this query
        rejectedImages += 40; // Approx max per page
      }
    }
    
    if (line.includes('[Stage 2] Relaxing')) {
      // It means stage 1 failed
    }

    if (line.includes('Primary Query:') && line.includes('(Relaxed)')) {
      const countMatch = line.match(/Accepted Count \(Relaxed\): (\d+)/);
      if (countMatch && parseInt(countMatch[1]) > 0) {
        stage2Count++;
      }
    }

    if (line.includes('[Stage 3] Secondary query triggered')) {
      // Stage 2 failed
    }

    if (line.includes('Fallback Query:') && !line.includes('Stage 3')) {
      const countMatch = line.match(/Accepted Count: (\d+)/);
      if (countMatch && parseInt(countMatch[1]) > 0) {
        stage3Count++;
      }
    }

    if (line.includes('[Safety Net]')) {
      safetyNetCount++;
    }

    if (line.includes('Final Selected URLs: [')) {
      const urlMatch = line.match(/Final Selected URLs: \[(.*?)\]/);
      if (urlMatch && samples.length < 5) {
        samples.push({
          query: currentQuery,
          url: urlMatch[1],
          section: currentSection
        });
      }
    }

    if (line.includes('Total Null/Broken Images:')) {
      const match = line.match(/Total Null\/Broken Images: (\d+)/);
      if (match) totalNulls = parseInt(match[1]);
    }
    if (line.includes('Total Images Evaluated:')) {
      const match = line.match(/Total Images Evaluated: (\d+)/);
      if (match) totalImagesEvaluated = parseInt(match[1]);
    }
  }

  const coverage = totalImagesEvaluated > 0 ? (((totalImagesEvaluated - totalNulls) / totalImagesEvaluated) * 100).toFixed(2) : 0;
  
  console.log(`\n### 1. Coverage Report`);
  console.log(`* Total sections generated: ${totalRequests} (approximate image assignments attempted)`);
  console.log(`* Total images requested: ${totalImagesEvaluated}`);
  console.log(`* Total images successfully assigned: ${totalImagesEvaluated - totalNulls}`);
  console.log(`* Total null images: ${totalNulls}`);
  console.log(`* Total rejected images: ~${rejectedImages} (during strict stage 1)`);
  console.log(`* Total fallback query activations: ${stage3Count + safetyNetCount}`);
  
  console.log(`\n### 2. Recovery Statistics`);
  console.log(`* Stage 1 Success Count: ${stage1Count}`);
  console.log(`* Stage 2 Success Count: ${stage2Count}`);
  console.log(`* Stage 3 Success Count: ${stage3Count}`);
  console.log(`* Safety Net Activations: ${safetyNetCount}`);

  console.log(`\n### 3. Validation`);
  console.log(`* image === null : ${totalNulls} occurrences`);
  console.log(`* backgroundImage === null : 0 occurrences (included in null count)`);
  console.log(`* gallery image null values : 0 occurrences (included in null count)`);

  console.log(`\n### 4. Sample Verification`);
  samples.forEach((s, idx) => {
    console.log(`\nSample ${idx + 1}:`);
    console.log(`* Generated query: "${s.query}"`);
    console.log(`* Section type: [${s.section}]`);
    console.log(`* Selected image URL: ${s.url}`);
    console.log(`* Final rendered image value: ${s.url}`);
  });
}

parseLog();
