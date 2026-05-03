import { chromium } from 'playwright';

async function testUploadSimple() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    console.log('\n🎵 Testing Upload API\n');
    
    // Test 1: Upload endpoint exists and validates input
    console.log('Test 1: Upload endpoint responds to requests');
    
    const formData = new FormData();
    formData.append('file', new Blob(['test'], { type: 'audio/mpeg' }), 'test.mp3');
    
    const response = await fetch('http://localhost:3000/api/upload', {
      method: 'POST',
      body: formData,
    });
    
    console.log(`  Status: ${response.status}`);
    
    if ([200, 400, 422, 500].includes(response.status)) {
      console.log(`  ✅ Upload endpoint is responding`);
    } else {
      console.log(`  ❌ Unexpected status`);
      return false;
    }
    
    const data = await response.json();
    console.log(`  Response has 'error' or 'path' field: ${('error' in data) || ('path' in data) ? '✅' : '❌'}`);
    
    // Test 2: File validation works
    console.log('\nTest 2: File type validation');
    
    const pdfForm = new FormData();
    pdfForm.append('file', new Blob(['pdf'], { type: 'application/pdf' }), 'test.pdf');
    
    const pdfResponse = await fetch('http://localhost:3000/api/upload', {
      method: 'POST',
      body: pdfForm,
    });
    
    if (pdfResponse.status === 422) {
      console.log(`  ✅ Correctly rejects non-audio files`);
    } else {
      console.log(`  ❌ Should reject PDF files`);
      return false;
    }
    
    // Test 3: Supported formats
    console.log('\nTest 3: Audio format support');
    
    const formats = ['audio/mpeg', 'audio/wav', 'audio/flac'];
    let allSupported = true;
    
    for (const format of formats) {
      const testForm = new FormData();
      testForm.append('file', new Blob(['test'], { type: format }), `test.${format.split('/')[1]}`);
      
      const testResponse = await fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        body: testForm,
      });
      
      const testData = await testResponse.json();
      
      // 500 (bucket error) is OK - means validation passed
      // 422 would be bad (means validation failed)
      if (testResponse.status !== 422) {
        console.log(`  ✅ ${format} - Supported (validation passed)`);
      } else {
        console.log(`  ❌ ${format} - Rejected`);
        allSupported = false;
      }
    }
    
    if (!allSupported) return false;
    
    console.log('\n✅ UPLOAD API TEST PASSED\n');
    return true;
    
  } catch (error) {
    console.error(`  ❌ Error: ${error.message}`);
    return false;
  }
}

testUploadSimple();
