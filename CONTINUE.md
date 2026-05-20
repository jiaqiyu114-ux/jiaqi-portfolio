# CONTINUE.md — jiaqi-portfolio 项目状态

> 最后更新：2026-05-19  
> 用途：下次打开项目时快速恢复上下文，对齐状态再继续开发。

---

## 一、如何本地运行

```bash
cd E:\claude-projects\jiaqi-portfolio
npm run dev
```

浏览器访问：`http://localhost:3000`

构建验证：
```bash
npm run lint     # 0 错误
npm run build    # Turbopack 静态构建
```

---

## 二、当前项目状态

**已完成：大规模 Cinematic Reboot — V2**

| 轮次 | 内容 |
|---|---|
| V1 初始化 | Next.js 16 + TypeScript + Tailwind v4 + Framer Motion + Lucide React |
| Round 1–4 | Hero video + liquid glass + VisualWorks kinetic gallery + film-credit Contact |
| V2 Cinematic Reboot | 全面逼近 Aetheris Voyage 效果：Hero inset container + serif italic giant headline + Capabilities glass cards + 4-section 精简结构 |

**Lint + Build 状态：✅ 全部通过，0 错误**

---

## 三、当前页面结构（4 个 section）

```
page.tsx:
  <GlobalAtmosphere />   ← fixed 背景光晕层
  <Navbar />             ← liquid glass pill，移动端仅显示 logo + CTA
  <Hero />               ← 全屏 inset rounded container + video + serif italic headline
  <Capabilities />       ← 2×2 glass card grid，替代原 Building/Proof/Principles/CurrentFocus
  <VisualWorks />        ← 3 行流动作品墙（机制不变）
  <Contact />            ← Cinematic ending，超大标题
```

**停止渲染的旧 section（文件保留）：**
- Building.tsx
- Identity.tsx
- ProofOfWork.tsx
- Principles.tsx
- CurrentFocus.tsx

---

## 四、完整文件结构

```
jiaqi-portfolio/
├── CLAUDE.md
├── CONTINUE.md
├── site-brief.md
├── next.config.ts
├── package.json
│
├── public/
│   ├── hero-bg.mp4            ← 唯一视频文件（Hero background）
│   ├── hero-poster.jpg        ← 视频 poster（加载前显示）
│   └── works/*.webp           ← 7 张 VisualWorks 图片
│
└── src/
    ├── app/
    │   ├── globals.css        ← liquid-glass / glass-card / noise / gallery keyframes
    │   ├── layout.tsx         ← <link> 字体加载（fonts.loli.net）
    │   └── page.tsx           ← 4 section 组装入口
    │
    ├── lib/
    │   └── content.ts         ← ★ 所有文案，改内容只改这一个文件
    │
    └── components/
        ├── Navbar.tsx          ← liquid glass pill，移动端简化
        │
        ├── ui/
        │   ├── GlobalAtmosphere.tsx
        │   ├── FadeUp.tsx
        │   ├── WordsPullUp.tsx
        │   ├── AmbientBackground.tsx
        │   ├── CinematicVisual.tsx
        │   └── MediaFrame.tsx
        │
        └── sections/
            ├── Hero.tsx        ← ★ V2：inset container + video + Instrument Serif italic
            ├── Capabilities.tsx ← ★ V2 新建：2×2 glass card，替代 Systems/Building
            ├── VisualWorks.tsx  ← 保留，标题改为 VISUAL ARCHIVE.
            ├── Contact.tsx      ← Cinematic ending，超大 Cinzel 标题
            │
            ├── Building.tsx     ← 已停止渲染（不删除）
            ├── Identity.tsx     ← 已停止渲染（不删除）
            ├── ProofOfWork.tsx  ← 已停止渲染（不删除）
            ├── Principles.tsx   ← 已停止渲染（不删除）
            └── CurrentFocus.tsx ← 已停止渲染（不删除）
```

---

## 五、V2 核心设计决策

### Hero — Inset Rounded Container

```
section（bg-black, p-3 md:p-5, min-h: 100dvh, flex col）
  └── inner div（rounded-[2rem], overflow-hidden, border, flex-1）
        ├── video（absolute inset-0, object-cover）
        ├── gradient overlay（top/bottom dark, middle open）
        ├── side vignette
        ├── noise overlay（opacity 0.13）
        └── content（z-10, flex col, h-full）
              ├── flex-1 spacer
              └── bottom content:
                    pill → headline → subtitle + CTA → 3 stat cards
```

