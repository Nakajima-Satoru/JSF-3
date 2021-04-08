JSF-3(仮)

# バリデーション (validator)

バリデーション(validator)は入力データの検証チェックを行うための機能です。

バリデーション機能は``jsf3.validator``メソッドを使用します。

---

## # バリデーションの設置


バリデーションのスクリプトは``app/validator``ディレクトリにJSファイルとして設置します。

```javascript | app/form/test1.js
jsf3.validator("vtest1",{

    rules:{
        name:[
            {
                rule:"required",
                message:"名前が未入力です。",
            }.
            {
                rule:["maxLength",200],
                message:"200文字以内で入力してください。",
            }.
        ],
        email:[
            {
                rule:"required",
                message:"メールアドレスが未入力です。",
            }.
            {
                rule:"isEmail",
                message:"メールフォーマット形式で入力されていません。",
            }.
            {
                rule:["maxLength",200],
                message:"200文字以内で入力してください。",
            }.
        ],
        message:[
            {
                rule:["maxLength",2000],
                message:"2000文字以内で入力してください",
            },
        ],
    },

});
```

上記のようにrulesに各項目ごとの適用するバリデートルールを指定します。  
現在プリセットされいるバリデートルールについては[こちらを参照。](#validaterule)

---

## # バリデーションを実行する

バリデーションの実行は``jsf3.validator.verify``メソッドを使用します。  
引数にチェック対象のデータ(入力データ等)をセットし、入力内容がルールと異なる場合のみエラー内容が返されます。

```javascript
jsf3.form("test1",{

    submit:function(obj){

        var postData=obj.data;

        var vres=jsf3.validator("vtest1").verify(postData);

        if(vres){
            console.log(vres);
            return;
        }

    },

});
```

上記の場合、変数vresにバリデーション結果が変え有れます。  
その内容がある場合はエラーメッセージを出力する等の処理が必要になります。

### : エラーメッセージを自動で表示

バリデーション実行時にエラーメッセージがあった場合、  
バリデーション名と同じフォーム(ID名が同じ)内にerror属性のタグを設けることで  
メッセージを自動で出力してくれます。

例えば下記のようにHTMLタグを記述します。

```html | render/page/form.html
<h2>Form Sample</h2>

<form id="test1">
    <p>name</p>
    <div field="name"></div>
    <div error="name"></div>

    <p>email</p>
    <div field="email"></div>
    <div error="email"></div>

    <p>message</p>
    <div field="message"></div>
    <div error="message"></div>

      <p>submit</p>
    <div field="submit"></div>
</form>
```

そのあとでバリデーション名をフォームのIDと同じ(フォーム名)にした状態で
``jsf3.validator.verify``メソッドぉ実行すると、  
error属性の箇所にエラーメッセージが自動で入ります。

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

        var vres=jsf3.validator("vtest").verify(obj.data);

        if(vres){
            return;
        }

    },

});
```

これによりエラーメッセージを表示するロジックを組む手間が省けます。


### - オプション設定

第二引数にオプションを指定することができます。

#### : バリデーションの変更

1つバリデーションで複数のケースごとのバリデーションを用意し、  
それを使って検証することもできます。

例えば、バリデーションスクリプトを下記のように設置します。

```javascript | app/form/test1.js
jsf3.validator("vtest1",{

    rules:{
        name:[
            {
                rule:"required",
                message:"名前が未入力です。",
            }.
            {
                rule:["maxLength",200],
                message:"200文字以内で入力してください。",
            }.
        ],
    },

    rules2:{
        email:[
            {
                rule:"required",
                message:"メールアドレスが未入力です。",
            }.
            {
                rule:"isEmail",
                message:"メールフォーマット形式で入力されていません。",
            }.
            {
                rule:["maxLength",200],
                message:"200文字以内で入力してください。",
            }.
        ],
    },

});
```

次にバリデーション実行する際に第二引数にて、  
ruleをrule2で指定することで、rule2のバリデーションで検証されます。

```javascript
jsf3.form("test1",{

    submit:function(obj){

        var postData=obj.data;

        var vres=jsf3.validator("vtest1").verify(postData,{
            rule:"rule2",
        });

        if(vres){
            console.log(vres);
            return;
        }

    },

});
```

#### : エラーメッセージ自動出力を停止

バリデーション名と同じフォーム内にエラーメッセージ出力用のerror属性のタグがある場合、  
そのタグがあってもエラー内容を表示させないようにするには、  noOrrorOutputedをtrueに指定してください。


```javascript
jsf3.form("test1",{

    submit:function(obj){

        var postData=obj.data;

        var vres=jsf3.validator("vtest1").verify(postData,{
            noOrrorOutputed:true,
        });

        if(vres){
            console.log(vres);
            return;
        }

    },

});
```

---

## # 主なバリデーションルール

