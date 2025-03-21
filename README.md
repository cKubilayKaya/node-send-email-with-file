# Node.js ile E-posta Gönderme Uygulaması

Bu proje, Node.js kullanarak e-posta gönderme işlemi gerçekleştiren bir uygulamadır. Nodemailer kütüphanesi kullanılarak e-posta gönderebilirsiniz. Ayrıca, dosya ekleme (attachment) özelliği de desteklenmektedir.

## Teknolojiler

- Node.js
- Express.js
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

Proje kök dizininde .env dosyasını oluşturun ve aşağıdaki gibi yapılandırın:

```bash
APP_PORT=5000

EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password

UPLOAD_FILE_SIZE=1
```

### 4. E-posta Göndermek İçin Gerekli Ayarlar

- emailConfig.js dosyasındaki SMTP ayarlarını, kullandığınız e-posta servisiyle uyumlu olacak şekilde yapılandırın.
- Nodemailer ile e-posta gönderebilmek için ilgili SMTP sunucu bilgilerini kullanmanız gerekmektedir.

### 5. Sunucuyu Başlatın

Sunucuyu başlatmak için şu komutu çalıştırın:

```bash
npm run dev
```

### API Kullanımı

## POST /send-email

Bu endpoint, e-posta göndermek için kullanılır. İstek, aşağıdaki parametrelerle yapılmalıdır:

# Body Parametreleri

- **to**: Gönderilecek e-posta adresi (String)
- **subject**: E-posta konusu (String)
- **text**: Düz metin olarak gönderilecek içerik (String)
- **html**: HTML formatında içerik (String)
- **files**: Dosya ekleri (Array of files - Maksimum 5 dosya)

# Örnek İstek

```bash
POST http://localhost:5000/send-email
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

# Başarılı Yanıt

E-posta başarılı bir şekilde gönderildiyse, aşağıdaki gibi bir yanıt alırsınız:

```json
{
  "success": true,
  "message": "E-posta başarıyla gönderildi!"
}
```

# Hatalı Yanıt

E-posta gönderme sırasında bir hata oluşursa, aşağıdaki gibi bir hata mesajı alırsınız:

```json
{
  "error": "E-posta gönderilemedi"
}

```

### Dosya Yükleme

E-posta ile dosya ekleri gönderebilirsiniz. Yükleme işlemi Multer kütüphanesi ile yapılır ve şu özellikler geçerlidir:

- **Maksimum dosya boyutu**: 1MB
- **Maksimum dosya sayısı**: 5 (Bu sınır aşıldığında hata mesajı alınır)
- **Geçerli dosya türleri**: JPEG, PNG, GIF, PDF

### Proje Yapısı

```bash
/src
  /config
    emailConfig.js        # E-posta yapılandırma dosyası
  /controllers
    emailController.js    # E-posta gönderme işlemleri
  /middleware
    uploadMiddleware.js   # Multer hata yönetimi
  /routes
    emailRoutes.js        # E-posta gönderme rotası
  /services
    emailService.js       # E-posta gönderme servisi
  /uploads
    /mail                 # Yüklenen dosyaların burada saklandığı klasör
  /utils
    upload.js             # Multer konfigürasyonu ve dosya yükleme ayarları
  app.js                  # Ana uygulama dosyası
  server.js               # Express sunucu başlatma
```