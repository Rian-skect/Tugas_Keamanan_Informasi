const resultDiv = document.getElementById('result');
const encryptionForm = document.getElementById('encryptionForm');
const generateKeyBtn = document.getElementById('generateKeyBtn');

generateKeyBtn.addEventListener('click', () => {
    const key = CryptoJS.lib.WordArray.random(32).toString(CryptoJS.enc.Base64);
    document.getElementById('key').value = key;
});

encryptionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const plaintext = document.getElementById('plaintext').value;
    const key = document.getElementById('key').value;
    const mode = document.querySelector('input[name="mode"]:checked').value;

    if (mode === 'encrypt') {
        const ciphertext = encryptAES(plaintext, key);
        resultDiv.innerHTML = `<div class='alert alert-success'><i class='fas fa-lock'></i> Hasil Enkripsi: ${ciphertext}</div>`;
    } else {
        const decrypted = decryptAES(plaintext, key);
        resultDiv.innerHTML = `<div class='alert alert-success'><i class='fas fa-lock-open'></i> Hasil Dekripsi: ${decrypted}</div>`;
    }
});

function encryptAES(plaintext, key) {
    const encrypted = CryptoJS.AES.encrypt(plaintext, CryptoJS.enc.Utf8.parse(key), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
}

function decryptAES(ciphertext, key) {
    const decrypted = CryptoJS.AES.decrypt(ciphertext, CryptoJS.enc.Utf8.parse(key), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
}