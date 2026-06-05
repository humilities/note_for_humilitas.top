---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Humilitas Occidit Superbiam"
  text: "duoduo"
  tagline: i love the way you lie
  actions:
    - theme: brand
      text: 🎯 cf
      link: /algorithm
    - theme: alt
      text: ⚙️ Neovim 
      link: /nvim
    - theme: alt
      text: 📚 关于我
      link: /about

features:
  - icon: 💻
    title: 技术笔记
    details: 前端开发、后端技术、工具使用
    link: /tech
  
  - icon: 🎯
    title: 算法学习
    details: Codeforces 刷题记录
    link: /algorithm
  
  - icon: ⚙️
    title: 工具配置
    details: Neovim、终端、开发环境等工具
    link: /nvim
  
  - icon: 📚
    title: 学习笔记
    details: 课程学习、书籍阅读、技术文档
    link: /notes
  
  - icon: 🔧
    title: 项目实践
    details: 个人项目开发记录
    link: /projects
  
  - icon: 💭
    title: 思考随笔
    details: 随笔记录
    link: /thoughts
---

<!-- 自定义首页内容 -->
<div class="home-extra">
  <div class="stats-section">
    <h2>Superbiam</h2>
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-number">1</div>
        <div class="stat-label">个多多</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">2</div>
        <div class="stat-label">个少少</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">3</div>
        <div class="stat-label">个火枪手</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">4</div>
        <div class="stat-label">个手指头</div>
      </div>
    </div>
  </div>
</div>

<style scoped>
.home-extra {
  max-width: 1200px;
  margin: 80px auto;
  padding: 0 24px;
}

.stats-section h2 {
  text-align: center;
  font-size: 2.5rem;
  background: linear-gradient(135deg, #3b2630 0%, #be185d 48%, #ec4899 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 3rem;
  text-shadow: 0 0 32px rgba(244, 114, 182, 0.22);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.stat-card {
  background: linear-gradient(135deg, rgba(255, 250, 244, 0.58), rgba(244, 114, 182, 0.1));
  backdrop-filter: blur(18px) saturate(170%);
  -webkit-backdrop-filter: blur(18px) saturate(170%);
  border: 1px solid rgba(255, 250, 244, 0.66);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 18px 50px rgba(128, 74, 92, 0.14);
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, transparent, rgba(255, 250, 244, 0.48), transparent);
  transform: translateX(-120%);
  transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}

.stat-card:hover::before {
  transform: translateX(120%);
}

.stat-card:hover {
  transform: translateY(-10px) scale(1.05);
  border-color: rgba(244, 114, 182, 0.5);
  box-shadow: 0 20px 60px rgba(236, 72, 153, 0.3);
}

.stat-number {
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #3b2630 0%, #ec4899 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #715761;
  font-size: 1rem;
}

@media (max-width: 768px) {
  .stats-section h2 {
    font-size: 2rem;
  }
  
  .stat-number {
    font-size: 2.5rem;
  }
}
</style>
