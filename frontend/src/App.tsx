import { useState } from 'react'
import './index.css'

type Screen = 'login' | 'register' | 'home' | 'project' | 'products'
type ProjectStep = 'project' | 'store' | 'assets' | 'ready'

const steps = [
  { id: 'project', label: 'Project', sub: '基本情報' },
  { id: 'store', label: 'Store', sub: '店舗情報' },
  { id: 'assets', label: 'Assets', sub: '画像・図面' },
  { id: 'ready', label: 'AI Ready', sub: '解析準備' },
] as const

function App() {
  const [screen, setScreen] = useState<Screen>('login')
  const [step, setStep] = useState<ProjectStep>('project')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [saved, setSaved] = useState(false)
  const [stepErrors, setStepErrors] = useState<Record<ProjectStep, boolean>>({
    project: false,
    store: false,
    assets: false,
    ready: false,
  })
  const [projectData, setProjectData] = useState({
    projectName: '',
    brandName: '',
    storeName: '',
    ownerName: '',
    address: '',
    area: '',
    ceiling: '',
    entrances: '',
    racks: '',
    tables: '',
  })
  const [uploadedAssets, setUploadedAssets] = useState<Record<string, {
    name: string
    size: string
    url: string
  }>>({})

  const stepIndex = steps.findIndex((item) => item.id === step)

  const handleLogin = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setScreen('home')
    }, 800)
  }

  const isStepComplete = (targetStep: ProjectStep) => {
    if (targetStep === 'project') {
      return Boolean(
        projectData.projectName.trim() &&
        projectData.brandName.trim() &&
        projectData.storeName.trim() &&
        projectData.ownerName.trim()
      )
    }

    if (targetStep === 'store') {
      return Boolean(
        projectData.address.trim() &&
        projectData.area.trim() &&
        projectData.ceiling.trim() &&
        projectData.entrances.trim() &&
        projectData.racks.trim() &&
        projectData.tables.trim()
      )
    }

    if (targetStep === 'assets') {
      return ['正面', '入口', '左側', '右側'].every((asset) =>
        Boolean(uploadedAssets[asset])
      )
    }

    return true
  }

  const goNext = () => {
    if (!isStepComplete(step)) {
      setStepErrors((prev) => ({ ...prev, [step]: true }))
      return
    }

    setStepErrors((prev) => ({ ...prev, [step]: false }))
    const next = steps[stepIndex + 1]
    if (next) setStep(next.id)
  }

  const goBack = () => {
    const prev = steps[stepIndex - 1]
    if (prev) setStep(prev.id)
  }

  const saveDraft = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 1600)
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
                <input type="email" />
              </label>

              <label>
                パスワード
                <div className="passwordField">
                  <input type={showPassword ? 'text' : 'password'} />
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

              <button type="button" className="primaryButton" onClick={handleLogin} disabled={isLoading}>
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
              <label>担当者名<input /></label>
              <label>メールアドレス<input type="email" /></label>
              <label>パスワード<input type="password" /></label>
              <label>確認用パスワード<input type="password" /></label>
              <label>ブランド名<input /></label>
              <label>利用目的
                <select>
                  <option>VMD作成</option>
                  <option>新店舗オープン</option>
                  <option>本部運用</option>
                  <option>テスト利用</option>
                </select>
              </label>
            </div>

            <button className="primaryButton wideButton" onClick={() => setScreen('home')}>
              アカウントを作成
            </button>
          </div>
        </section>
      )}

      {screen === 'home' && (
        <WorkspaceShell setScreen={setScreen} currentScreen={screen}>
          <section className="workspace">
            <header className="workspaceHeader">
              <div>
                <p className="smallLabel">Workspace</p>
                <h2>VMDプロジェクト</h2>
                <p>店舗一覧ではなく、新店舗・シーズン・SALEなど目的ごとにVMDプロジェクトを作成します。</p>
              </div>
              <button className="primaryButton compactButton" onClick={() => {
                setStep('project')
                setScreen('project')
              }}>
                ＋ 新規プロジェクト
              </button>
            </header>

            <div className="projectPreviewGrid">
              <div className="emptyState">
                <div className="emptyIcon">◇</div>
                <h3>まだプロジェクトがありません</h3>
                <p>最初のVMDプロジェクトを作成し、店舗画像・商品・VMD編集を始めましょう。</p>
                <button className="primaryButton compactButton" onClick={() => setScreen('project')}>
                  最初のプロジェクトを作成
                </button>
              </div>

              <div className="insightPanel">
                <p className="smallLabel">Next</p>
                <h3>VMD Studioの流れ</h3>
                <div className="miniFlow">
                  <span>Project</span>
                  <span>Store</span>
                  <span>Assets</span>
                  <span>AI Ready</span>
                  <span>VMD Editor</span>
                </div>
              </div>
            </div>
          </section>
        </WorkspaceShell>
      )}


      {screen === 'products' && (
        <WorkspaceShell setScreen={setScreen} currentScreen={screen}>
          <ProductManagement />
        </WorkspaceShell>
      )}

      {screen === 'project' && (
        <WorkspaceShell setScreen={setScreen} currentScreen={screen}>
          <section className="workspace projectWorkspace">
            <header className="projectTopBar">
              <div>
                <p className="breadcrumb">Workspace ＞ Projects ＞ New</p>
                <h2>新規VMDプロジェクト作成</h2>
              </div>

              <div className="projectActions">
                <span className={saved ? 'saveStatus saved' : 'saveStatus'}>
                  {saved ? '✓ Saved' : '● Draft'}
                </span>
                <button className="secondaryButton" onClick={saveDraft}>保存</button>
                {stepIndex > 0 && <button className="secondaryButton" onClick={goBack}>戻る</button>}
                {stepIndex < steps.length - 1 ? (
                  <button className="primaryButton compactButton" onClick={goNext}>次へ</button>
                ) : (
                  <button className="primaryButton compactButton" onClick={() => setScreen('home')}>作成完了</button>
                )}
              </div>
            </header>

            <div className="stepLayout">
              <aside className="stepRail">
                {steps.map((item, index) => (
                  <button
                    key={item.id}
                    className={`stepItem ${step === item.id ? 'active' : ''} ${isStepComplete(item.id) ? 'done' : ''} ${stepErrors[item.id] ? 'error' : ''}`}
                    onClick={() => setStep(item.id)}
                  >
                    <span>
                      {isStepComplete(item.id) ? '✓' : stepErrors[item.id] ? '!' : index + 1}
                    </span>
                    <div>
                      <strong>{item.label}</strong>
                      <small>{item.sub}</small>
                    </div>
                  </button>
                ))}
              </aside>

              <section className="stepContent">
                {step === 'project' && (
                  <ProjectStep
                    data={projectData}
                    setData={setProjectData}
                    hasError={stepErrors.project}
                  />
                )}
                {step === 'store' && (
                  <StoreStep
                    data={projectData}
                    setData={setProjectData}
                    hasError={stepErrors.store}
                  />
                )}
                {step === 'assets' && (
                  <AssetsStep
                    uploadedAssets={uploadedAssets}
                    setUploadedAssets={setUploadedAssets}
                    hasError={stepErrors.assets}
                  />
                )}
                {step === 'ready' && <ReadyStep uploadedAssets={uploadedAssets} />}
              </section>
            </div>
          </section>
        </WorkspaceShell>
      )}
    </main>
  )
}

