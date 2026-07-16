/**
 * Avant Browser Web Server
 * A simple, dependency-free Node.js static web server.
 * Serves the landing page and the absetup.exe installer.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.exe': 'application/octet-stream',
    '.ico': 'image/x-icon',
    '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);

    // Standardize URL path to resolve files
    let filePath = req.url === '/' ? '/index.html' : req.url;
    
    // Resolve absolute path in workspace
    const absolutePath = path.join(__dirname, filePath);

    // Basic security check: ensure request path doesn't escape the directory
    if (!absolutePath.startsWith(__dirname)) {
        res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Acesso proibido.');
        return;
    }

    // Check if file exists
    fs.stat(absolutePath, (err, stats) => {
        if (err || !stats.isFile()) {
            res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end('<h1>404 - Arquivo Não Encontrado</h1><p>O recurso solicitado não está disponível neste servidor local.</p>');
            return;
        }

        // Get extension to determine Content-Type
        const ext = path.extname(absolutePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';

        // Set headers
        const headers = {
            'Content-Type': contentType,
            'Content-Length': stats.size
        };

        // If serving the installer executable, set attachment disposition to force download dialog
        if (ext === '.exe') {
            headers['Content-Disposition'] = 'attachment; filename="absetup.exe"';
        }

        res.writeHead(200, headers);

        // Stream the file content to the client (highly memory efficient)
        const fileStream = fs.createReadStream(absolutePath);
        fileStream.on('error', (streamErr) => {
            console.error('Erro ao ler arquivo:', streamErr);
            if (!res.headersSent) {
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('Erro interno do servidor ao transmitir o arquivo.');
            }
        });
        fileStream.pipe(res);
    });
});

server.listen(PORT, () => {
    console.log('\n==================================================');
    console.log('  Servidor do Avant Browser Iniciado com Sucesso!  ');
    console.log(`  Acesse em seu navegador: http://localhost:${PORT} `);
    console.log('  Pressione Ctrl+C para encerrar o servidor.     ');
    console.log('==================================================\n');
});
