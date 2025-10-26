# 聯絡我們頁面開發待辦事項

## 專案概述

建立一個聯絡我們頁面，讓瀏覽者可以透過 Resend 發送郵件到公司信箱。

**使用服務**: Resend（現代化郵件發送服務）  
**公司信箱**: 123@gmail.com

---

## 📋 待辦事項清單

### 1️⃣ 環境設定與套件安裝

#### 1.1 安裝必要的 npm 套件

- [x] 安裝 `resend`（現代化郵件發送服務）
- [x] 安裝 `zod`（用於表單驗證）

#### 1.2 建立環境變數檔案

- [ ] 建立 `.env.local` 檔案
- [ ] 設定以下環境變數：
  - `RESEND_API_KEY`（Resend API 金鑰）
  - `COMPANY_EMAIL`（收件者信箱：123@gmail.com）
- [ ] 建立 `.env.example` 作為環境變數範本
- [ ] 確認 `.env.local` 已加入 `.gitignore`

---

### 2️⃣ 後端 API 開發

#### 2.1 建立郵件發送服務

- [ ] 建立 `src/lib/email.ts` 或 `src/services/email.ts`
- [ ] 配置 Resend 客戶端
- [ ] 建立發送郵件的函式
- [ ] 處理 API 錯誤

#### 2.2 建立 API Route

- [ ] 建立 `src/app/api/contact/route.ts`
- [ ] 實作 POST 方法接收表單資料
- [ ] 驗證請求資料（使用 zod）
- [ ] 呼叫郵件發送服務
- [ ] 回傳適當的 HTTP 狀態碼和訊息
- [ ] 處理錯誤情況（例如：API 呼叫失敗、驗證失敗）

#### 2.3 安全性處理

- [ ] 實作 rate limiting（防止濫用）
- [ ] 驗證 email 格式
- [ ] 防止 XSS 攻擊（清理輸入內容）
- [ ] 考慮加入 CAPTCHA（可選）

---

### 3️⃣ 前端頁面開發

#### 3.1 建立聯絡我們頁面

- [ ] 建立 `src/app/contact/page.tsx`
- [ ] 設定頁面基本結構和 metadata
- [ ] 確保頁面符合網站整體設計風格

#### 3.2 建立表單元件

- [ ] 建立 `src/components/contact/ContactForm.tsx`（或類似名稱）
- [ ] 實作表單欄位：
  - **對方信箱**（email input，必填）
  - **標題**（text input，必填）
  - **內容**（textarea，必填）
- [ ] 加入表單驗證（前端驗證）
- [ ] 處理表單狀態（loading、success、error）
- [ ] 實作送出按鈕（含 loading 狀態）

#### 3.3 表單樣式設計

- [ ] 使用 Tailwind CSS 設計表單樣式
- [ ] 加入 focus 狀態樣式
- [ ] 加入錯誤訊息顯示樣式
- [ ] 確保響應式設計（手機、平板、桌面）
- [ ] 加入適當的 spacing 和 layout

#### 3.4 使用者體驗優化

- [ ] 加入成功訊息提示
- [ ] 加入錯誤訊息提示
- [ ] 送出後清空表單
- [ ] 加入表單送出中的 loading 動畫
- [ ] 禁用重複送出（防止多次點擊）

---

### 4️⃣ 型別定義

- [ ] 建立 `src/types/contact.ts`（或在適當位置）
- [ ] 定義表單資料的 TypeScript interface
- [ ] 定義 API 回應的型別
- [ ] 確保前後端型別一致

---

### 5️⃣ 導航整合

- [ ] 在 Header/導航列中加入「聯絡我們」連結
- [ ] 確認路由正確導向 `/contact` 頁面

---

### 6️⃣ 測試與驗證

#### 6.1 功能測試

- [ ] 測試表單送出功能
- [ ] 驗證郵件是否成功發送到 123@gmail.com
- [ ] 測試各種錯誤情況（例如：空白欄位、無效 email）
- [ ] 測試 API 呼叫失敗的錯誤處理
- [ ] 在 Resend Dashboard 查看郵件發送狀態

#### 6.2 UI/UX 測試

- [ ] 測試不同裝置的響應式設計
- [ ] 測試表單驗證訊息顯示
- [ ] 測試 loading 和成功/錯誤狀態

#### 6.3 安全性測試