function WorkspaceShell({
  children,
  setScreen,
  currentScreen,
}: {
  children: React.ReactNode
  setScreen: (screen: Screen) => void
  currentScreen: Screen
}) {
  return (
    <section className="workspaceShell">
      <aside className="sidebar">
        <div className="sideLogo">
          <span>VMD</span>
          <span>Studio</span>
        </div>

        <nav>
          <button className={currentScreen === 'home' ? 'active' : ''} onClick={() => setScreen('home')}>⌂ ホーム</button>
          <button className={currentScreen === 'project' ? 'active' : ''} onClick={() => setScreen('project')}>□ プロジェクト</button>
          <button className={currentScreen === 'products' ? 'active' : ''} onClick={() => setScreen('products')}>◇ 商品管理</button>
          <button>◌ ブランド設定</button>
          <button>⚙ 設定</button>
        </nav>

        <button className="logoutButton" onClick={() => setScreen('login')}>
          ログアウト
        </button>
      </aside>

      {children}
    </section>
  )
}

function ProjectStep({
  data,
  setData,
  hasError,
}: {
  data: {
    projectName: string
    brandName: string
    storeName: string
    ownerName: string
  }
  setData: React.Dispatch<React.SetStateAction<any>>
  hasError: boolean
}) {
  return (
    <div className="stepCard">
      <p className="smallLabel">Project</p>
      <h3>プロジェクト情報</h3>
      <p className="stepLead">シーズンや目的ごとに、VMD案をプロジェクトとして管理します。</p>

      {hasError && (
        <div className="formError">
          必須項目が未入力です。プロジェクト名・ブランド名・店舗名・担当者を入力してください。
        </div>
      )}

      <div className="formGrid">
        <label>プロジェクト名<input value={data.projectName} onChange={(e) => setData((prev: any) => ({ ...prev, projectName: e.target.value }))} /></label>
        <label>ブランド名<input value={data.brandName} onChange={(e) => setData((prev: any) => ({ ...prev, brandName: e.target.value }))} /></label>
        <label>店舗名<input value={data.storeName} onChange={(e) => setData((prev: any) => ({ ...prev, storeName: e.target.value }))} /></label>
        <label>シーズン
          <select>
            <option>Spring</option>
            <option>Summer</option>
            <option>Autumn</option>
            <option>Winter</option>
            <option>All season</option>
          </select>
        </label>
        <label>目的
          <select>
            <option>通常VMD</option>
            <option>新作VMD</option>
            <option>SALE展開</option>
            <option>新店舗オープン</option>
            <option>POPUP / イベント</option>
            <option>撮影用</option>
          </select>
        </label>
        <label>担当者<input value={data.ownerName} onChange={(e) => setData((prev: any) => ({ ...prev, ownerName: e.target.value }))} /></label>
      </div>
    </div>
  )
}

