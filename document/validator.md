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

## # エラーメッセージについて

エラーメッセージは設置する必要はありません。  
設置しない場合は、エラーメッセージに``validate error [field={field name}, rule="{rule}"``のように出力されます`
{field name}に項目名、{rule}に検出された条件名が入ります。

---

## # 主なバリデーションルール

下記にプリセットされているバリデーションルールを列挙ししています。  
プリセットされたルールでは指定できない条件の場合はカスタムバリデーションを設置してください。

カスタムバリデーションについては[こちらで解説しています。](#custom_validation)

### - 必須 (required)

入力値を必須にする条件です。

```json
{
    rule:"required",
}
```

### - 条件付き必須 (requiredIf)

ある項目の入力値を条件に必須とします。  
下記の場合、modeに2が代入されている場合にのみ必須となります。

```json
{
    rule:["requiredOf","mode",2],
}
```


### - 条件項目全て入力時に必須 (requiredWith)

ある項目郡が全て入力された時点で必須とします。  
下記の場合、modeとvalueに値が代入された時点で必須となります。

```json
{
    rule:["requiredWith",["mode","value"]],
}
```

### - 条件項目のいずれかが入力時に必須 (requiredWithOr)

ある項目郡のうちいずれかに入力された時点で必須とします。  
下記の場合、modeとvalueのいずれかに値が代入された時点で必須となります。

```json
{
    rule:["requiredWithOr",["mode","value"]],
}
```


### - 確認用入力 (confirmed)

指定された項目に同じ値が入力されているのを条件としています。  
下記の場合、name2の値が入力値と同じであることを条件とします。

```json
{
    rule:["confirmed","name2"],
}
```

### - 半角英数字のみ許可 (alphaNumeric)

半角英数字もしくは許可された特殊文字等のみで構成されている文字列のみを許可します。  
半角英数字のみの場合は下記のように指定します。

```json
{
    rule:"alphaNumeric",
}
```

半角英数字と特殊文字を追加で許可する場合は下記のように指定します。  
+,=,-,_,@を許可しています。

```json
{
    rule:["alphaNumeric","+=-_@"],
}
```

### - 半角数字のみ許可 (numeric)

半角数字もしくは許可された特殊文字等のみで構成されている文字列のみを許可します。
半角数字のみの場合は下記のように指定します。

```json
{
    rule:"numeric",
}
```

半角数字と特殊文字を追加で許可する場合は下記のように指定します。  
+,=,-,_,@を許可しています。

```json
{
    rule:["numeric","+=-_@"],
}
```

### - 指定長さ文字のみ許可 (length)

指定した長さの文字列のみを許可します。  
20文字の文字列を許可する場合は下記のように指定します。

```json
{
    rule:["length",20],
}
```

### - 指定長さ以上の文字のみ許可 (minLength)

指定長さ以上の文字列のみを許可します。  
6文字以上の文字列を許可する場合は下記のように指定します。

```json
{
    rule:["minLength",6],
}
```

### - 指定長さ以下の文字のみ許可 (maxLength)

指定長さ以下の文字列のみを許可します。  
30文字以下の文字列を許可する場合は下記のように指定します。

```json
{
    rule:["maxLength",30],
}
```

### - 指定長さの範囲内の文字のみ許可 (betweenLength)

指定長さの範囲内の文字列のみを許可します。  
6～30文字の範囲の文字列を許可する場合は下記のように指定します。

```json
{
    rule:["betweenLength",6,30],
}
```

### - 指定値のみ許可 (value)

指定値のみを許可します。  
値が20を許可する場合は下記のように指定します。

```json
{
    rule:["value",20],
}
```

### - 指定値以上の値のみ許可 (minValue)

指定値以上の値が代入された時に許可します。  
値が6以上を許可する場合は下記のように指定します。

```json
{
    rule:["minValue",6],
}
```

### - 指定値以下の値のみ許可 (maxValue)

指定値以下の値が代入された時に許可します。  
値が20以下を許可する場合は下記のように指定します。

```json
{
    rule:["maxValue",20],
}
```

### - 指定値の範囲内の値のみ許可 (betweenValue)

指定値の範囲内の値が代入された時に許可します。  
値が6～20を許可する場合は下記のように指定します。

```json
{
    rule:["betweenValue",6,20],
}
```

### - 値に指定の選択数が含まれているときのみ許可 (selectedCount)

値が指定の選択数代入されている時に許可します。  
値はチェックボックス等による配列値を代入してください。

4つ選択されているときに許可する場合は下記のように指定します。

```json
{
    rule:["selectedCount",4],
}
```

### - 値に指定の選択数以上が含まれているときのみ許可 (minSelectedCount)

値が指定の選択数以上代入されている時に許可します。  
値はチェックボックス等による配列値を代入してください。

3つ以上選択されているときに許可する場合は下記のように指定します。

```json
{
    rule:["minSelectedCount",3],
}
```

### - 値に指定の選択数以下が含まれているときのみ許可 (maxSelectedCount)

値が指定の選択数以下代入されている時に許可します。  
値はチェックボックス等による配列値を代入してください。

20個以下で選択されているときに許可する場合は下記のように指定します。

```json
{
    rule:["maxSelectedCount",20],
}
```

### - 値に指定範囲内の選択数が含まれているときのみ許可 (betweenSelectedCount)

値が指定範囲内の選択数分代入されている時に許可します。  
値はチェックボックス等による配列値を代入してください。

3～20個で選択されているときに許可する場合は下記のように指定します。

```json
{
    rule:["betweenSelectedCount",3,20],
}
```

### - あいまい検索 (like)

値に指定値が含まれている場合に許可します。  
値に「です。」が含まれている場合に許可する場合は下記のように指定します。

```json
{
    rule:["like","です。"],
}
```

### - 指定値郡の値が代入されているときのみ許可 (any)

値に指定値郡のいずれかの値が含まれている場合に許可します。  
値に1,2,3,4,5のいずれかが含まれている場合に許可する場合は下記のように指定します。

```json
{
    rule:["any",[1,2,3,4,5]],
}
```

### - 日付フォーマットのみ許可

値に日付フォーマット形式が代入されているときのみ許可します。

```json
{
    rule:"date",
}
```

### - 指定の日付以上の場合のみ許可 (minDate)

値に指定の日付以上の日付が代入されているときのみ許可します。  
下記の場合、2021年3月1日以降の日付であれば許可します。

```json
{
    rule:["minDate","2021/03/01"],
}
```

### - 指定の日付以下の場合のみ許可 (maxDate)

値に指定の日付以下の日付が代入されているときのみ許可します。  
下記の場合、2021年3月9日以前の日付であれば許可します。

```json
{
    rule:["maxDate","2021/03/09"],
}
```

### - 指定の日付範囲内の場合のみ許可 (betweenDate)


値に指定日付の範囲内の日付が代入されているときのみ許可します。  
下記の場合、2021年3月1日～2021年3月9日の間の日付であれば許可します。

```json
{
    rule:["betweenDate","2021/03/01","2021/03/09"],
}
```

### - 整数型のみ許可 (isInt)

値が整数値のみを許可します。

```json
{
    rule:"isInt",
}
```

### - ブール値のみ許可 (isBool)

値がブール値または0か1の整数値のみを許可します。

```json
{
    rule:"isBool",
}
```

### - メールフォーマット形式のみ許可 (isEmail)

値がメールフォーマット形式のみを許可します。

```json
{
    rule:"isEmail",
}
```

### - 電話番号形式のみ許可 (isTel)

値が電話番号形式のみを許可します。

```json
{
    rule:"isTel",
}
```

### - IDアドレス形式のみ許可 (isIp)

値がIDアドレス形式のみを許可します。

```json
{
    rule:"isIp",
}
```

### - URL形式のみ許可 (isUrl)

値がURL形式のみを許可します。

```json
{
    rule:"isUrl",
}
```

### - 指定の正規表現のみ許可 (regex)

値が指定の正規表現のみを許可します。  
正規表現の条件を下記のように設置します。

```json
{
    rule:["regex","^[a-zA-Z0-9]+$"],
}
```

### - 日本の郵便番号形式のみ許可 (isZipJP)

値が日本の郵便番号形式のみを許可します。

```json
{
    rule:"isZipJP",
}
```

### - 全角カタカナのみ許可 (isKatakana)

値が全角カタカナのみを許可します。

```json
{
    rule:"isKatakana",
}
```

全角カタカナ以外で許可したい文字がある場合は下記のように指定します。  
下記の場合「-」を許可します。

```json
{
    rule:["isKatakana","-"],
}
```


### - 全角ひらがなのみ許可 (isHiragana)

値が全角ひらがなのみを許可します。

```json
{
    rule:"isHiragana",
}
```
全角ひらがな以外で許可したい文字がある場合は下記のように指定します。  
下記の場合「-」を許可します。

```json
{
    rule:["isHiragana","-"],
}
```

---

<a id="custom_validation"></a>

## # カスタムバリデーションの実装

プリセットされたバリデーションルール以外でバリデーションを実装したい場合は、  
カスタムバリデーションルールを指定してください。

カスタムバリデーションの実装はバリデーションスクリプト内で任意のメソッド名を指定してコールバックを実装します。  
それをrulesにて指定するだけです。


```javascript | 
jsf3.validator("test1",{

    rules:{
        name:[
            {
                rule:"custom",
            },
        ],
    },


    customValidate:function(value){

        if(value=="abcdefg" || value=="hijk"){
            return true;
        }

        return false;
    },

});
```

カスタムバリデーションの戻り値がtrueの場合は条件をスルーします。(falseでエラーとみなします。)  
引数ではvalueに入力値が、そのあとにそれぞれルール指定時の値が入ります。

```javascript | 
jsf3.validator("test1",{

    rules:{
        name:[
            {
                rule:["custom",1],
            },
        ],
        code:[
            {
                rule:["custom",2],
            },
        ],
    },


    customValidate:function(value,arg){

        if(arg==1){
            if(value=="abc"){
                return true;
            }
        }
        else if(arg==2){
            if(value=="cde"){
                return true;
            }
        }

        return false;
    },

});
```

他の項目値を取得するには```this.value``メソッドを使用してください。



```javascript | 
jsf3.validator("test1",{

    rules:{
        name:[
            {
                rule:"custom",
            },
        ],
    },


    customValidate:function(value){

        var name2=this.value("name2");

        if(name2=="aaa" && value=="cccc"){
            return true;
        }

        return false;
    },

});
```