- [ ] 測試 XSS 防護
- [ ] 測試 rate limiting
- [ ] 確認敏感資訊不會暴露在前端

---

### 7️⃣ 文件與部署準備

- [ ] 更新 README.md，加入環境變數設定說明
- [ ] 撰寫簡單的使用文件
- [ ] 確認 production 環境的 Resend API Key 設定流程

---

## 📝 注意事項

### Resend 設定說明

**為什麼選擇 Resend？**

1. ✅ **超級簡單**：只需要一個 API key，無需複雜的 SMTP 設定
2. ✅ **現代化**：專為 Next.js、React 等現代框架設計
3. ✅ **免費額度充足**：每月 3,000 封郵件（聯絡表單綽綽有餘）
4. ✅ **穩定可靠**：專業郵件服務，不會被封鎖
5. ✅ **監控完整**：提供 Dashboard 查看郵件發送狀態
6. ✅ **支援自訂網域**：可以使用自己的網域發送郵件

**取得 API Key 的步驟：**

1. 前往 [https://resend.com](https://resend.com) 註冊帳號
2. 登入後前往 [API Keys](https://resend.com/api-keys) 頁面
3. 點擊「Create API Key」
4. 輸入名稱（例如：Website Contact Form）
5. 選擇權限：Sending access
6. 複製產生的 API key（格式：`re_xxxxxxxxxx`）
7. 將 API key 填入 `.env.local` 的 `RESEND_API_KEY`

**關於發件地址（From Address）：**

- 📧 **目前使用** `onboarding@resend.dev` 作為發件地址（Resend 的測試地址）
- ✅ 這個地址可以直接使用，適合測試和開發階段
- 🏢 **自訂網域**：如果您有自己的網域，可以在 Resend 後台驗證後使用自訂發件地址
  - 例如：`noreply@yourdomain.com` 或 `contact@yourdomain.com`
  - 驗證步驟：在 Resend Dashboard 的 [Domains](https://resend.com/domains) 頁面新增您的網域並完成 DNS 設定
  - 使用自訂網域可以提升郵件的專業度和信任度

### 其他替代方案

如果 Resend 不適合，也可以考慮：

- **SendGrid**（免費 100 封/天）
- **Mailgun**（免費 5,000 封/月，前 3 個月）
- **Postmark**（免費 100 封/月）
- **AWS SES**（便宜但設定複雜）

---

## 🎯 優先順序

**Phase 1 - 核心功能**（必須完成）

- 環境設定與套件安裝
- 後端 API 開發
- 前端表單基本功能

**Phase 2 - 使用者體驗**（重要）

- 表單樣式優化
- 錯誤處理和訊息提示
- Loading 狀態

**Phase 3 - 進階功能**（可選）

- Rate limiting
- CAPTCHA
- 更複雜的驗證邏輯

---

## 📂 預計建立的檔案

```
/Users/yellowd/Desktop/code/side_project/official-website-template/
├── .env.local （新增）
│   └── RESEND_API_KEY=re_xxxxxxxxxx
│   └── COMPANY_EMAIL=123@gmail.com
├── .env.example （新增）
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts （新增 - 使用 Resend API）
│   │   └── contact/
│   │       └── page.tsx （新增）
│   ├── components/
│   │   └── contact/
│   │       └── ContactForm.tsx （新增）
│   ├── lib/
│   │   └── email.ts （新增 - Resend 郵件服務）
│   └── types/
│       └── contact.ts （新增）
└── package.json （修改 - 加入 resend 套件）
```

---

## ✅ 完成標準

專案完成時應達到以下標準：

1. ✅ 使用者可以在 `/contact` 頁面填寫表單
2. ✅ 表單包含：對方信箱、標題、內容（textarea）
3. ✅ 送出後透過 Resend API 發送郵件到 123@gmail.com
4. ✅ 所有欄位都有適當的驗證
5. ✅ 顯示清楚的成功/錯誤訊息
6. ✅ 響應式設計在各種裝置上都能正常運作
7. ✅ 不會暴露敏感資訊（Resend API Key 等）
8. ✅ 有基本的安全防護措施（rate limiting）
9. ✅ 可在 Resend Dashboard 查看郵件發送記錄

---

**建立時間**: 2025-10-25  
**狀態**: 待開始  
**預計完成時間**: 依實作複雜度而定