function StoreStep({
  data,
  setData,
  hasError,
}: {
  data: {
    address: string
    area: string
    ceiling: string
    entrances: string
    racks: string
    tables: string
  }
  setData: React.Dispatch<React.SetStateAction<any>>
  hasError: boolean
}) {
  return (
    <div className="stepCard">
      <p className="smallLabel">Store</p>
      <h3>店舗情報</h3>
      <p className="stepLead">店舗構造を後から3D化しやすいよう、最低限の店舗情報を整理します。</p>

      {hasError && (
        <div className="formError">
          店舗情報が未入力です。すべての項目を入力してください。
        </div>
      )}

      <div className="formGrid">
        <label>住所<input value={data.address} onChange={(e) => setData((prev: any) => ({ ...prev, address: e.target.value }))} /></label>
        <label>売場面積 (㎡)<input type="number" value={data.area} onChange={(e) => setData((prev: any) => ({ ...prev, area: e.target.value }))} /></label>
        <label>天井の高さ (m)<input type="number" value={data.ceiling} onChange={(e) => setData((prev: any) => ({ ...prev, ceiling: e.target.value }))} /></label>
        <label>入口数<input type="number" value={data.entrances} onChange={(e) => setData((prev: any) => ({ ...prev, entrances: e.target.value }))} /></label>
        <label>ラック数<input type="number" value={data.racks} onChange={(e) => setData((prev: any) => ({ ...prev, racks: e.target.value }))} /></label>
        <label>テーブル数<input type="number" value={data.tables} onChange={(e) => setData((prev: any) => ({ ...prev, tables: e.target.value }))} /></label>
      </div>
    </div>
  )
}

