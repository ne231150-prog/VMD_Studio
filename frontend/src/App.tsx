import { useState } from 'react'
import './index.css'

type Screen = 'login' | 'register' | 'home' | 'project'

function App() {
  const [screen, setScreen] = useState<Screen>('login')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isDark, setIsDark] = useState(false)

  const handleLogin = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setScreen('home')
    }, 900)
  }

  return (
    <main className={isDark ? 'app dark' : 'app'}>
      {screen === 'login' && (
        <section className="authShell">
          <VisualPanel isDark={isDark} setIsDark={setIsDark} />

          <div className="loginPanel">
            <div className="languageSwitch">
              <button className="active">日本語</button>
              <button>English</button>
            </div>

            <div className="cardHeader">
              <p className="smallLabel">Sign in</p>
              <h2>店舗アカウントでログイン</h2>
              <p>VMD Studioへようこそ。</p>
            </div>

            <form className="loginForm">
              <label>
                メールアドレス
                <input type="email" placeholder="store@example.com" />
              </label>

              <label>
                パスワード
                <div className="passwordField">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder=""
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </label>

              <div className="formOptions">
                <label className="checkLabel">
                  <input type="checkbox" />
                  ログイン状態を保持
                </label>
                <button type="button">パスワードを忘れた方</button>
              </div>

              <button
                type="button"
                className="primaryButton"
                onClick={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'ログイン'}
              </button>
            </form>

            <div className="subActions">
              <span>初めて利用する店舗ですか？</span>
              <button type="button" onClick={() => setScreen('register')}>
                新規登録
              </button>
            </div>
          </div>
        </section>
      )}

      {screen === 'register' && (
        <section className="singleCardShell">
          <div className="wideCard">
            <button className="backButton" onClick={() => setScreen('login')}>
              ← ログインへ戻る
            </button>

            <div className="cardHeader">
              <p className="smallLabel">Create account</p>
              <h2>VMD Studioをはじめる</h2>
              <p>ブランド・店舗・VMDプロジェクトを管理するためのアカウントを作成します。</p>
            </div>

            <div className="formGrid">
              <label>
                会社名 / ブランド運営会社
                <input  />
              </label>
              <label>
                担当者名
                <input  />
              </label>
              <label>
                ブランド名
                <input  />
              </label>
              <label>
                メールアドレス
                <input type="email"  />
              </label>
              <label>
                パスワード
                <input type="password" placeholder="" />
              </label>
              <label>
                確認用パスワード
                <input type="password" placeholder="" />
              </label>
            </div>

            <button className="primaryButton wideButton" onClick={() => setScreen('home')}>
              アカウントを作成
            </button>
          </div>
        </section>
      )}

      {screen === 'home' && (
        <section className="workspaceShell">
          <aside className="sidebar">
            <div className="sideLogo">
              <span>VMD</span>
              <span>Studio</span>
            </div>

            <nav>
              <button className="active">ホーム</button>
              <button>プロジェクト</button>
              <button>商品管理</button>
              <button>ブランド設定</button>
            </nav>

            <button className="logoutButton" onClick={() => setScreen('login')}>
              ログアウト
            </button>
          </aside>

          <section className="workspace">
            <header className="workspaceHeader">
              <div>
                <p className="smallLabel">Workspace</p>
                <h2>VMDプロジェクト</h2>
                <p>店舗一覧ではなく、必要なタイミングで店舗・シーズンごとのVMDプロジェクトを作成します。</p>
              </div>
              <button className="primaryButton compactButton" onClick={() => setScreen('project')}>
                ＋ 新規プロジェクト
              </button>
            </header>

            <div className="emptyState">
              <div className="emptyIcon">◇</div>
              <h3>まだプロジェクトがありません</h3>
              <p>
                新店舗・シーズンVMD・SALE展開など、目的ごとにプロジェクトを作成できます。
              </p>
              <button className="primaryButton compactButton" onClick={() => setScreen('project')}>
                最初のプロジェクトを作成
              </button>
            </div>
          </section>
        </section>
      )}

      {screen === 'project' && (
        <section className="workspaceShell">
          <aside className="sidebar">
            <div className="sideLogo">
              <span>VMD</span>
              <span>Studio</span>
            </div>

            <nav>
              <button onClick={() => setScreen('home')}>ホーム</button>
              <button className="active">新規プロジェクト</button>
              <button>商品管理</button>
              <button>ブランド設定</button>
            </nav>
          </aside>

          <section className="workspace">
            <header className="workspaceHeader">
              <div>
                <p className="smallLabel">New project</p>
                <h2>新規VMDプロジェクト作成</h2>
                <p>新店舗オープンや季節VMDなど、目的ごとに作成します。</p>
              </div>
            </header>

            <div className="projectFormCard">
              <div className="formGrid">
                <label>
                  プロジェクト名
                  <input  />
                </label>
                <label>
                  ブランド名
                  <input  />
                </label>
                <label>
                  店舗名
                  <input  />
                </label>
                <label>
                  目的
                  <select>
                    <option>新作VMD</option>
                    <option>SALE展開</option>
                    <option>新店舗オープン</option>
                    <option>シーズン変更</option>
                  </select>
                </label>
              </div>

              <div className="uploadArea">
                <p className="smallLabel">Store assets</p>
                <h3>店舗画像・図面を追加</h3>
                <p>店舗正面、入口、ラック周辺、テーブル周辺、図面などを後から追加できます。</p>
                <button className="secondaryButton">画像を追加</button>
              </div>

              <button className="primaryButton wideButton" onClick={() => setScreen('home')}>
                プロジェクトを作成
              </button>
            </div>
          </section>
        </section>
      )}
    </main>
  )
}

function VisualPanel({
  isDark,
  setIsDark,
}: {
  isDark: boolean
  setIsDark: (value: boolean) => void
}) {
  return (
    <div className="visualPanel">
      <div className="topBar">
        <div className="brandMark">
          <span>VMD</span>
          <span>Studio</span>
        </div>
        <button className="modeButton" onClick={() => setIsDark(!isDark)}>
          {isDark ? 'Light' : 'Dark'}
        </button>
      </div>

      <div className="studioGraphic">
        <div className="floor" />
        <div className="rack rackOne" />
        <div className="rack rackTwo" />
        <div className="tableObject" />
        <div className="mannequinObject" />
        <div className="lightBeam lightOne" />
        <div className="lightBeam lightTwo" />
      </div>

      <div className="visualText">
        <p className="eyebrow">Virtual Merchandising Design</p>
        <h1>Design retail before reality.</h1>
        <p>
          店舗VMDを、実店舗で動かす前にバーチャル空間で設計・確認・共有する。
        </p>
      </div>
    </div>
  )
}

export default App
