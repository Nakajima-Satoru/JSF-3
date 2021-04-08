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

