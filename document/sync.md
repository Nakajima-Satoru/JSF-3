JSF-3(仮)

# 同期処理 (Sync)

``jsf3.sync``は同期処理を簡単に実装するためのメソッドです。   
リスト形式で各コールバックを設置するだけで同期が行えます。

---

## # 同期処理の実装方法

下記のように各処理をコールバックでリスト化します。  
コールバック内では引数である**next**メソッドを実行して次のコールバックに進むことができます。

```javascript
jsf3.sync([
    function(next){
        console.log("start");
        next(),
    },
    function(next){
        setTimeout(function(){
            console.log("1...compelete!");
            next();
        },3000);
    },
    function(next){
        setTimeout(function(){
            console.log("2...compelete!");
            next();
        },2000);
    },
    function(next){
        setTimeout(function(){
            console.log("3...compelete!");
            next();
        },4000);
    },
    function(next){
        setTimeout(function(){
            console.log("5...compelete!");
            next();
        },2000);
    },
]);
```

----

## # ループの同期処理

複数回のループ時に同じコールバックを実行する同期処理は```jsf3.syncFor``メソッドを使用します。  
引数にそれぞれ開始インデックス、終了インデックス、コールバックを指定します。

コールバックの引数にはnextメソッド、インデックス値がそれぞれ与えられます。

```javascript
jsf3.syncFor(1,10,function(next,index){

    setTimeout(function(){
        console.log("step "+index);
        next();
    },2000);

});
```