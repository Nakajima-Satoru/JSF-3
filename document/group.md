JSF-3(仮)

# グループ (Group)

グループは各ページごとのコールバックを共通化するための機能です。
グループを使用することでページ遷移前後等で各ページごとでロジックを共通で実行させることができます。

グループ機能は``jsf3.group``メソッドを使用します。

---

### - グループの設置

グループの設置は``app/group``ディレクトリ内に下記のようなファイルを設置してください。

```javascript | app/group/app.js
jsf3.group("app",{

    before:function(Obj){

        console.log("group app before");

    },

});
```

---

## # グループのコールバックについて

グループで指定できるコールバックとその引数であるコールバックオブジェクトの仕様はページのコールバックと同様です。  
ページのコールバックについては[こちらで](page.md#callback)解説しています。

---

## # ページにてグループを指定する

グループを使用するには各ページにて使用するグループを指定する必要があります。  
各ページでのグループの設定は非常に簡単で、下記のようにgroupに適用したグループ名を指定するだけです。

```javascript | app/page/main.js
jsf3.page("main",{

    group:"app",

    before:function(Obj){

    },

});
```

また配列値にすることでグループは複数指定することもできます。  
その場合、グループ内のコールバックの実行順序は配列値に準拠します。

```javascript | app/page/main.js
jsf3.page("main",{

    group:["app","auth"],

    before:function(Obj){

    },

});
```
