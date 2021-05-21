Javelin

# ページ (Page)

ページ(Page)は主に各画面に遷移時に表示されるページの前後のコールバックや等の実装するための機能です。  
Javelinではこのページを単位として各画面を切り替えていくことができます。

ページ機能は``javelin.page``メソッドを使用します。

---

## # ページの設置

ページの設置は主にHTMLのみの設置と、HTMLとスクリプトの設置の2通りがあります。

HTMLのみを設置した場合はページ内容が表示されるだけで、ページ表示前後のコールバック等は実装されません。

ページ表示前後で表示内容を動的に変更またはイベントハンドラを追加したい場合は、スクリプトも同時に設置する必要があります。

### - ページHTMLの設置

ページ用のHTMLファイルは``render/page``ディレクトリ内に設置してください。

設置する際のコードに関しては時に決まりはありませんが、
ファイルの拡張子は必ず``.html``で統一してください。

```html|render/page/main.html
<h2>Hellow World</h2>
```

各ページを設置してのページ遷移については[こちらで解説しています。](#move)

### - ページのスクリプトの設置

ページのスクリプトは``app/page``ディレクトリにJSファイルとして設置します。  
コードは下記のように記述してください。

```javascript | app/page/main.js
javelin.page("main",{

    before:function(Obj){

        console.log("main before callback....");

    },

});
```

javelin.pageメソッドの引数にそれぞれページ名、各種設定オブジェクトを設置します。

### - サブディレクトリ以後の階層化したページの設置

サブディレクトリ以後の階層を用意してページを設置することもできます。

ページ用のHTMLファイルは``render/page``ディレクトリ内に任意でディレクトリを作成してから、  
その中にhtmlファイルを設置します。

下記の場合は``render/page/page1``ディレクトを用意して``index.html``のHTMLファイルを設置します。

```html|render/page/page1/index.html
<h2>Page1 Index</h2>
```

一方おこの場合のページのスクリプトは``app/page/page1``ディレクトを用意して``index.js``のJSファイルを設置します。  
ページ名に``app/page``以後の相対パスでページ名を指定します。

```javascript | app/page/page1/index.js
javelin.page("page1/index",{

    before:function(Obj){

        console.log("page1 index before callback....");

    },

});
```

---

<a id="move"></a>

## # aタグを使ったページ遷移

ページから別のページに遷移するには2通りの方法があります。

-  aタグを使って遷移先を指定
-  ボタンを押すイベントハンドラを設置して、javelin.redirect.moveメソッドを使って遷移

後者のjavelin.redirect.moveメソッドを使用する方法については[こちらで解説しています・](redirect.md#move)  
ここでは前者のaタグでの遷移方法を解説します。

aタグを下記のようにページ用HTMLに設置するだけです。   
href属性に遷移先のページ名を指定します。

```html
<a href="page2">Go to Page2</a>
```

ページ遷移先はサブディレクトリ以降の階層のページも指定できます。

```html
<a href="page2/index">Go to Page2</a>
```

クエリリクエストを指定することでリクエスト情報を別途添えることもできます。  
クエリパラメータと同様の指定でOKです。

```html
<a href="page2?id=1">Go to Page2 (id=1)</a>
<a href="page2?id=2">Go to Page2 (id=2)</a>
<a href="page2?id=3">Go to Page2 (id=3)</a>
```

コールバックでのクエリリクエスト情報の取得は[こちらを](#callback_object)参照してください。

---

## # aタグを使った戻るボタンの設置

aタグを使って戻るボタンを簡単に設置することもできます。

下記のようにbacktoをタグ内に指定してください。

```html
<a href="#" backto>Back To</a>
```

---

## # ページの各種コールバック

ページ遷移前後での処理を実装したい場合は各コールバックを設置する必要があります。  
Javelinではそのコールバックをjavelin.pageメソッドを使って簡単に実装することができます。

コールバックは各のbeforeのように指定して設置します。  
引数がありますがそれについては[こちらで解説しています。](#callback_object)

```javascript | app/page/main.js
javelin.page("main",{

    before:function(Obj){

        console.log("main before callback....");

    },

});
```

<a id="callback"></a>

### -　コールバックの種類とタイミング

コールバックには下記の種類があります。  
それぞれページ遷移前後で実行されるタイミングが異なります。

|||
|:--|:--|
|**before**|ページ遷移直前または戻る直前で実行されるコールバックです。<br>アニメーションが開始する直前で実行されます。|
|**after**|ページ遷移直後または戻る直前に実行されるコールバックです。<br>アニメーションが終了した直後に実行されます。|
|**beforeNext**|ページ遷移直前で実行されるコールバックです。<br>beforeと違いページ遷移時にのみしか実行されません。|
|**beforeBack**|別ページから戻ってきた直前で実行されるコールバックです。<br>beforeと違い戻る時にしか実行されません。|
|**afterNext**|ページ遷移後で実行されるコールバックです。<br>afterと違いページ遷移時にのみしか実行されません。|
|**afterBack**|別ページから戻ってきた後で実行されるコールバックです。<br>afterと違い戻る時にしか実行されません。|

ページでグループ指定がある場合はこれにさらにグループで指定されたコールバックが実行されます。  
グループの設定については[こちらを参照してください。](#group)

すべてのコールバックが実装された場合、  
実行されるコールバックの順序は下記の通りとなります。

```text
各グループのbeforeコールバック
    ↓
(ページ遷移時) 各グループのbeforeNextコールバック
(他ページから戻る) 各グループのbeforeBackコールバック
    ↓
ページのbeforeコールバック
    ↓
(ページ遷移時) ページのbeforeNextコールバック
(他ページから戻る) ページのbeforeBackコールバック
    ↓
<アニメーションの実行>
    ↓
各グループのafterコールバック
    ↓
(ページ遷移時) 各グループのafterNextコールバック
(他ページから戻る) 各グループのafterBackコールバック
    ↓
ページのafterコールバック
    ↓
(ページ遷移時) ページのaftereNextコールバック
(他ページから戻る) ページのafterBackコールバック
```

<a id="callback_object"></a>

### - コールバックオブジェクト

各コールバックでは引数に専用のオブジェクト(コールバックオブジェクト)が与えられます。

このオブジェクトを使用することでページの遷移/戻るのモード取得やクエリリクエスト情報の取得、  
同期処理を行うことができます。

オブジェクトの中身は各コールバックにより若干異なりますが、  
各オブジェクトのメソッドおよび変数についての解説は下記に示します。

### - モードの取得(遷移/戻る)

コールバック自体がページ遷移、戻るのいずれかかどうかを判別するには
modeを使用します。

```javascript | app/page/main.js
javelin.page("main",{

    before:function(Obj){

        console.log(obj.mode);

    },

});
```

値は進むの場合はmove、戻る場合はbackが入ります。

### - 現在のページ情報を取得

ページ遷移する前の現行のページ情報はnowPageを使用します。

```javascript | app/page/main.js
javelin.page("main",{

    before:function(Obj){

        console.log(obj.nowPage);

    },

});
```

### - 遷移先ページ情報を取得

遷移先のページ情報はnextPageを使用します。  
nextPageはページ遷移した場合の時のみ取得できます。

```javascript | app/page/main.js
javelin.page("main",{

    before:function(Obj){

        console.log(obj.nextPage);

    },

});
```

### - 戻り先ページ情報を取得

戻り先のページ情報はbackPageを使用します。  
backPageは他のページから戻った場合の時のみ取得できます。

```javascript | app/page/main.js
javelin.page("main",{

    before:function(Obj){

        console.log(obj.backPage);

    },

});
```

### - クエリリクエスト情報を取得

クエリリクエスト情報はaregmentを使用します。

```javascript | app/page/main.js
javelin.page("main",{

    before:function(Obj){

        console.log(obj.aregment);

    },

});
```

クエリリクエストを使ってページ遷移する方法については[こちらを参照してください。](#move)

### - ページDOMオブジェクトの取得

ページの要素DOMオブジェクトを取得する場合はpageObjを使用します。

### - 同期の実行

途中で待機が必要なロジックがある場合で、  
同期をとる場合は**wait**メソッドと**next**メソッド、または**exit**メソッドを使用します。

**wait**メソッドは次のコールバックまたはアニメーション動作の実行を中断することができます。  
待機完了後に**next**メソッドを実行させることで中断していたコールバックまたはアニメーション動作を再開させることができます。

```javascript | app/page/main.js
javelin.page("main",{

    before:function(Obj){

        console.log("stop...");

        obj.wait();

        setTimeout(function(){

            console.log("continue....");

            obj.next();

        },5000);)


    },

});
```

なお**exit**メソッドはコールバックを終了と同時にページ遷移(または戻る、更新)の実行の続きをせずに終了します。

**next**メソッドを実行しない状態と同様ですが、大きな違いとしては、   
コールバック実行と遷移時のアニメーション動作が全て継続している間はリンクボタンのクリックイベントを強制的に無効にしているため  **exit**メソッドではそれを有効にします。

```javascript | app/page/main.js
javelin.page("main",{

    before:function(Obj){

        obj.exit();

    },

});
```



---

<a id="group"></a>

## # グループの設定

ページ遷移直前等で共通のロジックを実装したい場合、  
各ページごとのコールバックに共通のロジックもしくは呼び出しのコードを設けるのは非常に面倒になります。

そのような場合はグループを設定することで、各ページごとで共通のロジックを一度に実装することができます。

グループの設定は非常に簡単で、下記のようにgroupに適用したグループ名を指定するだけです。

```javascript | app/page/main.js
javelin.page("main",{

    group:"app",

    before:function(Obj){

    },

});
```

上記の場合はappのグループを使用します。
グループの設置は``app/group``ディレクトリ内に下記のようなファイルを設置してください。  
(グループの詳しい内容については[こちらを参照。](group.md))

```javascript | app/group/app.js
javelin.group("app",{

    before:function(Obj){

        console.log("group app before");

    },

});
```


