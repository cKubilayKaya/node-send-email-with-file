# Node.js ile E-posta Gönderme Uygulaması

Bu proje, Node.js kullanarak e-posta gönderme işlemi gerçekleştiren bir uygulamadır. Nodemailer kütüphanesi kullanılarak e-posta gönderebilirsiniz. Ayrıca, dosya ekleme (attachment) özelliği de desteklenmektedir.

## Teknolojiler

- Node.js
- Express.js
- Prisma
- PostgreSQL
- Nodemailer
- Multer (Dosya yükleme için)

## Kurulum

### 1. Depoyu Klonlayın

```bash
git clone https://github.com/cKubilayKaya/node-send-email-with-file.git
cd node-send-email-with-file
```

### 2. Gerekli Paketleri Yükleyin

Proje dizinine gidip gerekli bağımlılıkları yüklemek için şu komutu çalıştırın:

```bash
npm install
```

### 3. .env Dosyasını Konfigüre Edin

Proje kök dizininde `.env` dosyasını oluşturun ve aşağıdaki gibi yapılandırın:

```bash
APP_PORT=5000

EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password

UPLOAD_FILE_SIZE=1

DATABASE_URL="databaseurl"
```

### 4. E-posta Göndermek İçin Gerekli Ayarlar

- `emailConfig.js` dosyasındaki SMTP ayarlarını, kullandığınız e-posta servisiyle uyumlu olacak şekilde yapılandırın.
- Nodemailer ile e-posta gönderebilmek için ilgili SMTP sunucu bilgilerini kullanmanız gerekmektedir.

### 5. Sunucuyu Başlatın

Sunucuyu başlatmak için şu komutu çalıştırın:

```bash
npm run dev
```

# API Kullanımı

### POST `/api/send-email`

Bu endpoint, e-posta göndermek için kullanılır. İstek, aşağıdaki parametrelerle yapılmalıdır:

### Body Parametreleri

- **to**: Gönderilecek e-posta adresi (String)
- **subject**: E-posta konusu (String)
- **text**: Düz metin olarak gönderilecek içerik (String)
- **html**: HTML formatında içerik (String)
- **files**: Dosya ekleri (Array of files - Maksimum 5 dosya)

### Örnek İstek

```bash
POST http://localhost:5000/api/send-email
Content-Type: multipart/form-data

{
  "to": "recipient@example.com",
  "subject": "Test E-posta",
  "text": "Bu, test amaçlı gönderilen bir e-postadır.",
  "html": "<p>Bu, test amaçlı gönderilen bir <b>HTML</b> e-postadır.</p>",
  "files": [
    {
      "file": "path_to_file/file1.png"
    },
    {
      "file": "path_to_file/file2.pdf"
    }
  ]
}
```

### Başarılı Yanıt

E-posta başarılı bir şekilde gönderildiyse, aşağıdaki gibi bir yanıt alırsınız:

```json
{
  "success": true,
  "message": "E-posta başarıyla gönderildi!"
}
```

### GET `/api/get-emails`

Bu endpoint, bütün e-postaları döndürmek için kullanılır. İstek, aşağıdaki parametrelerle yapılmalıdır:

### Örnek İstek

```bash
GET http://localhost:5000/api/get-emails
```

### Başarılı Yanıt

E-posta başarılı bir şekilde gönderildiyse, aşağıdaki gibi bir yanıt alırsınız:

```json
{
    "success": true,
    "data": [
        {
            "id": "5ca32aef-4b5f-4a07-a70e-7fa2ad438b3c",
            "to": "kkubilay24@gmail.com",
            "subject": "Şifre Sıfırlama Talebi",
            "body": "<h1>Şifre sıfırlama kodu:</h1>",
            "attachments": [
                "src/uploads/mail/icons8-5-star-hotel-32 (1).png",
                "src/uploads/mail/kubilay-kaya-frontend-cv.pdf"
            ],
            "createdAt": "2025-03-21T09:23:54.559Z"
        },
        {
            "id": "50a5ca82-587b-49af-95b1-87ef27fb8d0c",
            "to": "vkubilaykaya@gmail.com",
            "subject": "Giriş Yapma Sorunu",
            "body": "<h1>sorun var:</h1>",
            "attachments": [
                "src/uploads/mail/test.jpg"
            ],
            "createdAt": "2025-03-21T09:25:45.130Z"
        },
        {
            "id": "af37598f-abe6-45a0-8a0a-78c90f97784c",
            "to": "kkubilay24@gmail.com",
            "subject": "asdadada",
            "body": "<h1>erererevar:</h1>",
            "attachments": [
                "src/uploads/mail/test.jpg"
            ],
            "createdAt": "2025-03-21T09:31:01.855Z"
        },
        {
            "id": "3b888281-8f81-4674-90d3-147d714858d1",
            "to": "kkubilay24@gmail.com",
            "subject": "Şifre Sıfırlama Talebi",
            "body": "<h1>Şifre Sıfırlama Kodu:</h1>",
            "attachments": [
                "src/uploads/mail/test.jpg"
            ],
            "createdAt": "2025-03-21T09:32:33.418Z"
        }
    ]
}
```

### GET `/api/get-email/:id`

Bu endpoint, belirli id'ye ait bir maili döndürmek için kullanılır. İstek, aşağıdaki parametrelerle yapılmalıdır:

### Örnek İstek

```bash
GET http://localhost:5000/api/get-email/5ca32aef-4b5f-4a07-a70e-7fa2ad438b3c
```

### Başarılı Yanıt

E-posta başarılı bir şekilde gönderildiyse, aşağıdaki gibi bir yanıt alırsınız:

```json
{
    "success": true,
    "data": {
        "id": "5ca32aef-4b5f-4a07-a70e-7fa2ad438b3c",
        "to": "kkubilay24@gmail.com",
        "subject": "Şifre Sıfırlama Talebi",
        "body": "<h1>Şifre sıfırlama kodu:</h1>",
        "attachments": [
            "src/uploads/mail/icons8-5-star-hotel-32 (1).png",
            "src/uploads/mail/kubilay-kaya-frontend-cv.pdf"
        ],
        "createdAt": "2025-03-21T09:23:54.559Z"
    }
}
```

# Dosya Yükleme

E-posta ile dosya ekleri gönderebilirsiniz. Yükleme işlemi **Multer** kütüphanesi ile yapılır ve şu özellikler geçerlidir:

- **Maksimum dosya boyutu**: 1MB
- **Maksimum dosya sayısı**: 5 (Bu sınır aşıldığında hata mesajı alınır)
- **Geçerli dosya türleri**: JPEG, PNG, GIF, PDF