// Fungsi untuk menghasilkan matriks berdasarkan ukuran yang dipilih
function generateMatrix(matrixName) {
    const rows = parseInt(document.getElementById(`rows${matrixName}`).value);
    const cols = parseInt(document.getElementById(`cols${matrixName}`).value);
    const container = document.getElementById(`matrix${matrixName}`);
    
    container.innerHTML = '';
    container.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const input = document.createElement('input');
            input.type = 'number';
            input.value = Math.floor(Math.random() * 10);
            input.id = `matrix${matrixName}_${i}_${j}`;
            input.className = 'matrix-input';
            input.step = 'any';
            container.appendChild(input);
        }
    }
}

// Fungsi untuk mendapatkan nilai dari matriks
function getMatrix(matrixName) {
    const rows = parseInt(document.getElementById(`rows${matrixName}`).value);
    const cols = parseInt(document.getElementById(`cols${matrixName}`).value);
    
    if (rows <= 0 || cols <= 0) {
        throw new Error('Ukuran matriks tidak valid');
    }
    
    const matrix = [];
    
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            const element = document.getElementById(`matrix${matrixName}_${i}_${j}`);
            if (!element) {
                throw new Error(`Elemen matriks ${matrixName}[${i}][${j}] tidak ditemukan`);
            }
            const value = parseFloat(element.value) || 0;
            row.push(value);
        }
        matrix.push(row);
    }
    
    return matrix;
}

// Fungsi untuk menampilkan hasil matriks
function displayResult(matrix) {
    const container = document.getElementById('result');
    container.innerHTML = '';
    
    if (!matrix || matrix.length === 0 || !matrix[0] || matrix[0].length === 0) {
        container.innerHTML = '<p class="error">Tidak ada hasil untuk ditampilkan atau matriks kosong</p>';
        return;
    }
    
    const rows = matrix.length;
    const cols = matrix[0].length;
    
    container.style.display = 'grid';
    container.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    container.style.gap = '5px';
    container.style.justifyContent = 'center';
    
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const div = document.createElement('div');
            div.textContent = matrix[i][j];
            div.className = 'matrix-cell';
            div.style.padding = '10px';
            div.style.border = '1px solid #ddd';
            div.style.borderRadius = '5px';
            div.style.textAlign = 'center';
            div.style.backgroundColor = '#f8f9fa';
            container.appendChild(div);
        }
    }
}

// Fungsi penjumlahan matriks
function addMatrices() {
    try {
        const matrixA = getMatrix('A');
        const matrixB = getMatrix('B');
        
        if (matrixA.length !== matrixB.length || matrixA[0].length !== matrixB[0].length) {
            throw new Error('Ukuran matriks tidak sama untuk penjumlahan!');
        }
        
        const result = [];
        for (let i = 0; i < matrixA.length; i++) {
            const row = [];
            for (let j = 0; j < matrixA[0].length; j++) {
                row.push(matrixA[i][j] + matrixB[i][j]);
            }
            result.push(row);
        }
        
        displayResult(result);
    } catch (error) {
        displayResult(null);
        document.getElementById('result').innerHTML = `<p class="error">${error.message}</p>`;
    }
}

// Fungsi pengurangan matriks
function subtractMatrices() {
    try {
        const matrixA = getMatrix('A');
        const matrixB = getMatrix('B');
        
        if (matrixA.length !== matrixB.length || matrixA[0].length !== matrixB[0].length) {
            throw new Error('Ukuran matriks tidak sama untuk pengurangan!');
        }
        
        const result = [];
        for (let i = 0; i < matrixA.length; i++) {
            const row = [];
            for (let j = 0; j < matrixA[0].length; j++) {
                row.push(matrixA[i][j] - matrixB[i][j]);
            }
            result.push(row);
        }
        
        displayResult(result);
    } catch (error) {
        displayResult(null);
        document.getElementById('result').innerHTML = `<p class="error">${error.message}</p>`;
    }
}

// Fungsi perkalian matriks
function multiplyMatrices() {
    try {
        const matrixA = getMatrix('A');
        const matrixB = getMatrix('B');
        
        if (matrixA[0].length !== matrixB.length) {
            throw new Error('Jumlah kolom matriks A harus sama dengan jumlah baris matriks B!');
        }
        
        const result = [];
        for (let i = 0; i < matrixA.length; i++) {
            const row = [];
            for (let j = 0; j < matrixB[0].length; j++) {
                let sum = 0;
                for (let k = 0; k < matrixA[0].length; k++) {
                    sum += matrixA[i][k] * matrixB[k][j];
                }
                row.push(sum);
            }
            result.push(row);
        }
        
        displayResult(result);
    } catch (error) {
        displayResult(null);
        document.getElementById('result').innerHTML = `<p class="error">${error.message}</p>`;
    }
}

