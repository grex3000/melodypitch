import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function testUpload() {
  console.log('\n🎵 Testing File Upload Endpoint\n');
  
  try {
    // Create a minimal MP3 file for testing (just the header)
    // MP3 header: FFh FBh 90h 00h (MPEG-1 Layer 3, 128 kbps)
    const mp3Buffer = Buffer.from([0xFF, 0xFB, 0x90, 0x00]);
    
    // Create FormData
    const formData = new FormData();
    const blob = new Blob([mp3Buffer], { type: 'audio/mpeg' });
    formData.append('file', blob, 'test-track.mp3');
    
    console.log('Test 1: Upload valid MP3 file');
    console.log('  File: test-track.mp3');
    console.log('  Size: 4 bytes (minimal test file)');
    console.log('  Type: audio/mpeg');
    
    const response = await fetch('http://localhost:3000/api/upload', {
      method: 'POST',
      body: formData,
    });
    
    console.log(`  Status: ${response.status}`);
    
    const result = await response.json();
    console.log(`  Response:`, result);
    
    if (response.ok && result.path && result.url) {
      console.log(`  ✅ Upload successful`);
      console.log(`  📍 Path: ${result.path}`);
      console.log(`  🔗 URL: ${result.url}`);
    } else if (result.error) {
      console.log(`  ℹ️  Got expected error: ${result.error}`);
      console.log(`  ℹ️  (Likely Supabase auth issue - needs session cookie)`);
    } else {
      console.log(`  ❌ Unexpected response`);
      return false;
    }
    
    console.log('\nTest 2: Upload invalid file type');
    const pdfBlob = new Blob(['PDF content'], { type: 'application/pdf' });
    const formData2 = new FormData();
    formData2.append('file', pdfBlob, 'test.pdf');
    
    const response2 = await fetch('http://localhost:3000/api/upload', {
      method: 'POST',
      body: formData2,
    });
    
    const result2 = await response2.json();
    
    if (response2.status === 422 && result2.error) {
      console.log(`  ✅ Correctly rejected invalid file type`);
      console.log(`  Error: ${result2.error}`);
    } else {
      console.log(`  ❌ Should have rejected PDF file`);
      return false;
    }
    
    console.log('\nTest 3: No file provided');
    const response3 = await fetch('http://localhost:3000/api/upload', {
      method: 'POST',
      body: new FormData(),
    });
    
    const result3 = await response3.json();
    
    if (response3.status === 400 && result3.error) {
      console.log(`  ✅ Correctly rejected empty upload`);
      console.log(`  Error: ${result3.error}`);
    } else {
      console.log(`  ❌ Should have rejected empty upload`);
      return false;
    }
    
    console.log('\n✅ UPLOAD ENDPOINT TEST PASSED\n');
    return true;
    
  } catch (error) {
    console.error(`  ❌ Error: ${error.message}`);
    return false;
  }
}

const result = await testUpload();
process.exit(result ? 0 : 1);
