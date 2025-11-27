import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import '../styles/pages/DetailPage.css';

function PEFDetailPage() {
  const navigate = useNavigate();

  // 确保页面加载时滚动到顶部
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
    navigate('/', { state: { targetSection: 'pef', fromDetailPage: true } });
  };

  return (
    <div className="detail-page-container">
      <nav className="detail-nav">
        <button onClick={handleBack} className="back-btn">←</button>
      </nav>

      <main className="detail-content page-container">
        {/* 第1段：封面/标题区 */}
        <div className="header-badge">MDL 买点论实验室全球领先</div>
        
        <h1 className="main-title">鲜到鲜技术—冷链食材保鲜技术创新的方案</h1>
        
        <div className="cover-grid">
          <div className="cover-item">
            <img 
              src="https://cdn-mineru.openxlab.org.cn/result/2025-11-25/61be5151-4e9c-4d7c-b2a3-c54b76d91de7/8917c6de84515b8dcd5011a371ac99f705f17d05da471f0c5be2f87a6d9a497a.jpg" 
              alt="冻眠冰温保鲜" 
            />
            <div className="cover-item-caption">冻眠冰温保鲜</div>
          </div>
          <div className="cover-item">
            <img 
              src="https://cdn-mineru.openxlab.org.cn/result/2025-11-25/61be5151-4e9c-4d7c-b2a3-c54b76d91de7/f8484b903e0c271fd48428de578dae2902d12f02e90e8ecbfd077210fc22c9dd.jpg" 
              alt="纳米晶展示柜" 
            />
            <div className="cover-item-caption">纳米晶展示柜</div>
          </div>
          <div className="cover-item">
            <img 
              src="https://cdn-mineru.openxlab.org.cn/result/2025-11-25/61be5151-4e9c-4d7c-b2a3-c54b76d91de7/f5cd85e9c49a186c96e59f15340fd30fb9fbea527b912f45232b41b813cd6669.jpg" 
              alt="超冷冰沙柜" 
            />
            <div className="cover-item-caption">超冷冰沙柜</div>
          </div>
          <div className="cover-item">
            <img 
              src="https://cdn-mineru.openxlab.org.cn/result/2025-11-25/61be5151-4e9c-4d7c-b2a3-c54b76d91de7/f5636b136147baefe22c71ec38dfec1fe8f46be77c9297e0d511cf8fed75b9b7.jpg" 
              alt="全冷链保鲜" 
            />
            <div className="cover-item-caption">全冷链保鲜</div>
          </div>
        </div>
        
        <div className="section-divider-thick"></div>
        
        {/* 第2段：产品核心价值介绍 */}
        <h2 className="section-title">纳米微晶 + 冰温保鲜</h2>
        <h3 className="section-subtitle">产品核心价值——鲜到鲜</h3>
        
        <div className="value-grid">
          <div className="value-item">
            <div className="value-header">
              <div className="value-number">1</div>
              <div className="value-label">冰温保鲜</div>
            </div>
            <img 
              src="https://cdn-mineru.openxlab.org.cn/result/2025-11-25/61be5151-4e9c-4d7c-b2a3-c54b76d91de7/a3c8c223c767b9452b2cc6075fd8134df2c7858775faa7dc6c483b1f65f0d5b1.jpg" 
              alt="冰温保鲜" 
            />
          </div>
          <div className="value-item">
            <div className="value-header">
              <div className="value-number">2</div>
              <div className="value-label">纳米微晶</div>
            </div>
            <img 
              src="https://cdn-mineru.openxlab.org.cn/result/2025-11-25/61be5151-4e9c-4d7c-b2a3-c54b76d91de7/5b460da717d0927e27fa65307bc593cccf7f88642940cfcb113bdf937e359d93.jpg" 
              alt="纳米微晶" 
            />
          </div>
          <div className="value-item">
            <div className="value-header">
              <div className="value-number">3</div>
              <div className="value-label">超冷沙冰</div>
            </div>
            <img 
              src="https://cdn-mineru.openxlab.org.cn/result/2025-11-25/61be5151-4e9c-4d7c-b2a3-c54b76d91de7/f2d272674b4177e0076a8828bce878461aa835c5a2ff937588c8868aff27f39d.jpg" 
              alt="超冷沙冰" 
            />
          </div>
          <div className="value-item">
            <div className="value-header">
              <div className="value-number">4</div>
              <div className="value-label">冷链赋能</div>
            </div>
            <img 
              src="https://cdn-mineru.openxlab.org.cn/result/2025-11-25/61be5151-4e9c-4d7c-b2a3-c54b76d91de7/59721ac8592febe9d153e695da30a6cfcaf2b5eea1ec9e93a3cd6c1db2b5761f.jpg" 
              alt="冷链赋能" 
            />
          </div>
        </div>
        
        <div className="application-text">
          <strong>鲜到鲜应用场景：</strong>DIY冰沙饮、冻眠一级鲜、无水快解冻、纳米晶鲜切… …全冷链赋能！
        </div>
        
        <div className="app-scene-row-2">
          <div className="app-scene-item">
            <img 
              src="https://cdn-mineru.openxlab.org.cn/result/2025-11-25/61be5151-4e9c-4d7c-b2a3-c54b76d91de7/f3d861d588c1ce6c926a34f15335bb81cf577efee756f5b800bb67d5f1ba637f.jpg" 
              alt="手摇千层雪" 
            />
            <div className="app-scene-caption">手摇千层雪</div>
          </div>
          <div className="app-scene-item">
          </div>
        </div>
        
        <div className="app-scene-row-4">
          <div className="app-scene-item">
            <img 
              src="https://cdn-mineru.openxlab.org.cn/result/2025-11-25/61be5151-4e9c-4d7c-b2a3-c54b76d91de7/6103a98ff152696572cc127ae6c0bb39fea14616b05faf6d74f3f274fbb3f903.jpg" 
              alt="手打冰沙饮" 
            />
            <div className="app-scene-caption">手打冰沙饮（视频打开）</div>
          </div>
          <div className="app-scene-item">
            <img 
              src="https://cdn-mineru.openxlab.org.cn/result/2025-11-25/61be5151-4e9c-4d7c-b2a3-c54b76d91de7/d1e003288c145b598dd0a6d660126d56375a1ef38a453cbf308991cfe19615fa.jpg" 
              alt="解冻快无流失" 
            />
            <div className="app-scene-caption">解冻快无流失（视频打开）</div>
          </div>
          <div className="app-scene-item">
            <img 
              src="https://cdn-mineru.openxlab.org.cn/result/2025-11-25/61be5151-4e9c-4d7c-b2a3-c54b76d91de7/37092c6e8171d6d47acbe0b8dad679081cbadc9d793c96dc94f3dad70fc98f59.jpg" 
              alt="-6°C牛肉薄切" 
            />
            <div className="app-scene-caption">-6°C牛肉薄切（视频打开）</div>
          </div>
          <div className="app-scene-item">
            <img 
              src="https://cdn-mineru.openxlab.org.cn/result/2025-11-25/61be5151-4e9c-4d7c-b2a3-c54b76d91de7/37092c6e8171d6d47acbe0b8dad679081cbadc9d793c96dc94f3dad70fc98f59.jpg" 
              alt="果肉保鲜" 
            />
            <div className="app-scene-caption">果肉保鲜（视频打开）</div>
          </div>
        </div>
        
        <div className="section-divider-thick"></div>
        
        {/* 第3段：实验数据与技术验证 */}
        <div className="experiment-desc">
          新鲜羊肉和牛肉在贮藏过程中，不同工况下对于羊肉和牛肉的挥发性盐基氮、菌落总数和色泽的影响。
        </div>
        
        <div className="experiment-images-3">
          <img 
            src="https://cdn-mineru.openxlab.org.cn/result/2025-11-25/61be5151-4e9c-4d7c-b2a3-c54b76d91de7/071a491dac5d27baf1a7bb6db9bb7eb24608bbf20ba32c6bae76dfcf45614e4e.jpg" 
            alt="实验数据图1" 
          />
          <img 
            src="https://cdn-mineru.openxlab.org.cn/result/2025-11-25/61be5151-4e9c-4d7c-b2a3-c54b76d91de7/fd271824f034fa7565c9627b735c183b88e94ef684dd99526689ba27ed3c2ccc.jpg" 
            alt="实验数据图2" 
          />
          <img 
            src="https://cdn-mineru.openxlab.org.cn/result/2025-11-25/61be5151-4e9c-4d7c-b2a3-c54b76d91de7/2f4c2fd4b7bb0022c83ea4d8f89ff4659ccf43686a62495f7a805502b74520af.jpg" 
            alt="实验数据图3" 
          />
        </div>
        <div className="figure-caption">图1不同处理对羊肉（a）和牛肉（b）TVB-N值的影响</div>
        
        <div className="experiment-images-3">
          <img 
            src="https://cdn-mineru.openxlab.org.cn/result/2025-11-25/61be5151-4e9c-4d7c-b2a3-c54b76d91de7/8f6f3e121443a4cb29bc953fd7959590bdfa3d2f4ff934c7d9d6b69bc31d296e.jpg" 
            alt="菌落总数图1" 
          />
          <img 
            src="https://cdn-mineru.openxlab.org.cn/result/2025-11-25/61be5151-4e9c-4d7c-b2a3-c54b76d91de7/133afa477c46fe713ca67008b45b3400c98ff617225df97ba7bcb43cd62c11c1.jpg" 
            alt="菌落总数图2" 
          />
          <img 
            src="https://cdn-mineru.openxlab.org.cn/result/2025-11-25/61be5151-4e9c-4d7c-b2a3-c54b76d91de7/28b333a0f5df4d753552dfa2e6c642b3ba2881335ad987d679b27431d420301e.jpg" 
            alt="菌落总数图3" 
          />
        </div>
        
        <div className="experiment-images-3">
          <img 
            src="https://cdn-mineru.openxlab.org.cn/result/2025-11-25/61be5151-4e9c-4d7c-b2a3-c54b76d91de7/61ccf563cfce70668a6717a2e130463b705fe3464f75c849a5694cf2fc093af0.jpg" 
            alt="色泽影响图1" 
          />
          <img 
            src="https://cdn-mineru.openxlab.org.cn/result/2025-11-25/61be5151-4e9c-4d7c-b2a3-c54b76d91de7/680ffb326a3559dac4f4f7ce037a2c1741fc90e1309bc4df2b0b2e4a2bd18d47.jpg" 
            alt="色泽影响图2" 
          />
          <img 
            src="https://cdn-mineru.openxlab.org.cn/result/2025-11-25/61be5151-4e9c-4d7c-b2a3-c54b76d91de7/45e80df4f02f7c33e9e6a5e5f2c1892833d122862b5f0de79bde9876b787a7f4.jpg" 
            alt="色泽影响图3" 
          />
        </div>
        <div className="figure-caption">的影响</div>
        
        <div className="single-image-full">
          <img 
            src="https://cdn-mineru.openxlab.org.cn/result/2025-11-25/61be5151-4e9c-4d7c-b2a3-c54b76d91de7/4ffea887fe5ead83c360fed514c7e8482b401517f4a36be16695f824b5feabc1.jpg" 
            alt="色泽数据详图" 
          />
        </div>
        <div className="figure-caption">-2-CIF真空L / -2-C非真空a / -2-C非真空b / -2-C非空 / -4-C非真空 / -4-C非真空a / -4-C非真空b / -4-C真空L / -4-C真空a / -4-C真空b</div>
        
        <div className="conclusion-box">
          <p>-4°C 真空组的羊肉和所有牛肉样品在贮藏期结束后保存软鲜态，结论为一级鲜肉标准，表明冰温保鲜处理的牛羊肉贮藏 15d 也能保持食品品质。</p>
        </div>
        
        <div className="result-label">-4°C 真空牛肉</div>
        <div className="result-images-row-6">
          <img 
            src="https://cdn-mineru.openxlab.org.cn/result/2025-11-25/61be5151-4e9c-4d7c-b2a3-c54b76d91de7/7523d646d8f83b77148788369c09e892f40c4260cf18295bbf440ea3188a7128.jpg" 
            alt="-4°C真空牛肉1" 
          />
          <img 
            src="https://cdn-mineru.openxlab.org.cn/result/2025-11-25/61be5151-4e9c-4d7c-b2a3-c54b76d91de7/07dc3ac9c55cb686df94c546bc5cbc1d20382510b1136bcc492c49a99a492789.jpg" 
            alt="-4°C真空牛肉2" 
          />
          <img 
            src="https://cdn-mineru.openxlab.org.cn/result/2025-11-25/61be5151-4e9c-4d7c-b2a3-c54b76d91de7/1aabf4258a8e4059e9552ba30366aa75752ee8ab11bdfd91bd67d5e6fafd0e70.jpg" 
            alt="-4°C真空牛肉3" 
          />
          <img 
            src="https://cdn-mineru.openxlab.org.cn/result/2025-11-25/61be5151-4e9c-4d7c-b2a3-c54b76d91de7/e4974ddae2a6153c01a3efb6a328ea0f5169ee84f37501f799fe19027e7c99d8.jpg" 
            alt="-4°C真空牛肉4" 
          />
          <img 
            src="https://cdn-mineru.openxlab.org.cn/result/2025-11-25/61be5151-4e9c-4d7c-b2a3-c54b76d91de7/f85d2f379d42452609158b977d69c08b5472d4105fd382c4bb3025de8b6b022a.jpg" 
            alt="-4°C真空牛肉5" 
          />
          <img 
            src="https://cdn-mineru.openxlab.org.cn/result/2025-11-25/61be5151-4e9c-4d7c-b2a3-c54b76d91de7/094596e2918dcc9fbf332724046c321022a77d65040801b0f02da8eb41985330.jpg" 
            alt="-4°C真空牛肉6" 
          />
        </div>
        
        <div className="single-image-small">
          <img 
            src="https://cdn-mineru.openxlab.org.cn/result/2025-11-25/61be5151-4e9c-4d7c-b2a3-c54b76d91de7/f8b98e54ebe8620080cd6aa56cf3d0ec0dc12744e63b7f494d9e41da942d1d4e.jpg" 
            alt="-4°C真空牛肉补充" 
          />
        </div>
        
        <div className="result-label">-4°C 真空羊肉</div>
        <div className="result-images-row-5">
          <img 
            src="https://cdn-mineru.openxlab.org.cn/result/2025-11-25/61be5151-4e9c-4d7c-b2a3-c54b76d91de7/42c796bfc2b8a0f48233338728cbcecaf4ad51a64bfab1959449d96902a66e81.jpg" 
            alt="-4°C真空羊肉1" 
          />
          <img 
            src="https://cdn-mineru.openxlab.org.cn/result/2025-11-25/61be5151-4e9c-4d7c-b2a3-c54b76d91de7/61b799917dd5563cf23539de30e5af28ce370fe5bb9f4cffb71bdd038efd1a49.jpg" 
            alt="-4°C真空羊肉2" 
          />
          <img 
            src="https://cdn-mineru.openxlab.org.cn/result/2025-11-25/61be5151-4e9c-4d7c-b2a3-c54b76d91de7/01050bb2c9dfca32b69acb9c010f112fc2b4743841f651cb02955a152ae0c02a.jpg" 
            alt="-4°C真空羊肉3" 
          />
          <img 
            src="https://cdn-mineru.openxlab.org.cn/result/2025-11-25/61be5151-4e9c-4d7c-b2a3-c54b76d91de7/5b3a7a8a14b1c0b59c4694370ef653e9a6a278190ca86ac9cf925c71b6e6f781.jpg" 
            alt="-4°C真空羊肉4" 
          />
          <img 
            src="https://cdn-mineru.openxlab.org.cn/result/2025-11-25/61be5151-4e9c-4d7c-b2a3-c54b76d91de7/fd145128b6bf47e43fae996625f2844a029972e0a81d5fba33ddc96b2028e53d.jpg" 
            alt="-4°C真空羊肉5" 
          />
        </div>
        
        <div className="section-divider-thick"></div>
        
        {/* 第4段：市场竞品对标分析 */}
        <h2 className="compare-section-title">鲜到鲜VS海尔恒磁VS美的微晶技术对标</h2>
        <p className="compare-subtitle">鲜到鲜技术不需要改变产品形态，实现一级鲜</p>
        
        <h3 className="subsection-title">市场信息对标</h3>
        
        <div className="market-grid-4">
          <img 
            src="https://cdn-mineru.openxlab.org.cn/result/2025-11-25/61be5151-4e9c-4d7c-b2a3-c54b76d91de7/a562bd546a240b37c0db70298fc75b3321f59d81c8d327d014383a740fb9d6aa.jpg" 
            alt="市场对标图1" 
          />
          <img 
            src="https://cdn-mineru.openxlab.org.cn/result/2025-11-25/61be5151-4e9c-4d7c-b2a3-c54b76d91de7/8f819e8d21df3dcecd24f35b1f02f3082f15a1a4d7e59628b0be91de59ea3740.jpg" 
            alt="市场对标图2" 
          />
          <img 
            src="https://cdn-mineru.openxlab.org.cn/result/2025-11-25/61be5151-4e9c-4d7c-b2a3-c54b76d91de7/6d68bbc5a480eaa299d8f26fdeab4311bcb76c971e20d00cb662a14317cc37fe.jpg" 
            alt="市场对标图3" 
          />
          <img 
            src="https://cdn-mineru.openxlab.org.cn/result/2025-11-25/61be5151-4e9c-4d7c-b2a3-c54b76d91de7/fe6319a25f345da06eac953760623bc3ecf7e0a5e976a8e6570b38e8e88a8aa6.jpg" 
            alt="市场对标图4" 
          />
        </div>
        
        <div className="market-points">
          <p>1、恒磁养鲜宣传储存 10 日，微晶宣传 7 天原鲜口感</p>
          <p>2、恒磁宣传抑制冰晶生成，微晶宣传"仅形成头发丝 1% 大小的冰晶"</p>
          <p>3、恒磁宣传汁液流失率约为 0（话术模糊），实际测试做不到</p>
        </div>
        
        <div className="compare-conclusion">
          <div className="compare-conclusion-label">对标结论：</div>
          <p>海尔择优表达，且宣传点针对性极强，美的强调极端场景效果。</p>
        </div>
        
        <div className="section-divider"></div>
        
        {/* 第5段：技术方案差异 */}
        <h3 className="subsection-title">技术方案差异</h3>
        
        <p className="tech-desc">1、送风方式：我司将3代微晶升级后，送风方式由顶部多孔送风改为后部直吹送风。</p>
        
        <table className="tech-table">
          <thead>
            <tr>
              <th>维度</th>
              <th>恒磁养鲜</th>
              <th>3代微晶（双层微晶）</th>
              <th>2代微晶/AI抑嘌呤</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>送风方式</td>
              <td>抽屉环绕风循环</td>
              <td>后部吹风</td>
              <td>顶部吹风</td>
            </tr>
            <tr>
              <td>图片</td>
              <td>出风口<br/>回风口<br/>保温桶<br/>抽屉</td>
              <td></td>
              <td>吹风口<br/>保温桶<br/>侧回风口</td>
            </tr>
          </tbody>
        </table>
        
        <p className="tech-desc">2、控温方式：我司为满足 80% 负载和 25h 拉温要求，采用拉温段 - 回温段交替控温逻辑，单点温度低至 -8°C，加剧过冻现象和温度波动问题。（空载测试）。竞品温度更均匀。</p>
        
        <div className="temp-chart">
          <img 
            src="https://cdn-mineru.openxlab.org.cn/result/2025-11-25/61be5151-4e9c-4d7c-b2a3-c54b76d91de7/b5c4237c8f85d9bc6f096a45ce8a889dd443be494e33ac6893d210367b7fe39b.jpg" 
            alt="温度控制曲线对比图" 
          />
        </div>
        
        <div className="section-divider-thick"></div>
        
        {/* 第6段：保鲜效果对比总结 */}
        <h2 className="final-section-title">鲜到鲜 VS 海尔恒磁 VS 美的微晶：鲜到鲜技术才能实现 15 天保持一级鲜</h2>
        
        <div className="test-points">
          <p>1、测试标准：测试标准负载量更大。各自标准工况下，恒磁保鲜周期10天，微晶保鲜周期7天，均与宣传一致；</p>
          <p>2、测试效果：少载、半载场景下恒磁效果更优（10天肉色均匀无过冻），满载场景下微晶优势明显，无血水，保鲜期7天；恒磁底部血水较多，保鲜期仅5天</p>
        </div>
        
        <div className="analysis-box">
          <div className="analysis-title">&gt; 对标结果分析:</div>
          <p>1、竞品测试标准更接近实际用户场景，我司测试标准要求 80% 负载为极端状态。竞品标准有参考价值。</p>
          <p>2、采用拉温段-回温段交替控温逻辑，在降温速率优势明显，但拉温段温度低，易造成局部食材过冻；海尔恒磁采用恒温控温逻辑，温度整体控制较均匀且稳定</p>
        </div>
        
        <div className="analysis-box">
          <div className="analysis-title">&gt; 改善措施:</div>
          <ol>
            <li>重新定义微晶技术要求（温度波动和均匀性）</li>
            <li>修订微晶保鲜测试方法（负载量和食材种类）</li>
          </ol>
        </div>
        
        <table className="final-table">
          <thead>
            <tr>
              <th rowSpan="2">竞品对标</th>
              <th rowSpan="2">单点温度波动/℃<br/>(中间环温差值)</th>
              <th rowSpan="2">降温时间/h</th>
              <th rowSpan="2">测试标准差异</th>
              <th colSpan="3">美的微晶VS海尔恒磁保鲜效果对比</th>
            </tr>
            <tr>
              <th>少载（1块）</th>
              <th>半载（单层）<br/>微晶不均匀，存在部分肉过冻</th>
              <th>80%负载（多层）<br/>微晶较恒磁保鲜效果优势明显，血水少</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>美的微晶</td>
              <td>7℃</td>
              <td>1.5h</td>
              <td>①食材：猪/鸡/鱼混放<br/>②负载量：容积80%负载<br/>③层数：≤3层</td>
              <td>易切性、硬度22N<br/>状态：新鲜无异味，微结晶</td>
              <td>保鲜期：10-14天<br/>状态：存在部分肉过冻、暗红，14天轻微异味</td>
              <td>保鲜期：7天 标准工况<br/>状态：底部有少量血水，风口位置有过冻现象</td>
            </tr>
            <tr>
              <td>海尔恒磁</td>
              <td>2.7℃</td>
              <td>5.7h</td>
              <td>①食材：牛肉<br/>②负载量：6块平铺<br/>③层数：1层</td>
              <td>易切性、硬度8N<br/>状态：新鲜无异味，无结晶</td>
              <td>保鲜期：10-14天<br/>状态：无过冻，鲜红，14天轻微异味</td>
              <td>保鲜期：5天<br/>状态：底部血水较多</td>
            </tr>
            <tr>
              <td>附图</td>
              <td>温度波动（平稳段）（200g 2cm 牛肉<br/>20℃→0℃）</td>
              <td>美得微晶 海尔恒磁<br/>1:1000ml</td>
              <td>双层微晶 海尔恒磁<br/>1:1000ml</td>
              <td>双层微晶 海尔恒磁<br/>1:1000ml</td>
              <td>双层微晶 海尔恒磁<br/>1.5:1000ml</td>
              <td>血水</td>
            </tr>
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default PEFDetailPage;
