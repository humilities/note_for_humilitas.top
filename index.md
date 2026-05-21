---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Humilitas Occidit Superbiam"
  text: "谦逊战胜傲慢"
  tagline: 记录技术探索 · 分享学习心得 · 沉淀思考碎片
  actions:
    - theme: brand
      text: 🎯 算法刷题
      link: /algorithm
    - theme: alt
      text: ⚙️ Neovim 配置
      link: /nvim
    - theme: alt
      text: 📚 关于我
      link: /about

features:
  - icon: 💻
    title: 技术笔记
    details: 前端开发、后端技术、工具使用，记录日常开发中的技术要点和解决方案
    link: /tech
  
  - icon: 🎯
    title: 算法学习
    details: Codeforces 刷题记录，算法思路分析，数据结构深度解析
    link: /algorithm
  
  - icon: ⚙️
    title: 工具配置
    details: Neovim、终端、开发环境等工具的配置心得和使用技巧
    link: /nvim
  
  - icon: 📚
    title: 学习笔记
    details: 课程学习、书籍阅读、技术文档的整理与总结
    link: /notes
  
  - icon: 🔧
    title: 项目实践
    details: 个人项目开发记录，从想法到实现的完整过程
    link: /projects
  
  - icon: 💭
    title: 思考随笔
    details: 关于学习方法、技术思考、生活感悟的随笔记录
    link: /thoughts
---

<!-- 自定义首页内容 -->
<div class="home-extra">
  <div class="stats-section">
    <h2>📊 学习统计</h2>
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-number">75+</div>
        <div class="stat-label">篇笔记</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">12</div>
        <div class="stat-label">个分类</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">186</div>
        <div class="stat-label">天坚持</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">3.2k</div>
        <div class="stat-label">次访问</div>
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
  background: linear-gradient(135deg, #3b82f6 0%, #ec4899 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 3rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.stat-card {
  background: rgba(26, 34, 56, 0.6);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(236, 72, 153, 0.2);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.stat-card:hover {
  transform: translateY(-10px) scale(1.05);
  border-color: #ec4899;
  box-shadow: 0 15px 50px rgba(236, 72, 153, 0.3);
}

.stat-number {
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #3b82f6 0%, #ec4899 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #9ca3af;
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
