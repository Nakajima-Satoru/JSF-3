JSF-3(仮)

# エレメント (Element)

エレメント(Element)はHTMLタグを部品のように後から動的に追加できる機能です。

``jsf3.element``メソッドから利用します

## # エレメントの実装

エレメントを設置するにはまずエレメント表示用のHTMLを設置する必要があります。

HTMLは``render/element``ディレクトリ内に「.html」の拡張子でファイルを設置してください。

```html | render/element/test.html
<h2>Test Element</h3>
<p>text sample text text text text text text....</p>
```

次にエレメントのスクリプトを設置します。  
ただこれはエレメント表示時のコールバック実装等を行わず、単純に静的なエレメント表示を行うだけであれば不要です。

スクリプトは``app/element``ディレクトリにJSファイルを設置してください。

```javascript | app/element/test.js
jsf3.element("test",{

    open:function(obj){

        console.log("element test open....");

    },

});
```

jsf3.elementメソッドの引数にそれぞれエレメント名、各種設定オブジェクトを設置します。

各種オプション設定については下記にて解説しています。

### - クラス属性の追加

エレメントに専用にクラス属性を追加できます。

```javascript | app/element/test.js
jsf3.element("test",{

    class:"elementclass",

});
```

### - コールバックの設置

下記のコールバックを設置できます。

|||
|:--|:--|
|before|エレメントを追加したとき|

例としてエレメントが開いたときのコールバックは下記のように実装します。

```javascript | app/element/test.js
jsf3.element("test",{

    before:function(obj){

        console.log("element test open....");

    },

});
```

引数であるコールバックオブジェクトの仕様は[こちらで解説しています。](#callback_object)


---

## # エレメントのHTMLを取得

エレメントのHTMLタグをを取得する場合は``jsf3.element.load``メソッドを使用します。  
必ずエレメント名を指定して下さい。

```javascript | app/page/element.js
$(".open_element").on("click",function(){

    var html=jsf3.element("test").load();

    console.log(html);
});
```

戻り値にエレメントのHTMLタグが返されます。

---

## # エレメントを任意のタグに追加

エレメントのHTMLタグを任意のタグ内に追加する場合は``jsf3.element.put``メソッドを使用します。  
必ずエレメント名と追加先のタグ要素を指定して下さい。

```javascript | app/page/element.js
$(".open_element").on("click",function(){

    jsf3.element("test").put("element_area");

});
```

第二引数にオプションを指定することもできます。  
オプションの概要については下記で解説しています。

### - クラス属性の追加

エレメントに専用にクラス属性を追加できます。

```javascript
$(".open_element").on("click",function(){

    jsf3.element("test").put("element_area",{
        class:"element_class",
    });

});
```

### - コールバックの実装

コールバックを追加で実装することができます。  
引数であるコールバックオブジェクトの仕様は[こちらで解説しています。](#callback_object)

```javascript
$(".open_element").on("click",function(){

    jsf3.element("test").put("element_area",{
        callback:{
            before:function(obj){
                
                console.log("element open...");

            },
        },
    });

});
```

---

<a id="callback_object"></a>

## # コールバックオブジェクト

コールバックの引数に専用のコールバックオブジェクトを使用できます。  
オブジェクトにはidやエレメントのDOM要素オブジェクトや同期処理用のwaitメソッド等が含まれます。

各オブジェクトの使用については下記を参照してください。

### - エレメントDOM要素の取得

JQueryのエレメントのDM要素オブジェクトを取得できます。  
下記のように``obj.element``から取得できます。

```javascript | app/element/test.js
jsf3.element("test",{

    before:function(obj){

        console.log(obj.element);

    },

});
```

### - エレメントIDの取得

エレメントIDは``obj.id``で取得できます。  
このエレメントIDは一意のコードです。

```javascript | app/element/test.js
jsf3.element("test",{

    before:function(obj){

        console.log(obj.id);

    },

});
```


### - 同期処理の実装

同期処理を行うには**wait**メソッド**next**メソッドを使用します。  
**wait**メソッドで次以降のコールバック実行を中断し、**next**メソッドで再開させます。

```javascript | app/element/test.js
jsf3.element("test",{

    before:function(obj){

        obj.wait();

        setTimeout(function(){

            obj.next();

        },4000);

    },

});
```
