Javelin

# リダイレクト(Redirect)

リダイレクト(Redirect)は各ページへの遷移または前のページへ戻る、あるいは現ページでの更新を行うなどの  
ページ操作を行うための機能です。

``javelin.redirect``オブジェクトを使用します。

---

## # 別のページへ遷移

別のページに遷移する場合は``javelin.redirect.next``メソッドを使用してください。  
遷移先のページ名(またはパス)を必ず引数に指定します。

例えばボタンクリックのイベントで別ページに移動する場合は。下記のように記述します。

```javascript
$(".btn_page1").on("click",function(){

    javelin.redirect.next("page1");

});
```

ページ遷移先はサブディレクトリ以降の階層のページも指定できます。


```javascript
$(".btn_page1").on("click",function(){

    javelin.redirect.next("page1/index");

});
```
第二引数にてオプションを指定することができます。  
オプションの概要については[こちらを](#option)参照。

---

## # 前のページへ戻る

前のページに戻る場合は``javelin.redirect.back``メソッドを使用してください。  

例えばボタンクリックのイベントで前のページに戻るする場合は。下記のように記述します。

```javascript
$(".btn_page1").on("click",function(){

    javelin.redirect.back();

});
```

引数にてオプションを指定することができます。  
オプションの概要については[こちらを](#option)参照。

----

## # 現在のページを更新


前のページを更新する場合は``javelin.redirect.refresh``メソッドを使用してください。  

例えばボタンクリックのイベントでページを更新する場合は。下記のように記述します。

```javascript
$(".btn_page1").on("click",function(){

    javelin.redirect.refresh();

});
```

引数にてオプションを指定することができます。  
オプションの概要については[こちらを](#option)参照。

---

<a id="option"></a>

## # オプション設定

引数にてオプションを指定することができます。  
指定できるオプションは下記のとおりです。

### - コールバックの追加

コールバックを追加できます。  
callbackにそれぞれのコールバックを指定します

追加できるコールバックはbeforeとafterのみです。  
ページ更新の場合はrefreshのみが追加できます。

```javascript
$(".btn_page1").on("click",function(){

    javelin.redirect.next("page1",{
        callback:{
            before:function(obj){

                console.log("callback before");

            },
            after:function(obj){

                console.log("callback after");

            },
        },
    });

});
```

### - ページ履歴のクリア

遷移したページの履歴を全てクリアにするにはbufferClearをtrueで指定してください。

```javascript
$(".btn_page1").on("click",function(){

    javelin.redirect.next("page1",{
        bufferClear:true,
    });

});
```

### - 一時的なアニメーション指定

アニメーションを一時的に変更する場合はanimationに変更するアニメーション名を指定してください。  
遷移完了後に別のページへ遷移した場合はデフォルトのアニメーションでの動作に戻ります。

```javascript
$(".btn_page1").on("click",function(){

    javelin.redirect.next("page1",{
        animation:"fade",
    });

});
```

なおanimationをnullに指定した場合は、一時的にアニメーションはされません。  
アニメーション時の動作遅延もありません。

```javascript
$(".btn_page1").on("click",function(){

    javelin.redirect.next("page1",{
        animation:null,
    });

});
```
