const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.webp': 'image/webp'
};

const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);
    
    // リクエストURLからパスを取得
    let filePath = req.url;
    
    // URLがルートの場合はindex.htmlを提供
    if (filePath === '/') {
        filePath = '/index.html';
    }
    
    // パスを解決
    filePath = path.resolve(__dirname + filePath);
    
    // ファイルの拡張子を取得
    const ext = path.extname(filePath);
    
    // ファイルが存在するか確認
    fs.stat(filePath, (err, stats) => {
        if (err) {
            // ファイルが見つからない場合は404を返す
            if (err.code === 'ENOENT') {
                console.error(`File not found: ${filePath}`);
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404 Not Found');
                return;
            }
            
            // その他のエラーは500として処理
            console.error(`Server error: ${err}`);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500 Internal Server Error');
            return;
        }
        
        // ディレクトリの場合はindex.htmlを探す
        if (stats.isDirectory()) {
            filePath = path.join(filePath, 'index.html');
        }
        
        // ファイルを読み込む
        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.error(`Error reading file: ${err}`);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('500 Internal Server Error');
                return;
            }
            
            // MIMEタイプを設定
            const contentType = MIME_TYPES[ext] || 'application/octet-stream';
            
            // レスポンスヘッダーを設定
            res.writeHead(200, { 'Content-Type': contentType });
            
            // ファイルの内容を送信
            res.end(data);
        });
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log(`Press Ctrl+C to stop the server`);
});