主标题字体：Instrument Serif, italic, uppercase  
尺寸：`clamp(4.8rem, 9vw, 10rem)`, line-height 0.82, tracking -0.05em

### Capabilities — 2×2 Glass Cards

```
section（id=capabilities, bg-black, border-top）
  ├── background atmosphere（3 个 radial glow，blur 80-120px）
  └── content:
        header: label + "SYSTEMS EVOLVED." (Instrument Serif italic)
        grid: grid-cols-1 sm:grid-cols-2, gap-4 md:gap-5
        每张卡片（glass-card class）:
          [top]   number (left)  +  tags chips (right)
          [flex-1 spacer]
          [bottom] title + description
```

### VisualWorks — 不变的流动机制

- 3 行 CSS transform 流动，无 JS
- `gallery-drift-left` / `gallery-drift-right` keyframes in globals.css
- 固定乱序数组：ROW_A/B/C_IDX，禁止 Math.random()
- 标题内容更新为 "VISUAL ARCHIVE."

### Navbar — Mobile 简化

- 桌面：logo + 分隔符 + 4 nav links + 分隔符 + CTA button
- 移动：logo + CTA button（nav links 隐藏）

---

## 六、颜色 + 字体系统（不变）

```
主文字:   #E1E0CC / rgba(220,218,210,*)
body bg:  #040608
card bg:  glass-card class（rgba(255,255,255,0.04) + blur）
border:   rgba(255,255,255,0.09–0.14)
```

字体：
- Almarai：body sans（400/700/800）
- Instrument Serif italic：Hero headline + Capabilities headline（editorial大标题）
- Cinzel：VisualWorks headline + Contact headline（全大写 display）

---

## 七、内容填写指南

**改内容只需编辑 `src/lib/content.ts`**

| 字段 | 位置 | 当前状态 |
|---|---|---|
| `contact.email` | content.ts → contact | `jiaqiyu114@gmail.com` ✅ |
| `contact.links[*].href` | content.ts → contact | `#`（待填真实链接） |
| `hero.pillLabel` | content.ts → hero | 占位文案 |
| `capabilities.items` | content.ts → capabilities | 可调整描述 |

---

## 八、VisualWorks 图片新增方法

**Step 1** — 添加图片到 `public/works/your-work.webp`

**Step 2** — 在 content.ts `visualWorks.items` 末尾追加元数据

**Step 3** — 在 VisualWorks.tsx 中：
```ts
// 1. WORK_SIZE 加映射
"/works/your-work.webp": "tall-large",
// 2. ROW_A/B/C_IDX 加新 index（不用 Math.random()）
```

**Step 4** — `npm run lint && npm run build`

---

## 九、下一步可做的事

### 高优先级
- [ ] **填写真实链接** — GitHub / Twitter / LinkedIn href in contact.links
- [ ] **移动端验证** — 在 375px 设备上检查 Hero 标题大小、Capabilities 卡片布局
- [ ] **视频检查** — 确认 hero-bg.mp4 在当前网络下正常加载，poster 图清晰

### 中优先级
- [ ] **OG / SEO** — layout.tsx 补充 openGraph + twitter metadata
- [ ] **favicon** — 替换 public/favicon.ico
- [ ] **Contact 链接** — 当社交链接确认后更新 content.ts

### 低优先级
- [ ] 增加 /work 或 /writing 子页面
- [ ] 暗/亮色切换
- [ ] Vercel 部署

---

## 十、技术栈速查

| 技术 | 版本 | 说明 |
|---|---|---|
| Next.js | 16.2.6 | App Router，Turbopack 构建 |
| React | 19.2.4 | |
| TypeScript | ^5 | |
| Tailwind CSS | ^4 | CSS-based config via `@theme` |
| Framer Motion | latest | fade-up, scale-in, entrance animation |
| Lucide React | latest | ArrowUpRight |
| Instrument Serif | Google Fonts | Editorial italic headline |
| Cinzel | Google Fonts | Uppercase display (VisualWorks, Contact) |
| Almarai | Google Fonts | Body sans，via fonts.loli.net |
