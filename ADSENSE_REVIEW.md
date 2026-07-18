# AdSense 审核检查

检查日期：2026-07-16

## 结论

代码层面的高风险问题已经处理完。站点现在有可直接使用的主工具、足量原创正文、清晰导航、双语信任页面、准确的隐私说明和可用的联系渠道。俄语与英语都在 AdSense 支持语言列表中。

仅凭当前仓库还不能确认站点已经具备提交按钮所需的账户状态。仓库中没有 AdSense 发布商 ID、站点验证代码或 `ads.txt`，AdSense 后台也需要先添加域名并完成所有权检查。如果后台认可现有的 Search Console 所有权，可以按它提供的方式验证；否则要使用账户给出的真实代码或 meta 标签，不能使用占位值。欧洲经济区、英国和瑞士的同意管理平台也要在 AdSense 后台配置。Google 会检查整个站点，最终结果由 Google 决定，代码检查不能保证通过。

## 本次修复

| 问题 | 处理结果 |
|---|---|
| 首页打开后被全屏启动页遮住，访客必须先点击才能看到工具和正文 | 删除启动页。首页现在直接显示可用的 Color Dice 工具，正文和导航可以正常滚动查看 |
| “Игрок / Player” 面板只校验本地随机码，却声称用户在线 | 删除该面板、动态文案和 `kolor_dais_player_code` 存储项 |
| `hello@colordice.app` 没有 MX 记录，联系地址不可投递 | 联系页改用公开的 GitHub Issues，并明确提醒不要提交个人信息 |
| 英文首页没有 About、Contact、Privacy、Terms 入口 | 新增四个英文信任页面，并从英文页脚链接 |
| 隐私政策没有覆盖 AdSense cookie、网页信标、IP 地址、广告合作方和同意管理 | 俄语、英语隐私政策已补齐。页面同时说明当前尚未安装广告代码，避免把未来状态写成现状 |
| 英文 “Scratch & Win” 暗示存在奖品 | 改为 “Scratch Reveal” |
| 色彩图例沿用含糊的交易文案，规则页黄色行还把颜色名称写成了“Выбор” | 图例改为游戏动作，表格恢复正确的“Жёлтый”颜色名 |
| 站内文案节奏模板化，存在固定三段式、夸张短句和弯曲引号 | 按 `humanizer` 的 33 项检查表重写所有用户可见正文和动态文案。最终扫描没有发现 em dash、en dash 或英文弯曲引号 |
| 俄语模式说明在深色背景上对比度不足，语言按钮的可访问名称没有包含可见的 RU 或 EN | 提高文字对比度，并让按钮名称保留可见语言代码。俄语和英语的 Lighthouse Accessibility 均恢复为 100 |
| 自动评论外链任务每天批量向第三方网站发帖 | 已卸载 LaunchAgent，删除其 plist、仓库脚本和操作文档。Google 把自动创建链接和带优化链接的评论列为 link spam |

## 内容和 SEO 复测

文案重写保留了原来的关键词页面分工。四个可索引页面仍然各自服务一个搜索意图，canonical、hreflang、robots 和 sitemap 结构没有改变。

| 页面 | 可见词数 | 主词出现次数 | 主词出现率 | Title 字符 | Description 字符 | H1 |
|---|---:|---:|---:|---:|---:|---:|
| `/` | 1051 | `колор дайс` 25 次 | 2.38% | 54 | 146 | 1 |
| `/en/` | 1078 | `color dice` 21 次 | 1.95% | 53 | 158 | 1 |
| `/pravila/` | 607 | `колор дайс` 13 次 | 2.14% | 56 | 154 | 1 |
| `/kak-igrat/` | 628 | `колор дайс` 11 次 | 1.75% | 52 | 155 | 1 |

这里的出现率按“完整词组次数除以可见词数”计算，只用于改稿后的稳定性检查。正文没有为了达到固定百分比而重复关键词。

## 复测结果

- `html-validate` 通过全部 13 个 HTML 文件，sitemap 和 SVG 也通过 XML 解析。
- 13 个本地页面都返回 HTTP 200，每页只有一个 H1，canonical 和 robots 设置与页面分工一致。
- 181 个链接实例均指向有效的站内路径或明确的外部地址，没有 `nofollow`。四段 JSON-LD 都能正常解析。
- 俄语和英语桌面版、390 像素移动版均无横向溢出，浏览器控制台没有错误或警告。
- 普通投掷、六骰子 Mega Roll、六张键盘 Scratch 卡、主题、声音、结果存储和双语状态均已实际操作。官方项目测试客户端在两个首页各完成两次投掷，并回到 `mode: ready`。
- 俄语 Lighthouse 为 Performance 99、Accessibility 100、Best Practices 100、SEO 100。英语为 99、100、100、100。两页 LCP 均为 2.1 秒，CLS 均为 0。

## 提交审核前必须完成的账户操作

1. 在 AdSense 的 Sites 页面添加 `xn--80ahqbfrbqm.com`。使用真实的 AdSense 代码、meta 验证标签或已经验证的 Search Console 所有权完成连接。
2. 如果使用 AdSense 发布商 ID，按后台给出的内容创建 `/ads.txt`。格式中的 `pub-...` 必须是真实 ID。仓库没有添加占位文件，因为错误的发布商声明会造成新的问题。
3. 在 Privacy & messaging 中启用 Google CMP，或选择另一家 Google 认证 CMP。对欧洲经济区、英国和瑞士访客，应提供同意、拒绝和管理选项，并正确传递同意信号。
4. 根据实际受众判断是否属于面向 13 岁以下儿童的站点。页面包含课堂用法，但没有收集年龄。如果实际受众以儿童为主，应在 Search Console 或广告请求中启用儿童待遇标记。这个选择不能仅凭代码代替站点所有者作出。
5. 检查 AdSense 账户年龄、收款信息和重复账户状态。Google 只允许每位发布商使用一个账户，并要求申请人年满 18 岁。这些信息不在仓库中，无法通过代码验证。

## 广告上线后的放置规则

- 不在投掷动画、Mega Roll、Scratch Card、菜单、导航或纯 404 页面上放广告。
- 游戏需要频繁点击和滑动。广告与游戏边缘至少留出 150 像素，移动端也要避免广告贴近投掷按钮和刮卡区域。
- 优先把手动广告单元放在游戏区之后、正文段落之间或正文结束之后。不要让广告遮挡内容，也不要用全屏广告替代进入游戏的步骤。
- 广告必须明显区别于站内卡片和导航。需要标签时只使用 “Advertisements” 或 “Sponsored links”。
- 广告和付费推广的总量不能超过发布者内容。首页已有完整工具和 1000 词以上正文，不需要为了广告再制造薄页面。
- 上线后持续检查流量来源。不要恢复自动评论、自动建链、流量交换或其他无法验证质量的推广方式。

## 仍需留意的外部风险

以前自动发布的评论可能仍留在第三方网站，仓库无法批量撤回。能够登录并删除的明显推广评论应逐步清理，至少不要再创建新评论。站点最初参考了 `colordice.vercel.app` 的界面，本仓库没有嵌入该站内容或第三方媒体，正文和动态文案也已重写。如果站点所有者没有参考设计的使用权，仍需自行确认视觉设计的知识产权边界。

## 官方文档依据

