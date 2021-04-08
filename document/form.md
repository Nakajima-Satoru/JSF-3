JSF-3(仮)

# フォーム(Form)

フォーム(Form)は入力フォームの各種入力欄の動的な設置や、Submitイベント時のコールバック実装等、  
フォーム全般の機能を実装するためのものです。

フォーム機能は``jsf3.form``メソッドを使用します。

---

## # フォームの設置

フォームのスクリプトは``app/form``ディレクトリにJSファイルとして設置します。

```javascript | app/form/test1.js
jsf3.form("test1",{

    tags:{
        name:{
            type:"text",
        },
        email:{
            type:"text",
        },
        message:{
            type:"textarea",
        },
        submit:{
            type:"submit",
            value:"Send",
        },
    },

    submit:function(obj){

        console.log(obj);

    },

});
```

tagsは[各入力タグおよび送信ボタンの決定](#tags)、submitは[Submit実行時のコールバックを指定しています。](#submit)

---

<a id="callback"></a>

## # Submitコールバックの設置

下記のようにsubmitを指定することでフォーム送信処理(Submit)が行われたときのコールバックを実装することができます。

```javascript | app/form/test1.js
jsf3.form("test1",{

    submit:function(obj){

        console.log(obj);

    },

});
```

JSF-3では実際にSubmitが行われたとしても、リクエスト送信はされずにこのコールバックが実行されます。  
リクエスト送信を行う場合はAjax通信を行ってください。

引数には専用のオブジェクトが入ります。  
``obj.data``で入力データを確認することができます。


```javascript | app/form/test1.js
jsf3.form("test1",{

    submit:function(obj){

        console.log(obj.data);

    },

});
```

---

<a id="callback"></a>

## # Resetコールバックの設置

下記のようにresetを指定することでフォームの入力データリセット処理処理(reset)が行われたときのコールバックを実装することができます。

```javascript | app/form/test1.js
jsf3.form("test1",{

    reset:function(obj){

        console.log(obj);

    },

});
```

引数には専用のオブジェクトが入ります。  
``obj.data``で入力データを確認することができます。


```javascript | app/form/test1.js
jsf3.form("test1",{

    reset:function(obj){

        console.log(obj.data);

    },

});
```

---

<a id="tags"></a>
## # 入力タグの作成

入力タグを動的に設置することができます。  
設置をするにはまずHTMLでformタグとfield属性のタグをそれぞれ用意する必要があります。

``render/page/form.html``に下記コードを記述します。

```html | render/page/form.html
<h2>Form Sample</h2>

<form id="test1">
    <p>name</p>
    <div field="name"></div>

    <p>email</p>
    <div field="email"></div>

    <p>message</p>
    <div field="message"></div>

      <p>submit</p>
    <div field="submit"></div>
</form>
```

formタグのID属性値はこれから設置するフォームスクリプトのフォーム名と同じにします。

次にフォームスクリプトを設置します。  
今回の場合は``app/form/test1.js``でファイルを追加します。

```javascript | app/form/test1.js
jsf3.form("test1",{

    tags:{
        name:{
            type:"text",
        },
        email:{
            type:"text",
        },
        message:{
            type:"textarea",
        },
        submit:{
            type:"submit",
            value:"Send",
        },
    },

});
```

tagsにHTMLで設置したield属性ごとでの入力形式等をセットします。  
最後にページスクリプトを設置したら、そこに入力フォームを展開するためのメソッド``jsf3.form.tagOpen``メソッドを設置します。

```javascript | app/form/test1.js
jsf3.page("form",{

    before:function(obj){

        jsf3.form("test1").tagOpen();

    }.

});
```

これでformページに遷移した時点で入力タグが各所に動的に設置されます。

ただこれは必須ではありません。  
もちろん普通に静的にHTMLで設置してもらって構いません。

tagsでは型の指定(type)が必要となります。  
適用できるtypeは下記となります。

|||
|:--|:--|
|text|テキストボックス|
|textarea|テキストエリア|
|select|セレクトボックス|
|radio|ラジオボタン|
|checkbox|チェックボックス|
|submit|送信ボタン|
|reset|リセットボタン|
|button|通常ボタン|

### - テキストボックス (text)

テキストボックスを出力します。

```javascript
jsf3.form("test1",{

    tags:{
        name:{
            type:"text",
        },
    },

});
```

オプションを指定できます。  
下記はplaceholderとclass属性を指定しています。


```javascript
jsf3.form("test1",{

    tags:{
        name:{
            type:"text",
            placeholder:"Text Sample ....",
            class:"input_name",
        },
    },

});
```


### - テキストエリア (textarea)

テキストエリアを出力します。

```javascript
jsf3.form("test1",{

    tags:{
        message:{
            type:"textarea",
        },
    },

});
```

オプションを指定できます。  
下記はplaceholderとclass属性を指定しています。


```javascript
jsf3.form("test1",{

    tags:{
        message:{
            type:"textarea",
            placeholder:"Text Sample ....",
            class:"textarea_message",
        },
    },

});
```

### - セレクトボックス (select)

セレクトボックスを出力します。  
必ずselectedにて選択肢を指定してください。

```javascript
jsf3.form("test1",{

    tags:{
        selected:{
            type:"select",
            selected:{
                0:"select value 0",
                1:"select value 1",
                2:"select value 2",
                3:"select value 3",
                4:"select value 4",
            },
        },
    },

});
```

あらかじめ選択肢を初期段階で指定する場合はvalueを指定します。

```javascript
jsf3.form("test1",{

    tags:{
        selected:{
            type:"select",
            selected:{
                0:"select value 0",
                1:"select value 1",
                2:"select value 2",
                3:"select value 3",
                4:"select value 4",
            },
            value:2,
        },
    },

});
```

その他オプションを指定できます。  
下記はclass属性を指定しています。

```javascript
jsf3.form("test1",{

    tags:{
        selected:{
            type:"select",
            selected:{
                0:"select value 0",
                1:"select value 1",
                2:"select value 2",
                3:"select value 3",
                4:"select value 4",
            },
            value:2,
            class:"select_selected",
        },
    },

});
```

### - ラジオボタン (radio)

ラジオボタンを津力します。  
必ずselectedにて選択肢を指定してください。

```javascript
jsf3.form("test1",{

    tags:{
        radiobutton:{
            type:"radio",
            selected:{
                0:"radiobutton value 0",
                1:"radiobutton value 1",
                2:"radiobutton value 2",
                3:"radiobutton value 3",
                4:"radiobutton value 4",
            },
        },
    },

});
```

あらかじめ選択肢を初期段階で指定する場合はvalueを指定します。

```javascript
jsf3.form("test1",{

    tags:{
        radiobutton:{
            type:"radio",
            selected:{
                0:"radiobutton value 0",
                1:"radiobutton value 1",
                2:"radiobutton value 2",
                3:"radiobutton value 3",
                4:"radiobutton value 4",
            },
            value:3,
        },
    },

});
```

その他オプションを指定できます。  
下記はclass属性を指定しています。

```javascript
jsf3.form("test1",{

    tags:{
        radiobutton:{
            type:"radio",
            selected:{
                0:"radiobutton value 0",
                1:"radiobutton value 1",
                2:"radiobutton value 2",
                3:"radiobutton value 3",
                4:"radiobutton value 4",
            },
            value:3,
            class:"radio_button",
        },
    },

});
```

### - チェックボックス (checkbox)

チェックボックスを津力します。  
必ずselectedにて選択肢を指定してください。

```javascript
jsf3.form("test1",{

    tags:{
        checkboxs:{
            type:"checkbox",
            selected:{
                0:"checkbox value 0",
                1:"checkbox value 1",
                2:"checkbox value 2",
                3:"checkbox value 3",
                4:"checkbox value 4",
            },
        },
    },

});
```

あらかじめ選択肢を初期段階で指定する場合はvalueを指定します。  
配列値で複数選択がっ可能です。

```javascript
jsf3.form("test1",{

    tags:{
        checkboxs:{
            type:"checkbox",
            selected:{
                0:"checkbox value 0",
                1:"checkbox value 1",
                2:"checkbox value 2",
                3:"checkbox value 3",
                4:"checkbox value 4",
            },
            value:[0,3,4],
        },
    },

});
```

その他オプションを指定できます。  
下記はclass属性を指定しています。

```javascript
jsf3.form("test1",{

    tags:{
        checkboxs:{
            type:"checkbox",
            selected:{
                0:"checkbox value 0",
                1:"checkbox value 1",
                2:"checkbox value 2",
                3:"checkbox value 3",
                4:"checkbox value 4",
            },
            value:[0,3,4],
            class:"checkbox_checks",
        },
    },

});
```

### - 送信ボタン ))submit)

送信ボタンを出力します。  
valueにボタン表示テキストを指定します

```javascript
jsf3.form("test1",{

    tags:{
        submit:{
            type:"submit",
            value:"Submit",
        },
    },

});
```

### - リセットボタン (reset)


リセットボタンを出力します。  
valueにボタン表示テキストを指定します

```javascript
jsf3.form("test1",{

    tags:{
        submit:{
            type:"reset",,
            value:"Submit",
        },
    },

});
```

### - 通常ボタン (button)

ボタンを出力します。  
valueにボタン表示テキストを指定します

```javascript
jsf3.form("test1",{

    tags:{
        submit:{
            type:"button",,
            value:"Submit",
        },
    },

});
```
---

## # 入力データのセット

``jsf3.form.setData``っメソッドを使用することで入力データをフォームにセットできます。  
引数に各フィールドごとの値を指定するだけです。

```javascript
jsf3.page("form",{

    before:function(){

        jsf3.form("test1").setData({
            name:"test name",
            email:"aaaaa@email.jp",
            message:"text sample sample.....",
        });

    },

});
```

---

## # Submitの実行

``jsf3.form.submit``っメソッドを使用することでフォームの送信(Submit)を実行できます。  

```javascript
jsf3.page("form",{

    before:function(){

        jsf3.form("test1").submit();

    },

});
```

---

## # resetの実行

``jsf3.form.reset``っメソッドを使用することで入力データのクリア(Reset)を実行できます。  

```javascript
jsf3.page("form",{

    before:function(){

        jsf3.form("test1").reset();
        
    },

});
```