Javelin

# ロジック (Logic)

ロジック(Logic)は各ページまたはグループ、フォーム、バリデーション等のコールバック上にて  共通で必要なロジックを提供するための機能です。

JavaScriptの通常のオブジェクトメソッドを記述してそれを使用する形でも構いませんが、  
ロジックの機能を使用するメリットとしては、どのロジックでかつどのメソッドを使用しているかを明確に判断できるようになっています。  

``javelin.logic``メソッドを使用します。

## # ロジックの設置

ロジックの設置は``app/logic``ディレクトリ内に下記のようなファイルを設置してください。

```javascript | app/group/test.js
javelin.logic("test",{

    run:function(){

        return "test logic run....";

    },

});
```

第二引数に設置するメソッドもしくは変数を入れておきます。

## # ロジックを使用する。

ロジックを使用する場合は、下記のようにロジック内に設置したメソッドを呼び出すだけです。

```javascript | app/group/test.js
javelin.page("logictest",{

    before:function(){

        var text=javelin.logic("text").run();

        console.log(text);

    },

});
```