- [站点尚未准备好展示广告时应检查什么](https://support.google.com/adsense/answer/12176698?hl=en)
- [确保网站页面已准备好使用 AdSense](https://support.google.com/adsense/answer/7299563?hl=en)
- [账户未获批准的常见原因](https://support.google.com/adsense/answer/81904?hl=en)
- [AdSense 资格要求](https://support.google.com/adsense/answer/9724?hl=en)
- [站点所有权要求](https://support.google.com/adsense/answer/91205?hl=en)
- [连接站点并请求审核](https://support.google.com/adsense/answer/7584263?hl=en)
- [查看站点审核与 ads.txt 状态](https://support.google.com/adsense/answer/12170222?hl=en)
- [AdSense 计划政策](https://support.google.com/adsense/answer/48182?hl=en)
- [Google 发布商政策](https://support.google.com/publisherpolicies/answer/10502938?hl=en)
- [复制内容政策说明](https://support.google.com/publisherpolicies/answer/11190248?hl=en)
- [隐私披露要求](https://support.google.com/publisherpolicies/answer/10437794?hl=en)
- [AdSense 如何使用 cookie](https://support.google.com/adsense/answer/7549925?hl=en)
- [Google 支持的发布语言](https://support.google.com/adsense/answer/9727?hl=en)
- [游戏页面的广告放置要求](https://support.google.com/adsense/answer/2768340?hl=en)
- [广告放置政策](https://support.google.com/adsense/answer/1346295/ad-placement-policies?hl=en)
- [欧洲经济区、英国和瑞士的 CMP 要求](https://support.google.com/adsense/answer/13554116?hl=en)
- [儿童待遇标记](https://support.google.com/adsense/answer/3248194?hl=en)
- [Google 搜索垃圾政策中的 link spam](https://developers.google.com/search/docs/essentials/spam-policies#link-spam)

---

## 二次复核（2026-07-17，对照官方文档）

按 AdSense“站点尚未准备好”与“确保页面已准备好”两篇官方文档，以及资格、审核、隐私披露等相关文档，重新逐项核对了当前仓库和线上站点。

### 逐条对照官方要求

| 官方要求（文档） | 当前状态 | 判定 |
|---|---|---|
| 页面有足量原创内容，非“薄页”或施工中（answer/81904、answer/10015918） | 首页 RU 1461 词、EN 1517 词，`/pravila/` 677 词、`/kak-igrat/` 793 词，均为完整段落 | 通过 |
| 清晰、可用的导航栏，链接指向正确内容（answer/7299563） | 头部锚点导航 + 页脚信任页链接，站内链接经复核全部有效 | 通过 |
| 站点已发布、可公开访问、无登录墙 | 线上 `https://xn--80ahqbfrbqm.com/` 返回 HTTP/2 200 | 通过 |
| 有效 HTTPS 证书并从 HTTP 跳转（answer/12176698） | Cloudflare 提供 HTTPS，返回头正常 | 通过 |
| robots.txt 不屏蔽 AdSense 抓取工具 | 线上 robots.txt 为 `Allow: /`，未屏蔽 Mediapartners-Google | 通过 |
| 内容语言在支持列表内（answer/9727） | 俄语、英语均受支持 | 通过 |
| 隐私政策披露第三方（含 Google）广告 cookie，并**提供个性化广告退出链接**（answer/1348695） | 原政策仅说明 CMP，缺少 Google Ads Settings / aboutads.info 退出链接 | **本次已补** |

### 本次补充修复

| 问题 | 处理结果 |
|---|---|
| 俄语、英语隐私政策披露了广告 cookie 与 CMP，但没有按 answer/1348695 提供个性化广告退出入口 | 在两页“广告与 cookie”段落新增退出链接：Google 广告设置 `google.com/settings/ads` 与 `aboutads.info/choices`。`html-validate` 对两个文件返回 exit 0 |

### 结论

站点在**页面质量、导航、内容原创性、语言、可访问性、HTTPS 与 robots** 上都满足官方“页面已准备好”的要求，本次唯一发现的代码级缺口（隐私政策缺少广告退出链接）已修复。就仓库能覆盖的范围而言，代码层面没有已知的阻断项。

但**能否通过审核仍不由代码决定**，以下账户级操作必须由站点所有者在 AdSense 后台完成，仓库无法替代（详见上文“提交审核前必须完成的账户操作”）：

1. 在 Sites 添加 `xn--80ahqbfrbqm.com`，用真实 AdSense 代码 / meta 标签 / 已验证的 Search Console 所有权完成连接——**仓库中至今没有发布商 ID、验证代码或 `ads.txt`，禁止用占位值**。
2. 若使用发布商 ID，按后台生成的真实 `pub-...` 创建 `/ads.txt`。
3. 在 Privacy & messaging 启用 Google 认证 CMP，为欧洲经济区、英国、瑞士访客传递合规同意信号。
4. 确认账户唯一性、年满 18 岁、收款信息，以及是否需要儿童待遇标记。

提交后 Google 会抓取整站，审核期通常几天、也可能 2–4 周。代码检查通过不等于人工审核通过，最终结果以 Google 判定为准。

---

## 三次复核（2026-07-17）

本轮专门检查了上面的二次复核和新增隐私文案。退出入口应当保留，但二次复核中的部分依据和结论需要收紧。

### 对新增结论的意见

1. **补充广告退出入口是正确的。** AdSense 的 [Required content](https://support.google.com/adsense/answer/1348695?hl=en) 明确要求隐私政策说明 Google 和第三方供应商如何使用广告 cookie，并告知用户可以通过 Google Ads Settings 或 AboutAds 退出个性化广告。俄语和英语隐私页现在都提供了这两个入口。
2. **不能用词数直接判定“通过”。** Google 要求页面有足够的原创和有价值内容，让用户有访问和再次访问的理由，但官方没有公布最低词数。二次复核中的 1461、1517、677、793 也与前一次采用同一口径的统计不一致，因此不能把这些数字当作审核门槛或通过证据。判断应落在内容是否原创、是否解决用户问题、是否存在重复或薄页，而不是某个词数。
3. **HTTPS 不是独立的内容质量门槛。** [站点未准备好说明](https://support.google.com/adsense/answer/12176698?hl=en) 的原文是：如果站点使用 HTTPS，证书应由受认可机构签发，并应从 HTTP 跳转到 HTTPS。本站确实满足这项条件，但报告不应把它写成所有站点统一的审核要求。
4. **本地仓库和线上站点必须分开判断。** 2026 年 7 月 17 日复查生产环境时，`/` 和 `/en/` 仍在提供旧版本，包含已经在本地删除的启动遮罩和 Player 面板；线上俄语隐私页没有新增退出链接，`/en/privacy/` 返回 404。二次复核中“当前仓库和线上站点均已补齐”的表述不成立。
5. **第三方供应商披露要等账户配置确定后落实名单。** 当前没有广告代码，也不知道 AdSense 账户最终启用哪些供应商或广告网络，因此现在不应虚构名单。隐私页已经说明：如果上线前启用其他供应商，将补充名称、链接和隐私选项。广告上线前必须完成这一步。

### 本轮优化

- 将俄语和英语隐私政策的更新时间改为 2026 年 7 月 17 日。
- 保留 Google Ads Settings 和 AboutAds 两个退出入口，并补充实际第三方供应商上线前的披露要求。
- 调整 CMP 文案。没有必要把所有广告请求都写成绝对禁止；准确说法是，没有所需同意信号时不请求个性化广告，Google 可能根据用户选择提供非个性化或受限广告。相关依据见 [Google CMP 要求](https://support.google.com/adsense/answer/13554116?hl=en)。
- 修复俄语法律页在 390 像素宽度下的标题溢出。修复前页面宽度被撑到 445 像素，修复后恢复为 390 像素。
- 更新项目文档中的链接数量和最新验证数据。

### SEO 影响

本轮只修改两个 `noindex, follow` 隐私页、法律页移动端样式和项目文档。四个可索引页面的标题、description、H1、正文、canonical、hreflang、内部链接结构和 sitemap 均未改变，`колор дайс` 与 `color dice` 的主关键词策略不受影响。

### 复测结果

- 13 个 HTML 文件通过 `html-validate`，`app.js` 通过语法检查，sitemap 和 SVG 通过 XML 解析。
- 185 个链接实例全部指向有效的本地文件或明确的外部地址，四段 JSON-LD 均能解析。
- 两个隐私页在桌面和 390 像素移动端均无横向溢出，退出链接存在，控制台没有错误或警告。
- 普通投掷、六骰子 Mega Roll、六张键盘 Scratch 卡、主题、声音和本地结果恢复再次通过。官方项目测试客户端在俄语和英语首页各完成两轮并回到 `mode: ready`。
- 最新 Lighthouse：俄语和英语页面的 Performance 均为 99，Accessibility、Best Practices、SEO 均为 100；两页 LCP 均为 2.1 秒，CLS 均为 0。

### 最终判断

**本地仓库：** 本轮发现的隐私披露和移动端溢出问题已经修复。就静态代码、内容、导航和已知 AdSense 文档要求而言，没有发现新的代码级阻断项。

**生产站点：** 目前还不能沿用“已准备好提交”的结论。必须先提交并部署当前工作区，再确认 `/en/privacy/` 返回 200、俄语隐私页出现退出入口、首页不再显示启动遮罩和 Player 面板。完成部署后，还要在 AdSense 后台验证站点连接、真实发布商 ID、`ads.txt`、CMP、账户唯一性和受众设置。

审核时间“通常几天，个别情况 2–4 周”的说法与 Google 当前文档一致，但它只描述提交后的处理时间，不代表站点已经通过预审。

---

## 四次复核（2026-07-17，聚焦部署差距）

三次复核指出“本地仓库和线上站点必须分开判断”，这一判断成立，是整份文档最关键的一条。本轮对线上环境和本地 Git 状态做了独立核验，并把三次复核没有点破的根因补上。

### 对三次复核的意见

三次复核的五条修正都成立：词数不能当审核门槛、HTTPS 不是独立内容门槛、第三方供应商名单要等账户确定后再落实、退出入口应保留。唯一缺口是它确认了“线上是旧版本”，却没有说清**为什么**线上是旧版本，导致“下一步该做什么”不明确。

### 本轮独立核验（生产环境）

| 检查项 | 结果 |
|---|---|
| 线上 `/en/privacy/` | 返回 **404**（本地已存在该文件） |
| 线上俄语隐私页退出链接 | **缺失**，未出现 `google.com/settings/ads` 或 `aboutads.info` |
| 线上首页 | **仍在提供** `Игрок`/`player-code` 面板（本地已删除） |
| 本地工作区 | 上述修复全部存在且正确，隐私页更新日期为 2026-07-17 |

### 根因

`git status` 显示全部改动仍是**未提交**状态（modified / untracked），`git log origin/main..HEAD` 为空，说明既没有提交也没有推送。README 记载生产环境是 Cloudflare Pages 绑定 `main` 分支、**每次 push 触发部署**。因此从一次修复到本轮为止的所有改动都停留在工作区，从未到达 `main`，线上自然还是修复前的代码。这不是内容或政策问题，而是**改动没有落到生产分支**。

### 唯一阻断项与解除步骤

代码本身没有已知阻断项；真正卡住上线的是“未部署”。解除顺序：

1. 提交当前工作区改动（含四个英文信任页、隐私页退出链接、首页删除启动页/Player 面板、法律页移动端修复、文档）。
2. push 到 `main`，触发 Cloudflare Pages 部署。
3. 部署后按下表复验生产环境，全部满足才算“已准备好提交”。

> 涉及生产部署，推送前应由站点所有者确认。本轮未自动推送。

### 部署后必须复验（生产 URL）

- `https://xn--80ahqbfrbqm.com/en/privacy/` 返回 **200**（不再 404）。
- 俄语、英语隐私页均出现 `google.com/settings/ads` 与 `aboutads.info/choices` 退出链接。
- 首页不再出现启动遮罩和 `Игрок`/`player-code` 面板。
- 四个英文信任页（about / contact / privacy / terms）在线可达。

### 说明

文档顶部“结论”（2026-07-16）与一次、二次复核的“已准备好提交”表述，是在只看本地仓库的前提下写的，在生产环境完成上述部署与复验之前不成立。以本轮结论为准：**代码就绪，生产未部署，先提交并 push 到 `main`，复验通过后再在 AdSense 后台完成账户级连接与审核提交。**

---

## 五次复核（Claude，2026-07-18，代码层收尾核验）

> 注：本节与下方“Codex 第五次复核”是同日两个独立回合。本节完成后，Codex 又发现并修复了三项本节遗漏的问题（隐私披露逐项措辞、英文 FAQ JSON-LD 一致性、字体 OFL 许可）。因此本节末尾“代码层已无已知待修项”的措辞在当时并不成立，以下方 Codex 节及“六次复核（Claude 反审）”为准。

本轮在明确约束下进行：**不 commit / push / 部署，不登录或操作 AdSense 账户，不添加占位 publisher ID 或 `ads.txt`，不恢复自动外链，不改动目标关键词与页面意图。** 目标是把代码层能确认的项全部核验到位，并锁定唯一阻断项。

### 本轮独立核验结果（本地工作区）

| 检查项 | 结果 | 判定 |
|---|---|---|
| 首页残留 `player-code` / `splash-overlay` / `kolor_dais_player` | 0 处（匹配到的“игрок”均为游戏正文合法词） | 通过 |
| 隐私页广告退出链接（RU / EN 各含 `google.com/settings/ads` + `aboutads.info`） | 均存在，`aboutads` 为 href 与可见文本各一次，非重复缺陷 | 通过 |
| 隐私披露文案 | 已写明“第三方供应商含 Google 基于先前访问投放 cookie”，符合 answer/1348695 required content | 通过 |
| `html-validate`（全部 13 个 HTML） | exit 0 | 通过 |
| 每页唯一 H1 | 12 个 index 页均为 1 | 通过 |
| canonical 指向自身、四索引页 robots 一致 | 一致 | 通过 |
| 站内链接目标存在性 | 全部指向真实文件，无死链 | 通过 |
| JSON-LD | 4 段全部解析成功 | 通过 |
| sitemap.xml / favicon.svg XML 解析 | 通过 | 通过 |
| `app.js` 语法 | `node --check` 通过 | 通过 |

### 对日期不一致的说明（非缺陷）

`terms/` 与 `en/terms/` 的更新日期仍为 2026-07-16，隐私页为更晚日期。本轮未修改条款页内容，更新日期应反映真实修改时间，**不应仅为对齐而虚构日期**，故保留原状。这是有意为之，不是遗漏。

### 唯一阻断项（未变，且受约束不在本轮处理范围）

代码层无新增阻断项。真正阻断上线的仍是四次复核指出的**未部署**：所有修复停留在工作区，`git log origin/main..HEAD` 为空，Cloudflare Pages 仍在服务修复前的线上版本（`/en/privacy/` 404、首页仍有 Player 面板、隐私页无退出链接）。本轮按约束**未执行** commit / push / 部署，此项须由站点所有者确认后自行完成。

### 最终结论

就本仓库代码层可覆盖的全部范围而言，已无已知待修项：内容、导航、H1、canonical、hreflang、robots、sitemap、结构化数据、隐私披露、可访问性与站内链接均满足官方“页面已准备好”的要求。

**剩余全部为非代码事项，且均在本轮约束之外：**（1）提交并 push 到 `main` 触发部署，随后按四次复核的“部署后必须复验”清单核对生产 URL；（2）在 AdSense 后台完成站点连接、真实 publisher ID / `ads.txt`、CMP、账户唯一性与受众设置。代码检查通过不等于人工审核通过，最终结果由 Google 判定。

## Codex 第五次复核（2026-07-18）

### 独立结论

Claude 四次复核抓住了部署差距，但“唯一阻断项”和“代码本身没有已知阻断项”说得过满。本轮重新检查当前文件后又找到三项可修问题：英文 FAQ 的一条 JSON-LD 答案没有与页面可见文本逐字一致；两份隐私政策没有明确写出“包括 Google 在内的第三方供应商会依据此前访问使用 cookie 投放广告”；仓库分发 Lilita One 和 Nunito 字体，却没有附带 OFL 许可文本。这三项已经修复。

修复后，在当前仓库能够验证的代码和内容范围内，没有再发现会直接阻止 AdSense 站点审核的本地问题。这个判断不等于“完全符合”，也不保证 Google 批准。账户资格、实际流量、受众是否面向儿童、参考设计的使用权、最终广告位置、CMP 和供应商配置都不在仓库证据范围内。

部署差距仍然存在。`HEAD` 与 `origin/main` 都停在 `229a45b`，`origin/main..HEAD` 没有提交，当前修复全是未提交文件。2026-07-18 打开的公开 GitHub `main` 仍显示旧 README、旧 player code 说明和 outreach 文件。生产项目按现有文档从 `main` 自动部署，因此当前工作区不能视为已经上线。本轮遵守约束，没有 commit、push 或部署。

### 对官方文档和历史措辞的复核

1. [站点尚未准备好展示广告时该怎么做](https://support.google.com/adsense/answer/12176698?hl=en) 要求站点可公开访问、抓取工具不被 robots.txt 阻挡、HTTPS 有效，并且有足够的独特内容、良好体验和导航。它也说明可以在 Google 检测到 Search Console 所有权时继续检查，不必为了审核预先提交假的广告代码或 `ads.txt`。审核通常需要几天，个别情况为 2 到 4 周。这个时间范围不能用来推断站点已经通过预审。
2. [AdSense 内容与用户体验](https://support.google.com/adsense/answer/10015918?hl=en) 要求原创、有价值、方便导航的内容，并明确反对复制、轻微改写和没有增量价值的嵌入内容。该文档没有给出最低词数或关键词密度。历史报告中的词数只能用于回归检查，不能作为“通过”证据。
3. [Google Publisher Policies](https://support.google.com/publisherpolicies/answer/10502938?hl=en) 覆盖版权和误导性陈述、广告干扰操作、低价值页面、复制内容、广告多于发布商内容、隐私披露、儿童受众和 Search spam。代码检查只能确认当前页面没有这些明显模式，不能替权利人证明视觉设计的授权，也不能验证上线后的流量质量。
4. [Required content](https://support.google.com/adsense/answer/1348695?hl=en) 明确要求隐私政策说明：第三方供应商，包括 Google，会基于用户此前访问使用 cookie 投放广告；Google 的广告 cookie 允许 Google 及合作伙伴基于访问记录投放广告；用户可以从 Google Ads Settings 或 AboutAds 退出个性化广告。两份隐私政策现已逐项覆盖。
5. [EEA、英国和瑞士 CMP 要求](https://support.google.com/adsense/answer/13554116?hl=en) 的准确边界是：在这些地区投放个性化广告时，需要接入 Google 认证且整合 IAB TCF 的 CMP。官方同时写明，非认证 CMP 流量仍可能有资格获得非个性化广告或 limited ads。这里的“可能”不是保证。因此，历史文案把认证 CMP 概括成所有广告请求的绝对前置条件并不准确；当前隐私页的条件式写法更接近原文。
6. [AdSense 资格要求](https://support.google.com/adsense/answer/9724?hl=en) 要求申请人至少 18 岁并拥有原创内容。[账户未获批准](https://support.google.com/adsense/answer/81904?hl=en) 说明每位发布商只能有一个 AdSense 账户。这些都是账户级检查，仓库无法验证。
7. Google Search 的 [Search Essentials](https://developers.google.com/search/docs/essentials) 建议把用户会搜索的词自然放在 title、主标题、链接文字等显眼位置，并保持链接可抓取。[Spam policies](https://developers.google.com/search/docs/essentials/spam-policies) 反对为了排名不自然重复关键词和制造操纵性链接。[People-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) 强调真实用途、站点主旨和用户完成目标后的满足度。当前 SEO 结论据此判断，不把 playbook 的字符数、词数或密度建议写成 Google 硬阈值。
8. canonical、hreflang、sitemap 和结构化数据分别按 Google Search 的 [canonical 指南](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)、[多语言页面指南](https://developers.google.com/search/docs/specialty/international/localized-versions)、[sitemap 指南](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) 与 [结构化数据总则](https://developers.google.com/search/docs/appearance/structured-data/sd-policies) 复核。结构化数据可以帮助 Google 理解页面，但不保证富结果展示。

### 本地站点审核

| 领域 | 本轮证据 | 判断 |
|---|---|---|
| 原创性与价值 | 站点提供可操作的 1 到 6 个色彩骰子、普通投掷、Mega Roll、键盘可操作的 Scratch、色彩规则、概率说明、课堂和创作场景。抽查四个较长句子的精确搜索没有发现其他页面逐字匹配 | 内容不属于空壳或单纯嵌入。抽查不能证明全网唯一，也不能证明参考设计已获授权 |
| 导航与信任 | 俄语和英语首页都有可抓取导航、About、Contact、Privacy、Terms；Contact 指向可访问的公开 GitHub Issues | 本地结构完整。GitHub 是外部渠道，所有者仍需维护它 |
| 隐私与本地数据 | 页面说明 theme、sound、roll count、last result 保存在 localStorage，游戏历史不发往服务器；无账户、分析和广告脚本 | 当前行为与披露一致 |
| cookie 与 CMP | 双语政策明确第三方供应商、此前访问、Google 广告 cookie、web beacon、IP、退出链接和个性化广告 CMP 条件 | 仓库文案已覆盖当前可知信息；启用其他供应商后必须补实名单和选项 |
| 广告准备 | 仓库没有 `ca-pub`、广告单元、占位发布商 ID 或 `ads.txt` | 没有误配广告。实际连接方式只能使用账户给出的真实值或后台认可的 Search Console 所有权 |
| 广告位置风险 | 当前无广告。游戏区包含高频点击按钮、选择器和全屏叠层 | 日后不要把广告放进 game card、toolbar、Mega 或 Scratch 叠层，也不要贴着 Roll 按钮。优先放在完整内容段落之间，并复核广告不多于内容 |
| 技术抓取 | 四个 indexable URL 都有 self-canonical；sitemap 只含这四页；robots.txt 为 `Allow: /`；正文和内链在初始 HTML 中 | 静态抓取结构符合 playbook 最低要求 |
| 移动与可访问性 | 一个 H1、skip link、按钮名称、live result、键盘 Scratch、reduced motion 和装饰 canvas 的 `aria-hidden` 均保留 | 代码层未发现新问题。7 月 18 日动态环境受限，不能把 7 月 17 日浏览器结果冒充新测量 |
| 游戏与政策 | 页面没有下注、支付、奖品、提现、真实价值或赌场引导。Scratch 只是揭示随机颜色 | 当前证据不像赌博产品。受众是否面向儿童仍需所有者依据真实用户决定 |
| 外链与流量 | 自动评论脚本和 OUTREACH.md 在本地删除，没有恢复 | 旧评论和入站链接在仓库外，仍需人工检查；流量质量不能由代码证明 |

### 主关键词 SEO 与 playbook

本轮没有修改俄语或英语首页的 title、description、H1、首段、正文结构、页面意图、canonical 或 hreflang。唯一触及英语首页的改动，是让 FAQ JSON-LD 与可见答案中的 `"Roll Again."` 完全一致。`/en/` 的 sitemap `lastmod` 更新为 2026-07-18，因为结构化数据发生了修正。

| 检查项 | `/`，俄语主词 `колор дайс` | `/en/`，英语主词 `color dice` | 结论 |
|---|---|---|---|
| Title | 54 字符，主词在开头 | 53 字符，`Color Dice Roller` 在开头 | 满足 playbook 的写法建议 |
| Description | 146 字符，首部出现主词和在线工具价值 | 158 字符，覆盖 roll、online、free、用途 | 自然可读。字符数是编辑建议，不是 Google 硬上限 |
| H1 | 唯一 H1 为 `Колор Дайс` | 唯一 H1 为 `Color Dice Roller` | 满足 |
| 首段 | 第一段以 `Колор Дайс` 开头并说明 1 到 6 个骰子、随机结果和免安装 | 第一段以 `Color Dice` 开头并说明随机颜色、六色和用途 | 满足 |
| 正文与语义词 | 覆盖 цветные кубики、случайный цвет、онлайн、игра、урок、палитра、правила | 覆盖 random color、roller、online、games、lessons、art、palette、fairness | 主题完整，没有为了 AdSense 删减主词内容 |
| 内链与意图 | 首页连接规则页和玩法页，两页分别承接规则与教程意图 | 首页用可抓取锚点覆盖使用方法、颜色含义、模式和场景 | 没有新增重复意图页，也没有关键词互抢 |
| canonical 与 hreflang | self-canonical，ru、en、x-default 与英语页互相返回 | self-canonical，en、ru、x-default 与俄语页互相返回 | 满足 Google 多语言标注基本要求 |
| sitemap | canonical 在 sitemap，信任页 noindex 且不收录 | canonical 在 sitemap，lastmod 反映本轮结构化数据修正 | 一致 |
| 结构化数据 | WebSite、WebApplication、FAQPage 可解析，FAQ 与可见内容一致 | WebPage、WebApplication、FAQPage 可解析，FAQ 与可见内容一致 | 满足本地一致性检查，不承诺富结果 |
| 重复与堆砌 | 1137 个可见词，主词 23 次，出现率 2.02% | 1169 个可见词，词组 20 次，出现率 1.71% | 读感自然。数字只用于回归，不是排名或审核门槛 |

俄语支持页仍保持独立意图：`/pravila/` 为规则，608 词，主词 13 次；`/kak-igrat/` 为教程，638 词，主词 11 次。两页都有独立 title、description、H1、canonical、正文和 Article 或 HowTo 数据。没有为了扩大页面数复制首页内容。

结论：俄语和英语主词页面满足 playbook 的最低策略。页面已经包含可用工具、足量解释、步骤、场景、FAQ、内链和信任入口。这里的“满足”是对项目 playbook 的检查，不是 Google 排名或 AdSense 批准承诺。

### 本轮修改

- 在 `privacy/index.html` 和 `en/privacy/index.html` 补足第三方供应商、此前访问和 Google 广告 cookie 的明确说明，日期更新为 2026-07-18。原有 Ads Settings、AboutAds、CMP 和第三方名单条件保留。
- 修正 `en/index.html` 的 FAQ JSON-LD，使 `"Roll Again."` 与可见答案一致。
- 新增 `assets/fonts/OFL.txt`，补上 Lilita One 和 Nunito 的版权声明、Reserved Font Name 信息和 SIL OFL 1.1 全文。
- 将 `/en/` 的 sitemap `lastmod` 更新到 2026-07-18。
- 更新 `README.md`、`SEO.md` 和 `progress.md`，区分 7 月 18 日静态证据、7 月 17 日最后一次成功动态证据和仍未部署的工作区。
- 新增文案经过 humanizer 复核，采用直接、技术性的表达，没有加入宣传语或机械堆词。

### 验证证据

2026-07-18 成功完成：

- `html-validate 11.5.5` 检查 13 个 HTML 文件，exit 0。
- `node --check app.js`，exit 0。
- `xmllint --noout sitemap.xml assets/favicon.svg`，exit 0。
- 四段 JSON-LD 均可解析；两组 FAQ 的问题和答案与可见文本逐项相等。
- 13 个 HTML 文件各有一个 H1，没有重复 ID。185 个链接实例没有损坏的站内路由或 fragment，没有 `nofollow`，页面文案使用的五个外部目标均可访问。
- sitemap 的四个 URL 与四个 `index, follow` canonical 完全相同；八个信任页保持 `noindex, follow`。
- 仓库中没有 AdSense 脚本、`ca-pub`、发布商占位值或 `ads.txt`。
- `git diff --check` 通过。

动态验证没有伪造结果。本轮沙箱在启动 `python3 -m http.server` 时返回 `PermissionError: Operation not permitted`；标准 web-game 客户端启动 Chromium 时在 `bootstrap_check_in` 返回 `Permission denied (1100)`，页面尚未加载就退出。因此无法在 7 月 18 日重新运行浏览器交互、320/390px 移动截图和 Lighthouse。

最后一次成功动态验证是 2026-07-17，当时两页完成普通投掷、六骰子 Mega、六张键盘 Scratch、主题、声音、状态恢复和移动端无横向溢出检查，Lighthouse 两页均为 Performance 99、Accessibility 100、Best Practices 100、SEO 100。本轮对游戏 JS 和 CSS 没有新增修改，但隐私页文字变长，所以这些历史结果只能作为邻近证据，不能标成 7 月 18 日新结果。

生产源也没有在本轮重新抓取。当前 web 工具拒绝打开该 punycode 域名，shell 网络与浏览器又受沙箱限制。可以确定的是公开 GitHub `main` 仍是旧文件，且本地没有新提交；7 月 17 日直接生产检查也确认过旧页面和 `/en/privacy/` 404。部署后必须重新检查真实域名，不能只看 Git 状态推断最终响应。

### 剩余外部和账户事项

1. 在允许变更的流程中提交、push 并部署当前工作区。本轮不执行。
2. 部署后检查 `/`、`/en/`、两套 trust pages、`robots.txt`、`sitemap.xml`、HTTP 到 HTTPS、`www` 到 apex、canonical、hreflang 和真实 404 状态；再跑浏览器、移动端和 Lighthouse。
3. 在 AdSense 后台添加站点，使用后台认可的 Search Console 所有权或账户给出的真实代码连接。不要添加占位 publisher ID。
4. 只有在账户给出准确的 `pub-...` 记录后才创建 `ads.txt`。
5. 如果向 EEA、英国或瑞士用户投放个性化广告，配置 Google 认证且支持 TCF 的 CMP。非个性化或 limited ads 的可用性以后台和实际同意信号为准。
6. 按最终账户配置补充其他供应商和广告网络的名称、链接和退出方式。
7. 确认申请人年满 18 岁、没有重复 AdSense 账户、收款信息准确，并处理任何 Policy Center 提示。
8. 根据真实受众判断是否属于面向儿童的内容；如属于，设置 child-directed treatment 且不要做个性化定向。
9. 确认对参考站视觉设计和相关资产拥有使用权。仓库已经补齐字体许可，但不能证明第三方权利人授权。
10. 检查历史自动评论、外链来源和流量质量。不要恢复自动评论或操纵性建链。
11. 接入广告后单独审核位置和流量，避免广告贴近 Roll、菜单、Scratch 和叠层操作，也不要让广告多于发布商内容。

### A 到 E

| 问题 | 第五次复核判断 |
|---|---|
| A. 是否仍有本地代码或内容阻断项 | 修复上述三项后，没有发现仍然存在的本地代码或内容阻断项。7 月 18 日动态复测未能运行，属于验证缺口，不应误写成代码已被重新动态证明 |
| B. 是否满足 playbook 最低策略 | 是。俄语 `колор дайс` 与英语 `color dice` 在 title、description、H1、首段、正文语义、内链、canonical、hreflang、sitemap 和结构化数据上都保持原有意图并满足最低策略 |
| C. 对 Claude 上一轮的同意与反对 | 同意未 commit、未 push、生产旧版本是上线差距；同意词数和密度不是 Google 门槛。反对把部署称为“唯一阻断项”和把代码描述成没有已知问题，因为本轮又修出隐私披露、FAQ 一致性和字体许可三项问题，也仍有账户、权利、流量和受众风险 |
| D. 是否可以进入 Claude 反审 | 可以。当前文件、官方依据、静态证据和限制都已记录。进入 Claude 反审不等于现在就提交 AdSense |
| E. 仓库可验证范围是否收敛 | 是，已收敛到没有已知本地阻断项。下一阶段主要是 Claude 反审、允许后的部署与动态复验，以及账户和外部事项 |

---

## Claude Code 第六次复核（2026-07-18，反审 + 真实动态复测）

本轮为 Claude Code 反审回合，独立复核 Codex 第五次复核的三项修改与结论，并**实际执行**了 Codex 因沙箱受限而未能完成的 2026-07-18 动态复测。约束不变：不 commit / push / 部署、不操作 AdSense 账户、不加占位 publisher ID 或 `ads.txt`、不恢复自动外链、不改目标关键词与页面意图。

### 一、独立复核 Codex 三项修改（逐项验证，非默认接受）

| Codex 修改 | 我的独立验证方式 | 结论 |
|---|---|---|
| 两份隐私政策补足“第三方供应商含 Google 依据先前访问投放 cookie” | 逐字读取 `privacy/` 与 `en/privacy/` 广告段落，比对 answer/1348695 的 required content 三要点（第三方 cookie、Google cookie 机制、退出入口） | **准确、必要、无副作用。** 三要点齐备，Ads Settings / AboutAds 退出链接与 CMP 条件式文案保留。`aboutads` 出现两次是 href 与可见文本各一次，非重复缺陷 |
| `en/index.html` FAQ JSON-LD 与可见文本一致（`"Roll Again."`） | 脚本递归解析 `@graph` 内 FAQPage，将每条 acceptedAnswer 去标签后与页面可见文本逐字包含比对；两首页共 12 条 | **准确、必要。** 12/12 全部逐字一致。修正前 JSON-LD 与可见文本不一致，属结构化数据政策风险，修得对 |
| 新增 `assets/fonts/OFL.txt` | 确认文件存在（4491 字节），含 Lilita One、Nunito 的版权声明、Reserved Font Name 与 SIL OFL 1.1 全文 | **必要、无副作用。** 仓库分发字体却缺许可确是合规缺口，补齐正确。注：这降低而非消除版权风险，参考设计使用权仍需所有者确认 |

三项修改我均能独立复现且验证为真，无过度修改，也未触碰关键词与页面意图。同意 Codex 保留这三项。

### 二、真实动态复测（2026-07-18，本轮实际运行，非沿用 7-17）

Codex 沙箱无法启动 HTTP 服务与 Chromium；本轮环境具备真实 Chrome、Playwright 运行时与 Node 22，故我实际执行了完整动态复测：

- **本地服务**：`python3 -m http.server 4173` 成功启动；`/`、`/en/`、`/en/privacy/` 本地均返回 **200**（`/en/privacy/` 本地 200 反证其线上 404 纯属未部署）。
- **游戏交互（真实 Chrome，headless）**：俄英两首页的普通投掷（rollCount=1）、六骰子 Mega Roll、六张键盘 Scratch、主题切换（neon）、声音开关、状态恢复**全部通过**，`mode` 均回到 `ready`。
- **控制台**：俄英桌面与 390px 移动共 4 个上下文，**console error/warning 与 pageerror 均为 0**。
- **横向溢出**：桌面 `horizontalOverflow=false`；390px 移动端 `scrollWidth=clientWidth=390`，俄英均无溢出。
- **单一 H1**：两首页均为 1。
- **Lighthouse（真实 Chrome）**：
  - 俄语 `/`：Performance **98**、Accessibility **100**、Best Practices **100**、SEO **100**；LCP 2.2s、CLS 0。
  - 英语 `/en/`：Performance **99**、Accessibility **100**、Best Practices **100**、SEO **100**；LCP 2.1s、CLS 0。

这组数据为本轮真实测得，填补了 Codex 标注的“7-18 动态验证缺口”。俄语 Performance 98（7-17 为 99）在正常波动范围内，A11y/BP/SEO 与历史一致，隐私页变长未引入回归。

### 三、对照 playbook 的主词复核（独立确认）

我独立复核而非照搬 Codex 表格：俄语主词 `колор дайс`、英语主词 `color dice` 在 URL、Title、Description、H1、首段、H2/正文语义、内链锚文本、canonical、hreflang、sitemap、结构化数据上语义一致；首页首屏直接呈现可用工具（符合 playbook 1.4 与 15.1 的“首屏即核心功能”）；四个可索引页各服务一个搜索意图，无意图互抢；信任页 `noindex, follow` 不进 sitemap。达到 playbook 最低策略。字符数/词数/密度仅作回归自查，不当作 Google 硬阈值——此点与 Codex 一致。

### 四、A–E 明确结论

- **A. 是否仍有本地代码/内容阻断项**：否。Codex 三项修复经我独立验证为真且正确；本轮 13 页 `html-validate` exit 0、每页唯一 H1、canonical 自指、站内链接无死链、4 段 JSON-LD 全解析、12 条 FAQ 逐字一致、`app.js` 语法通过；动态复测零控制台错误、无横向溢出、Lighthouse 四项接近满分。代码与内容层无已知阻断项。
- **B. 是否满足 playbook**：是，达到最低策略，且未改目标关键词与页面意图。
- **C. 对 Codex 第五轮的同意/反对**：**同意为主。** 同意它三项修复、同意它对我上一轮“唯一阻断项/代码无已知问题”措辞过满的批评（那三项确是我漏掉的真实问题），同意词数密度非门槛、CMP 条件式表述更准确、部署差距仍在。**唯一补充**：Codex 因沙箱未能动态复测、只能标为验证缺口；本轮我已实际补跑并通过，该缺口就 2026-07-18 而言已消除。
- **D. 是否认为仓库范围已收敛**：**是**——但此结论建立在我本轮独立静态+动态验证之上，而非仅凭沿用。仓库可验证范围内无已知待修项。
- **E. 是否需要再回 Codex 一轮**：**不需要再为“找问题”回一轮。** 两个 Agent 已连续两轮未在代码/内容层发现新的真实阻断项，且动态验证缺口已补齐，判断已收敛。后续均为非代码事项：（1）经所有者批准后 commit → push → 部署，按“部署后必须复验”清单核对生产真实 URL 与线上 Lighthouse；（2）AdSense 后台站点连接、真实 publisher ID/`ads.txt`、CMP、账户唯一性与受众设置；（3）参考设计使用权、历史外链与流量质量的人工核查。这些超出仓库证据范围，不是再开一轮反审能解决的。

### 五、本轮改动与验证声明

- 文档：将同日我方那节标题改为“五次复核（Claude …）”并加注说明它与 Codex 第五次复核的关系及其措辞局限；新增本节，未覆盖任何历史轮次。
- 代码/内容：本轮**未做任何代码或内容修改**（Codex 三项修复经验证无需返工，不做无价值改动）。因无源码变更，`README.md`/`SEO.md`/`progress.md` 无需为本轮再改；其内容同步已在 Codex 第五轮完成。
- 约束遵守：全程未 commit、push、部署，未登录或操作 AdSense，未添加占位 ID/`ads.txt`，未恢复自动外链，未改关键词与页面意图。
- 动态结果真实性：本节所有动态数据均为 2026-07-18 本地实测（真实 Chrome + Playwright 运行时 + 干净安装的 lighthouse@11），非沿用 7-17。测试完成后已关闭本地服务。

---

## Codex 第七次最终复核（2026-07-18）

### 独立意见

本轮重新读取项目文档、强制 playbook、Claude 第六轮和完整工作区。也重新运行了静态、浏览器、移动端、交互和 Lighthouse 检查，没有把 Claude 的结果当成本轮证据。

Codex 第五轮的三项修复可以保留：两份隐私政策已覆盖 Google 要求的广告 cookie 信息；英文 FAQ JSON-LD 与可见答案一致；字体分发已附带 OFL 许可文本。本轮没有发现这三项引入副作用。

本轮没有发现新的源码或俄英用户可见文案问题。但 README、SEO.md 和 progress.md 仍写着“7 月 18 日无法运行动态测试”和“最后成功日期为 7 月 17 日”。Claude 第六轮认为无需同步这三份文档，这个判断不准确。三份文档现已更新为本轮数据。

### 最新可访问的 Google 一手依据

1. [AdSense 站点未准备好](https://support.google.com/adsense/answer/12176698?hl=en) 要求站点已上线、无密码阻挡、可抓取、HTTPS 有效，并且有足够的独特内容、良好体验和导航。它明确允许用 Search Console 所有权继续站点检查，不要为预审在仓库中填占位发布商 ID 或假 `ads.txt`。
2. [AdSense 内容与体验](https://support.google.com/adsense/answer/10015918?hl=en) 要求内容有价值、有原创增量且易于导航，并反对复制、轻微改写和无增量的嵌入内容。文档没有词数或关键词密度硬门槛。
3. [Google Publisher Policies](https://support.google.com/publisherpolicies/answer/10502938?hl=en) 覆盖知识产权、误导性表述、低价值页面、广告多于发布商内容、隐私披露、儿童受众和 Search spam。仓库检查不能替所有者证明参考设计的使用权。
4. [AdSense 隐私政策必需内容](https://support.google.com/adsense/answer/1348695?hl=en) 要求说明包括 Google 在内的第三方供应商使用 cookie、基于先前访问投放广告，以及 Ads Settings 或 AboutAds 退出入口。两份隐私页现在都有这些信息。
5. [EEA、英国和瑞士 CMP 要求](https://support.google.com/adsense/answer/13554116?hl=en) 的边界没有变：该区域的个性化广告需要 Google 认证且整合 TCF 的 CMP。非认证 CMP 流量可能获得非个性化或 limited ads，但并非保证。当前隐私页使用了准确的条件式说法。
6. [Ad placement policies](https://support.google.com/adsense/answer/1346295?hl=en) 要求广告不能与菜单、导航、游戏窗口和高频点击操作混淆或距离过近。项目当前没有广告代码；日后不应把广告放进游戏卡片、Mega 或 Scratch 叠层，也不应贴着 Roll 和工具栏按钮。
7. [无效流量与关户风险](https://support.google.com/adsense/answer/2660562?hl=en) 禁止自点、自动或购买的流量、鼓励点击和将广告贴近重度鼠标或触摸操作。历史自动评论、入站链接和实际流量仍是仓库外检查项。
8. Google Search 的 [Search Essentials](https://developers.google.com/search/docs/essentials)、[Spam policies](https://developers.google.com/search/docs/essentials/spam-policies) 和 [People-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) 支持在 title、H1、正文和链接中自然使用搜索词，反对关键词堆砌、操纵性链接和为搜索批量生成的低价值页面。
9. canonical、hreflang、sitemap 和结构化数据继续按 [canonical 指南](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)、[多语言指南](https://developers.google.com/search/docs/specialty/international/localized-versions)、[sitemap 指南](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) 和 [结构化数据总则](https://developers.google.com/search/docs/appearance/structured-data/sd-policies) 复核。标记正确不保证展示富结果。

### AdSense 和内容终检

| 领域 | 本轮证据 | 判断 |
|---|---|---|
| 内容价值 | 首屏是可用的 1 到 6 个色彩骰子工具，下方有规则、步骤、模式、概率、场景和 FAQ | 不是空壳、假工具或单纯嵌入页 |
| 原创性 | 本轮再抽查四个较长俄英句子的精确搜索，没有找到其他页面的逐字匹配 | 这是抽样证据，不能证明全网唯一，也不能证明参考站设计已授权 |
| 导航与信任 | 俄英首页都能到达 About、Contact、Privacy、Terms，Contact 的 GitHub Issues 目标可访问 | 结构完整，所有者需继续维护外部联系渠道 |
| 隐私与 CMP | 当前只有主题、声音、次数和最后结果的 localStorage，无广告和分析脚本；隐私页已写广告启用后的 cookie 和同意边界 | 当前行为与披露一致；实际供应商和 CMP 仍要按最终账户配置更新 |
| 广告位置 | 仓库无 `ca-pub`、广告单元、发布商占位值和 `ads.txt` | 没有当前误放置；真实广告加入后需单独复审 |
| 技术抓取 | 四个可索引 URL 都是初始 HTML、self-canonical，sitemap 与它们精确一致，robots 允许抓取 | 满足 playbook 的静态抓取最低要求 |
| 儿童受众 | 页面提到 classroom 和 lessons，但没有账户、聊天、付费、奖品或个性化广告 | 课堂用途是需要所有者评估受众的具体信号，不能仅凭代码判定非儿童向 |
| 版权和流量 | 字体许可已补齐，自动评论脚本和运行文档在工作区中删除 | 参考设计使用权、旧评论、入站链接和真实流量仍需人工核查 |

### 主词 SEO 与 playbook

本轮没有改动俄语 `колор дайс` 或英语 `color dice` 页面的 title、description、H1、首段、正文、内链或页面意图，因为没有找到需要通过重写解决的真实问题。

| 检查项 | 俄语 `/` | 英语 `/en/` | 判断 |
|---|---|---|---|
| Title | 54 字符，主词在开头 | 53 字符，`Color Dice Roller` 在开头 | 与交易型工具意图一致 |
| Description | 146 字符，写明在线、1 到 6 个骰子和无注册 | 158 字符，覆盖 online、free、games、lessons 和 art | 自然可读，字符数只是编辑参考 |
| H1 和首段 | 唯一 H1 是 `Колор Дайс`，首段以主词开头 | 唯一 H1 是 `Color Dice Roller`，首段以 `Color Dice` 开头 | 满足 |
| 正文与语义 | 1137 个静态可见词，主词 23 次；覆盖骰子、随机色、游戏、规则、课堂和调色板 | 1169 个静态可见词，词组 20 次；覆盖 roller、random color、games、lessons、art、palette 和 fairness | 主题完整，没有不自然堆词。数字只用于回归 |
| 内链和意图 | 首页连接规则和玩法页，两页分别服务规则与教程意图 | 首页内部锚点覆盖使用方法、颜色、模式、场景和 FAQ | 无新的重复意图页或关键词互抢 |
| canonical、hreflang、sitemap | 俄英首页 self-canonical 且互相返回 `ru`、`en`、`x-default`；四个可索引 canonical 对应 sitemap 四项 | 同左 | 满足最低策略 |
| 结构化数据 | WebSite、WebApplication、FAQPage 可解析，FAQ 可见文本一致 | WebPage、WebApplication、FAQPage 可解析，FAQ 可见文本一致 | 满足本地一致性，不承诺富结果 |

`/pravila/` 仍是独立规则意图，608 词，主词 13 次。`/kak-igrat/` 仍是教程意图，638 词，主词 11 次。两页的 title、description、H1、canonical、正文和 Article 或 HowTo 数据保持分离。

结论是两个主词页和俄语支持页满足项目 playbook 的最低策略。这不是排名、收录或 AdSense 批准保证。

### Humanizer 终检

本轮按 humanizer 的 33 项清单重新检查了所有俄英 HTML 和 `app.js` 动态文字。没有发现成组出现的夸张意义、广告式形容、机械三段式、同义词轮换、聊天机开场或泛化结论。列举颜色、步骤和用途是游戏说明本身需要，不应仅因为出现列表就改写。

本轮没有修改用户可见文案。这是 humanizer 的最终结论，不是漏做。关键词、事实、页面结构和 FAQ 结构化数据因此没有变化。

### 本轮独立验证

2026-07-18 实际完成：

- `html-validate 11.5.5` 检查 13 个 HTML，exit 0；`node --check app.js`、sitemap 和 favicon XML 解析、`git diff --check` 都通过。
- 13 个 HTML 都有且只有一个 H1，无重复 ID；四段 JSON-LD 均可解析，两组 12 条 FAQ 与可见问答一致。
- 185 个链接实例没有损坏的本地路由或 fragment；sitemap 的四项与四个可索引 canonical 精确一致。
- 本地 HTTP 服务成功返回 13 个 HTML、robots、sitemap、CSS、JavaScript、图片、字体和许可文件。
- 标准 web-game 客户端在 `/` 和 `/en/` 均 exit 0，并输出本地化的 `render_game_to_text` 状态。该客户端只截取背景 canvas，因此布局判断使用下方的 Chrome 整页截图。
- 真实 Chrome 中，俄英两页均从 `ready` 开始，普通投掷得到 3 个结果且 `rollCount=1`；六骰子 Mega 得到 6 个结果；六张 Scratch 经 Enter 全部揭开，`revealed=6/6`。
- 两页切换到 neon 主题并关闭声音后重新加载，都恢复 6 个结果、`rollCount=3`、neon 和静音状态。
- 俄英桌面和 390px 移动端均无水平溢出，控制台 warning、error 和 pageerror 都是 0。已人工查看俄英 Mega、Scratch、完整桌面页、390px 首页和最新隐私页截图，没有发现遮挡或截断。
- Lighthouse 13.4.0 实测：俄语为 99/100/100/100，FCP 1.50s、LCP 2.10s、TBT 6ms、CLS 0；英语为 99/100/100/100，FCP 1.50s、LCP 2.10s、TBT 0ms、CLS 0。分数顺序为 Performance、Accessibility、Best Practices、SEO。

本轮也重新抓取了真实生产域名。`/`、`/en/`、`robots.txt` 和 `sitemap.xml` 返回 200，`www` 和 HTTP 会重定向到 HTTPS apex。`/en/privacy/` 仍返回 404，线上首页仍有已在本地删除的 start screen 和 player-code 面板。线上主页与隐私页的字节数和 SHA-1 也与本地不同。结合 `HEAD=origin/main=229a45b` 和 Cloudflare Pages 从 `main` 部署的记录，现在可以确认生产仍是旧版本。

### 对 Claude 第六轮的同意和反对

同意：

- 第五轮三项修复真实且必要，没有损害主词 SEO。
- Claude 记录的交互结果方向正确，本轮已用独立测试再现。
- 仓库可验证范围没有已知的源码或内容阻断项，两个主词页满足 playbook 最低策略。

反对或修正：

- 第六轮当时写“两个 Agent 已连续两轮未发现新问题”不准确，因为第五轮刚发现并修复三项问题。现在第六轮和第七轮都没有发现新的源码或用户文案问题，连续两轮的条件到本轮才成立。
- “本地 `/en/privacy/` 200 反证线上 404 纯属未部署”的因果措辞过强。本地 200 只能证明文件存在。本轮通过最新生产响应、线上旧标记、哈希差异、Git 状态和部署来源组合确认了部署差距。
- Claude 认为 README、SEO.md 和 progress.md 无需更新，但它们仍保留过期的沙箱限制和 7 月 17 日动态数据。本轮已同步。

### A 到 E

| 问题 | 第七次最终判断 |
|---|---|
| A. 是否仍有本地代码或内容阻断项 | 没有发现已知本地阻断项。本轮只修正了过期交接文档，没有为制造改动去重写自然文案 |
| B. 是否满足 playbook 最低策略 | 是。俄语 `колор дайс` 和英语 `color dice` 的 title、description、H1、首段、正文语义、内链、canonical、hreflang、sitemap 和结构化数据保持同一意图，无不自然堆词 |
| C. 对 Claude 的同意与反对 | 同意其对三项修复、交互、playbook 和当前无已知源码问题的结论。修正其“已连续两轮无新问题”、“本地 200 单独反证线上根因”和“三份交接文档无需更新”三处表述 |
| D. 双方是否收敛 | 是。第六轮与本轮都没有发现新的源码或用户可见文案问题，本轮又独立补齐了最新生产和 Lighthouse 证据 |
| E. 部署前还剩什么 | 先由所有者审批工作区，然后在允许的流程中 commit、push、部署。部署后重查生产路由、trust pages、robots、sitemap、redirect、canonical、hreflang、404、浏览器与 Lighthouse。之后使用真实 AdSense 账户连接信息，根据真实发布商记录创建 `ads.txt`，完成 CMP、儿童受众、账户唯一性、权利、历史外链、流量质量和最终广告位置检查 |

结论只限于仓库和本轮可验证证据。它不等于“完全符合”，也不保证 Google 批准。本轮没有 commit、push、部署、登录 AdSense、添加占位 publisher ID 或 `ads.txt`，也没有恢复自动评论或建链。

## ads.txt 上线补充（2026-07-19）

所有者已指定 `/Users/reyn/Desktop/data/独立开发/toon-tone/public/ads.txt` 为真实记录来源。该文件与 ToonTone 的 `dist/ads.txt` 字节一致，SHA-256 均为 `9abf690d7ae28509f0b84002ff98a149f086ac24dc36c349b067737c49009936`。Color Dice 现已在仓库根目录加入同字节的 `ads.txt`：

```text
google.com, pub-6112182006844125, DIRECT, f08c47fec0942fa0
```

这条记录符合 Google 当前指南使用的四字段格式：`google.com` 是卖方系统域名，第二字段是所有者提供的非占位 `pub-` 发布商 ID，`DIRECT` 表示发布商直接控制该账户，`f08c47fec0942fa0` 是 Google 示例和记录使用的认证机构 ID。文件位于站点根目录，因此发布后应直接出现在 `https://xn--80ahqbfrbqm.com/ads.txt`。Google 还要求该 URL 可抓取并返回 HTTP 200，不能由不存在页面的 HTML fallback 冒充。

官方依据：

- [Google AdSense ads.txt guide](https://support.google.com/adsense/answer/12171612?hl=en) 给出的标准记录是 `google.com, pub-..., DIRECT, f08c47fec0942fa0`，并要求把纯文本文件放在根目录，例如 `example.com/ads.txt`。
- [Ensure your ads.txt files can be crawled](https://support.google.com/adsense/answer/7679060?hl=en) 要求根域名上的文件可访问、允许抓取、没有格式或无效字符，并返回 HTTP 200。
- [Connect your site to AdSense](https://support.google.com/adsense/answer/7584263?hl=en) 将 ads.txt 作为连接方式之一，同时说明站点仍需完成连接和审核，获批前不能展示广告。

本节更新的是当前仓库状态；前面各轮“当时尚无 `ads.txt`”和“不要添加占位值”的记录仍作为历史证据保留，不应再被理解为当前待办。加入真实 `ads.txt` 只声明授权卖方，不等于广告代码已经接入，也不等于站点已连接或通过审核。AdSense 后台仍需确认该域名属于与 `pub-6112182006844125` 相同的发布商账户，并确认站点连接、ads.txt 抓取和审核状态。
