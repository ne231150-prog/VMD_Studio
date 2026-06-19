import { useState } from 'react'
import './index.css'

function App() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isDark, setIsDark] = useState(false)

  const handleLogin = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 1200)
  }

  return (
    <main className={isDark ? 'app dark' : 'app'}>
      <section className="authShell">
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
                  placeholder="••••••••"
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
            <button type="button">新規登録</button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