// Fungsi transpose matriks
function transposeMatrix(matrixName) {
    try {
        const matrix = getMatrix(matrixName);
        const rows = matrix.length;
        const cols = matrix[0].length;
        
        const result = [];
        for (let j = 0; j < cols; j++) {
            const row = [];
            for (let i = 0; i < rows; i++) {
                row.push(matrix[i][j]);
            }
            result.push(row);
        }
        
        displayResult(result);
    } catch (error) {
        displayResult(null);
        document.getElementById('result').innerHTML = `<p class="error">${error.message}</p>`;
    }
}

// Fungsi clear semua
function clearAll() {
    document.getElementById('result').innerHTML = '<p>Hasil akan muncul di sini...</p>';
}

// Inisialisasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    generateMatrix('A');
    generateMatrix('B');
    clearAll();
    
    // Tambahkan tombol ekspor
    const operationsDiv = document.querySelector('.operations');
    const exportBtn = document.createElement('button');
    exportBtn.textContent = 'Export Hasil';
    exportBtn.onclick = exportResult;
    operationsDiv.appendChild(exportBtn);
});

// Fungsi untuk validasi input
function validateInput(input) {
    if (isNaN(input.value) || input.value === '') {
        input.value = 0;
    }
}

// Event listener untuk input matriks
document.addEventListener('input', function(e) {
    if (e.target.classList.contains('matrix-input')) {
        validateInput(e.target);
    }
});

// Fungsi untuk menyimpan matriks ke localStorage
function saveMatrix(matrixName) {
    try {
        const matrix = getMatrix(matrixName);
        localStorage.setItem(`matrix${matrixName}`, JSON.stringify(matrix));
    } catch (error) {
        console.error('Gagal menyimpan matriks:', error);
    }
}

// Fungsi untuk memuat matriks dari localStorage
function loadMatrix(matrixName) {
    try {
        const saved = localStorage.getItem(`matrix${matrixName}`);
        if (saved) {
            const matrix = JSON.parse(saved);
            const rows = matrix.length;
            const cols = matrix[0].length;
            
            document.getElementById(`rows${matrixName}`).value = rows;
            document.getElementById(`cols${matrixName}`).value = cols;
            
            generateMatrix(matrixName);
            
            setTimeout(() => {
                for (let i = 0; i < rows; i++) {
                    for (let j = 0; j < cols; j++) {
                        const element = document.getElementById(`matrix${matrixName}_${i}_${j}`);
                        if (element) {
                            element.value = matrix[i][j];
                        }
                    }
                }
            }, 10);
        }
    } catch (error) {
        console.error('Gagal memuat matriks:', error);
    }
}

function exportResult() {
    const resultContainer = document.getElementById('result');
    const cells = resultContainer.querySelectorAll('.matrix-cell');

    if (cells.length === 0) {
        alert('Tidak ada hasil untuk diekspor!');
        return;
    }

    // Hitung jumlah kolom berdasarkan grid
    const computedStyle = window.getComputedStyle(resultContainer);
    const gridColumns = computedStyle.gridTemplateColumns;
    const cols = gridColumns.split(' ').length;

    // Ambil isi teks dari hasil matriks
    let matrixText = '';
    let count = 0;

    cells.forEach(cell => {
        matrixText += cell.textContent + '\t';
        count++;
        if (count % cols === 0) {
            matrixText += '\n';
        }
    });

    // Pilihan ekspor: PDF dan TXT
    const exportType = prompt('Ketik "pdf" untuk ekspor PDF, atau "txt" untuk ekspor teks:', 'pdf');

    if (exportType && exportType.toLowerCase() === 'pdf') {
        // Ekspor sebagai PDF menggunakan jsPDF
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.setFont('Courier', 'normal');
        doc.setFontSize(12);
        doc.text('Hasil Matriks:', 10, 10);

        const lines = matrixText.split('\n');
        let y = 20;
        lines.forEach(line => {
            doc.text(line.trim(), 10, y);
            y += 8;
        });

        doc.save('hasil_matriks.pdf');
    } else {
        // Ekspor sebagai file teks
        const blob = new Blob([matrixText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'hasil_matriks.txt';
        a.click();
        URL.revokeObjectURL(url);
    }
}
