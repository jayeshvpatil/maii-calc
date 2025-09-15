import fs from 'fs';
import path from 'path';
import archiver from 'archiver';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createHubSpotEmbeddedModule() {
    const sourceDir = path.join(__dirname, 'hubspot-module');
    const outputDir = path.join(__dirname, 'dist');
    const zipPath = path.join(outputDir, 'hubspot-embedded-calculator.zip');

    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Create zip archive
    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
        console.log(`✅ HubSpot Embedded Calculator Module created: ${zipPath}`);
        console.log(`📦 Total bytes: ${archive.pointer()}`);
        console.log('');
        console.log('📋 Package Contents:');
        console.log('   • module-embedded-full.html - Full embedded calculator (no external dependencies)');
        console.log('   • module-csp-fixed.html - CSP-compatible iframe version');  
        console.log('   • meta-csp-fixed.json - Module metadata');
        console.log('');
        console.log('🚀 Upload Instructions:');
        console.log('   1. Upload hubspot-embedded-calculator.zip to HubSpot Design Manager');
        console.log('   2. Use module-embedded-full.html for complete embedded calculator');
        console.log('   3. Use module-csp-fixed.html for iframe-based calculator');
        console.log('   4. Both versions are optimized for HubSpot\'s CSP restrictions');
    });

    output.on('error', (err) => {
        console.error('❌ Error creating zip file:', err);
    });

    archive.on('error', (err) => {
        console.error('❌ Error creating archive:', err);
        throw err;
    });

    archive.pipe(output);

    // Add files to archive
    const filesToInclude = [
        'module-embedded-full.html',
        'module-csp-fixed.html', 
        'meta-csp-fixed.json'
    ];

    for (const file of filesToInclude) {
        const filePath = path.join(sourceDir, file);
        if (fs.existsSync(filePath)) {
            archive.file(filePath, { name: file });
            console.log(`📁 Added: ${file}`);
        } else {
            console.warn(`⚠️  File not found: ${file}`);
        }
    }

    // Finalize the archive
    await archive.finalize();
}

// Run the build
createHubSpotEmbeddedModule().catch(console.error);