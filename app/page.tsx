'use client';

import { useMemo, useState } from 'react';

type LocaleKey = 'en' | 'zh';

type CardCopy = {
  tag: string;
  title: string;
  body: string;
};

type CopyPack = {
  heroPill: string;
  heroTitle: string;
  heroBody: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  stackTitle: string;
  stackBody: string;
  stackCards: CardCopy[];
  outputTitle: string;
  outputBody: string;
  outputItems: string[];
  installTitle: string;
  installBody: string;
  installHint: string;
  tabs: string[];
  copyLabel: string;
  copiedLabel: string;
  apiSnippet: string;
  footer: string;
};

const CONTENT: Record<LocaleKey, CopyPack> = {
  en: {
    heroPill: '30s Market Microstructure',
    heroTitle: 'Short-Term Crypto Signal Engine',
    heroBody:
      'A precision-grade 30-second prediction system powered by real-time market microstructure signals. We fuse momentum, volume dynamics, order-book imbalance, funding pressure, and volatility regimes into a single, explainable decision output.',
    heroCtaPrimary: 'Designed for Fast Decisions',
    heroCtaSecondary: 'No Auto-Trading. Human in Control.',
    stackTitle: 'Professional Signal Stack',
    stackBody:
      'Every prediction is backed by a compact but institutional-grade signal stack. We calculate features on a rolling 30-second window and score each signal with transparent weights.',
    stackCards: [
      {
        tag: 'Momentum',
        title: 'Price Velocity',
        body: 'Return 5s/10s/30s and momentum deltas identify acceleration, pullbacks, and breakout continuation.'
      },
      {
        tag: 'Volume',
        title: 'Liquidity Pressure',
        body: 'Volume ratios and acceleration capture burst activity versus exhaustion, filtering false moves.'
      },
      {
        tag: 'Order Book',
        title: 'Microstructure Edge',
        body: 'Bid/ask depth, spread, and imbalance score immediate buy/sell dominance and wall pressure.'
      },
      {
        tag: 'Funding',
        title: 'Positioning Bias',
        body: 'Funding rate signals crowding and squeeze risk to refine direction and risk warnings.'
      }
    ],
    outputTitle: 'What We Output',
    outputBody:
      'The engine provides a direction (UP/DOWN/NEUTRAL), confidence score, top reasons, and risk flags with a strict 30-second validity window.',
    outputItems: [
      'Direction: UP / DOWN / NEUTRAL',
      'Confidence: 0.0 - 1.0 (calibrated)',
      'Reasons: top ranked signal explanations',
      'Risks: opposing signals and volatility flags',
      'Validity: 30s horizon'
    ],
    installTitle: 'Skill Installation',
    installBody:
      'Pick your agent runtime and run the corresponding install command. The skill repository and API base are preconfigured in the commands below.',
    installHint: 'One-line commands, copy & run.',
    tabs: ['Claude', 'Codex', 'OpenClaw'],
    copyLabel: 'Copy',
    copiedLabel: 'Copied',
    apiSnippet: `POST /api/v1/predict\nContent-Type: application/json\n\n{"symbol":"BTCUSDT"}`,
    footer: '© 2026 Short-Term Crypto Signal Engine'
  },
  zh: {
    heroPill: '30秒市场微观结构',
    heroTitle: '短周期加密信号引擎',
    heroBody:
      '一个面向30秒周期的高精度预测系统，基于实时市场微观结构信号。融合动量、成交量、订单簿失衡、资金费率与波动率周期，输出可解释的方向决策。',
    heroCtaPrimary: '为极速决策而生',
    heroCtaSecondary: '不自动交易，决策由人掌控',
    stackTitle: '专业信号栈',
    stackBody:
      '每次预测都由紧凑但机构级的信号栈支持。特征基于30秒滚动窗口计算，并以透明权重打分。',
    stackCards: [
      {
        tag: '动量',
        title: '价格速度',
        body: '5s/10s/30s收益率与动量差分，识别加速、回调与突破延续。'
      },
      {
        tag: '成交量',
        title: '流动性压力',
        body: '量比与加速度捕捉放量与衰竭，过滤伪突破。'
      },
      {
        tag: '订单簿',
        title: '微观结构优势',
        body: '深度、价差与失衡度衡量买卖盘占优与墙压。'
      },
      {
        tag: '资金费率',
        title: '持仓偏向',
        body: '资金费率提示拥挤与挤压风险，修正方向与风险提示。'
      }
    ],
    outputTitle: '输出内容',
    outputBody:
      '引擎输出方向（UP/DOWN/NEUTRAL）、置信度、核心理由与风险提示，严格30秒有效期。',
    outputItems: [
      '方向：UP / DOWN / NEUTRAL',
      '置信度：0.0 - 1.0（校准）',
      '理由：高权重信号解释',
      '风险：相反信号与波动预警',
      '有效期：30秒'
    ],
    installTitle: 'Skill 安装',
    installBody: '选择你的运行时并执行对应命令。仓库与 API 地址已预置在命令中。',
    installHint: '单行命令，复制即用。',
    tabs: ['Claude', 'Codex', 'OpenClaw'],
    copyLabel: '复制',
    copiedLabel: '已复制',
    apiSnippet: `POST /api/v1/predict\nContent-Type: application/json\n\n{"symbol":"BTCUSDT"}`,
    footer: '© 2026 短周期加密信号引擎'
  }
};

