## 常用頁面錨點效果
``常常使用，先記錄下來有修正過的版本``
> 視窗滾動時，導覽列的項目置中，並給予其他樣式
> 
![image](https://github.com/Z01WANG/commonUseScroll/assets/63395915/1731fefe-7159-4cc1-962d-acdebe30e909)

> 點擊右方fixedbar中的選項，依照元素所綁訂的 ``data-target-rule`` 顯示相對應內容
```
<li
    class="rule_tab anchor_btn" 
    data-target-rule="rule1" data-target="mainSection5"
>
rule1</li>

#️⃣在 main.js 中可以找到該element所綁訂的function
🔸rule_tab => for "toggle correspond content"
🔸anchor_btn => for scrolling to the target section
```
