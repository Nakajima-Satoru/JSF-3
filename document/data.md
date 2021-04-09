JSF-3(仮)

# データの共有 (Data)

データの共有を行いたい場合は``jsf3.data``メソッドを利用することを推奨します。

``jsf3.data``メソッドには引数としてデータ名が必ず必要です。

## # データの設置

``jsf3.data.set``メソッドでデータの設置が行えます。  
引数にそれぞれデータ名と値を指定します。

```javascript
jsf3.data("data01").set("abcdefg");
```

## # データの取得

``jsf3.data.get``メソッドでデータの取得が行えます。
引数に取得対象のデータ名を指定します。

戻ろ位値にデータ名の値が返されます。

```javascript
var getData = jsf3.data("data01").get();
```

## # データの削除

``jsf3.data.delete``メソッドでデータの削除が行えます。

```javascript
jsf3.data("data01").delete();
```
