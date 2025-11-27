import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import '../styles/pages/DetailPage.css';

function HPHDetailPage() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleBack = () => {
    navigate('/', { state: { targetSection: 'hph', fromDetailPage: true } });
  };

  return (
    <div className="detail-page-container">
      <nav className="detail-nav">
        <button onClick={handleBack} className="back-btn">←</button>
      </nav>

      <main className="detail-content page-container">
        {/* ========== 第1段：封面 + 技术概述 ========== */}
        <section className="section-block">
          <h1>超高压纳米破碎 + HPH超高压动态非热灭菌 = 全营养</h1>
          <p>在饮品、食品、化妆品、制药、新能源、生物、化工、中药酒类、染料、矿物等行业的应用</p>
          
          <img 
            src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/505ae4162eb4ae37979ff727407b2e2ad5c43295baba1410e802387208cc2020.jpg" 
            alt="NNP全营养技术" 
            className="full-width-img" 
          />

          <h3>NNP全营养 NanoNutriPreserve</h3>
        </section>

        <hr />

        {/* ========== 第2段：破碎特点 ========== */}
        <section className="section-block">
          <h2>破碎特点 / Breaking Features</h2>
          <h3>超高压纳米破碎头 | 全营养综合型/H型均质阀</h3>
          
          <div className="grid-2">
            <div>
              <img 
                src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/421152cadac85cc8da1e81e00be288aedd79fdd54d389ab1e75ee301d5074d5b.jpg" 
                alt="全营养综合型均质阀" 
              />
            </div>
            <div>
              <p><strong>优势：</strong>该结构较H型、Y型均质头对于物料的破碎与剥离效果有明显提升。</p>
              <p>该系统支持模块化扩展，通过在出料端配置H型均质模块进行二次处理，可达成纳米级分散与多相体系均质化的双重工艺目标，特别适用于多组分物料的深度处理需求。</p>
            </div>
          </div>
        </section>

        <hr />

        {/* ========== 第3段：纳米破碎效果 + 数据表 ========== */}
        <section className="section-block">
          <h2>超高压纳米破碎效果</h2>
          <h3>全营养综合型均质阀</h3>

          <div className="grid-2">
            <div>
              <img 
                src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/87c724087977cc1ad044bf957e45931d1a83b1c790616105cf472ab50fb2addd.jpg" 
                alt="粒径分布曲线" 
              />
            </div>
            <div>
              <table>
                <tbody>
                  <tr>
                    <td colSpan="4" style={{background:'#e8e8e0', fontWeight:'bold'}}>Size Distribution</td>
                    <td colSpan="2" style={{background:'#e8e8e0', fontWeight:'bold'}}>Lognormal By Intensity</td>
                  </tr>
                  <tr>
                    <td>Particle Ref. Index, Real:</td><td>1.59</td>
                    <td>Particle Ref. Index, Imag.:</td><td>9.00</td>
                    <td>Diam. 10 (nm):</td><td>105.48</td>
                  </tr>
                  <tr>
                    <td>Mean Diam. By Intensity:</td><td>217.24</td>
                    <td>Rel. Variance By Intensity:</td><td>0.00</td>
                    <td>Diam. 50 (nm):</td><td>282.62</td>
                  </tr>
                  <tr>
                    <td>Mean Diam. By Volume:</td><td>217.23</td>
                    <td>Rel. Variance By Volume:</td><td>0.00</td>
                    <td>Diam. 90 (nm):</td><td>757.25</td>
                  </tr>
                  <tr>
                    <td>Mean Diam. By Number:</td><td>217.21</td>
                    <td>Rel. Variance By Number:</td><td>0.00</td>
                    <td>Lognormal GSD:</td><td>2.16</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <h3>样品均质效果:</h3>
          <ul>
            <li>纤维素纳米晶长度 100～200 nm；</li>
            <li>甲壳素纳米晶直径 50～70 nm；</li>
            <li>石墨烯制备剥离可达单层；</li>
            <li>脂质体可以做到 100nm 以下；</li>
            <li>食品样品制备可达纳米级别，纯绿色，无添加，保质期常温状态下可达六个月。</li>
          </ul>
        </section>

        <hr />

        {/* ========== 第4段：HPH 超高压动态非热灭菌 ========== */}
        <section className="section-block">
          <h2>HPH超高压动态非热灭菌 (High Pressure Homogenization, HPH)</h2>
          <h3>全营养综合型均质阀</h3>
          
          <img 
            src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/c49a60d1e1e9551eb0f83442f854c8e8669e791f2393b098866179f2976611a3.jpg" 
            alt="HPH工作原理" 
          />

          <h3>核心机制：</h3>
          <p>通过300～1000兆帕（MPa）超高压力驱动果汁高速通过微米级均质阀，直接对果汁、细胞纤维以及细菌，在极短时间（毫秒级）内经历三重物理作用：</p>
          <ul>
            <li><strong>空穴效应：</strong>压力骤降引发液体内部空化气泡瞬间爆裂（即"空爆"），产生局部冲击波；</li>
            <li><strong>湍流剪切：</strong>果汁被加速至超音速 (&gt;300 m/s)，形成高强度剪切力；</li>
            <li><strong>碰撞破碎：</strong>高速射流撞击阀芯或对向射流，进一步粉碎固体颗粒。</li>
          </ul>

          <h3>灭菌效果：</h3>
          <p>上述作用力直接破坏微生物细胞结构（细胞膜撕裂、细胞器解体），实现物理灭活，通过多次破碎，对革兰氏阴性菌（如大肠杆菌）灭杀率可达 <strong style={{color: '#2d5016'}}>100%</strong>。</p>
          
          <img 
            src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/e9d1836715c3fa25bcd4a818aae47456baaa18f800bc84f6180bb7ef308feb16.jpg" 
            alt="技术优势示意图" 
          />

          <h3>技术独特优势：</h3>
          <ul>
            <li><strong>同步均破碎：</strong>在灭菌同时破碎果肉颗粒（粒径可降至100nm～150nm），提升果汁稳定性（无沉淀分层）；</li>
            <li><strong>低温高效：</strong>全程低温，保留热敏性营养素（如维生素C、多酚）；</li>
            <li><strong>连续化生产：</strong>适用于工业化管道式流水线，处理能力达5～10吨/小时。</li>
          </ul>

          <h3>应用领域：</h3>
          <ul>
            <li><strong>酸性果汁（例：橙汁、苹果汁）：</strong>主流应用领域，可替代巴氏杀菌；</li>
            <li><strong>浑浊型饮品（例：芒果浆、番茄汁）：</strong>兼具灭菌与稳定乳液的双重作用；</li>
            <li><strong>高附加值产品：</strong>需保留天然风味与营养的NFC（非浓缩还原）果汁。</li>
          </ul>
        </section>

        <hr />

        {/* ========== 第5段：灭菌数据 ========== */}
        <section className="section-block">
          <h2>灭菌效果数据</h2>
          
          <h3>45°C时各压力条件下的灭菌情况</h3>
          <img 
            src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/1c88ec0796db681a823c0ecc52652a5c9d9a1fdb165d8ae3fbc5a8e696b8273c.jpg" 
            alt="灭菌图表" 
          />
          <p className="text-sub">* 摘自论文《超高压水射流对微生物的杀灭效果研究》</p>

          <h3>不同压力下4种菌的致死率</h3>
          <table>
            <thead>
              <tr><th>压力</th><th>大肠杆菌</th><th>金黄色葡萄球菌</th><th>黑曲霉</th><th>酿酒酵母</th></tr>
            </thead>
            <tbody>
              <tr><td>50MPa</td><td>50.4%</td><td>26.2%</td><td>23.9%</td><td>27.4%</td></tr>
              <tr><td>100MPa</td><td>64.2%</td><td>53.2%</td><td>42.0%</td><td>87.0%</td></tr>
              <tr><td>150MPa</td><td>69.4%</td><td>63.0%</td><td>60.5%</td><td style={{color: '#2d5016', fontWeight: 'bold'}}>100%</td></tr>
              <tr><td>200MPa</td><td>71.6%</td><td>79.1%</td><td style={{color: '#2d5016', fontWeight: 'bold'}}>100%</td><td style={{color: '#2d5016', fontWeight: 'bold'}}>100%</td></tr>
              <tr><td>250MPa</td><td>82.3%</td><td>81.4%</td><td style={{color: '#2d5016', fontWeight: 'bold'}}>100%</td><td style={{color: '#2d5016', fontWeight: 'bold'}}>100%</td></tr>
              <tr><td>300MPa</td><td>90.5%</td><td>94.3%</td><td style={{color: '#2d5016', fontWeight: 'bold'}}>100%</td><td style={{color: '#2d5016', fontWeight: 'bold'}}>100%</td></tr>
              <tr><td>350MPa</td><td style={{color: '#2d5016', fontWeight: 'bold'}}>99.6%</td><td style={{color: '#2d5016', fontWeight: 'bold'}}>98.0%</td><td style={{color: '#2d5016', fontWeight: 'bold'}}>100%</td><td style={{color: '#2d5016', fontWeight: 'bold'}}>100%</td></tr>
            </tbody>
          </table>

          <h3>葡萄原汁测试</h3>
          <div>
            <div>
              <p><strong>物料：</strong>葡萄原汁</p>
              <p><strong>压力：</strong>330MPa</p>
              <p><strong>纳米破碎次数：</strong>4次</p>
              
              <h4>微生物指标：</h4>
              <table>
                <thead>
                  <tr><th>名称</th><th>大肠菌群(1:10)</th><th>大肠菌群(1:100)</th><th>菌落总数(1:10)</th><th>菌落总数(1:100)</th></tr>
                </thead>
                <tbody>
                  <tr><td>试前样</td><td>380</td><td>450</td><td>多不可计</td><td>9700</td></tr>
                  <tr><td>2道</td><td>40.5</td><td>1.0</td><td>多不可计</td><td>183</td></tr>
                  <tr><td>3道</td><td>5.5</td><td>1.0</td><td>229</td><td>45</td></tr>
                  <tr><td>4道</td><td style={{color: '#2d5016', fontWeight: 'bold'}}>0</td><td>0.5</td><td>8</td><td style={{color: '#2d5016', fontWeight: 'bold'}}>0</td></tr>
                </tbody>
              </table>
              
              <h4>液态饮料限量要求：</h4>
              <table>
                <thead>
                  <tr><th>检测项目</th><th>大肠菌群</th><th>菌落总数</th><th>霉菌</th><th>酵母菌</th></tr>
                </thead>
                <tbody>
                  <tr><td>国家标准</td><td>&lt;10 CFU</td><td>≤100 CFU/mL</td><td>≤50 CFU/g(mL)</td><td>≤20 CFU/g(mL)</td></tr>
                </tbody>
              </table>
              
              <blockquote>
                <p><strong>结论：</strong>大肠菌群在330MPa时，每次的灭菌比例约为90%，即经过4次破碎可以对大肠菌群进行完全灭菌。</p>
              </blockquote>
            </div>
          </div>

          {/* 新增：椰浆检测报告 */}
          <h3>椰浆测试（检验检测报告）</h3>
          <div>            
            <div>
              <p><strong>报告编号：</strong>(2025) GCZJ-5744</p>
              <p><strong>物料：</strong>椰浆（椰肉与椰汁）</p>
              <p><strong>压力：</strong>350MPa</p>
              <p><strong>纳米破碎次数：</strong>4次</p>
              
              <table>
                <thead>
                  <tr><th>检验项目</th><th>计量单位</th><th>实测值</th><th>检验依据</th></tr>
                </thead>
                <tbody>
                  <tr><td>菌落总数</td><td>CFU/mL</td><td>94</td><td>GB 4789.2-2022</td></tr>
                  <tr><td>大肠菌群</td><td>CFU/mL</td><td style={{color: '#2d5016', fontWeight: 'bold'}}>0</td><td>GB 4789.3-2025 第二法</td></tr>
                  <tr><td>霉菌</td><td>CFU/mL</td><td style={{color: '#2d5016', fontWeight: 'bold'}}>0</td><td>GB 4789.15-2016 第一法</td></tr>
                  <tr><td>酵母</td><td>CFU/mL</td><td style={{color: '#2d5016', fontWeight: 'bold'}}>0</td><td>GB 4789.15-2016 第一法</td></tr>
                </tbody>
              </table>
              
              <blockquote>
                <p><strong>结论：</strong>大肠菌群、霉菌、酵母在350MPa时，每次的灭菌达90%以上，即经过4次破碎可以对大肠菌群进行完全灭菌。菌落总数可控制到100以下。</p>
              </blockquote>
            </div>
          </div>
        </section>

        <hr />

        {/* ========== 第6段：HPH vs HPP 对比 ========== */}
        <section className="section-block">
          <h2>HPH果汁与HPP果汁对比</h2>
          <h3>总结：在保证同等灭菌效果的前提下，产能实现了5到10倍的显著提升。</h3>
          
          <div className="grid-2">
            <img 
              src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/909702be00b63c5652c8e1031d87d1c006c076cfd6f2732eb87b7f0698e333f4.jpg" 
              alt="HPH果汁" 
            />
            <img 
              src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/f496b8d89b593181f015293e66ca8fbcb2721cf998d82051880a66f717598b3c.jpg" 
              alt="HPP果汁" 
            />
          </div>

          <table>
            <thead>
              <tr><th>对比项目</th><th>HPH果汁</th><th>HPP果汁/NFC果汁</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>灭菌方式对比</strong></td>
                <td>HPH技术通过300~400兆帕超高压动力驱动果汁高速通过微米级均质阀，在极短时间内经历三重物理作用：空爆、剪切、撞击，直接破坏微生物细胞结构（细胞膜撕裂、细胞器解体），实现物理灭活。</td>
                <td>HPP技术采用400-600兆帕的压强作用于瓶装果汁，通过破坏微生物细胞膜来杀灭微生物，同时保持低温环境。这种技术被描述为"目前商业化程度最高的食品非热加工技术"。</td>
              </tr>
              <tr>
                <td><strong>工艺对比</strong></td>
                <td>即是灭菌方式，也是当前果汁行业的一个重要创新技术，在对果汁破碎的同时实现灭菌。</td>
                <td>HPP仅是灭菌方式，NFC果汁通常会采用HPP或UHT方式进行灭菌。</td>
              </tr>
              <tr>
                <td><strong>果汁对比</strong></td>
                <td>由于HPH果汁制作时，无需对水果进行去皮去渣处理，同样数量的水果，制作出的HPH果汁会多于NFC果汁，且最终呈现的果汁也会较NFC果汁浓稠，且由于经过纳米破碎处理，不易沉淀。</td>
                <td>制作NFC果汁时，需要对水果进行去皮去渣处理，根据水果不同，产生10%~40%的果渣，从而造成浪费，且生产出的果汁缺乏果肉与果皮的营养。</td>
              </tr>
              <tr>
                <td><strong>产能对比</strong></td>
                <td>由于其在线灭菌的特性，可根据需求，定制大流量的纳米破碎设备，也可将多台的纳米破碎设备进行串联与并联，从而实现产能匹配。</td>
                <td>通常HPP灭菌的方式，产能远不能满足需求，故市场上大量的NFC果汁都是UHT的方式来灭菌。</td>
              </tr>
            </tbody>
          </table>
        </section>

        <hr />

        {/* ========== 第7段：应用案例概览 ========== */}
        <section className="section-block">
          <h2>应用案例 / Application Cases</h2>
          <h3>超高压纳米破碎应用</h3>
          
          <div className="grid-4">
            <div className="case-card">
              <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/85aff104bcdcbd3ee923663aae00571cadda6ef08e3f5153b5fd2fa5d45d92f4.jpg" alt="化妆品" />
              <h4>01 化妆品</h4>
              <p>乳液、面霜，皮肤护理、防晒霜等</p>
            </div>
            <div className="case-card">
              <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/43ea1ff02a843738a8dad5084f8fa8cbd94a6889ed712dceb16e3122686ef9f1.jpg" alt="新能源" />
              <h4>02 新能源</h4>
              <p>帮助新能源分散纳米材料（CNT、硅、石墨烯等）光伏电池、燃料电池</p>
            </div>
            <div className="case-card">
              <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/9ab077d0d9c0124cde84a0dada6737aa1a1825ad990f318fd532be847c6dcf02.jpg" alt="生物技术" />
              <h4>03 生物技术</h4>
              <p>大肠杆菌、酵母细胞、真菌、细菌，帮助细胞快速破裂</p>
            </div>
            <div className="case-card">
              <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/977e0b8fe57dca7060f554356e0091e79a122a3294f5eea19cfbb7db33f60d1f.jpg" alt="果汁和饮料" />
              <h4>04 果汁和饮料</h4>
              <p>均质可以使果汁中的果肉颗粒细小化，增加汁液的稳定性和口感</p>
            </div>
            <div className="case-card">
              <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/76662f0a4ad6a13a7e756d8bb0dbdb10199c9a818ccbc34f2dfc7a04c1bd2f64.jpg" alt="化工" />
              <h4>05 化工</h4>
              <p>导电墨水和碳粉、纳米填料、聚合物粘合剂等</p>
            </div>
            <div className="case-card">
              <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/6dd1989ea1ac625fc480b114052248330117ff7eb02faaf70cea6ee8aa96d7ef.jpg" alt="营养保健品" />
              <h4>06 营养保健品</h4>
              <p>维生素、代餐粉、口服维生素喷雾剂等</p>
            </div>
            <div className="case-card">
              <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/407fcec5d58238991461d4307fb0e351e7075ce94451af5b469863fa8403f691.jpg" alt="药品" />
              <h4>07 药品</h4>
              <p>注射剂、抗生素、吸入物、麻醉药、类固醇、药膏等</p>
            </div>
            <div className="case-card">
              <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/a1331ae33f29bac074551c0ce60f65366d24864fad6621117e474332225d90bd.jpg" alt="其它" />
              <h4>08 其它</h4>
              <p>纳米分散和剥离</p>
            </div>
          </div>
        </section>

        <hr />

        {/* ========== 第8段：果汁、全茶饮、咖啡奶 ========== */}
        <section className="section-block">
          <h2>纳米破碎技术在果汁、全茶饮、咖啡奶的应用</h2>
          
          <div className="grid-3">
            <div>
              <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/01176f8f390163ea871b53c59ae305cd730e22761dd351e408a4ef6fb55f7a0b.jpg" alt="果汁" />
              <h4>果汁</h4>
              <p><strong>改善口感与稳定性：</strong>纳米破碎能够细化果汁中的固体颗粒，防止颗粒沉降。</p>
              <p><strong>外观品质提升：</strong>果汁可以达到更均匀的色泽和透明度或浑浊度，根据产品要求而定。</p>
            </div>
            <div>
              <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/6aed0942b434f60e7dd46ca85842939f13c4a9823b6bcb8e140e36581be15efa.jpg" alt="全茶饮" />
              <h4>全茶饮</h4>
              <p><strong>茶叶的细化：</strong>纳米破碎技术可以细化茶叶，使得茶叶可100%利用，并口感顺滑，色泽透明无悬浮物。</p>
              <p><strong>提升溶解度：</strong>纳米破碎处理后的全茶饮，可以提高和其他添加物的溶解度。</p>
            </div>
            <div>
              <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/767ad5252259177cfd4f6cb12000220d265630343a8ddf75a46c128afeb55c4f.jpg" alt="咖啡奶" />
              <h4>咖啡奶</h4>
              <p><strong>提升稳定性：</strong>纳米破碎咖啡奶制品可稳定乳液，防止牛奶和咖啡分离。同时也可对咖啡豆进行全破碎。</p>
              <p><strong>口感改进：</strong>通过细化牛奶中的脂肪球，纳米破碎可以创造更顺滑和丰富的口感。</p>
            </div>
          </div>
        </section>

        <hr />

        {/* ========== 第9段：豆奶对比 ========== */}
        <section className="section-block">
          <h2>纳米破碎后的豆奶与普通豆奶的比较</h2>
          
          <div className="comparison-display">
            <div className="comparison-box normal">
              <h4>普通豆奶</h4>
              <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/1e834191bf1b74cb9d3e768fb7ab1af16d7e6f6c3fa830868252aff0ab427a13.jpg" alt="普通豆奶1" />
              <p>伴随豆渣，大豆利用率不足80%，不能全部利用</p>
              <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/20aa61a70322116238cde5675e2a31528f935d80a8f872de75580f99215faecb.jpg" alt="普通豆奶2" />
              <p>口感会有颗粒感，少数人会感觉喉咙有渣，不易吞咽</p>
              <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/bb4a3c4587dc1bd3cda7c24c7185e2cadc1b1cec62db9fc4ae38929f3c3ecfcd.jpg" alt="普通豆奶3" />
              <p>仅仅经过简单的破碎，颗粒较大，不易吸收</p>
            </div>
            <div className="comparison-box enhanced">
              <h4>全豆豆奶</h4>
              <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/a1ffe2acfabaf3aff102aff05dd08dce0626b954387b4e7ce5c2e44d7f33dfba.jpg" alt="全豆豆奶1" />
              <p>全豆豆奶，<strong style={{color: '#2d5016'}}>100%利用率</strong>，长时间存放无沉淀</p>
              <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/1e66ee4600d79c321ead066592ebd4c557e9c0440e072ba4f16abf61f2119bd7.jpg" alt="全豆豆奶2" />
              <p>口感细腻，无颗粒感</p>
              <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/a1a55f8bb675c3bb809e5172375204307700a62e25b68533222ccd97c6eb84ea.jpg" alt="全豆豆奶3" />
              <p>颗粒大小 <strong style={{color: '#2d5016'}}>50～200纳米</strong>，易吸收</p>
            </div>
          </div>
        </section>

        <hr />

        {/* ========== 第10段：中草药萃取 ========== */}
        <section className="section-block">
          <h2>纳米破碎技术在中草药萃取方面的应用</h2>
          
          <div className="grid-4">
            <div>
              <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/ace7b81082f043d9e5c7f3352ff0f462889a6220b22c5484c56be89d26a191da.jpg" alt="汤剂" />
              <h4>汤剂</h4>
              <p>均质机可以将药材进行均质处理，将其转变为纳米级颗粒，显著提高药材的营养成分的溶解度和释放速度，使药效更快更好地发挥出来。</p>
            </div>
            <div>
              <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/5030da9e31f48522a206367139f156e64e92d8ef2dc36abafcecdc5f29315055.jpg" alt="膏剂" />
              <h4>膏剂</h4>
              <p>药材进行均质处理，使其成分更均匀地分散在膏剂中，提高药物的稳定性和吸收性。提高膏剂的质地和使用体验。</p>
            </div>
            <div>
              <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/c65af1b932ae89e7b2181a1358254ede39cf72b4ff4d1f8aacb5a5753130bbd3.jpg" alt="颗粒丸片剂" />
              <h4>颗粒、丸、片剂</h4>
              <p>均质机将药材进行均质处理后，使其成分更加细腻易吸收，并且药材可以100%利用，其有效成份均匀分布在颗粒或丸、片剂中。</p>
            </div>
            <div>
              <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/225bae0cf60e1ed656840085f6bd1090126b560ae1ac25e8288d6884d68c903e.jpg" alt="粉剂" />
              <h4>粉剂</h4>
              <p>通过均质机对药材进行均质处理，可制成更细腻的粉末，达到微纳米级别，更易于人体吸收。并且在生产过程中温度可控。</p>
            </div>
          </div>
        </section>

        <hr />

        {/* ========== 第11段：食品深加工（新增） ========== */}
        <section className="section-block">
          <h2>纳米破碎技术在食品方面的应用</h2>
          
          <div className="grid-4">
            <div className="case-card">
              <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/612644a8634e1038fe99e1dc959f13137bbb3715fef7b7df00c65b86a236ba62.jpg" alt="火锅底料" />
              <h4>火锅底料</h4>
              <p>充分释放菌菇的蛋白和风味成分，使汤底香气更浓郁，口感更醇厚。</p>
            </div>
            <div className="case-card">
              <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/0ef09f2c14d94556e23a00e3c213d022b481e1fff0a7c2514261e527f69cb182.jpg" alt="高鲜汤料" />
              <h4>高鲜汤料</h4>
              <p>将原料（如鸡骨架、香菇柄）纳米破碎，便于酶解，释放更多鲜味物质，使汤品鲜味层次更丰富。</p>
            </div>
            <div className="case-card">
              <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/c66696d4ff781d428f7bf6560d88c9d5be4609a1b7a146f0ae6bf05c2836c7af.jpg" alt="药食同源饮品" />
              <h4>药食同源饮品</h4>
              <p>将中药材（如天麻、石斛）细胞壁打破，释放活性成分，提高生物利用度，实现"免熬煮"的便捷饮用。</p>
            </div>
            <div className="case-card">
              <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/fed2ff1ac476753e8114ab8a35a2a03499881ed4f232910ecf9f0e0e794cc2cd.jpg" alt="农产品深加工" />
              <h4>农产品深加工</h4>
              <p>将枸杞等农产品粉碎至纳米级，突破传统工艺局限，推动产业向高附加值方向转型。</p>
            </div>
          </div>
        </section>

        <hr />

        {/* ========== 第12段：油脂分散 ========== */}
        <section className="section-block">
          <h2>纳米破碎技术在油脂分散行业的应用</h2>
          
          <div className="grid-2">
            <div>
              <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/7f0231f482b5ed0f548363680ea1af2b371ddf057034d357ada673223bde4d3c.jpg" alt="纳米破碎前" />
              <p className="text-center">纳米破碎前</p>
            </div>
            <div>
              <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/abc0aa681739d86dbdcc1234337517b865e90b623474fb66bd83636c272e23a5.jpg" alt="纳米破碎后" />
              <p className="text-center">纳米破碎后</p>
            </div>
          </div>
          
          <h4>食品行业：</h4>
          <p>在制作沙拉酱、蛋黄酱、奶油和其他乳化食品时，纳米破碎技术可以使油脂颗粒细化至纳米级，增加乳液的稳定性，防止分离。</p>
          
          <h4>化妆品行业：</h4>
          <p><strong>乳液和霜类产品：</strong>纳米破碎技术可以确保油脂和水相充分混合，形成细腻、均匀的乳化结构，提升产品的质感和皮肤吸收性。</p>
          <p><strong>防晒产品：</strong>在制作含有油脂基质的防晒霜时，纳米破碎可帮助均匀分散油脂和活性成分，提高产品的防晒效果和肤感。</p>
          
          <h4>工业应用：</h4>
          <p><strong>润滑油和润滑剂：</strong>在这些产品中，纳米破碎可以帮助分散添加剂，如抗氧化剂和极压添加剂，以增强润滑性能。</p>
        </section>

        <hr />

        {/* ========== 第13段：墨水行业 ========== */}
        <section className="section-block">
          <h2>纳米破碎技术在墨水行业的应用</h2>
          
          <div className="grid-2">
            <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/fad4f2a730e1ed2584c50c12de26aa6e3155569ef8a4156201c26a676e6fead3.jpg" alt="墨水行业" />
            <div>
              <p>纳米破碎技术在墨水行业，尤其是喷墨墨水的生产中，发挥了重要作用。这项技术利用了极端的压力来细化物料，提高分散度，从而改善最终产品的质量。</p>
              <ul>
                <li><strong>颜料分散：</strong>在喷墨墨水中，颜料颗粒需要被分散到纳米级大小，以确保喷墨打印头的顺畅运行和打印质量。纳米破碎可以有效地将颜料分散成更小的颗粒，减少团聚，同时保证墨水的稳定性。</li>
                <li><strong>提高稳定性：</strong>纳米破碎过程有助于形成更加均匀的悬浮液，减少了颜料沉降的可能性，从而提高了墨水的长期稳定性。</li>
                <li><strong>优化色彩表现：</strong>更好的分散性意味着颜色更加饱和，色彩再现更加准确，这对于高质量的打印输出非常重要。</li>
                <li><strong>环保优势：</strong>纳米破碎技术通常是一种清洁的生产方式，因为它不需要使用溶剂或其它化学物质来辅助分散过程，这有助于减少环境污染。</li>
              </ul>
            </div>
          </div>
        </section>

        <hr />

        {/* ========== 第14段：生物制药 ========== */}
        <section className="section-block">
          <h2>纳米破碎技术在生物制药行业应用</h2>
          
          <div className="grid-4">
            <div>
              <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/5c869676e303ba564af956e74f2a6dd96844def655bdbbf8d0c51d435639cdf7.jpg" alt="细胞破碎" />
              <h4>细胞破碎</h4>
              <p>纳米破碎可以用于破碎各种类型的细胞，包括细菌（如大肠杆菌）、酵母、哺乳动物细胞等，以释放细胞内的蛋白质、核酸、酶等生物活性物质。</p>
            </div>
            <div>
              <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/cc115db8abb604c715602b39a0c64ff381ec375f736d3676b1b690bf59c09e87.jpg" alt="脂质体制备" />
              <h4>脂质体制备</h4>
              <p>脂质体是一种由磷脂双层组成的囊泡，常用于药物递送系统。高压均质技术可以用来缩小脂质体的尺寸，提高其均匀性，从而改善药物的装载效率和递送效果。</p>
            </div>
            <div>
              <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/c77190ede053ece88b84d24a14f04dc38ab87b6eae4d34405a4ccf2f010f87ef.jpg" alt="生物制剂均质" />
              <h4>生物制剂的均质</h4>
              <p>在生物制剂的制备过程中，纳米破碎可以用于均质化含有生物活性成分的溶液，如疫苗、抗体和酶制剂等，确保其成分的均匀分布，提高制剂的稳定性和生物利用度。</p>
            </div>
            <div>
              <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/e73535f2306cc0aaf2f825229e9ac0a24e9ec3af24c9967280566850a20bbf2f.jpg" alt="纳米乳液制备" />
              <h4>微乳液和纳米乳液的制备</h4>
              <p>在一些生物制药产品中，需要将活性成分包裹在微乳液或纳米乳液中，以提高药物的稳定性或控制释放。纳米破碎技术能够制备出粒径小且分布均匀的乳液。</p>
            </div>
          </div>
        </section>

        <hr />

        {/* ========== 第15段：化妆品纳米化（新增） ========== */}
        <section className="section-block">
          <h2>纳米破碎技术在甲壳素、木质素、生物蛋白等纳米化在化妆品行业应用</h2>
          
          <div className="grid-3">
            <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/cbbee34a68667038c1777a4e66a46f42e908beefccbe2e9c798cd9e089d014bb.jpg" alt="化妆品应用1" />
            <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/442e0cb7258532c7f7408994b8471431e9241150e912cdaf2d666d57b2250310.jpg" alt="化妆品应用2" />
            <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/7b6fa9b194de45e30c5f1e1703ef75867df77b84478bd7986d8bef24c76e8fbe.jpg" alt="化妆品应用3" />
          </div>
          
          <h4>化妆品行业：</h4>
          <p><strong>乳液和霜类产品：</strong>纳米破碎技术可以确保油脂和水相充分混合，形成细腻、均匀的乳化结构，提升产品的质感和皮肤吸收性。</p>
          <p><strong>防晒产品：</strong>在制作含有油脂基质的防晒霜时，纳米破碎可帮助均匀分散油脂和活性成分，提高产品的防晒效果和肤感。</p>
        </section>

        <hr />

        {/* ========== 第16段：矿物原料纳米化 ========== */}
        <section className="section-block">
          <h2>纳米破碎技术在硅、碳、石墨烯等矿物原料纳米制作应用</h2>
          
          <div className="grid-4">
            <div>
              <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/8266345e65645bb77415f89583489feb92a07776410481d0f2580353ee430168.jpg" alt="纳米硅粉" />
              <h4>纳米硅粉</h4>
              <p className="text-sub">常用于锂离子电池的阳极材料，太阳能电池板以及半导体行业</p>
            </div>
            <div>
              <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/b7a3fef934772475a2507f32477385185288757f2fb1f13a91d1dce1078f3421.jpg" alt="纳米白炭黑" />
              <h4>纳米白炭黑 (SiO₂)</h4>
              <p className="text-sub">在橡胶工业中作为补强剂；在涂料和密封剂中作为增稠剂和触变剂；在化妆品中作为增稠剂和吸附剂；在药品中作为载体和助流剂等。</p>
            </div>
            <div>
              <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/440e5b9f2aea9f3ecdd22df18b271dafa8e75ee6d68f2aae1b655201aa4098df.jpg" alt="纳米石墨烯" />
              <h4>纳米石墨烯粉末</h4>
              <p className="text-sub">石墨烯因其高强度、高导电性和高热导率，在复合材料、导电油墨、储能设备和传感器等领域有广泛应用。</p>
            </div>
            <div>
              <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/e2b3d9027e43e9091b1ef30b49d9e2e78de9dd4f6b9de176c6090400ddc49664.jpg" alt="纳米碳粉" />
              <h4>纳米碳粉</h4>
              <p className="text-sub">包括导电油墨、碳纤维复合材料、催化剂载体和生物医学应用。</p>
            </div>
          </div>
        </section>

        <hr />

        {/* ========== 第17段：设备规格 - 直驱式 ========== */}
        <section className="section-block">
          <h1>超高压纳米破碎 + HPH超高压动态非热灭菌 = 全营养</h1>
          
          <h2>直驱式可调式均质阀</h2>
          <p>适用广泛 | 整线输出适用于万吨级工业化生产</p>
          
          <div className="grid-2">
            <div>
              <ul>
                <li><strong>快速高效：</strong>快速处理物料，提高生产效率；</li>
                <li><strong>精准控制：</strong>可根据需求精确调节压力和流量；</li>
                <li><strong>适用广泛：</strong>通用性强，适用于多种物料；</li>
                <li><strong>维护方便：</strong>结构简洁，方便维护和清洁；</li>
                <li><strong>最高压力：</strong>150-1000Mpa；</li>
                <li><strong>最大流量：</strong>5~20T/h。</li>
              </ul>
              <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/a8d453c6fe152944ef3c1898c98775a74b3f363253a99c977d18b1c848f9e0d5.jpg" alt="直驱式设备" />
            </div>
            <table>
              <thead>
                <tr><th>型号</th><th>最高压力(Mpa)</th><th>最大流量(L/min)</th><th>功率(KW)</th></tr>
              </thead>
              <tbody>
                <tr><td>DTNP-15系列</td><td>150/200/300</td><td>3.6/2.7/1.8</td><td>15HP(11kW)</td></tr>
                <tr><td>DTNP-20系列</td><td>150/200/300</td><td>5.0/3.7/2.5</td><td>20HP(15kW)</td></tr>
                <tr><td>DTNP-30系列</td><td>150/200/300</td><td>7.3/5.4/3.6</td><td>30HP(22kW)</td></tr>
                <tr><td>DTNP-50系列</td><td>150/200/300</td><td>12.2/9.2/6.1</td><td>50HP(37kW)</td></tr>
                <tr><td>DTNP-75系列</td><td>150/200/300</td><td>18.2/13.6/9.1</td><td>75HP(55kW)</td></tr>
                <tr><td>DTNP-100系列</td><td>150/200/300</td><td>24.8/18.6/12.4</td><td>100HP(75kW)</td></tr>
                <tr><td>DTNP-150系列</td><td>150/200/300</td><td>36.3/27.2/18.2</td><td>150HP(110kW)</td></tr>
                <tr><td>DTNP-210系列</td><td>150/200/300</td><td>52.8/39.6/26.4</td><td>210HP(160kW)</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <hr />

        {/* ========== 第18段：设备规格 - 增压式 ========== */}
        <section className="section-block">
          <h2>增压式：压力稳定 | 均质细腻</h2>
          
          <div className="grid-2">
            <div>
              <ul>
                <li><strong>可靠均质：</strong>能够将物料均质到纳米级甚至更小的粒径，使产品更加细腻、均匀；</li>
                <li><strong>压力稳定：</strong>采用先进的增压技术，确保压力稳定，均质效果一致；</li>
                <li><strong>精准控制：</strong>可根据需求精确调节压力和流量；</li>
                <li><strong>最高压力：</strong>300Mpa/1000Mpa；</li>
                <li><strong>最大流量：</strong>0.1~20L/min。</li>
              </ul>
              <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/114539b1e2bc8ccc518c25317d6b5ffc4fc0eda5d8a8b428785898aad90e930e.jpg" alt="增压式设备" />
            </div>
            <table>
              <thead>
                <tr><th>型号</th><th>最高压力(Mpa)</th><th>最大流量(L/min)</th><th>功率(KW)</th></tr>
              </thead>
              <tbody>
                <tr><td>DINP-15系列</td><td>250/300/400</td><td>1.8/1.5/1.1</td><td>15HP(11kW)</td></tr>
                <tr><td>DINP-20系列</td><td>250/300/400</td><td>2.5/2.0/1.5</td><td>20HP(15kW)</td></tr>
                <tr><td>DINP-25系列</td><td>250/300/400</td><td>3.0/2.5/1.9</td><td>25HP(18.5kW)</td></tr>
                <tr><td>DINP-30系列</td><td>250/300/400</td><td>3.6/3.0/2.2</td><td>30HP(22kW)</td></tr>
                <tr><td>DINP-40系列</td><td>250/300/400</td><td>4.9/4.1/3.1</td><td>40HP(30kW)</td></tr>
                <tr><td>DINP-50系列</td><td>250/300/400</td><td>6.0/5.0/3.8</td><td>50HP(37kW)</td></tr>
                <tr><td>DINP-60系列</td><td>250/300/400</td><td>7.4/6.1/4.6</td><td>60HP(45kW)</td></tr>
                <tr><td>DINP-75系列</td><td>250/300/400</td><td>9.0/7.5/5.6</td><td>75HP(55kW)</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <hr />

        {/* ========== 第19段：纳米破碎报告 ========== */}
        <section className="section-block">
          <h2>纳米破碎报告 / 纳米破碎效果</h2>
          <h3>Jet nano homogenizer</h3>
          
          <h4>淀粉样品的偏光显微照片</h4>
          <p className="text-sub">（a、b、c、d、e、f分别代表样品破碎0、1、2、3、4和5次后颗粒的形貌）</p>
          <div className="img-grid-gallery" style={{gridTemplateColumns: 'repeat(6, 1fr)'}}>
            <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/57732d3acd9ee6e7007b4ed980bd7717df49e917ed0a006c3f02578719028dfd.jpg" alt="淀粉a" />
            <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/12ee8d9ded49049e6a5345313bce48fcdbafbd03cc031b95e6a2bf2619798f01.jpg" alt="淀粉b" />
            <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/614bd73b8b4e099853fe0f6f0610f559367b66f911d427b6ae0f4c06c9c29476.jpg" alt="淀粉c" />
            <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/0270984eb2b14409db7db4b2e2fec4692a6e0360afadd858a37d25d110e3289a.jpg" alt="淀粉d" />
            <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/e4439212469553db590591108b2ef09362d757734928332d914711c5dc1f2366.jpg" alt="淀粉e" />
            <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/39a4f6e5e3ae60f134650e5ce2b37e5899faf6bf489717b6d096835ee4b730f7.jpg" alt="淀粉f" />
          </div>
          
          <h4>经过超高压纳米破碎处理后的淀粉胶体悬浮液</h4>
          <div className="grid-2">
            <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/bbdc8617083d485c8e87e86f7cf0f5d472e1bbaac702dce70c1156750c445884.jpg" alt="淀粉胶体悬浮液" />
            <div>
              <p><strong>样品0：</strong>未经任何处理的淀粉在水中沉淀。</p>
              <p><strong>样品1：</strong>经过1次纳米破碎后，可以看到悬浮液分为三层：透明的水层、悬浮的破碎淀粉颗粒组成的中间层、以及由完整和沉淀的大淀粉颗粒组成的底层。随着破碎次数的增加，底层变小，上层悬浮液变得黏稠，整个浆料变成可流动的溶胶。</p>
              <p><strong>样品5：</strong>经过5次循环破碎后，淀粉浆由溶胶转变为凝胶，这归因于淀粉颗粒的尺寸减小和水作为网络的一部分在有序的空间中排列。</p>
            </div>
          </div>
          
          <h4>壳聚糖纳米破碎实验</h4>
          <p>采用高压破碎技术将壳聚糖颗粒分散在水中，结果表明，所获得的纳米纤维长度约为 <strong style={{color: '#2d5016'}}>50nm</strong>，由直径为 <strong style={{color: '#2d5016'}}>1-5nm</strong> 的小束纳米原纤维组成。</p>
          
          <div className="img-grid-gallery" style={{gridTemplateColumns: 'repeat(6, 1fr)'}}>
            <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/fb9672194007b939a018b3bc5e8335886f6e27b23d964f8c95f21826b525fdfb.jpg" alt="壳聚糖1" />
            <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/c77e8ad99647a3ec718050bcd361d425b8325b3b4cc5d4a3333d7f21de4f8d01.jpg" alt="壳聚糖2" />
            <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/f1d7c90046338a70140ed4ccc29ee7a961f643dd083a63cb0a165549b1c4a517.jpg" alt="壳聚糖3" />
            <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/443fa586a85a0ef26a3eb88bf673bc3ca561697e5a05d753f1f187163e1bb886.jpg" alt="壳聚糖4" />
            <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/e087bcfbb7c3506c7b6b74627a9a8c8d4d7607671449ef63c6c59b13e9722e8b.jpg" alt="壳聚糖5" />
            <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/fdca2dd2f47f464e593b04b939a304f275d38f7772e9ade9dfaee1772ac7c807.jpg" alt="壳聚糖6" />
          </div>
          
          <p><strong>CS0原始样品：</strong>未经任何处理的原始壳聚糖在水中快速沉降。</p>
          <p><strong>CS1湿磨样品：</strong>经过强力机械研磨后，部分长而宽的CS0纤维进一步分解成CS1微纤丝。</p>
          <p><strong>CS2高压破碎样品：</strong>纳米破碎后，絮凝的壳聚糖颗粒充分悬浮在水中。高压破碎化迫使小束微纤维进一步变成更细的原纤维，观察到这些纤维是直径为10-100nm的均匀纳米纤维。这些超细纳米纤维由于高度支化而相互缠绕和缠结。</p>
        </section>

        <hr />

        {/* ========== 第20段：公司简介 ========== */}
        <section className="section-block">
          <h1>公司简介 / COMPANY PROFILE</h1>
          
          <h2>南京高能全营养科技 NNP!</h2>
          <h3>来自中国，协同全球 | 凝聚热爱，引领关于"全营养"的极致探索</h3>
          
          <p>（全球非热全营养革新开创者与引领者），专注为全球高端食品饮品渠道提供"纳米低温营养满分"解决方案。</p>
          
          <p>我们全营养科技，是一场发生在饮品与食品领域的"全营养革命"。我们终结了"风味、营养与保质期"的陈旧三角，不在传统高热杀菌与营养损耗的旧赛道竞争，而是另立"还愿全营养"的全新赛道。</p>

          <blockquote>
            <p><strong>我们的使命：</strong>是为用户的健康替"胃"发声。我们坚信，每一口饮品都应是自然的营养馈赠，而非风味的妥协与营养的流失。</p>
            <p><strong>我们的愿景：</strong>是让先进的NNP全营养，超高压纳米破碎和动态式非热杀菌保留营养成为全球高品质食品与饮品的"全营养新基准"。</p>
          </blockquote>

          <p>我们不是改良者，是重构者。我们致力于将NNP技术打造为产业的基础设施，让一切陈旧的热加工营养损耗模式，都能跃上NNP的技术飞船，驶向价值增长新纪元。</p>

          <h3>我们的价值观：</h3>
          <ul>
            <li><strong>破局思维：</strong>不妥协于行业惯例，以技术硬核直面根本矛盾。</li>
            <li><strong>生态共创：</strong>与头部伙伴深度绑定，共创而非竞争，构建命运共同体。</li>
            <li><strong>极致效率：</strong>以前沿技术为核心引擎，为合作伙伴铺设通往高利润市场的超车道。</li>
          </ul>

          <h3>NNP技术：我们终结"不可能三角"的终极多维生态买点</h3>
          <p>我们的核心——NNP全营养保全技术，并非一项改良，而是对传统加工方式的彻底颠覆。它通过"超高压纳米破碎"与"动态非热式杀菌"的双核驱动，一举终结了高端饮品在"极致风味"、"全谱营养"与"商业无菌"之间必须做出的妥协，为渠道与消费者提供了前所未有的"无需选择，全部拥有"的终极解决方案。</p>

          <h3>商业模式重构：</h3>
          <p>我们彻底跳出了"卖设备"或"卖技术服务"的传统逻辑。我们独创的"共创二级公司"模式，是一种全新的商业合作物种。我们以NNP技术入股，只参与保底分红，不参与运营与亏损，这并非简单的让利，而是为了与行业头部工厂达成最坚实的战略同盟，构建一个以我们技术为公理、以伙伴产能为支点的产业赋能共同体。</p>

          <h3>坚实的产业母体：</h3>
          <p>我们的诞生，根植于战略股东——南京大地水刀股份有限公司近三十年在超高压技术领域的全球领先地位与国家级研发底蕴。这确保了NNP技术从诞生之初，就拥有工业级的可靠性与持续进化的强大基因。</p>

          <blockquote>
            <p><strong>最后，我们的信念：</strong>NNP种下的不是对旧工艺的修补，而是产业新物种的基因。我们另立赛道，旨在用最快的速度，助力我们的合作伙伴在高端市场成长为参天大树，成为价值与利润双高的新TOP1。每一个品类，都可以用NNP技术重做一遍。</p>
          </blockquote>
        </section>

        <hr />

        {/* ========== 第21段：母公司介绍 ========== */}
        <section className="section-block">
          <h2>产业母体股东简介 / COMPANY PROFILE</h2>
          <h3 style={{fontSize: '36px', color: 'var(--color-primary)'}}>SINCE 1996</h3>
          
          <p>南京大地水刀股份有限公司，创建于1996年，是中国超高压水射流应用技术先行者，位居全球前列，是专业从事超高压水射流技术应用产品研发、生产、销售及技术服务的国家高新技术企业；并建有国家"机械工业超高压水切割工程实验室"、"江苏省超高压水射流工程技术研究中心"及"南京市企业技术中心"；"江苏省研究生工作站"、"江苏省博士后实践基地"、"江苏省专精特新企业"。</p>
          
          <p>大地凝聚近三十年研发、生产的经验和积累以及超10000家用户的使用经验沉淀，以超高压水射流技术应用推广为己任，不断完善研发创新机制、推陈出新，拥有与超高压水切割、水清洗相关的专利百余项。主编中国《超高压水切割机》行业标准和国家标准、《机器人超高压水切割机》行业标准。</p>
          
          <p>大地产品不仅覆盖全国，且远销欧洲、北美、南美、东南亚、中东等六十多个国家和地区；迄今已有约11000台产品在电力及新能源、石化、高铁、汽车、医疗、纺织、食品、化工、印刷、包装、工程机械、船舶修造、电子、交通、建筑、装潢装饰；金属、碳纤维、玻璃纤维、化纤、皮革、塑料、布匹、纸张、玻璃、陶瓷、石材等广阔的领域使用。</p>
          
          <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/0235ee93c4c50582888bc381a9b9285418d5e8c00d3b8d826f462938c770a680.jpg" alt="About DARDI" className="full-width-img" />
        </section>

        <hr />

        {/* ========== 第22段：发展历程 ========== */}
        <section className="section-block">
          <h2>发展历程 / MILESTONES</h2>          
          <div className="timeline-container">
            <div className="timeline-item">
              <span className="timeline-year">2022</span>
              <p>大地水刀被评为江苏省专精特新中小企业"TBM盾构机超高压水切割辅助破岩系统"被认定为江苏省首（套）重大装备产品</p>
            </div>
            <div className="timeline-item">
              <span className="timeline-year">2020</span>
              <p>成功研制超高压均质机 AB50、AB10、AC90、AC60多款五轴成功推向市场</p>
            </div>
            <div className="timeline-item">
              <span className="timeline-year">2019</span>
              <p>研发"TBM盾构机超高压水切割辅助破岩系统"并投入隧道掘进施工</p>
            </div>
            <div className="timeline-item">
              <span className="timeline-year">2018</span>
              <p>国家863计划项目"飞机蒙皮双五轴大型水刀加工中心"通过验收</p>
            </div>
            <div className="timeline-item">
              <span className="timeline-year">2013</span>
              <p>四轴水刀研发成功，江苏省科技转换项目完成验收</p>
            </div>
            <div className="timeline-item">
              <span className="timeline-year">2010</span>
              <p>研发全球首台大型模组化多切割头水刀颁发水切割机国家标准</p>
            </div>
            <div className="timeline-item">
              <span className="timeline-year">2008</span>
              <p>美国FLOW公司加盟水刀加工中心研发成果五轴水刀研发成功</p>
            </div>
            <div className="timeline-item">
              <span className="timeline-year">2007</span>
              <p>起草"超高压水切割机"国家标准荣获国家火炬计划重点项目</p>
            </div>
            <div className="timeline-item">
              <span className="timeline-year">2002</span>
              <p>成功研发中国第一套废旧弹药销毁系统编撰水切割行业标准</p>
            </div>
            <div className="timeline-item">
              <span className="timeline-year">1999</span>
              <p>产品出口欧洲建立超高压实验室</p>
            </div>
            <div className="timeline-item">
              <span className="timeline-year">1996</span>
              <p>大地水刀公司成立研制成功国内首台水刀</p>
            </div>
          </div>
        </section>

        <hr />

        {/* ========== 第23段：专利证书 ========== */}
        <section className="section-block">
          <h2>专利 &amp; 证书 / GLOBAL MARKETING SERVICE NETWORK</h2>
          
          <div className="grid-2">
            <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/034719a7e77c8203f2e803953dec3d18b255b7084d6be6b73e3342caec49dc43.jpg" alt="专利证书" />
            <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/31f372dd3166b0a10315d58423c1726dd9f0d876113550038f52178a4433fd36.jpg" alt="专利墙" />
          </div>
          
          <div className="img-grid-gallery">
            <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/a891a27dcc2685dfeabc9227e848132b52b7acfade7e9cbb02163e26709be0c5.jpg" alt="9000证书" />
            <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/6e323f2ffa64b4b698a801a4ba0302d8156e9592088874f89d07d0ebc5ccdde2.jpg" alt="14000证书" />
            <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/cf979d1182de8a0d80a5236f7e361b08a003b1a463e89b7309652f36fd10fc95.jpg" alt="CE证书" />
            <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/1b0f680f7177187f3b3b0a2e8ac4104df7f9ab6a1a36938968628f72b95f7fc3.jpg" alt="证书4" />
            <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/df4e09feb138a69152059656744e410d0da331f1c1033e2a1a4f16822c613b17.jpg" alt="证书5" />
          </div>
        </section>

        <hr />

        {/* ========== 第24段：技术能力 ========== */}
        <section className="section-block">
          <h2>技术能力 / TECHNOLOGY STRENGTH</h2>
          
          <div className="grid-4">
            <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/a0be1c64dfbc67538eeb397953553bd1c41921c69ae93f9ddc41b017543fd189.jpg" alt="技术能力1" />
            <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/a0017fa95bf7fcf6b0b5760e187af0eb2fac87b942f2eca29f0e4604be7f335c.jpg" alt="技术能力2" />
            <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/6c20d602ea33ad64041055a6045aa93167c1a86503c7f4d4afb2b397a5fca4ae.jpg" alt="技术能力3" />
            <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/dc6af64e723781394267d41d2917e6f34f88a945678acc2672b05175affdeea0.jpg" alt="技术能力4" />
          </div>
        </section>

        <hr />

        {/* ========== 第25段：生产能力 ========== */}
        <section className="section-block">
          <h2>生产能力 / PRODUCTION CAPACITY</h2>
          
          <div className="grid-3">
            <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/63617963a84d80a3a6413bda9d54aa54d77778191478d846d5e75478c138dc33.jpg" alt="生产能力1" />
            <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/0cb4a4b33dcdd51fea9f2804db781a16c941640a64b7574f87d615d76a6ecda5.jpg" alt="生产能力2" />
            <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/189dcdea1be93003d5415c76e7f11c045a2aba1aff1269ab40ee74035ba6a073.jpg" alt="生产能力3" />
            <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/f1b601be858e1f58c542a08d949f94b57ce56347eb314771504f49398560dd2d.jpg" alt="龙门大隈加工中心" />
            <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/610092b7f7d391f521ef902a7c9ff5386988905342b24b9820f835bf31d4195f.jpg" alt="生产设备" />
            <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/0715d2c64f99584a5b72ab969ff1d810f680007d03b9b5370fa01177434d09a2.jpg" alt="生产车间" />
          </div>
        </section>

        <hr />

        {/* ========== 第26段：工厂实景 ========== */}
        <section className="section-block">
          <h2>工厂实景 / FACTORY SCENERY</h2>
          <p className="text-center">诚信 SINCERITY | 专业 SPECIALITY | 精创 ELITECH | 超越 TRANSCEND</p>
          
          <div className="grid-3">
            <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/4015b58b37ed04927c56b98eeeb765c5f3db83a45cb299a59367b4a4331b4db4.jpg" alt="工厂实景1" />
            <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/a74971b342c0120a6276d877f6d6d72c09a0a94bc3e8355f97f0173afb008125.jpg" alt="工厂实景2" />
            <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/27cdba7086b9e3f5dc2aed8c2749563e97716c1efa3d2fa925be6e6edaab58f3.jpg" alt="工厂实景3" />
          </div>
        </section>

        <hr />

        {/* ========== 第27段：服务体系 ========== */}
        <section className="section-block">
          <h2>服务体系 / SERVICE SYSTEM</h2>
          
          <div className="grid-3">
            <div className="case-card">
              <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/527347430c07a98000592fa676af50e0ccdde765e3ccc4158266bd5353f19d14.jpg" alt="服务团队" />
              <h4>服务团队</h4>
              <p>强有力的售后服务团队，为用户提供优良的售后服务</p>
            </div>
            <div className="case-card">
              <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/926b901f6f1ee60489612fba327405a24384545765befdd33169b17f5b913b3e.jpg" alt="特优升级" />
              <h4>特优升级</h4>
              <p>对新产品和新技术，享受特优价升级</p>
            </div>
            <div className="case-card">
              <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/511ea9c39167f9908dc5a9fbef5cc35e01d0c902c9f39685a80f13069b6f9f7b.jpg" alt="响应时间" />
              <h4>响应时间</h4>
              <p>即刻响应；48小时内到达设备使用现场</p>
            </div>
            <div className="case-card">
              <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/7725db8fa066cd80eb6ab9156a7df30ab3634a13228f6686a8909d5d5fe24906.jpg" alt="零部件供应" />
              <h4>零部件供应</h4>
              <p>零部件保证长期供应且供应及时</p>
            </div>
            <div className="case-card">
              <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/c18f87d33e910b05a4caa76431d6108bfef23c47fdf058f2a38b17bb5b7c7013.jpg" alt="交流培训" />
              <h4>交流培训服务</h4>
              <p>区域范围内的客户不定期的技术交流和售后服务培训</p>
            </div>
            <div className="case-card">
              <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/4f725c83ccd5adfd7fbee59c75ce2fc37e06d92e04d835f14f331d98298dac35.jpg" alt="终身维保" />
              <h4>终身维保服务</h4>
              <p>终身提供及时的、优质的、价格优惠的技术服务和备品备件供应</p>
            </div>
          </div>
          
          <p className="text-center" style={{marginTop: '40px', fontWeight: 'bold'}}>我们为客户提供的不仅仅只有产品，更重要的是行业解决方案和贴心的专家服务……</p>
        </section>

        <hr />

        {/* ========== 第28段：全球网络 ========== */}
        <section className="section-block">
          <h2>全球设备营销网络 / GLOBAL MARKETING NETWORK</h2>
          
          <div className="grid-4">
            <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/fc2f203b8a9601456a6b76045c6b5a3c400cb09d5e9e53a6c47011248b38135b.jpg" alt="国内客户所在地区" />
            <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/02306bddcc3e3d558856e8677f48ef07108caceda70f8e575b4e866ddbee732d.jpg" alt="国际代理所在地区" />
            <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/9aa0caf669c7aa288715fd464bb15be68f47db65bdd96720f3013b4749f788ae.jpg" alt="全球网络" />
            <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/85fe7f058dae3886755d50f97140d6fb6f60837bf7c43d46c45458b1fcd835cc.jpg" alt="国际客户所在地区" />
          </div>
          
          <h3 className="text-center" style={{margin: '40px 0', color: 'var(--color-accent)'}}>无论您身在何处，大地总能在您身边……</h3>
        </section>

        <hr />

        {/* ========== 第29段：结尾 ========== */}
        <section className="section-block">
          <div style={{textAlign: 'center'}}>
            <h2 style={{border: 'none'}}>NNP 全营养 NanoNutriPreserve</h2>
            
            <div className="grid-2" style={{maxWidth: '800px', margin: '40px auto'}}>
              <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/3cf9857020f4ce0d8ff93e01e12428814650586ba2f607dd9fb1a722931d5fcb.jpg" alt="南京大地水刀" />
              <img src="https://cdn-mineru.openxlab.org.cn/result/2025-11-26/8bee6707-f8f2-40b6-8f49-16229311cda3/e66fcafa80f6aa79a038fefde142011086b4f35e478ea078ba29e39cd4a3ac48.jpg" alt="全营养模拟室" />
            </div>
            
            <h3>全营养模拟室 Total Nutrition Simulation Chamber</h3>
            <h3 style={{marginTop: '40px', color: 'var(--color-primary)'}}>南京大地水刀股份有限公司</h3>
            <p style={{fontSize: '20px', marginTop: '20px'}}>相约未来 携手共赢</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default HPHDetailPage;