Javelin

# マニフェスト(manifest.json)ファイルについて

マニフェストファイル(manifest.json)はプロジェクトを作成する上で重要なファイルです。

ビルド時またはビルド後の挙動を設定するファイルなので、  
このマニフェストファイルは絶対に削除しないでください。

テンプレートから作成した場合は、テンプレートのマニフェスト情報がそのまま記載されています。

マニフェストファイルは下記のようにJSONデータで構成されています。

```json
{
    "name": "pc",
    "description": "JavaScript Framwwork (Javelin) Default Template (PCSite-Web-Page).",
    "author": "Nakajima Satoru.",
    "email": "test@Javelin.com",
    "hp": "https://www.Javelin.com/",
    "option": {
        "libCompressionMode":false,
        "jquery": "3.6.0",
        "animation": "slide_left_fede",
        "firstAnimation":null,
        "topPage":"main",
        "queryRouting":true
    }
}
```

各項目ごとの解説を下記に示しています。

- name .... プロジェクトの名称を指定します。 
- description .... プロジェクトの説明文を指定します。  
- author .... このプロジェクトの作者名を指定します。
- email .... このプロジェクトの連絡先メールアドレスを指定します。
- hp .... このプロジェクトのHP URLを指定します。
- option .... このプロジェクトのオプション設定です。
    -  libCompressionMode .... コアライブラリ内のスクリプトコードの圧縮の可否を指定できます。  
    trueの場合はコードが圧縮されます。
    - jquery .... 使用するJQueryのバージョンを指定します。  
    指定しない場合はデフォルトでバージョン3.6.0のJQueryを適用します。
    - animation .... ページ遷移時のデフォルトのアニメーションを指定します。  
指定しない場合は、ページ遷移時のアニメーションは適用されません。
    - firstAnimation .... 一番最初のページを表示する際のアニメーションを指定できます。  
    指定しない場合は、animationの設定がデフォルトで適用されます。
    -  topPage ... 一番最初のページを指定します。  
    指定しない場合は"main"のページを表示します。
    -  queryRouting ... これをtrueにした場合、ブラウザの場合URL末尾にクエリパラメータでpathを指定することで、指定したページを直接表示することができます。
