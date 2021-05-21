Javelin

# ダイアログ (Dialog)

ダイアログ(Dialog)は画面上にダイアログ画面を表示するための機能です。  

``javelin.dialog``メソッドを使用します。

## # ダイアログの設置

ダイアログを設置するにはまずダイアログ表示用のHTMLを設置する必要があります。

HTMLは``render/dialog``ディレクトリ内に「.html」の拡張子でファイルを設置してください。

```html | render/dialog/test.html
<h2>Test Dialog</h3>
<p>text sample text text text text text text....</p>
<a href="#" class="closed">Close</a>
```

次にダイアログのスクリプトを設置します。  
ただこれはダイアログ表示時のコールバック実装等を行わず、単純に静的なダイアログ表示を行うだけであれば不要です。

スクリプトは``app/dialog``ディレクトリにJSファイルを設置してください。


```javascript | app/dialog/test.js
javelin.dialog("test",{

    open:function(obj){

        console.log("dialog test open....");

    },

});
```

javelin.dialogメソッドの引数にそれぞれダイアログ名、各種設定オブジェクトを設置します。

各種オプション設定については下記にて解説しています。

### - クラス属性の追加

ダイアログに専用にクラス属性を追加できます。

```javascript | app/dialog/test.js
javelin.dialog("test",{

    class:"dialog_class",

});
```

### - コールバックの設置

下記のコールバックを設置できます。

|||
|:--|:--|
|open|ダイアログを開いたとき|
|close|ダイアログを閉じたとき|

例としてダイアログが開いたときのコールバックは下記のように実装します。

```javascript | app/dialog/test.js
javelin.dialog("test",{

    open:function(obj){

        console.log("dialog test open....");

    },

});
```

引数であるコールバックオブジェクトの仕様は[こちらで解説しています。](#callback_object)

---

## # ダイアログを開く

ダイアログを開く場合は``javelin.dialog.open``メソッドを使用します。  
必ずダイアログ名を指定して下さい。


```javascript | app/page/dialog.js
$(".open_dialog").on("click",function(){

    javelin.dialog("test").open();

});
```

引数にオプションを指定することもできます。  
オプションの概要については下記で解説しています。

### - クラス属性の追加

ダイアログに専用にクラス属性を追加できます。

```javascript
$(".open_dialog").on("click",function(){

    javelin.dialog("text").open({
        class:"dialog_class",
    });

});
```

### - コールバックの実装

コールバックを追加で実装することができます。  
引数であるコールバックオブジェクトの仕様は[こちらで解説しています。](#callback_object)

```javascript
$(".open_dialog").on("click",function(){

    javelin.dialog("text").open({
        callback:{
            before:function(obj){
                
                console.log("dialog open...");

            },
        },
    });

});
```



---

<a id="callback_object"></a>

## # コールバックオブジェクト

コールバックの引数に専用のコールバックオブジェクトを使用できます。  
オブジェクトにはidやダイアログのDOM要素オブジェクトや同期処理用のwaitメソッド等が含まれます。

各オブジェクトの使用については下記を参照してください。

### - ダイアログDOM要素の取得

JQueryのダイアログのDM要素オブジェクトを取得できます。  
下記のように``obj.dialog``から取得できます。

```javascript | app/dialog/test.js
javelin.dialog("test",{

    open:function(obj){

        console.log(obj.dialog);

    },

});
```

### - ダイアログIDの取得

ダイアログIDは``obj.id``で取得できます。  
このダイアログIDは一意のコードです。

```javascript | app/dialog/test.js
javelin.dialog("test",{

    open:function(obj){

        console.log(obj.id);

    },

});
```


### - 同期処理の実装

同期処理を行うには**wait**メソッド**next**メソッドを使用します。  
**wait**メソッドで次以降のコールバック実行を中断し、**next**メソッドで再開させます。

```javascript | app/dialog/test.js
javelin.dialog("test",{

    open:function(obj){

        obj.wait();

        setTimeout(function(){

            obj.next();

        },4000);

    },

});
```

### - ダイアログの終了

``obj.close``メソッドを使用してダイアログを終了させることができます。


```javascript | app/dialog/test.js
javelin.dialog("test",{

    open:function(obj){

        setTimeout(function(){

            obj.close();
            
        },5000);

    },

});
```