const COMMANDS = {
  claude:
    'git clone https://github.com/SennYagami/short_term_pre_skill && cd short_term_pre_skill && cp SKILL.md $CLAUDE_HOME/skills/crypto-predict/SKILL.md',
  codex:
    'git clone https://github.com/SennYagami/short_term_pre_skill && cd short_term_pre_skill && cp SKILL.md $CODEX_HOME/skills/crypto-predict/SKILL.md',
  openclaw:
    'git clone https://github.com/SennYagami/short_term_pre_skill && cd short_term_pre_skill && cp SKILL.md $OPENCLAW_HOME/skills/crypto-predict/SKILL.md'
};

export default function HomePage() {
  const [locale, setLocale] = useState<LocaleKey>('en');
  const [copied, setCopied] = useState<string | null>(null);
  const t = CONTENT[locale];
  const installCommands = useMemo(
    () => [COMMANDS.claude, COMMANDS.codex, COMMANDS.openclaw],
    []
  );

  const handleCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(value);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      setCopied(null);
    }
  };

  const toggleLocale = () => {
    setLocale((prev) => (prev === 'en' ? 'zh' : 'en'));
  };

  return (
    <main className="page">
      <div className="glow" />
      <div className="orb" />
      <div className="kline-bg" aria-hidden="true">
        <svg viewBox="0 0 1200 420" preserveAspectRatio="none">
          <defs>
            <linearGradient id="kline-gradient" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="rgba(108, 241, 255, 0.15)" />
              <stop offset="45%" stopColor="rgba(0, 245, 212, 0.5)" />
              <stop offset="100%" stopColor="rgba(255, 183, 0, 0.35)" />
            </linearGradient>
            <linearGradient id="kline-gradient-soft" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="rgba(108, 241, 255, 0.05)" />
              <stop offset="60%" stopColor="rgba(108, 241, 255, 0.25)" />
              <stop offset="100%" stopColor="rgba(0, 245, 212, 0.1)" />
            </linearGradient>
          </defs>
          <path
            className="kline-path kline-path-primary"
            d="M0,300 L80,270 L150,310 L220,230 L300,250 L370,210 L450,240 L520,190 L600,220 L680,170 L760,210 L840,160 L920,200 L1000,150 L1080,180 L1160,140 L1200,160"
          />
          <path
            className="kline-path kline-path-secondary"
            d="M0,330 L70,320 L140,340 L210,300 L280,320 L350,280 L430,300 L500,260 L580,290 L660,250 L740,270 L820,240 L900,260 L980,230 L1060,250 L1140,220 L1200,230"
          />
          <path
            className="kline-band"
            d="M0,250 C120,220 200,260 320,230 C440,200 520,240 640,210 C760,180 840,220 960,190 C1080,160 1160,200 1200,180 L1200,220 C1080,240 1000,260 880,250 C760,240 700,270 560,260 C420,250 340,280 200,270 C120,265 60,285 0,290 Z"
          />
          <g className="kline-dots">
            <circle cx="80" cy="270" r="4" />
            <circle cx="220" cy="230" r="3" />
            <circle cx="370" cy="210" r="4" />
            <circle cx="520" cy="190" r="3" />
            <circle cx="680" cy="170" r="4" />
            <circle cx="840" cy="160" r="3" />
            <circle cx="1000" cy="150" r="4" />
            <circle cx="1160" cy="140" r="3" />
          </g>
        </svg>
        <div className="kline-grid-flow" />
        <div className="kline-flow" />
      </div>
      <div className="grid" />
      <div className="particles" aria-hidden="true">
        {Array.from({ length: 10 }).map((_, index) => (
          <span key={`p-${index}`} />
        ))}
      </div>
      <div className="container">
        <div className="lang-toggle">
          <button type="button" onClick={toggleLocale}>
            {locale === 'en' ? '中文' : 'EN'}
          </button>
        </div>
        <section className="hero">
          <span className="pill">{t.heroPill}</span>
          <h1>{t.heroTitle}</h1>
          <p>{t.heroBody}</p>
          <div className="hero-cta">
            <span className="button">{t.heroCtaPrimary}</span>
            <span className="button secondary">{t.heroCtaSecondary}</span>
          </div>
        </section>

        <section className="section">
          <h2>{t.installTitle}</h2>
          <p>{t.installBody}</p>
          <div className="install-hint">{t.installHint}</div>
          <div className="tabs">
            <input type="radio" name="install-tabs" id="tab-claude" defaultChecked />
            <input type="radio" name="install-tabs" id="tab-codex" />
            <input type="radio" name="install-tabs" id="tab-openclaw" />

            <div className="tab-labels">
              <label htmlFor="tab-claude">{t.tabs[0]}</label>
              <label htmlFor="tab-codex">{t.tabs[1]}</label>
              <label htmlFor="tab-openclaw">{t.tabs[2]}</label>
            </div>

            <div className="tab-panels">
              {installCommands.map((cmd) => (
                <div className="tab-panel" key={cmd}>
                  <div className="code-block">
                    <div className="code">{cmd}</div>
                    <button type="button" className="copy" onClick={() => handleCopy(cmd)}>
                      {copied === cmd ? t.copiedLabel : t.copyLabel}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <h2>{t.stackTitle}</h2>
          <p>{t.stackBody}</p>
          <div className="cards">
            {t.stackCards.map((card) => (
              <div className="card" key={card.title}>
                <span className="tag">{card.tag}</span>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>{t.outputTitle}</h2>
          <div className="split">
            <div>
              <p>{t.outputBody}</p>
              <ul className="metrics">
                {t.outputItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="code">{t.apiSnippet}</div>
          </div>
        </section>

        <div className="footer">{t.footer}</div>
      </div>
    </main>
  );
}