function AssetsStep({
  uploadedAssets,
  setUploadedAssets,
  hasError,
}: {
  uploadedAssets: Record<string, { name: string; size: string; url: string }>
  setUploadedAssets: React.Dispatch<React.SetStateAction<Record<string, { name: string; size: string; url: string }>>>
  hasError: boolean
}) {
  const assets = ['正面', '入口', '左側', '右側', '中央', 'ラック', 'レジ', 'テーブル', '天井', '床', '図面', '動画']

  const handleFile = (asset: string, file?: File) => {
    if (!file) return

    const url = URL.createObjectURL(file)
    const size = `${(file.size / 1024 / 1024).toFixed(1)}MB`

    setUploadedAssets((prev) => ({
      ...prev,
      [asset]: {
        name: file.name,
        size,
        url,
      },
    }))
  }

  const removeFile = (asset: string) => {
    setUploadedAssets((prev) => {
      const next = { ...prev }
      delete next[asset]
      return next
    })
  }

  return (
    <div className="stepCard">
      <p className="smallLabel">Assets</p>
      <h3>店舗画像・図面</h3>
      <p className="stepLead">店舗写真や図面を登録します。将来的にAIが3D店舗生成に利用します。</p>

      {hasError && (
        <div className="formError">
          AI解析の最低条件として、正面・入口・左側・右側の画像が必要です。
        </div>
      )}

      <div className="assetGrid redesigned">
        {assets.map((asset) => {
          const uploaded = uploadedAssets[asset]

          return (
            <div className={uploaded ? 'assetSlot uploaded' : 'assetSlot'} key={asset}>
              {uploaded ? (
                <>
                  <img src={uploaded.url} alt={asset} />
                  <div className="assetMeta">
                    <strong>{asset}</strong>
                    <small>{uploaded.name}</small>
                    <small>{uploaded.size}</small>
                  </div>
                  <div className="assetButtons">
                    <label>
                      変更
                      <input
                        type="file"
                        accept="image/*,application/pdf,video/*"
                        hidden
                        onChange={(e) => handleFile(asset, e.target.files?.[0])}
                      />
                    </label>
                    <button type="button" onClick={() => removeFile(asset)}>削除</button>
                  </div>
                </>
              ) : (
                <label className="uploadLabel">
                  <span>＋</span>
                  <strong>{asset}</strong>
                  <small>画像を追加</small>
                  <input
                    type="file"
                    accept="image/*,application/pdf,video/*"
                    hidden
                    onChange={(e) => handleFile(asset, e.target.files?.[0])}
                  />
                </label>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ReadyStep({ uploadedAssets }: { uploadedAssets: Record<string, { name: string; size: string; url: string }> }) {
  return (
    <div className="readyGrid">
      <div className="stepCard">
        <p className="smallLabel">AI Ready</p>
        <h3>店舗3D生成の準備</h3>
        <p className="stepLead">現時点ではAIは接続せず、将来の3D生成に必要なデータを整理します。</p>

        <div className="readinessList">
          <Readiness label="店舗画像" value={`${Object.keys(uploadedAssets).length} / 12`} percent={Math.round((Object.keys(uploadedAssets).length / 12) * 100)} />
          <Readiness label="図面" value={uploadedAssets['図面'] ? '1 / 1' : '0 / 1'} percent={uploadedAssets['図面'] ? 100 : 0} />
          <Readiness label="動画" value={uploadedAssets['動画'] ? '1 / 1' : '0 / 1'} percent={uploadedAssets['動画'] ? 100 : 0} />
          <Readiness label="店舗情報" value="6 / 6" percent={100} />
        </div>
      </div>

      <div className="analysisPanel">
        <p className="smallLabel">Readiness score</p>
        <strong>72%</strong>
        <span>AI解析準備</span>
        <button className="primaryButton compactButton">解析開始</button>
      </div>
    </div>
  )
}

function Readiness({ label, value, percent }: { label: string; value: string; percent: number }) {
  return (
    <div className="readinessItem">
      <div>
        <strong>{label}</strong>
        <span>{value}</span>
      </div>
      <div className="progressTrack">
        <div className="progressBar" style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}


function ProductManagement() {
  const [category, setCategory] = useState<'トップス' | 'パンツ' | 'アイテム'>('トップス')
  const [images, setImages] = useState<Record<string, { name: string; url: string }>>({})

  const imageTypes = ['前面', '背面', '横', 'モデル着用', '拡大']

  const handleImage = (type: string, file?: File) => {
    if (!file) return

    setImages((prev) => ({
      ...prev,
      [type]: {
        name: file.name,
        url: URL.createObjectURL(file),
      },
    }))
  }

  return (
    <section className="workspace productWorkspace">
      <header className="workspaceHeader">
        <div>
          <p className="smallLabel">Product library</p>
          <h2>商品管理</h2>
          <p>VMDで使用する商品を登録します。カテゴリはトップス・パンツ・アイテムで管理します。</p>
        </div>
        <button className="primaryButton compactButton">＋ 商品を保存</button>
      </header>

      <div className="productLayout">
        <section className="productFormPanel">
          <div className="categoryTabs">
            {(['トップス', 'パンツ', 'アイテム'] as const).map((item) => (
              <button
                key={item}
                className={category === item ? 'active' : ''}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="formGrid">
            <label>商品名<input /></label>
            <label>SKU / 品番<input /></label>
            <label>カラー<input /></label>
            <label>サイズ<input /></label>
            <label>価格<input type="number" /></label>
            <label>在庫数<input type="number" /></label>
          </div>

          <div className="productImageGrid">
            {imageTypes.map((type) => {
              const img = images[type]

              return (
                <label className={img ? 'productImageCard uploaded' : 'productImageCard'} key={type}>
                  {img ? (
                    <>
                      <img src={img.url} alt={type} />
                      <strong>{type}</strong>
                      <small>{img.name}</small>
                    </>
                  ) : (
                    <>
                      <span>＋</span>
                      <strong>{type}</strong>
                      <small>画像を追加</small>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => handleImage(type, e.target.files?.[0])}
                  />
                </label>
              )
            })}
          </div>
        </section>

        <aside className="productPreviewPanel">
          <p className="smallLabel">Preview</p>
          <h3>商品カード</h3>

          <div className="previewCard">
            <div className="previewImage">
              {images['前面'] ? <img src={images['前面'].url} alt="preview" /> : <span>商品画像</span>}
            </div>
            <div>
              <strong>New Product</strong>
              <p>{category}</p>
              <small>VMD配置準備中</small>
            </div>
          </div>

          <div className="aiReadyBox">
            <span>AI Ready</span>
            <strong>{Object.keys(images).length} / 5</strong>
            <p>前面・背面・横・モデル着用・拡大画像が揃うほど、将来の3D生成精度が上がります。</p>
          </div>
        </aside>
      </div>
    </section>
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
        <p>店舗VMDを、実店舗で動かす前にバーチャル空間で設計・確認・共有する。</p>
      </div>
    </div>
  )
}

export default App
