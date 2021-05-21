Javelin

# データの共有 (Data)

データの共有を行いたい場合は``javelin.data``メソッドを利用することを推奨します。

``javelin.data``メソッドには引数としてデータ名が必ず必要です。

## # データの設置

``javelin.data.set``メソッドでデータの設置が行えます。  
引数にそれぞれデータ名と値を指定します。

```javascript
javelin.data("data01").set("abcdefg");
```

## # データの取得

``javelin.data.get``メソッドでデータの取得が行えます。
引数に取得対象のデータ名を指定します。

戻ろ位値にデータ名の値が返されます。

```javascript
var getData = javelin.data("data01").get();
```

## # データの削除

``javelin.data.delete``メソッドでデータの削除が行えます。

```javascript
javelin.data("data01").delete();
```
